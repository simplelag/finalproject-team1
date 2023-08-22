package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.dto.MemberDto;
import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.entity.BookEntity;
import com.bitc.finalproject.repository.BookInfoRepository;
import com.bitc.finalproject.service.AdminService;
import com.bitc.finalproject.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/admin/", method = RequestMethod.GET)
@RequiredArgsConstructor
@RestController
public class AdminController {

    private final BoardService boardService;
    private final AdminService adminService;
    private final BookInfoRepository saleRepository;


    // 페이지네이션을 위해 Pageable 객체를받음
    // frontend에서 get방식 통신으로 page, size 등의 파라미터를 넘겨주는데
    // 그걸 그냥 Pageable 객체로 받겠다고해도 되는거임
    @RequestMapping(value = "/getQuestions", method = RequestMethod.GET)
    public Object getQuestionList(@RequestParam String title, @RequestParam String name, @RequestParam String content, Pageable pageable) throws Exception {
        // 서비스에 pageable을 넘겨줌
        List<BoardDto> boardList = adminService.findBoardList(title, name, content, pageable);
        return boardList;
    }

    @RequestMapping(value = "/getQuestionsCount", method = RequestMethod.GET)
    public int getQuestionsCount(@RequestParam String title, @RequestParam String name, @RequestParam String content) throws Exception{
        return adminService.getQuestionsCount(title, name, content);
    }

    // authority별 사용자 리스트
    @RequestMapping(value = "/getMembers", method = RequestMethod.GET)
    public Object getMemberList(@RequestParam String authority, @RequestParam String content, Pageable pageable) throws Exception {
        // 서비스에 pageable을 넘겨줌
        List<MemberDto> memberList = adminService.getMemberList(authority, content, pageable);
        return memberList;
    }

    // authority별 사용자수
    @RequestMapping(value = "/getMemberCount", method = RequestMethod.GET)
    public int getMembersCount(@RequestParam String authority, @RequestParam String content) throws Exception{
        return adminService.getMemberCount(authority, content);
    }

    // 사용자 authority 변경
    @RequestMapping(value = "/editAuth", method = RequestMethod.PUT)
    public void editAuthority(@RequestParam String id, @RequestParam String authority) throws Exception{
        System.out.println(id);
        System.out.println(authority);
        adminService.editAuthority(id, authority);
    }

    // 판매상품 리스트
    @RequestMapping(value = "/getSellingBookList", method = RequestMethod.GET)
    public List<BookEntity> getSellingBookList(@RequestParam String title, @RequestParam String name, @RequestParam String content, @RequestParam String disabled, Pageable pageable) throws Exception{
        List<BookEntity> list = new ArrayList<>();
        if(disabled.equals("all")){
            list = saleRepository.findAllSellingBookList(title, name, content, pageable);
        }
        else if (disabled.equals("able")){
            list = saleRepository.findSellableBookList(title, name, content, pageable);
        }
        else {
            list = saleRepository.findUnsellableBookList(title, name, content, pageable);
        }
        return list;
    }

    // 판매상품 개수
    @RequestMapping(value = "/countSellingBookList", method = RequestMethod.GET)
    public int countSellingBookList(@RequestParam String title, @RequestParam String name, @RequestParam String content, @RequestParam String disabled, Pageable pageable) throws Exception{
        int n = 0;
        if(disabled.equals("all")){
            n = saleRepository.countAllBySaleBookTitleContainingAndSaleSellerIdContainingAndSaleSellerNameContainingAndSaleDiscriptionContaining(title, name, name, content);
        }
        else if (disabled.equals("able")){
            n = saleRepository.countSellableBookList(title, name, content);
        }
        else {
            n = saleRepository.countUnsellableBookList(title, name, content);
        }
        return n;
    }

    // 판매상품 정지사유입력
    @RequestMapping(value = "/editDisabled", method = RequestMethod.PUT)
    public void editDisabled(@RequestParam String salePk, @RequestParam String disabled) throws Exception{
        BookEntity entity = saleRepository.findById(Integer.valueOf(salePk)).get();
        entity.setSaleDisabled(disabled);
        saleRepository.save(entity);
    }
}
