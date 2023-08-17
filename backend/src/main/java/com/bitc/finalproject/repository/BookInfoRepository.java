package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookInfoRepository  extends JpaRepository<BookEntity, Integer> {
    List<BookEntity> findAllByOrderBySalePkDesc();
    List<BookEntity> findAllByOrderBySaleBookPriceDesc();
    List<BookEntity> findBySaleBookId(String isbn13);
}
