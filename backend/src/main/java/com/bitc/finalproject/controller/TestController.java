package com.bitc.finalproject.controller;

import org.springframework.web.bind.annotation.*;





@CrossOrigin("http://localhost:3000")
@RestController
public class TestController {
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello() throws Exception{
        return "Hello World!";
    }

    @RequestMapping(value = "/main.api", method = RequestMethod.GET)
    public String main() throws Exception{
        System.out.println("main 컨트롤러 실행");
        return "main";
    }

//    @RequestMapping(value = "/mainHome", method = RequestMethod.GET)
//    public String mainHome() throws Exception {
//        return "test";
//    }
}
