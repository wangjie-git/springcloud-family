package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.TeamMember;

/**
 * 团队成员信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:14
 */
public interface TeamMemberService extends IService<TeamMember> {

  /**
   * 团队成员信息表简单分页查询
   * @param teamMember 团队成员信息表
   * @return
   */
  IPage<TeamMember> getTeamMemberPage(Page<TeamMember> page, TeamMember teamMember);


}
