package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookInfoService {
    void bookInfoInsert(BookEntity bookEntity) throws Exception;

    List<BookEntity> selectBookList() throws  Exception;
}
