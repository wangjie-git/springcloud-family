package com.ks.spfd.codegen.entity;

/**
 * 列属性： https://blog.csdn.net/lkforce/article/details/79557482
 * @author HWB
 *2019年5月8日上午11:26:26
 */
public class ColumnEntity {
	/**
	 * 列表
	 */
	private String columnName;
	/**
	 * 数据类型
	 */
	private String dataType;
	/**
	 * 备注
	 */
	private String comments;

	/**
	 * 驼峰属性
	 */
	private String caseAttrName;
	/**
	 * 普通属性
	 */
	private String lowerAttrName;
	/**
	 * 属性类型
	 */
	private String attrType;
	/**
	 * 其他信息。
	 */
	private String extra;

	public ColumnEntity() {
		super();
	}

	public ColumnEntity(String columnName, String dataType, String comments, String caseAttrName, String lowerAttrName,
			String attrType, String extra) {
		super();
		this.columnName = columnName;
		this.dataType = dataType;
		this.comments = comments;
		this.caseAttrName = caseAttrName;
		this.lowerAttrName = lowerAttrName;
		this.attrType = attrType;
		this.extra = extra;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getCaseAttrName() {
		return caseAttrName;
	}

	public void setCaseAttrName(String caseAttrName) {
		this.caseAttrName = caseAttrName;
	}

	public String getLowerAttrName() {
		return lowerAttrName;
	}

	public void setLowerAttrName(String lowerAttrName) {
		this.lowerAttrName = lowerAttrName;
	}

	public String getAttrType() {
		return attrType;
	}

	public void setAttrType(String attrType) {
		this.attrType = attrType;
	}

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}
}
