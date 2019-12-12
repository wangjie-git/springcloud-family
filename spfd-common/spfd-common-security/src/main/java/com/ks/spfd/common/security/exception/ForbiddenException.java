package com.ks.spfd.common.security.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author HWB 2019年5月8日上午10:23:39
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class ForbiddenException extends PigAuth2Exception {

	private static final long serialVersionUID = -507959186900054758L;

	public ForbiddenException(String msg, Throwable t) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "access_denied";
	}

	@Override
	public int getHttpErrorCode() {
		return HttpStatus.FORBIDDEN.value();
	}

}
