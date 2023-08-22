package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.MailEntity;
import com.bitc.finalproject.repository.MailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@Controller
@RequiredArgsConstructor
@RestController
public class MailController {

    // 최초 연결된 client에게 메세지를 보내기위한 클래스
    private final MailRepository mailRepository;

    // @MessageMapping("/message"): client에서 메시지를 /app/message 으로 보내면 @MessageMapping에서 받아서 처리함
    // @SendTo("/topic"): return값을 /topic 으로 보냄
    @MessageMapping("/message/{itemNumber}")
    @SendTo("/topic/{itemNumber}")
    public MailEntity broadcastMessage(@Payload MailEntity mail, @DestinationVariable String itemNumber) {
        System.out.println(mail);
        mailRepository.save(mail);
        return mail;
    }

    @MessageMapping("/message/read/{itemNumber}")
    @SendTo("/topic/{itemNumber}")
    public Object readMessage(@Payload String mailPk, @DestinationVariable String itemNumber) {
        List<MailEntity> mailList = mailRepository.findByMailPkAndMailPurchasePk(Integer.valueOf(mailPk), Integer.valueOf(itemNumber));
        for(MailEntity mail : mailList){
            if(Integer.valueOf(mail.getMailUnread()) > 0){
                mail.setMailUnread(Integer.valueOf(mail.getMailUnread())-1);
                mailRepository.save(mail);
            }
        }
        return "read"+mailPk;
    }

    @RequestMapping(value = "/api/mail/getMessages", method = RequestMethod.GET)
    public Object getMessages(@RequestParam int purchasePk) throws Exception {
        // 서비스에 pageable을 넘겨줌
        System.out.println("불러오기: " + String.valueOf(purchasePk));

        return mailRepository.findByMailPurchasePk(purchasePk);
    }

    @RequestMapping(value = "/api/mail/getUnreadCount", method = RequestMethod.GET)
    public int getUnreadCount(@RequestParam int purchasePk, @RequestParam String id) throws Exception {
        return mailRepository.countByMailPurchasePkAndMailFromIdNotAndMailUnreadNot(purchasePk,id,0);
    }

}
