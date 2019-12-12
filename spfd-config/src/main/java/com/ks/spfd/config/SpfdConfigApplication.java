package com.ks.spfd.config;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

/**
 * 配置中心
 * @author HWB
 *
 */
@EnableConfigServer
@SpringCloudApplication
public class SpfdConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdConfigApplication.class, args);
	}
}
