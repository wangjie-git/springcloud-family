package com.ks.spfd.admin.api.feign.factory;

import com.ks.spfd.admin.api.feign.RemoteGeneratorService;
import com.ks.spfd.admin.api.feign.fallback.RemoteGeneratorServiceFallbackImpl;
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;


@Component
public class RemoteGeneratorServiceFallbackFactory implements FallbackFactory<RemoteGeneratorService> {

	@Override
	public RemoteGeneratorService create(Throwable throwable) {
		RemoteGeneratorServiceFallbackImpl remoteLogServiceFallback = new RemoteGeneratorServiceFallbackImpl();
		remoteLogServiceFallback.setCause(throwable);
		return remoteLogServiceFallback;
	}
}
