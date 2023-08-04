package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "board")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardPk;

    @Column(nullable = false)
    private String boardTitle;

    private String boardWriterId;

    private String boardWriterName;

    @Column(nullable = false)
    private String boardCategory;

    @Column(nullable = false)
    private String boardContent;

    @Column(nullable = false)
    private Date boardDatetime;

    private int boardLike;

    private int boardVisitCount;

    private int boardEdited;
}
