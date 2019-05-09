function make_deal() {
    var book_id=location.href.split('=')[1];
    if(book_id.indexOf("/") == -1) {
        $.get("http://localhost:8090/getByNum?num=" + book_id, function (data) {
            var book_str="<div class='book_deal_div'><div class='zf_book_num_div'>图书编号："+data.num+"</div><div class='zf_book_photo_div'><img src='../bookimage/"+data.book_photo.split('/')[0]+"' width='100px',height='100px'></div><div class='zf_book_name_div'>图书名称："+data.book_name+"</div><span class='zf_book_price_d_div'>单价：</span><div class='zf_book_price_div' id='price_"+data.num+"'>"+data.price+"</div><span class='zf_book_price_y_div'>元</span></div><div class='buy_book_num_input'><span>数量：</span><input  id='num/"+data.num+"' type='number' value=\"1\" min=\"1\"  style='height: 100px;width: 50px;'/></div>";
            $("#book_deal").append(book_str);
        })
    }
    else {
        var book_length = book_id.split('/').length;
        for(var i=0;i<book_length-1;i++){
            $.get("http://localhost:8090/getByNum?num=" + book_id.split('/')[i], function (data) {
                var book_str="<div class='book_deal_div'><div class='zf_book_num_div'>图书编号："+data.num+"</div><div class='zf_book_photo_div'><img src='../bookimage/"+data.book_photo.split('/')[0]+"' width='100px',height='100px'></div><div class='zf_book_name_div'>图书名称："+data.book_name+"</div><span class='zf_book_price_d_div'>单价：</span><div class='zf_book_price_div' id='price_"+data.num+"'>"+data.price+"</div><span class='zf_book_price_y_div'>元</span></div><div class='buy_book_num_input'><span>数量：</span><input  id='num/"+data.num+"' type='number' value=\"1\" min=\"1\"  style='height: 100px;width: 50px;'/></div>";
                $("#book_deal").append(book_str);
            })
        }
    }
}

function pay_for() {

    var list=document.getElementById("book_deal").getElementsByTagName("input");
    var total_price=0;
    console.log(list.length);
    var adress = $("#adress_input").val();
    var name = $("#book_buyer_name").val();
    var phone_number = $("#book_buyer_number").val();
    if(adress!=null&&adress!=''&&name!=null&&name!=''&&phone_number!=null&&phone_number!=''){
    for(var i=0;i<list.length && list[i];i++)
    {

        var number=list[i].value;
        console.log(number);
        var id=list[i].id;
        var Book_num =  id.split('/')[1];
        var book_num = Number(Book_num);
        var book_price =Number($("#price_"+book_num).text());
       // var book_price = $("#"+book_num);

        total_price+=number*book_price;

    }

    alert("总计共"+total_price+"元");
    }
    else if(name==null||name==''){
        alert("收货人姓名不能为空！");
    }
    else if(phone_number==null||phone_number==''){
        alert("手机号不能为空！");
    }
    else if(adress==null||adress==''){
        alert("收货地址不能为空！");
    }

}