package com.ks.spfd.common.core.exception;
/**
 * 
 * @author HWB
 *2019年5月8日上午10:41:03
 */
public class ValidateCodeException extends Exception {
	private static final long serialVersionUID = -7285211528095468156L;

	public ValidateCodeException() {
	}

	public ValidateCodeException(String msg) {
		super(msg);
	}
}