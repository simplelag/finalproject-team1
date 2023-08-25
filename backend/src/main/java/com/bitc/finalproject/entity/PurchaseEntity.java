package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PurchaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int purchasePk;
    @Column(nullable = false)
    private String purchaseBookId;
    @Column(nullable = false)
    private String purchaseBookName;
    @Column(nullable = false)
    private String purchaseBuyerId;
    @Column(nullable = false)
    private String purchaseBuyerName;
    @Column(nullable = false)
    private String purchaseSellerId;
    @Column(nullable = false)
    private String purchaseSellerName;
    @Column
    private LocalDateTime purchaseDatetime = LocalDateTime.now();
    @Column
    private int purchaseParcel;
    @Column
    private int purchaseState;
    @Column
    private int purchasePayment;
    @Column
    private String purchasePostNumber;
    @Column
    private int purchasePamentType;
    @Column
    private int purchaseMileage;
    @Column
    private int purchaseCoupon;
    @Column
    private String purchaseComment;
    @Column
    private String purchaseAddress;
    @Column
    private int purchaseNumber=1;

    @Builder
    public PurchaseEntity(String purchaseBookId, String purchaseBookName, String purchaseBuyerId, String purchaseBuyerName, String purchaseSellerId, String purchaseSellerName, int purchasePayment){
        this.purchaseBookId = purchaseBookId;
        this.purchaseBookName = purchaseBookName;
        this.purchaseBuyerId = purchaseBuyerId;
        this.purchaseBuyerName = purchaseBuyerName;
        this.purchaseSellerId = purchaseSellerId;
        this.purchaseSellerName = purchaseSellerName;
        this.purchasePayment = purchasePayment;
    }

    @Builder
    public PurchaseEntity(int purchasePk, String purchaseBookId, String purchaseBookName, String purchaseBuyerId, String purchaseBuyerName, String purchaseSellerId, String purchaseSellerName, int purchasePayment){
        this.purchasePk = purchasePk;
        this.purchaseBookId = purchaseBookId;
        this.purchaseBookName = purchaseBookName;
        this.purchaseBuyerId = purchaseBuyerId;
        this.purchaseBuyerName = purchaseBuyerName;
        this.purchaseSellerId = purchaseSellerId;
        this.purchaseSellerName = purchaseSellerName;
        this.purchasePayment = purchasePayment;
    }
//    구매 버튼
    @Builder
    public PurchaseEntity(int purchasePk, String purchaseBookId, String purchaseBookName, String purchaseBuyerId, String purchaseBuyerName, String purchaseSellerId, String purchaseSellerName, int purchaseState, int purchasePayment, int purchasePamentType, String purchaseComment, String purchaseAddress, int purchaseNumber){
        this.purchasePk = purchasePk;
        this.purchaseBookId = purchaseBookId;
        this.purchaseBookName = purchaseBookName;
        this.purchaseBuyerId = purchaseBuyerId;
        this.purchaseBuyerName = purchaseBuyerName;
        this.purchaseSellerId = purchaseSellerId;
        this.purchaseSellerName = purchaseSellerName;
        this.purchaseState = purchaseState;
        this.purchasePayment = purchasePayment;
        this.purchasePamentType = purchasePamentType;
        this.purchaseComment = purchaseComment;
        this.purchaseAddress = purchaseAddress;
        this.purchaseNumber = purchaseNumber;
    }

    public PurchaseEntity(int purchasePk, String purchaseBookId, String purchaseBookName, String purchaseBuyerId, String purchaseBuyerName, String purchaseSellerId, String purchaseSellerName, int purchasePayment, int purchaseState) {
        this.purchasePk = purchasePk;
        this.purchaseBookId = purchaseBookId;
        this.purchaseBookName = purchaseBookName;
        this.purchaseBuyerId = purchaseBuyerId;
        this.purchaseBuyerName = purchaseBuyerName;
        this.purchaseSellerId = purchaseSellerId;
        this.purchaseSellerName = purchaseSellerName;
        this.purchasePayment = purchasePayment;
        this.purchaseState = purchaseState;

    }
}
