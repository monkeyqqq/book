package com.english.controller;

import com.english.entity.ArticleEntity;
import com.english.mapper.Search_articleMapper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class Search_articleController {
    @Autowired
    private Search_articleMapper Search_articleMapper;
    @RequestMapping("/getByarticle_key_word")
    public List<ArticleEntity> getByarticle_key_word(
            @RequestParam(value="article_keyword",required = true) String article_keyword,
            @RequestParam(value="article_from",required = true) String article_from
            ){

        return Search_articleMapper.getByarticle_key_word("%"+article_keyword+"%",article_from);
    }


    @RequestMapping("/getByarticle_id")
    public ArticleEntity getByarticle_id(@RequestParam(value = "article_id",required = true) int article_id){
        return Search_articleMapper.getByarticle_id(article_id);
    }


    @RequestMapping("/get_a_Byahtuor_id")
    public List<ArticleEntity> get_a_Byahtuor_id(
            @RequestParam(value = "author_id",required = true) int author_id
    ){
        return Search_articleMapper.get_a_Byahtuor_id(author_id);
    }



    @RequestMapping("/get_a_Byarticle_from")
    public int get_a_Byarticle_from(
            @RequestParam(value = "article_from",required = true) String  article_from
    ){
        return Search_articleMapper.get_a_Byarticle_from(article_from);
    }



    @RequestMapping("/get_article_Byarticle_from")
    public List<ArticleEntity> get_article_Byarticle_from(
            @RequestParam(value = "article_from",required = true) String  article_from,
            @RequestParam(value = "start",required = true) int start,
            @RequestParam(value = "number",required = true) int number
    ){
        return Search_articleMapper.get_article_Byarticle_from(article_from,start,number);
    }
}
