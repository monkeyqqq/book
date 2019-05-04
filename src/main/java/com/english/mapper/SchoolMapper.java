package com.english.mapper;

import com.english.entity.School_discussEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;


@Component
public interface SchoolMapper {
    @Select("SELECT * FROM school WHERE school_name=#{school_name};")
    @Results({
            @Result(property = "school_id", column = "school_id"),
            @Result(property = "school_name", column = "school_name"),
            @Result(property = "school_created", column = "school_created")
    })
    School_discussEntity getByschool_name(String school_name);


    @Insert("INSERT INTO school (school_name) VALUES (#{school_name});")
    void Create_disscussByname(@Param("school_name") String school_name);
}
