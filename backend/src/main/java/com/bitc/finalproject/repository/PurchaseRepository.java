package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {
//    구매 페이지에서 구매할 목록 보여주기
    List<PurchaseEntity> findByPurchaseBuyerIdAndPurchaseState(String userId, int state) throws Exception;

//    찾아서 주문번호를 가져올려고 만든것
    List<PurchaseEntity> findByPurchaseBookIdAndPurchaseBuyerIdAndPurchaseSellerIdAndPurchasePayment(String isbn13, String purchaseId, String sellerId, int payment) throws Exception;

//    마이페이지에서 구매 내역 가져올려고
    List<PurchaseEntity> findByPurchaseBuyerIdAndPurchaseStateOrderByPurchasePkDesc(String userId, int state);

    List<PurchaseEntity> findByPurchaseBookIdAndPurchaseSellerIdAndPurchasePaymentAndPurchaseState(String isbn13, String sellerId, int payment, int state) throws Exception;

//    @Query("SELECT e FROM PurchaseEntity e WHERE e.purchaseBuyerId = :userId AND e.purchaseState <> 0")
//    List<PurchaseEntity> findEntitiesByPurchaseBuyerIdAndPurchaseStateNotZero(String userId);

    List<PurchaseEntity> findByPurchaseBuyerIdAndPurchaseStateOrderByPurchasePkDesc(String userId, int state, Pageable pageable);
}
