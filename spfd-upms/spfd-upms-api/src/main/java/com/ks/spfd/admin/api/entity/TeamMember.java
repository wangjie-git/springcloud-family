package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 团队成员信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:14
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_team_member")
public class TeamMember extends Model<TeamMember> {
private static final long serialVersionUID = 1L;

    /**
   * 成员ID
   */
    @TableId
    private String fmemberId;
    /**
   * 团队ID
   */
    private String fteamId;
    /**
   * 人员ID
   */
    private String femploeeId;
    /**
   * 1、签约，2、履约，3、专项，以逗号分隔，暂不处理是哪个专项
   */
    private String fmemberFunction;
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
