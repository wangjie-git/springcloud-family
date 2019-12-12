package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;

import lombok.EqualsAndHashCode;

/**
 *  * <p>
 * 部门关系表
 * </p>
 * @author HWB
 *2019年5月8日上午10:14:55
 */
@EqualsAndHashCode(callSuper = true)
public class SysOrgRelation extends Model<SysOrgRelation> {

	private static final long serialVersionUID = 1L;

	/**
	 * 祖先节点
	 */
	private Integer ancestor;
	/**
	 * 后代节点
	 */
	private Integer descendant;

	public SysOrgRelation() {
		super();
	}

	public SysOrgRelation(Integer ancestor, Integer descendant) {
		super();
		this.ancestor = ancestor;
		this.descendant = descendant;
	}

	public Integer getAncestor() {
		return ancestor;
	}

	public void setAncestor(Integer ancestor) {
		this.ancestor = ancestor;
	}

	public Integer getDescendant() {
		return descendant;
	}

	public void setDescendant(Integer descendant) {
		this.descendant = descendant;
	}

}
