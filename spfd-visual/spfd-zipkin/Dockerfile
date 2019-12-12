FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER cookies7758

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /spfd-zipkin

WORKDIR /spfd-zipkin

EXPOSE 5002

ADD ./spfd-visual/spfd-zipkin/target/spfd-zipkin.jar ./

CMD java -Djava.security.egd=file:/dev/./urandom -jar spfd-zipkin.jar
