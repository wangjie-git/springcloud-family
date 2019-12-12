/*
 *  Copyright (c) 2019-2020, 冷冷 (wangiegie@gmail.com).
 *  <p>
 *  Licensed under the GNU Lesser General Public License 3.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  <p>
 * https://www.gnu.org/licenses/lgpl.html
 *  <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.ks.spfd.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ks.spfd.common.security.handler.MobileLoginSuccessHandler;

/**
 * Security 核心配置类
* @Author wangjie 
* @Description Security 核心配置类
* @Date 13:55 2019/12/4 0004 
**/
@Primary
@Order(90)
@Configuration
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private ClientDetailsService clientDetailsService;

	@Autowired
	private MyAuthenticationProvider myAuthenticationProvider;

	@Lazy
	@Autowired
	private AuthorizationServerTokenServices defaultAuthorizationServerTokenServices;

	/**
	* @Author wangjie
	* @Description configure(HttpSecurity http) httpSecurity中配置所有请求的安全验证
	**/
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/actuator/**", "/oauth/removeToken", "/oauth/delToken/*",
				"/oauth/listToken", "/mobile/**").permitAll().anyRequest().authenticated().and().csrf().disable();
	}

	
	/** 
	* @Author wangjie 
	* @Description 注入Bean AuthenticationManager 用来做验证
	* @return org.springframework.security.authentication.AuthenticationManager
	**/
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public AuthenticationSuccessHandler mobileLoginSuccessHandler() {
		return new MobileLoginSuccessHandler(objectMapper, passwordEncoder(), clientDetailsService,
				defaultAuthorizationServerTokenServices);
	}

	/**
	* @Author wangjie
	* @Description 注册密码编码器
	* @return org.springframework.security.crypto.password.PasswordEncoder
	**/
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	/**
	* @Author wangjie
	* @Description 重写自定义认证
	* @Date 14:02 2019/12/4 0004
	* @Param [auth]
	* @return void
	**/
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(myAuthenticationProvider);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/js/**", "/plugins/**", "/favicon.ico");
	}

}
