package com.bitc.finalproject.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchItemObject {
    private String version;
    private String logo;
    private String title;
    private String link;
    private String pubDate;
    private int totalResults;
    private int startIndex;
    private int itemsPerPage;
    private String query;
    private int searchCategoryId;
    private String searchCategoryName;
    private List<SearchItemDto> item;
}
