package com.bitc.finalproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/admin", method = RequestMethod.GET)
@RequiredArgsConstructor
@RestController
public class AdminController {

}
