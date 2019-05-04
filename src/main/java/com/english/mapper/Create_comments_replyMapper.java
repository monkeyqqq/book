package com.english.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface Create_comments_replyMapper {
    @Insert("INSERT INTO comments_reply (comments_reply_content,comments_reply_author_id,comments_author_id,article_id,comments_id)" +
            "VALUES(#{comments_reply_content},#{comments_reply_author_id},#{comments_author_id},#{article_id},#{comments_id})")
     void Create_comments_reply(
            @Param("comments_reply_content") String comments_reply_content,
            @Param("comments_reply_author_id") String comments_reply_author_id,
            @Param("comments_author_id") String comments_author_id,
            @Param("article_id") String article_id,
            @Param("comments_id") String comments_id
     );
}
