package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.SystemArameter;

/**
 * 系统参数维护表
 *
 * @author wangjie
 * @date 2019-12-11 17:31:03
 */
public interface SystemArameterService extends IService<SystemArameter> {

  /**
   * 系统参数维护表简单分页查询
   * @param systemArameter 系统参数维护表
   * @return
   */
  IPage<SystemArameter> getSystemArameterPage(Page<SystemArameter> page, SystemArameter systemArameter);


}
