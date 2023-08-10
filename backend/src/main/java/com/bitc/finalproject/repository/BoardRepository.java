package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();

    // left join해서 게시글 제목 등과 함께 코멘트 개수까지 표시할수 있는 쿼리
    // 빨간줄은 신경 x
    // Pageable 객체를 받은것 만으로도 sql에 limit .. 구문을 추가해서 알아서 한페이지분량의 리스트만 select해줌
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, COUNT(c)) " +
                    "FROM BoardEntity b LEFT JOIN CommentEntity c ON b.boardPk = c.commentBoardPk " +
                    "WHERE b.boardTitle LIKE %:boardTitle% AND b.boardWriterName LIKE %:boardWriterName%" +
                    "AND b.boardContent LIKE %:boardContent% AND b.boardCategory = :boardCategory " +
                    "GROUP BY b.boardPk"
    )
    List<BoardDto> findBoardDto(String boardTitle, String boardWriterName, String boardContent, String boardCategory, Pageable pageable);

    // 제목+내용 검색일 때 컨텐츠 리스트
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, COUNT(c)) " +
                    "FROM BoardEntity b LEFT JOIN CommentEntity c ON b.boardPk = c.commentBoardPk " +
                    "WHERE (b.boardTitle LIKE %:boardTitle% OR b.boardContent LIKE %:boardContent%) " +
                    "AND b.boardCategory = :boardCategory " +
                    "GROUP BY b.boardPk"
    )
    List<BoardDto> findBoardDtoByTitleAndContent(String boardTitle, String boardContent, String boardCategory, Pageable pageable);

    int countByBoardTitleContainingAndBoardWriterNameContainingAndBoardContentContainingAndBoardCategory(String boardTitle, String boardWriterName, String boardContent, String boardCategory);

    // 제목+내용 검색일 때 컨텐츠 개수
    @Query(
            "SELECT count(b) FROM BoardEntity b " +
                    "WHERE (b.boardTitle LIKE %:boardTitle% OR b.boardContent LIKE %:boardContent%) " +
                    "AND b.boardCategory = :boardCategory "
    )
    int countByTitleAndContent(String boardTitle, String boardContent, String boardCategory);
}
