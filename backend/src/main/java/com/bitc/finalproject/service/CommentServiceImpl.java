package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public List<CommentEntity> selectCommentList(int boardPk) throws Exception {
        return commentRepository.findAllByCommentPk(boardPk);
    }

    @Override
    public void writeComment(CommentEntity commentEntity) throws Exception {
        commentRepository.save(commentEntity);
    }

    @Override
    public void deleteComment(int commentPk) throws Exception {
        commentRepository.deleteById(commentPk);
    }
}
