package com.ks.spfd.common.security.component;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.ks.spfd.common.core.constant.CommonConstants;
import com.ks.spfd.common.security.exception.PigAuth2Exception;

import lombok.SneakyThrows;

/**
 * <p>
 * OAuth2 异常格式化
 * </p>
 * @author HWB
 *2019年5月8日上午10:30:29
 */
public class PigAuth2ExceptionSerializer extends StdSerializer<PigAuth2Exception> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9092217030342473934L;

	public PigAuth2ExceptionSerializer() {
		super(PigAuth2Exception.class);
	}

	@Override
	@SneakyThrows
	public void serialize(PigAuth2Exception value, JsonGenerator gen, SerializerProvider provider) throws IOException {
		gen.writeStartObject();
		gen.writeObjectField("code", CommonConstants.FAIL);
		gen.writeStringField("msg", value.getMessage());
		gen.writeStringField("data", value.getErrorCode());
		gen.writeEndObject();
	}
}
