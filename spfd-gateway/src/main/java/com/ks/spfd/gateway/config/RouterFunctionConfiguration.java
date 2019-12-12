package com.ks.spfd.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;

import com.ks.spfd.gateway.handler.HystrixFallbackHandler;
import com.ks.spfd.gateway.handler.ImageCodeHandler;

/**
 * 路由配置信息
 * @author HWB
 *2019年5月7日下午2:58:57
 */
@Configuration
public class RouterFunctionConfiguration {
	private final HystrixFallbackHandler hystrixFallbackHandler;
	private final ImageCodeHandler imageCodeHandler;

	@Bean
	public RouterFunction routerFunction() {
		return RouterFunctions
				.route(RequestPredicates.path("/fallback").and(RequestPredicates.accept(MediaType.TEXT_PLAIN)),
						hystrixFallbackHandler)
				.andRoute(RequestPredicates.GET("/code").and(RequestPredicates.accept(MediaType.TEXT_PLAIN)),
						imageCodeHandler);

	}

	public RouterFunctionConfiguration(HystrixFallbackHandler hystrixFallbackHandler,
			ImageCodeHandler imageCodeHandler) {
		super();
		this.hystrixFallbackHandler = hystrixFallbackHandler;
		this.imageCodeHandler = imageCodeHandler;
	}
}