var selg_ps;
var key_word_null= $('#search_psychology_article').val();
window.onload = function() {
    selg_ps=this;
    var str = sessionStorage.obj;
    var user_data = $.parseJSON(str);

    if(user_data.user_role=="psychology"){
       $("#psychology_create").show(500);
    }

    if(key_word_null!=null&&key_word_null!=''){
        // var school_name = decodeURI(location.href.split('=')[1].split('&')[0]);
        // window.location.href = "showarticle.html?school_name=" + encodeURI(school_name) +"&key_word="+key_word_null+ "&page=1";

        this.get_psychology_article();

    }
    else{
        this.get_psychology_num();
        this.Show_all_psychology_article();

    }

}

function show_pschology_create_article() {
    window.location.href = 'articlecreate.html?article_from=psychology';
}


function get_psychology_article() {
    $("#ps_next_page_btu").hide();
    $("#ps_up_page_btu").hide();
    var key_word = $('#search_psychology_article').val();
    var article_from ="psychology";

    document.getElementById("psychology_article_info").innerHTML = "";
    if(key_word!=null&& key_word!="") {
        $.get("http://localhost:8090/getByarticle_key_word?article_keyword=" + key_word + "&article_from=" + article_from, function (data) {

            for (var i = 0; i < data.length; i++) {
                var article_id = data[i].article_id;
                var article_href = " <div class='article_href_div'>  <a href=\"psychology_content.html?article_id=" + article_id + "\">\n" +
                    "        <div class='article_title' id=\"article_title" + article_id + "\">"+data[i].article_title+"</div>\n" +
                    "        <div class='article_summary' id=\"article_content" + article_id + "\">"+data[i].article_summary+"</div>\n" +
                    "    </a><div class='article_create_div'>发布于:"+data[i].article_created+"</div></div> <br><br>"

                $('#psychology_article_info').append(article_href);


            }


        })
    }
}

var psychology_page_number = 0;


function get_psychology_num() {
    var article_from_p="psychology";
    $.get("http://localhost:8090/get_a_Byarticle_from?article_from="+article_from_p,function (data) {
        psychology_page_number=Math.ceil(data/5);
    })
}


function Show_all_psychology_article() {
    var article_from_="psychology";
    var page_num_ps = location.href.split('=')[1];
    var number = 5;
    var start = (page_num_ps -1 )*5;
    $.get("http://localhost:8090/get_article_Byarticle_from?article_from="+article_from_+"&start="+start+"&number="+number,function (data) {
        show_article_data(data);
    })
}


function show_article_data(data) {

        for (var i = 0; i < data.length; i++) {
            if (i < data.length) {
                var article_id = data[i].article_id;
                var article_href = " <div class='article_href_div'>  <a href=\"psychology_content.html?article_id=" + article_id + "\">\n" +
                    "        <div class='article_title' id=\"article_title" + article_id + "\">"+data[i].article_title+"</div>\n" +
                    "        <div class='article_summary' id=\"article_content" + article_id + "\">"+data[i].article_summary+"</div>\n" +
                    "    </a><div class='article_create_div'>发布于:"+data[i].article_created+"</div></div> <br><br><br>"

                $('#psychology_article_info').append(article_href);


            }
            else{
                break;
            }
        }
}

function ps_up_page() {
    var page_num = location.href.split('=')[1];
    var new_page_num = Number(page_num) - 1;
    if(new_page_num>=1){
        window.location.href = "psychology.html?page=" + new_page_num;
    }
}

function ps_next_page() {
    var page_num = location.href.split('=')[1];
    var new_page_num = Number(page_num) + 1;
    if (new_page_num <= psychology_page_number) {
        window.location.href = "psychology.html?page=" + new_page_num;
    }
}