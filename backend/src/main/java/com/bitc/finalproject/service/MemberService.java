package com.bitc.finalproject.service;

import com.bitc.finalproject.data.entity.MemberEntity;

public interface MemberService{
    boolean checkId(String userId) throws Exception;
    void saveAllMember(String userId, String password, String name, String email, String phone, String address);
}
