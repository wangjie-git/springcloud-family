package com.ks.spfd.monitor;


import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * 监控中心
 * @author HWB
 *2019年5月7日下午2:54:10
 */
@EnableAdminServer
@SpringBootApplication
public class SpfdMonitorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdMonitorApplication.class, args);
	}
}