package com.ks.spfd.common.security.component;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.Ordered;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.security.annotation.Inner;

import cn.hutool.core.util.StrUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

/**
 * 服务间接口不鉴权处理逻辑
 * @author HWB
 *2019年5月8日上午10:29:43
 */
@Slf4j
@Aspect
@Component
public class PigSecurityInnerAspect implements Ordered {
	private final HttpServletRequest request;

	@SneakyThrows
	@Around("@annotation(inner)")
	public Object around(ProceedingJoinPoint point, Inner inner) throws Throwable {
		String header = request.getHeader(SecurityConstants.FROM);
		if (inner.value() && !StrUtil.equals(SecurityConstants.FROM_IN, header)) {
			System.out.println("访问接口 {} 没有权限" + point.getSignature().getName());
			throw new AccessDeniedException("Access is denied");
		}
		return point.proceed();
	}

	@Override
	public int getOrder() {
		return Ordered.HIGHEST_PRECEDENCE + 1;
	}

	public PigSecurityInnerAspect(HttpServletRequest request) {
		super();
		this.request = request;
	}
}
