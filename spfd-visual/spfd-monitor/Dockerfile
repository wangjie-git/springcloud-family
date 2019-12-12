FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER cookies7758

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /spfd-monitor

WORKDIR /spfd-monitor

EXPOSE 5001

ADD ./spfd-visual/spfd-monitor/target/spfd-monitor.jar ./

CMD java -Djava.security.egd=file:/dev/./urandom -jar spfd-monitor.jar
