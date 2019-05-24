package com.english.controller;

import com.english.entity.Book_dealEntity;
import com.english.mapper.Book_dealMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class Book_dealController {
    @Autowired
    private Book_dealMapper Book_dealMapper;

    @RequestMapping("/Insert_book_deal")
    void Insert_book_deal(
            @RequestParam(value = "user_id", required = true) int user_id,
            @RequestParam(value = "deal_info", required = true) String deal_info,
            @RequestParam(value = "customer_phone", required = true) String customer_phone,
            @RequestParam(value = "customer_name", required = true) String customer_name,
            @RequestParam(value = "customer_adress",required = true)String customer_adress
    ){


        Book_dealMapper.Insert_book_deal(user_id,deal_info,customer_phone,customer_name,customer_adress);
    }

    @RequestMapping("/get_deal_By_user_id")
    public List<Book_dealEntity> get_deal_By_user_id(
            @RequestParam(value = "user_id", required = true) int user_id
    ){
        return Book_dealMapper.get_deal_By_user_id(user_id);
    }
}
