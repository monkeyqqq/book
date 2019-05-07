package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class BookEntity {
    private int num;
    private String book_name;
    private int price;
    private String book_photo;
    private String book_category;
    private String book_introduction;
}
