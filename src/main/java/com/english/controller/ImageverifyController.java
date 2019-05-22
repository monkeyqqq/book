package com.english.controller;

import com.dingxianginc.ctu.client.CaptchaClient;
import com.dingxianginc.ctu.client.model.CaptchaResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ImageverifyController {
    @RequestMapping("/imageverify")
    public String imageverify(
            @RequestParam(value = "token",required = true) String token
    ) throws Exception {
        String appId = "appId";
        String appSecret = "appSecret";
        CaptchaClient captchaClient = new CaptchaClient(appId,appSecret);
//captchaClient.setCaptchaUrl(captchaUrl);
//特殊情况需要额外指定服务器,可以在这个指定，默认情况下不需要设置
        CaptchaResponse response = captchaClient.verifyToken(token);
//CaptchaResponse response = captchaClient.verifyToken(token, ip);
//针对一些token冒用的情况，业务方可以采集客户端ip随token一起提交到验证码服务，验证码服务除了判断token的合法性还会校验提交业务参数的客户端ip和验证码颁发token的客户端ip是否一致
        System.out.println(response.getCaptchaStatus());
//确保验证状态是SERVER_SUCCESS，SDK中有容错机制，在网络出现异常的情况会返回通过
//System.out.println(response.getIp());
//验证码服务采集到的客户端ip
        System.out.println(response.getResult());
        if (response.getResult()) {
            return "fail";
        } else {
            return "success";
            /**token验证失败，业务系统可以直接阻断该次请求或者继续弹验证码**/
        }
    }
}
