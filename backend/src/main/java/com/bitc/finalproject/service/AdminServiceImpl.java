package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.dto.MemberDto;
import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.repository.BoardRepository;
import com.bitc.finalproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public int getQuestionsCount(String boardTitle, String boardWriterName, String boardContent) throws Exception {
        int n = 0;
        // 제목+내용 검색일 때
        if(boardTitle.equals(boardContent) && !boardTitle.equals("")){
            n = boardRepository.countByTitleAndContent(boardTitle, boardContent, "관리자문의");
        }
        else{
            n =  boardRepository.countByBoardTitleContainingAndBoardWriterNameContainingAndBoardContentContainingAndBoardCategory(boardTitle,boardWriterName,boardContent, "관리자문의");
        }
        return n;
    }

    // 레파지토리에서 만든 메소드에 그냥 pageable 갖다주면 됨
    @Override
    public List<BoardDto> findBoardList(String boardTitle, String boardWriterName, String boardContent, Pageable pageable) throws Exception{
        List<BoardDto> list = new ArrayList<>();
        // 제목+내용 검색일 때
        if(boardTitle.equals(boardContent) && !boardTitle.equals("")){
            list = boardRepository.findBoardDtoByTitleAndContent(boardTitle, boardContent, "관리자문의", pageable);
        }
        else{
            list =  boardRepository.findBoardDto(boardTitle,boardWriterName,boardContent, "관리자문의", pageable);
        }
        return list;
    }

    @Override
    public List<MemberDto> getMemberList(String authority, String content, Pageable pageable) throws Exception {
        List<MemberDto> list = memberRepository.findMemberDtoByAuthorityAndContent(authority, content, pageable);
        return list;
    }

    @Override
    public int getMemberCount(String authority, String content) throws Exception {
        return memberRepository.countMemberDtoByAuthorityAndContent(authority, content);
    }
}
