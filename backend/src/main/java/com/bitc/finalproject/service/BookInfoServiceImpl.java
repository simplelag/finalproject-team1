package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.repository.BookInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookInfoServiceImpl implements BookInfoService{
    private  final BookInfoRepository bookInfoRepository;
    @Override
    public List<BookEntity> selectBookList() throws Exception {
        return bookInfoRepository.findAllByOrderBySalePkDesc();
    }
    public void bookInfoInsert(BookEntity bookEntity) throws Exception{
        bookInfoRepository.save(bookEntity);
    }


}
