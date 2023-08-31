package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.ReviewEntity;
import com.bitc.finalproject.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {
    private  final ReviewRepository reviewRepository;

    @Override
    public void reviewInsert(ReviewEntity reviewEntity) throws Exception {
        reviewRepository.save(reviewEntity);
    }

    @Override
    public List<ReviewEntity> selectReviewList(String isbn13) throws Exception {
        return reviewRepository.findByBookReviewIsbn13(isbn13);
    }

    @Override
    public void deleteReview(int bookReviewPk) throws Exception {
        reviewRepository.deleteById(bookReviewPk);
    }

    @Override
    public void updateReview(ReviewEntity reviewEntity, int bookReviewPk) throws Exception {
        ReviewEntity existingReview = reviewRepository.findById(reviewEntity.getBookReviewPk())
                .orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없음"));
        existingReview.setBookReviewBuyerId(reviewEntity.getBookReviewBuyerId());
        existingReview.setBookReviewBuyerName(reviewEntity.getBookReviewBuyerName());
        existingReview.setBookReviewGrade(reviewEntity.getBookReviewGrade());
        existingReview.setBookReviewTitle(reviewEntity.getBookReviewTitle());
        existingReview.setBookReviewContent(reviewEntity.getBookReviewContent());
        reviewRepository.save(existingReview);
    }

        public List<ReviewEntity> myReviewList (String userId, Pageable pageable) throws Exception {
            return reviewRepository.findByBookReviewBuyerIdOrderByBookReviewPkDesc(userId, pageable);
        }
    }
