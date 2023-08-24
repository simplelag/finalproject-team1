package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookInfoService {
//    DB 저장용 service(여기에 판매자가 판매하는 책 정보가 올라감)
    void bookInfoInsert(BookEntity bookEntity) throws Exception;

    List<BookEntity> getOldBooksByIsbn13(String isbn13) throws Exception;

    void basketInsert(BasketEntity basketEntity) throws Exception;

    List<BasketEntity> searchUserBasket(String basketMemberId) throws Exception;

    void deleteBasket(int basketPk) throws Exception;

    List<BookEntity> selectBookList() throws Exception;

    List<BookEntity> mySaleList(String userId, Pageable pageable) throws Exception;

    List<BookEntity> searchLowPrice(String isbn13);

    List<BookEntity> searchHighPrice(String isbn13);

    BookEntity purchaseAfterMinusNumber(String bookId, String sellerId, int indivPrice);

    BasketEntity purchaseBasketAfterMinusNumber(String userId, String bookId, int indivPrice) throws Exception;

    void deleteSell(int salepk) throws Exception;
}
