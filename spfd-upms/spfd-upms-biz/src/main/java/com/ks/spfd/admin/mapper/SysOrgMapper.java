
package com.ks.spfd.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ks.spfd.admin.api.entity.SysOrg;

import java.util.List;

/**
 * <p>
 * 部门管理 Mapper 接口
 * </p>
 *
 * @author lengleng
 * @since 2019/2/1
 */
public interface SysOrgMapper extends BaseMapper<SysOrg> {

	/**
	 * 关联dept——relation
	 *
	 * @return 数据列表
	 */
	List<SysOrg> listDepts();
}
