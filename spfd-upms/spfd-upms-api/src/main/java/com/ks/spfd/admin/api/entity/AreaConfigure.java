package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 区域信息配置表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:00
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_area_configure")
public class AreaConfigure extends Model<AreaConfigure> {
private static final long serialVersionUID = 1L;

    /**
   * 主键ID
   */
    @TableId
    private String fareaConfigureId;
    /**
   * 区域信息关联ID
   */
    private String fareaManagerId;
    /**
   * 配置项编码
   */
    private String fconfigureCode;
    /**
   * 是/否 或其它
   */
    private String fisTrue;
    /**
   * 值为多少
   */
    private String fvalue;
    /**
   * 描述
   */
    private String fdesc;
    /**
   * 版本
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
  
}
