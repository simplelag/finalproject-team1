package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.UserEntity;

import java.util.List;

public interface UserService {
    int countMember(String userId, String password) throws Exception;

    List<UserEntity> allMemberData(String userId) throws Exception;

    boolean checkId(String userId) throws Exception;
    boolean checkName(String name) throws Exception;
    void saveMember(UserEntity memberEntity) throws Exception;

//    회원 탈퇴
    void memberWithDraw(UserEntity memberEntity) throws Exception;
}
