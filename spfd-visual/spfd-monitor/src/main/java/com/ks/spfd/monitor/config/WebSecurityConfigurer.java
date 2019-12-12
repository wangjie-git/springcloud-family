package com.ks.spfd.monitor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import de.codecentric.boot.admin.server.config.AdminServerProperties;

/**
 * WebSecurityConfigurer
 * @author HWB
 *2019年5月7日下午2:53:47
 */
@Configuration
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
	private final String adminContextPath;

	public WebSecurityConfigurer(AdminServerProperties adminServerProperties) {
		this.adminContextPath = adminServerProperties.getContextPath();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
		successHandler.setTargetUrlParameter("redirectTo");
		successHandler.setDefaultTargetUrl(adminContextPath + "/");

		http.headers().frameOptions().disable().and().authorizeRequests()
				.antMatchers(adminContextPath + "/assets/**", adminContextPath + "/login",
						adminContextPath + "/actuator/**")
				.permitAll().anyRequest().authenticated().and().formLogin().loginPage(adminContextPath + "/login")
				.successHandler(successHandler).and().logout().logoutUrl(adminContextPath + "/logout").and().httpBasic()
				.and().csrf().disable();
		// @formatter:on
	}
}