<?php
  session_start();
  switch($_POST['action']){
    case 'checklogin' : checklogin();break;
    case 'logout' : logout();break;
  }
  function checklogin(){//로그인됐는지 확인 0이면 로그인 안된 상태
    echo $_SESSION['islogin'];
  }
  function logout(){//0으로 바꿔 로그아웃 구현
    $_SESSION['islogin']=0;
    echo $_SESSION['islogin'];
  }
 ?>
