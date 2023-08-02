package com.bitc.finalproject.controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class TestController {
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello() throws Exception{
        return "Hello World!";
    }

    @RequestMapping(value = "/mainHome", method = RequestMethod.GET)
    public String mainHome() throws Exception {
        return "test";
    }
}
