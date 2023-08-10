package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BoardEntity;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AdminService {
    int getQuestionNum() throws Exception;
    List<BoardDto> findBoardList(Pageable pageable) throws Exception;
}
