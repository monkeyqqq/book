package com.english.mapper;

import com.english.entity.Book_dealEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface Book_dealMapper {


    @Insert("Insert into book_deal (user_id,deal_info,customer_phone,customer_name,customer_adress) values(#{user_id},#{deal_info},#{customer_phone},#{customer_name},#{customer_adress})")
    void Insert_book_deal(
            @Param("user_id") int user_id,
            @Param("deal_info") String deal_info,
            @Param("customer_phone") String customer_phone,
            @Param("customer_name") String customer_name,
            @Param("customer_adress") String customer_adress
    );


    @Select("SELECT * from book_deal WHERE user_id = #{user_id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "user_id", column = "user_id"),
            @Result(property = "deal_info", column = "deal_info"),
            @Result(property = "customer_phone", column = "customer_phone"),
            @Result(property = "customer_name", column = "customer_name"),
            @Result(property = "customer_adress", column = "customer_adress")

    })
    List<Book_dealEntity> get_deal_By_user_id(@Param("user_id") int user_id);

}
