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


    @RequestMapping("/get_num_Bybookname")
    public int get_num_Bybookname(
            @RequestParam(value = "book_name",required = true) String  book_name
    ){

        return BookMapper.get_num_Bybookname("%"+book_name+"%");
    }


    @RequestMapping("/getByBook_name")
    public List<BookEntity> getByBook_name(@RequestParam(value = "book_name",required = true) String  book_name,
                                           @RequestParam(value = "start",required = true) int  start){
        return BookMapper.getByBook_name("%"+book_name+"%",start);

    }

}
