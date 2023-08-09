package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();
//    @Query("SELECT boardPk, boardTitle, boardWriterName, boardCategory, boardDatetime, boardVisitCount, count(c.commentPk) as commentNumber FROM board b left join comment c on b.boardPk = c.commentBoardPk
//            where boardCategory = \"관리자문의\" group by b.boardPk")
    
    List<BoardEntity> findAllByBoardCategory(String boardCategory, Pageable pageable);
    int countByBoardCategory(String boardCategory);
}
