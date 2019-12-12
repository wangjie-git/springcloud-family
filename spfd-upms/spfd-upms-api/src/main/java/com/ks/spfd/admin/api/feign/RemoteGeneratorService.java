package com.ks.spfd.admin.api.feign;

import com.ks.spfd.admin.api.feign.factory.RemoteGeneratorServiceFallbackFactory;
import com.ks.spfd.common.core.constant.ServiceNameConstants;
import generator.GenConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/** 
* @Author wangjie 
* @Description 远程调用代码生成模块
* @Date 13:47 2019/11/27 0027 
* @Param  
* @return  
**/
@FeignClient(value = ServiceNameConstants.GENERAOTR_SERVICE,fallbackFactory = RemoteGeneratorServiceFallbackFactory.class)
public interface RemoteGeneratorService {

	@PostMapping("/generator/codebytes")
	byte[] codebytes(@RequestBody GenConfig genConfig);

}
