package com.english.controller;

import com.english.mapper.Create_commentMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class Create_commentController {
    @Autowired
    private Create_commentMapper Create_commentMapper;
    @RequestMapping("/Create_comments")
    public void Create_comments(
            @RequestParam(value = "comment_content", required = true) String comment_content,
            @RequestParam(value = "article_id", required = true) String article_id,
            @RequestParam(value = "comment_author_id", required = true) String comment_author_id
    ){
        Create_commentMapper.Create_comments(comment_content,article_id,comment_author_id);
    }


    @RequestMapping("/Update_comment_byId")
    public void Update_comment_byId(
            @RequestParam(value = "comment_read", required = true) String comment_read,
            @RequestParam(value = "comment_id", required = true) String comment_id
    ){
        Create_commentMapper.Update_comment_byId(comment_read,comment_id);
    }


    @RequestMapping("/Create_book_comments")
    public void Create_book_comments(
            @RequestParam(value = "comment_content", required = true) String comment_content,
            @RequestParam(value = "book_id", required = true) String book_id,
            @RequestParam(value = "comment_author_id", required = true) String comment_author_id,
            @RequestParam(value = "comment_author_name",required = true) String comment_author_name,
            @RequestParam(value = "comment_author_photo",required = true) String comment_author_photo
    ){
        Create_commentMapper.Create_book_comments(comment_content,book_id,comment_author_id,comment_author_name,comment_author_photo);
    }

}
