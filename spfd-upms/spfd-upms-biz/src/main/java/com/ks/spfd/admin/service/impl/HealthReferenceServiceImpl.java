package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.HealthReference;
import com.ks.spfd.admin.mapper.HealthReferenceMapper;
import com.ks.spfd.admin.service.HealthReferenceService;
import org.springframework.stereotype.Service;

/**
 * 测量值范围表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:31
 */
@Service("healthReferenceService")
public class HealthReferenceServiceImpl extends ServiceImpl<HealthReferenceMapper, HealthReference> implements HealthReferenceService {

  /**
   * 测量值范围表简单分页查询
   * @param healthReference 测量值范围表
   * @return
   */
  @Override
  public IPage<HealthReference> getHealthReferencePage(Page<HealthReference> page, HealthReference healthReference){
      return baseMapper.getHealthReferencePage(page,healthReference);
  }

}
