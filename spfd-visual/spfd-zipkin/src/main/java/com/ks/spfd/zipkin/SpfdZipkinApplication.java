package com.ks.spfd.zipkin;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.context.annotation.Bean;
import zipkin.storage.mysql.MySQLStorage;
import zipkin2.server.internal.EnableZipkinServer;

import javax.sql.DataSource;

/**
 *  服务全链路追踪
 * @author HWB
 *
 */
@EnableZipkinServer
@SpringCloudApplication
public class SpfdZipkinApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpfdZipkinApplication.class, args);
	}

	@Bean
	public MySQLStorage mySQLStorage(DataSource datasource) {
		return MySQLStorage.builder().datasource(datasource).executor(Runnable::run).build();
	}
}
