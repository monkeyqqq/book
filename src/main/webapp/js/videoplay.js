

var video_reply_layedit_c = 0;
var video_reply_index =0;
layui.use('layedit', function(){
    video_reply_layedit_c = layui.layedit;

    video_reply_index = video_reply_layedit_c.build('video_comment_demo',
        {tool:['face'],height: 50, width: 200}

    );

});

function play_video() {
    var video_id = location.href.split('=')[1];
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var action = "v/"+video_id;
    $.get("http://localhost:8090/insert_log?user_id="+user_data.user_id+"&action="+action,function (data) {
    })
        $.get("http://localhost:8090/getByvid?video_id="+video_id,function (data) {
        var oatn=document.getElementById('video-area');
        oatn.innerHTML=data.mv_iframe;
    })
}

function create_video_commnets() {
    var comment_content = video_reply_layedit_c.getContent(video_reply_index);
    var href_info=location.href;
    var video_id=href_info.split("=")[1];

    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    var author_name = user_data.user_name;
    var author_photo = user_data.user_photo;

    if(comment_content!=null&&comment_content!=''){
        $.post("http://localhost:8090/Create_video_comments",{"comment_content":comment_content,"video_id":video_id,"comment_author_id":author_id,"comment_author_name":author_name,"comment_author_photo":author_photo},function (data) {
            console.log(data);

        })
    }
    window.location.reload();
}

function get_video_commetns() {
    var video_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getByvideo_Comments_article_id?video_id="+video_id,function (data) {
        show_video_comments(data);
    })
}

function show_video_comments(data){
    var str_video = "";//定义用于拼接的字符串
    document.getElementById("video_comments_infomation").innerHTML = "";
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    for(var i=0;i<data.length;i++){
        if(data[i].comment_author_id==author_id){
            str_video = "<div class='video_comment_z_div'><div class='video_comment_photo_div'><a href='userinfo.html'><img src='../image/"+data[i].comment_author_photo+"' style=\"width:40px; height:40px; border-radius:50%; \"/></a></div><div class='video_comment_name_div'>"+data[i].comment_author_name+"</div><div class='video_comment_content_div'>："+data[i].comment_content+"</div><div class='video_comment_time_div'>时间："+data[i].comment_created+"</div></div>"
        }
        else {
            str_video = "<div class='video_comment_z_div'><div class='video_comment_photo_div'><a href='otheruser.html?user_id="+data[i].comment_author_id+"'><img src='../image/"+data[i].comment_author_photo+"' style=\"width:40px; height:40px; border-radius:50%; \"/></a></div><div class='video_comment_name_div'>"+data[i].comment_author_name+"</div><div class='video_comment_content_div'>："+data[i].comment_content+"</div><div class='video_comment_time_div'>时间："+data[i].comment_created+"</div></div>"
        }
        $("#video_comments_infomation").append(str_video);
    }
}