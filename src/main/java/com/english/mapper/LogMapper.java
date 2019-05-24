package com.english.mapper;

import com.english.entity.LogEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface LogMapper {
    @Insert("INSERT into log (user_id,action)  VALUES (#{user_id},#{action})")
    void insert_log(@Param("user_id") int user_id,
                    @Param("action") String action
    );

    @Select(" SELECT DATE_FORMAT(time,'%m') months,COUNT(id) count FROM log where user_id = #{user_id} and action like #{action}  GROUP BY months ")
    @Results({
            @Result(property = "months" ,column="months"),
            @Result(property = "count", column = "count")
    })
    List<LogEntity> get_count_info_by_action(@Param("user_id") int user_id,
                                             @Param("action") String action
    );


    @Select("SELECT DATE_FORMAT(time,'%m') months,COUNT(id) count FROM log where action like #{action}  GROUP BY months ")
    @Results({
            @Result(property = "months" ,column="months"),
            @Result(property = "count", column = "count")
    })
    List<LogEntity> admin_get_count_info_by_action(
           String action
    );

    @Select("SELECT * from log WHERE user_id = #{user_id} and action like #{action} order by time desc")
    @Results({
            @Result(property = "action",column = "action"),
            @Result(property = "user_id",column = "user_id"),
            @Result(property = "id",column = "id"),
            @Result(property = "time",column = "time")
    })
    List<LogEntity> get_user_book_deal(@Param("user_id") int user_id,
                                       @Param("action") String action);

    @Delete("DELETE FROM log WHERE id=#{id}")
    void delete_book_deal_info(@Param("id") int id);
}
