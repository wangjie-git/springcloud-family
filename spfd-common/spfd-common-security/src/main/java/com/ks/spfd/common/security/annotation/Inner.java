package com.ks.spfd.common.security.annotation;

import java.lang.annotation.*;
/**
 *  服务调用不鉴权注解
 * @author HWB
 *2019年5月8日上午10:33:20
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Inner {

	/**
	 * 是否AOP统一处理
	 *
	 * @return false, true
	 */
	boolean value() default true;

	/**
	 * 需要特殊判空的字段(预留)
	 *
	 * @return {}
	 */
	String[] field() default {};
}
