package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<BookEntity.MemberEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;
    List<BookEntity.MemberEntity> findAllByMemberId(String userId) throws Exception;
}
