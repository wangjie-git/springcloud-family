package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 部门信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:07:20
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_dept")
public class SysDept extends Model<SysDept> {
private static final long serialVersionUID = 1L;

    /**
   * 主键id
   */
    @TableId
    private String deptId;
    /**
   * 部门编码
   */
    private String deptCode;
    /**
   * 部门名称
   */
    private String deptName;
    /**
   * 部门地点
   */
    private String deptAddress;
    /**
   * 部门描述
   */
    private String deptDesc;
    /**
   * 是否可用
   */
    private String available;
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
   * 部门简介
   */
    private String deptTitle;
    /**
   * 扩展字段1
   */
    private String extension1;
    /**
   * 扩展字段2
   */
    private String extension2;
  
}
