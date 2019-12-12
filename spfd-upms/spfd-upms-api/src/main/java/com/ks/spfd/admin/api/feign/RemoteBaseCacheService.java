package com.ks.spfd.admin.api.feign;

import com.ks.spfd.admin.api.feign.factory.RemoteBaseCacheServiceFallbackFactory;
import com.ks.spfd.common.core.constant.ServiceNameConstants;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import organization.OrganizationInfoDto;

import java.util.List;

/** 
* @Author wangjie 
* @Description 远程调用基础数据缓存接口
* @Date 13:48 2019/12/2 0002 
* @Param  
* @return  
**/
@FeignClient(value = ServiceNameConstants.PERM_SERVICE,fallbackFactory = RemoteBaseCacheServiceFallbackFactory.class)
public interface RemoteBaseCacheService {


	@GetMapping("/permcache/orginfo")
    List<OrganizationInfoDto> getCacheOrgList();
}
