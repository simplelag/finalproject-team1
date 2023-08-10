package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.ProductItem;
import com.bitc.finalproject.entity.BookEntity;

import java.util.List;

public interface BookService {
    List<ProductItem> getItemList(String url) throws Exception;

}
