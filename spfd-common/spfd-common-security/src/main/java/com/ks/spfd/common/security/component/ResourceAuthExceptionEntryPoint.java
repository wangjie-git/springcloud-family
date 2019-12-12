package com.ks.spfd.common.security.component;

import cn.hutool.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ks.spfd.common.core.constant.CommonConstants;
import com.ks.spfd.common.core.util.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 客户端异常处理 1. 可以根据 AuthenticationException 不同细化异常处理 用来解决匿名用户访问无权限资源时的异常
 * 
 * @author HWB 2019年5月8日上午10:28:39
 */
@Slf4j
@Component
public class ResourceAuthExceptionEntryPoint implements AuthenticationEntryPoint {

	private final ObjectMapper objectMapper;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException {
		response.setCharacterEncoding(CommonConstants.UTF8);
		response.setContentType(CommonConstants.CONTENT_TYPE);
		R<String> result = new R<>();
		result.setCode(HttpStatus.HTTP_UNAUTHORIZED);
		if (authException != null) {
			result.setMsg("error");
			result.setData(authException.getMessage());
		}
		response.setStatus(HttpStatus.HTTP_UNAUTHORIZED);
		PrintWriter printWriter = response.getWriter();
		printWriter.append(objectMapper.writeValueAsString(result));
	}

	public ResourceAuthExceptionEntryPoint(ObjectMapper objectMapper) {
		super();
		this.objectMapper = objectMapper;
	}
}