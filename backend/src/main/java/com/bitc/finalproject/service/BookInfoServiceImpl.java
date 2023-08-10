package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.repository.BookInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BookInfoServiceImpl implements BookInfoService{
    private  final BookInfoRepository bookInfoRepository;


    public void bookInfoInsert(BookEntity bookEntity) throws Exception{
        bookInfoRepository.save(bookEntity);
        System.out.println(bookInfoRepository);
    }
}
