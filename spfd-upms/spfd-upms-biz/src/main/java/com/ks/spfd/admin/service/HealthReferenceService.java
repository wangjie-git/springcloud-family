package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.HealthReference;

/**
 * 测量值范围表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:31
 */
public interface HealthReferenceService extends IService<HealthReference> {

  /**
   * 测量值范围表简单分页查询
   * @param healthReference 测量值范围表
   * @return
   */
  IPage<HealthReference> getHealthReferencePage(Page<HealthReference> page, HealthReference healthReference);


}
