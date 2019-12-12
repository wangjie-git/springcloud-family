package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.SystemArameter;
import com.ks.spfd.admin.mapper.SystemArameterMapper;
import com.ks.spfd.admin.service.SystemArameterService;
import org.springframework.stereotype.Service;

/**
 * 系统参数维护表
 *
 * @author wangjie
 * @date 2019-12-11 17:31:03
 */
@Service("systemArameterService")
public class SystemArameterServiceImpl extends ServiceImpl<SystemArameterMapper, SystemArameter> implements SystemArameterService {

  /**
   * 系统参数维护表简单分页查询
   * @param systemArameter 系统参数维护表
   * @return
   */
  @Override
  public IPage<SystemArameter> getSystemArameterPage(Page<SystemArameter> page, SystemArameter systemArameter){
      return baseMapper.getSystemArameterPage(page,systemArameter);
  }

}
