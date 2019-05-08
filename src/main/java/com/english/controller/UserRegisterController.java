package com.english.controller;


import com.english.mapper.MDencode;
import com.english.mapper.UserRegisterMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class UserRegisterController {
    @Autowired
    private UserRegisterMapper UserRegisterMapper;
    @RequestMapping("/UserRegister")
    public void UserRegister(
            @RequestParam(value = "user_name", required = true) String user_name,
            @RequestParam(value = "user_password", required = true) String user_password,
            @RequestParam(value = "user_email", required = true) String user_email,
            @RequestParam(value = "user_photo", required = true) String user_photo
    ){
        String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
        System.out.println(Mdr_user_password);
        UserRegisterMapper.UserRegister(user_name,Mdr_user_password,user_email,user_photo);

    }


    @RequestMapping("/UserUpdate")
    public void UserUpdate(
            @RequestParam(value = "user_name", required = true) String user_name,
            @RequestParam(value = "user_password", required = true) String user_password,
            @RequestParam(value = "user_photo", required = true) String user_photo,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
        String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
        System.out.println(Mdr_user_password);
        UserRegisterMapper.UserUpdate(user_name,Mdr_user_password,user_photo,user_id);
    }

    @RequestMapping("/Update_photo")
    public void Update_photo(
            @RequestParam(value = "user_photo", required = true) String user_photo,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
//        String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
//        System.out.println(Mdr_user_password);
        UserRegisterMapper.Update_photo(user_photo,user_id);
    }


    @RequestMapping("/Update_name")
    public void Update_name(
            @RequestParam(value = "user_name", required = true) String user_name,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
//        String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
//        System.out.println(Mdr_user_password);
        UserRegisterMapper.Update_name(user_name,user_id);
    }

    @RequestMapping("/Update_password")
    public void Update_password(
            @RequestParam(value = "user_password", required = true) String user_password,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
        String Mdr_user_password=MDencode.MD5Encode(user_password,"utf8");
        System.out.println(Mdr_user_password);
        UserRegisterMapper.Update_password(Mdr_user_password,user_id);
    }


    @RequestMapping("/Update_links")
    public void Update_links(
            @RequestParam(value = "user_links", required = true) String user_links,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
        UserRegisterMapper.Update_links(user_links,user_id);
    }


    @RequestMapping("/Update_book")
    public void Update_book(
            @RequestParam(value = "user_book", required = true) String user_book,
            @RequestParam(value = "user_id", required = true) String user_id
    ){
        UserRegisterMapper.Update_book(user_book,user_id);
    }
}
