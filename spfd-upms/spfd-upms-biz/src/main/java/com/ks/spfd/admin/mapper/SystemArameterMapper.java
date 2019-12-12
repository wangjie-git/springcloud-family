package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SystemArameter;
import org.apache.ibatis.annotations.Param;

/**
 * 系统参数维护表
 *
 * @author wangjie
 * @date 2019-12-11 17:31:03
 */
public interface SystemArameterMapper extends BaseMapper<SystemArameter> {
  /**
    * 系统参数维护表简单分页查询
    * @param systemArameter 系统参数维护表
    * @return
    */
  IPage<SystemArameter> getSystemArameterPage(Page page, @Param("systemArameter") SystemArameter systemArameter);


}
