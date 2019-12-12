package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 测量值范围表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:31
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_health_reference")
public class HealthReference extends Model<HealthReference> {
private static final long serialVersionUID = 1L;

    /**
   * 主键 
   */
    @TableId
    private String fid;
    /**
   * 编码
   */
    private String fcode;
    /**
   * 最小值
   */
    private String fminValue;
    /**
   * 最大值
   */
    private String fmaxValue;
    /**
   * 单位
   */
    private String funit;
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
   * 说明
   */
    private String fdesc;
    /**
   * 存尿常规+ -参考范围值
   */
    private String fvalue;
  
}
