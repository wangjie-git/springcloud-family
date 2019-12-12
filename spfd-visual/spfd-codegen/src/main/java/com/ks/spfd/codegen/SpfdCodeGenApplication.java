package com.ks.spfd.codegen;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;

import com.ks.spfd.common.security.annotation.EnablePigFeignClients;
/**
 *  代码生成模块
 * @author HWB
 *2019年5月8日上午11:03:58
 */
@SpringCloudApplication
@EnablePigFeignClients
public class SpfdCodeGenApplication {

	public static void main(String[] args) {
		SpringApplication.run( SpfdCodeGenApplication.class, args);
	}
}
