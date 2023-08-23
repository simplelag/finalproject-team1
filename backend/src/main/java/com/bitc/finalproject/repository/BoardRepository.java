package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.entity.BoardEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    List<BoardEntity> findAllByOrderByBoardPkDesc();

    List<BoardEntity> findAllByBoardCategoryOrderByBoardPkDesc(String boardCategory);

    List<BoardEntity> findAllByBoardCategoryOrBoardCategoryOrderByBoardPkDesc(String boardCategory, String boardCategory2, Pageable pageable);

    List<BoardEntity> findAllByBoardCategoryOrBoardCategoryOrderByBoardPkDesc(String boardCategory, String boardCategory2);

    int countByBoardCategoryOrBoardCategory(String boardCategory, String boardCategory2);

    // left join해서 게시글 제목 등과 함께 코멘트 개수까지 표시할수 있는 쿼리
    // Pageable 객체를 받은것 만으로도 sql에 limit .. 구문을 추가해서 알아서 한페이지분량의 리스트만 select해줌
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, count(c)) " +
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

    // 사용자용 문의글 불러오기
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, count(c)) " +
                    "FROM BoardEntity b LEFT JOIN CommentEntity c ON b.boardPk = c.commentBoardPk " +
                    "WHERE b.boardTitle LIKE %:boardTitle% AND b.boardWriterId = :boardWriterId " +
                    "AND b.boardContent LIKE %:boardContent% AND b.boardCategory = :boardCategory " +
                    "GROUP BY b.boardPk"
    )
    List<BoardDto> findBoardDtoUser(String boardTitle, String boardWriterId, String boardContent, String boardCategory, Pageable pageable);

    // 제목+내용 검색일 때 문의글 리스트 사용자용
    @Query(
            "SELECT new com.bitc.finalproject.dto.BoardDto(" +
                    "b.boardPk, b.boardTitle, b.boardWriterName, b.boardCategory, " +
                    "b.boardDatetime, b.boardVisitCount, COUNT(c)) " +
                    "FROM BoardEntity b LEFT JOIN CommentEntity c ON b.boardPk = c.commentBoardPk " +
                    "WHERE (b.boardTitle LIKE %:boardTitle% OR b.boardContent LIKE %:boardContent%) " +
                    "AND b.boardCategory = :boardCategory " +
                    "AND b.boardWriterId = :boardWriterId " +
                    "GROUP BY b.boardPk"
    )
    List<BoardDto> findBoardDtoByTitleAndContentUser(String boardTitle, String boardWriterId, String boardContent, String boardCategory, Pageable pageable);

    // 관리자용 문의글개수
    int countByBoardTitleContainingAndBoardWriterNameContainingAndBoardContentContainingAndBoardCategory(String boardTitle, String boardWriterName, String boardContent, String boardCategory);

    // 사용자용 문의글개수
    int countByBoardTitleContainingAndBoardWriterIdAndBoardContentContainingAndBoardCategory(String boardTitle, String boardWriterId, String boardContent, String boardCategory);

    // 제목+내용 검색일 때 컨텐츠 개수
    @Query(
            "SELECT count(b) FROM BoardEntity b " +
                    "WHERE (b.boardTitle LIKE %:boardTitle% OR b.boardContent LIKE %:boardContent%) " +
                    "AND b.boardCategory = :boardCategory "
    )
    int countByTitleAndContent(String boardTitle, String boardContent, String boardCategory);

    // 제목+내용 검색일 때 컨텐츠 개수 사용자용
    @Query(
            "SELECT count(b) FROM BoardEntity b " +
                    "WHERE (b.boardTitle LIKE %:boardTitle% OR b.boardContent LIKE %:boardContent%) " +
                    "AND b.boardCategory = :boardCategory " +
                    "AND b.boardWriterId = :boardWriterId "
    )
    int countByTitleAndContentUser(String boardTitle, String boardWriterId, String boardContent, String boardCategory);


    Optional<BoardEntity> findBoardLikeByBoardPk(int boardPk) throws Exception;
}
