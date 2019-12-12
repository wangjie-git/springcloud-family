package com.ks.gpgp.user.client.service;

import java.util.Map;

import com.ks.gpgp.user.client.entity.User;

/**
 * 用户业务接口
 * 
 * @author HWB
 *
 */
public interface UserService {
	/**
	 * 根据用户ID查询用户
	 */
	public User findById(String userId);

	/**
	 * 通过相关参数查询用户
	 * 
	 * @param param
	 * @return
	 */
	public User findUserByParam(Map<String, Object> param);

	/**
	 * 密码重置
	 * 
	 * @param email
	 * @param pwd
	 */
	public void resetPwd(String username, String pwd);

	/**
	 * 更新用户信息
	 * 
	 * @param user
	 */
	public void updateUser(User user);

	/**
	 * 删除用户
	 * 
	 * @param userId
	 * @return
	 */
	public User delUser(String userId);
}
