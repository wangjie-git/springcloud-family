package com.ks.spfd.common.security.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import com.ks.spfd.common.core.config.FilterIgnorePropertiesConfig;

import java.io.IOException;

/**
 * <p>
 * 1. 支持remoteTokenServices 负载均衡
 * 2. 支持 获取用户全部信息
 * 是默认情况下spring security oauth2的http配置
 * @author HWB 2019年5月8日上午10:32:04
 */
public abstract class BaseResourceServerConfigurerAdapter extends ResourceServerConfigurerAdapter {
	@Autowired
	protected ResourceAuthExceptionEntryPoint resourceAuthExceptionEntryPoint;

	@Autowired
	protected PigAccessDeniedHandler pigAccessDeniedHandler;

	@Autowired
	protected RemoteTokenServices remoteTokenServices;

	@Autowired
	protected UserDetailsService userDetailsService;

	@Autowired
	private FilterIgnorePropertiesConfig filterIgnorePropertiesConfig;

	/**
	 * 默认的配置，对外暴露
	 *
	 * @param http
	 * @throws Exception
	 */
	@Override
	public void configure(HttpSecurity http) throws Exception {
		// 允许使用iframe 嵌套，避免swagger-ui 不被加载的问题
		http.headers().frameOptions().disable();
		http.headers().contentTypeOptions();
		ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = http
				.authorizeRequests();
		filterIgnorePropertiesConfig.getUrls().forEach(url -> registry.antMatchers(url).permitAll());
		registry.anyRequest().authenticated().and().csrf().disable();
		http.authorizeRequests().anyRequest().authenticated();
	}

	/**
	 * 提供子类重写
	 * <p>
	 * 1. 不重写，默认支持获取雍熙 2. 重写notGetUser，提供性能
	 * <p>
	 * see codegen ResourceServerConfigurer
	 *
	 * @param resources
	 */
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		canGetUser(resources);
	}

	@Bean
	@Primary
	@LoadBalanced
	public RestTemplate lbRestTemplate() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
			@Override
			public void handleError(ClientHttpResponse response) throws IOException {
				if (response.getRawStatusCode() != HttpStatus.BAD_REQUEST.value()) {
					super.handleError(response);
				}
			}
		});
		return restTemplate;
	}

	/**
	 * 不获取用户详细 只有用户名
	 *
	 * @param resources
	 */
	protected void notGetUser(ResourceServerSecurityConfigurer resources) {
		DefaultAccessTokenConverter accessTokenConverter = new DefaultAccessTokenConverter();
		DefaultUserAuthenticationConverter userTokenConverter = new DefaultUserAuthenticationConverter();
		accessTokenConverter.setUserTokenConverter(userTokenConverter);

		remoteTokenServices.setRestTemplate(lbRestTemplate());
		remoteTokenServices.setAccessTokenConverter(accessTokenConverter);
		resources.authenticationEntryPoint(resourceAuthExceptionEntryPoint).accessDeniedHandler(pigAccessDeniedHandler)
				.tokenServices(remoteTokenServices);
	}

	/**
	 * 上下文中获取用户全部信息，两次调用userDetailsService，影响性能
	 *
	 * @param resources
	 */
	private void canGetUser(ResourceServerSecurityConfigurer resources) {
		DefaultAccessTokenConverter accessTokenConverter = new DefaultAccessTokenConverter();
		DefaultUserAuthenticationConverter userTokenConverter = new DefaultUserAuthenticationConverter();
		userTokenConverter.setUserDetailsService(userDetailsService);
		accessTokenConverter.setUserTokenConverter(userTokenConverter);

		remoteTokenServices.setRestTemplate(lbRestTemplate());
		remoteTokenServices.setAccessTokenConverter(accessTokenConverter);
		resources.authenticationEntryPoint(resourceAuthExceptionEntryPoint).accessDeniedHandler(pigAccessDeniedHandler)
				.tokenServices(remoteTokenServices);
	}

}
