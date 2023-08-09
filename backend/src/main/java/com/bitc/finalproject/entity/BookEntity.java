package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int bookPk;
    @Column(nullable = false)

    private String bookTitle;

    private String bookAuthor;

    private int bookstandardPrice;

    private String bookIsbn;

    private String bookcoverUrl;

    private String saledateTime;

    private String salepostPrice;


}
