package com.ks.spfd.admin.service;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ks.spfd.admin.api.entity.TeamInfo;

/**
 * 团队基本信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:04
 */
public interface TeamInfoService extends IService<TeamInfo> {

  /**
   * 团队基本信息表简单分页查询
   * @param teamInfo 团队基本信息表
   * @return
   */
  IPage<TeamInfo> getTeamInfoPage(Page<TeamInfo> page, TeamInfo teamInfo);


}
