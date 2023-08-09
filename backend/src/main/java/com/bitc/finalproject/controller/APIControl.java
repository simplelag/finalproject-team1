package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.ProductItem;
import com.bitc.finalproject.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class APIControl {

    private final BookService bookService;

    // 상품리스트 조회 api
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public Object BookListApi(@RequestParam("Type") String type) throws Exception {
        String url = "https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbjhyoon4250959001&QueryType="+ type +"&MaxResults=8&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big";

        List<ProductItem> itemList = bookService.getItemList(url);

        return itemList;
    }

    // 검색 api
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public Object BookSearchApi(@RequestParam("SearchType") String searchType) throws Exception {
        String url = "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbjhyoon4250959001&Query=aladdin&QueryType="+ searchType +"&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big";

        List<ProductItem> itemList = bookService.getItemList(url);

        return itemList;
    }

    // 상품(1개)조회 api
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Object BookApi(@RequestParam("ISBN") int isbn) throws Exception {
        String url = "https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbjhyoon4250959001&itemIdType=ISBN&ItemId="+ isbn +"&output=js&Version=20131101&Cover=Big";

        return null;
    }
}
