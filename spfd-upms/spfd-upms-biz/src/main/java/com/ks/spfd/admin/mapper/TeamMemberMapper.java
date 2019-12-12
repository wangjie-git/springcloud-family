package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TeamMember;
import org.apache.ibatis.annotations.Param;

/**
 * 团队成员信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:14
 */
public interface TeamMemberMapper extends BaseMapper<TeamMember> {
  /**
    * 团队成员信息表简单分页查询
    * @param teamMember 团队成员信息表
    * @return
    */
  IPage<TeamMember> getTeamMemberPage(Page page, @Param("teamMember") TeamMember teamMember);


}
