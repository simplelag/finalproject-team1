package com.bitc.finalproject.service;

import com.bitc.finalproject.entity.UserEntity;
import com.bitc.finalproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository memberRepository;

    @Override
    public int countMember(String userId, String password) throws Exception {
        return memberRepository.countByMemberIdAndMemberPassword(userId, password);
    }

    @Override
    public List<UserEntity> allMemberData(String userId) throws Exception {
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
    public void saveMember(UserEntity memberEntity) throws Exception {
        memberRepository.save(memberEntity);
    }

    @Override
    public void memberWithDraw(UserEntity memberEntity) throws Exception {
        memberRepository.delete(memberEntity);
    }
}
