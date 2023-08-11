package com.bitc.finalproject.controller;

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

    @RequestMapping(value = "/getQuestions", method = RequestMethod.GET)
    public Object getQuestionList(Pageable pageable) throws Exception {
        System.out.println(pageable);
        List<BoardEntity> boardEntityList = adminService.getQuestionList(pageable);
        return boardEntityList;
    }

    @RequestMapping(value = "/getQuestionNumber", method = RequestMethod.GET)
    public int getQuestionNumber() throws Exception{
        return adminService.getQuestionNum();
    }
}
