package com.ks.spfd.admin.api.feign.factory;

import com.ks.spfd.admin.api.feign.RemoteUserService;
import com.ks.spfd.admin.api.feign.fallback.RemoteUserServiceFallbackImpl;

import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:00:24
 */
@Component
public class RemoteUserServiceFallbackFactory implements FallbackFactory<RemoteUserService> {

	@Override
	public RemoteUserService create(Throwable throwable) {
		RemoteUserServiceFallbackImpl remoteUserServiceFallback = new RemoteUserServiceFallbackImpl();
		remoteUserServiceFallback.setCause(throwable);
		return remoteUserServiceFallback;
	}
}
