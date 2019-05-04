package com.english.controller;

import com.english.entity.CommentsEntity;
import com.english.mapper.Search_commentsMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class Search_commentsController {
    @Autowired
    private Search_commentsMapper Search_commentsMapper;


    @RequestMapping("/getByComments_article_id")
    public List<CommentsEntity> getByComments_article_id(@RequestParam(value = "article_id",required = true) int article_id){
       return  Search_commentsMapper.getByComments_article_id(article_id);
    }
}
