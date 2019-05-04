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
            @RequestParam(value = "comment_author_id", required = true) String comment_author_id,
            @RequestParam(value = "comment_read", required = true) String comment_read
    ){
        Create_commentMapper.Create_comments(comment_content,article_id,comment_author_id,comment_read);
    }
}
