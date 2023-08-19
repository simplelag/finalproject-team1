package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

import javax.swing.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false)
    private String boardWriterId;

    @Column(nullable = false)
    private String boardWriterName;

    @Column(nullable = false)
    private String boardCategory;

    @Column(nullable = false)
    private String boardContent;

    @Column(nullable = false)
    private String boardDatetime =  LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    private int boardLike;

    private int boardVisitCount;

    private int boardEdited;

}
