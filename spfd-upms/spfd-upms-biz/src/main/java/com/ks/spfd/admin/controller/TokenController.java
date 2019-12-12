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

package com.ks.spfd.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.core.util.R;

/**
 * @author lengleng
 * @date 2018/9/4 getTokenPage 管理
 */
@RestController
@RequestMapping("/token")
public class TokenController {
	
	@Autowired
	RemoteTokenService remoteTokenService;

	/**
	 * 分页token 信息
	 *
	 * @param params 参数集
	 * @return token集合
	 */
	@GetMapping("/page")
	public R token(@RequestParam Map<String, Object> params) {
		return remoteTokenService.selectPage(params, SecurityConstants.FROM_IN);
	}

	/**
	 * 删除
	 *
	 * @param id ID
	 * @return success/false
	 */
	@DeleteMapping("/{id}")
	@PreAuthorize("@pms.hasPermission('sys_token_del')")
	public R<Boolean> delete(@PathVariable String id) {
		return remoteTokenService.deleteTokenById(id, SecurityConstants.FROM_IN);
	}
}
