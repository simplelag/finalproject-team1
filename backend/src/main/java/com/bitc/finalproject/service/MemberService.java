package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.MemberEntity;

import java.util.List;

public interface MemberService {
    int countMember(String userId, String password) throws Exception;

    List<MemberEntity> allMemberData(String userId) throws Exception;

    boolean checkId(String userId) throws Exception;
    boolean checkName(String name) throws Exception;
    void saveMember(MemberEntity memberEntity) throws Exception;

//    회원 탈퇴
    void memberWithDraw(MemberEntity memberEntity) throws Exception;
}
