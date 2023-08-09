package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class SellerController {

    private final SellerService sellerService;

    @RequestMapping(value ="/bookInfo", method = RequestMethod.GET)
    public Object SellerPage(@PathVariable("inputValue") String inputValue) throws Exception{
        return null;
    }
    @RequestMapping(value = "bookInfo",method = RequestMethod.POST)
    public Object sellBook(BookEntity bookEntity) throws Exception {
        sellerService.updateBook(bookEntity);

        return "redirect:/main";
    }
}
