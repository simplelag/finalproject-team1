package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.entity.CommentEntity;

import java.util.List;

public interface CommentService {

    // 댓글 리스트
    List<CommentEntity> selectCommentList(int boardPk) throws Exception;

    // 댓글 쓰기
    void writeComment(CommentEntity commentEntity) throws Exception;

    //댓글 수정
    void updateComment(CommentEntity commentEntity) throws Exception;

    // 댓글 삭제
    void deleteComment(int commentPk) throws Exception;
}
