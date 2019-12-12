package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.HealthReference;
import com.ks.spfd.admin.service.HealthReferenceService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 测量值范围表
 *
 * @author wangjie
 * @date 2019-12-11 17:29:31
 */
@RestController
@AllArgsConstructor
@RequestMapping("/healthreference")
public class HealthReferenceController {

  private final HealthReferenceService healthReferenceService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param healthReference 测量值范围表
   * @return
   */
  @GetMapping("/page")
  public R<IPage<HealthReference>> getHealthReferencePage(Page<HealthReference> page, HealthReference healthReference) {
    return  new R<>(healthReferenceService.getHealthReferencePage(page,healthReference));
  }


  /**
   * 通过id查询单条记录
   * @param fid
   * @return R
   */
  @GetMapping("/{fid}")
  public R<HealthReference> getById(@PathVariable("fid") String fid){
    return new R<>(healthReferenceService.getById(fid));
  }

  /**
   * 新增记录
   * @param healthReference
   * @return R
   */
  @SysLog("新增测量值范围表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_healthreference_add')")
  public R save(@RequestBody HealthReference healthReference){
    return new R<>(healthReferenceService.save(healthReference));
  }

  /**
   * 修改记录
   * @param healthReference
   * @return R
   */
  @SysLog("修改测量值范围表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_healthreference_edit')")
  public R update(@RequestBody HealthReference healthReference){
    return new R<>(healthReferenceService.updateById(healthReference));
  }

  /**
   * 通过id删除一条记录
   * @param fid
   * @return R
   */
  @SysLog("删除测量值范围表")
  @DeleteMapping("/{fid}")
  @PreAuthorize("@pms.hasPermission('admin_healthreference_del')")
  public R removeById(@PathVariable String fid){
    return new R<>(healthReferenceService.removeById(fid));
  }

}
