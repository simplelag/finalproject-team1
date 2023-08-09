package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AdminService {
    List<BoardEntity> getQuestionList(Pageable pageable) throws Exception;
    int getQuestionNum() throws Exception;
}
