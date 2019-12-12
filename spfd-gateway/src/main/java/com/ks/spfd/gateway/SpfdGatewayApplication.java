
package com.ks.spfd.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;

/**
 * @author hwb
 * @date 2019年03月26日
 *       <p>
 *       网关应用
 */
@SpringCloudApplication
public class SpfdGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpfdGatewayApplication.class, args);
	}
}