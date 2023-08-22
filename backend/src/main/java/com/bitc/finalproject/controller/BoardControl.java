package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.BoardEntity;

import com.bitc.finalproject.entity.LikeEntity;
import com.bitc.finalproject.service.BoardService;

import com.bitc.finalproject.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BoardControl {

    private final BoardService boardService;
    private final LikeService likeService;

    @RequestMapping(value = "/board", method = RequestMethod.GET)
    public Object boardMain() throws Exception{
        List<BoardEntity> boardEntityList = boardService.selectBoardList();

        return boardEntityList;
    }

    @RequestMapping(value = "/board/notice", method = RequestMethod.GET)
    public Object boardNotice(@RequestParam("boardCategory") String boardCategory) throws Exception {
        List<BoardEntity> boardEntityList = boardService.selectBoardNoticeList(boardCategory);

        return boardEntityList;
    }

//    @RequestMapping(value = "/board/count", method = RequestMethod.GET)
//    public int boardCount() throws Exception {
//        return
//    }


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

    @RequestMapping(value = "/board/update/{boardPk}", method = RequestMethod.PUT)
    public Object boardUpdate(@PathVariable("boardPk") int boardPk , BoardEntity boardEntity) throws Exception {
        boardService.writeBoard(boardEntity);

        return null;
    }

    @RequestMapping(value = "/board/{boardPk}", method = RequestMethod.DELETE)
    public Object boardDelete(@PathVariable("boardPk") int boardPk, @RequestParam("boardWriterId") String boardWriterId,
                              @RequestParam("nowId") String nowId, @RequestParam("authority") String authority) throws Exception {

        if ((boardWriterId.equals(nowId)) || authority.equals("admin")) {
            boardService.deleteBoard(boardPk);
        }

        return "redirect:/board";
    }

    @RequestMapping(value = "/board/like", method = RequestMethod.POST)
    public Object like(@RequestParam("boardPk") int boardPk, @RequestParam("likeMemberId") String likeMemberId) throws Exception {

        int i = likeService.likeBoardReading(boardPk, likeMemberId);
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setLikeBoardPk(boardPk);
        likeEntity.setLikeMemberId(likeMemberId);

        if (i > 0) {
            likeService.removeLike(boardPk, likeMemberId);
        }
        else {
            likeService.addLike(likeEntity, boardPk);
        }

        Optional<BoardEntity> board = boardService.likeCnt(boardPk);

        return board;
    }
}
