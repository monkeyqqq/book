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

  @Insert("INSERT INTO comments (comment_content,book_id,comment_author_id,comment_author_name,comment_author_photo)" +
          " VALUES(#{comment_content},#{book_id},#{comment_author_id},#{comment_author_name},#{comment_author_photo})")
  void Create_book_comments(
          @Param("comment_content") String comment_content,
          @Param("book_id") String book_id,
          @Param("comment_author_id") String comment_author_id,
          @Param("comment_author_name") String comment_author_name,
          @Param("comment_author_photo") String comment_author_photo

  );


  @Insert("INSERT INTO comments (comment_content,video_id,comment_author_id,comment_author_name,comment_author_photo)" +
          " VALUES(#{comment_content},#{video_id},#{comment_author_id},#{comment_author_name},#{comment_author_photo})")
  void Create_video_comments(
          @Param("comment_content") String comment_content,
          @Param("video_id") String video_id,
          @Param("comment_author_id") String comment_author_id,
          @Param("comment_author_name") String comment_author_name,
          @Param("comment_author_photo") String comment_author_photo

  );
}
