package com.english.controller;
import com.english.mapper.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Map;








@Slf4j
@RestController



public class File_uploadController {

    @Autowired
    private final ResourceLoader resourceLoader;

    @Autowired
    public File_uploadController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Value("C:\\Users\\者\\Desktop\\book\\src\\main\\webapp\\image")
    private String path;

    /**
     * 跳转到文件上传页面
     * @return
     */
//    @RequestMapping("test")
//    public String toUpload(){
//        return "test";
//    }

    /**
     *
     * @param file 要上传的文件
     * @return
     */



    @RequestMapping("/fileUpload")
    public String upload(@RequestParam(value = "file",required = true) MultipartFile file){
        System.out.println("1111111111111111111111111");
        String name = file.getOriginalFilename();
        // 要上传的目标文件存放路径
        String localPath = "C:\\Users\\者\\Desktop\\book\\src\\main\\webapp\\image";
        // 上传成功或者失败的提示
        String msg = "";
        String Filename=FileUtils.upload(file, localPath, file.getOriginalFilename());
    if (Filename!=null){
            // 上传成功，给出页面提示
            msg = "上传成功！";
        }else {
            msg = "上传失败！";

        }


        System.out.println("222222222222222222222222");

        return Filename;
    }


    @RequestMapping("/fileUpload_lay")
    public String upload_lay(@RequestParam(value = "file",required = true) MultipartFile file) throws JSONException {
        System.out.println("1111111111111111111111111");
        String name = file.getOriginalFilename();
        // 要上传的目标文件存放路径
        String localPath = "C:\\Users\\者\\Desktop\\book\\src\\main\\webapp\\image";
        // 上传成功或者失败的提示
        //String msg = "";
        String Filename=FileUtils.upload(file, localPath, file.getOriginalFilename());
        if (Filename!=null){
            // 上传成功，给出页面提示
            //msg = "上传成功！";

        }else {
            //msg = "上传失败！";

        }

        System.out.println("1234567890"+Filename);
        JSONObject object_1 = new JSONObject();
        object_1.put("src","..\\image\\" +Filename);
        object_1.put("title","Filename");
        JSONObject object = new JSONObject();
        object.put("code","0");
        object.put("msg","success");
        object.put("data",object_1);
        System.out.println("222222222222222222222222");
        System.out.println(object.toString());
        return object.toString();
    }



    /**
     * 显示单张图片
     * @return
     */
    @RequestMapping("show")
    public ResponseEntity showPhotos(String fileName){

        try {
            // 由于是读取本机的文件，file是一定要加上的， path是在application配置文件中的路径
            return ResponseEntity.ok(resourceLoader.getResource("file:" + path + fileName));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
