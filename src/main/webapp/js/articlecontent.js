//查找文章评论


function get_article_comments() {
    var href_info=location.href;
    var article_id=href_info.split("=")[1];
    $.get("http://localhost:8090/getByarticle_id?article_id=" +article_id, function (data) {

        //
        var article_id = data.article_id;
        var article_title_info = document.getElementById("article_id");
        article_title_info.innerText = article_id;
        //文章题目
        var article_title = data.article_title;
        var article_title_info = document.getElementById("article_title");
        article_title_info.innerText = article_title;
        //文章内容
        var article_content = data.article_content;
        var article_contene_info = document.getElementById("article_content");
        article_contene_info.innerHTML = article_content;
        //搜索评论
        var comment_article_id = data.article_id;
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
        //拼接表格的行和列
        str = "<div class='comments_div'><div><div>" + data[i].comment_author_id + "</div><div>" + data[i].comment_content + "</div><div>" + data[i].comment_created + "</div><div><button id=\""+"f"+data[i].comment_id+"f"+data[i].comment_author_id +"\" onclick=\"show_reply_input(this.id" +
            ")\">回复</button></div><div><button id=\""+data[i].comment_id+"\" onclick=\"showcomments_reply(this.id)\">查看回复</button></div></div>  " +
            "<div><div> <div id=\"reply_div"+"f"+data[i].comment_id+"f"+data[i].comment_author_id+"\" style=\"display: none;\">\n" +
            "        <p>回复：</p><input id=\"comments_reply_v"+"f"+data[i].comment_id+"f"+data[i].comment_author_id +"\" type=\"text\" />\n" +
            "        <button id=\"v"+"f"+data[i].comment_id+"f"+data[i].comment_author_id+"\" onclick=\"hide_reply_input(this.id)\">回复</button>\n" +
            "    </div></div> </div><div><div><div id=\"show"+data[i].comment_id+"\" style='display: none'><table id=\"reply_tab"+data[i].comment_id+"\"></table><button id=\"v"+data[i].comment_id+"\" onclick=\"hidecomments_reply(this.id)\">收起</button></div></div></div></div> ";//追加到table中
        $("#Commernts_tab").append(str);
    }
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
 var str="";
 var show_reply_id="reply_tab"+id;
 document.getElementById(show_reply_id).innerHTML = "";

 if(data==''){
     $("#"+show_reply_id).append("暂无评论");
 }
 else
     {
        for(var i = 0;i<data.length;i++){
            str = "<tr><td>"+data[i].comments_reply_content+"</td></tr>"
            $("#"+show_reply_id).append(str);
        }
    }

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
    var comment_id = id.split('f')[1]
    var comments_author_id=id.split('f')[2];
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var reply_author_id = user_data.user_id;

    var reply_input="comments_reply_"+id
    var reply_content = $("#"+reply_input).val()
    //console.log(reply_content)
    if(reply_content!=''){
    $.get("http://localhost:8090/Create_comments_reply?comments_reply_content="+reply_content+"&comments_reply_author_id=" + reply_author_id+"&comments_author_id=" + comments_author_id+"&article_id="+article_id+"&comments_id="+comment_id,function (data) {
        //console.log(data);
        var comment_read="false"
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