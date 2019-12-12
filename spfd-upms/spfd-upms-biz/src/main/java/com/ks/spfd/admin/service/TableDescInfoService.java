package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.TableDescInfo;

/**
 * 业务表信息详情配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:52
 */
public interface TableDescInfoService extends IService<TableDescInfo> {

  /**
   * 业务表信息详情配置简单分页查询
   * @param tableDescInfo 业务表信息详情配置
   * @return
   */
  IPage<TableDescInfo> getTableDescInfoPage(Page<TableDescInfo> page, TableDescInfo tableDescInfo);


}
