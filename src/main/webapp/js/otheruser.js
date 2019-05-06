function show_other_info() {
    var user_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getByuser_id?user_id="+user_id,function (user_data) {
        var user_photo_info = user_data.user_photo;
        var photo_href= "<a href=\"otheruser.html?user_id="+user_data.user_id+"\"><img src=\"/image/"+user_photo_info+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/></a>"
        //console.log(photo_href);
        var bookinfo = document.getElementById("user_detail_photo_info");
        bookinfo.innerHTML= photo_href;


        var user_id=user_data.user_id;
        var user_id_info = document.getElementById("user_detail_id_info");
        user_id_info.innerText=user_id;


        var user_name=user_data.user_name;
        var user_name_info = document.getElementById("user_detail_name_info");
        user_name_info.innerText=user_name;
    })
    $.get("http://localhost:8090/get_a_Byahtuor_id?author_id="+user_id,function (data) {
        //console.log(data);
        var user_article_l = data.length;
        //console.log(user_article_l);
        var user_article = document.getElementById("user_article_num");
        user_article.innerText=user_article_l;
    })
}


function other_show_guanzhu_info(){
    var user_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getByuser_id?user_id="+user_id,function (user_data) {
        var guanzhu_name = user_data.user_links;
        var guanzhu_info =document.getElementById("guanzhu_info");
        guanzhu_info.innerHTML='';
        var guanzhu_count = guanzhu_name.split('/').length;
        for(var i=0;i<guanzhu_count;i++){
            var discuss_name = guanzhu_name.split('/')[i];
            var discuss_href="<p></p><a href=\"showarticle.html?school_name="+discuss_name+"&page=1\">"+discuss_name+"</a>"
            $("#guanzhu_info").append(discuss_href);
        }
    })

    var button_href="<button id='hide_updata' onclick='hide_guanzhu_info()' class='layui-btn layui-btn-mini'>收起</button>"
    $("#guanzhu_info").append(button_href);
}
function other_show_guanzhu_btu(){
    $("#guanzhu_info").show(500);
}
function hide_guanzhu_info(){
    $("#guanzhu_info").hide(500);
}