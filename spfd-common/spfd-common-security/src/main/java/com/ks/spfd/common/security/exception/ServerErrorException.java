package com.ks.spfd.common.security.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:24:46
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class ServerErrorException extends PigAuth2Exception {

	private static final long serialVersionUID = -7134002112359891668L;

	public ServerErrorException(String msg, Throwable t) {
		super(msg);
	}

	@Override
	public String getOAuth2ErrorCode() {
		return "server_error";
	}

	@Override
	public int getHttpErrorCode() {
		return HttpStatus.INTERNAL_SERVER_ERROR.value();
	}

}
