package com.ks.spfd.admin.api.feign;

import com.ks.spfd.admin.api.dto.OauthTokenDto;
import com.ks.spfd.admin.api.feign.factory.RemoteTokenServiceFallbackFactory;
import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.core.constant.ServiceNameConstants;
import com.ks.spfd.common.core.util.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 
 * @author HWB
 *2019年5月8日上午9:58:10
 */
@FeignClient(value = ServiceNameConstants.AUTH_SERVICE, fallbackFactory = RemoteTokenServiceFallbackFactory.class)
public interface RemoteTokenService {

	/**
	 *
	 * @param from
	 * @param username
	 * @param password
	 * @param grant_type
	 * @param sope
	 * @param client_id
	 * @param client_secret
	 * @return
	 */
	@PostMapping("/oauth/token")
	OauthTokenDto remoteOauth(@RequestHeader(SecurityConstants.FROM) String from, @RequestParam("username") String username,
							  @RequestParam("password") String password, @RequestParam("grant_type") String grant_type,
							  @RequestParam("sope") String sope, @RequestParam("client_id") String client_id,
							  @RequestParam("client_secret") String client_secret);
	/**
	 * 分页查询token 信息
	 *
	 * @param params 分页参数
	 * @param from   内部调用标志
	 * @return page
	 */
	@PostMapping("/oauth/listToken")
	R selectPage(@RequestBody Map<String, Object> params, @RequestHeader(SecurityConstants.FROM) String from);

	/**
	 * 删除token
	 *
	 * @param token token
	 * @param from  调用标志
	 * @return
	 */
	@DeleteMapping("/oauth/delToken/{token}")
	R<Boolean> deleteTokenById(@PathVariable("token") String token, @RequestHeader(SecurityConstants.FROM) String from);


}
