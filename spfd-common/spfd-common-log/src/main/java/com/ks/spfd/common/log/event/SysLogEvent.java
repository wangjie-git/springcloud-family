package com.ks.spfd.common.log.event;

import org.springframework.context.ApplicationEvent;

import com.ks.spfd.admin.api.entity.SysLog;

/**
 * 系统日志事件
 * @author HWB
 *2019年5月8日上午10:26:51
 */
public class SysLogEvent extends ApplicationEvent {

	public SysLogEvent(SysLog source) {
		super(source);
	}
}
