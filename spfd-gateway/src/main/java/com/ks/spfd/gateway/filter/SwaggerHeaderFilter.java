package com.ks.spfd.gateway.filter;

import com.ks.spfd.gateway.config.SwaggerResourceProvider;
import org.apache.commons.lang.StringUtils;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

/**
 * Created by NooYoo.
 * Created on 2019/7/30 下午10:09.
 * Description: 拦截器
 */
@Component
public class SwaggerHeaderFilter extends AbstractGatewayFilterFactory {

    private static final String HEADER_NAME = "X-Forwarded-Prefix";

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String path = request.getURI().getPath();
            if (!StringUtils.endsWithIgnoreCase( path, SwaggerResourceProvider.API_URI )) {
                return chain.filter( exchange );
            }
            String basePath = path.substring( 0, path.lastIndexOf( SwaggerResourceProvider.API_URI ) );
            ServerHttpRequest newRequest = request.mutate().header( HEADER_NAME, basePath ).build();
            ServerWebExchange newExchange = exchange.mutate().request( newRequest ).build();
            return chain.filter( newExchange );

        };

    }

}