package com.ks.spfd.common.security.util;

import cn.hutool.core.util.StrUtil;

import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.security.service.PigUser;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


/**
 * 安全工具类
 * @author HWB
 *2019年5月8日上午10:20:09
 */
@UtilityClass
public class SecurityUtils {

	/**
	 * 获取Authentication
	 */
	public static Authentication getAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();
	}

	/**
	 * 获取用户
	 */
	public static PigUser getUser(Authentication authentication) {
		Object principal = authentication.getPrincipal();
		if (principal instanceof PigUser) {
			return (PigUser) principal;
		}
		return null;
	}

	/**
	 * 获取用户
	 */
	public static PigUser getUser() {
		Authentication authentication = getAuthentication();
		if (authentication == null) {
			return null;
		}
		return getUser(authentication);
	}

	/**
	 * 获取用户角色信息
	 *
	 * @return 角色集合
	 */
	public static List<Integer> getRoles() {
		Authentication authentication = getAuthentication();
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		List<Integer> roleIds = new ArrayList<>();
		authorities.stream().filter(granted -> StrUtil.startWith(granted.getAuthority(), SecurityConstants.ROLE))
				.forEach(granted -> {
					String id = StrUtil.removePrefix(granted.getAuthority(), SecurityConstants.ROLE);
					roleIds.add(Integer.parseInt(id));
				});
		return roleIds;
	}
}