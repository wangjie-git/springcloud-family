package com.ks.spfd.admin.api.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 业务表信息详情配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:52
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("p_table_desc_info")
public class TableDescInfo extends Model<TableDescInfo> {
private static final long serialVersionUID = 1L;

    /**
   * 表名
   */
    private String ftabName;
    /**
   * 属性名
   */
    private String ftabColName;
    /**
   * 属性注释
   */
    private String ftabColComment;
    /**
   * 属性类型
   */
    private String ftabColType;
    /**
   * 属性大小
   */
    private Integer ftabColSize;
    /**
   * 属性精度
   */
    private String ftabColScale;
    /**
   * 属性是否为空
   */
    private String ftabColIsnull;
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
   * 主键ID
   */
    @TableId
    private Integer fid;
    /**
   * 
   */
    private Integer fversion;
  
}
