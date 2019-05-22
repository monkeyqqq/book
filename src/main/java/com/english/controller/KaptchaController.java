package com.english.controller;
import com.google.code.kaptcha.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.Logger;
@Slf4j
@RestController
public class KaptchaController {
    private static  final transient Logger log = Logger.getLogger(String.valueOf(KaptchaController.class));


    @RequestMapping("/register")
    public String loginCheck(
                             @RequestParam(value = "sms_vcode", required = true) String kaptchaReceived){
        //用户输入的验证码的值
        System.out.println("66666666666666666666"+kaptchaReceived);
//        String kaptchaExpected = (String) request.getSession().getAttribute(
//                Constants.KAPTCHA_SESSION_KEY);
        String kaptchaExpected =verifyAllarea.verifycode;
                System.out.println("55555555555555"+kaptchaExpected);
        //校验验证码是否正确
        if (kaptchaReceived == null || !kaptchaReceived.equals(kaptchaExpected)) {
            log.info("验证码错了");
            return "kaptcha_error";//返回验证码错误
        }

        //校验用户名密码
        // ……
        // ……
        log.info("验证码对了");
        return "success"; //校验通过返回成功
    }


}
