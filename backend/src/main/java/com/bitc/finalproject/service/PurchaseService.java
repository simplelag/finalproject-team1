package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.entity.PurchaseEntity;

import java.util.List;

public interface PurchaseService {
    void insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception;

//    찾아서 주문번호를 가져올려고 만든것
    List<PurchaseEntity> findPk(String isbn13, String buyerId, String sellerId, int sellerPrice) throws Exception;

//    삭제하기 위해서 state가 0인것 찾기
    List<PurchaseEntity> findDeleteList(String buyerId, int state) throws Exception;

//    구매 페이지에서 구매할 목록 보여주기
    List<PurchaseEntity> showIndivList(String userId, int state) throws Exception;

    void productListDelete(List<PurchaseEntity> purchaseEntity) throws Exception;

//    구매하기
    void savePurchase(PurchaseEntity purchaseEntity) throws Exception;
}
