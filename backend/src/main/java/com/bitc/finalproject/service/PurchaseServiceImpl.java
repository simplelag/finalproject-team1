package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PurchaseServiceImpl implements PurchaseService{
    private final PurchaseRepository purchaseRepository;
    @Override
    public void insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception {
        purchaseRepository.save(purchaseEntity);
    }

    @Override
    public List<PurchaseEntity> findPk(String isbn13, String buyerId, String sellerId, int sellerPrice) throws Exception {
        return purchaseRepository.findByPurchaseBookIdAndPurchaseBuyerIdAndPurchaseSellerIdAndPurchasePayment(isbn13, buyerId, sellerId, sellerPrice);
    }

    @Override
    public List<PurchaseEntity> showIndivList(String userId, int state) throws Exception {
        return purchaseRepository.findByPurchaseBuyerIdAndPurchaseState(userId, state);
    }
}
