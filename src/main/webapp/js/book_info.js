function get_book_detail_info() {
    var book_id = location.href.split('=')[1];
    $.get("http://localhost:8090/getByNum?num=" + book_id, function (data) {
        console.log(data);
        var Booktra = data.book_name;
        var bookinfo = document.getElementById("book_name");
        bookinfo.innerText = Booktra;

        var book_introduction = data.book_introduction;
        var book_intro = document.getElementById("book_introduction");
        book_intro.innerText = book_introduction;

        var book_price =data.price;
        var book_price_info = document.getElementById("book_price");
        book_price_info.innerText=book_price;
    })
}