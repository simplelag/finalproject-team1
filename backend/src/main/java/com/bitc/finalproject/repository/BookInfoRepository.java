package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BookEntity;
import org.aspectj.weaver.Lint;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookInfoRepository extends JpaRepository<BookEntity, Integer> {
    List<BookEntity> findAllByOrderBySalePkDesc();

    List<BookEntity> findBySaleBookIdOrderBySaleBookPriceDesc(String isbn13);

    List<BookEntity> findBySaleBookIdOrderBySaleBookPriceAsc(String isbn13);

    List<BookEntity> findBySaleBookId(String isbn13);

    List<BookEntity> findBySaleSellerIdOrderBySalePkDesc(String userId);

    List<BookEntity> findAllBySalePkIn(List<Integer> cheekList);

    // 판매중도서 전체리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND (b.saleSellerName LIKE %:saleSellerName% " +
            "OR b.saleSellerId LIKE %:saleSellerName%) " +
            "AND (b.saleDiscription LIKE %:content% OR b.saleDateTime LIKE %:content%) "
    )
    List<BookEntity> findAllSellingBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

    // 판매가능한 판매중도서 리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND (b.saleSellerName LIKE %:saleSellerName% " +
            "OR b.saleSellerId LIKE %:saleSellerName%) " +
            "AND (b.saleDiscription LIKE %:content% OR b.saleDateTime LIKE %:content%) " +
            "AND (b.saleDisabled IS null OR b.saleDisabled = '' ) "
    )
    List<BookEntity> findSellableBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

    // 판매금지된 판매중도서 리스트
    @Query("SELECT b " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND (b.saleSellerName LIKE %:saleSellerName% " +
            "OR b.saleSellerId LIKE %:saleSellerName%) " +
            "AND (b.saleDiscription LIKE %:content% OR b.saleDateTime LIKE %:content%) " +
            "AND (b.saleDisabled IS NOT null AND b.saleDisabled != '' ) "
    )
    List<BookEntity> findUnsellableBookList(String saleBookTitle, String saleSellerName, String content, Pageable pageable);

    // 판매중도서 전체 개수
    int countAllBySaleBookTitleContainingAndSaleSellerIdContainingAndSaleSellerNameContainingAndSaleDiscriptionContaining(String saleBookTitle, String saleSellerId, String saleSellerName, String content );

    // 판매가능한 판매중도서 전체 개수
    @Query("SELECT COUNT(b) " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND (b.saleSellerName LIKE %:saleSellerName% " +
            "OR b.saleSellerId LIKE %:saleSellerName%) " +
            "AND b.saleDiscription LIKE %:content% AND b.saleDateTime LIKE %:content% " +
            "AND (b.saleDisabled IS null OR b.saleDisabled = '' ) "
    )
    int countSellableBookList(String saleBookTitle, String saleSellerName, String content);

    // 판매불가능한 판매중도서 전체 개수
    @Query("SELECT COUNT(b) " +
            "FROM BookEntity b " +
            "WHERE b.saleBookTitle LIKE %:saleBookTitle% " +
            "AND (b.saleSellerName LIKE %:saleSellerName% " +
            "OR b.saleSellerId LIKE %:saleSellerName%) " +
            "AND b.saleDiscription LIKE %:content% AND b.saleDateTime LIKE %:content% " +
            "AND (b.saleDisabled IS NOT null AND b.saleDisabled != '' ) "
    )
    int countUnsellableBookList(String saleBookTitle, String saleSellerName, String content);
}
