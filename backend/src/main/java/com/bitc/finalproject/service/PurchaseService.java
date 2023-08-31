package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PurchaseService {
//    void insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception;
    PurchaseEntity insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception;
//    찾아서 주문번호를 가져올려고 만든것
    List<PurchaseEntity> findPk(String isbn13, String buyerId, String sellerId, int sellerPrice) throws Exception;

//    삭제하기 위해서 state가 0인것 찾기
    List<PurchaseEntity> findDeleteList(String buyerId, int state) throws Exception;

//    구매 페이지에서 구매할 목록 보여주기
    List<PurchaseEntity> showIndivList(String userId, int state) throws Exception;

    void productListDelete(PurchaseEntity purchaseEntity) throws Exception;

//    구매하기
    void savePurchase(PurchaseEntity purchaseEntity) throws Exception;

//    장바구니에서 체크한 것 확인
    List<BasketEntity> basketList(List<Integer> trueKeys) throws Exception;

//    장바구니에서 체크된 것을 sale 테이블에서 가져오기
    List<BookEntity> basketListSale(List<Integer> cheekListSalePk) throws Exception;

//    마이페이지에서 판매 내역 가져오기

    List<PurchaseEntity> myPurchaseList(String userId, int state, Pageable pageable) throws Exception;

//    마이페이지의 구매내역에서 구매 취소
    void myPurchaseCancel(PurchaseEntity purchaseEntity) throws Exception;

    List<PurchaseEntity> findPurchasedBook(String bookId, String sellerId, int bookPrice, int state) throws Exception;
}
