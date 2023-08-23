package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
    List<ReviewEntity> findAllByOrderByBookReviewPkDesc();

    List<ReviewEntity> findByBookReviewIsbn13(String isbn13);

}
