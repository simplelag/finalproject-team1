package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class PurchaseController {
    private final PurchaseService purchaseService;

    @RequestMapping(value = "/purchase/insert", method = RequestMethod.GET)
    public void PurchaseIndividualInsert(
            @RequestParam("ISBN13") String isbn13, @RequestParam("BookName") String BookName,
            @RequestParam("BuyerId") String BuyerId, @RequestParam("BuyerName") String BuyerName, @RequestParam("SellerId") String SellerId, @RequestParam("SellerName") String SellerName, @RequestParam("SellerPrice") int SellerPrice
    ) throws Exception{
        PurchaseEntity purchaseEntity = null;
        List<PurchaseEntity> checkPurchase = purchaseService.findPk(isbn13, BuyerId, SellerId, SellerPrice);
        if(checkPurchase.size() != 0){
            int pk = checkPurchase.get(0).getPurchasePk();
            purchaseEntity = new PurchaseEntity(pk, isbn13, BookName, BuyerId, BuyerName, SellerId, SellerName, SellerPrice);
        }else{
            purchaseEntity = new PurchaseEntity(isbn13, BookName, BuyerId, BuyerName, SellerId, SellerName, SellerPrice);
        }
        purchaseService.insertPurchaseList(purchaseEntity);
    }

    @RequestMapping(value = "/purchase/List", method = RequestMethod.GET)
    public Object PurchaseIndividualList(@RequestParam("userId") String userId, @RequestParam("state") int state) throws Exception{
        return purchaseService.showIndivList(userId, state);
    }
}















