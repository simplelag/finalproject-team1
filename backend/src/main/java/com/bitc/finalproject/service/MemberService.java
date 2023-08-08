package com.bitc.finalproject.service;

import com.bitc.finalproject.data.entity.MemberEntity;

public interface MemberService{
    int countMember(String userId, String password) throws Exception;
    boolean checkId(String userId) throws Exception;
    void saveMember(MemberEntity memberEntity) throws Exception;
}
