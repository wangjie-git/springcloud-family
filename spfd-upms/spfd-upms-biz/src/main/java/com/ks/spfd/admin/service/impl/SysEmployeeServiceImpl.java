package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.SysEmployee;
import com.ks.spfd.admin.mapper.SysEmployeeMapper;
import com.ks.spfd.admin.service.SysEmployeeService;
import org.springframework.stereotype.Service;

/**
 * 人员信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:09:50
 */
@Service("sysEmployeeService")
public class SysEmployeeServiceImpl extends ServiceImpl<SysEmployeeMapper, SysEmployee> implements SysEmployeeService {

  /**
   * 人员信息表简单分页查询
   * @param sysEmployee 人员信息表
   * @return
   */
  @Override
  public IPage<SysEmployee> getSysEmployeePage(Page<SysEmployee> page, SysEmployee sysEmployee){
      return baseMapper.getSysEmployeePage(page,sysEmployee);
  }

}
