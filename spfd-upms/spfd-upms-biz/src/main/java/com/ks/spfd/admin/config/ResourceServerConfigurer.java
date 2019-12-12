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

package com.ks.spfd.admin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.common.security.component.BaseResourceServerConfigurerAdapter;
import com.ks.spfd.common.security.handler.UpmsSuccessLoginHandler;

/**
 * @author lengleng
 * @date 2019/2/1
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfigurer extends BaseResourceServerConfigurerAdapter {

	private RemoteTokenService remoteTokenService;
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.headers().frameOptions().disable();
		http.headers().contentTypeOptions();
		http.authorizeRequests()// spring security对路径不拦截, "/index"
				.antMatchers("/css/**").permitAll().antMatchers("/static/**").permitAll().and().formLogin()
				.loginPage("/login")
				.successHandler(new UpmsSuccessLoginHandler(remoteTokenService))
				.and().logout().logoutSuccessUrl("/").and().csrf()
				.disable();
	}
	
	public ResourceServerConfigurer (RemoteTokenService remoteTokenService) {
		this.remoteTokenService = remoteTokenService;
	}
}
