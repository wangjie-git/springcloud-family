package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TableConfig;
import com.ks.spfd.admin.service.TableConfigService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 业务表信息配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:41
 */
@RestController
@AllArgsConstructor
@RequestMapping("/tableconfig")
public class TableConfigController {

  private final TableConfigService tableConfigService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param tableConfig 业务表信息配置
   * @return
   */
  @GetMapping("/page")
  public R<IPage<TableConfig>> getTableConfigPage(Page<TableConfig> page, TableConfig tableConfig) {
    return  new R<>(tableConfigService.getTableConfigPage(page,tableConfig));
  }


  /**
   * 通过id查询单条记录
   * @param fid
   * @return R
   */
  @GetMapping("/{fid}")
  public R<TableConfig> getById(@PathVariable("fid") Integer fid){
    return new R<>(tableConfigService.getById(fid));
  }

  /**
   * 新增记录
   * @param tableConfig
   * @return R
   */
  @SysLog("新增业务表信息配置")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_tableconfig_add')")
  public R save(@RequestBody TableConfig tableConfig){
    return new R<>(tableConfigService.save(tableConfig));
  }

  /**
   * 修改记录
   * @param tableConfig
   * @return R
   */
  @SysLog("修改业务表信息配置")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_tableconfig_edit')")
  public R update(@RequestBody TableConfig tableConfig){
    return new R<>(tableConfigService.updateById(tableConfig));
  }

  /**
   * 通过id删除一条记录
   * @param fid
   * @return R
   */
  @SysLog("删除业务表信息配置")
  @DeleteMapping("/{fid}")
  @PreAuthorize("@pms.hasPermission('admin_tableconfig_del')")
  public R removeById(@PathVariable Integer fid){
    return new R<>(tableConfigService.removeById(fid));
  }

}
