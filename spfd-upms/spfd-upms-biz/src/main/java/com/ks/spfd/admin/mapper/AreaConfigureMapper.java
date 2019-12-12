package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.AreaConfigure;
import org.apache.ibatis.annotations.Param;

/**
 * 区域信息配置表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:00
 */
public interface AreaConfigureMapper extends BaseMapper<AreaConfigure> {
  /**
    * 区域信息配置表简单分页查询
    * @param areaConfigure 区域信息配置表
    * @return
    */
  IPage<AreaConfigure> getAreaConfigurePage(Page page, @Param("areaConfigure") AreaConfigure areaConfigure);


}
