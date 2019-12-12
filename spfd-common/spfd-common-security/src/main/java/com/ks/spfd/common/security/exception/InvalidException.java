package com.ks.spfd.common.security.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:23:56
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class InvalidException extends PigAuth2Exception {

	private static final long serialVersionUID = -2557512207684701461L;

	public InvalidException(String msg, Throwable t) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "invalid_exception";
	}

	@Override
	public int getHttpErrorCode() {
		return 426;
	}

}
