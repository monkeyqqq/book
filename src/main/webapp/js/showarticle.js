//查找文
var self_ ;
window.onload = function(){
    self_=this;
    this.Show_user();
    this.show_discuss_info();
    this.guanzhu();
    this.get_article();

}


// $("#search_article").bind('input propertychange',function(){
//     get_article();
// });
function get_article() {
    var key_word = $('#search_article').val();
    var school_name_q=decodeURI(location.href.split('=')[1]);
    document.getElementById("article_info").innerHTML = "";
    console.log(key_word);
    console.log(school_name_q);
   if(key_word!=null&& key_word!="") {
        $.get("http://localhost:8090/getByarticle_key_word?article_keyword=" + key_word + "&article_from=" + school_name_q, function (data) {
            console.log(data);
            //sessionStorage.obj = JSON.stringify(data);
            //         //文章题目
            //
            //         //文章标签显示
            for (var i = 0; i < data.length; i++) {
                var article_id = data[i].article_id;
                var article_href = "    <a href=\"articecontent.html?article_id=" + article_id + "\">\n" +
                    "        <div id=\"article_title" + article_id + "\"></div>\n" +
                    "        <div id=\"article_content" + article_id + "\"></div>\n" +
                    "    </a>"
                // var article_id_info = document.getElementById("article_info");
                // article_id_info.innerHTML= article_href;
                $('#article_info').append(article_href);

                //文章标题和内容显示
                var article_title = data[i].article_title;
                var article_title_info = document.getElementById("article_title" + article_id);
                article_title_info.innerText = article_title;
                //文章内容
                var article_summary = data[i].article_summary;
                console.log(article_summary);
                var article_summary_info = document.getElementById("article_content" + article_id);
                article_summary_info.innerText = article_summary;
            }
            //搜索评论
            // var comment_article_id=data.article_id;
            // $.get("http://localhost:8090/getByComments_article_id?article_id=" + comment_article_id, function (data){
            //     console.log(data);
            //     showCommentsData(data);
            // })

        })
    }

}

function show_discuss_info() {

    var school_name=decodeURI(location.href.split('=')[1]);
    console.log(school_name);
    $.get("http://localhost:8090/getByschool_name?school_name="+school_name,function (data) {
    console.log(data);
    var discuss_name = data.school_name;
    var name_info =document.getElementById("school_name_info");
    name_info.innerText=discuss_name;

    var discuss_created = data.school_created;
    var created_info =document.getElementById("school_created_info");
    created_info.innerText=discuss_created;
    $.get("http://localhost:8090/get_a_Byarticle_from?article_from="+school_name,function (data) {
        console.log(data);
        var article_count = data;
        var article_count_info=document.getElementById("school_article_count");
        article_count_info.innerText=article_count;
    })
    })
}

function show_create_article() {
    var school_name_i = $('#school_name_info').text();
    console.log(school_name_i);
    window.location.href = 'articlecreate.html?school_name='+encodeURI(school_name_i);
}

function guanzhu(){
    var school_name=decodeURI(location.href.split('=')[1]);
    console.log(school_name);
    var  guanzhu_info=document.getElementById("guanzhu_btn");
    guanzhu_info.innerHTML='';
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var guanzhu_name=user_data.user_links;
    console.log(guanzhu_name);
    var guanzhu_count=guanzhu_name.split('/').length;
    console.log(guanzhu_count);
    for(var i=0;i<guanzhu_count;i++){
        console.log(guanzhu_name.split("/")[i]);
        if(school_name == guanzhu_name.split("/")[i]){
            guanzhu_info.innerHTML="<button class=\"layui-btn layui-btn-radius layui-btn-disabled\">已关注</button>\"";
            break;
        }
        else if(i == guanzhu_count-1){
            guanzhu_info.innerHTML="<button class=\"layui-btn layui-btn-radius layui-btn-normal\" onclick=\"guanzhu_up()\">关注</button>";
        }
    }

}

function guanzhu_up(){
    var school_name=decodeURI(location.href.split('=')[1]);
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var user_id = user_data.user_id;
    var guanzhu_name=user_data.user_links;
    var up_guanzhu = guanzhu_name +school_name+"/";
    $.get("http://localhost:8090/Update_links?user_id="+user_id+"&user_links="+up_guanzhu,function (data) {
        console.log("1111111111111111111");
        $.get("http://localhost:8090/getByuser_id?user_id=" + user_id, function (data) {
            sessionStorage.obj = JSON.stringify(data);

        })
    })

}

layui.use('element', function(){
    var element = layui.element;

});