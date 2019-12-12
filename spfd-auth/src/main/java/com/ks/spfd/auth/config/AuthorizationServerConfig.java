package com.ks.spfd.auth.config;

import com.ks.spfd.common.core.constant.SecurityConstants;
import com.ks.spfd.common.security.component.PigWebResponseExceptionTranslator;
import com.ks.spfd.common.security.service.PigClientDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * 核心配置类 Oauto2
 * @Author wangjie
 * @Description  核心配置类 继承AuthorizationServerConfigurerAdapter，配置OAuth2认证服务器，需要配置授权和Token相关的三个配置。
 * @Date 9:08 2019/12/2 0002
**/
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	/**
	 * 数据源
	 */
	@Autowired
	DataSource dataSource;

	/**
	 * 获取用户信息
	 */
	@Autowired
	UserDetailsService userDetailsService;

	/** 
	* 认证管理器
	**/
	@Autowired
	AuthenticationManager authenticationManager;

	/**
	* @Description Redis 连接
	**/
	@Autowired
	RedisConnectionFactory redisConnectionFactory;

	/**
	 * 加密方式
	 */
	private final static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


	/**
	 * 配置客户端详情服务（ClientDetailsService）
	 * 客户端详情信息在这里进行初始化
	 * 通过数据库来存储调取详情信息
	 * @param clients clients
	 * @throws Exception
	 * */
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		PigClientDetailsService clientDetailsService = new PigClientDetailsService(dataSource);
		clientDetailsService.setSelectClientDetailsSql(SecurityConstants.DEFAULT_SELECT_STATEMENT);
		clientDetailsService.setFindClientDetailsSql(SecurityConstants.DEFAULT_FIND_STATEMENT);
		clients.withClientDetails(clientDetailsService);
	}


	/**
	 * 配置令牌端点(Token Endpoint)的安全约束.
	 *
	 * @param oauthServer security
	 * @throws Exception
	 */
	@Override
	public void configure(AuthorizationServerSecurityConfigurer oauthServer) {
		oauthServer.allowFormAuthenticationForClients().tokenKeyAccess("isAuthenticated()")
				.checkTokenAccess("permitAll()");
	}


	/**
	 * 配置授权（authorization）以及令牌（token）的访问端点和令牌服务(token services)
	 * 还有token的存储方式(tokenStore)；
	 * @param endpoints endpoints
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
		endpoints.allowedTokenEndpointRequestMethods(HttpMethod.GET, HttpMethod.POST)
                .tokenStore(tokenStore())
				.tokenEnhancer(tokenEnhancer()).userDetailsService(userDetailsService)
				.authenticationManager(authenticationManager)
                .reuseRefreshTokens(false)
				.exceptionTranslator(new PigWebResponseExceptionTranslator());
	}

	/**
	 * 声明TokenStore实现
	 * @return TokenStore
	 */
	@Bean
	public TokenStore tokenStore() {
		RedisTokenStore tokenStore = new RedisTokenStore(redisConnectionFactory);
		tokenStore.setPrefix(SecurityConstants.PROJECT_PREFIX + SecurityConstants.OAUTH_PREFIX);
		return tokenStore;
	}

	/** 
	* @Author wangjie 
	* @Description 令牌增强器 自定义属性
	* @Date 9:29 2019/12/2 0002 
	* @return org.springframework.security.oauth2.provider.token.TokenEnhancer
	**/
	@Bean
	public TokenEnhancer tokenEnhancer() {
		return (accessToken, authentication) -> {
			final Map<String, Object> additionalInfo = new HashMap<>(1);
			additionalInfo.put("license", SecurityConstants.PROJECT_LICENSE);
			((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
			return accessToken;
		};
	}
}
