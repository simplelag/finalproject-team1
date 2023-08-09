package com.bitc.finalproject.data.repository;

import com.bitc.finalproject.data.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;
    List<MemberEntity> findAllByMemberId(String userId) throws Exception;
    
//    회원 탈퇴
//    void deleteAllByMemberIdAndMemberPassword(@Param("id") String userId, @Param("password") String password) throws Exception;
}
