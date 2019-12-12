package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TableConfig;
import org.apache.ibatis.annotations.Param;

/**
 * 业务表信息配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:41
 */
public interface TableConfigMapper extends BaseMapper<TableConfig> {
  /**
    * 业务表信息配置简单分页查询
    * @param tableConfig 业务表信息配置
    * @return
    */
  IPage<TableConfig> getTableConfigPage(Page page, @Param("tableConfig") TableConfig tableConfig);


}
