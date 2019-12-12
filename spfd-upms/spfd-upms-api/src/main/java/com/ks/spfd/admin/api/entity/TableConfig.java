package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 业务表信息配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:41
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_table_config")
public class TableConfig extends Model<TableConfig> {
private static final long serialVersionUID = 1L;

    /**
   * 表名
   */
    private String ftabName;
    /**
   * 更新版本号
   */
    private Integer fupdateVersion;
    /**
   * 新增权限
   */
    private String fisAdd;
    /**
   * 编辑权限
   */
    private String fisEdit;
    /**
   * 下载权限
   */
    private String fisDownload;
    /**
   * 结案权限
   */
    private String fisClose;
    /**
   * 自动建档q权限
   */
    private String fisSelfmotionnew;
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
    private LocalDateTime flogludate;
    /**
   * 
   */
    private String flogluby;
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
    @TableId
    private Integer fid;
    /**
   * 
   */
    private Integer fversion;
  
}
