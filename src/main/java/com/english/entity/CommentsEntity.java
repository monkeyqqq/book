package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class CommentsEntity {
    private int comment_id;
    private int article_id;
    private String comment_content;
    private String comment_created;
    private String comment_author_id;
    private String comment_read;
    private String comment_author_name;
    private String comment_author_photo;
    private int book_id;
}
