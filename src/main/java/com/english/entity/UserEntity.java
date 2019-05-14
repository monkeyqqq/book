package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class UserEntity {
    private int user_id;
    private String user_email;
    private String user_name;
    private String user_links;
    private String user_password;
    private String user_photo;
    private String user_created;
    private String user_role;
    private String user_articlecount;
    private String user_book;
    private String psychology_link;
}
