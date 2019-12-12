package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 人员信息关系表
 *
 * @author wangjie
 * @date 2019-12-11 11:10:02
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_employee_relation")
public class SysEmployeeRelation extends Model<SysEmployeeRelation> {
private static final long serialVersionUID = 1L;

    /**
   * 
   */
    @TableId
    private String id;
    /**
   * 
   */
    private String orgId;
    /**
   * 
   */
    private String deptId;
    /**
   * 
   */
    private String empId;
  
}
