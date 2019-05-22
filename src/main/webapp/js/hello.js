function getTranslation() {
    var word = $('#english').val();
    $.get("http://localhost:8090/getByTranslation?translation=" + word,function (data,status) {
        console.log(data);
        showData(data)
        //var tra = data.word;
        //var chinese = document.getElementById("chinese");
        //chinese.innerText = tra;
    })
}
 function showData(data) {
    var str = "";//定义用于拼接的字符串
     document.getElementById("tab").innerHTML = "";

           for (var i = 0; i < data.length; i++) {
                    //拼接表格的行和列
               str = "<tr><td>" + data[i].num + "</td><td>" + data[i].book_name + "</td><td>" + data[i].price + "</td></tr>";//追加到table中
               $("#tab").append(str);
           }
         }

function getRand() {
    $.ajax({
        type:"get",
        url:"http://localhost:8090/getRandomWord",
        data:null,
        async:false,
        dataType:'json',
        success:function (res) {
            var word = res.word;
            var translation = res.translation;
            var ran_word = document.getElementById("ran_word");
            var ran_translation = document.getElementById("ran_trans")
            ran_word.innerText = word;
            ran_translation.innerText = translation;
        },
        error:function (res) {
            alert("请求失败。")
        }
    })
}


function getBook(){
    var num = $('#num').val();
    var book_name = $('#num').val();
    var numval = parseInt(num);

    if(isNaN(numval)) {
        $.get("http://localhost:8090/getByBook_name?book_name=" + num, function (data) {
            console.log(data);
            showData(data);
            //var Booktra = data.book_name;
           // var bookinfo = document.getElementById("bookinfo");
            //bookinfo.innerText = Booktra;
        })
    }
    else{

        $.get("http://localhost:8090/getByNum?num=" + num, function (data) {
            console.log(data);
            var Booktra = data.book_name;
            var bookinfo = document.getElementById("bookinfo");
            bookinfo.innerText = Booktra;
        })


    }
}

function getVideo1(){

    var player = videojs('example_video_1');
}

function getVideo(){
    var avid = $('#Search_video').val();
    var key_word = $('#Search_video').val();
    var numval = parseInt(num);
    $.get("http://localhost:8090/getByAvid?avid=" + avid, function (data) {
        console.log(data);
        var Booktra = data.avid;
        var video_href= "<iframe src=\"//player.bilibili.com/player.html?aid=" + Booktra + "&cid=31621681&page=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\" width=\"480\" height=\"350\">" + "</iframe>"
        var bookinfo = document.getElementById("video_info");
        bookinfo.innerHTML= video_href;
    })

}

function Create_article() {
    var id = $('#user_id_info').text();
    var article_c = $('#article_c').val();
    var article_s = $('#article_s').val();
    var article_t = $('#article_t').val();
    $.get("http://localhost:8090/Insert?article_title="+article_t+"&article_summary=" + article_s+"&article_content=" + article_c+"&author_id="+id,function (data) {
        console.log(data);
    })
    var bookinfo = document.getElementById("article_info");
    bookinfo.innerText = "发布成功";
}


function showCommentsData(data) {
    var str = "";//定义用于拼接的字符串
    document.getElementById("Commernts_tab").innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        //拼接表格的行和列
        str = "<tr><td>" + data[i].comment_author_id + "</td><td>" + data[i].comment_content + "</td><td>" + data[i].comment_created + "</td></tr>";//追加到table中
        $("#Commernts_tab").append(str);
    }
}



//查找文章
function get_article() {
    var key_word = $('#search_article').val();
    $.get("http://localhost:8090/getByarticle_id?article_id=" + key_word, function (data) {
        console.log(data);
        //sessionStorage.obj = JSON.stringify(data);
        //文章题目

        //文章标签显示
        var article_id= data.article_id;
        var article_href="    <a href=\"articecontent.html?article_id="+article_id+"\">\n" +
            "        <div id=\"article_title\"></div>\n" +
            "        <div id=\"article_content\"></div>\n" +
            "    </a>"
        var article_id_info = document.getElementById("article_info");
        article_id_info.innerHTML= article_href;


        //文章标题和内容显示
        var article_title = data.article_title;
        var article_title_info = document.getElementById("article_title");
        article_title_info.innerText = article_title;
        //文章内容
        var article_content= data.article_content;
        var article_contene_info = document.getElementById("article_content");
        article_contene_info.innerText = article_content;
        //搜索评论
        // var comment_article_id=data.article_id;
        // $.get("http://localhost:8090/getByComments_article_id?article_id=" + comment_article_id, function (data){
        //     console.log(data);
        //     showCommentsData(data);
        // })

    })

}
//查找文章评论
function get_article_comments() {
        var href_info=location.href;
        var article_id=href_info.split("=")[1];
     $.get("http://localhost:8090/getByarticle_id?article_id=" + article_id, function (data) {
        console.log(data);
        //文章题目
        var article_title = data.article_title;
        var article_title_info = document.getElementById("article_title");
        article_title_info.innerText = article_title;
        //文章内容
        var article_content = data.article_content;
        var article_contene_info = document.getElementById("article_content");
        article_contene_info.innerText = article_content;
        //搜索评论
        var comment_article_id = data.article_id;
        $.get("http://localhost:8090/getByComments_article_id?article_id=" + comment_article_id, function (data) {
            console.log(data);
            showCommentsData(data);
        })

    })

}

function create_commnets() {
    var comment_content=$('#create_comment').val();
    var href_info=location.href;
    var article_id=href_info.split("=")[1];

    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;

    $.get("http://localhost:8090/Create_comments?comment_content="+comment_content+"&article_id=" + article_id+"&comment_author_id=" + author_id,function (data) {
        console.log(data);
    })

}


//用户显示
function Show_user(){
    var str = sessionStorage.obj;
    if(str==null){
        window.location.href="login.html";
    }else {
        var user_data = $.parseJSON(str);


        var user_photo_info = user_data.user_photo;
        var photo_href= "<img src=\"/image/"+user_photo_info+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/>"
        var bookinfo = document.getElementById("user_photo_info");
        bookinfo.innerHTML= photo_href;


        var user_id=user_data.user_id;
        var user_id_info = document.getElementById("user_id_info");
        user_id_info.innerText=user_id;


        var user_name=user_data.user_name;
        var user_name_info = document.getElementById("user_name_info");
        user_name_info.innerText=user_name;


        var user_password=user_data.user_password;
        var user_password_info = document.getElementById("user_password_info");
        user_password_info.innerText=user_password;
    }
}



//用户登录
function User_login(){
    var user_name = $('#user_name').val();
    var user_password = $('#use_password').val();
    $.get("http://localhost:8090/getByuser_name?user_name="+user_name+"&user_password=" + user_password,function (data) {
        console.log(data);
        user_data = data;
        if(data== ''){
            alert("用户名密码不匹配");
            return;
        }
        else{

            sessionStorage.obj = JSON.stringify(data);

            window.location.href = 'http://localhost:8090/view/index.html';

        }


    })

}

//用户注册

function User_register(){

    var R_user_name = $('#R_user_name').val();
    var R_user_password = $('#R_user_password').val();
    var R_user_email = $('#R_user_email').val();

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
            console.log(res);
            $.get("http://localhost:8090/UserRegister?user_name="+R_user_name+"&user_password=" + R_user_password + "&user_email=" + R_user_email + "&user_photo=" + res,function (data) {
                console.log(data);

                window.location.href = '../view/login.html';

            })
        },
        error:function () {
            alert("请求失败。")
        }
    })





}


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
            console.log(res)
        },
        error:function () {
            alert("请求失败。")
        }
    })



}


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
            if(data == 'success'){
                alert("注册成功");
                return ;
            }
            alert(data);
        }
    });

}


function aaaaaaaaaaa() {
   _dx.Captcha(document.getElementById('img_verify11111'), {
        appId: '2a0873f05d7cb1bcab65703ffd581c78', //appId,开通服务后可在控制台中“服务管理”模块获取
        style: 'inline',
        success: function (token) {
            console.log('token:', token);
            $.get("http://localhost:8090/imageverify?token="+token,function(data){
                console.log(data);
            })
        }
    })
}
