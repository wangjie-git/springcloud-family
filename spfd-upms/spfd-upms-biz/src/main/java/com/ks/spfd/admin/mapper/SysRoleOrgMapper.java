package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysRoleOrg;
import org.apache.ibatis.annotations.Param;

/**
 * 角色机构对应关系
 *
 * @author wangjie
 * @date 2019-12-11 14:17:29
 */
public interface SysRoleOrgMapper extends BaseMapper<SysRoleOrg> {
  /**
    * 角色机构对应关系简单分页查询
    * @param sysRoleOrg 角色机构对应关系
    * @return
    */
  IPage<SysRoleOrg> getSysRoleOrgPage(Page page, @Param("sysRoleOrg") SysRoleOrg sysRoleOrg);


}
