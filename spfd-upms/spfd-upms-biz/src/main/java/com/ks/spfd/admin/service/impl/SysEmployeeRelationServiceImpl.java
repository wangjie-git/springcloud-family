package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.SysEmployeeRelation;
import com.ks.spfd.admin.mapper.SysEmployeeRelationMapper;
import com.ks.spfd.admin.service.SysEmployeeRelationService;
import org.springframework.stereotype.Service;

/**
 * 人员信息关系表
 *
 * @author wangjie
 * @date 2019-12-11 11:10:02
 */
@Service("sysEmployeeRelationService")
public class SysEmployeeRelationServiceImpl extends ServiceImpl<SysEmployeeRelationMapper, SysEmployeeRelation> implements SysEmployeeRelationService {

  /**
   * 人员信息关系表简单分页查询
   * @param sysEmployeeRelation 人员信息关系表
   * @return
   */
  @Override
  public IPage<SysEmployeeRelation> getSysEmployeeRelationPage(Page<SysEmployeeRelation> page, SysEmployeeRelation sysEmployeeRelation){
      return baseMapper.getSysEmployeeRelationPage(page,sysEmployeeRelation);
  }

}
