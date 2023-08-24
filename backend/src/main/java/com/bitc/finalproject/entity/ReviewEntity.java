package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name="book_review")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookReviewPk;
    @Column(nullable = false)
    private String bookReviewBuyerId;
    @Column(nullable = false)
    private String bookReviewBuyerName;
    @Column(nullable = false)
    private int bookReviewGrade;
    @Column(nullable = false)
    private String bookReviewTitle;
    @Column(nullable = false)
    private String bookReviewContent;
    @Column(nullable = false)
    private String bookReviewDatetime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    @Column(nullable = false)
    private String bookReviewIsbn13;
}
