package com.english.controller;

import com.english.entity.LogEntity;
import com.english.mapper.LogMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class LogController {
    @Autowired
    private LogMapper LogMapper;

    @RequestMapping("/insert_log")
    public void insert_log(
            @RequestParam(value = "user_id", required = true) int user_id,
            @RequestParam(value = "action", required = true) String action
    ){
        LogMapper.insert_log(user_id,action);
    }


    @RequestMapping("/get_count_info_by_action")
    public List<LogEntity> get_count_info_by_action(
            @RequestParam(value = "user_id", required = true) int user_id,
            @RequestParam(value = "action", required = true) String action
    ){

        return LogMapper.get_count_info_by_action(user_id,"%"+action+"%");
    }

    @RequestMapping("/admin_get_count_info_by_action")
    public List<LogEntity> admin_get_count_info_by_action(
            @RequestParam(value = "action", required = true) String action
    ){
        System.out.println("11111111111111111111111");
        System.out.println(LogMapper.admin_get_count_info_by_action("%"+action+"%").toString());
        return LogMapper.admin_get_count_info_by_action("%"+action+"%");
    }


    @RequestMapping("/get_user_book_deal")
    public List<LogEntity> get_user_book_deal(
            @RequestParam(value = "user_id", required = true) int user_id,
            @RequestParam(value = "action", required = true) String action
    ){
        return LogMapper.get_user_book_deal(user_id,"%"+action+"%");
    }

    @RequestMapping("/delete_book_deal_info")
    public void delete_book_deal_info(
    @RequestParam(value = "id",required = true) int id
            ){
    LogMapper.delete_book_deal_info(id);
    }
}
