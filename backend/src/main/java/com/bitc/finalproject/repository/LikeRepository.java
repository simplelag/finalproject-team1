package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {

    int countByLikeBoardPkAndLikeMemberId(int boardPk, String id) throws Exception;

    @Transactional
    void deleteByLikeBoardPkAndLikeMemberId(int boardPk, String likeMemberId) throws Exception;
}
