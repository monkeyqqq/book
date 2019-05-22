//用户注册
$("#fileName").bind('input propertychange',function(){
    User_register();  });
function User_register(){

    var R_user_name = $('#R_user_name').val();
    var R_user_password = $('#R_user_password').val();
    var R_user_email = $('#R_user_email').val();
    var imginfo = document.getElementById("showimg");
    var file = $('#fileName').get(0).files[0];
    var form = new FormData();
    form.append('file',file);
    //var index=0;

    // if(index == 1 ){
    $.ajax({
        type:"post",
        url:"http://localhost:8090/fileUpload",
        data:form,
        contentType:false,
        mimeType:"multipart/form-data",
        processData:false,
        success:function (res) {
            //console.log(res);


            var photo_href= "<img src=\"/image/"+res+ "\" style=\"width:50px; height:50px; border-radius:50%; \"/>"

            imginfo.innerHTML= photo_href;

            if(R_user_name!==''&&R_user_password!==''&&R_user_email!==''){


            console.log("1111111"+verify_code_check_return+"22222");
            if(verify_code_check_return === 'success'){
            $.get("http://localhost:8090/UserRegister?user_name="+R_user_name+"&user_password=" + R_user_password + "&user_email=" + R_user_email + "&user_photo=" + res,function (data) {
                console.log(data);
                window.location.href = '../view/login.html';

            })
            }
            else {
                    alert("验证码输入错误！");
             }
            }
        },
        error:function () {
            alert("请求失败。")
        }
    })

    // }



}
//shangchuanwenjian
function Upload_file(){

    var file = $('#fileName').get(0).files[0];
    var form = new FormData();
    form.append('file',file);


    $.ajax({
        type:"post",
        url:"http://localhost:8090/fileUpload",
        data:form,
        contentType:false,
        mimeType:"multipart/form-data",
        processData:false,
        success:function (res) {
            //console.log(res)
        },
        error:function () {
            alert("请求失败。")
        }
    })

}
//
// $("#R_user_name").bind('input propertychange',function(){
//     check_user_name();  });
$("#R_user_name").blur(function () {
    check_user_name();
})

function check_user_name(){
    var R_user_name = $('#R_user_name').val();
    var register_info = document.getElementById("fail_info");
    $.get("http://localhost:8090/checkByuser_name?user_name="+R_user_name,function (data) {
       // console.log(data);
        if(data!=null && data!=''){
            $('#show_register_info').show(500);
            register_info.innerText="用户名已存在！"
        }
        else{
            $('#show_register_info').hide(500);
        }
    })

}

$("#R_user_email").blur(function () {
    login_check_user_phone();
})

var phone_chexk_r='';

function login_check_user_phone(){
    var R_user_phone= $('#R_user_email').val();
    var register_info = document.getElementById("fail_info");
    if(R_user_phone.length!==11){
        $('#show_register_info').show(500);
        register_info.innerText="手机号错误！"
        phone_chexk_r="fail";
    }

    if(R_user_phone!==null && R_user_phone!==''){
        $.get("http://localhost:8090/checkByuser_phone?user_email="+R_user_phone,function (data) {
            //console.log(data);
            if(data!=null && data!=''){
                $('#show_register_info').show(500);
                register_info.innerText="手机号已注册！"
                phone_chexk_r="fail";
            }
            else{
                $('#show_register_info').hide(500);
                phone_chexk_r="success";
            }
        })
    }
}


function hide_register_info() {
    $('#show_register_info').hide(500);
}


function getvercodenuber(){

    if(phone_chexk_r==="success"){
    var mobile = $("input[name='mobile']").val();//手机号
    var verifyCode = $("input[name='verify_code']");//手机验证码
    var vcode = verifyCode.val();//验证码
    var me = $(this);
    if(mobile.length != 11){
        $("input[name='mobile']").parentsUntil('.form-wrap','.field-wrap').find('.error').html('手机号码错误').show();
        return;

    }

    if($('[name="getMvcode"]').hasClass("doing")){
        return;
    }
    $('[name="getMvcode"]').addClass("doing").val('正在发送');
    $.get("http://localhost:8090/sendSms?mobile="+mobile,function (data) {
        console.log(data);
        if(data == 'success'){
            countdownHandler();
        }else{
            $("input[name='sms_vcode']").val('').parentsUntil('.form-wrap','.field-wrap').find('.error').html("请输入可使用的号码").show();
            var img_url = $('#verify_code_img').attr('src');
            $('#verify_code_img').attr('src',img_url+'1');
            $('[name="getMvcode"]').removeClass("doing");
            $('#sendSms').val("点击获取");
        }
    });
    }
}



function  countdownHandler(){
    var button = $("#sendSms");
    var number = 60;
    var timeTask=setInterval(function(){

        if(number==0){
            console.log('来清计时器了,当前还剩${number}秒');
            button.removeAttr("disabled");
            button.val("发送验证码");
            clearInterval(timeTask);

        }else{
            if(number>0){
                button.attr("disabled",true);
                button.val(number + "秒 重新发送");
                number--;
            }

        }
    },1000);

}

var verify_code_check_return='';
function verifycode_check() {
    var mobile = $("input[name='mobile']").val();
    var smsCode = $("input[name='sms_vcode']").val();

    if (mobile.length != 11) {
        $("input[name='mobile']").parentsUntil('.form-wrap', '.field-wrap').find('.error').html('手机号码输入错误').show();
        return;
    }

    if (smsCode.length < 4) {
        $("input[name='sms_vcode']").parentsUntil('.form-wrap', '.field-wrap').find('.error').html('手机验证码错误').show();
        return;
    }
    $.ajax({
        url: "/register",
        async : true,
        type: "post",
        dataType: "text",
        data:{
            sms_vcode:smsCode

        },
        success: function (data) {
            if(data === 'success'){

                verify_code_check_return=data;
                console.log("22222"+verify_code_check_return);
            }

        }
    });

}