package com.english.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class VideoEntity {
    private int video_id;
    private String MV_id;
    private String key_word;
    private String mv_iframe;
    private String video_photo;
    private String video_time;
}
