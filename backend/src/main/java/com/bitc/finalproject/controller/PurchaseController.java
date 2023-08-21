package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.PurchaseService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class PurchaseController {
    private final PurchaseService purchaseService;

//    상세 페이지에서 바로 구매하는 경우 (구매페이지로 이동)
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
    public void PurchaseBasket(
            @RequestBody String postData , @RequestParam("userId") String userId,
            @RequestParam("userName") String userName
    ) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(postData);

//        json데이터에서 value값이 'true'인 키 값 받아오기
        List<Integer> trueKeys = new ArrayList<>();
        jsonNode.fields().forEachRemaining(entry -> {
            if (entry.getValue().isBoolean() && entry.getValue().asBoolean()) {
                int intValue = Integer.parseInt(entry.getKey());
                trueKeys.add(intValue);
            }
        });
        
//        장바구니 체크된 장바구니 리스트 가져오기
        List<BasketEntity> cheekList =  purchaseService.basketList(trueKeys);
//        체크된 품목들의 salePk 알기
        List<Integer> cheekListSalePk = new ArrayList<>();
        for(int i = 0; i < cheekList.size(); i++){
            cheekListSalePk.add(cheekList.get(i).getBasketSalePk());
        }
//        체크한 품목들의 sale 테이블
        List<BookEntity> cheekSaleList = purchaseService.basketListSale(cheekListSalePk);

        PurchaseEntity purchaseEntity = null;
        for(int i = 0; i < cheekSaleList.size(); i++){
            String BookId = cheekSaleList.get(i).getSaleBookId();
            String BookName = cheekSaleList.get(i).getSaleBookTitle();
            String SellerId = cheekSaleList.get(i).getSaleSellerId();
            int SaleBookPrice = cheekSaleList.get(i).getSaleBookPrice();
            String SellerName = cheekSaleList.get(i).getSaleSellerName();
            List<PurchaseEntity> checkPurchase = purchaseService.findPk(BookId, userId, SellerId, SaleBookPrice);
            if(checkPurchase.size() != 0){
                int pk = checkPurchase.get(0).getPurchasePk();
                purchaseEntity = new PurchaseEntity(pk, BookId, BookName, userId, userName, SellerId, SellerName, SaleBookPrice);
            }else{
                purchaseEntity = new PurchaseEntity(BookId, BookName, userId, userName, SellerId, SellerName, SaleBookPrice);
            }
            purchaseService.insertPurchaseList(purchaseEntity);
        }
    }

    //    구매 리스트 가져오기
    @RequestMapping(value = "/purchase/List", method = RequestMethod.GET)
    public Object PurchaseIndividualList(@RequestParam("userId") String userId, @RequestParam("state") int state) throws Exception{
        return purchaseService.showIndivList(userId, state);
    }

//    구매 페이지에서 구매 버튼 클릭 시
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














