package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public int countMember(String userId, String password) throws Exception {
        return memberRepository.countByMemberIdAndMemberPassword(userId, password);
    }

    @Override
    public List<MemberEntity> allMemberData(String userId) throws Exception {
        return memberRepository.findAllByMemberId(userId);
    }

    @Override
    public boolean checkId(String userId) throws Exception {
        return memberRepository.existsByMemberId(userId);
    }

    @Override
    public boolean checkName(String name) throws Exception {
        return memberRepository.existsByMemberName(name);
    }

    @Override
    public void saveMember(MemberEntity memberEntity) throws Exception {
        memberRepository.save(memberEntity);
    }

    @Override
    public void memberWithDraw(MemberEntity memberEntity) throws Exception {
        memberRepository.delete(memberEntity);
    }
}
