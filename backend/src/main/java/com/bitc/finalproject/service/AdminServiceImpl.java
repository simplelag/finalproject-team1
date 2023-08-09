package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {

    private final BoardRepository boardRepository;
    @Override
    public List<BoardEntity> getQuestionList(Pageable pageable) throws Exception {
        return boardRepository.findAllByBoardCategory("관리자문의", pageable);
    }

    @Override
    public int getQuestionNum() throws Exception {
        return boardRepository.countByBoardCategory("관리자문의");
    }
}
