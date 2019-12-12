package com.ks.spfd.admin.api.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 部门树
 * @author HWB
 *2019年5月8日上午10:00:51
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class OrgTree extends TreeNode {
	
	private String title;
	
	private MenuTreeMark checkArr;

}
