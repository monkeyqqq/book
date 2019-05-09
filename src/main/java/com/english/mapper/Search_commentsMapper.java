package com.english.mapper;

import com.english.entity.CommentsEntity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Search_commentsMapper {
    @Select("SELECT * FROM comments WHERE article_id = #{article_id} ORDER BY comment_created DESC ")
    @Results({
            @Result(property = "comment_id", column = "comment_id"),
            @Result(property = "comment_content",column = "comment_content"),
            @Result(property = "article_id", column = "article_id"),
            @Result(property = "comment_author_id", column = "comment_author_id"),
            @Result(property = "comment_created", column = "comment_created")

    })
    List<CommentsEntity> getByComments_article_id(int article_id);



    @Select("SELECT *from comments WHERE comment_author_id = #{comment_author_id} ORDER BY comment_created DESC ")
    @Results({
            @Result(property = "comment_id", column = "comment_id"),
            @Result(property = "comment_content",column = "comment_content"),
            @Result(property = "article_id", column = "article_id"),
            @Result(property = "comment_author_id", column = "comment_author_id"),
            @Result(property = "comment_created", column = "comment_created"),
            @Result(property = "comment_read", column = "comment_read")
    })
    List<CommentsEntity> getByComments_author_id(int comment_author_id);


    @Select("SELECT * FROM comments WHERE book_id = #{book_id} ORDER BY comment_created DESC ")
    @Results({
            @Result(property = "comment_id", column = "comment_id"),
            @Result(property = "comment_content",column = "comment_content"),
            @Result(property = "book_id", column = "book_id"),
            @Result(property = "comment_author_id", column = "comment_author_id"),
            @Result(property = "comment_created", column = "comment_created"),
            @Result(property = "comment_author_name",column = "comment_author_name"),
            @Result(property = "comment_author_photo",column = "comment_author_photo")

    })
    List<CommentsEntity> getBybook_Comments_article_id(int book_id);

    @Select("SELECT * FROM comments WHERE video_id = #{video_id} ORDER BY comment_created DESC ")
    @Results({
            @Result(property = "comment_id", column = "comment_id"),
            @Result(property = "comment_content",column = "comment_content"),
            @Result(property = "video_id", column = "video_id"),
            @Result(property = "comment_author_id", column = "comment_author_id"),
            @Result(property = "comment_created", column = "comment_created"),
            @Result(property = "comment_author_name",column = "comment_author_name"),
            @Result(property = "comment_author_photo",column = "comment_author_photo")

    })
    List<CommentsEntity> getByvideo_Comments_article_id(int video_id);
}
