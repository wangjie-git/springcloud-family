package com.ks.spfd.codegen.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代码生成器
 * @author HWB
 *2019年5月8日上午11:27:49
 */
public interface SysGeneratorMapper {

	/**
	 * 分页查询表格
	 *
	 * @param page
	 * @param tableName
	 * @return
	 */
	IPage<List<Map<String, Object>>> queryList(Page page, @Param("tableName") String tableName);

	/**
	 * 查询表信息
	 *
	 * @param tableName 表名称
	 * @return
	 */
	Map<String, String> queryTable(@Param("databaseName")String databaseName,@Param("tableName")String tableName);

	/**
	 * 查询表列信息
	 *
	 * @param tableName 表名称
	 * @return
	 */
	List<Map<String, String>> queryColumns(@Param("databaseName")String databaseName,@Param("tableName")String tableName);
}
