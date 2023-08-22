package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.entity.LikeEntity;
import com.bitc.finalproject.repository.BoardRepository;
import com.bitc.finalproject.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService{

    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;

    @Override
    public int likeBoardReading(int boardPk, String id) throws Exception {
        return likeRepository.countByLikeBoardPkAndLikeMemberId(boardPk, id);
    }

    @Override
    public void addLike(LikeEntity likeEntity, int boardPk) throws Exception {
        likeRepository.save(likeEntity);
        Optional<BoardEntity> optional = boardRepository.findById(boardPk);
        BoardEntity boardEntity = optional.get();
        boardEntity.setBoardLike(boardEntity.getBoardLike() + 1);
        boardRepository.save(boardEntity);
    }

    @Override
    public void removeLike(int boardPk, String likeMemberId) throws Exception {
        likeRepository.deleteByLikeBoardPkAndLikeMemberId(boardPk, likeMemberId);
        Optional<BoardEntity> optional = boardRepository.findById(boardPk);
        BoardEntity boardEntity = optional.get();
        boardEntity.setBoardLike(boardEntity.getBoardLike() - 1);
        boardRepository.save(boardEntity);
    }
}
