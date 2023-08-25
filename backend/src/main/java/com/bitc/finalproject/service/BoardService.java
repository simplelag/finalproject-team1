package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;

public interface BoardService {

    List<BoardEntity> selectBoardList() throws Exception;

    List<BoardEntity> selectBoardNoticeList(String boardCategory) throws Exception;

    List<BoardEntity> selectBoardNomalList(String boardCategory, String boardCategory2, Pageable pageable) throws Exception;

    List<BoardEntity> boardListCount(String boardCategory, String boardCategory2) throws Exception;

    int countList(String boardCategory, String boardCategory2) throws Exception;

    BoardEntity selectBoardDetail(int boardPk) throws Exception;

    void writeBoard(BoardEntity boardEntity) throws Exception;

    void deleteBoard(int boardPk) throws Exception;

    Optional<BoardEntity> likeCnt(int boardPk) throws Exception;

    List<BoardEntity> myBoardList(String userId, Pageable pageable) throws Exception;
}
