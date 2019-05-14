var self_b ;
var b_key_word_null=decodeURI( location.href.split('=')[1].split('&')[0]);
window.onload = function() {
    self_b = this;

    var key_word = location.href.split('=')[1];

    if (key_word == 1 ) {

        this.get_random_book();
        $("#book_button_div").hide(500);
    }
    else {
        if(b_key_word_null!=null&&b_key_word_null!='') {

            this.get_Book();
            this.get_book_number_by_keyword();
            $("#book_button_div").show(500);
        }

    }
}

function get_random_book() {
    var str_ = "";//定义用于拼接的字符串
    //document.getElementById("search_results").innerHTML = "";
    for(var i=1;i<=6;i++){

        $.get("http://localhost:8090/getByNum?num=" + i, function (data) {
            str_ = "<a href=\"book_info.html?book_id="+data.num+"\"><div class='book_info_div'><div class='search_book_num'>图书编号：" + data.num + "</div><div class='search_book_photo'><img src='../bookimage/"+data.book_photo.split('/')[0]+"' width='150px' height='180px'></div><div class='search_book_name'>图书名称：" + data.book_name + "</div><div class='search_book_price'>单价：" + data.price + "元</div></div></a>";//追加到table中
            $("#search_results").append(str_);
        })
    }
}


function showData(data) {
    var str = "";//定义用于拼接的字符串
    document.getElementById("search_results").innerHTML = "";
    var book_page=location.href.split('=')[2];
    for (var i = 0; i <data.length ; i++) {
        //拼接表格的行和列
        str = "<a href=\"book_info.html?book_id="+data[i].num+"\"><div class='book_info_div'><div class='search_book_num'>图书编号：" + data[i].num + "</div><div class='search_book_photo'><img src='../bookimage/"+data[i].book_photo.split('/')[0]+"' width='150px' height='180px'></div><div class='search_book_name'>图书名称：" + data[i].book_name + "</div><div class='search_book_price'>单价：" + data[i].price + "元</div></div></a>";//追加到table中
        $("#search_results").append(str);
    }
}
var book_page_number=0;

function get_book_number_by_keyword() {
        var book_name = decodeURI(location.href.split('=')[1].split('&')[0]);
        console.log(book_name);
        $.get("http://localhost:8090/get_num_Bybookname?book_name="+book_name,function (data) {
        console.log(data);
        book_page_number=Math.ceil(data/6);
    })
}

function search_button_action() {
    var key_word_info = $('#search_book_input').val();
    if(key_word_info!=null&&key_word_info!='') {
        window.location.href = "book.html?key_word=" + encodeURI(key_word_info) + "&page=1";
        //var key_word = decodeURI(location.href.split('=')[1].split('&')[0]);

        get_Book();
    }
}
function get_Book(){
    var num = decodeURI(location.href.split('=')[1].split('&')[0]);

    $("#search_book_input").val(num);
    console.log(num);
    //var numval = parseInt(num);
    var page_num = location.href.split('=')[2];
    var start = (page_num-1)*6;
    $("#book_button_div").show(500);
    if(num!=null&&num!=''){
    //if(isNaN(numval)) {
        $.get("http://localhost:8090/getByBook_name?book_name=" + num+"&start="+start, function (data) {
           if(data.length==0){
               $("#search_results").append("暂无搜索结果！");
           }
           else {
            console.log(data);
            showData(data);
           }
            //var Booktra = data.book_name;
            // var bookinfo = document.getElementById("bookinfo");
            //bookinfo.innerText = Booktra;
        })
    // }
    // else{
    //
    //     $.get("http://localhost:8090/getByNum?num=" + num, function (data) {
    //         console.log(data);
    //         var Booktra = data.book_name;
    //         var bookinfo = document.getElementById("search_results");
    //         bookinfo.innerText = Booktra;
    //     })


    //}
    }
}

function up_book_page() {
    var page_num = location.href.split('=')[2];
    page_num=Number(page_num) - 1;
    var key_word_info = decodeURI(location.href.split('=')[1].split('&')[0]);
    if(page_num>=1){
        window.location.href = "book.html?key_word="+encodeURI(key_word_info)+"&page="+page_num;
    }
}
    function next_book_page(){
        var key_word_info = decodeURI(location.href.split('=')[1].split('&')[0]);
        var page_num = location.href.split('=')[2];
        page_num=Number(page_num) + 1;
        if(page_num<=book_page_number){
            window.location.href = "book.html?key_word="+encodeURI(key_word_info)+"&page="+page_num;

        }
    }
