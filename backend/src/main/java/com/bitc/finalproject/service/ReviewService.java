package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.ReviewEntity;

import java.util.List;

public interface ReviewService {
//    리뷰 올릴떄 쓸려고 구현
    void reviewInsert(ReviewEntity reviewEntity) throws Exception;

    List<ReviewEntity> selectReviewList(String isbn13) throws Exception;


    void deleteReview(int bookReviewPk)throws  Exception;

    void updateReview(ReviewEntity reviewEntity)throws Exception;
}
