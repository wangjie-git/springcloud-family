package com.ks.spfd.admin.api.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ks.spfd.admin.api.entity.SysUser;

import lombok.EqualsAndHashCode;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:10:34
 */
@EqualsAndHashCode(callSuper = true)
public class UserDTO extends SysUser {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1109623090380229879L;

	/**
	 * 角色ID
	 */
	private List<Integer> role;

	private String orgId;

	/**
	 * 新密码
	 */
	private String newpassword1;

	public List<Integer> getRole() {
		return role;
	}

	public void setRole(List<Integer> role) {
		this.role = role;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getNewpassword1() {
		return newpassword1;
	}

	public void setNewpassword1(String newpassword1) {
		this.newpassword1 = newpassword1;
	}

	public UserDTO(List<Integer> role, String orgId, String newpassword1) {
		super();
		this.role = role;
		this.orgId = orgId;
		this.newpassword1 = newpassword1;
	}

	public UserDTO() {
		super();
	}

	public UserDTO(Integer userId, String username, String password, String salt, LocalDateTime createTime,
			LocalDateTime updateTime, String delFlag, String lockFlag, String phone, String avatar, String orgId,
			String wxOpenid, String qqOpenid,String empid) {
		super(userId, username, password, salt, createTime, updateTime, delFlag, lockFlag, phone, avatar, orgId, wxOpenid,
				qqOpenid,empid);
	}
}
