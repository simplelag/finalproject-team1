package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.ReviewEntity;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
//    리뷰 올릴떄 쓸려고 구현
    void reviewInsert(ReviewEntity reviewEntity) throws Exception;

    List<ReviewEntity> selectReviewList(String isbn13) throws Exception;


    void deleteReview(int bookReviewPk)throws  Exception;

    List<ReviewEntity> myReviewList(String userId, Pageable pageable) throws Exception;
}
