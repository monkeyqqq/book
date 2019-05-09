package com.english.mapper;


import com.english.entity.VideoEntity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface VideoMapper {
    @Select("SELECT * FROM video WHERE video_id = #{video_id};")
    @Results({
            @Result(property = "video_id", column = "video_id"),
            @Result(property = "MV_id",column = "MV_id"),
            @Result(property = "key_word", column = "key_word"),
            @Result(property = "mv_iframe",column = "mv_iframe"),
            @Result(property = "video_photo",column = "video_photo"),
            @Result(property = "video_time",column = "video_time")
    })
    VideoEntity getByvid(String video_id);

    @Select("SELECT * FROM video WHERE key_word like #{key_word};")
    @Results({
            @Result(property = "video_id", column = "video_id"),
            @Result(property = "MV_id",column = "MV_id"),
            @Result(property = "key_word", column = "key_word"),
            @Result(property = "mv_iframe",column = "mv_iframe"),
            @Result(property = "video_photo",column = "video_photo"),
            @Result(property = "video_time",column = "video_time")
    })
    List<VideoEntity> getvideo_ByKey_word(String key_word);
}
