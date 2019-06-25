<?php
  $person = fopen("../data/userdata.txt","a+");
  $id = $_POST["name"];
  $pwd = $_POST["password"];
  if(empty($id)||empty($pwd)){
        echo "Please enter Id or Password!";
    }else{//파일을 읽어와 순서대로 검사한 후
      $found=false;
      $idfound = false;
      $pwdfound = false;
      while(!feof($person)){
        $line = fgets($person);
        $data = explode("|",$line);

        if($data[0]===$id&&$data[1]===$pwd){
          $found=true;
        }else if($data[0]===$id){
            $idfound=true;
        }else if($data[1]===$pwd){
            $pwdfound=true;
        }
      }
      fclose($person);
      if($found){//문제가 없다면 로그인에 해당하는 세션을 변경
        session_start();
        $_SESSION['islogin']=$id;
        echo $_SESSION['islogin'];
      }else{
        if($idfound){
          echo "Password is wrong!";
        }else{
          echo "This is not exist Id!";
        }
      }
    }


 ?>
