function show_psychology_info() {
    var article_id=location.href.split('=')[1];
    $.get("http://localhost:8090/getByarticle_id?article_id="+article_id,function (data) {
        $.get("http://localhost:8090/getByuser_id?user_id="+data.author_id,function (data) {
            console.log(data.psychology_link);
            $("#psychology_link").append(data.psychology_link);
        })
    })
}