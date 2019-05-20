

function User_login(){
    var user_name = $('#user_name').val();
    var user_password = $('#use_password').val();
    var login_info = document.getElementById("login_fail_info");
    $.get("http://localhost:8090/getByuser_name?user_name="+user_name+"&user_password=" + user_password,function (data) {
        //console.log(data);
        user_data = data;
        if(data== ''){
            $('#show_login_info').show(500);
            login_info.innerText="密码输入错误！"
            return;
        }
        else{

            sessionStorage.obj = JSON.stringify(data);


            var action = "l/"+data.user_id;
            $.get("http://localhost:8090/insert_log?user_id="+data.user_id+"&action="+action,function (data) {

            })
            window.location.href = 'http://localhost:8090/view/index.html';
        }


    })

}



// $("#user_name").bind('input propertychange',function(){
// //     login_check_user_name();
// // });

$("#user_name").blur(function () {
    login_check_user_name();
})


function login_check_user_name(){
    var R_user_name = $('#user_name').val();
    var login_info = document.getElementById("login_fail_info");
    if(R_user_name!=null && R_user_name!=''){
    $.get("http://localhost:8090/checkByuser_name?user_name="+R_user_name,function (data) {
        //console.log(data);
        if(data!=null && data!=''){
            $('#show_login_info').hide(500);
        }
        else{
            $('#show_login_info').show(500);
            login_info.innerText="用户名不存在！"
        }
    })
    }
}
function hide_login_info() {
    $('#show_login_info').hide(500);
}

