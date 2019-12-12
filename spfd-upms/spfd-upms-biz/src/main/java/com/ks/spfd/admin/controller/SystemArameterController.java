package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SystemArameter;
import com.ks.spfd.admin.service.SystemArameterService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 系统参数维护表
 *
 * @author wangjie
 * @date 2019-12-11 17:31:03
 */
@RestController
@AllArgsConstructor
@RequestMapping("/systemarameter")
public class SystemArameterController {

  private final SystemArameterService systemArameterService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param systemArameter 系统参数维护表
   * @return
   */
  @GetMapping("/page")
  public R<IPage<SystemArameter>> getSystemArameterPage(Page<SystemArameter> page, SystemArameter systemArameter) {
    return  new R<>(systemArameterService.getSystemArameterPage(page,systemArameter));
  }


  /**
   * 通过id查询单条记录
   * @param fsystemId
   * @return R
   */
  @GetMapping("/{fsystemId}")
  public R<SystemArameter> getById(@PathVariable("fsystemId") String fsystemId){
    return new R<>(systemArameterService.getById(fsystemId));
  }

  /**
   * 新增记录
   * @param systemArameter
   * @return R
   */
  @SysLog("新增系统参数维护表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_systemarameter_add')")
  public R save(@RequestBody SystemArameter systemArameter){
    return new R<>(systemArameterService.save(systemArameter));
  }

  /**
   * 修改记录
   * @param systemArameter
   * @return R
   */
  @SysLog("修改系统参数维护表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_systemarameter_edit')")
  public R update(@RequestBody SystemArameter systemArameter){
    return new R<>(systemArameterService.updateById(systemArameter));
  }

  /**
   * 通过id删除一条记录
   * @param fsystemId
   * @return R
   */
  @SysLog("删除系统参数维护表")
  @DeleteMapping("/{fsystemId}")
  @PreAuthorize("@pms.hasPermission('admin_systemarameter_del')")
  public R removeById(@PathVariable String fsystemId){
    return new R<>(systemArameterService.removeById(fsystemId));
  }

}
