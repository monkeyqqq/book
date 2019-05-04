function getVideo(){
    var avid = $('#Search_video').val();
    var key_word = $('#Search_video').val();
    //var numval = parseInt(num);
    $.get("http://localhost:8090/getByAvid?avid=" + avid, function (data) {
        console.log(data);
        var Booktra = data.avid;
        var video_href= "<iframe src=\"//player.bilibili.com/player.html?aid=" + Booktra + "&cid=31621681&page=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\" width=\"480\" height=\"350\">" + "</iframe>"
        var bookinfo = document.getElementById("video_info");
        bookinfo.innerHTML= video_href;
    })

}
