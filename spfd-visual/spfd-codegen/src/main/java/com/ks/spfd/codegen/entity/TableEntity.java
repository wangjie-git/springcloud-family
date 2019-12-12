package com.ks.spfd.codegen.entity;

import java.util.List;

/**
 * 表属性： https://blog.csdn.net/lkforce/article/details/79557482
 * @author HWB
 *2019年5月8日上午11:27:19
 */
public class TableEntity {
	/**
	 * 名称
	 */
	private String tableName;
	/**
	 * 备注
	 */
	private String comments;
	/**
	 * 主键
	 */
	private ColumnEntity pk;
	/**
	 * 列名
	 */
	private List<ColumnEntity> columns;
	/**
	 * 驼峰类型
	 */
	private String caseClassName;
	/**
	 * 普通类型
	 */
	private String lowerClassName;

	public TableEntity(String tableName, String comments, ColumnEntity pk, List<ColumnEntity> columns,
			String caseClassName, String lowerClassName) {
		super();
		this.tableName = tableName;
		this.comments = comments;
		this.pk = pk;
		this.columns = columns;
		this.caseClassName = caseClassName;
		this.lowerClassName = lowerClassName;
	}

	public TableEntity() {
		super();
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public ColumnEntity getPk() {
		return pk;
	}

	public void setPk(ColumnEntity pk) {
		this.pk = pk;
	}

	public List<ColumnEntity> getColumns() {
		return columns;
	}

	public void setColumns(List<ColumnEntity> columns) {
		this.columns = columns;
	}

	public String getCaseClassName() {
		return caseClassName;
	}

	public void setCaseClassName(String caseClassName) {
		this.caseClassName = caseClassName;
	}

	public String getLowerClassName() {
		return lowerClassName;
	}

	public void setLowerClassName(String lowerClassName) {
		this.lowerClassName = lowerClassName;
	}
}