package com.ks.spfd.admin.api.vo;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 菜单权限表
 * @author HWB
 *2019年5月8日上午8:38:53
 */
public class MenuVO implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 菜单ID
	 */
	private Integer menuId;
	/**
	 * 菜单名称
	 */
	private String name;
	/**
	 * 菜单权限标识
	 */
	private String permission;

	/**
	 * 一个路径
	 */
	private String path;

	/**
	 * 父菜单ID
	 */
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
	private String type;
	/**
	 * 是否缓冲
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
	private String delFlag;

	@Override
	public int hashCode() {
		return menuId.hashCode();
	}

	/**
	 * menuId 相同则相同
	 *
	 * @param obj
	 * @return
	 */
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof MenuVO) {
			Integer targetMenuId = ((MenuVO) obj).getMenuId();
			return menuId.equals(targetMenuId);
		}
		return super.equals(obj);
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

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
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

	public MenuVO(Integer menuId, String name, String permission, String path, Integer parentId, String icon,
			String component, Integer sort, String type, String keepAlive, LocalDateTime createTime,
			LocalDateTime updateTime, String delFlag) {
		super();
		this.menuId = menuId;
		this.name = name;
		this.permission = permission;
		this.parentId = parentId;
		this.icon = icon;
		this.path = path;
		this.component = component;
		this.sort = sort;
		this.type = type;
		this.keepAlive = keepAlive;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.delFlag = delFlag;
	}
}
