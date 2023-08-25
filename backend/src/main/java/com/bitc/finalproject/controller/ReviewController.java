package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.ReviewEntity;
import com.bitc.finalproject.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class ReviewController {
    private final ReviewService reviewService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/responseReview", method = RequestMethod.GET)
        public Object ReviewMain(@RequestParam("ISBN13") String isbn13) throws Exception {
        List<ReviewEntity> reviewEntityList = reviewService.selectReviewList(isbn13);
        return reviewEntityList;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/saveReview", method = RequestMethod.POST)
    public Object saveReview(@RequestBody ReviewEntity reviewEntity)throws Exception{
        reviewService.reviewInsert(reviewEntity);
        return null;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/deleteReview", method = RequestMethod.DELETE)
    public Object deleteReview(@RequestParam("bookReviewPk")int bookReviewPk) throws Exception{
        reviewService.deleteReview(bookReviewPk);
        return null;
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/updateReview", method = RequestMethod.PUT)
    public String updateReview(@RequestBody ReviewEntity reviewEntity,@RequestParam("bookReviewPk")int bookReviewPk) throws Exception {
            reviewService.updateReview(reviewEntity,bookReviewPk);
           return null;
    }

}
