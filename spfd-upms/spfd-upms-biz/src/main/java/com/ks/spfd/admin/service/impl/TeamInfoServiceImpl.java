package com.ks.spfd.admin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ks.spfd.admin.api.entity.TeamInfo;
import com.ks.spfd.admin.mapper.TeamInfoMapper;
import com.ks.spfd.admin.service.TeamInfoService;
import org.springframework.stereotype.Service;

/**
 * 团队基本信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:04
 */
@Service("teamInfoService")
public class TeamInfoServiceImpl extends ServiceImpl<TeamInfoMapper, TeamInfo> implements TeamInfoService {

  /**
   * 团队基本信息表简单分页查询
   * @param teamInfo 团队基本信息表
   * @return
   */
  @Override
  public IPage<TeamInfo> getTeamInfoPage(Page<TeamInfo> page, TeamInfo teamInfo){
      return baseMapper.getTeamInfoPage(page,teamInfo);
  }

}
