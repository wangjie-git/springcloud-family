package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysDept;
import org.apache.ibatis.annotations.Param;

/**
 * 部门信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:07:20
 */
public interface SysDeptMapper extends BaseMapper<SysDept> {
  /**
    * 部门信息表简单分页查询
    * @param sysDept 部门信息表
    * @return
    */
  IPage<SysDept> getSysDeptPage(Page page, @Param("sysDept") SysDept sysDept);


}
