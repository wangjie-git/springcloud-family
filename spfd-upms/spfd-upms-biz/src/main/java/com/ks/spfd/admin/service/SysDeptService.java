package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.SysDept;

/**
 * 部门信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:07:20
 */
public interface SysDeptService extends IService<SysDept> {

  /**
   * 部门信息表简单分页查询
   * @param sysDept 部门信息表
   * @return
   */
  IPage<SysDept> getSysDeptPage(Page<SysDept> page, SysDept sysDept);


}
