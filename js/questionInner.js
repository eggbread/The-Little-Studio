var index;
var jsonfile;
window.onload = function(){
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
  //json 저장
  $.post("./php/question.php",{
    action:"load"
  },function(data){
    jsonfile=JSON.parse(data);
  });
  
  //해당 위치에 데이터 출력
  $.post("./php/question.php",{
    action:"index"
  },function(data){
    $('.m_title h1').html(jsonfile[data].title);
    $('.m_title span').html(jsonfile[data].time);
    $('.m_body').html(jsonfile[data].content);
  });
}
