package com.ks.spfd.codegen.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

import com.ks.spfd.common.security.component.BaseResourceServerConfigurerAdapter;

/**
 * 
 * @author HWB
 *2019年5月8日上午11:04:54
 */
@Configuration
@EnableResourceServer
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfigurer extends BaseResourceServerConfigurerAdapter {

	/**
	 * 重写抽象类实现，不需要调用feign 获取 userDetailsService
	 *
	 * @param resources
	 */
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		notGetUser(resources);
	}
}
