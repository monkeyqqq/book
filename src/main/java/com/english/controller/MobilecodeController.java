package com.english.controller;


import com.alibaba.fastjson.JSONObject;
import com.google.code.kaptcha.Constants;
import com.english.controller.verifyAllarea;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import com.zhenzi.sms.ZhenziSmsClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Random;
@Slf4j
@RestController
public class MobilecodeController {
    @RequestMapping("/sendSms")
    public String sendSms(
            @RequestParam(value = "mobile", required = true) String mobile

    ) {
        try {
            JSONObject json = null;
            //生成6位验证码
            String verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);
            //发送短信
            ZhenziSmsClient client = new ZhenziSmsClient("https://sms_developer.zhenzikj.com", "101612", "\n" +
                    "0de32b2f-8923-41a5-afed-5b2eb0db59cd");
            String result = client.send(mobile, "您的验证码为:" + verifyCode + "，该码有效期为5分钟，该码只能使用一次！");

            json = JSONObject.parseObject(result);
            if (json.getIntValue("code") != 0) {//发送短信失败
                return "fail";
            }

            verifyAllarea.get_area_number(verifyCode);
            System.out.println("验证码："+verifyCode);

            return "success";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
