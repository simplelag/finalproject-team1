package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.BookEntity;

import java.util.List;

public interface MemberService{
    int countMember(String userId, String password) throws Exception;

    List<BookEntity.MemberEntity> allMemberData(String userId) throws Exception;

    boolean checkId(String userId) throws Exception;
    void saveMember(BookEntity.MemberEntity memberEntity) throws Exception;
}
