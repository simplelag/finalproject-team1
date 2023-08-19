package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.PurchaseService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.hibernate.type.ListType;
import org.hibernate.type.descriptor.java.ObjectJavaType;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

//    장바구니에서 구매하는 경우
    @RequestMapping(value = "/purchase/basketInsert", method = RequestMethod.PUT)
    public void PurchaseBasket(@RequestBody Map<String, List> postData) throws Exception{
        List<BasketEntity> a = postData.get("data1");
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
            @RequestParam("finalFee") int finalFee, @RequestParam("payMethod") int payMethod, @RequestParam("reqMessage") String reqMessage, @RequestParam("address") String address
    ) throws Exception {
        for(int i = 0; i < purchaseEntities.size(); i++){
            int pk = purchaseEntities.get(i).getPurchasePk();
            String BookId = purchaseEntities.get(i).getPurchaseBookId();
            String BookName = purchaseEntities.get(i).getPurchaseBookName();
            String BuyerName = purchaseEntities.get(i).getPurchaseBuyerName();
            String SellerId = purchaseEntities.get(i).getPurchaseSellerId();
            String SellerName = purchaseEntities.get(i).getPurchaseSellerName();
            PurchaseEntity purchaseEntity = new PurchaseEntity(pk, BookId, BookName, userId, BuyerName, SellerId, SellerName, state, finalFee, payMethod, reqMessage, address);
            purchaseService.savePurchase(purchaseEntity);
        }
    }

//    구매 페이지에서 나갈 때 삭제하기 위해서
    @RequestMapping(value = "/purchase/delete", method = RequestMethod.DELETE)
    public void PurchaseListDelete(
            @RequestParam("state") int state, @RequestBody List<PurchaseEntity> purchaseEntities
    ) throws Exception{
        for(int i = 0; i < purchaseEntities.size(); i++) {
            String BuyerId = purchaseEntities.get(i).getPurchaseBuyerId();
            List<PurchaseEntity> purchaseEntity = purchaseService.findDeleteList(BuyerId, state);
            purchaseService.productListDelete(purchaseEntity);
        }
    }
}















