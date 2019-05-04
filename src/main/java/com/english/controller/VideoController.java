package com.english.controller;

import com.english.entity.VideoEntity;
import com.english.mapper.VideoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class VideoController {
    @Autowired
    private VideoMapper VideoMapper;

    @RequestMapping("/getByAvid")
    public VideoEntity getByAvid(@RequestParam(value = "avid", required = true) String avid){

        return VideoMapper.getByAvid(avid);

    }


    @RequestMapping("/getByKey_word")
    public List<VideoEntity> getByKey_word(@RequestParam(value = "key_word",required = true) String  key_word){
        return VideoMapper.getByKey_word("%"+key_word+"%");
    }
}
