package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.dto.MemberDto;
import com.bitc.finalproject.entity.BoardEntity;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AdminService {
    int getQuestionsCount(String boardTitle, String boardWriterName, String boardContent) throws Exception;
    List<BoardDto> findBoardList(String boardTitle, String boardWriterName, String boardContent, Pageable pageable) throws Exception;

    int getQuestionsCountUser(String boardTitle, String boardWriterId, String boardContent) throws Exception;
    List<BoardDto> findBoardListUser(String boardTitle, String boardWriterId, String boardContent, Pageable pageable) throws Exception;

    List<MemberDto> getMemberList(String authority, String content, Pageable pageable) throws Exception;

    int getMemberCount(String authority, String content) throws Exception;

    void editAuthority(String id, String authority) throws Exception;
}
