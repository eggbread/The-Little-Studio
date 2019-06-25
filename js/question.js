var jsonfile;
window.onload = function(){
  $.post("./php/question.php",{//테이블 수 요청
    action : "count"
  },function(data){
    for(var i =0;i<parseInt(data);i++){
      $('#postTable').append('<tr><td>'+i+'</td><td></td><td></td><td></td></tr>');
    }
  });
  $.post("./php/question.php",{//테이블에 넣을 테이터 요청
    action : "data"
  },function(data){

    jsonfile=JSON.parse(data);
    for(var i =0;i<$('#postTable tr').length;i++){
      $('#postTable').find('tr').eq(i).find('td').eq(1).append("<span class='opens' href='questionInner.html'>"+jsonfile[i].title+"</span>");
      $('#postTable').find('tr').eq(i).find('td').eq(2).html(jsonfile[i].writer);
      $('#postTable').find('tr').eq(i).find('td').eq(3).html(jsonfile[i].time);
  }
  });
  $.post("./php/main.php",{
    action : "checklogin"
  },function(data){
    if(data=="0"||data==""){//로그인 안됐을 때
      $('.login').css('display','block');
      $('.logout').css('display','none');
    }else{//로그인 됐을 때
      $('.loginUserName').html(data+"님  ");
      $('.login').css('display','none');
      $('.logout').css('display','block');
    }
  });

}
$('#write').click(function(){
  location.href="questionWrite.html";
});
function callback(){
  $('#postTable').find('tr').eq(i).find('td').eq(1).append("<span class='opens' href='questionInner.html'>"+jsonfile[i].title+"</span>");
  $('#postTable').find('tr').eq(i).find('td').eq(2).html(jsonfile[i].writer);
  $('#postTable').find('tr').eq(i).find('td').eq(3).html(jsonfile[i].time);
}
$('#postSubmit').click(function(){//게시글 작성후 json으로 변환한 후 서버로 전송

  var obj = new Object();
  obj.title = $('#postTitle').val();
  obj.writer = $('#postWriter').val();
  obj.content = $('#postArea').val();
  var jsonObj = JSON.stringify(obj);
  $.post("./php/question.php",{
    action:"post",
    content:jsonObj
  },function(data){
    location.href="question.html";
  });
});

$('#logout').click(function(){//로그아웃될때
  $.post("./php/main.php",{
    action:"logout"
  },function(data){
    $('.login').css('display','block');
    $('.logout').css('display','none');
  });
});
$(document).on('click', '.opens', function () {//제목이 클릭됐을 떄
    // your function here
    $.post("./php/question.php",{
        action:"setname",
        index:$(this).parent().parent().index()
      },function(){
        location.href="questionInner.html";
      });
});
