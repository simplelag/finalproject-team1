package com.bitc.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
// BoardEntity와 CommentEntity를 join해서 댓글수까지 게시글 목록에 표시하기위한 DTO
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private int boardPk;
    private String boardTitle;
    private String boardWriterName;
    private String boardCategory;
    private LocalDateTime boardDatetime;
    private int boardVisitCount;
    private Long commentNumber;

}
