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

    @RequestMapping("/getByvid")
    public VideoEntity getByvid(@RequestParam(value = "video_id", required = true) String video_id){

        return VideoMapper.getByvid(video_id);

    }


    @RequestMapping("/get_video_numby_keyword")
    public int get_video_numby_keyword( @RequestParam(value = "key_word",required = true) String key_word){
        return VideoMapper.get_video_numby_keyword("%"+key_word+"%");
    }

    @RequestMapping("/getvideo_ByKey_word")
    public List<VideoEntity> getvideo_ByKey_word(
            @RequestParam(value = "key_word",required = true) String key_word,
            @RequestParam(value = "start",required = true) int start
    ){
        return VideoMapper.getvideo_ByKey_word("%"+key_word+"%",start);
    }
}
