package com.ks.spfd.codegen.controller;

import cn.hutool.core.io.IoUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ks.spfd.codegen.service.SysGeneratorService;
import com.ks.spfd.common.core.util.R;
import generator.GenConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 代码生成器
 * @author HWB
 *2019年5月8日上午11:26:02
 */
@RestController
@RequestMapping("/generator")
public class SysGeneratorController {
	
	@Autowired
	private  SysGeneratorService sysGeneratorService;

	/**
	 * 列表
	 *
	 * @param tableName 参数集
	 * @return 数据库表
	 */
	@GetMapping("/page")
	public R<IPage> list(Page page, String tableName) {
		return new R<>(sysGeneratorService.queryPage(page,tableName));
	}

	/**
	 * 生成代码
	 */
	@PostMapping("/code")
	public void code(@RequestBody GenConfig genConfig, HttpServletResponse response) throws IOException {
		byte[] data = sysGeneratorService.generatorCode(genConfig);

		response.reset();
		response.setHeader("Content-Disposition", String.format("attachment; filename=%s.zip", genConfig.getTableName()));
		response.addHeader("Content-Length", "" + data.length);
		response.setContentType("application/octet-stream; charset=UTF-8");

		IoUtil.write(response.getOutputStream(), Boolean.TRUE, data);
	}

	/**
	 * 生成代码
	 */
	@PostMapping("/codebytes")
	public byte[] codebytes(@RequestBody GenConfig genConfig){
		byte[] data = null;
		try{
			 data = sysGeneratorService.generatorCode(genConfig);
		} catch (Exception e){
			e.printStackTrace();
		}
		return data;
	}
}
