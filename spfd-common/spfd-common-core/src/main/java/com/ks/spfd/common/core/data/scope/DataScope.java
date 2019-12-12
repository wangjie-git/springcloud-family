package com.ks.spfd.common.core.data.scope;

import java.util.HashMap;
import java.util.List;

import lombok.EqualsAndHashCode;

/**
 * 数据权限查询参数
 * @author HWB
 *2019年5月8日上午10:37:02
 */
@SuppressWarnings("rawtypes")
@EqualsAndHashCode(callSuper = true)
public class DataScope extends HashMap {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3284258072922440385L;

	/**
	 * 限制范围的字段名称
	 */
	private String scopeName = "deptId";

	/**
	 * 具体的数据范围
	 */
	private List<Integer> deptIds;

	/**
	 * 是否只查询本部门
	 */
	private Boolean isOnly = false;

	public DataScope(String scopeName, List<Integer> deptIds, Boolean isOnly) {
		super();
		this.scopeName = scopeName;
		this.deptIds = deptIds;
		this.isOnly = isOnly;
	}

	public String getScopeName() {
		return scopeName;
	}

	public void setScopeName(String scopeName) {
		this.scopeName = scopeName;
	}

	public List<Integer> getDeptIds() {
		return deptIds;
	}

	public void setDeptIds(List<Integer> deptIds) {
		this.deptIds = deptIds;
	}

	public Boolean getIsOnly() {
		return isOnly;
	}

	public void setIsOnly(Boolean isOnly) {
		this.isOnly = isOnly;
	}
}