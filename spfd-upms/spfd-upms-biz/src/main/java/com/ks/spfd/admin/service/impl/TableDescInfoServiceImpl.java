package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.TableDescInfo;
import com.ks.spfd.admin.mapper.TableDescInfoMapper;
import com.ks.spfd.admin.service.TableDescInfoService;
import org.springframework.stereotype.Service;

/**
 * 业务表信息详情配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:52
 */
@Service("tableDescInfoService")
public class TableDescInfoServiceImpl extends ServiceImpl<TableDescInfoMapper, TableDescInfo> implements TableDescInfoService {

  /**
   * 业务表信息详情配置简单分页查询
   * @param tableDescInfo 业务表信息详情配置
   * @return
   */
  @Override
  public IPage<TableDescInfo> getTableDescInfoPage(Page<TableDescInfo> page, TableDescInfo tableDescInfo){
      return baseMapper.getTableDescInfoPage(page,tableDescInfo);
  }

}
