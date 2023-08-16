package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.repository.BasketRepository;
import com.bitc.finalproject.repository.BookInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookInfoServiceImpl implements BookInfoService{
    private  final BookInfoRepository bookInfoRepository;
    private final BasketRepository basketRepository;
    public void bookInfoInsert(BookEntity bookEntity) throws Exception{
        bookInfoRepository.save(bookEntity);
    }
    @Override
    public List<BookEntity> getOldBooksByIsbn13(String isbn13) throws Exception {
        System.out.println(isbn13);
        return bookInfoRepository.findBySaleBookId(isbn13);

    }

    @Override
    public void basketInsert(BasketEntity basketEntity) throws Exception {
        basketRepository.save(basketEntity);
    }

    @Override
    public List<BasketEntity> searchUserBasket(String basketMemberId) {
        return basketRepository.findByBasketMemberId(basketMemberId);
    }


}
