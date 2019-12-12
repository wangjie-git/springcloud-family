package com.ks.spfd.common.security.exception;

import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ks.spfd.common.security.component.PigAuth2ExceptionSerializer;


/**
 * 自定义OAuth2Exception
 * 
 * @author HWB 2019年5月8日上午10:24:29
 */
@JsonSerialize(using = PigAuth2ExceptionSerializer.class)
public class PigAuth2Exception extends OAuth2Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8485067751026714363L;

	private String errorCode;

	public PigAuth2Exception(String msg) {
		super(msg);
	}

	public PigAuth2Exception(String msg, String errorCode) {
		super(msg);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

}
