package com.ks.spfd.common.security.handler;

import com.ks.spfd.admin.api.dto.OauthTokenDto;
import com.ks.spfd.admin.api.feign.RemoteTokenService;
import com.ks.spfd.common.core.constant.SecurityConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** 
* @Author wangjie 
* @Description 进行授权成功后处理。授权成功后，重定向回之前访问的页面（获取RequestCache中存储的地址）。
* @Date 10:16 2019/12/2 0002 
* @Param  
* @return  
**/
public class UpmsSuccessLoginHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	private RemoteTokenService remoteTokenService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		OauthTokenDto ato = remoteTokenService.remoteOauth(SecurityConstants.FROM_IN, "admin", "123456", "password",
				"server", "pig", "pig");
		request.setCharacterEncoding("UTF-8");
		if (authentication.isAuthenticated()) {
			//未完，待续
			response.addHeader("token", ato.getAccess_token());
			response.addHeader( "Authorization", "Bearer " + ato.getAccess_token() );
			response.addCookie(new Cookie("token", ato.getAccess_token()));
			redirectStrategy.sendRedirect(request, response, "/index");
		} else {
			super.onAuthenticationSuccess(request, response, authentication);
		}
	}

	public UpmsSuccessLoginHandler(RemoteTokenService remoteTokenService) {
		this.remoteTokenService = remoteTokenService;
	}
}
