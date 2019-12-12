package com.ks.spfd.common.security.handler;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.exceptions.InvalidClientException;
import org.springframework.security.oauth2.common.exceptions.UnapprovedClientAuthenticationException;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Request;
import org.springframework.security.oauth2.provider.TokenRequest;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestValidator;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ks.spfd.common.core.constant.CommonConstants;
import com.ks.spfd.common.security.util.AuthUtils;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.CharsetUtil;
import lombok.extern.slf4j.Slf4j;

/**
 * 手机号登录成功，返回oauth token
 * @author HWB
 *2019年5月8日上午10:22:01
 */
@Slf4j
public class MobileLoginSuccessHandler implements AuthenticationSuccessHandler {
	private static final String BASIC_ = "Basic ";
	private ObjectMapper objectMapper;
	private PasswordEncoder passwordEncoder;
	private ClientDetailsService clientDetailsService;
	private AuthorizationServerTokenServices defaultAuthorizationServerTokenServices;

	/**
	 * Called when a user has been successfully authenticated. 调用spring security
	 * oauth API 生成 oAuth2AccessToken
	 *
	 * @param request        the request which caused the successful authentication
	 * @param response       the response
	 * @param authentication the <tt>Authentication</tt> object which was created
	 *                       during
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) {
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (header == null || !header.startsWith(BASIC_)) {
			throw new UnapprovedClientAuthenticationException("请求头中client信息为空");
		}

		try {
			String[] tokens = AuthUtils.extractAndDecodeHeader(header);
			assert tokens.length == 2;
			String clientId = tokens[0];

			ClientDetails clientDetails = clientDetailsService.loadClientByClientId(clientId);

			// 校验secret
			if (!passwordEncoder.matches(tokens[1], clientDetails.getClientSecret())) {
				throw new InvalidClientException("Given client ID does not match authenticated client");

			}

			TokenRequest tokenRequest = new TokenRequest(MapUtil.newHashMap(), clientId, clientDetails.getScope(),
					"mobile");

			// 校验scope
			new DefaultOAuth2RequestValidator().validateScope(tokenRequest, clientDetails);
			OAuth2Request oAuth2Request = tokenRequest.createOAuth2Request(clientDetails);
			OAuth2Authentication oAuth2Authentication = new OAuth2Authentication(oAuth2Request, authentication);
			OAuth2AccessToken oAuth2AccessToken = defaultAuthorizationServerTokenServices
					.createAccessToken(oAuth2Authentication);
			System.out.println("获取token 成功：{}" + oAuth2AccessToken.getValue());

			response.setCharacterEncoding(CharsetUtil.UTF_8);
			response.setContentType(CommonConstants.CONTENT_TYPE);
			PrintWriter printWriter = response.getWriter();
			printWriter.append(objectMapper.writeValueAsString(oAuth2AccessToken));
		} catch (IOException e) {
			throw new BadCredentialsException("Failed to decode basic authentication token");
		}
	}

	public ObjectMapper getObjectMapper() {
		return objectMapper;
	}

	public void setObjectMapper(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public ClientDetailsService getClientDetailsService() {
		return clientDetailsService;
	}

	public void setClientDetailsService(ClientDetailsService clientDetailsService) {
		this.clientDetailsService = clientDetailsService;
	}

	public AuthorizationServerTokenServices getDefaultAuthorizationServerTokenServices() {
		return defaultAuthorizationServerTokenServices;
	}

	public void setDefaultAuthorizationServerTokenServices(
			AuthorizationServerTokenServices defaultAuthorizationServerTokenServices) {
		this.defaultAuthorizationServerTokenServices = defaultAuthorizationServerTokenServices;
	}

	public MobileLoginSuccessHandler(ObjectMapper objectMapper, PasswordEncoder passwordEncoder,
			ClientDetailsService clientDetailsService,
			AuthorizationServerTokenServices defaultAuthorizationServerTokenServices) {
		super();
		this.objectMapper = objectMapper;
		this.passwordEncoder = passwordEncoder;
		this.clientDetailsService = clientDetailsService;
		this.defaultAuthorizationServerTokenServices = defaultAuthorizationServerTokenServices;
	}
}