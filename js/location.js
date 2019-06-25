
function initMap() {//구글 맵 생성
var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.594433, lng: 126.664598},
    zoom: 17
  });
  var marker = new google.maps.Marker({
    position: {lat: 37.594433, lng: 126.664598},
    map:map,
    title:"Hello World!"
  });
}
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
  $('#logout').click(function(){//로그아웃 할 때
  $.post("./php/main.php",{
    action:"logout"
  },function(data){
    $('.login').css('display','block');
    $('.logout').css('display','none');
  });
});
