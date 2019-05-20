var self_user;
window.onload = function(){
    self_user=this;
    this.Show_user();
    $("#user_photo_info").show(1000);
    $("#user_name_info").show(1000);
    $("#welcome_information").show(1000);
}
function Show_user(){
    var str = sessionStorage.obj;
    if(str==null){
        window.location.href="login.html";
    }else {

        var user_data = $.parseJSON(str);
        var user_photo_info = user_data.user_photo;
        var photo_href= "<a href=\"userinfo.html\"><img src=\"/image/"+user_photo_info+ "\" style=\"width:60px; height:60px; border-radius:50%; \"/></a>"

        var bookinfo = document.getElementById("user_photo_info");
        bookinfo.innerHTML= photo_href;




        var user_name=user_data.user_name;
        var user_name_info = document.getElementById("user_name_info");
        user_name_info.innerText=user_name;



    }
}
