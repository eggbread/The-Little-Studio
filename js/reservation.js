var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var nowDay=today.getDate();
var firstDay = new Date(year, month, 1).getDay();
var lastDay = new Date(year,month+1,0).getDate();
var calendar=document.getElementById("calendar");
var schedule = new Array(lastDay);
var row=calendar.insertRow(2);
var jsonfile;

$.post("./php/reservation.php",{//현재 예약 현황을 보여주기 위해 해당 위치에 데이터 추가
  action:"init"
},function(data){
  jsonfile=JSON.parse(data);
  for(var i =0;i<=lastDay-nowDay;i++){
      document.getElementById(nowDay+i).appendChild(document.createElement('br'));
    var count=0;
    for(var j=10;j<15;j++){
      var text="";
      if(jsonfile[nowDay+i][j].name!=""){
        text+=j+"시 "+jsonfile[nowDay+i][j].name+"\n";
        document.getElementById(nowDay+i).appendChild(document.createTextNode(text));
        document.getElementById(nowDay+i).appendChild(document.createElement('br'));
      }
      if(j==11){
        j-=10;
      }
      if(j==5){
        j+=1;
      }
      if(j==7){
        break;
      }
    }
  }
});
for(i=1;i<=lastDay;i++){//테이블을 돌며 현재 일을 기준으로 css를 나눈다.
  var x=document.getElementsByTagName('td')[firstDay+i-1];
  x.id=i;
  var onday={
    time:0,task:0,count:0,shell:null
  };
  onday.shell=x;

  if(i<nowDay){
    x.style.background="#e3e4ea";
    onday.time=-1;
  }else if(i==nowDay){
    x.style.background="#96e4ff";
  }else{
    x.style.background="#FFC153";
  }

  schedule[i-1]=onday;
  var numDay = document.createElement("span");
  x.appendChild(numDay);
  numDay.appendChild(document.createTextNode(i));
  x.style.fontStyle="italic";
  x.style.fontSize="16px";
  x.style.textAlign="left";
  x.style.verticalAlign="top";
}

document.getElementById("year").innerHTML=year;
document.getElementById("month").innerHTML=month+1;
function double(index){
  $.post("./php/main.php",{//로그인 됐는지 확인
    action : "checklogin"
  },function(data){
    if(data=="0"||data==""){
      alert("로그인을 먼저 해주세요!");
      location.href="./reservation.html";
    }
  })
  var x=index;
  var y=schedule[x.id-1];
    if(x.id!=""){
      if(y.time!=-1){
        addSchedule(x.id);
      }
    }
  }
var modal = document.getElementById("myModal");
var modals = document.getElementById("myModalChange");
var cancel =  document.getElementById("cancelbtn");
var add = document.getElementById("addbtn");
var save = document.getElementById("savebtn");
var deletes = document.getElementById("deletebtn");
var present;

function addSchedule(index) {//더블 클릭했을 때 예약가능 시간을 알아보기위한 함수
  present=index;
  modal.style.display = "block";
  document.getElementById("day").innerHTML=index;
  $('#currentReservation').empty();
  $('#time').empty();
  for(var i=10;i<15;i++){
    if(jsonfile[index][i].name==""){
      $('#currentReservation').append("<li>"+i+"시 예약 가능합니다.</li>");
      $('#time').append("<option value="+i+">"+i+"시");
    }else{
      $('#currentReservation').append("<li>"+i+"시   "+jsonfile[index][i].name+"님</li>");
    }
    if(i==11){
      i-=10;
    }
    if(i==5){
      i+=1;
    }
    if(i==7){
      break;
    }
  }
}
var xbtn;
var h;
var modify;
add.onclick = function(){//예약을 확정하고 서버에게 데이터 전송
  var input=document.getElementById("text").value;
  var inputTime=document.getElementById("time").value;
  if(input==""){
    alert("일정을 입력해주세요!");
  }else{
    modal.style.display="none";
    var really = confirm(inputTime+"시로 예약하시겠습니까?");
    if(really){
    $.post("./php/reservation.php",{
      action:"add",
      name:input,
      time:inputTime,
      present:present
    },function(data){
      jsonfile=JSON.parse(data);
      alert("예약되었습니다.");
    });
    }
  }
}

cancel.onclick = function(){
  modal.style.display="none";
}

save.onclick = function(){
  modals.style.display="none";
 }

function times(){
  modals.style.display="block";
  var remonth;
  var reday;
  if(month<10){
     remonth = "0"+(month+1);
  }else{
    remonth=month+1;
  }
  if(h.parentNode.parentNode.id<10){
    reday="0"+tdparent.parentNode.id;
  }else{
    reday=tdparent.parentNode.id;
  }
  current=year+"-"+remonth+"-"+reday;
  document.getElementById("clickdate").value=current;
  document.getElementById("priority").value=indexThis;
}

var tdparent;
var indexThis;
var current;

function clickdatepicker(){
  var when = document.getElementById("clickdate").value;
  document.getElementById("priority").disabled=false;
  if(when!=current){
    document.getElementById("priority").disabled=true;
  }else{
    document.getElementById("priority").disabled=false;
  }
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
  if(event.target == modals){
      modals.style.display="none";

  }
  if(event.target.className=="Cxbtn"){
    document.getElementById("priority").disabled=false;
    tdparent=event.target.parentNode.parentNode;
    for(i=1;i<=tdparent.childElementCount;i++){
      if(tdparent.childNodes[i]==event.target.parentElement){
        indexThis=i;
        break;
      }
    }
    times();
  }
  if(event.target==deletes){
    tdparent.removeChild(tdparent.childNodes[indexThis]);
    modals.style.display="none";
  }

  var changeday;
  var changeMonth;

  if(event.target==save){
   var after = document.getElementById("priority").value;
   changeday=document.getElementById("clickdate").value[8]+document.getElementById("clickdate").value[9];
   changeMonth=document.getElementById("clickdate").value[5]+document.getElementById("clickdate").value[6];
   if(changeday!=tdparent.parentElement.id){
      if(parseInt(changeday)<parseInt(tdparent.parentElement.id)){
        alert("지난 날로 이동이 불가능합니다");
      }else if(changeMonth!=month+1){
        alert("이번 달이 아닌 날로 이동이 불가능합니다");
      }else{
        if(schedule[changeday-1].shell.childElementCount==1){
          schedule[changeday-1].shell.firstChild.appendChild(tdparent.childNodes[indexThis]);
        }else{
          schedule[changeday-1].shell.firstChild.insertBefore(tdparent.childNodes[indexThis].null);
        }
      }
    }else{
        var temp = tdparent.childNodes[indexThis];
         tdparent.removeChild(tdparent.childNodes[indexThis]);
         tdparent.insertBefore(temp,tdparent.childNodes[after]);
    }
  }
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
