package com.bitc.finalproject.configuration;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// https://velog.io/@jkijki12/STOMP-Spring-Boot
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("localhost:3000").withSockJS(); // 웹소켓 엔드포인트
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // 구독 주제(prefix), /topic으로 시작하는 메시지를 브로커로 라우팅
        config.setApplicationDestinationPrefixes("/app"); // 클라이언트에서 메시지를 보낼 때 사용하는 prefix, @MessageMapping 메소드로 라우팅 됨

        // @MessageMapping 메소드 : /app으로 온 메시지를 뭔가 처리를 해서 브로커로 보냄
        // 브로커 : /topic으로 온 메시지를 이를 구독하는 client에게 전달
    }


}


