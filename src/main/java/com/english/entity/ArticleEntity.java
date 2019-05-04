package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class ArticleEntity {
    private int article_id;
    private String article_title;
    private String article_summary;
    private String article_content;
    private String article_created;
    private String author_id;
    private String article_new_comment;
}
