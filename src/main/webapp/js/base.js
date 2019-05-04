//用户显示
function Show_user(){
    var str = sessionStorage.obj;
    if(str==null){
        window.location.href="login.html";
    }else {

        var user_data = $.parseJSON(str);
        var user_photo_info = user_data.user_photo;
        var photo_href= "<a href=\"userinfo.html\"><img src=\"/image/"+user_photo_info+ "\" style=\"width:100px; height:100px; border-radius:50%; \"/></a>"
        console.log(photo_href);
        var bookinfo = document.getElementById("user_photo_info");
        bookinfo.innerHTML= photo_href;


        var user_id=user_data.user_id;
        var user_id_info = document.getElementById("user_id_info");
        user_id_info.innerText=user_id;


        var user_name=user_data.user_name;
        var user_name_info = document.getElementById("user_name_info");
        user_name_info.innerText=user_name;


        var user_password=user_data.user_password;
        var user_password_info = document.getElementById("user_password_info");
        user_password_info.innerText=user_password;
    }
}


layui.use('element', function(){
    var element = layui.element;

});