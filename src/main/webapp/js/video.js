var self_ ;
var v_key_word_null=decodeURI( location.href.split('=')[1].split('&')[0]);
window.onload = function(){
    self_=this;
    var key_word = location.href.split('=')[1];
    if (key_word == 1 ) {

        this.get_random_video();
        $("#video_button_div").hide(500);
    }
    else {
       if(v_key_word_null!=null&&v_key_word_null!=''){
        this.getVideo();
        $("#video_button_div").show(500);

       }

    }

}
var video_page_number=0;
function search_video_button_action() {
    var key_word_info = $('#Search_video').val();
    if(key_word_info!=null&&key_word_info!=''){
    window.location.href = "video.html?key_word="+encodeURI(key_word_info)+"&page=1";
    getVideo();
    }
}

function getVideo(){

    var key_word = decodeURI(location.href.split('=')[1].split('&')[0]);
    $("#Search_video").val(key_word);
    $.get("http://localhost:8090/getvideo_ByKey_word?key_word=" + key_word, function (data) {
        //console.log(data);
        if(data.length==0){
            $("#video_info").append("暂无搜索结果！");
        }
        else {
        video_page_number = Math.ceil(data.length/8);
        console.log(video_page_number);
        show_video_data(data);
        }
        // var Booktra = data.avid;
        // var video_href= "<div><iframe src=\"http://player.bilibili.com/player.html?aid=" + Booktra + "&cid=31621681&page=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\" width=\"480\" height=\"350\">" + "</iframe></div>"
        // $("#video_info").append(video_href);
    })

}
function show_video_data(data) {
    var video_href = "";//定义用于拼接的字符串
    document.getElementById("video_info").innerHTML="";
    var video_page=location.href.split('=')[2];
    for(var i=(video_page-1)*8;i<video_page*8&&data[i];i++){

       video_href= "<a href='videoplay.html?mvid="+data[i].video_id+"'><div class='search_video_div' style='background-image: url(../videoimage/"+data[i].video_photo+");background-size:100% 100%;'><div class='video_key_word_div'>"+data[i].key_word+"</div><div class='video_time_div'>时长："+data[i].video_time+"分钟</div></div></a>"
        $("#video_info").append(video_href);
    }
}


function get_random_video() {

    document.getElementById("video_info").innerHTML="";

    for(var i=2;i<=9;i++){

        $.get("http://localhost:8090/getByvid?video_id="+i,function (data) {
            var video_href= "<a href='videoplay.html?mvid="+data.video_id+"'><div class='search_video_div' style='background-image: url(../videoimage/"+data.video_photo+");background-size:100% 100%;'><div class='video_key_word_div'>"+data.key_word+"</div><div class='video_time_div'>时长："+data.video_time+"分钟</div></div></a>"
            $("#video_info").append(video_href);
        })
    }
}


function up_video_page() {
    var page_num = location.href.split('=')[2];
    page_num=Number(page_num) - 1;
    var key_word_info = decodeURI(location.href.split('=')[1].split('&')[0]);
    if(page_num>=1){
        window.location.href = "video.html?key_word="+encodeURI(key_word_info)+"&page="+page_num;
    }
}
function next_video_page(){
    var key_word_info = decodeURI(location.href.split('=')[1].split('&')[0]);
    var page_num = location.href.split('=')[2];
    page_num=Number(page_num) + 1;
    if(page_num<=video_page_number){
        window.location.href = "video.html?key_word="+encodeURI(key_word_info)+"&page="+page_num;

    }
}
