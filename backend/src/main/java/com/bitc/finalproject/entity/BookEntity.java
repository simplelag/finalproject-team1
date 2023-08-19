package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "sale")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int salePk;
    @Column(nullable = false)
    private String saleBookId;
    @Column(nullable = false)
    private String saleImgSrc;
    @Column(nullable = false)
    private String saleSellerId;
    @Column(nullable = false)
    private String saleSellerName;
    @Column(nullable = false)
    private int saleBookPrice;
    @Column(nullable = false)
    private String saleDateTime =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    private int saleBookPieces;
    @Column(nullable = false)
    private String salePostPrice;
    @Column(nullable = false)
    private int bookGrade;
    private String saleDisabled;
    @Column(nullable = false)
    private String saleDiscription;
    @Column(nullable = false)
    private String saleBookTitle;

}
