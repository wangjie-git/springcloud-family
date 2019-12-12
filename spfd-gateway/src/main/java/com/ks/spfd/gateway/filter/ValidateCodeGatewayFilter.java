package com.ks.spfd.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ks.spfd.common.core.config.FilterIgnorePropertiesConfig;
import com.ks.spfd.common.core.constant.CommonConstants;
import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.core.exception.ValidateCodeException;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.core.util.WebUtils;

import cn.hutool.core.util.StrUtil;
import lombok.SneakyThrows;
import reactor.core.publisher.Mono;

/**
 * 验证码处理
 * @author HWB
 *2019年5月7日下午2:57:50
 */
@Component
public class ValidateCodeGatewayFilter extends AbstractGatewayFilterFactory {
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;
	private final FilterIgnorePropertiesConfig filterIgnorePropertiesConfig;

	@Override
	public GatewayFilter apply(Object config) {
		return (exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();

			// 不是登录请求，直接向下执行
			if (!StrUtil.containsAnyIgnoreCase(request.getURI().getPath(), SecurityConstants.OAUTH_TOKEN_URL)) {
				return chain.filter(exchange);
			}

			// 刷新token，直接向下执行
			String grantType = request.getQueryParams().getFirst("grant_type");
			if (StrUtil.equals(SecurityConstants.REFRESH_TOKEN, grantType)) {
				return chain.filter(exchange);
			}

			// 终端设置不校验， 直接向下执行
			try {
				String[] clientInfos = WebUtils.getClientId(request);
				if (filterIgnorePropertiesConfig. getClients().contains(clientInfos[0])) {
					return chain.filter(exchange);
				}

				// 校验验证码
				checkCode(request);
			} catch (Exception e) {
				ServerHttpResponse response = exchange.getResponse();
				response.setStatusCode(HttpStatus.PRECONDITION_REQUIRED);
				try {
					return response.writeWith(Mono.just(response.bufferFactory()
							.wrap(objectMapper.writeValueAsBytes(new R(CommonConstants.FAIL, e.getMessage())))));
				} catch (JsonProcessingException e1) {
					System.out.println("对象输出异常" + e1.getMessage());
				}
			}

			return chain.filter(exchange);
		};
	}

	/**
	 * 检查code
	 *
	 * @param request
	 * @throws ValidateCodeException 
	 */
	@SneakyThrows
	private void checkCode(ServerHttpRequest request) throws ValidateCodeException {
		String code = request.getQueryParams().getFirst("code");

		if (StrUtil.isBlank(code)) {
			throw new ValidateCodeException("验证码不能为空");
		}

		String randomStr = request.getQueryParams().getFirst("randomStr");
		if (StrUtil.isBlank(randomStr)) {
			randomStr = request.getQueryParams().getFirst("mobile");
		}

		String key = CommonConstants.DEFAULT_CODE_KEY + randomStr;
		if (!redisTemplate.hasKey(key)) {
			throw new ValidateCodeException("验证码不合法");
		}

		Object codeObj = redisTemplate.opsForValue().get(key);

		if (codeObj == null) {
			throw new ValidateCodeException("验证码不合法");
		}

		String saveCode = codeObj.toString();
		if (StrUtil.isBlank(saveCode)) {
			redisTemplate.delete(key);
			throw new ValidateCodeException("验证码不合法");
		}

		if (!StrUtil.equals(saveCode, code)) {
			redisTemplate.delete(key);
			throw new ValidateCodeException("验证码不合法");
		}

		redisTemplate.delete(key);
	}

	public ValidateCodeGatewayFilter(ObjectMapper objectMapper, RedisTemplate redisTemplate,
			FilterIgnorePropertiesConfig filterIgnorePropertiesConfig) {
		super();
		this.objectMapper = objectMapper;
		this.redisTemplate = redisTemplate;
		this.filterIgnorePropertiesConfig = filterIgnorePropertiesConfig;
	}
}