package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BookDto;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.service.BookInfoService;
import com.bitc.finalproject.service.BookService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class BookController {
//    @RequestMapping(value = "/sellBookInfo", method = RequestMethod.POST)
    @PostMapping("/sellBookInfo")
    public Object bookInfoInsert(BookEntity bookEntity) throws Exception{
       BookInfoService.bookInfoInsert(bookEntity);

        return "redirect:/main";
    }

}
