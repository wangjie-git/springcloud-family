package com.ks.spfd.common.security.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.oauth2.common.exceptions.InvalidClientException;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;

import com.ks.spfd.common.core.constant.SecurityConstants;

import javax.sql.DataSource;

/**
 * see JdbcClientDetailsService
 * @author HWB
 *2019年5月8日上午10:20:56
 */
public class PigClientDetailsService extends JdbcClientDetailsService {

	public PigClientDetailsService(DataSource dataSource) {
		super(dataSource);
	}

	/**
	 * 重写原生方法支持redis缓存
	 *
	 * @param clientId
	 * @return
	 * @throws InvalidClientException
	 */
	@Override
	@Cacheable(value = SecurityConstants.CLIENT_DETAILS_KEY, key = "#clientId", unless = "#result == null")
	public ClientDetails loadClientByClientId(String clientId) throws InvalidClientException {
		return super.loadClientByClientId(clientId);
	}
}