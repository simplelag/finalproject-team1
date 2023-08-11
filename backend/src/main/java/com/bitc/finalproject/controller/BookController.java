package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.service.BookInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BookController {
    private final BookInfoService bookInfoService;
    @PostMapping("/sellBookInfo")
    public Object bookInfoInsert(@RequestBody BookEntity bookEntity) throws Exception{
        bookInfoService.bookInfoInsert(bookEntity);
        return "redirect:/board";
    }

}
