<?php
  $str = file_get_contents("../data/reservation.json");
  $file = json_decode($str,true);
  switch($_POST['action']){//action을 통하여 기능을 나눈다.
    case "init" : init();break;
    case "add" : add(); break;
  }
  function init(){//테이블 로드를 위해 json제공
    global $str;
    echo $str;
  }
  function add(){//예약이 실행되어 추가되는 데이터를 json에 추가한 후 다시 파일을 작성
    global $file;

    $file[(int)$_POST['present']][(int)$_POST['time']]['name']=$_POST['name'];
    $outfile = json_encode($file);
    $result=file_put_contents("../data/reservation.json",$outfile);
    echo $outfile;
  }
 ?>
