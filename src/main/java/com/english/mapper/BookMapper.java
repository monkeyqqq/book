package com.english.mapper;

import com.english.entity.BookEntity;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BookMapper {
    @Select("SELECT * FROM Book WHERE num = #{num};")
    @Results({
            @Result(property = "num", column = "num"),
            @Result(property = "book_name",column = "book_name"),
            @Result(property = "price", column = "price"),
            @Result(property = "book_photo",column = "book_photo"),
            @Result(property = "book_category",column = "book_category"),
            @Result(property = "book_introduction",column = "book_introduction")
    })
    BookEntity getByNum(String num);



    @Select("SELECT * FROM Book WHERE price like '%#{price}%';")
    @Results({
            @Result(property = "num", column = "num"),
            @Result(property = "book_name",column = "book_name"),
            @Result(property = "price", column = "price"),
            @Result(property = "book_photo",column = "book_photo"),
            @Result(property = "book_category",column = "book_category"),
            @Result(property = "book_introduction",column = "book_introduction")
    })
    List<BookEntity> getByPrice(String price);



    @Select("SELECT count(*) FROM Book WHERE book_name like #{book_name} OR book_category like #{book_name};")
    int get_num_Bybookname(String book_name);



    @Select("SELECT * FROM Book WHERE book_name like #{book_name} OR book_category like #{book_name} limit #{start},6;")
    @Results({
            @Result(property = "num", column = "num"),
            @Result(property = "book_name",column = "book_name"),
            @Result(property = "price", column = "price"),
            @Result(property = "book_photo",column = "book_photo"),
            @Result(property = "book_category",column = "book_category"),
            @Result(property = "book_introduction",column = "book_introduction")
    })
    List<BookEntity> getByBook_name(@Param("book_name") String book_name, @Param("start") int start);

}
