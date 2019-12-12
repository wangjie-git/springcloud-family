package com.ks.spfd.admin.api.vo;

/**
 * 前端日志vo
 * @author HWB
 *2019年5月8日上午8:39:14
 */
public class PreLogVo {
	
	private String url;
	
	private String time;
	
	private String user;
	
	private String type;
	
	private String message;
	
	private String stack;
	
	private String info;

	
	public PreLogVo() {
		super();
	}

	public PreLogVo(String url, String time, String user, String type, String message, String stack, String info) {
		super();
		this.url = url;
		this.time = time;
		this.user = user;
		this.type = type;
		this.message = message;
		this.stack = stack;
		this.info = info;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStack() {
		return stack;
	}

	public void setStack(String stack) {
		this.stack = stack;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
}
