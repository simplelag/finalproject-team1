package com.bitc.finalproject.data.repository;

import com.bitc.finalproject.data.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;
}
