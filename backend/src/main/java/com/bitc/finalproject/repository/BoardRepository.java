package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();
}
