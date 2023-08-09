package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();
}
