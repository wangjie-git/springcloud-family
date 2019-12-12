package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TeamInfo;
import com.ks.spfd.admin.service.TeamInfoService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 团队基本信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:32:04
 */
@RestController
@AllArgsConstructor
@RequestMapping("/teaminfo")
public class TeamInfoController {

  private final TeamInfoService teamInfoService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param teamInfo 团队基本信息表
   * @return
   */
  @GetMapping("/page")
  public R<IPage<TeamInfo>> getTeamInfoPage(Page<TeamInfo> page, TeamInfo teamInfo) {
    return  new R<>(teamInfoService.getTeamInfoPage(page,teamInfo));
  }


  /**
   * 通过id查询单条记录
   * @param fteamId
   * @return R
   */
  @GetMapping("/{fteamId}")
  public R<TeamInfo> getById(@PathVariable("fteamId") String fteamId){
    return new R<>(teamInfoService.getById(fteamId));
  }

  /**
   * 新增记录
   * @param teamInfo
   * @return R
   */
  @SysLog("新增团队基本信息表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_teaminfo_add')")
  public R save(@RequestBody TeamInfo teamInfo){
    return new R<>(teamInfoService.save(teamInfo));
  }

  /**
   * 修改记录
   * @param teamInfo
   * @return R
   */
  @SysLog("修改团队基本信息表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_teaminfo_edit')")
  public R update(@RequestBody TeamInfo teamInfo){
    return new R<>(teamInfoService.updateById(teamInfo));
  }

  /**
   * 通过id删除一条记录
   * @param fteamId
   * @return R
   */
  @SysLog("删除团队基本信息表")
  @DeleteMapping("/{fteamId}")
  @PreAuthorize("@pms.hasPermission('admin_teaminfo_del')")
  public R removeById(@PathVariable String fteamId){
    return new R<>(teamInfoService.removeById(fteamId));
  }

}
