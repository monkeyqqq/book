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
    public List<CommentsEntity> getByComments_article_id(
            @RequestParam(value = "article_id",required = true) int article_id
    ){
       return  Search_commentsMapper.getByComments_article_id(article_id);
    }



    @RequestMapping("/getByComments_author_id")
    public List<CommentsEntity> getByComments_author_id(
            @RequestParam(value = "comment_author_id",required = true) int comment_author_id
    ){
        return  Search_commentsMapper.getByComments_author_id(comment_author_id);
    }


    @RequestMapping("/getBybook_Comments_article_id")
    public List<CommentsEntity> getBybook_Comments_article_id(
            @RequestParam(value = "book_id",required = true) int book_id
    ){
        return  Search_commentsMapper.getBybook_Comments_article_id(book_id);
    }

    @RequestMapping("/getByvideo_Comments_article_id")
    public List<CommentsEntity> getByvideo_Comments_article_id(
            @RequestParam(value = "video_id",required = true) int video_id
    ){
        return  Search_commentsMapper.getByvideo_Comments_article_id(video_id);
    }
}
