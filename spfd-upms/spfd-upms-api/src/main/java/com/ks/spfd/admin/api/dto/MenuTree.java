package com.ks.spfd.admin.api.dto;

import com.ks.spfd.admin.api.vo.MenuVO;

import lombok.EqualsAndHashCode;

/**
 * 菜单树
 * @author HWB
 *2019年5月8日上午10:00:58
 */
@EqualsAndHashCode(callSuper = true)
public class MenuTree extends TreeNode {
	private String icon;
	private String title;
	private boolean spread = false;
	private String path;
	private String component;
	private String authority;
	private String redirect;
	private String keepAlive;
	private String code;
	private String type;
	private String label;
	private Integer sort;

	private MenuTreeMark checkArr;

	public MenuTree() {
	}

	public MenuTree(String id, String title, String parentId) {
		this.id = id;
		this.parentId = parentId;
		this.title = title;
		this.label = title;
	}

	public MenuTree(String id, String title, MenuTree parent) {
		this.id = id;
		this.parentId = parent.getId();
		this.title = title;
		this.label = title;
	}

	public MenuTree(MenuVO menuVo) {
		this.id = menuVo.getMenuId() + "";//TODO 未完待续
		this.parentId = menuVo.getParentId() + "";//TODO 
		this.icon = menuVo.getIcon();
		this.title = menuVo.getName();
		this.path = menuVo.getPath();
		this.component = menuVo.getComponent();
		this.type = menuVo.getType();
		this.label = menuVo.getName();
		this.sort = menuVo.getSort();
		this.keepAlive = menuVo.getKeepAlive();
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isSpread() {
		return spread;
	}

	public void setSpread(boolean spread) {
		this.spread = spread;
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

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getRedirect() {
		return redirect;
	}

	public void setRedirect(String redirect) {
		this.redirect = redirect;
	}

	public String getKeepAlive() {
		return keepAlive;
	}

	public void setKeepAlive(String keepAlive) {
		this.keepAlive = keepAlive;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public MenuTree(String icon, String title, boolean spread, String path, String component, String authority,
			String redirect, String keepAlive, String code, String type, String label, Integer sort) {
		super();
		this.icon = icon;
		this.title = title;
		this.spread = spread;
		this.path = path;
		this.component = component;
		this.authority = authority;
		this.redirect = redirect;
		this.keepAlive = keepAlive;
		this.code = code;
		this.type = type;
		this.label = label;
		this.sort = sort;
	}

	public MenuTreeMark getCheckArr() {
		return checkArr;
	}

	public void setCheckArr(MenuTreeMark checkArr) {
		this.checkArr = checkArr;
	}
}
