package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.TableConfig;

/**
 * 业务表信息配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:41
 */
public interface TableConfigService extends IService<TableConfig> {

  /**
   * 业务表信息配置简单分页查询
   * @param tableConfig 业务表信息配置
   * @return
   */
  IPage<TableConfig> getTableConfigPage(Page<TableConfig> page, TableConfig tableConfig);


}
