package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.LikeEntity;

public interface LikeService {

    int likeBoardReading(int boardPk, String id) throws Exception;

    void addLike(LikeEntity likeEntity, int boardPk) throws Exception;

    void removeLike(int boardPk, String likeMemberId) throws Exception;
}
