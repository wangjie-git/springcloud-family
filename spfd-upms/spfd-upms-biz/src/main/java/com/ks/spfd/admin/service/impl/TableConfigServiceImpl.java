package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.TableConfig;
import com.ks.spfd.admin.mapper.TableConfigMapper;
import com.ks.spfd.admin.service.TableConfigService;
import org.springframework.stereotype.Service;

/**
 * 业务表信息配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:41
 */
@Service("tableConfigService")
public class TableConfigServiceImpl extends ServiceImpl<TableConfigMapper, TableConfig> implements TableConfigService {

  /**
   * 业务表信息配置简单分页查询
   * @param tableConfig 业务表信息配置
   * @return
   */
  @Override
  public IPage<TableConfig> getTableConfigPage(Page<TableConfig> page, TableConfig tableConfig){
      return baseMapper.getTableConfigPage(page,tableConfig);
  }

}
