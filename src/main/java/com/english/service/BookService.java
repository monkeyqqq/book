package com.english.service;

import com.english.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookService {
    @Autowired
    private BookMapper BookMapper;
}
