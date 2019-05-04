package com.english.controller;

import com.english.entity.School_discussEntity;
import com.english.mapper.SchoolMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SchoolController {
    @Autowired
    private SchoolMapper SchoolMapper;
    @RequestMapping("/getByschool_name")
    public School_discussEntity getByschool_name(@RequestParam(value="school_name",required = true) String school_name){
        return SchoolMapper.getByschool_name(school_name);
    }

    @RequestMapping("/Create_disscussByname")
    public void Create_disscussByname(@RequestParam(value = "school_name",required = true) String school_name){
        SchoolMapper.Create_disscussByname(school_name);
    }
}
