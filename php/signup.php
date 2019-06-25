<?php
  $person = fopen("../data/userdata.txt","a+");
  $id = $_POST["name"];
  $pwd = $_POST["password"];
  $phone = $_POST["phone"];

    $found = false;
    while(!feof($person)){//파일을 읽어 존재여부를 판단
      $line = fgets($person);
      $saveid = substr($line,0,strpos($line,"|"));
      if($saveid===$id){
        echo "이미 존재하는 아이디가 있습니다.";
        $found=true;
      }
    }
    if(!$found){//회원가입이 성공됐으므로 저장
      fwrite($person,$id."|".$pwd."|".$phone."\n");
      fclose($person);
      echo "성공적으로 저장되었습니다.";
    }
 ?>
