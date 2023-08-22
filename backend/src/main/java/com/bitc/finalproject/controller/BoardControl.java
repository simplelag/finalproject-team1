package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BoardEntity;

import com.bitc.finalproject.entity.LikeEntity;
import com.bitc.finalproject.repository.BoardRepository;
import com.bitc.finalproject.service.AdminService;
import com.bitc.finalproject.service.BoardService;

import com.bitc.finalproject.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BoardControl {

    private final BoardService boardService;
    private final LikeService likeService;
    private final AdminService adminService;

    @RequestMapping(value = "/board", method = RequestMethod.GET)
    public Object boardMain() throws Exception{
        List<BoardEntity> boardEntityList = boardService.selectBoardList();

        return boardEntityList;
    }

    @RequestMapping(value = "/board/category", method = RequestMethod.GET)
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
        System.out.println("글스기 pk " + boardEntity.getBoardPk());

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

    // 사용자용 문의글 리스트반환
    @RequestMapping(value = "/board/getQuestionsUser/{id}", method = RequestMethod.GET)
    public Object getQuestionListUser(@RequestParam String title, @PathVariable String id, @RequestParam String content, Pageable pageable) throws Exception {
        System.out.println("문의글리스트 사용자 id: "+id);
        List<BoardDto> list = adminService.findBoardListUser(title, id, content, pageable);
        return list;
    }

    // 사용자용 문의글 총개수 반환
    @RequestMapping(value = "/board/getQuestionsCountUser/{id}", method = RequestMethod.GET)
    public int getQuestionsCountUser(@RequestParam String title, @PathVariable String id, @RequestParam String content) throws Exception{

        return adminService.getQuestionsCountUser(title, id, content);
    }

    @RequestMapping(value = "/question/write", method = RequestMethod.POST)
    public int questionInsert(BoardEntity boardEntity) throws Exception {

        boardService.writeBoard(boardEntity);

        return boardEntity.getBoardPk();
    }
}
