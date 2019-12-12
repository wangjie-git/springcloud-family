package com.ks.spfd.admin.api.feign.factory;

import com.ks.spfd.admin.api.feign.RemoteBaseCacheService;
import com.ks.spfd.admin.api.feign.fallback.RemoteBaseCacheServiceFallbackImpl;
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;


@Component
public class RemoteBaseCacheServiceFallbackFactory implements FallbackFactory<RemoteBaseCacheService> {

	@Override
	public RemoteBaseCacheService create(Throwable throwable) {
		RemoteBaseCacheServiceFallbackImpl remoteLogServiceFallback = new RemoteBaseCacheServiceFallbackImpl();
		remoteLogServiceFallback.setCause(throwable);
		return remoteLogServiceFallback;
	}
}
