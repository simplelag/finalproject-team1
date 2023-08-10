package com.bitc.finalproject.service;

import com.bitc.finalproject.dto.BoardDto;
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
    public int getQuestionNum() throws Exception {
        return boardRepository.countByBoardCategory("관리자문의");
    }

    // 레파지토리에서 만든 메소드에 그냥 pageable 갖다주면 됨
    @Override
    public List<BoardDto> findBoardList(Pageable pageable) throws Exception{
        return boardRepository.findBoardDto("관리자문의", pageable);
    }
}
