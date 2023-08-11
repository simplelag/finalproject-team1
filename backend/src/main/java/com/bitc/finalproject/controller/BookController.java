package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.service.BookInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BookController {
    private final BookInfoService bookInfoService;

    @RequestMapping(value = "/sellBookList",method = RequestMethod.GET)
    public Object sellBookList() throws Exception{
        List<BookEntity>  bookEntityList = bookInfoService.selectBookList();
        return  bookEntityList;
    }

    @PostMapping("/sellBookInfo")
    public Object bookInfoInsert(@RequestBody BookEntity bookEntity) throws Exception{
        bookInfoService.bookInfoInsert(bookEntity);
        return "redirect:/board";
    }

}
