package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.HealthReference;
import org.apache.ibatis.annotations.Param;

/**
 * 测量值范围表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:31
 */
public interface HealthReferenceMapper extends BaseMapper<HealthReference> {
  /**
    * 测量值范围表简单分页查询
    * @param healthReference 测量值范围表
    * @return
    */
  IPage<HealthReference> getHealthReferencePage(Page page, @Param("healthReference") HealthReference healthReference);


}
