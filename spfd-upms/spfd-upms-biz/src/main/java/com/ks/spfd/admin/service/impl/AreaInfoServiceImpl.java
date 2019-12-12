package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.AreaInfo;
import com.ks.spfd.admin.mapper.AreaInfoMapper;
import com.ks.spfd.admin.service.AreaInfoService;
import org.springframework.stereotype.Service;

/**
 * 区域信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:08:50
 */
@Service("areaInfoService")
public class AreaInfoServiceImpl extends ServiceImpl<AreaInfoMapper, AreaInfo> implements AreaInfoService {

  /**
   * 区域信息表简单分页查询
   * @param areaInfo 区域信息表
   * @return
   */
  @Override
  public IPage<AreaInfo> getAreaInfoPage(Page<AreaInfo> page, AreaInfo areaInfo){
      return baseMapper.getAreaInfoPage(page,areaInfo);
  }

}
