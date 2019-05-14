package com.english.mapper;

import com.english.entity.ArticleEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Search_articleMapper {
    @Select("SELECT * from article WHERE article_from = #{article_from}" +
            " And(article_title like #{article_keyword} OR article_summary like #{article_keyword}) ORDER BY article_created DESC ;")
    @Results({
            @Result(property = "article_title", column = "article_title"),
            @Result(property = "article_summary",column = "article_summary"),
            @Result(property = "article_content", column = "article_content"),
            @Result(property = "author_id", column = "author_id")
    })
    List<ArticleEntity> getByarticle_key_word(
           @Param("article_keyword") String article_keyword,
           @Param("article_from") String article_from);

    @Select("SELECT * from article WHERE article_id = #{article_id}")
    @Results({
            @Result(property = "article_title", column = "article_title"),
            @Result(property = "article_summary",column = "article_summary"),
            @Result(property = "article_content", column = "article_content"),
            @Result(property = "author_id", column = "author_id")
    })ArticleEntity getByarticle_id(int article_id);



    @Select("SELECT * from article WHERE author_id = #{author_id}")
    @Results({
            @Result(property = "article_id" ,column="article_id"),
            @Result(property = "article_title", column = "article_title"),
            @Result(property = "article_summary",column = "article_summary"),
            @Result(property = "article_content", column = "article_content"),
            @Result(property = "author_id", column = "author_id"),
            @Result(property = "article_new_comment", column = "article_new_comment")
    })
    List<ArticleEntity> get_a_Byahtuor_id(int author_id);


    @Select("SELECT count(*) from article WHERE article_from = #{article_from}")
    int get_a_Byarticle_from(String article_from);

    @Select("SELECT * from article WHERE article_from = #{article_from} ORDER BY article_created DESC limit #{start},#{number}")
    @Results({
            @Result(property = "article_id" ,column="article_id"),
            @Result(property = "article_title", column = "article_title"),
            @Result(property = "article_summary",column = "article_summary"),
            @Result(property = "article_content", column = "article_content"),
            @Result(property = "author_id", column = "author_id"),
            @Result(property = "article_new_comment", column = "article_new_comment")
    })
    List<ArticleEntity> get_article_Byarticle_from(
            @Param("article_from") String article_from,
            @Param("start") int start,
            @Param("number") int number
          );


}
