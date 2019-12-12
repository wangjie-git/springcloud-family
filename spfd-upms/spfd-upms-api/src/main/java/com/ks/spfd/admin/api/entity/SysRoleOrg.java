package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 角色机构对应关系
 *
 * @author wangjie
 * @date 2019-12-11 14:17:29
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_role_org")
public class SysRoleOrg extends Model<SysRoleOrg> {
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
   * 部门ID
   */
    private Integer orgId;
  
}
