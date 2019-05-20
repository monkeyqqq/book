package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class LogEntity {
    private int id;
    private int user_id;
    private String action;
    private String time;
    private String months;
    private int count;
}
