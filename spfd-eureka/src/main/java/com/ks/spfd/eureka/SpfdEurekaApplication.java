package com.ks.spfd.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * 服务注册与治理中心
 * @author HWB
 *
 */
@EnableEurekaServer
@SpringBootApplication
public class SpfdEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdEurekaApplication.class, args);
	}
}
