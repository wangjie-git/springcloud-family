package com.ks.gpgp.user.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ks.gpgp.user.client.entity.User;
import com.ks.gpgp.user.client.service.UserService;

@RestController
public class TestController {
	@Autowired
	private UserService userService;

	@RequestMapping("/test")
	public User testHeartBeat(String userId) {
		User findById = userService.findById(userId);
		return findById;
	}
	/*
	 * @RequestMapping("/userList") public Page<User> userList(){ Page<User> page=
	 * new Page<User>(); page.setPageNo(1); Map<String,Object> param = new
	 * HashMap<String,Object>(); param.put("nValid", 0); page.setParams(param);
	 * List<User> findUserList = userService.findUserList(page);
	 * page.setResults(findUserList); return page; }
	 */
}
