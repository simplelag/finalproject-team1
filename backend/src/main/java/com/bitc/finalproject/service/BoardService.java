package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;

import java.util.List;

public interface BoardService {

    List<BoardEntity> selectBoardList() throws Exception;

    BoardEntity selectBoardDetail(int boardPk) throws Exception;

    void writeBoard(BoardEntity boardEntity) throws Exception;

    void deleteBoard(int boardPk) throws Exception;
}
