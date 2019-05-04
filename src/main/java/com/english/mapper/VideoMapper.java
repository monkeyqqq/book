package com.english.mapper;


import com.english.entity.VideoEntity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface VideoMapper {
    @Select("SELECT * FROM video WHERE avid = #{avid};")

    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "avid",column = "avid"),
            @Result(property = "key_word", column = "key_word")
    })
    VideoEntity getByAvid(String avid);

    @Select("SELECT * FROM Book WHERE key_word like #{key_word};")

    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "avid",column = "avid"),
            @Result(property = "key_word", column = "key_word")
    })
    List<VideoEntity> getByKey_word(String key_word);
}
