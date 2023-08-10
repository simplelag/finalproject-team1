package com.bitc.finalproject.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class BookDto {
    private  int bookPk;
    private String bookTitle;
    private String bookCover;
    private String sellerId;
    private String sellerName;
    private String bookAuthor;
    private int bookPrice;
    private LocalDateTime dateTime =  LocalDateTime.now();;

    private int bookPieces;
    private double bookstandardPrice;
    private String cover;
    private int bookIsbn;
    private String salepostPrice;

    private int bookGrade;

    private String disabled;

    private String bookdiscription;
}
