package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.AreaInfo;

/**
 * 区域信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:08:50
 */
public interface AreaInfoService extends IService<AreaInfo> {

  /**
   * 区域信息表简单分页查询
   * @param areaInfo 区域信息表
   * @return
   */
  IPage<AreaInfo> getAreaInfoPage(Page<AreaInfo> page, AreaInfo areaInfo);


}
