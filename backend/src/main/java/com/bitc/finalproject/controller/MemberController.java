package com.bitc.finalproject.controller;

import com.bitc.finalproject.data.entity.MemberEntity;
import com.bitc.finalproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {
    private final MemberService memberService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Object showLogin(@RequestParam("id") String userId, @RequestParam("pw") String userPw) throws Exception{
        Map<String, Object> result = new HashMap<>();
//        int correctId = memberService.
        return null;
    }

//    회원가입
//    아이디 중복 확인 버튼 클릭
    @RequestMapping(value = "/sign/idCheck", method = RequestMethod.GET)
    public boolean showCheckId(@RequestParam("userId") String userId) throws Exception{
        return memberService.checkId(userId);
    }

//    회원가입 버튼 클릭
    @RequestMapping(value = "/sign/signup", method = RequestMethod.PUT)
    public void showSingUp(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address
    ) throws Exception{
//        MemberEntity memberEntity = null;
//        memberEntity.setMemberId(userId);
//        memberEntity.setMemberName(name);
//        memberEntity.setMemberPassword(password);
//        memberEntity.setMemberEmail(email);
//        memberEntity.setMemberPhone(phone);
//        memberEntity.setMemberAddress(address);
        memberService.saveAllMember(userId, password, name, email, phone, address);
    }
}
