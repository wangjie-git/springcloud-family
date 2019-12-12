package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 区域信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:08:50
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_area_info")
public class AreaInfo extends Model<AreaInfo> {
private static final long serialVersionUID = 1L;

    /**
   * 主键
   */
    @TableId
    private String fareaManagerId;
    /**
   * 区域名称
   */
    private String fareaName;
    /**
   * 区域编码
   */
    private String fareaCode;
    /**
   * 对应国标区域编码
   */
    private String fareaRealCode;
    /**
   * 是/否可用  F/Y
   */
    private String fisUsed;
    /**
   * 创建时间
   */
    private LocalDateTime fcreateTime;
    /**
   * 区域介绍
   */
    private String fdesc;
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
  
}
