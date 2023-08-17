package com.bitc.finalproject.dto;

import lombok.Data;

@Data
public class SearchItemDto {
    private String title;
    private String link;
    private String author;
    private String pubData;
    private String description;
    private String isbn;
    private String isbn13;
    private int itemId;
    private int priceSales;
    private int priceStandard;
    private String mallType;
    private String stockStatus;
    private int mileage;
    private String cover;
    private int categoryId;
    private String categoryName;
    private String publisher;
    private int salesPoint;
    private boolean adult;
    private boolean fixedPrice;
    private int customerReviewRank;
    private int itempage;
}
