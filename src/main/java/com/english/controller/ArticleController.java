package com.english.controller;

import com.english.entity.ArticleEntity;
import com.english.mapper.ArticleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ArticleController {
    @Autowired
    private ArticleMapper ArticleMapper;

    @RequestMapping("/Insert")
    public void Insert(
            @RequestParam(value = "article_title", required = true) String article_title,
            @RequestParam(value = "article_summary", required = true) String article_summary,
            @RequestParam(value = "article_content", required = true) String article_content,
            @RequestParam(value = "author_id", required = true) String author_id,
            @RequestParam(value = "article_from",required = true)String article_from
    ){
        //System.out.println(article_content.length());
        ArticleMapper.Insert(article_title,article_summary,article_content,author_id,article_from);
    }

    @RequestMapping("/Update_article_new_comment_info")
    public void Update_article_new_comment_info(
            @RequestParam(value = "article_new_comment",required = true)String article_new_comment,
            @RequestParam(value = "article_id",required = true)String article_id
    ){
        ArticleMapper.Update_article_new_comment_info(article_new_comment,article_id);
    }

    @RequestMapping("/delete_article")
    public void delete_article(
            @RequestParam(value = "article_id",required = true)String article_id
    ){
        ArticleMapper.delete_article(article_id);
    }

}
