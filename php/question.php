<?php
  session_start();
  $file = file_get_contents("../data/boardpost.json");
  switch($_POST['action']){//action을 통하여 기능을 나눈다.
    case 'count' : countPost();break;
    case 'data' : dataPost();break;
    case 'post' : post();break;
    case 'load' : load();break;
    case 'setname' : setname();break;
    case 'index' : index();break;
  }
  function index(){//저장한 index를 반환
    echo $_SESSION['post'];
  }
  function setname(){//게시글의 내용을 받기 위해 클릭된 게시글의 index를 저장
    $_SESSION['post']=$_POST['index'];
  }
  function countPost(){//몇개의 테이블이 필요한지
    global $file;
    $fp = json_decode($file,true);
    echo count($fp);
  }
  function dataPost(){//json반환
    global $file;
    echo $file;
  }
  function post(){
    //입력받은 데이터와 현재 시각을 기준으로 json 수정
    $temp = $_POST['content'];
    $outfile = json_decode($temp);
    $outfile->time=date('Y-m-d');
    global $file;
    $fp = json_decode($file,true);
    array_push($fp,$outfile);
    $json = json_encode($fp);
    $result=file_put_contents("../data/boardpost.json",$json);
    if(!$result){
      echo "저장에 실패했습니다.";
    }else{
      echo "저장되었습니다.";
    }
  }
  function load(){//size만큼 만들어진 테이블에 내용을 넣기 위해
    global $file;
    $fp = json_encode($file);
    echo $file;
  }
 ?>
