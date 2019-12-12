package com.ks.gpgp.user.server.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ks.gpgp.user.client.entity.User;
import com.ks.gpgp.user.client.service.UserService;
import com.ks.gpgp.user.server.repo.UserMapper;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public User findById(String userId) {
		User user = userMapper.selectByPrimaryKey(userId);
		return user;
	}

	@Override
	public User findUserByParam(Map<String, Object> param) {
		return null;
	}

	@Override
	public void resetPwd(String username, String pwd) {
		User findUserByEmail = userMapper.selectByUsername(username);
		findUserByEmail.setFpassword(pwd);
		userMapper.updateByPrimaryKeySelective(findUserByEmail);
	}

	@Override
	public void updateUser(User user) {
		userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public User delUser(String userId) {
		userMapper.deleteByPrimaryKey(userId);
		return null;
	}
}
