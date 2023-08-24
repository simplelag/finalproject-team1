package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BasketEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.BookInfoService;
import com.bitc.finalproject.service.BookService;
import com.bitc.finalproject.service.PurchaseService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class PurchaseController {
    private final PurchaseService purchaseService;
    private final BookInfoService bookInfoService;

    //    상세 페이지에서 구매페이지로 이동
    @RequestMapping(value = "/purchase/insert", method = RequestMethod.GET)
    public Object PurchaseIndividualInsert(
            @RequestParam("ISBN13") String isbn13, @RequestParam("BookName") String BookName,
            @RequestParam("BuyerId") String BuyerId, @RequestParam("BuyerName") String BuyerName, @RequestParam("SellerId") String SellerId, @RequestParam("SellerName") String SellerName, @RequestParam("SellerPrice") int SellerPrice
    ) throws Exception {
        PurchaseEntity purchaseEntity = null;
        List<PurchaseEntity> checkPurchase = purchaseService.findPk(isbn13, BuyerId, SellerId, SellerPrice);
        if (checkPurchase.size() != 0) {
//            int pk = checkPurchase.get(0).getPurchasePk();
//            int state = checkPurchase.get(0).getPurchaseState();
//            purchaseEntity = new PurchaseEntity(pk, isbn13, BookName, BuyerId, BuyerName, SellerId, SellerName, SellerPrice, state);
            purchaseEntity = checkPurchase.get(0);
        } else {
            purchaseEntity = new PurchaseEntity(isbn13, BookName, BuyerId, BuyerName, SellerId, SellerName, SellerPrice);
        }
//        purchaseService.insertPurchaseList(purchaseEntity);
        purchaseEntity = purchaseService.insertPurchaseList(purchaseEntity);
        return purchaseEntity;
    }

    // 상세보기 페이지에서 값 보내서 구매 페이지 다시 적용
    @RequestMapping(value = "/purchase/locationIndviSave", method = RequestMethod.PUT)
    public Object PurchaseIndividualInsertLocation(@RequestBody PurchaseEntity purchaseEntity) throws Exception {
//        size()가 1일때
        PurchaseEntity purchase = purchaseService.insertPurchaseList(purchaseEntity);
        List<PurchaseEntity> purchaseList = new ArrayList<>();
        purchaseList.add(purchase);
        return purchaseList;
    }

    // 장바구니 페이지에서 값 보내서 구매 페이지 다시 적용
    @RequestMapping(value = "/purchase/locationInsert", method = RequestMethod.PUT)
    public Object PurchaseIndividualInsertLocation(@RequestBody @NotNull List<PurchaseEntity> purchaseEntity) throws Exception {
        PurchaseEntity purchase = new PurchaseEntity();
        for (int i = 0; i < purchaseEntity.size(); i++) {
            purchase = purchaseService.insertPurchaseList(purchaseEntity.get(i));
        }
        return purchase;
//        size()가 1일때
//        PurchaseEntity purchase = purchaseService.insertPurchaseList(purchaseEntity);
//        return purchase;
    }

    // 장바구니에서 구매페이지로 이동
    @RequestMapping(value = "/purchase/basketInsert", method = RequestMethod.PUT)
    public Object PurchaseBasket(
            @RequestBody String postData, @RequestParam("userId") String userId,
            @RequestParam("userName") String userName
    ) throws Exception {
        Map<Object, Object> result = new HashMap<>();

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
        List<BasketEntity> cheekList = purchaseService.basketList(trueKeys);
//        체크된 품목들의 salePk 알기
        List<Integer> cheekListSalePk = new ArrayList<>();
        for (int i = 0; i < cheekList.size(); i++) {
            cheekListSalePk.add(cheekList.get(i).getBasketSalePk());
        }
//        체크한 품목들의 sale 테이블
        List<BookEntity> cheekSaleList = purchaseService.basketListSale(cheekListSalePk);

        PurchaseEntity purchaseEntity = null;
        List<PurchaseEntity> purchaseEntities = new ArrayList<>();
        for (int i = 0; i < cheekSaleList.size(); i++) {
            String BookId = cheekSaleList.get(i).getSaleBookId();
            String BookName = cheekSaleList.get(i).getSaleBookTitle();
            String SellerId = cheekSaleList.get(i).getSaleSellerId();
            int SaleBookPrice = cheekSaleList.get(i).getSaleBookPrice();
            String SellerName = cheekSaleList.get(i).getSaleSellerName();
            List<PurchaseEntity> checkPurchase = purchaseService.findPk(BookId, userId, SellerId, SaleBookPrice);
            if (checkPurchase.size() != 0) {
//                int pk = checkPurchase.get(i).getPurchasePk();
//                int state = checkPurchase.get(i).getPurchaseState();
//                purchaseEntity = new PurchaseEntity(pk, BookId, BookName, userId, userName, SellerId, SellerName, SaleBookPrice, state);
                purchaseEntity = checkPurchase.get(0);
            } else {
                purchaseEntity = new PurchaseEntity(BookId, BookName, userId, userName, SellerId, SellerName, SaleBookPrice);
            }
            purchaseEntity = purchaseService.insertPurchaseList(purchaseEntity);
            purchaseEntities.add(purchaseEntity);
        }
        result.put("data1", cheekSaleList);
        result.put("data2", purchaseEntities);
        result.put("data3", cheekList);
        return result;
//        return purchaseEntities;
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
            int indivPrice = purchaseEntities.get(i).getPurchasePayment();
            int number = purchaseEntities.get(i).getPurchaseNumber();
            PurchaseEntity purchaseEntity = new PurchaseEntity(pk, BookId, BookName, userId, BuyerName, SellerId, SellerName, state, indivPrice, payMethod, reqMessage, address, number);
//            구매 후 sale테이블에서 수량 줄이기
            BookEntity bookEntity = bookInfoService.purchaseAfterMinusNumber(BookId, SellerId, indivPrice);
            bookEntity.setSaleBookPieces(bookEntity.getSaleBookPieces() - number);
            bookInfoService.bookInfoInsert(bookEntity);
//            구매 후 장바구니 테이블에서 수량 줄이기
            BasketEntity basketEntity = bookInfoService.purchaseBasketAfterMinusNumber(userId, BookId, indivPrice);
            basketEntity.setBasketBookPieces(basketEntity.getBasketBookPieces() - number);
            bookInfoService.basketInsert(basketEntity);
            purchaseService.savePurchase(purchaseEntity);
        }
    }

//    구매 페이지에서 나갈 때 삭제하기 위해서
    @RequestMapping(value = "/purchase/delete", method = RequestMethod.DELETE)
    public void PurchaseListDelete(
            @RequestParam("userId") String userId, @RequestParam("state") int state
    ) throws Exception{
        List<PurchaseEntity> purchaseEntityList = purchaseService.findDeleteList(userId, state);
        for(int i = 0; i < purchaseEntityList.size(); i++) {
            int pk = purchaseEntityList.get(i).getPurchasePk();
            String BookId = purchaseEntityList.get(i).getPurchaseBookId();
            String BookName = purchaseEntityList.get(i).getPurchaseBookName();
            String BuyerName = purchaseEntityList.get(i).getPurchaseBuyerName();
            String SellerId = purchaseEntityList.get(i).getPurchaseSellerId();
            String SellerName = purchaseEntityList.get(i).getPurchaseSellerName();
            PurchaseEntity purchaseEntity = new PurchaseEntity(pk, BookId, BookName, userId, BuyerName, SellerId, SellerName, state);
            purchaseService.productListDelete(purchaseEntity);
        }
    }
}















