var is_login;
(function($) {
  $('#login-box').fadeIn(2000);
  $('#forgot').on('click', function(e){
	  e.preventDefault();
	  $('#login-box').fadeOut(1000);
    $('#forgot-box').delay(1005).fadeIn(2000);
  });
  $('#login').on('click', function(e){
	  e.preventDefault();
	  $('#forgot-box').fadeOut(1000);
    $('#login-box').delay(1005).fadeIn(2000);
  });
});
setInterval(function () {//1초단위로 시간갱신
  var nowTime=new Date();
    document.getElementById('clock').value = nowTime;
}, 1000);
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
}
$('#logout').click(function(){
  $.post("./php/main.php",{
    action:"logout"
  },function(data){
    $('.login').css('display','block');
    $('.logout').css('display','none');
  });
});
