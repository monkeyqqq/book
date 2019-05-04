package com.english.controller;


import com.english.entity.BookEntity;
import com.english.mapper.BookMapper;
import com.english.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class BookController {
    @Autowired
    private BookMapper BookMapper;

    @Autowired
    private BookService BookService;


    @RequestMapping("/getByNum")
    public BookEntity getByNum(@RequestParam(value = "num", required = true) String num){

        return BookMapper.getByNum(num);

    }

    @RequestMapping("/getByPrice")
    public List<BookEntity> getByPrice(@RequestParam(value = "price",required = true) String price){
        return BookMapper.getByPrice("%"+price+"%");
    }

    @RequestMapping("/getByBook_name")
    public List<BookEntity> getByBook_name(@RequestParam(value = "book_name",required = true) String  book_name){
        return BookMapper.getByBook_name("%"+book_name+"%");

    }

}
