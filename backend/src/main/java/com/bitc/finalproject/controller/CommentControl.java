package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class CommentControl {

    private final CommentService commentService;

    @RequestMapping(value = "/board/comment/{boardPk}", method = RequestMethod.GET)
    public Object CommentList(@PathVariable("boardPk") int boardPk) throws Exception {
        List<CommentEntity> commentEntityList = commentService.selectCommentList(boardPk);

        return commentEntityList;
    }

    @RequestMapping(value = "/board/comment/write", method = RequestMethod.POST)
    public Object commentInsert(CommentEntity commentEntity) throws Exception {

        commentService.writeComment(commentEntity);

        return null;
    }

    @RequestMapping(value = "/board/comment/update/{commentPk}", method = RequestMethod.PUT)
    public Object commentUpdate(@PathVariable("commentPk") int commentPk, CommentEntity commentEntity) throws Exception {

        commentService.updateComment(commentEntity);

        return null;
    }

    @RequestMapping(value = "/board/comment/delete/{commentPk}", method = RequestMethod.DELETE)
    public Object commentDelete(@PathVariable("commentPk") int commentPk, @RequestParam("commentWriterId") String commentWriterId,
                                @RequestParam("nowId") String nowId, @RequestParam("authority") String authority) throws Exception {

        if ((commentWriterId.equals(nowId)) || authority.equals("admin")) {
            commentService.deleteComment(commentPk);
        }

        return "success";
    }
}
