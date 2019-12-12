package com.ks.spfd.common.core.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ks.spfd.common.core.util.R;

import java.util.List;

/**
 * 全局的的异常处理器
 * @author HWB
 *2019年5月8日上午10:39:58
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	/**
	 * 全局异常.
	 *
	 * @param e the e
	 * @return R
	 */
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public R exception(Exception e) {
		System.out.println("全局异常信息 ex={}" + e.getMessage());
		return new R<>(e);
	}

	/**
	 * validation Exception
	 *
	 * @param exception
	 * @return R
	 */
	@ExceptionHandler({ MethodArgumentNotValidException.class, BindException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public R bodyValidExceptionHandler(MethodArgumentNotValidException exception) {
		List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
		R result = new R();
		result.setMsg(fieldErrors.get(0).getDefaultMessage());
		System.out.println(fieldErrors.get(0).getDefaultMessage());
		return result;
	}

}
