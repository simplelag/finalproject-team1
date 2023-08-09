package com.bitc.finalproject.service;

import com.bitc.finalproject.data.entity.MemberEntity;

import java.util.List;

public interface MemberService{
    int countMember(String userId, String password) throws Exception;

    List<MemberEntity> allMemberData(String userId) throws Exception;

    boolean checkId(String userId) throws Exception;
    void saveMember(MemberEntity memberEntity) throws Exception;
}
