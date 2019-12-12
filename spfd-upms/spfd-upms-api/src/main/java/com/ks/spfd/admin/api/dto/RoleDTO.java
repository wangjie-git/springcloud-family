package com.ks.spfd.admin.api.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import com.ks.spfd.admin.api.entity.SysRole;

import lombok.EqualsAndHashCode;

/**
 * 角色DTO
 * @author HWB
 *2019年5月8日上午10:10:07
 */
@EqualsAndHashCode(callSuper = true)
public class RoleDTO extends SysRole {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 角色部门Id
	 */
	private Integer roleDeptId;

	/**
	 * 部门名称
	 */
	private String deptName;

	public Integer getRoleDeptId() {
		return roleDeptId;
	}

	public void setRoleDeptId(Integer roleDeptId) {
		this.roleDeptId = roleDeptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public RoleDTO() {
		super();
	}

	public RoleDTO(Integer roleId, @NotBlank(message = "角色名称 不能为空") String roleName,
			@NotBlank(message = "角色标识 不能为空") String roleCode, @NotBlank(message = "角色描述 不能为空") String roleDesc,
			LocalDateTime createTime, LocalDateTime updateTime, String delFlag) {
		super(roleId, roleName, roleCode, roleDesc, createTime, updateTime, delFlag);
	}

	public RoleDTO(Integer roleId, @NotBlank(message = "角色名称 不能为空") String roleName,
			@NotBlank(message = "角色标识 不能为空") String roleCode, @NotBlank(message = "角色描述 不能为空") String roleDesc,
			LocalDateTime createTime, LocalDateTime updateTime, String delFlag, Integer roleDeptId, String deptName) {
		super(roleId, roleName, roleCode, roleDesc, createTime, updateTime, delFlag);
		this.roleDeptId = roleDeptId;
		this.deptName = deptName;
	}
}
