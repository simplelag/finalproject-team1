package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByMemberId(@Param("userId") String userId) throws Exception;
    boolean existsByMemberName(@Param("name") String name) throws Exception;
    int countByMemberIdAndMemberPassword(String userId, String password) throws Exception;
    List<UserEntity> findAllByMemberId(String userId) throws Exception;
}
