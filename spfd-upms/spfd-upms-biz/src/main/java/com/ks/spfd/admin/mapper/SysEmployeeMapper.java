package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysEmployee;
import org.apache.ibatis.annotations.Param;

/**
 * 人员信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:09:50
 */
public interface SysEmployeeMapper extends BaseMapper<SysEmployee> {
  /**
    * 人员信息表简单分页查询
    * @param sysEmployee 人员信息表
    * @return
    */
  IPage<SysEmployee> getSysEmployeePage(Page page, @Param("sysEmployee") SysEmployee sysEmployee);


}
