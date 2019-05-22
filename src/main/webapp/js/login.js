

function User_login(){
    var user_name = $('#user_name').val();
    var user_password = $('#use_password').val();
    var login_info = document.getElementById("login_fail_info");
    if(rrrrr_information=='success'){
    $.get("http://localhost:8090/getByuser_name?user_name="+user_name+"&user_password=" + user_password,function (data) {
        //console.log(data);
        user_data = data;
        if(data== ''){
            $('#show_login_info').show(500);
            login_info.innerText="密码输入错误！"
            return;
        }
        else{

            sessionStorage.obj = JSON.stringify(data);


            var action = "l/"+data.user_id;
            $.get("http://localhost:8090/insert_log?user_id="+data.user_id+"&action="+action,function (data) {

            })
            window.location.href = 'http://localhost:8090/view/index.html';
        }


    })
    }
}



// $("#user_name").bind('input propertychange',function(){
// //     login_check_user_name();
// // });
//检查用户名
$("#user_name").blur(function () {
    login_check_user_name();
})


function login_check_user_name(){
    var R_user_name = $('#user_name').val();
    var login_info = document.getElementById("login_fail_info");
    if(R_user_name!=null && R_user_name!=''){
    $.get("http://localhost:8090/checkByuser_name?user_name="+R_user_name,function (data) {
        //console.log(data);
        if(data!=null && data!=''){
            $('#show_login_info').hide(500);
        }
        else{
            $('#show_login_info').show(500);
            login_info.innerText="用户名不存在！"
        }
    })
    }
}

//检查手机号
$("#user_phone").blur(function () {
    login_check_user_phone();
})


function login_check_user_phone(){
    var R_user_phone= $('#user_phone').val();
    var login_info = document.getElementById("login_fail_info");
    if(R_user_phone.length!==11){
        $('#show_login_info').show(500);
        login_info.innerText="手机号错误！"
    }

    if(R_user_phone!==null && R_user_phone!==''){
        $.get("http://localhost:8090/checkByuser_phone?user_email="+R_user_phone,function (data) {
            //console.log(data);
            if(data!=null && data!=''){
                $('#show_login_info').hide(500);
            }
            else{
                $('#show_login_info').show(500);
                login_info.innerText="手机号未注册！"
            }
        })
    }
}






function hide_login_info() {
    $('#show_login_info').hide(500);

}
var rrrrr_information = '';
function aaaaaaaaaaa() {
    _dx.Captcha(document.getElementById('img_verify11111'), {
        appId: '2a0873f05d7cb1bcab65703ffd581c78', //appId,开通服务后可在控制台中“服务管理”模块获取
        style: 'inline',
        width:'200px',
        success: function (token) {
            console.log('token:', token);
            $.get("http://localhost:8090/imageverify?token="+token,function(data){
                console.log(data);
                rrrrr_information=data;
            })
        }
    })
}
function aaaaaaaaaa() {
    _dx.Captcha(document.getElementById('img_verify1111'), {
        appId: '2a0873f05d7cb1bcab65703ffd581c78', //appId,开通服务后可在控制台中“服务管理”模块获取
        style: 'inline',
        width:'200px',
        success: function (token) {
            console.log('token:', token);
            $.get("http://localhost:8090/imageverify?token="+token,function(data){
                console.log(data);
                rrrrr_information=data;
            })
        }
    })
}



layui.use('element', function(){
    var element = layui.element;

    element.on('tab(filter)', function(data){
        console.log(this); //当前Tab标题所在的原始DOM元素
        console.log(data.index); //得到当前Tab的所在下标
        console.log(data.elem); //得到当前的Tab大容器
    });

});


function getvercodenuber(){
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
            if(data === 'success'&&rrrrr_information==='success'){

                verify_code_check_return=data;
                console.log("22222"+verify_code_check_return);
                var R_user_phone= $('#user_phone').val();
                $.get("http://localhost:8090/checkByuser_phone?user_email="+R_user_phone,function (data) {
                    sessionStorage.obj = JSON.stringify(data);
                    var action = "l/"+data.user_id;
                    $.get("http://localhost:8090/insert_log?user_id="+data.user_id+"&action="+action,function (data) {

                    })
                    window.location.href = 'http://localhost:8090/view/index.html';
                });
            }

        }
    });

}