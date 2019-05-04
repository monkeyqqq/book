package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class Comments_replyEntity {
    private int comments_reply_id;
    private String comments_reply_content;
    private int comments_reply_author_id;
    private int comments_author_id;
    private int article_id;
    private int comments_id;


}
