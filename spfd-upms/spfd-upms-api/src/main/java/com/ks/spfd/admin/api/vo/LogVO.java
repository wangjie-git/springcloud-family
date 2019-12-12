package com.ks.spfd.admin.api.vo;

import lombok.Data;

import java.io.Serializable;

import com.ks.spfd.admin.api.entity.SysLog;
/**
 * 
 * @author HWB
 *2019年5月8日上午8:38:43
 */
@Data
public class LogVO implements Serializable {
	private static final long serialVersionUID = 1L;

	private SysLog sysLog;
	private String username;
}
