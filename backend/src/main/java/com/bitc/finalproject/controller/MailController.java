package com.bitc.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Controller
public class MailController {

    @MessageMapping("/news")
    @SendTo("/topic/news")
    public String broadcastNews(@Payload String message) {
        return "Hello, " + message + "!";

    }
}
