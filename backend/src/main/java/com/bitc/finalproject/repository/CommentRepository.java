package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findAllByCommentBoardPkOrderByCommentDatetimeDesc(int boardPk);

//    void deleteByCommentPk(int commentPk);
}
