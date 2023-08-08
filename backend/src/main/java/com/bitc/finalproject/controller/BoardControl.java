package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BoardControl {

    private final BoardService boardService;

    @RequestMapping(value = "/board", method = RequestMethod.GET)
    public Object boardMain() throws Exception{
        List<BoardEntity> boardEntityList = boardService.selectBoardList();
        return boardEntityList;
    }

    @RequestMapping(value = "/board/{boardPk}", method = RequestMethod.GET)
    public Object boardDetail(@PathVariable("boardPk") int boardPk) throws Exception {
        BoardEntity boardEntity = boardService.selectBoardDetail(boardPk);

        return boardEntity;
    }

    @RequestMapping(value = "/board/write", method = RequestMethod.GET)
    public Object boardInsertView() throws Exception{
        return null;
    }

    @RequestMapping(value = "/board/write", method = RequestMethod.POST)
    public Object boardInsert(BoardEntity boardEntity) throws Exception {
        boardService.writeBoard(boardEntity);

        return "redirect:/board";
    }

    @RequestMapping(value = "/board/{boardPk}", method = RequestMethod.DELETE)
    public Object boardDelete(@PathVariable("boardPk") int boardPk) throws Exception {
        boardService.deleteBoard(boardPk);

        return "redirect:/board";
    }

}
