package com.ks.spfd.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 登录跳转控制器
 * </p>
 * @author HWB
 *2019年4月29日下午4:23:10
 */
@Controller
public class LoginController {

    private ConsumerTokenServices consumerTokenServices;

	private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @RequestMapping({ "/", "/index" })
    public String index() {
        return "/view/index";
    }
    
    /**
     * 加载主页面
     * @param response
     * @return
     */
    @RequestMapping({"/console" })
    public String console() {
        return "/view/console";
    }
    
    /**
     * 菜单页
     * @param response
     * @return
     */
    @RequestMapping({"/jumpMenu" })
    public String jumpMenu() {
        return "/view/menu/index";
    }

    /**
     * 登录
     * @return
     * @throws Exception
     */
    @RequestMapping("/login")
    public String login() throws Exception {
        return "/login";
    }
    
    /**
     * 角色页
     * @return
     * @throws Exception
     */
    @RequestMapping("/role")
    public String jumpRole() throws Exception {
        return "/view/role/index";
    }
    
    /**
     * 跳转至用户列表页面
     * @return
     * @throws Exception
     */
    @RequestMapping("/jumpUser")
    public String jumpUser() throws Exception {
        return "/view/user/index";
    }
    
    /**
     * 跳转至机构列表页面
     * @return
     * @throws Exception
     */
    @RequestMapping("/jumpOrg")
    public String jumpOrg() throws Exception {
        return "/view/org/index";
    }


    /**
     * 退出登录页面
     * @param session
     * @return
     */
    @RequestMapping("/logOut")
    public String logOut(HttpSession session) {
        consumerTokenServices.revokeToken( "" );
        return "login";
    }
}
