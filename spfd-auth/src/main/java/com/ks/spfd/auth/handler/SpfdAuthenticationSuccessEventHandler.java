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

package com.ks.spfd.auth.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ks.spfd.common.security.handler.AuthenticationSuccessEventHandler;

/**
 * @author lengleng
 * @date 2019/2/1
 */
@Component
public class SpfdAuthenticationSuccessEventHandler extends AuthenticationSuccessEventHandler {
	private static final Logger LOGGER = LoggerFactory.getLogger(SpfdAuthenticationFailureEvenHandler.class);

	/**
	 * 处理登录成功方法
	 * <p>
	 * 获取到登录的authentication 对象
	 *
	 * @param authentication 登录对象
	 */
	@Override
	public void handle(Authentication authentication) {
		LOGGER.info("用户：{} 登录成功", authentication.getPrincipal());
	}
}