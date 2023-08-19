package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.ProductObject;
import com.bitc.finalproject.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.sql.Struct;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class APIControl {

    private final BookService bookService;

    // 상품리스트 조회 api
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public Object BookListApi(@RequestParam("Type") String type, @RequestParam("MaxResults") String maxResults) throws Exception {
        String url = "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbjhyoon4250959001&QueryType="+ type +"&MaxResults=" + maxResults + "&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big";

        ProductObject itemList = bookService.getItemList(url);

        return itemList;
    }

    // 검색 api
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public Object BookSearchApi(@RequestParam("SearchValue") String searchValue, @RequestParam("SearchType") String searchType,
                                @RequestParam("SearchSort") String searchSort, @RequestParam("MaxResults") String MaxResults,
                                @RequestParam("StartNum") String startNum) throws Exception {
        searchValue = URLEncoder.encode(searchValue, "UTF-8");
        String url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbjhyoon4250959001&Query="+ searchValue +"&QueryType="+ searchType +
                "&MaxResults=" + MaxResults + "&start=" + startNum + "&SearchTarget=Book&output=js&Version=20131101&Cover=Big&Sort=" + searchSort + "";

        ProductObject itemList = bookService.getItemList(url);

        return itemList;
    }

    // 상품(1개)조회 api
    @RequestMapping(value = "/searchIsbn", method = RequestMethod.GET)
    public Object BookApi(@RequestParam("ISBN13") String isbn) throws Exception {
        String url = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbjhyoon4250959001&itemIdType=ISBN13&ItemId="+ isbn +"&output=js&Version=20131101&Cover=Big";

        ProductObject itemList = bookService.getItemList(url);

        return itemList;
    }
}
