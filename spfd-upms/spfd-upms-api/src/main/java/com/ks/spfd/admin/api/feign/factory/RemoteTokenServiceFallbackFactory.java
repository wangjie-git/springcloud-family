package com.ks.spfd.admin.api.feign.factory;

import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.admin.api.feign.fallback.RemoteTokenServiceFallbackImpl;

import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;
/**
 * 
 * @author HWB
 *2019年5月8日上午10:00:17
 */
@Component
public class RemoteTokenServiceFallbackFactory implements FallbackFactory<RemoteTokenService> {

	@Override
	public RemoteTokenService create(Throwable throwable) {
		RemoteTokenServiceFallbackImpl remoteTokenServiceFallback = new RemoteTokenServiceFallbackImpl();
		remoteTokenServiceFallback.setCause(throwable);
		return remoteTokenServiceFallback;
	}
}
