package com.bitc.finalproject.controller;

import com.bitc.finalproject.dto.BoardDto;
import com.bitc.finalproject.dto.MemberDto;
import com.bitc.finalproject.entity.BoardEntity;
import com.bitc.finalproject.service.AdminService;
import com.bitc.finalproject.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/admin/", method = RequestMethod.GET)
@RequiredArgsConstructor
@RestController
public class AdminController {

    private final BoardService boardService;
    private final AdminService adminService;

    @RequestMapping(value = "/getInfo/{id}", method = RequestMethod.GET)
    public Object boardMain(@PathVariable("id") String id) throws Exception{
        Map<String, String> map = new HashMap<>();
        System.out.println(id + " 정보 불러오기");
        map.put("id",id);
        map.put("name", "name");
        map.put("grade", "grade");
        return map;
    }

    // 페이지네이션을 위해 Pageable 객체를받음
    // Pageable 객체는 frontend의 commons 경로에서 get방식 통신을 위해 page, size 등의 파라미터를 넘겨주는데
    // 그걸 그냥 Pageable 객체로 받겠다고해도 되는거임
    @RequestMapping(value = "/getQuestions", method = RequestMethod.GET)
    public Object getQuestionList(@RequestParam String title, @RequestParam String name, @RequestParam String content, Pageable pageable) throws Exception {
        // 서비스에 pageable을 넘겨줌
        List<BoardDto> boardList = adminService.findBoardList(title, name, content, pageable);
        if(title.equals(content) && !title.equals("")){

        }
        return boardList;
    }

    @RequestMapping(value = "/getQuestionsCount", method = RequestMethod.GET)
    public int getQuestionsCount(@RequestParam String title, @RequestParam String name, @RequestParam String content) throws Exception{
        return adminService.getQuestionsCount(title, name, content);
    }

    @RequestMapping(value = "/getMembers", method = RequestMethod.GET)
    public Object getMemberList(@RequestParam String authority, @RequestParam String content, Pageable pageable) throws Exception {
        // 서비스에 pageable을 넘겨줌
        List<MemberDto> memberList = adminService.getMemberList(authority, content, pageable);
        return memberList;
    }

    @RequestMapping(value = "/getMemberCount", method = RequestMethod.GET)
    public int getMembersCount(@RequestParam String authority, @RequestParam String content) throws Exception{
        return adminService.getMemberCount(authority, content);
    }
}