package com.ks.spfd.admin.controller;

import cn.hutool.core.io.IoUtil;
import com.ks.spfd.admin.api.feign.RemoteGeneratorService;
import generator.GenConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 版本        修改时间        作者  
 * V1.0        2019/11/27 0027        wangjie 
 * 文件说明: GeneratorController
 **/
@Controller
@Slf4j
public class GeneratorController {

    @Autowired
    RemoteGeneratorService service;

    @RequestMapping("/generatorCode")
    public void code(@RequestBody GenConfig genConfig, HttpServletResponse response){
        log.info( "GenConfig 参数{}", genConfig);
        try {
            byte[] codes = service.codebytes( genConfig );
            response.reset();
            response.setHeader( "Content-Disposition", String.format( "attachment; filename=%s.zip", genConfig.getTableName() ) );
            response.addHeader( "Content-Length", "" + codes.length );
            response.setContentType( "application/octet-stream; charset=UTF-8" );

            IoUtil.write( response.getOutputStream(), Boolean.TRUE, codes );
        } catch (Exception e){
            log.info( "捕获异常{}",e.getMessage());
        }
        log.info( "调用完成！");
    }

    @RequestMapping("/generatorCodeZip")
    public void generatorCodeZip(GenConfig genConfig, HttpServletResponse response){
        log.info( "GenConfig 参数{}", genConfig);
        try {
            byte[] codes = service.codebytes( genConfig );
            response.reset();
            response.setHeader( "Content-Disposition", String.format( "attachment; filename=%s.zip", genConfig.getTableName() ) );
            /*response.addHeader( "Content-Length", "" + codes.length );*/
            response.setContentType("application/x-msdownload");
            writeFile("F:\\","test.zip",codes);
            IoUtil.write( response.getOutputStream(), Boolean.TRUE, codes );
        } catch (Exception e){
            log.info( "捕获异常{}",e.getMessage());
        }
        log.info( "调用完成！");
    }

    /**
     * 将byte数组写入文件
     *
     * @param path
     * @param fileName
     * @param content
     * @throws IOException
     */
    public void writeFile(String path, String fileName, byte[] content)
            throws IOException {
        try {
            File f = new File( path );
            if (!f.exists()) {
                f.mkdirs();
            }
            FileOutputStream fos = new FileOutputStream( path + fileName );
            fos.write( content );
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException( e );
        }
    }


    /**
     * 跳转至页面
     * @return
     * @throws Exception
     */
    @RequestMapping("/jumpGeneratorindex")
    public String jumpGeneratorindex() {
        return "/view/generator/index";
    }

}
