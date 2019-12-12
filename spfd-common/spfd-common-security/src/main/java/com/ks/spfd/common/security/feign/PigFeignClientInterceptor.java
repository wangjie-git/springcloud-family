package com.ks.spfd.common.security.feign;

import cn.hutool.core.collection.CollUtil;
import com.ks.spfd.admin.api.dto.OauthTokenDto;
import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.common.core.constant.SecurityConstants;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.security.oauth2.client.AccessTokenContextRelay;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.Collection;

/**
 * 扩展OAuth2FeignRequestInterceptor
 * 解决问题 ：hystrix 默认的线程策略是thread。也就是说在 hystrix启用状态下，当执行feignclient 调用的时候，会另起一个线程，导致安全上下问题传递不到子线程中。
 */
@Slf4j
@Configuration
public class PigFeignClientInterceptor extends OAuth2FeignRequestInterceptor {
	private final OAuth2ClientContext oAuth2ClientContext;
	private final AccessTokenContextRelay accessTokenContextRelay;

/*	@Autowired
    private RemoteTokenService remoteTokenService;*/
	/**
	 * Default constructor which uses the provided OAuth2ClientContext and Bearer tokens
	 * within Authorization header
	 *
	 * @param oAuth2ClientContext     provided context
	 * @param resource                type of resource to be accessed
	 * @param accessTokenContextRelay
	 */
	public PigFeignClientInterceptor(OAuth2ClientContext oAuth2ClientContext
		, OAuth2ProtectedResourceDetails resource, AccessTokenContextRelay accessTokenContextRelay) {
		super(oAuth2ClientContext, resource);
		this.oAuth2ClientContext = oAuth2ClientContext;
		this.accessTokenContextRelay = accessTokenContextRelay;
	}


	/**
	 * Create a template with the header of provided name and extracted extract
	 * 1. 如果使用 非web 请求，header 区别
	 * 2. 根据authentication 还原请求token
	 *
	 * @param template
	 */
	@Override
	public void apply(RequestTemplate template) {
	    //伪登录
/*        OauthTokenDto ato = remoteTokenService.remoteOauth(SecurityConstants.FROM_IN, "admin", "123456", "password",
                "server", "pig", "pig");
        template.header("Authorization", OAuth2FeignRequestInterceptor.BEARER + " e8c4df49-ee6a-4a19-ac69-cb4e43307b97");*/
		Collection<String> fromHeader = template.headers().get(SecurityConstants.FROM);
		if (CollUtil.isNotEmpty(fromHeader) && fromHeader.contains(SecurityConstants.FROM_IN)) {
			return;
		}
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            return;
        }
/*

        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement();
                Enumeration<String> values = request.getHeaders(name);
                while (values.hasMoreElements()) {
                    String value = values.nextElement();
                    log.info( "请求头{}:{}", name,value);
                    if("Cookie".equals( name )){
                       for( String str : value.split( ";" )){
                           if(str.contains( "token" )){
                               template.header( "Authorization", "Bearer " +
                                       str.split( "=" )[1]);
                           }
                       }
                    }

                    template.header(name, value);
                }
            }
        }
*/



		accessTokenContextRelay.copyToken();
		if (oAuth2ClientContext != null
			&& oAuth2ClientContext.getAccessToken() != null) {
			super.apply(template);
		}
	}
}
