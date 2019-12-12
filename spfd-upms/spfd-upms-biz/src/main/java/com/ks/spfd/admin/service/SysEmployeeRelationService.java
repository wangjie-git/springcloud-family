package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.SysEmployeeRelation;

/**
 * 人员信息关系表
 *
 * @author wangjie
 * @date 2019-12-11 11:10:02
 */
public interface SysEmployeeRelationService extends IService<SysEmployeeRelation> {

  /**
   * 人员信息关系表简单分页查询
   * @param sysEmployeeRelation 人员信息关系表
   * @return
   */
  IPage<SysEmployeeRelation> getSysEmployeeRelationPage(Page<SysEmployeeRelation> page, SysEmployeeRelation sysEmployeeRelation);


}
