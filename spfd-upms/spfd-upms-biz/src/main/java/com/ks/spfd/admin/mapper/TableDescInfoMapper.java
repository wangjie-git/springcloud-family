package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.admin.api.entity.TableDescInfo;
import org.apache.ibatis.annotations.Param;

/**
 * 业务表信息详情配置
 *
 * @author wangjie
 * @date 2019-12-11 17:31:52
 */
public interface TableDescInfoMapper extends BaseMapper<TableDescInfo> {
  /**
    * 业务表信息详情配置简单分页查询
    * @param tableDescInfo 业务表信息详情配置
    * @return
    */
  IPage<TableDescInfo> getTableDescInfoPage(Page page, @Param("tableDescInfo") TableDescInfo tableDescInfo);


}
