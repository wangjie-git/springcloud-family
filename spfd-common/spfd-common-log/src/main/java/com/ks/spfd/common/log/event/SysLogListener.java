package com.ks.spfd.common.log.event;

import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;

import com.ks.spfd.admin.api.entity.SysLog;
import com.ks.spfd.admin.api.feign.RemoteLogService;
import com.ks.spfd.common.core.constant.SecurityConstants;

import lombok.extern.slf4j.Slf4j;

/**
 *  异步监听日志事件
 * @author HWB
 *2019年5月8日上午10:27:00
 */
@Slf4j
public class SysLogListener {
	private final RemoteLogService remoteLogService;

	@Async
	@Order
	@EventListener(SysLogEvent.class)
	public void saveSysLog(SysLogEvent event) {
		SysLog sysLog = (SysLog) event.getSource();
		remoteLogService.saveLog(sysLog, SecurityConstants.FROM_IN);
	}

	public SysLogListener(RemoteLogService remoteLogService) {
		super();
		this.remoteLogService = remoteLogService;
	}

}
