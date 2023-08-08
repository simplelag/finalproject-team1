package com.bitc.finalproject.service;

import com.bitc.finalproject.data.entity.MemberEntity;
import com.bitc.finalproject.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public boolean checkId(String userId) throws Exception {
        return memberRepository.existsByMemberId(userId);
    }

    @Override
    public void saveAllMember(String userId, String password, String name, String email, String phone, String address) {
        memberRepository.saveAll(userId, password, name, email, phone, address);
    }
}
