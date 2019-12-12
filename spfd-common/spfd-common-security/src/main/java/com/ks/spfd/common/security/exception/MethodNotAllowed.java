package com.ks.spfd.common.security.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:24:06
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class MethodNotAllowed extends PigAuth2Exception {
	
	private static final long serialVersionUID = 7216497722352852835L;

	public MethodNotAllowed(String msg, Throwable t) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "method_not_allowed";
	}

	@Override
	public int getHttpErrorCode() {
		return HttpStatus.METHOD_NOT_ALLOWED.value();
	}

}
