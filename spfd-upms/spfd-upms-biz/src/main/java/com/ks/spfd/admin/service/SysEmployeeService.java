package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.SysEmployee;

/**
 * 人员信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:09:50
 */
public interface SysEmployeeService extends IService<SysEmployee> {

  /**
   * 人员信息表简单分页查询
   * @param sysEmployee 人员信息表
   * @return
   */
  IPage<SysEmployee> getSysEmployeePage(Page<SysEmployee> page, SysEmployee sysEmployee);


}
