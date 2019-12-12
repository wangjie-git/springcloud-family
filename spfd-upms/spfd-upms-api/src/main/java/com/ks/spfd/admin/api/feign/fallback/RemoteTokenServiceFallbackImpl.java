package com.ks.spfd.admin.api.feign.fallback;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ks.spfd.admin.api.dto.OauthTokenDto;
import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.common.core.util.R;

/**
 * @author lengleng
 * @date 2019/2/1
 * feign token  fallback
 */
@Component
public class RemoteTokenServiceFallbackImpl implements RemoteTokenService {
	
	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	private Throwable cause;

	/**
	 * 分页查询token 信息
	 *
	 * @param params 分页参数
	 * @param from   内部调用标志
	 * @return page
	 */
	@Override
	public R selectPage(Map<String, Object> params, String from) {
		LOGGER.error("调用认证中心查询token 失败", cause);
		return null;
	}

	/**
	 * 删除token
	 *
	 *
	 * @param s
	 * @param id
	 * @return
	 */
	@Override
	public R<Boolean> deleteTokenById(String s, String id) {
		LOGGER.error("删除token 失败 {}", id, cause);
		return null;
	}

	public Throwable getCause() {
		return cause;
	}

	public void setCause(Throwable cause) {
		this.cause = cause;
	}

	@Override
	public OauthTokenDto remoteOauth(String from, String username, String password, String grant_type, String sope, String client_id,
			String client_secret) {
		LOGGER.error("内部调用token授权 失败 {}", username, cause);
		return null;
	}
}
