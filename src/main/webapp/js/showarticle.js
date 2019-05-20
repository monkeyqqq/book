//查找文
var self_ ;
var key_word_null= $('#search_article').val();
window.onload = function(){
    self_=this;

    this.show_discuss_info();
    this.guanzhu();
    if(key_word_null!=null&&key_word_null!=''){
        // var school_name = decodeURI(location.href.split('=')[1].split('&')[0]);
        // window.location.href = "showarticle.html?school_name=" + encodeURI(school_name) +"&key_word="+key_word_null+ "&page=1";
        this.get_article();
    }
    else{
    this.Show_all_article();
    this.get_all_article_count();
    }

}

var page_number = 0;
function get_all_article_count() {
    var school_name=decodeURI(location.href.split('=')[1].split('&')[0]);
    $.get("http://localhost:8090/get_a_Byarticle_from?article_from="+school_name,function (data) {
        console.log(data);
        page_number=Math.ceil(data/10);
    })

}




function get_article() {
     $("#next_page_btu").hide();
    $("#up_page_btu").hide();
    var key_word = $('#search_article').val();
    var school_name_q = decodeURI(location.href.split('=')[1].split('&')[0]);

    document.getElementById("article_info").innerHTML = "";
    //console.log(key_word);
    //console.log(school_name_q);
    if(key_word!=null&& key_word!="") {
        $.get("http://localhost:8090/getByarticle_key_word?article_keyword=" + key_word + "&article_from=" + school_name_q, function (data) {
            // console.log(data);
            //sessionStorage.obj = JSON.stringify(data);
            //         //文章题目
            //
            //         //文章标签显示
            for (var i = 0; i < data.length; i++) {
                var article_id = data[i].article_id;
                var article_href = " <div class='article_href_div'>  <a href=\"articecontent.html?article_id=" + article_id + "\">\n" +
                    "        <div class='article_title' id=\"article_title" + article_id + "\">"+data[i].article_title+"</div>\n" +
                    "        <div class='article_summary' id=\"article_content" + article_id + "\">"+data[i].article_summary+"</div>\n" +
                    "    </a><div class='article_create_div'>发布于:"+data[i].article_created+"</div></div> <br><br>"
                // var article_id_info = document.getElementById("article_info");
                // article_id_info.innerHTML= article_href;
                $('#article_info').append(article_href);

                // //文章标题和内容显示
                // var article_title = data[i].article_title;
                // var article_title_info = document.getElementById("article_title" + article_id);
                // article_title_info.innerText = article_title;
                // //文章内容
                // var article_summary = data[i].article_summary;
                // //console.log(article_summary);
                // var article_summary_info = document.getElementById("article_content" + article_id);
                // article_summary_info.innerText = article_summary;
            }


        })
    }

}

function show_discuss_info() {

    var school_name=decodeURI(location.href.split('=')[1].split('&')[0]);
    //console.log(school_name);
    $.get("http://localhost:8090/getByschool_name?school_name="+school_name,function (data) {
    //console.log(data);
    var discuss_name = data.school_name;
    var name_info =document.getElementById("school_name_info");
    name_info.innerText=discuss_name;

    var discuss_created = data.school_created;
    var created_info =document.getElementById("school_created_info");
    created_info.innerText=discuss_created;
    $.get("http://localhost:8090/get_a_Byarticle_from?article_from="+school_name,function (data) {
        //console.log(data);
        var article_count = data;
        var article_count_info=document.getElementById("school_article_count");
        article_count_info.innerText=article_count;
    })
    })
}

function Show_all_article() {
    var school_name=decodeURI(location.href.split('=')[1].split('&')[0]);
    var page_num = location.href.split('=')[2];
    var start = (page_num -1 )*10;
    var number = 10;
    $.get("http://localhost:8090/get_article_Byarticle_from?article_from="+school_name+"&start="+start+"&number="+number,function (data) {
        // for (var i = 0; i < data.length; i++) {
        //     var article_id = data[i].article_id;
        //     var article_href = " <div class='article_href_div'>  <a href=\"articecontent.html?article_id=" + article_id + "\">\n" +
        //         "        <div id=\"article_title" + article_id + "\"></div>\n" +
        //         "        <div id=\"article_content" + article_id + "\"></div>\n" +
        //         "    </a></div> "
        //
        //     $('#article_info').append(article_href);
        //
        //     var article_title = data[i].article_title;
        //     var article_title_info = document.getElementById("article_title" + article_id);
        //     article_title_info.innerText = article_title;
        //     //文章内容
        //     var article_summary = data[i].article_summary;
        //     //console.log(article_summary);
        //     var article_summary_info = document.getElementById("article_content" + article_id);
        //     article_summary_info.innerText = article_summary;
        // }
        console.log(data);
        show_article_data(data);

    })
}


function show_article_data(data) {

    for (var i = 0; i < data.length; i++) {
        if (i < data.length) {
            var article_id = data[i].article_id;
            var article_href = " <div class='article_href_div'>  <a href=\"articecontent.html?article_id=" + article_id + "\">\n" +
                "        <div class='article_title' id=\"article_title" + article_id + "\">"+data[i].article_title+"</div>\n" +
                "        <div class='article_summary' id=\"article_content" + article_id + "\">"+data[i].article_summary+"</div>\n" +
                "    </a><div class='article_create_div'>发布于:"+data[i].article_created+"</div></div> <br><br> "

            $('#article_info').append(article_href);

            // var article_title = data[i].article_title;
            // var article_title_info = document.getElementById("article_title" + article_id);
            // article_title_info.innerText = article_title;
            // //文章内容
            // var article_summary = data[i].article_summary;
            // //console.log(article_summary);
            // var article_summary_info = document.getElementById("article_content" + article_id);
            // article_summary_info.innerText = article_summary;
        }
        else{
            break;
        }
    }
}

function up_page() {
    var school_name = decodeURI(location.href.split('=')[1].split('&')[0]);
    var page_num = location.href.split('=')[2];
    var new_page_num = Number(page_num) - 1;
    if(new_page_num>=1){
        window.location.href = "showarticle.html?school_name=" + encodeURI(school_name) + "&page=" + new_page_num;
    }
}
function next_page() {
    var school_name = decodeURI(location.href.split('=')[1].split('&')[0]);
    var page_num = location.href.split('=')[2];
    var new_page_num = Number(page_num) + 1;
    if (new_page_num <= page_number) {
        window.location.href = "showarticle.html?school_name=" + encodeURI(school_name) + "&page=" + new_page_num;
    }
}

function show_create_article() {
    var school_name_i = $('#school_name_info').text();
    //console.log(school_name_i);
    window.location.href = 'articlecreate.html?school_name='+encodeURI(school_name_i);
}

function guanzhu(){
    var school_name=decodeURI(location.href.split('=')[1].split('&')[0]);
    //console.log(school_name);
    var  guanzhu_info=document.getElementById("guanzhu_btn");
    guanzhu_info.innerHTML='';
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var guanzhu_name=user_data.user_links;
    console.log(guanzhu_name);
    if(guanzhu_name!=null&&guanzhu_name!=''){
    var guanzhu_count=guanzhu_name.split('/').length;
    //console.log(guanzhu_count);
    for(var i=0;i<=guanzhu_count;i++){
        //console.log(guanzhu_name.split("/")[i]);
        if(school_name == guanzhu_name.split("/")[i]){
            guanzhu_info.innerHTML="<button class=\"layui-btn layui-btn-mini layui-btn-radius layui-btn-disabled\">已关注</button>";
            break;
        }
        else if(i == guanzhu_count){
            guanzhu_info.innerHTML="<button class=\"layui-btn layui-btn-radius layui-btn-normal\" onclick=\"guanzhu_up()\">关注</button>";
        }
    }
    }
    else{
        guanzhu_info.innerHTML="<button class=\"layui-btn layui-btn-radius layui-btn-normal\" onclick=\"guanzhu_up()\">关注</button>";

    }
}

function guanzhu_up(){
    var school_name=decodeURI(location.href.split('=')[1].split('&')[0]);
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var user_id = user_data.user_id;
    var guanzhu_name=user_data.user_links;
    var up_guanzhu=0;
    if(guanzhu_name!=null&&guanzhu_name!=''){
        up_guanzhu = guanzhu_name +school_name+"/";
    }
    else {
         up_guanzhu = school_name+"/";
    }
    $.get("http://localhost:8090/Update_links?user_id="+user_id+"&user_links="+up_guanzhu,function (data) {
        //console.log("1111111111111111111");
        $.get("http://localhost:8090/getByuser_id?user_id=" + user_id, function (data) {
            sessionStorage.obj = JSON.stringify(data);

        })
    })
    window.location.reload();
}

layui.use('element', function(){
    var element = layui.element;

});