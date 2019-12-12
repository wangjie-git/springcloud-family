package com.ks.spfd.admin.api.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author HWB
 *2019年5月8日上午10:10:21
 */
public class TreeNode {
	protected String id;
	protected String parentId;
	protected List<TreeNode> children = new ArrayList<TreeNode>();

	public void add(TreeNode node) {
		children.add(node);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	public TreeNode(String id, String parentId, List<TreeNode> children) {
		super();
		this.id = id;
		this.parentId = parentId;
		this.children = children;
	}

	public TreeNode() {
		super();
	}
}
