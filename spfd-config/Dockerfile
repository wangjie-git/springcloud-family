FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER cookies7758

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /spfd-config

WORKDIR /spfd-config

EXPOSE 4001

ADD ./spfd-config/target/spfd-config.jar ./

CMD java -Djava.security.egd=file:/dev/./urandom -jar spfd-config.jar
