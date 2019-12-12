package com.ks.spfd.common.security.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:24:57
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class UnauthorizedException extends PigAuth2Exception {

	private static final long serialVersionUID = 3667755518662344517L;

	public UnauthorizedException(String msg, Throwable t) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "unauthorized";
	}

	@Override
	public int getHttpErrorCode() {
		return HttpStatus.UNAUTHORIZED.value();
	}

}
