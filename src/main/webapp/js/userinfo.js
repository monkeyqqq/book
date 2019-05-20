function get_user_info() {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);

    var user_photo_info = user_data.user_photo;
    var photo_href= "<a href=\"userinfo.html\"><img src=\"/image/"+user_photo_info+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/></a>"
    //console.log(photo_href);
    var bookinfo = document.getElementById("user_detail_photo_info");
    bookinfo.innerHTML= photo_href;


    var user_id=user_data.user_id;
    var user_id_info = document.getElementById("user_detail_id_info");
    user_id_info.innerText=user_id;


    var user_name=user_data.user_name;
    var user_name_info = document.getElementById("user_detail_name_info");
    user_name_info.innerText=user_name;

    $.get("http://localhost:8090/get_a_Byahtuor_id?author_id="+user_id,function (data) {
        //console.log(data);
        var user_article_l = data.length;
        //console.log(user_article_l);
        var user_article = document.getElementById("user_article_num");
        user_article.innerText=user_article_l;
    })
}
function show_count_btu(){
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    if(user_data.user_role == 'admin'){
        $("#admin_count_info").show(500);
    }
    else {
        $("#user_count_info").show(500);
    }
}

function Show_old_user_info() {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    $('#update_info').show(500);
    $('#infomation_area').hide(500);
    $('#reply_area').hide(500);
    $('#guanzhu_info').hide(500);
    var user_photo_info = user_data.user_photo;
    var photo_href= "<img src=\"/image/"+user_photo_info+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/>"
    //console.log(photo_href);
    var bookinfo = document.getElementById("update_photo");
    bookinfo.innerHTML= photo_href;

    var user_name=user_data.user_name;
    //var user_name_info = document.getElementById("update_name");
    //user_name_info.innerText=user_name;
    $('#update_name_input').val(user_name);

    var user_password=user_data.user_password;
   // var user_name_info = document.getElementById("update_password");
    //user_name_info.innerText=user_password;
    $('#update_password_input').val(user_password);

}

//关注模块
function show_guanzhu_info(){
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var guanzhu_name = user_data.user_links;
    var guanzhu_info =document.getElementById("guanzhu_info");
    guanzhu_info.innerHTML='';
    if(guanzhu_name!=null&&guanzhu_name!='') {
        var guanzhu_count = guanzhu_name.split('/').length;
        for (var i = 0; i < guanzhu_count - 1; i++) {
            var discuss_name = guanzhu_name.split('/')[i];
            var discuss_href = "<div class='article_new_infomation_div'><p style=\"font-size: 20px;color: #3F3F3F\">你关注的讨论区：</p><a href=\"showarticle.html?school_name=" + discuss_name + "&page=1\" style='font-size: 20px;color: #009688'>" + discuss_name + "</a></div>"
            $("#guanzhu_info").append(discuss_href);
        }
    }
    else{
        $("#guanzhu_info").append("暂无关注！")
    }
    // var button_href="<button id='hide_updata' onclick='hide_guanzhu_info()' class='layui-btn layui-btn-mini'>收起</button>"
    // $("#guanzhu_info").append(button_href);
}
function show_guanzhu_btu(){
    $("#guanzhu_info").show(500);
    $('#infomation_area').hide(500);
    $('#update_info').hide(500);
    $('#reply_area').hide(500);
}
function hide_guanzhu_info(){
    $("#guanzhu_info").hide(500);
}


$("#update_photo_input").bind('input propertychange',function(){
    update_pthoto();  })

var update_photo_href=0;

function update_pthoto(){
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var imginfo = document.getElementById("update_photo");
    var file = $('#update_photo_input').get(0).files[0];
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
            //console.log(res);
            if(res!=null && res!=''){
                update_photo_href=res;
            }
            else{
                update_photo_href=user_data.user_photo;
            }

            var photo_href= "<img src=\"/image/"+res+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/>"
            imginfo.innerHTML= photo_href;
        },
        error:function () {
            alert("请求失败。")
        }
    })
}

function update_user_info() {

   var str = sessionStorage.obj;
   var user_data = $.parseJSON(str);
   var user_id = $('#user_detail_id_info').text();
   //console.log(user_id);
   var user_name= $('#update_name_input').val();
   var user_password=$('#update_password_input').val();
   var user_photo = update_photo_href;
   if(update_photo_href != 0){
       $.get("http://localhost:8090/Update_photo?user_photo="+user_photo+"&user_id=" + user_id,function (res) {
           $.get("http://localhost:8090/getByuser_id?user_id=" + user_id, function (data) {
               sessionStorage.obj = JSON.stringify(data);
               update_photo_href=0;
           })
       })
   }
   if(user_name!=user_data.user_name){
       $.get("http://localhost:8090/Update_name?user_name="+user_name+"&user_id=" + user_id,function (res) {
           $.get("http://localhost:8090/getByuser_id?user_id=" + user_id, function (data) {
               sessionStorage.obj = JSON.stringify(data);

           })
       })
   }
   if(user_password!=user_data.user_password){
       $.get("http://localhost:8090/Update_password?user_password="+user_password+"&user_id=" + user_id,function (res) {
           $.get("http://localhost:8090/getByuser_id?user_id=" + user_id, function (data) {
               sessionStorage.obj = JSON.stringify(data);

           })
       })
   }
   // if(update_photo_href!=0){
   // $.get("http://localhost:8090/UserUpdate?user_name="+user_name+"&user_password=" + user_password + "&user_photo=" + user_photo + "&user_id=" + user_id,function (res) {
   //     $.get("http://localhost:8090/getByuser_name?user_name=" + user_name + "&user_password=" + user_password, function (data) {
   //         sessionStorage.obj = JSON.stringify(data);
   //     })
   // })
   // }
   $('#update_info').hide(500);
    window.location.reload();
}

function hide_updata_info() {
    $('#update_info').hide(500);
}


function get_new_infomation() {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id= user_data.user_id;
    var new_info =document.getElementById("infomation_area");
    new_info.innerHTML='';

    $('#infomation_area').show(500);
    $('#update_info').hide(500);
    $('#reply_area').hide(500);
    $("#guanzhu_info").hide(500);
    $.get("http://localhost:8090/get_a_Byahtuor_id?author_id="+author_id,function (data) {
        //console.log(data);
        var j=0;
        for(var i=0;i<data.length;i++){
         if(data[i].article_new_comment == "false"){
         var info_gref="<div class='article_new_infomation_div'><p style='font-size: 18px;color: #2E2D3C'>你发表的文章：</p><a href=\"articecontent.html?article_id="+data[i].article_id+"\" onclick=\"update_article_read("+data[i].article_id+")\" style='font-size: 20px;color: #1E9FFF'>"+data[i].article_title+"--有新评论点击查看</a></div>";
         $("#infomation_area").append(info_gref);
         j=j+1;
         }
        }
        if(j==0){
            $("#infomation_area").append("暂无新评论");
        }
    })
}
function update_article_read(article_id) {
    var read_info="true";
    $.get("http://localhost:8090/Update_article_new_comment_info?article_new_comment="+read_info+"&article_id="+article_id,function (data) {
        //console.log(data);
    })
}



function get_new_reply() {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id= user_data.user_id;
    var new_reply =document.getElementById("reply_area");
    new_reply.innerHTML='';

    $('#reply_area').show(500);
    $('#update_info').hide(500);
    $("#guanzhu_info").hide(500);
    $('#infomation_area').hide(500);
   $.get("http://localhost:8090/getByComments_author_id?comment_author_id="+author_id,function (data) {
       var j=0;
       for(var i = 0 ; i < data.length ; i++){
           if(data[i].comment_read == "false"){
               var reply_href="<div class='article_new_infomation_div'><p style='font-size: 18px;color: #0C0C0C'>您的评论有新回复：</p><a href=\"articecontent.html?article_id="+data[i].article_id+"\" onclick=\"update_comment_read("+data[i].comment_id+")\" style='font-size: 20px;color: #01AAED'>第"+data[i].article_id+"篇文章有新回复</a></div>"
               $("#reply_area").append(reply_href);
               j=j+1;
           }
       }
       if(j==0){
           $("#reply_area").append("暂无新评论");
       }
   })
}
function update_comment_read(comment_id) {
    var read_info="true";
    $.get("http://localhost:8090/Update_comment_byId?comment_read="+read_info+"&comment_id="+comment_id,function (data) {
        //console.log(data);
    })
}

function shut_down() {
    sessionStorage.clear();
    window.location.href = "login.html"

}


function count_information_show(id) {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var action =id.split('/')[1];
    $("#count_v_information").show(500);
    $('#reply_area').hide(500);
    $('#update_info').hide(500);
    $("#guanzhu_info").hide(500);
    $('#infomation_area').hide(500);
    $.get("http://localhost:8090/get_count_info_by_action?user_id="+user_data.user_id+"&action="+action,function (data) {
        console.log(data);
        huatu(data,action);
  })
}
function admin_count_information_show(id) {

    var action =id.split('/')[1];
    $("#count_v_information").show(500);
    $('#reply_area').hide(500);
    $('#update_info').hide(500);
    $("#guanzhu_info").hide(500);
    $('#infomation_area').hide(500);
    $.get("http://localhost:8090/admin_get_count_info_by_action?action="+action,function (data) {
        console.log(data);
        huatu(data,action);
    })
}


function huatu(data,action) {
        var a = new Array(12);
        var info_count_1='';
        if(action == 'l'){
             info_count_1= '用户登录次数';
        }
        if(action == 'b'){
            info_count_1 = '浏览书籍数';
         }
         if(action == 'v'){
            info_count_1 = '观看视频数';
        }
        if(action == 'a'){
            info_count_1 = '浏览文章数';
        }
        for(var i=0;i<data.length;i++){
            if(data[i].months== '01'){a[0]=data[i].count;continue;}
            if(data[i].months== '02'){a[1]=data[i].count;continue;}
            if(data[i].months== '03'){a[2]=data[i].count;continue;}
            if(data[i].months== '04'){a[3]=data[i].count;continue;}
            if(data[i].months== '05'){a[4]=data[i].count;continue;}
            if(data[i].months== '06'){a[5]=data[i].count;continue;}
            if(data[i].months== '07'){a[6]=data[i].count;continue;}
            if(data[i].months== '08'){a[7]=data[i].count;continue;}
            if(data[i].months== '09'){a[8]=data[i].count;continue;}
            if(data[i].months== '10'){a[9]=data[i].count;continue;}
            if(data[i].months== '11'){a[10]=data[i].count;continue;}
            if(data[i].months== '12'){a[11]=data[i].count;continue;}

        }
        var myChart = echarts.init(document.getElementById('count_v_information'));
        console.log("1111111");
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:[info_count_1]
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {},
            series: [{
                name: info_count_1,
                type: 'bar',
                data: a
            }]
        };

        myChart.setOption(option);
        console.log("2222222");
}