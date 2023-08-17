package com.bitc.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Controller
public class MailController {

    // client에서 메시지를 /app으로 보내면 @MessageMapping에서 받아서 처리함
    @MessageMapping("/message")
    @SendTo("/topic")
    public String broadcastNews(@Payload String message) {
        System.out.println(message);
        return "Hello, " + message + "!";

    }
}
