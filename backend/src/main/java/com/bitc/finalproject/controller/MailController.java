package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.MailEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Controller
@RequiredArgsConstructor
public class MailController {

    // 최초 연결된 client에게 메세지를 보내기위한 클래스
    private SimpMessagingTemplate template;

    // @MessageMapping("/message"): client에서 메시지를 /app/message 으로 보내면 @MessageMapping에서 받아서 처리함
    // @SendTo("/topic"): return값을 /topic 으로 보냄
    @MessageMapping("/message/{itemNumber}")
    @SendTo("/topic/{itemNumber}")
    public MailEntity broadcastNews(@Payload MailEntity mail, @DestinationVariable String itemNumber) {
        System.out.println(mail);
        return mail;

    }
}
