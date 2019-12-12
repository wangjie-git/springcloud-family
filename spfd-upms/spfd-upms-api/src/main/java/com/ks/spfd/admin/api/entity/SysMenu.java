package com.ks.spfd.admin.api.entity;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import lombok.EqualsAndHashCode;

/**
 * <p>
 * 菜单权限表
 * </p>
 * @author HWB
 *2019年5月8日上午10:13:29
 */
@EqualsAndHashCode(callSuper = true)
public class SysMenu extends Model<SysMenu> {

	private static final long serialVersionUID = 1L;

	/**
	 * 菜单ID
	 */
	@NotNull(message = "菜单ID不能为空")
	@TableId(value = "menu_id", type = IdType.INPUT)
	private Integer menuId;
	/**
	 * 菜单名称
	 */
	@NotBlank(message = "菜单名称不能为空")
	private String name;
	/**
	 * 菜单权限标识
	 */
	private String permission;
	/**
	 * 父菜单ID
	 */
	@NotNull(message = "菜单父ID不能为空")
	private Integer parentId;
	/**
	 * 图标
	 */
	private String icon;
	/**
	 * VUE页面
	 */
	private String component;
	/**
	 * 排序值
	 */
	private Integer sort;
	/**
	 * 菜单类型 （0菜单 1按钮）
	 */
	@NotNull(message = "菜单类型不能为空")
	private String type;
	/**
	 * 路由缓冲
	 */
	private String keepAlive;
	/**
	 * 创建时间
	 */
	private LocalDateTime createTime;
	/**
	 * 更新时间
	 */
	private LocalDateTime updateTime;
	/**
	 * 0--正常 1--删除
	 */
	@TableLogic
	private String delFlag;
	/**
	 * 前端URL
	 */
	private String path;
	public SysMenu(@NotNull(message = "菜单ID不能为空") Integer menuId, @NotBlank(message = "菜单名称不能为空") String name,
			String permission, @NotNull(message = "菜单父ID不能为空") Integer parentId, String icon, String component,
			Integer sort, @NotNull(message = "菜单类型不能为空") String type, String keepAlive, LocalDateTime createTime,
			LocalDateTime updateTime, String delFlag, String path) {
		super();
		this.menuId = menuId;
		this.name = name;
		this.permission = permission;
		this.parentId = parentId;
		this.icon = icon;
		this.component = component;
		this.sort = sort;
		this.type = type;
		this.keepAlive = keepAlive;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.delFlag = delFlag;
		this.path = path;
	}
	public Integer getMenuId() {
		return menuId;
	}
	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getComponent() {
		return component;
	}
	public void setComponent(String component) {
		this.component = component;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getKeepAlive() {
		return keepAlive;
	}
	public void setKeepAlive(String keepAlive) {
		this.keepAlive = keepAlive;
	}
	public LocalDateTime getCreateTime() {
		return createTime;
	}
	public void setCreateTime(LocalDateTime createTime) {
		this.createTime = createTime;
	}
	public LocalDateTime getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(LocalDateTime updateTime) {
		this.updateTime = updateTime;
	}
	public String getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
}
