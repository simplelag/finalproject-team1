package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.repository.BasketRepository;
import com.bitc.finalproject.repository.BookInfoRepository;
import com.bitc.finalproject.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PurchaseServiceImpl implements PurchaseService{
    private final PurchaseRepository purchaseRepository;
    private final BasketRepository basketRepository;

    private final BookInfoRepository bookInfoRepository;
//    @Override
//    public void insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception {
//        purchaseRepository.save(purchaseEntity);
//    }

    @Override
    public PurchaseEntity insertPurchaseList(PurchaseEntity purchaseEntity) throws Exception {
        return purchaseRepository.save(purchaseEntity);
    }

    @Override
    public List<PurchaseEntity> findPk(String isbn13, String buyerId, String sellerId, int sellerPrice) throws Exception {
        return purchaseRepository.findByPurchaseBookIdAndPurchaseBuyerIdAndPurchaseSellerIdAndPurchasePayment(isbn13, buyerId, sellerId, sellerPrice);
    }

    @Override
    public List<PurchaseEntity> findDeleteList(String buyerId, int state) throws Exception {
        return purchaseRepository.findByPurchaseBuyerIdAndPurchaseState(buyerId, state);
    }

    @Override
    public List<PurchaseEntity> showIndivList(String userId, int state) throws Exception {
        return purchaseRepository.findByPurchaseBuyerIdAndPurchaseState(userId, state);
    }

    @Override
    public void productListDelete(PurchaseEntity purchaseEntity) throws Exception {
        purchaseRepository.delete(purchaseEntity);
    }

    @Override
    public void savePurchase(PurchaseEntity purchaseEntity) throws Exception {
        purchaseRepository.save(purchaseEntity);
    }

    @Override
    public List<BasketEntity> basketList(List<Integer> trueKeys) throws Exception {
        return basketRepository.findAllByBasketPkIn(trueKeys);
    }

    @Override
    public List<BookEntity> basketListSale(List<Integer> cheekListSalePk) throws Exception {
        return bookInfoRepository.findAllBySalePkIn(cheekListSalePk);
    }

    @Override
    public List<PurchaseEntity> myPurchaseList(String userId) throws Exception {
        return purchaseRepository.findEntitiesByPurchaseBuyerIdAndPurchaseStateNotZero(userId);
    }

    @Override
    public void myPurchaseCancel(PurchaseEntity purchaseEntity) throws Exception {
        purchaseRepository.delete(purchaseEntity);
    }

    @Override
    public List<PurchaseEntity> findPurchasedBook(String bookId, String sellerId, int bookPrice, int state) throws Exception {
        return purchaseRepository.findByPurchaseBookIdAndPurchaseSellerIdAndPurchasePaymentAndPurchaseState(bookId, sellerId, bookPrice, state);
    }
}
