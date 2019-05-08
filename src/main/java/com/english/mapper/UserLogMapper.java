package com.english.mapper;

import com.english.entity.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

@Component
public interface UserLogMapper {
    @Select("SELECT * FROM user WHERE user_name = #{user_name} AND user_password = #{user_password};")
    @Results({
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "user_email",column = "user_email"),
            @Result(property = "user_name", column = "user_name"),
            @Result(property = "user_links", column = "user_links"),
            @Result(property = "user_password", column = "user_password"),
            @Result(property = "user_photo", column = "user_photo"),
            @Result(property = "user_created",column = "user_created"),
            @Result(property = "user_role", column = "user_role"),
            @Result(property = "user_articlecount", column = "user_articlecount"),
            @Result(property = "user_book",column = "user_book")

    })
    UserEntity getByuser_name(@Param("user_name") String user_name,@Param("user_password") String user_password);


    @Select("SELECT * from user WHERE user_name = #{user_name}")
    @Results({
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "user_email",column = "user_email"),
            @Result(property = "user_name", column = "user_name"),
            @Result(property = "user_links", column = "user_links"),
            @Result(property = "user_password", column = "user_password"),
            @Result(property = "user_photo", column = "user_photo"),
            @Result(property = "user_created",column = "user_created"),
            @Result(property = "user_role", column = "user_role"),
            @Result(property = "user_articlecount", column = "user_articlecount"),
            @Result(property = "user_book",column = "user_book")
    })
    UserEntity checkByuser_name(@Param("user_name") String user_name);

    @Select("SELECT * from user WHERE user_id = #{user_id}")
    @Results({
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "user_email",column = "user_email"),
            @Result(property = "user_name", column = "user_name"),
            @Result(property = "user_links", column = "user_links"),
            @Result(property = "user_password", column = "user_password"),
            @Result(property = "user_photo", column = "user_photo"),
            @Result(property = "user_created",column = "user_created"),
            @Result(property = "user_role", column = "user_role"),
            @Result(property = "user_articlecount", column = "user_articlecount"),
            @Result(property = "user_book",column = "user_book")
    })
    UserEntity getByuser_id(@Param("user_id") int user_id);
}
