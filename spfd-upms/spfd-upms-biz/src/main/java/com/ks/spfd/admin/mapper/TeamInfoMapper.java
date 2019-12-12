package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TeamInfo;
import org.apache.ibatis.annotations.Param;

/**
 * 团队基本信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:04
 */
public interface TeamInfoMapper extends BaseMapper<TeamInfo> {
  /**
    * 团队基本信息表简单分页查询
    * @param teamInfo 团队基本信息表
    * @return
    */
  IPage<TeamInfo> getTeamInfoPage(Page page, @Param("teamInfo") TeamInfo teamInfo);


}
