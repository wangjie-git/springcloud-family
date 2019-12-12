package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.AreaConfigure;

/**
 * 区域信息配置表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:00
 */
public interface AreaConfigureService extends IService<AreaConfigure> {

  /**
   * 区域信息配置表简单分页查询
   * @param areaConfigure 区域信息配置表
   * @return
   */
  IPage<AreaConfigure> getAreaConfigurePage(Page<AreaConfigure> page, AreaConfigure areaConfigure);


}
