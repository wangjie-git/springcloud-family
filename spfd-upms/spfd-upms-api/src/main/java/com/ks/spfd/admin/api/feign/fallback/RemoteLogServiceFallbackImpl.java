package com.ks.spfd.admin.api.feign.fallback;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ks.spfd.admin.api.entity.SysLog;
import com.ks.spfd.admin.api.feign.RemoteLogService;
import com.ks.spfd.common.core.util.R;

/**
 * 
 * @author HWB
 *2019年5月8日上午9:58:47
 */
@Component
public class RemoteLogServiceFallbackImpl implements RemoteLogService {
	
	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	private Throwable cause;

	/**
	 * 保存日志
	 *
	 * @param sysLog 日志实体
	 * @param from   内部调用标志
	 * @return succes、false
	 */
	@Override
	public R<Boolean> saveLog(SysLog sysLog, String from) {
		LOGGER.error("feign 插入日志失败", cause);
		return null;
	}

	public Throwable getCause() {
		return cause;
	}

	public void setCause(Throwable cause) {
		this.cause = cause;
	}
}
