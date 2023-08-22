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

//    판매하는 책,판매자 등을 저장하는 용도
    public void bookInfoInsert(BookEntity bookEntity) throws Exception{
        bookInfoRepository.save(bookEntity);
    }
//    isbn13값을 토대로 중고 서적 데이터를 들고옴
    @Override
    public List<BookEntity> getOldBooksByIsbn13(String isbn13) throws Exception {
        return bookInfoRepository.findBySaleBookId(isbn13);

    }
// 장바구니에 추가하기 위해서 작성
    @Override
    public void basketInsert(BasketEntity basketEntity) throws Exception {
        basketRepository.save(basketEntity);
    }
// 장바구니 들어갈때 유저 이름이 같은 데이터만 들고올려고 작성
    @Override
    public List<BasketEntity> searchUserBasket(String basketMemberId) {
        return basketRepository.findByBasketMemberId(basketMemberId);
    }
// 장바구니 데이터를 지울 때 사용
    @Override
    public void deleteBasket(int basketPk) throws Exception {
        basketRepository.deleteById(basketPk);
    }
// 중고 책 리스트를 업로드 순으로 나열
    @Override
    public List<BookEntity> selectBookList() throws Exception {
        return bookInfoRepository.findAllByOrderBySalePkDesc();
    }

    @Override
    public List<BookEntity> mySaleList(String userId) throws Exception {
        return bookInfoRepository.findBySaleSellerIdOrderBySalePkDesc(userId);
    }

    @Override
    public List<BookEntity> searchLowPrice(String isbn13) {
        return bookInfoRepository.findBySaleBookIdOrderBySaleBookPriceAsc(isbn13);
    }

    @Override
    public List<BookEntity> searchHighPrice(String isbn13) {
        return  bookInfoRepository.findBySaleBookIdOrderBySaleBookPriceDesc(isbn13);
    }
}
