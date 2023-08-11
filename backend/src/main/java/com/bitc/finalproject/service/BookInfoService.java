package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;
import org.springframework.stereotype.Service;

public interface BookInfoService {
    void bookInfoInsert(BookEntity bookEntity) throws Exception;
}
