$(function() {
  // View the selected photo at full size
  $(".photo-image").click(function(){
    $(this).addClass("photo-selected");
    $(this).parent().addClass("photo-x");
    $("#overlay").show();
  });

  // Close the full size view when #overlay is clicked
  $("#overlay").click(function(){
    $(".photo-image").removeClass("photo-selected");
    $(".photo-x").removeClass("photo-x");
    $("#overlay").hide();
  });
});

// Close full size view if "esc"
$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    $(".photo-image").removeClass("photo-selected");
    $("#overlay").hide();
  }
});
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
