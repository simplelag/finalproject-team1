package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<BoardEntity> selectBoardNoticeList(String boardCategory) throws Exception {
        return boardRepository.findAllByBoardCategoryOrderByBoardPkDesc(boardCategory);
    }

    @Override
    public List<BoardEntity> selectBoardNomalList(String boardCategory, String boardCategory2, Pageable pageable) throws Exception {
        return boardRepository.findAllByBoardCategoryOrBoardCategoryOrderByBoardPkDesc(boardCategory, boardCategory2, pageable);
    }

    public List<BoardEntity> boardListCount(String boardCategory, String boardCategory2) throws Exception {
        return boardRepository.findAllByBoardCategoryOrBoardCategoryOrderByBoardPkDesc(boardCategory, boardCategory2);
    }

    public int countList(String boardCategory, String boardCategory2) throws Exception {
        return boardRepository.countByBoardCategoryOrBoardCategory(boardCategory, boardCategory2);
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

    @Override
    public Optional<BoardEntity> likeCnt(int boardPk) throws Exception {
        return boardRepository.findBoardLikeByBoardPk(boardPk);
    }

    @Override
    public List<BoardEntity> myBoardList(String userId, Pageable pageable) throws Exception {
        String[] list = {"일반","독후감"};
        return boardRepository.findByBoardWriterIdAndAndBoardCategoryInOrderByBoardDatetimeDesc(userId, list ,pageable);
    }

}
