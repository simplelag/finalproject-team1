package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.MemberEntity;
import com.bitc.finalproject.entity.PurchaseEntity;
import com.bitc.finalproject.service.BookInfoService;
import com.bitc.finalproject.service.MemberService;
import com.bitc.finalproject.service.PurchaseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {
    private final MemberService userService;
    private final BookInfoService bookInfoService;
    private final PurchaseService purchaseService;

//    로그인 시
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Object showLogin(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            HttpServletRequest req
    ) throws Exception{
        HttpSession session = req.getSession();
        Map<Object, Object> result = new HashMap<>();
        int correctId = userService.countMember(userId, password);
        if(correctId > 0){
            List<MemberEntity> memberEntities = userService.allMemberData(userId);
            session.setAttribute("id", userId);
            result.put("name", memberEntities.get(0).getMemberName());
            result.put("grade", memberEntities.get(0).getMemberAuthority());
        }
        result.put("login", correctId);
        return result;
    }

//    회원가입
//    아이디 중복 확인 버튼 클릭
    @RequestMapping(value = "/sign/idCheck", method = RequestMethod.GET)
    public boolean showCheckId(@RequestParam("userId") String userId) throws Exception{
        return userService.checkId(userId);
    }

//    이름이 존재하는지 확인
    @RequestMapping(value = "/sign/nameCheck", method = RequestMethod.GET)
    public boolean showCheckName(@RequestParam("name") String name) throws Exception{
        return userService.checkName(name);
    }

//    회원가입 버튼 클릭
//    회원정보 수정 - 회원 정보 변경 // 똑같이 수정이라서 가능함
    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public void showSingUp(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address
    ) throws Exception{
        MemberEntity memberEntity = null;
        memberEntity = new MemberEntity(userId, password, name, email, phone, address);
        userService.saveMember(memberEntity);
    }

//    회원정보 수정 - 회원 정보 가져오기
    @RequestMapping(value = "/login/myLogin/myUserUpdate", method = RequestMethod.GET)
    public List<MemberEntity> showMemberDetail(@RequestParam("userId") String userId) throws Exception{
        return userService.allMemberData(userId);
    }

//    회원정보 수정 - 회원 탈퇴
    @RequestMapping(value = "/login/myLogin/withdraw", method = RequestMethod.DELETE)
    public int showWithDraw(
            @RequestParam("id") String userId,
            @RequestParam("password") String password
    ) throws Exception{
        MemberEntity memberEntity = new MemberEntity(userId, password);
        int correctId = userService.countMember(userId, password);
        if(correctId > 0){
            userService.memberWithDraw(memberEntity);
        }
        return correctId;
    }

//    마이페이지 - 구매 내역
    @RequestMapping(value = "/login/myLogin/myPurchaseList", method = RequestMethod.GET)
    public Object showMyPurchaseList(@RequestParam("userId") String userId) throws Exception{
        return purchaseService.myPurchaseList(userId);
    }

//    마이페이지 - 구매 취소
    @RequestMapping(value = "/login/myLogin/delete", method = RequestMethod.DELETE)
    public void showMyPurchaseCancel(@RequestBody PurchaseEntity purchaseEntity) throws Exception{
        purchaseService.myPurchaseCancel(purchaseEntity);
    }

    
//    마이페이지 - 판매 내역
    @RequestMapping(value = "/login/myLogin/mySaleList", method = RequestMethod.GET)
    public Object showMySaleList(@RequestParam("userId") String userId) throws Exception{
        return bookInfoService.mySaleList(userId);
    }
}


























