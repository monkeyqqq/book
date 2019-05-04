package com.english.controller;

import com.english.entity.UserEntity;

import com.english.mapper.MDencode;
import com.english.mapper.UserLogMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class UserLogController {
    @Autowired
    private UserLogMapper UserLogMapper;
    @RequestMapping("/getByuser_name")
    public UserEntity getByuser_name(
            @RequestParam(value="user_name",required = true) String user_name,
            @RequestParam(value="user_password",required = true) String user_password
    ){
            String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
            System.out.println(Mdr_user_password);
            return UserLogMapper.getByuser_name(user_name,Mdr_user_password);
    }


    @RequestMapping("/checkByuser_name")
    public UserEntity checkByuser_name( @RequestParam(value="user_name",required = true) String user_name){
        return UserLogMapper.checkByuser_name(user_name);
    }

    @RequestMapping("/getByuser_id")
    public UserEntity getByuser_id( @RequestParam(value="user_id",required = true) int user_id){
        return UserLogMapper.getByuser_id(user_id);
    }


}
