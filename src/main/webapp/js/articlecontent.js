//查找文章评论


function get_article_comments() {
    var href_info=location.href;
    var article_id=href_info.split("=")[1];
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    $.get("http://localhost:8090/getByarticle_id?article_id=" +article_id, function (data) {

        //
        // var article_id = data.article_id;
        // var article_id_info = document.getElementById("article_id");
        // article_id_info.innerText = article_id;
        //文章题目
        var article_title = data.article_title;
        var article_title_info = document.getElementById("article_title");
        article_title_info.innerText = article_title;
        //文章内容
        var article_content = data.article_content;
        var article_contene_info = document.getElementById("article_content");
        article_contene_info.innerHTML = article_content;

        var article_create = data.article_created;
        var article_create_info = document.getElementById("article_create_time")
        article_create_info.innerText="创建于:"+article_create;
        //搜索评论
        var comment_article_id = data.article_id;
        var author_id = data.author_id
        $.get("http://localhost:8090/getByuser_id?user_id="+author_id,function (data) {
            var article_author =data.user_name;
            var author_href=0;
            if(user_data.user_id==data.user_id){
                author_href="<div>作者:<a href=\"userinfo.html\">"+article_author+"</a></div>"
            }
            else {
                author_href="<div>作者:<a href=\"otheruser.html?user_id="+data.user_id+"\">"+article_author+"</a></div>"
            }
            var author_info = document.getElementById("article_author_name");
            author_info.innerHTML=author_href;

        })
        $.get("http://localhost:8090/getByComments_article_id?article_id=" + comment_article_id, function (data) {
           // console.log(data);
            showCommentsData(data);
        })
    })
}
function showCommentsData(data) {
    var str = "";//定义用于拼接的字符串
    document.getElementById("Commernts_tab").innerHTML = "";

    for (var i = 0; i < data.length; i++) {

        str = "<div class='comments_div'><div><div id=\"comment_user_photo"+i+"\" class=\"comment_user_photo_div\"></div><div id=\"user_name"+i+"\" class=\"comment_user_name_div\"></div><hr><div>" + data[i].comment_content + "</div><div>" + data[i].comment_created + "</div><div class=\"reply_button\" style='padding-top: 20px'><button id=\""+"f"+data[i].comment_id+"f"+data[i].comment_author_id +"\" onclick=\"show_reply_input(this.id" +
            ")\" class=\"layui-btn layui-btn-sm layui-btn-normal\" >回复</button></div><div class=\"show_reply_button\"><button id=\""+data[i].comment_id+"\" onclick=\"showcomments_reply(this.id)\" class=\"layui-btn layui-btn-sm layui-btn-normal\">查看回复</button></div></div>  " +
            "<div><div> <div id=\"reply_div"+"f"+data[i].comment_id+"f"+data[i].comment_author_id+"\" style=\"display: none; width: 200px\" placeholdr='请输入回复内容' class=\"reply_button_div\">\n" +
            "        <p>回复：</p><input id=\"comments_reply_v"+"f"+data[i].comment_id+"f"+data[i].comment_author_id +"\" type=\"text\" class='layui-input' />\n" +
            "        <button id=\"v"+"f"+data[i].comment_id+"f"+data[i].comment_author_id+"\" onclick=\"hide_reply_input(this.id)\" class=\"layui-btn layui-btn-sm layui-btn-normal\" >回复</button>\n" +
            "    </div></div> </div><div class=\"comments_reply_area\"><div><div id=\"show"+data[i].comment_id+"\" style='display: none'><div id=\"reply_tab"+data[i].comment_id+"\"></div><button id=\"v"+data[i].comment_id+"\" onclick=\"hidecomments_reply(this.id)\"  class=\"layui-btn layui-btn-sm layui-btn-normal\">收起</button></div></div></div></div> ";//追加到table中
        $("#Commernts_tab").append(str);

        // $.get("http://localhost:8090/getByuser_id?user_id="+data[i].comment_author_id,function (res) {
        //     var comment_user_name_info= document.getElementById("user_name"+i);
        //     console.log(res.user_name);
        //     comment_user_name_info.innerText=res.user_name;
        // })

        show_user_info_action(data[i].comment_author_id,i);

    }

}

function show_user_info_action(id,i) {
        var str = sessionStorage.obj;
        var user_data = $.parseJSON(str);

        $.get("http://localhost:8090/getByuser_id?user_id=" + id, function (res) {
            var comment_user_name_info = document.getElementById("user_name" + i);
            var comment_user_photo_info = document.getElementById("comment_user_photo"+i);
            console.log(res.user_name);
            if(user_data.user_id == res.user_id){
            var photo_href= "<a href=\"userinfo.html\"><img src=\"/image/"+res.user_photo+ "\" style=\"width:40px; height:40px; border-radius:50%; \"/></a>"
            }
            else{
                var photo_href= "<a href=\"otheruser.html?user_id="+res.user_id+"\"><img src=\"/image/"+res.user_photo+ "\" style=\"width:40px; height:40px; border-radius:50%; \"/></a>"
            }
            comment_user_name_info.innerText = res.user_name;
            comment_user_photo_info.innerHTML=photo_href;
        })

}


function showcomments_reply(id) {
    var div_id="show"+id;
    $("#"+div_id).show(500);
    $.get("http://localhost:8090/getreplyByComments_id?comments_id=" + id, function (data) {
        //console.log(data);
        showComments_replyData(data,id);
    })

}
function hidecomments_reply(id){
    var reply_id= id.split('v')[1];
    //console.log(reply_id);
    var reply_id_c="show"+reply_id;
    $("#"+reply_id_c).hide(500);

}

function showComments_replyData(data,id) {

    var str_href=0

    var show_reply_id="reply_tab"+id;
    document.getElementById(show_reply_id).innerHTML = "";
    var photo_href=0;
    if(data==''){
         $("#"+show_reply_id).append("暂无评论");
    }
    else
       {

        for(var i = 0;i<data.length;i++){
            var reply_div_href="<div id=\"replyy_div"+data[i].comments_reply_id+"\"><hr style='width: 730px'><div id=\"reply_user_info"+data[i].comments_reply_id+"\"></div><div id=\"reply_content"+data[i].comments_reply_id+"\" class='reply_content_class'></div><div id=\"reply_time"+data[i].comments_reply_id+"\" class='reply_time'>回复于："+data[i].comments_reply_created+"</div></div>"

            $("#"+show_reply_id).append(reply_div_href);
            $("#reply_content"+data[i].comments_reply_id).append("："+data[i].comments_reply_content);

            show_comment_reply_user(data[i].comments_reply_id,data[i].comments_reply_author_id)


        }
      }

}
function show_comment_reply_user(reply_id,id) {
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    $.get("http://localhost:8090/getByuser_id?user_id="+id,function (res){

        if(user_data.user_id == res.user_id){
            photo_href= "<a href=\"userinfo.html\"><img src=\"/image/"+res.user_photo+ "\" style=\"width:30px; height:30px; border-radius:50%; \"/></a><p style='font-size: 10px'>"+res.user_name+"</p>"
        }
        else{
            photo_href= "<a href=\"otheruser.html?user_id="+res.user_id+"\"><img src=\"/image/"+res.user_photo+ "\" style=\"width:30px; height:30px; border-radius:50%; \"/></a><p style='font-size: 10px'>"+res.user_name+"</p>"
        }

        $("#reply_user_info"+reply_id).append(photo_href);
    })
}
function show_reply_input(id){
    //var reply_button_id= $('#comment_author_id_info').val();
    var reply_button  = "reply_div"+id;
    $("#"+reply_button).show(500);
    //console.log(reply_button);
}

function hide_reply_input(id){
    //var reply_button_id= $('#comment_author_id_info').val();
    var href_info=location.href;
    var article_id=href_info.split("=")[1];
    //var article_id= $('#article_id').val();
    //console.log(article_id);
    var comment_id = id.split('f')[1];
    var comments_author_id=id.split('f')[2];
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var reply_author_id = user_data.user_id;

    var reply_input="comments_reply_"+id;
    var reply_content = $("#"+reply_input).val();
    //console.log(reply_content)
    if(reply_content!=''){
    $.get("http://localhost:8090/Create_comments_reply?comments_reply_content="+reply_content+"&comments_reply_author_id=" + reply_author_id+"&comments_author_id=" + comments_author_id+"&article_id="+article_id+"&comments_id="+comment_id,function (data) {
        //console.log(data);
        var comment_read="false";
     $.get("http://localhost:8090/Update_comment_byId?comment_read="+comment_read+"&comment_id="+comment_id,function (data) {
        // console.log(data);
     })
    })
    }




    var reply_button  = "reply_di"+id;
    $("#"+reply_button).hide(500);
    //console.log(reply_button);

}


var reply_layedit_c=0;
var reply_index =0;
layui.use('layedit', function(){
    reply_layedit_c = layui.layedit;

    reply_index = reply_layedit_c.build('comment_demo',
        {tool:['face'],height: 50, width: 200}

    );

});

function create_commnets() {
    var comment_content = reply_layedit_c.getContent(reply_index);


    var href_info=location.href;
    var article_id=href_info.split("=")[1];

    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    var read_info = "false";
    if(comment_content!=null&&comment_content!=''){
    $.post("http://localhost:8090/Create_comments",{"comment_content":comment_content,"article_id":article_id,"comment_author_id":author_id},function (data) {
        console.log(data);
        $.get("http://localhost:8090/Update_article_new_comment_info?article_new_comment="+read_info+"&article_id="+article_id,function (data) {
            console.log(data);
        })
    })
    }
}

//返回上一页
function goBack()
{
    window.history.back(-1);
}



layui.use('element', function(){
    var element = layui.element;

});