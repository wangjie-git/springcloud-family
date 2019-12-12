package com.ks.spfd.admin.api.dto;

import java.io.Serializable;

import com.ks.spfd.admin.api.entity.SysUser;

/**
 * @author HWB
 * @date 2019/5/8
 * <p>
 * commit('SET_ROLES', data)
 * commit('SET_NAME', data)
 * commit('SET_AVATAR', data)
 * commit('SET_INTRODUCTION', data)
 * commit('SET_PERMISSIONS', data)
 */
public class UserInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户基本信息
	 */
	private SysUser sysUser;
	/**
	 * 权限标识集合
	 */
	private String[] permissions;

	/**
	 * 角色集合
	 */
	private Integer[] roles;

	public SysUser getSysUser() {
		return sysUser;
	}

	public void setSysUser(SysUser sysUser) {
		this.sysUser = sysUser;
	}

	public String[] getPermissions() {
		return permissions;
	}

	public void setPermissions(String[] permissions) {
		this.permissions = permissions;
	}

	public Integer[] getRoles() {
		return roles;
	}

	public void setRoles(Integer[] roles) {
		this.roles = roles;
	}

	public UserInfo() {
		super();
	}

	public UserInfo(SysUser sysUser, String[] permissions, Integer[] roles) {
		super();
		this.sysUser = sysUser;
		this.permissions = permissions;
		this.roles = roles;
	}
}