package com.ks.gpgp.user.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 应用主类
 * @author HWB
 *
 */
@EnableTransactionManagement
@SpringBootApplication
public class GpgpUserApplication  extends SpringBootServletInitializer {
	
    @Bean
    StringRedisTemplate template(RedisConnectionFactory connectionFactory) {
        return new StringRedisTemplate(connectionFactory);
    }
    
    public static void main(String[] args) {
        SpringApplication.run(GpgpUserApplication.class, args);
    }
}
