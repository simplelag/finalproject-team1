package com.bitc.finalproject.service;

import com.bitc.finalproject.repository.MemberRepository;
import com.bitc.finalproject.entity.BookEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public int countMember(String userId, String password) throws Exception {
        return memberRepository.countByMemberIdAndMemberPassword(userId, password);
    }

    @Override
    public List<BookEntity.MemberEntity> allMemberData(String userId) throws Exception {
        return memberRepository.findAllByMemberId(userId);
    }

    @Override
    public boolean checkId(String userId) throws Exception {
        return memberRepository.existsByMemberId(userId);
    }
    @Override
    public void saveMember(BookEntity.MemberEntity memberEntity) throws Exception {
        memberRepository.save(memberEntity);
    }
}
