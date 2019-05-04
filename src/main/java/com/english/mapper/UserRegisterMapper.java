package com.english.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

@Component
public interface UserRegisterMapper {
    @Insert("INSERT INTO user (user_name,user_password,user_email,user_photo) VALUES(#{user_name},#{user_password},#{user_email},#{user_photo})")
    void UserRegister(@Param("user_name") String user_name,
                      @Param("user_password") String user_password,
                      @Param("user_email") String user_email,
                      @Param("user_photo") String user_photo
    );

    @Update("UPDATE user SET user_name=#{user_name} ,user_password=#{user_password},user_photo=#{user_photo} WHERE user_id=#{user_id}")
    void UserUpdate(
            @Param("user_name") String user_name,
            @Param("user_password") String user_password,
            @Param("user_photo") String user_photo,
            @Param("user_id") String user_id
    );

    @Update("UPDATE user SET user_photo=#{user_photo} WHERE user_id=#{user_id}")
    void Update_photo(

            @Param("user_photo") String user_photo,
            @Param("user_id") String user_id

    );

    @Update("UPDATE user SET user_name=#{user_name} WHERE user_id=#{user_id}")
    void Update_name(

            @Param("user_name") String user_name,
            @Param("user_id") String user_id

    );


    @Update("UPDATE user SET user_password=#{user_password} WHERE user_id=#{user_id}")
    void Update_password(

            @Param("user_password") String user_password,
            @Param("user_id") String user_id

    );


    @Update("UPDATE user SET user_links=#{user_links} WHERE user_id=#{user_id}")
    void Update_links(

            @Param("user_links") String user_links,
            @Param("user_id") String user_id

    );

}
