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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * WebSecurityConfigurer
 *
 * @author lishangbu
 * @date 2019/2/1
 */
@Configuration
@Primary
public class UpmsWebSecurityConfigurer extends WebSecurityConfigurerAdapter {

	@Autowired
	UmpsAuthenticationProvider myAuthenticationProvider;

	/**
	 * 用户验证
	 * 
	 * @param auth
	 */
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.authenticationProvider(myAuthenticationProvider);
	}
}
