package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
    boolean existsByMemberName(@Param("name") String name) throws Exception;
    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;
    List<MemberEntity> findAllByMemberId(String userId) throws Exception;

//    int removeByMemberIdAndMemberPassword(String userId, String password) throws Exception;
}
