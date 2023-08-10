package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();
    @Query("select b, count(c) as coNum from BoardEntity b left join CommentEntity c on b.boardPk = c.commentBoardPk group by b.boardPk")
    List<BoardEntity> findAllByBoardCategory(String boardCategory, Pageable pageable);

    // left join해서 게시글 제목 등과 함께 코멘트 개수까지 표시할수 있는 쿼리
    // 빨간줄은 신경 x
    // Pageable 객체를 받은것 만으로도 sql에 limit .. 구문을 추가해서 알아서 한페이지분량의 리스트만 select해줌
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, COUNT(c)) " +
                    "FROM BoardEntity b LEFT JOIN CommentEntity c ON b.boardPk = c.commentBoardPk " +
                    "GROUP BY b.boardPk"
    )
    List<BoardDto> findBoardDto(String boardCategory, Pageable pageable);
    int countByBoardCategory(String boardCategory);
}
