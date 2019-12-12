package com.ks.spfd.auth.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

/** 
* @Author wangjie 
* @Description 用户自定义身份认证
* @Date 8:54 2019/12/2 0002 
* @Param  
* @return  
**/
@Component
public class MyAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	UserDetailsService userDetailsService;

	/** 
	* @Author wangjie 
	* @Description 认证处理，返回一个Authentication的实现类则代表认证成功，返回null则代表认证失败
	* @Date 8:55 2019/12/2 0002 
	* @return org.springframework.security.core.Authentication
	**/
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		String userName = authentication.getName();//传进来的账号
		String password = (String) authentication.getCredentials();//传进来的密码
		Object details = authentication.getDetails();//这里是详情，可以自定义扩展，需要实现AuthenticationDetailsSource接口
		UserDetails loadUserByUsername = userDetailsService.loadUserByUsername(userName);
		//这里比较从数据库查出的账号密码和传进来的账号密码
		//有错误抛出异常，不要try catch
	    return new UsernamePasswordAuthenticationToken(authentication.getPrincipal(),  authentication.getCredentials(), Collections.<GrantedAuthority>emptyList());
	    
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
