package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface SellerService {
//    List<BookEntity> SearchApi(String Url) throws Exception;

    void updateBook(BookEntity bookEntity)throws  Exception;
}
