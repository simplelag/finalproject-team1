package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentPk;

    @Column(nullable = false)
    private int commentBoardPk;

    @Column(nullable = false)
    private String commentWriterId;

    @Column(nullable = false)
    private String commentWriterName;

    @Column(nullable = false)
    private String commentContent;

    @Column(nullable = false)
    private String commentDatetime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    private int commentNum;

}
