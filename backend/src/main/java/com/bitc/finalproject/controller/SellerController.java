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
    @ResponseBody
    @RequestMapping(value ="/SellerPage/{text}", method = RequestMethod.GET)
    public Object SellerPage(@PathVariable("inputValue") String inputValue) throws Exception{
        String url = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbpol03261000001&Query="+inputValue;
        System.out.println(url);
        List<BookEntity> bookEntityList = sellerService.SearchApi(url);
        System.out.println(bookEntityList);
        return bookEntityList;

    }
}
