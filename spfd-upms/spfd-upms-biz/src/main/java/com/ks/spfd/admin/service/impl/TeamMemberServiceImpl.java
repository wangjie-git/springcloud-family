package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.TeamMember;
import com.ks.spfd.admin.mapper.TeamMemberMapper;
import com.ks.spfd.admin.service.TeamMemberService;
import org.springframework.stereotype.Service;

/**
 * 团队成员信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:14
 */
@Service("teamMemberService")
public class TeamMemberServiceImpl extends ServiceImpl<TeamMemberMapper, TeamMember> implements TeamMemberService {

  /**
   * 团队成员信息表简单分页查询
   * @param teamMember 团队成员信息表
   * @return
   */
  @Override
  public IPage<TeamMember> getTeamMemberPage(Page<TeamMember> page, TeamMember teamMember){
      return baseMapper.getTeamMemberPage(page,teamMember);
  }

}
