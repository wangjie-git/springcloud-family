package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 人员信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:09:50
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_employee")
public class SysEmployee extends Model<SysEmployee> {
private static final long serialVersionUID = 1L;

    /**
   * 医生人员ID
   */
    @TableId
    private String empId;
    /**
   * 医生编码
   */
    private String empCode;
    /**
   * 人员工号
   */
    private String empStaffid;
    /**
   * 人员名字
   */
    private String empName;
    /**
   * 人员身份证
   */
    private String empIdcard;
    /**
   * 人员性别
   */
    private String empSex;
    /**
   * 出生日期
   */
    private LocalDateTime empBirthdate;
    /**
   * 联系电话
   */
    private String empTelphone;
    /**
   * 备注
   */
    private String empDesc;
    /**
   * 邮箱
   */
    private String empMail;
    /**
   * 随访心电专家 0=普通用户 1=心电专家 2=会诊专家
   */
    private String empType;
    /**
   * 基于mysql乐观锁，解决并发访问
   */
    private Integer version;
    /**
   * 创建时间
   */
    private LocalDateTime createTime;
    /**
   * 修改时间
   */
    private LocalDateTime updateTime;
    /**
   * 是否可用(0:可用 1:不可用)
   */
    private String available;
    /**
   * 人员相关业务权限
   */
    private String empAuto;
    /**
   * 人员第三方ID
   */
    private String empThirdId;
    /**
   * 扩展字段1
   */
    private String extension1;
    /**
   * 扩展字段2
   */
    private String extension2;
  
}
