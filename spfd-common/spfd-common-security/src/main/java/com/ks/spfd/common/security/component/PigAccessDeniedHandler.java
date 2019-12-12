package com.ks.spfd.common.security.component;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ks.spfd.common.core.constant.CommonConstants;
import com.ks.spfd.common.core.exception.PigDeniedException;
import com.ks.spfd.common.core.util.R;

import cn.hutool.http.HttpStatus;

/**
 * <p>
 * 授权拒绝处理器，覆盖默认的OAuth2AccessDeniedHandler 包装失败信息到PigDeniedException
 * 
 * @author HWB 2019年5月8日上午10:31:00
 */
@Component
public class PigAccessDeniedHandler extends OAuth2AccessDeniedHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(PigAccessDeniedHandler.class);

	@Autowired
	ObjectMapper objectMapper;

	/**
	 * 授权拒绝处理，使用R包装
	 *
	 * @param request       request
	 * @param response      response
	 * @param authException authException
	 * @throws IOException      IOException
	 * @throws ServletException ServletException
	 */
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException authException)
			throws IOException, ServletException {
		LOGGER.info("授权失败，禁止访问 {}", request.getRequestURI());
		response.setCharacterEncoding(CommonConstants.UTF8);
		response.setContentType(CommonConstants.CONTENT_TYPE);
		R<String> result = new R<>(new PigDeniedException("授权失败，禁止访问"));
		response.setStatus(HttpStatus.HTTP_FORBIDDEN);
		PrintWriter printWriter = response.getWriter();
		printWriter.append(objectMapper.writeValueAsString(result));
	}
}
