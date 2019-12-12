package com.ks.spfd.admin.api.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.ks.spfd.admin.api.entity.SysLog;
import com.ks.spfd.admin.api.feign.factory.RemoteLogServiceFallbackFactory;
import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.core.constant.ServiceNameConstants;
import com.ks.spfd.common.core.util.R;

/**
 * 
 * @author HWB
 *2019年5月8日上午9:58:20
 */
@FeignClient(value = ServiceNameConstants.UMPS_SERVICE, fallbackFactory = RemoteLogServiceFallbackFactory.class)
public interface RemoteLogService {
	/**
	 * 保存日志
	 *
	 * @param sysLog 日志实体
	 * @param from   内部调用标志
	 * @return succes、false
	 */
	@PostMapping("/log")
	R<Boolean> saveLog(@RequestBody SysLog sysLog, @RequestHeader(SecurityConstants.FROM) String from);
}
