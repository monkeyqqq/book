package com.english.controller;

import com.english.mapper.Create_comments_replyMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class Create_comments_replyController {
    @Autowired
    private Create_comments_replyMapper Create_comments_replyMapper;
    @RequestMapping("/Create_comments_reply")
    public void Create_comments_reply(
            @RequestParam(value = "comments_reply_content", required = true) String comments_reply_content,
            @RequestParam(value = "comments_reply_author_id", required = true) String comments_reply_author_id,
            @RequestParam(value = "comments_author_id", required = true) String comments_author_id,
            @RequestParam(value = "article_id", required = true) String article_id,
            @RequestParam(value = "comments_id", required = true) String comments_id

    ){
        Create_comments_replyMapper.Create_comments_reply(comments_reply_content,comments_reply_author_id,comments_author_id,article_id,comments_id);
    }
}
