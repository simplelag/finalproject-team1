package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;

import java.util.List;
import java.util.Optional;

public interface BoardService {

    List<BoardEntity> selectBoardList() throws Exception;

    List<BoardEntity> selectBoardNoticeList(String boardCategory) throws Exception;

    BoardEntity selectBoardDetail(int boardPk) throws Exception;

    void writeBoard(BoardEntity boardEntity) throws Exception;

    void deleteBoard(int boardPk) throws Exception;

    Optional<BoardEntity> likeCnt(int boardPk) throws Exception;
}
