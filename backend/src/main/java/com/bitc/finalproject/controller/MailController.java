package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.MailEntity;
import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.repository.BookInfoRepository;
import com.bitc.finalproject.repository.MailRepository;
import com.bitc.finalproject.repository.MemberRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private final BookInfoRepository saleRepository;
    private final MemberRepository memberRepository;
    // 최초 연결된 client에게 메세지를 보내기위한 클래스
    private final MailRepository mailRepository;

    // @MessageMapping("/message"): client에서 메시지를 /app/message 으로 보내면 @MessageMapping에서 받아서 처리함
    // @SendTo("/topic"): return값을 /topic 으로 보냄
    @MessageMapping("/message/{room}")
    @SendTo("/topic/{room}")
    public MailEntity broadcastMessage(@Payload MailEntity mail, @DestinationVariable String room) {
        mailRepository.save(mail);
        return mail;
    }

    @MessageMapping("/message/read/{room}")
    @SendTo("/topic/{room}")
    public Object readMessage(@Payload String mailPk, @DestinationVariable String room) {
        List<MailEntity> mailList = mailRepository.findByMailPkAndMailRoom(Integer.valueOf(mailPk), room);
        for(MailEntity mail : mailList){
            if(Integer.valueOf(mail.getMailUnread()) > 0){
                mail.setMailUnread(Integer.valueOf(mail.getMailUnread())-1);
                mailRepository.save(mail);
            }
        }
        return "read"+mailPk;
    }

    @RequestMapping(value = "/api/mail/getMessages", method = RequestMethod.GET)
    public Object getMessages(@RequestParam String room) throws Exception {
        System.out.println("불러오기: " + String.valueOf(room));

        return mailRepository.findByMailRoom(room);
    }

    @RequestMapping(value = "/api/mail/getUnreadCount", method = RequestMethod.GET)
    public int getUnreadCount(@RequestParam String room, @RequestParam String id) throws Exception {
        return mailRepository.countByMailRoomAndMailFromIdNotAndMailUnreadNot(room,id,0);
    }

    @RequestMapping(value = "/api/mail/getMailList", method = RequestMethod.GET)
    public Object getMailList(@RequestParam String id) throws Exception {
        List<mailListItemDto> listAsSeller = new ArrayList<>();
        List<mailListItemDto> listAsBuyer = new ArrayList<>();
        Map<String,List<mailListItemDto>> res = new HashMap<>();

        // id로 sale 테이블을 검색해서 sale 엔티티(bookEntity) 가져옴
        for(BookEntity entity : saleRepository.findBySaleSellerIdOrderBySalePkDesc(id)){
            // 가져온 엔티티의 salePk를 이용해서 mail테이블을 뒤져서 관련 mail의 채팅방(room)이 있는지 찾음
            for(String room : mailRepository.findMailRoomAsSeller(String.valueOf(entity.getSalePk())) ){
                // 채팅방이 있으면 책제목, 구매자(1232_user 가 채팅방이름이면 구매자가 user임), 채팅방이름을
                // dto에 저장하고 listAsSeller 리스트에 추가
                mailListItemDto dto = new mailListItemDto();
                dto.title = entity.getSaleBookTitle();
                dto.name = memberRepository.findByMemberId(room.split("_")[1]).getMemberName();
                dto.room = room;
                listAsSeller.add(dto);
            }
        }

        for(String room : mailRepository.findMailRoomAsBuyer(id)){
            mailListItemDto dto = new mailListItemDto();
            BookEntity entity = saleRepository.findBySalePk(Integer.valueOf(room.split("_")[0]));
            dto.title = entity.getSaleBookTitle();
            dto.name = entity.getSaleSellerName();
            dto.room = room;
            listAsBuyer.add(dto);
        }

        res.put("asSeller",listAsSeller);
        res.put("asBuyer",listAsBuyer);
        return res;

    }
    class mailListItemDto {
        @JsonProperty
        String title;
        @JsonProperty
        String name;
        @JsonProperty
        String room;
    }
}