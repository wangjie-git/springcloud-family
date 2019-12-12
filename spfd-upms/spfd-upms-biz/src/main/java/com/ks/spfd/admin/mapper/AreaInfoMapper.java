package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.AreaInfo;
import org.apache.ibatis.annotations.Param;

/**
 * 区域信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:08:50
 */
public interface AreaInfoMapper extends BaseMapper<AreaInfo> {
  /**
    * 区域信息表简单分页查询
    * @param areaInfo 区域信息表
    * @return
    */
  IPage<AreaInfo> getAreaInfoPage(Page page, @Param("areaInfo") AreaInfo areaInfo);


}
