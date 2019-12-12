package com.ks.spfd.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class UmpsAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	UserDetailsService userDetailsService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		String userName = authentication.getName();// 传进来的账号
		String password = (String) authentication.getCredentials();// 传进来的密码
		Object details = authentication.getDetails();// 这里是详情，可以自定义扩展，需要实现AuthenticationDetailsSource接口
		UserDetails loadUserByUsername = userDetailsService.loadUserByUsername(userName);
		// 这里比较从数据库查出的账号密码和传进来的账号密码
		// 有错误抛出异常，不要try catch
		Authentication token = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(),
				authentication.getCredentials(), loadUserByUsername.getAuthorities());
		return token;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}
}
