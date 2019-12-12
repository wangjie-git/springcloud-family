package com.ks.spfd.common.log.annotation;

import java.lang.annotation.*;

/**
 * 操作日志注解
 * @author HWB
 *2019年5月8日上午10:28:02
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

	/**
	 * 描述
	 *
	 * @return {String}
	 */
	String value();
}
