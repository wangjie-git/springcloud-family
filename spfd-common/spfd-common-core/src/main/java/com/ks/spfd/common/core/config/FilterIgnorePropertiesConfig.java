package com.ks.spfd.common.core.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

/**
 * 放行参数配置
 * @author HWB
 *2019年5月8日上午10:34:07
 */
@Configuration
@RefreshScope
@ConditionalOnExpression("!'${ignore}'.isEmpty()")
@ConfigurationProperties(prefix = "ignore")
public class FilterIgnorePropertiesConfig {
	/**
	 * 放行终端配置，网关不校验此处的终端
	 */
	private List<String> clients = new ArrayList<>();
	/**
	 * 放行url,放行的url不再被安全框架拦截
	 */
	private List<String> urls = new ArrayList<>();
	/**
	 * 不聚合swagger
	 */
	private List<String> swaggerProviders = new ArrayList<>();

	public List<String> getClients() {
		return clients;
	}

	public void setClients(List<String> clients) {
		this.clients = clients;
	}

	public List<String> getUrls() {
		return urls;
	}

	public void setUrls(List<String> urls) {
		this.urls = urls;
	}

	public List<String> getSwaggerProviders() {
		return swaggerProviders;
	}

	public void setSwaggerProviders(List<String> swaggerProviders) {
		this.swaggerProviders = swaggerProviders;
	}

	public FilterIgnorePropertiesConfig() {
		super();
	}

	public FilterIgnorePropertiesConfig(List<String> clients, List<String> urls, List<String> swaggerProviders) {
		super();
		this.clients = clients;
		this.urls = urls;
		this.swaggerProviders = swaggerProviders;
	}

}
