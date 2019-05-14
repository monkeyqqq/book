function get_book_detail_info() {
    var book_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getByNum?num=" + book_id, function (data) {
        console.log(data);
        var Booktra = data.book_name;
        var bookinfo = document.getElementById("book_name");
        bookinfo.innerText = Booktra;



        var book_price =data.price;
        var book_price_info = document.getElementById("book_price");
        book_price_info.innerText=book_price;


        var book_photo = data.book_photo;
        var book_photo_1 = book_photo.split('/')[0];
        var book_photo_2 = book_photo.split('/')[1];
        var book_photo_3 = book_photo.split('/')[2];

        var book_photo_1_info = document.getElementById("book_photo_1");
        book_photo_1_info.innerHTML="<img src='../bookimage/"+book_photo_1+"' width='300px' height='400px' />";

        var book_photo_2_info = document.getElementById("book_photo_2");
        book_photo_2_info.innerHTML="<img src='../bookimage/"+book_photo_2+"' width='300px' height='400px'  />";

        var book_photo_3_info = document.getElementById("book_photo_3");
        book_photo_3_info.innerHTML="<img src='../bookimage/"+book_photo_3+"' width='300px' height='400px'  />";


    })
}

var book_reply_layedit_c=0;
var book_reply_index =0;
layui.use('layedit', function(){
    book_reply_layedit_c = layui.layedit;

    book_reply_index = book_reply_layedit_c.build('book_comment_demo',
        {tool:['face'],height: 50, width: 200}

    );

});

function create_book_commnets() {
    var comment_content = book_reply_layedit_c.getContent(book_reply_index);


    var href_info=location.href;
    var book_id=href_info.split("=")[1];

    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    var author_name = user_data.user_name;
    var author_photo = user_data.user_photo;

    if(comment_content!=null&&comment_content!=''){
        $.post("http://localhost:8090/Create_book_comments",{"comment_content":comment_content,"book_id":book_id,"comment_author_id":author_id,"comment_author_name":author_name,"comment_author_photo":author_photo},function (data) {
            console.log(data);

        })
    }
    window.location.reload();
}

function get_book_commetns() {
    var book_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getBybook_Comments_article_id?book_id="+book_id,function (data) {
        show_book_comments(data);
    })
}

function show_book_comments(data) {
    var str_book = "";//定义用于拼接的字符串
    document.getElementById("book_comments_infomation").innerHTML = "";
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    for(var i=0;i<data.length;i++){
        if(data[i].comment_author_id==author_id){
            str_book = "<div class='book_comment_z_div'><div class='book_comment_photo_div'><a href='userinfo.html'><img src='../image/"+data[i].comment_author_photo+"' style=\"width:40px; height:40px; border-radius:50%; \"/></a></div><div class='book_comment_name_div'>"+data[i].comment_author_name+"</div><div class='book_comment_content_div'>："+data[i].comment_content+"</div><div class='book_comment_time_div'>时间："+data[i].comment_created+"</div></div>"
        }
        else {
            str_book = "<div class='book_comment_z_div'><div class='book_comment_photo_div'><a href='otheruser.html?user_id="+data[i].comment_author_id+"'><img src='../image/"+data[i].comment_author_photo+"' style=\"width:40px; height:40px; border-radius:50%; \"/></a></div><div class='book_comment_name_div'>"+data[i].comment_author_name+"</div><div class='book_comment_content_div'>："+data[i].comment_content+"</div><div class='book_comment_time_div'>时间："+data[i].comment_created+"</div></div>"
        }
        $("#book_comments_infomation").append(str_book);
    }
}

function put_book_in_car() {
    var book_id = location.href.split('=')[1];
    console.log(book_id);
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    var user_book = user_data.user_book;
    console.log(user_book);
    if(user_book!=null&&user_book!=''){
    var book_length = user_book.split("/").length;
    if(book_length>=7){
        alert("购物车已满！")

    }
    else {
        for (var i = 0; i < book_length; i++) {
            if (book_id == user_book.split("/")[i]) {
                alert("商品已存在！");
                break;
            }
            else if (i == book_length - 1) {
                var user_new_book = user_book + book_id + "/";
                console.log(user_new_book);
                $.get("http://localhost:8090/Update_book?user_book=" + user_new_book + "&user_id=" + author_id, function (data) {
                    console.log(data);
                    $.get("http://localhost:8090/getByuser_id?user_id=" + author_id, function (data) {
                        sessionStorage.obj = JSON.stringify(data);
                        alert("已加入购物车！");
                    })
                })
            }
        }
    }
    }
    else{
        var user_new_book =book_id+"/";
        $.get("http://localhost:8090/Update_book?user_book="+user_new_book+"&user_id="+author_id,function (data) {
            console.log(data);
            $.get("http://localhost:8090/getByuser_id?user_id=" + author_id, function (data) {
                sessionStorage.obj = JSON.stringify(data);

            })
        })
    }
}

function buy_Book() {
    var book_id = location.href.split('=')[1];
    window.location.href = "buybook.html?book_id="+book_id;
}
