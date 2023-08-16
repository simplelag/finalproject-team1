package com.bitc.finalproject.repository;

import com.bitc.finalproject.dto.MemberDto;
import com.bitc.finalproject.entity.MemberEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;

    boolean existsByMemberName(@Param("name") String name) throws Exception;

    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;

    List<MemberEntity> findAllByMemberId(String userId) throws Exception;

//    int removeByMemberIdAndMemberPassword(String userId, String password) throws Exception;


    // 등급, 검색내용으로 memberDto List 반환
    @Query("SELECT new com.bitc.finalproject.dto.MemberDto(" +
            "m.memberId, m.memberName, m.memberEmail, m.memberPhone, " +
            "m.memberAuthority, m.memberAddress, m.memberDatetime) " +
            "FROM MemberEntity m "
            + "WHERE (m.memberId LIKE %:content% OR m.memberName LIKE %:content%" +
            "OR m.memberEmail LIKE %:content% OR m.memberPhone LIKE %:content%" +
            "OR m.memberAddress LIKE %:content% ) " +
            "AND m.memberAuthority LIKE %:authority% "
    )
    List<MemberDto> findMemberDtoByAuthorityAndContent(String authority, String content, Pageable pageable);

    @Query("SELECT count(m)" +
            "FROM MemberEntity m "
            + "WHERE (m.memberId LIKE %:content% OR m.memberName LIKE %:content%" +
            "OR m.memberEmail LIKE %:content% OR m.memberPhone LIKE %:content%" +
            "OR m.memberAddress LIKE %:content% ) " +
            "AND m.memberAuthority LIKE %:authority% "
    )
    int countMemberDtoByAuthorityAndContent(String authority, String content);
}
