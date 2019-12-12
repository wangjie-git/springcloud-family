package com.ks.spfd.admin.api.feign.factory;

import com.ks.spfd.admin.api.feign.RemoteLogService;
import com.ks.spfd.admin.api.feign.fallback.RemoteLogServiceFallbackImpl;

import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:00:01
 */
@Component
public class RemoteLogServiceFallbackFactory implements FallbackFactory<RemoteLogService> {

	@Override
	public RemoteLogService create(Throwable throwable) {
		RemoteLogServiceFallbackImpl remoteLogServiceFallback = new RemoteLogServiceFallbackImpl();
		remoteLogServiceFallback.setCause(throwable);
		return remoteLogServiceFallback;
	}
}
