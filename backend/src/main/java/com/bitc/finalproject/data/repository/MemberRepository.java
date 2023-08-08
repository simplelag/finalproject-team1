package com.bitc.finalproject.data.repository;

import com.bitc.finalproject.data.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
//    boolean existsByMemberIdAndMemberPassword(String memberId, String memberPassword) throws Exception;
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
}
