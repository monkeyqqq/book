//用户注册
$("#fileName").bind('input propertychange',function(){
    User_register();  });
function User_register(){

    var R_user_name = $('#R_user_name').val();
    var R_user_password = $('#R_user_password').val();
    var R_user_email = $('#R_user_email').val();
    var imginfo = document.getElementById("showimg");
    var file = $('#fileName').get(0).files[0];
    var form = new FormData();
    form.append('file',file);
    //var index=0;

    // if(index == 1 ){
    $.ajax({
        type:"post",
        url:"http://localhost:8090/fileUpload",
        data:form,
        contentType:false,
        mimeType:"multipart/form-data",
        processData:false,
        success:function (res) {
            //console.log(res);


            var photo_href= "<img src=\"/image/"+res+ "\" style=\"width:50px; height:50px; border-radius:50%; \"/>"

            imginfo.innerHTML= photo_href;

            if(R_user_name!=''&&R_user_password!=''&&R_user_email!=''){
            $.get("http://localhost:8090/UserRegister?user_name="+R_user_name+"&user_password=" + R_user_password + "&user_email=" + R_user_email + "&user_photo=" + res,function (data) {
                console.log(data);

                window.location.href = '../view/login.html';

            })
            }
        },
        error:function () {
            alert("请求失败。")
        }
    })

    // }



}
//shangchuanwenjian
function Upload_file(){

    var file = $('#fileName').get(0).files[0];
    var form = new FormData();
    form.append('file',file);


    $.ajax({
        type:"post",
        url:"http://localhost:8090/fileUpload",
        data:form,
        contentType:false,
        mimeType:"multipart/form-data",
        processData:false,
        success:function (res) {
            //console.log(res)
        },
        error:function () {
            alert("请求失败。")
        }
    })

}
//
// $("#R_user_name").bind('input propertychange',function(){
//     check_user_name();  });
$("#R_user_name").blur(function () {
    check_user_name();
})

function check_user_name(){
    var R_user_name = $('#R_user_name').val();
    var register_info = document.getElementById("fail_info");
    $.get("http://localhost:8090/checkByuser_name?user_name="+R_user_name,function (data) {
       // console.log(data);
        if(data!=null && data!=''){
            $('#show_register_info').show(500);
            register_info.innerText="用户名已存在！"
        }
        else{
            $('#show_register_info').hide(500);
        }
    })

}
function hide_register_info() {
    $('#show_register_info').hide(500);
}