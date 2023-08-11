package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();
    List<BoardEntity> findAllByBoardCategory(String boardCategory, Pageable pageable);
    int countByBoardCategory(String boardCategory);
}
