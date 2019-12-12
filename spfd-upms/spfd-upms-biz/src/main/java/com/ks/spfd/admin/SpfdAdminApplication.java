
package com.ks.spfd.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;

import com.ks.spfd.common.security.annotation.EnablePigFeignClients;

/**
 * @author HWB
 * @date 2019年03月26日 用户统一管理系统
 */
@EnablePigFeignClients
@SpringCloudApplication
@EnableEurekaClient
@Configuration
public class SpfdAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdAdminApplication.class, args);
	}
}
