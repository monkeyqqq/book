package com.english.mapper;

import com.english.entity.Comments_replyEntity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Search_comments_replyMapper {
    @Select("SELECT * from comments_reply WHERE comments_id = #{comments_id};")
    @Results({
            @Result(property = "comments_reply_content", column = "comments_reply_content"),
            @Result(property = "comments_reply_author_id",column = "comments_reply_author_id"),
            @Result(property = "comments_author_id", column = "comments_author_id")
    })
    List<Comments_replyEntity> getreplyByComments_id(int comments_id);

}
