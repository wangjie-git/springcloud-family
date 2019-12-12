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

package com.ks.spfd.auth.endpoint;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.security.service.PigUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ConvertingCursor;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** 
* @Author wangjie 
* @Description 令牌端点
* @Date 14:07 2019/12/4 0004 
**/
@RestController
@RequestMapping("/oauth")
public class SpfdTokenEndpoint {
	private static final String PROJECT_OAUTH_ACCESS = SecurityConstants.PROJECT_PREFIX + SecurityConstants.OAUTH_PREFIX
			+ "access:";
	private static final String CURRENT = "current";
	private static final String SIZE = "size";
	
	@Autowired
	TokenStore tokenStore;
	
	@SuppressWarnings("rawtypes")
	@Autowired
	RedisTemplate redisTemplate;

	/**
	 * 退出token
	 *
	 * @param authHeader Authorization
	 */
	@GetMapping("/removeToken")
	public R<Boolean> logout(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
		if (StringUtils.hasText(authHeader)) {
			String tokenValue = authHeader.replace("Bearer", "").trim();
			OAuth2AccessToken accessToken = tokenStore.readAccessToken(tokenValue);
			if (accessToken == null || StrUtil.isBlank(accessToken.getValue())) {
				return new R<>(false, "退出失败，token 为空");
			}
			tokenStore.removeAccessToken(accessToken);
		}

		return new R<>(Boolean.TRUE);
	}

	/**
	 * 令牌管理调用
	 *
	 * @param token token
	 * @param from  内部调用标志
	 */
	@DeleteMapping("/delToken/{token}")
	public R<Boolean> delToken(@PathVariable("token") String token, @RequestHeader(required = false) String from) {
		if (StrUtil.isBlank(from)) {
			return null;
		}
		return new R<>(redisTemplate.delete(PROJECT_OAUTH_ACCESS + token));
	}

	/**
	 * 查询token
	 *
	 * @param params 分页参数
	 * @param from   标志
	 */
	@PostMapping("/listToken")
	public R tokenList(@RequestBody Map<String, Object> params, @RequestHeader(required = false) String from) {
		if (StrUtil.isBlank(from)) {
			return null;
		}

		List<Map<String, String>> list = new ArrayList<>();
		if (StringUtils.isEmpty(MapUtil.getInt(params, CURRENT))
				|| StringUtils.isEmpty(MapUtil.getInt(params, CURRENT))) {
			params.put(CURRENT, 1);
			params.put(SIZE, 20);
		}
		// 根据分页参数获取对应数据
		List<String> pages = findKeysForPage(PROJECT_OAUTH_ACCESS + "*", MapUtil.getInt(params, CURRENT),
				MapUtil.getInt(params, SIZE));

		for (String page : pages) {
			String accessToken = StrUtil.subAfter(page, PROJECT_OAUTH_ACCESS, true);
			OAuth2AccessToken token = tokenStore.readAccessToken(accessToken);
			Map<String, String> map = new HashMap<>(8);

			map.put("token_type", token.getTokenType());
			map.put("access_token", token.getValue());
			map.put("expires_in", token.getExpiresIn() + "");

			OAuth2Authentication oAuth2Auth = tokenStore.readAuthentication(token);
			Authentication authentication = oAuth2Auth.getUserAuthentication();

			map.put("client_id", oAuth2Auth.getOAuth2Request().getClientId());
			map.put("grant_type", oAuth2Auth.getOAuth2Request().getGrantType());

			if (authentication instanceof UsernamePasswordAuthenticationToken) {
				UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) authentication;

				if (authenticationToken.getPrincipal() instanceof PigUser) {
					PigUser user = (PigUser) authenticationToken.getPrincipal();
					map.put("user_id", user.getId() + "");
					map.put("username", user.getUsername() + "");
				}
			} else if (authentication instanceof PreAuthenticatedAuthenticationToken) {
				// 刷新token方式
				PreAuthenticatedAuthenticationToken authenticationToken = (PreAuthenticatedAuthenticationToken) authentication;
				if (authenticationToken.getPrincipal() instanceof PigUser) {
					PigUser user = (PigUser) authenticationToken.getPrincipal();
					map.put("user_id", user.getId() + "");
					map.put("username", user.getUsername() + "");
				}
			}
			list.add(map);
		}

		Page result = new Page(MapUtil.getInt(params, CURRENT), MapUtil.getInt(params, SIZE));
		result.setRecords(list);
		result.setTotal(Long.valueOf(redisTemplate.keys(PROJECT_OAUTH_ACCESS + "*").size()));
		return new R(result);

	}

	private List<String> findKeysForPage(String patternKey, int pageNum, int pageSize) {
		ScanOptions options = ScanOptions.scanOptions().match(patternKey).build();
		RedisSerializer<String> redisSerializer = (RedisSerializer<String>) redisTemplate.getKeySerializer();
		Cursor cursor = (Cursor) redisTemplate.executeWithStickyConnection(
				redisConnection -> new ConvertingCursor<>(redisConnection.scan(options), redisSerializer::deserialize));
		List<String> result = new ArrayList<>();
		int tmpIndex = 0;
		int startIndex = (pageNum - 1) * pageSize;
		int end = pageNum * pageSize;

		assert cursor != null;
		while (cursor.hasNext()) {
			if (tmpIndex >= startIndex && tmpIndex < end) {
				result.add(cursor.next().toString());
				tmpIndex++;
				continue;
			}
			if (tmpIndex >= end) {
				break;
			}
			tmpIndex++;
			cursor.next();
		}
		return result;
	}
}
