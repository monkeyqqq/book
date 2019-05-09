function show_book_car() {
    //$("#gouwucar_div").show(500);
    document.getElementById("gouwucar_div").innerHTML = "";
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var user_book = user_data.user_book;
    if(user_book!=null&&user_book!=''){
        var book_length = user_book.split('/').length;
        for(var i=0;i<book_length-1;i++){

            $.get("http://localhost:8090/getByNum?num=" + user_book.split('/')[i], function (data) {
                var book_info = "<a href='book_info.html?book_info.html?book_id="+data.num+"'><div class='gouwucar_book'><div class='search_book_num_c'>图书编号：" + data.num + "</div><div class='search_book_photo_c'><img src='../bookimage/"+data.book_photo.split('/')[0]+"' width='150px' height='180px'></div><div class='search_book_name_c'>图书名称："+data.book_name+"</div><div class='search_book_price_c'>单价："+data.price+"元</div> <div class=\"layui-input-block\" style='margin-left: 170px;margin-top: -30px;'><input id='Buy/"+data.num+"' type=\"checkbox\" name=\"购买\" title=\"购买\" lay-skin=\"primary\" value=\"1\" ></div> </div>  </a>"
                $("#gouwucar_div").append(book_info);
            })
        }
    }
    else {
        $("#gouwucar_div").append("购物车为空！")
    }

}
function clear_book() {
    var user_new_book ="";
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var author_id = user_data.user_id;
    $.get("http://localhost:8090/Update_book?user_book="+user_new_book+"&user_id="+author_id,function (data) {
        console.log(data);
        $.get("http://localhost:8090/getByuser_id?user_id=" + author_id, function (data) {
            sessionStorage.obj = JSON.stringify(data);

        })
    })
}

function jiesuan() {
    var book_id = location.href.split('=')[1];
    var list=document.getElementsByTagName("input");

    var strData="";
    //对表单中所有的input进行遍历
    for(var i=0;i<list.length && list[i];i++)
    {
       console.log(list[i].checked);
        if(list[i].type=="checkbox"&&list[i].checked ==true)
        {
            strData +=list[i].id.split('/')[1]+"/";
            console.log(strData);
        }
    }
    if(strData!=null&&strData!=''){
    window.location.href = "buybook.html?book_id="+strData;
    }
}