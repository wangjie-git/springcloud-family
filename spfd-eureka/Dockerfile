FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER cookies7758

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /spfd-eureka

WORKDIR /spfd-eureka

EXPOSE 8761

ADD ./spfd-eureka/target/spfd-eureka.jar ./

CMD java -Djava.security.egd=file:/dev/./urandom -jar spfd-eureka.jar
