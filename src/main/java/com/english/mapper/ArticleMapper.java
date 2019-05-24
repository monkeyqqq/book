package com.english.mapper;

import com.english.entity.ArticleEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
public interface ArticleMapper {

  @Insert("INSERT INTO article (article_title,article_summary,article_content,author_id,article_from) VALUES(#{article_title},#{article_summary},#{article_content},#{author_id},#{article_from})")
   void Insert(@Param("article_title") String article_title,
                @Param("article_summary") String article_summary,

                @Param("article_content") String article_content,
                @Param("author_id") String author_id,
                @Param("article_from") String article_from
    );

    @Update("UPDATE article SET article_new_comment=#{article_new_comment} WHERE article_id=#{article_id}")
    void Update_article_new_comment_info(
            @Param("article_new_comment") String article_new_comment,
            @Param("article_id") String article_id
    );

    @Delete("DELETE from article where article_id=#{article_id}")
    void delete_article(@Param("article_id") String article_id);
}
