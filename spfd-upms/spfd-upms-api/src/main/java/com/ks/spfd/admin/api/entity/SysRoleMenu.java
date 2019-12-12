package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 角色菜单表
 *
 * @author wangjie
 * @date 2019-12-11 11:11:33
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_role_menu")
public class SysRoleMenu extends Model<SysRoleMenu> {
	private static final long serialVersionUID = 1L;

	/**
	 *
	 */
	@TableId
	private Integer id;
	/**
	 * 角色ID
	 */
	private Integer roleId;
	/**
	 * 菜单ID
	 */
	private Integer menuId;

}