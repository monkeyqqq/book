package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class Book_dealEntity {
    private int id;
    private int user_id;
    private String deal_info;
    private String customer_phone;
    private String customer_name;
    private String customer_adress;
    private String deal_created;
    private String deal_finish;
}
