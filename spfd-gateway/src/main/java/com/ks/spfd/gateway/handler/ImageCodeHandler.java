package com.ks.spfd.gateway.handler;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.google.code.kaptcha.Producer;
import com.ks.spfd.common.core.constant.CommonConstants;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

/**
 * 验证码生成逻辑处理类
 * @author HWB
 *2019年5月7日下午2:56:33
 */
@Slf4j
@Component
public class ImageCodeHandler implements HandlerFunction<ServerResponse> {
	
	private final Producer producer;
	
	private final RedisTemplate redisTemplate;

	@Override
	public Mono<ServerResponse> handle(ServerRequest serverRequest) {
		//生成验证码
		String text = producer.createText();
		BufferedImage image = producer.createImage(text);

		//保存验证码信息
		String randomStr = serverRequest.queryParam("randomStr").get();
		redisTemplate.opsForValue().set(CommonConstants.DEFAULT_CODE_KEY + randomStr, text, 60, TimeUnit.SECONDS);

		// 转换流信息写出
		FastByteArrayOutputStream os = new FastByteArrayOutputStream();
		try {
			ImageIO.write(image, "jpeg", os);
		} catch (IOException e) {
			System.out.println("ImageIO write err"+e.getMessage());
			return Mono.error(e);
		}

		return ServerResponse
			.status(HttpStatus.OK)
			.contentType(MediaType.IMAGE_JPEG)
			.body(BodyInserters.fromResource(new ByteArrayResource(os.toByteArray())));
	}

	public ImageCodeHandler(Producer producer, RedisTemplate redisTemplate) {
		super();
		this.producer = producer;
		this.redisTemplate = redisTemplate;
	}
}
