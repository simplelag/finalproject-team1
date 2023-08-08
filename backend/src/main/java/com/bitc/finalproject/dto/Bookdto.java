package com.bitc.finalproject.dto;

import com.bitc.finalproject.entity.BookEntity;
import lombok.Data;

import java.util.List;
@Data
public class Bookdto {
    private List<BookEntity> bookEntityList = null;
}
