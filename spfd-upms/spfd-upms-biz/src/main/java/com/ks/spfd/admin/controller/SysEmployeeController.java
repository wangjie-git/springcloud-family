package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysEmployee;
import com.ks.spfd.admin.service.SysEmployeeService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 人员信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:09:50
 */
@RestController
@AllArgsConstructor
@RequestMapping("/sysemployee")
public class SysEmployeeController {

  private final SysEmployeeService sysEmployeeService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param sysEmployee 人员信息表
   * @return
   */
  @GetMapping("/page")
  public R<IPage<SysEmployee>> getSysEmployeePage(Page<SysEmployee> page, SysEmployee sysEmployee) {
    return  new R<>(sysEmployeeService.getSysEmployeePage(page,sysEmployee));
  }


  /**
   * 通过id查询单条记录
   * @param empId
   * @return R
   */
  @GetMapping("/{empId}")
  public R<SysEmployee> getById(@PathVariable("empId") String empId){
    return new R<>(sysEmployeeService.getById(empId));
  }

  /**
   * 新增记录
   * @param sysEmployee
   * @return R
   */
  @SysLog("新增人员信息表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_sysemployee_add')")
  public R save(@RequestBody SysEmployee sysEmployee){
    return new R<>(sysEmployeeService.save(sysEmployee));
  }

  /**
   * 修改记录
   * @param sysEmployee
   * @return R
   */
  @SysLog("修改人员信息表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_sysemployee_edit')")
  public R update(@RequestBody SysEmployee sysEmployee){
    return new R<>(sysEmployeeService.updateById(sysEmployee));
  }

  /**
   * 通过id删除一条记录
   * @param empId
   * @return R
   */
  @SysLog("删除人员信息表")
  @DeleteMapping("/{empId}")
  @PreAuthorize("@pms.hasPermission('admin_sysemployee_del')")
  public R removeById(@PathVariable String empId){
    return new R<>(sysEmployeeService.removeById(empId));
  }

}
