package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.AreaConfigure;
import com.ks.spfd.admin.mapper.AreaConfigureMapper;
import com.ks.spfd.admin.service.AreaConfigureService;
import org.springframework.stereotype.Service;

/**
 * 区域信息配置表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:00
 */
@Service("areaConfigureService")
public class AreaConfigureServiceImpl extends ServiceImpl<AreaConfigureMapper, AreaConfigure> implements AreaConfigureService {

  /**
   * 区域信息配置表简单分页查询
   * @param areaConfigure 区域信息配置表
   * @return
   */
  @Override
  public IPage<AreaConfigure> getAreaConfigurePage(Page<AreaConfigure> page, AreaConfigure areaConfigure){
      return baseMapper.getAreaConfigurePage(page,areaConfigure);
  }

}
