
function showData(data) {
    var str = "";//定义用于拼接的字符串
    document.getElementById("search_results").innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        //拼接表格的行和列
        str = "<div>" + data[i].num + "</div><div>" + data[i].book_name + "</div><div>" + data[i].price + "</div>";//追加到table中
        $("#search_results").append(str);
    }
}


function get_Book(){
    var num = $('#search_book_input').val();

    var numval = parseInt(num);

    if(isNaN(numval)) {
        $.get("http://localhost:8090/getByBook_name?book_name=" + num, function (data) {
            console.log(data);
            showData(data);
            //var Booktra = data.book_name;
            // var bookinfo = document.getElementById("bookinfo");
            //bookinfo.innerText = Booktra;
        })
    }
    else{

        $.get("http://localhost:8090/getByNum?num=" + num, function (data) {
            console.log(data);
            var Booktra = data.book_name;
            var bookinfo = document.getElementById("search_results");
            bookinfo.innerText = Booktra;
        })


    }
}
