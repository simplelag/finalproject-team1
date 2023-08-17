package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.ProductItem;
import com.bitc.finalproject.dto.ProductObject;

import java.util.List;

public interface BookService {
    ProductObject getItemList(String url) throws Exception;
}
