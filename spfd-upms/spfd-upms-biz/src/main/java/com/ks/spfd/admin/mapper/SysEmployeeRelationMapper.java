package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysEmployeeRelation;
import org.apache.ibatis.annotations.Param;

/**
 * 人员信息关系表
 *
 * @author wangjie
 * @date 2019-12-11 11:10:02
 */
public interface SysEmployeeRelationMapper extends BaseMapper<SysEmployeeRelation> {
  /**
    * 人员信息关系表简单分页查询
    * @param sysEmployeeRelation 人员信息关系表
    * @return
    */
  IPage<SysEmployeeRelation> getSysEmployeeRelationPage(Page page, @Param("sysEmployeeRelation") SysEmployeeRelation sysEmployeeRelation);


}
