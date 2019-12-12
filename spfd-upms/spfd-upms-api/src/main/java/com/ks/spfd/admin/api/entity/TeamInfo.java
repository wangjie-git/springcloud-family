package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 团队基本信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:04
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_team_info")
public class TeamInfo extends Model<TeamInfo> {
private static final long serialVersionUID = 1L;

    /**
   * 团队ID
   */
    @TableId
    private String fteamId;
    /**
   * 机构ID
   */
    private String forgId;
    /**
   * 团队名称
   */
    private String fteamName;
    /**
   * 团队编码
   */
    private String fteamCode;
    /**
   * 创建日期
   */
    private LocalDateTime fceateDate;
    /**
   * 团队介绍
   */
    private String fteamDesc;
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
    /**
   * 第三方团队ID
   */
    private String fteamOtherId;
    /**
   * 是/否可用  Y/N
   */
    private String fisavailable;
    /**
   * 团队来源
   */
    private String fteamfrom;
    /**
   * 备注
   */
    private String fremarks;
    /**
   * 机构索引ID
   */
    private String forgRsId;
    /**
   * 团队所属区域
   */
    private String fareaCode;
  
}
