package com.ks.spfd.auth;


import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;

import com.ks.spfd.common.security.annotation.EnablePigFeignClients;

/**
 * 认证授权中心
 * @author HWB
 *2019年5月7日下午2:59:38
 */
@SpringCloudApplication
@EnablePigFeignClients
public class SpfdAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdAuthApplication.class, args);
	}
}
