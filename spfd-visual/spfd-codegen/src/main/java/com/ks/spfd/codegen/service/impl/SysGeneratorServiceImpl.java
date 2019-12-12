package com.ks.spfd.codegen.service.impl;

import cn.hutool.core.io.IoUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.codegen.mapper.SysGeneratorMapper;
import com.ks.spfd.codegen.service.SysGeneratorService;
import com.ks.spfd.codegen.util.GenUtils;
import generator.GenConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成器
 * @author HWB
 *2019年5月8日上午11:28:29
 */
@Service
public class SysGeneratorServiceImpl implements SysGeneratorService {
	
	@Autowired
	private SysGeneratorMapper sysGeneratorMapper;

	/**
	 * 分页查询表
	 *
	 * @param tableName 查询条件
	 * @return
	 */
	@Override
	public IPage<List<Map<String, Object>>> queryPage(Page page, String tableName) {
		return sysGeneratorMapper.queryList(page,tableName);
	}

	/**
	 * 生成代码
	 *
	 * @param genConfig 生成配置
	 * @return
	 */
	@Override
	public byte[] generatorCode(GenConfig genConfig) {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ZipOutputStream zip = new ZipOutputStream(outputStream);

		//查询表信息
		Map<String, String> table = queryTable(genConfig.getDatabaseName(),genConfig.getTableName());
		//查询列信息
		List<Map<String, String>> columns = queryColumns(genConfig.getDatabaseName(),genConfig.getTableName());
		//生成代码
		GenUtils.generatorCode(genConfig, table, columns, zip);
		IoUtil.close(zip);
		return outputStream.toByteArray();
	}

	private Map<String, String> queryTable(String databaseName,String tableName) {
		return sysGeneratorMapper.queryTable(databaseName,tableName);
	}

	private List<Map<String, String>> queryColumns(String databaseName,String tableName) {
		return sysGeneratorMapper.queryColumns(databaseName,tableName);
	}
}