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

package com.ks.spfd.admin.api.feign.fallback;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ks.spfd.admin.api.dto.UserInfo;
import com.ks.spfd.admin.api.feign.RemoteUserService;
import com.ks.spfd.common.core.util.R;

/**
 * @author lengleng
 * @date 2019/2/1
 */
@Component
public class RemoteUserServiceFallbackImpl implements RemoteUserService {

	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	private Throwable cause;
	
	/**
	 * 通过用户名查询用户、角色信息
	 *
	 * @param username 用户名
	 * @param from     内外标志
	 * @return R
	 */
	@Override
	public R<UserInfo> info(String username, String from) {
		LOGGER.error("feign 查询用户信息失败:{}", username, cause);
		return null;
	}

	/**
	 * 通过社交账号查询用户、角色信息
	 *
	 * @param inStr appid@code
	 * @return
	 */
	@Override
	public R<UserInfo> social(String inStr) {
		LOGGER.error("feign 查询用户信息失败:{}", inStr, cause);
		return null;
	}

	public Throwable getCause() {
		return cause;
	}

	public void setCause(Throwable cause) {
		this.cause = cause;
	}
}
