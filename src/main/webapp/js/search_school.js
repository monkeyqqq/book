function Search_school() {
    var school_name=$('#search_school').val();
    document.getElementById("no_search_school").innerHTML = "";
    if(school_name!=null&&school_name!=''){
    $.get("http://localhost:8090/getByschool_name?school_name="+school_name,function (data) {
        if(data!=''){
            window.location.href = "showarticle.html?school_name="+encodeURI(school_name)+"&page=1";
            //window.location.href = 'showarticle.html?school_name='+school_name;
        }
        else {
            $('#no_search_school').show(500);
            var creat_href="<div>暂无此讨论区</div><button id=\"create_school\" onclick=\"hide_Create_area()\">点击创建</button>";
            $('#no_search_school').append(creat_href);
        }
    })
    }
}

function hide_Create_area() {
    var school_name=$('#search_school').val();

    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);
    var create_author = user_data.user_name;

    $.get("http://localhost:8090/Create_disscussByname?school_name="+school_name+"&create_author="+create_author,function (data) {
        $('#no_search_school').hide(500);
        window.location.href = "showarticle.html?school_name="+encodeURI(school_name)+"&page=1";
    })

}

layui.use('element', function(){
    var element = layui.element;

});