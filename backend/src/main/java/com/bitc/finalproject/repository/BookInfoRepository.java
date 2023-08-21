package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookInfoRepository extends JpaRepository<BookEntity, Integer> {
    List<BookEntity> findAllByOrderBySalePkDesc();

    List<BookEntity> findBySaleBookIdOrderBySaleBookPriceDesc(String isbn13);

    List<BookEntity> findBySaleBookIdOrderBySaleBookPriceAsc(String isbn13);

    List<BookEntity> findBySaleBookId(String isbn13);

    List<BookEntity> findBySaleSellerId(String userId);

    // 판매중도서 전체리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND b.saleSellerName LIKE %:saleSellerName%" +
            "AND b.saleDiscription LIKE %:content% AND b.saleDateTime = :content "
    )
    List<BookEntity> findAllSellingBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

    // 판매가능한 판매중도서 리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND b.saleSellerName LIKE %:saleSellerName%" +
            "AND b.saleDiscription LIKE %:content% AND b.saleDateTime = :content " +
            "AND (b.saleDisabled IS null OR b.saleDisabled = '' ) "
    )
    List<BookEntity> findSellableBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

    // 판매금지된 판매중도서 리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND b.saleSellerName LIKE %:saleSellerName%" +
            "AND b.saleDiscription LIKE %:content% AND b.saleDateTime = :content " +
            "AND (b.saleDisabled IS NOT null OR b.saleDisabled != '' ) "
    )
    List<BookEntity> findUnellableBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

}
