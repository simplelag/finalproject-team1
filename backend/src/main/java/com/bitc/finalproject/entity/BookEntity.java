package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "sale")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int bookPk;
    @Column(nullable = false)
    private String bookTitle;
    @Column(nullable = false)
    private String bookCover;
    @Column(nullable = false)
    private String sellerId;
    @Column(nullable = false)
    private String sellerName;
//    @Column(nullable = false)
//    private String bookAuthor;
    @Column(nullable = false)
    private int bookPrice;
    @Column(nullable = false)
    private LocalDateTime dateTime =  LocalDateTime.now();;
    private int bookPieces;
    @Column(nullable = false)
    private int bookstandardPrice;
    @Column(nullable = false)
    private int bookIsbn;
    @Column(nullable = false)
    private String salepostPrice;

    @Column(nullable = false)
    private int bookGrade;

    private String disabled;

    private String bookdiscription;




}
