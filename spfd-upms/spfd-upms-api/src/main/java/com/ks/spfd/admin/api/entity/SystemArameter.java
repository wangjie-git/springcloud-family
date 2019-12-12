package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 系统参数维护表
 *
 * @author wangjie
 * @date 2019-12-11 17:31:03
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_system_parameter")
public class SystemArameter extends Model<SystemArameter> {
private static final long serialVersionUID = 1L;

    /**
   * 主键ID
   */
    @TableId
    private String fsystemId;
    /**
   * 系统参数名称
   */
    private String fsystemName;
    /**
   * 系统参数类型
   */
    private String fsystemType;
    /**
   * 系统参数值
   */
    private String fsystemValue;
    /**
   * 是否可用
   */
    private String fisavailable;
    /**
   * 版本号
   */
    private Integer fversion;
    /**
   * 
   */
    private String flogcby;
    /**
   * 
   */
    private LocalDateTime flogcdate;
    /**
   * 
   */
    private String flogluby;
    /**
   * 
   */
    private LocalDateTime flogludate;
    /**
   * 
   */
    private String floglaby;
    /**
   * 
   */
    private LocalDateTime flogladate;
    /**
   * 
   */
    private Integer fupdateVersion;
  
}
