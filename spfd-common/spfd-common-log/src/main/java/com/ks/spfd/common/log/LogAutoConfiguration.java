package com.ks.spfd.common.log;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

import com.ks.spfd.admin.api.feign.RemoteLogService;
import com.ks.spfd.common.log.aspect.SysLogAspect;
import com.ks.spfd.common.log.event.SysLogListener;

/**
 * 日志自动配置
 * @author HWB
 *2019年5月8日上午10:25:26
 */
@EnableAsync
@Configuration
@ConditionalOnWebApplication
@EnableFeignClients({ "com.ks.spfd.admin.api.feign" })
public class LogAutoConfiguration {
	
	private final RemoteLogService remoteLogService;

	@Bean
	public SysLogListener sysLogListener() {
		return new SysLogListener(remoteLogService);
	}

	@Bean
	public SysLogAspect sysLogAspect() {
		return new SysLogAspect();
	}

	public LogAutoConfiguration(RemoteLogService remoteLogService) {
		super();
		this.remoteLogService = remoteLogService;
	}
}
