package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.SysDept;
import com.ks.spfd.admin.service.SysDeptService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 部门信息表
 *
 * @author wangjie
 * @date 2019-12-11 11:07:20
 */
@RestController
@AllArgsConstructor
@RequestMapping("/dept")
public class SysDeptController {

  private final SysDeptService sysDeptService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param sysDept 部门信息表
   * @return
   */
  @GetMapping("/page")
  public R<IPage<SysDept>> getSysDeptPage(Page<SysDept> page, SysDept sysDept) {
    return  new R<>(sysDeptService.getSysDeptPage(page,sysDept));
  }


  /**
   * 通过id查询单条记录
   * @param deptId
   * @return R
   */
  @GetMapping("/{deptId}")
  public R<SysDept> getById(@PathVariable("deptId") String deptId){
    return new R<>(sysDeptService.getById(deptId));
  }

  /**
   * 新增记录
   * @param sysDept
   * @return R
   */
  @SysLog("新增部门信息表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_sysdept_add')")
  public R save(@RequestBody SysDept sysDept){
    return new R<>(sysDeptService.save(sysDept));
  }

  /**
   * 修改记录
   * @param sysDept
   * @return R
   */
  @SysLog("修改部门信息表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_sysdept_edit')")
  public R update(@RequestBody SysDept sysDept){
    return new R<>(sysDeptService.updateById(sysDept));
  }

  /**
   * 通过id删除一条记录
   * @param deptId
   * @return R
   */
  @SysLog("删除部门信息表")
  @DeleteMapping("/{deptId}")
  @PreAuthorize("@pms.hasPermission('admin_sysdept_del')")
  public R removeById(@PathVariable String deptId){
    return new R<>(sysDeptService.removeById(deptId));
  }

}
