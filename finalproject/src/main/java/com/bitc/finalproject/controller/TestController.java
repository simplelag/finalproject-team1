package com.bitc.finalproject.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class TestController {
    @GetMapping("/hello")
    public String test(){
        return "Hello World!";
    }
}
