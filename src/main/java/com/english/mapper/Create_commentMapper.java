package com.english.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

@Component
public interface Create_commentMapper {
  @Insert("INSERT INTO comments (comment_content,article_id,comment_author_id)" +
          " VALUES(#{comment_content},#{article_id},#{comment_author_id})")
    void Create_comments(
          @Param("comment_content") String comment_content,
          @Param("article_id") String article_id,
          @Param("comment_author_id") String comment_author_id

  );

  @Update("UPDATE comments SET comment_read=#{comment_read} WHERE comment_id=#{comment_id} ")
  void Update_comment_byId(
          @Param("comment_read") String comment_read,
          @Param("comment_id") String comment_id
  );
}
