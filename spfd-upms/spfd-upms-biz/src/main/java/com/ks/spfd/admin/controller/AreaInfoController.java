package com.ks.spfd.admin.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.AreaInfo;
import com.ks.spfd.admin.service.AreaInfoService;
import com.ks.spfd.common.core.util.R;
import com.ks.spfd.common.log.annotation.SysLog;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


/**
 * 区域信息表
 *
 * @author wangjie
 * @date 2019-12-11 17:08:50
 */
@RestController
@RequestMapping("/areainfo")
@Api(tags = "区域信息接口")
public class AreaInfoController {

    @Autowired
  private AreaInfoService areaInfoService;

  /**
   * 简单分页查询
   * @param page 分页对象
   * @param areaInfo 区域信息表
   * @return
   */
  @GetMapping("/page")
  @ApiOperation(value="查询该子账号的用户类型", notes="查询该子账号的用户类型 ")
  @ApiImplicitParams({
          @ApiImplicitParam(name = "page", value = "分页对象", dataType = "Page", paramType="query"),
          @ApiImplicitParam(name = "areaInfo", value = "区域信息对象",dataType = "AreaInfo", paramType="query")
  })
  public R<IPage<AreaInfo>> getAreaInfoPage(Page<AreaInfo> page, AreaInfo areaInfo) {
    return  new R<>(areaInfoService.getAreaInfoPage(page,areaInfo));
  }


    /**
     *  多个参数的形式，利用
     * @param userName
     * @param id
     * @return
     */
    @ApiOperation(value = "测试多个参数(5)" ,notes="测试查询方法", tags = {"query"})
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "id", value = "用户Id", required = true, dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "userName", value = "用户名", required = true, dataType = "String"),
    })
    @RequestMapping(value = "person/getperson5", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPerson5( @RequestParam String userName,
                                @RequestParam Integer id ){
        return "success";
    }

    @ApiOperation(value = "测试一个参数(5)" ,notes="测试查询方法", tags = {"query"})
    @RequestMapping(value = "test1", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPerson5(){
        return "success";
    }

  /**
   * 通过id查询单条记录
   * @param fareaManagerId
   * @return R
   */
  @GetMapping("/{fareaManagerId}")
  public R<AreaInfo> getById(@PathVariable("fareaManagerId") String fareaManagerId){
    return new R<>(areaInfoService.getById(fareaManagerId));
  }

  /**
   * 新增记录
   * @param areaInfo
   * @return R
   */
  @SysLog("新增区域信息表")
  @PostMapping
  @PreAuthorize("@pms.hasPermission('admin_areainfo_add')")
  public R save(@RequestBody AreaInfo areaInfo){
    return new R<>(areaInfoService.save(areaInfo));
  }

  /**
   * 修改记录
   * @param areaInfo
   * @return R
   */
  @SysLog("修改区域信息表")
  @PutMapping
  @PreAuthorize("@pms.hasPermission('admin_areainfo_edit')")
  public R update(@RequestBody AreaInfo areaInfo){
    return new R<>(areaInfoService.updateById(areaInfo));
  }

  /**
   * 通过id删除一条记录
   * @param fareaManagerId
   * @return R
   */
  @SysLog("删除区域信息表")
  @DeleteMapping("/{fareaManagerId}")
  @PreAuthorize("@pms.hasPermission('admin_areainfo_del')")
  public R removeById(@PathVariable String fareaManagerId){
    return new R<>(areaInfoService.removeById(fareaManagerId));
  }

}
