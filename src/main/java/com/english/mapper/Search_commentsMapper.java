package com.english.mapper;

import com.english.entity.CommentsEntity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Search_commentsMapper {
    @Select("SELECT * FROM comments WHERE article_id = #{article_id}")
    @Results({
            @Result(property = "comment_id", column = "comment_id"),
            @Result(property = "comment_content",column = "comment_content"),
            @Result(property = "article_id", column = "article_id"),
            @Result(property = "comment_author_id", column = "comment_author_id"),
            @Result(property = "comment_created", column = "comment_created")

    })
    List<CommentsEntity> getByComments_article_id(int article_id);
}
