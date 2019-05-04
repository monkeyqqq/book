package com.english.controller;

import com.english.entity.Comments_replyEntity;
import com.english.mapper.Search_comments_replyMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class Search_comments_replyController {
    @Autowired
    private Search_comments_replyMapper Search_comments_replyMapper;
    @RequestMapping("/getreplyByComments_id")
    public List<Comments_replyEntity> getreplyByComments_id(@RequestParam(value = "comments_id",required = true) int comments_id){
        return Search_comments_replyMapper.getreplyByComments_id(comments_id);
    }

}
