package com.bitc.finalproject.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

//@CrossOrigin("http://localhost:3000")
@RestController
public class TestController {
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello() throws Exception{
        return "Hello World!";
    }

    @RequestMapping(value = "/api/main", method = RequestMethod.GET)
    public Map main(HttpServletRequest req) throws Exception{

        System.out.println("main 컨트롤러 실행");

        // axios로 요청이 들어왔을 때 매개변수로 req를 받습니다
        // req에서 세션을 얻습니다
        HttpSession session = req.getSession();
        String idStr;

        // 세션에 id 값이 없을 경우 새로 추가하고 String 변수 idStr 해당 값을 넣습니다
        if(session.getAttribute("id") == null) {
            System.out.println("session id == null");
            session.setAttribute("id","admin");
            idStr = (String)session.getAttribute("id");
        }
        // 세션에 id값이 있을 경우 해당 값을 idStr에 넣는다
        else {
            idStr = (String)session.getAttribute("id");
            System.out.println("session has id value : " + idStr);
        }

        // 리액트 페이지에 반환할 Map 객체를 생성한다
        Map<String,String> map = new HashMap<>();
        map.put("content", "main");
        // Map 객체에 idStr을 넣고 반환해준다
        map.put("id",idStr);
        return map;

        // 클라이언트 - 리액트 서버 - 스프링 서버 순으로 통신하는데
        // 리액트 서버는 자바스크립트를 쓴다
        // 자바스크립트에는 서버로부터 전달받은 세선의 값을 읽어내는 방법이 없다
        // 따라서 리액트에서는 스프링 서버에서 설정한 세션의 값을 확인할 수 없다

        // 하지만 실제로는 세션을 유지하고는 있으며, 세션에 저장된 값을 서버로 다시 보낼 수도 있는 것 같다
        // 그래서 리액트에서 스프링 서버로 요청을 보낼때
        // 스프링 서버에서 HttpServletRequest 객체를 변수로 받으면
        // 이전에 저장해놨던 세션이 여전히 유지되고 있는 경우
        // 세션값을 얻어올 수 있다
        // 어쨌든 세션이 유지되고는 있으므로, 리액트에서 세션에 저장된 id 등 정보가 필요하다면
        // 스프링 서버에서 리액트로 String타입으로 세션의 값을 읽어와  반환해주면 된다

    }

//    @RequestMapping(value = "/mainHome", method = RequestMethod.GET)
//    public String mainHome() throws Exception {
//        return "test";
//    }
}
