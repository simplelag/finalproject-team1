package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.PurchaseService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class PurchaseController {
    private final PurchaseService purchaseService;

//    상세 페이지에서 바로 구매하는 경우
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

//    구매 리스트 가져오기
    @RequestMapping(value = "/purchase/List", method = RequestMethod.GET)
    public Object PurchaseIndividualList(@RequestParam("userId") String userId, @RequestParam("state") int state) throws Exception{
        return purchaseService.showIndivList(userId, state);
    }

//    구매 버튼 클릭 시
    @RequestMapping(value = "/purchase/Product", method = RequestMethod.POST)
    public void PurchaseProduct(
            @RequestBody List<PurchaseEntity> purchaseEntities,
            @RequestParam("userId") String userId, @RequestParam("state") int state,
            @RequestParam("payMethod") int payMethod, @RequestParam("reqMessage") String reqMessage,
            @RequestParam("address") String address
    ) throws Exception {
        for(int i = 0; i < purchaseEntities.size(); i++){
            int pk = purchaseEntities.get(i).getPurchasePk();
            String BookId = purchaseEntities.get(i).getPurchaseBookId();
            String BookName = purchaseEntities.get(i).getPurchaseBookName();
            String BuyerName = purchaseEntities.get(i).getPurchaseBuyerName();
            String SellerId = purchaseEntities.get(i).getPurchaseSellerId();
            String SellerName = purchaseEntities.get(i).getPurchaseSellerName();
            PurchaseEntity purchaseEntity = new PurchaseEntity(pk, BookId, BookName,  userId, BuyerName, SellerId, SellerName, state, payMethod, reqMessage, address);
            purchaseService.savePurchase(purchaseEntity);
        }
    }

//    구매 페이지에서 나갈 때 삭제하기 위해서
    @RequestMapping(value = "/purchase/delete", method = RequestMethod.DELETE)
    public void PurchaseListDelete(
            @RequestParam("ISBN13") String isbn13, @RequestParam("BuyerId") String BuyerId, @RequestParam("BuyerName") String BuyerName, @RequestParam("SellerId") String SellerId, @RequestParam("SellerName") String SellerName, @RequestParam("state") int state
    ) throws Exception{
        PurchaseEntity purchaseEntity = null;
        List<PurchaseEntity> checkPurchase = purchaseService.findPk(isbn13, BuyerId, SellerId, state);
        for(int i = 0; i < checkPurchase.size(); i++){
            int pk = checkPurchase.get(i).getPurchasePk();
            purchaseEntity = new PurchaseEntity(pk, isbn13, BuyerId, BuyerName, SellerId, SellerName, state);
            purchaseService.productListDelete(purchaseEntity);
        }
    }
}















