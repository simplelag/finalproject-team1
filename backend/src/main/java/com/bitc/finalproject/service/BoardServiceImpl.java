package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService{

    private final BoardRepository boardRepository;

    @Override
    public List<BoardEntity> selectBoardList() throws Exception {
        return boardRepository.findAllByOrderByBoardPkDesc();
    }

    @Override
    public BoardEntity selectBoardDetail(int boardPk) throws Exception {
        Optional<BoardEntity> optional = boardRepository.findById(boardPk);

        if (optional.isPresent()) {
            BoardEntity boardEntity = optional.get();
            boardEntity.setBoardVisitCount(boardEntity.getBoardVisitCount() + 1);
            boardRepository.save(boardEntity);

            return boardEntity;
        }
        else {
            throw new NullPointerException();
        }
    }

    @Override
    public void writeBoard(BoardEntity boardEntity) throws Exception {
        boardRepository.save(boardEntity);
    }

    @Override
    public void deleteBoard(int boardPk) throws Exception {
        boardRepository.deleteById(boardPk);
    }
}
