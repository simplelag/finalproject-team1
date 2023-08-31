package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BasketEntity;
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
    @PostMapping("/sellBookInfo")
    public Object bookInfoInsert(@RequestBody BookEntity bookEntity) throws Exception{
        bookInfoService.bookInfoInsert(bookEntity);
        return null;
    }
    @RequestMapping(value = "/searchOldBook", method = RequestMethod.GET)
    public Object searchOldBook() throws Exception{
        List<BookEntity> bookEntityList = bookInfoService.selectBookList();
        return bookEntityList;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/highPrice", method = RequestMethod.GET)
    public Object searchHighPrice(@RequestParam("ISBN13")String isbn13 )throws Exception{
        List<BookEntity> bookEntityList = bookInfoService.searchHighPrice(isbn13);
        return bookEntityList;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/lowPrice", method = RequestMethod.GET)
    public Object searchLowPrice(@RequestParam("ISBN13")String isbn13 )throws Exception{
        List<BookEntity> bookEntityList = bookInfoService.searchLowPrice(isbn13);
        return bookEntityList;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/oldBookInfo", method = RequestMethod.GET)
    public Object oldBook(@RequestParam("ISBN13") String isbn) throws Exception{
        return bookInfoService.getOldBooksByIsbn13(isbn);
    }
    @RequestMapping(value="/saveShoppingBaskest", method = RequestMethod.POST)
    public Object saveShoppingBaskest(@RequestBody BasketEntity basketEntity)throws Exception{
        bookInfoService.basketInsert(basketEntity);
        return null;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/searchUserBasket", method = RequestMethod.GET)
    public Object searchUserBasket(@RequestParam("basketMemberId") String basketMemberId) throws Exception{
        return bookInfoService.searchUserBasket(basketMemberId);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/searchUserBaseketDelete",method = RequestMethod.DELETE)
    public Object BasketDelete(@RequestParam("basketPk") int basketpk) throws Exception{
        bookInfoService.deleteBasket(basketpk);
        return "redirect:/ShoppingBasket";
    }

    @RequestMapping(value = "/deleteSell",method = RequestMethod.DELETE)
    public Object SellBookDelete(@RequestParam("salePk")int salepk) throws Exception{
        bookInfoService.deleteSell(salepk);
        return "redirect:/myLogin";
    }
}
