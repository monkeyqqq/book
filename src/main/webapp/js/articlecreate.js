$("#article_fileName").bind('input propertychange',function(){
    upload_article_img();  });



var layedit_c=0;
var index =0;
layui.use('layedit', function(){
     layedit_c = layui.layedit;
    layedit_c.set({
        uploadImage: {
            url: 'http://localhost:8090/fileUpload_lay'
            ,type: 'post' //默认post
        }
    });
     index = layedit_c.build('demo',{hideTool:['left', 'center', 'right']});

});




function upload_article_img() {
    var file = $('#article_fileName').get(0).files[0];

    // var article_imginfo = document.getElementById("article_c");
    // var Article_img_info = article_imginfo.innerHTML;
    var form = new FormData();
    form.append('file',file);
    $.ajax({
        type: "post",
        url: "http://localhost:8090/fileUpload_lay",
        data: form,
        contentType: false,
        mimeType: "multipart/form-data",
        processData: false,
        success: function (res) {
            console.log(res);

            var photo_href = "<img src=\"/image/" + res + "\" style=\"width:100px; height:100px;  \"/>"
            $('#article_c ').append(photo_href);
        },
        error:function () {
            alert("请求失败。")
        }

    })
}


function Create_article() {
    var id = $('#user_id_info').text();
    // var article_c = $('#article_c').val();
    // var school_href = location.href;
    // var school_name_l =school_href.split('=')[1];
    var school_name = decodeURI(location.href.split('=')[1]);
    console.log(school_name);
    var article_lay_c = layedit_c.getContent(index);
    console.log(article_lay_c);
    // var article_c = $('#article_c').html();

    // console.log(article_c);
    //var article_c = HTMLEncode(article_c_code);


    var article_s = $('#article_s').val();
    var article_t = $('#article_t').val();

    $.post("http://localhost:8090/Insert",{"article_title":article_t,"article_summary": article_s,"article_content" : article_lay_c,"author_id":id,"article_from":school_name},function (data) {
        console.log(data);
    })
    var bookinfo = document.getElementById("article_info");
    bookinfo.innerText = "发布成功";
}




layui.use('element', function(){
    var element = layui.element;

});