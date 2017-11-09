if (matchMedia) {
  var mq = window.matchMedia("(min-width: 640px)");
  mq.addListener(WidthChange);
  WidthChange(mq);

  var mq3 = window.matchMedia("(min-width:850px)");
  mq3.addListener(WidthChange3);
  WidthChange3(mq3);

  var mq2 = window.matchMedia("(min-width:1040px)");
  mq2.addListener(WidthChange2);
  WidthChange2(mq2);

}
function WidthChange(mq) {
  if (mq.matches) {
    var navsbar = document.getElementById('navsbarId');
    var childs = navsbar.childNodes;
    for(var i = 0 ; i < childs.length ; i ++ ) {
      if(childs[i].id == "navsbarMenu"){
        navsbar.appendChild(childs[i]);
      }
    }
    $('#project').show();
    $('#run').show();
    $('#navsbarMenu').hide();
  } else {
    var navsbar = document.getElementById('navsbarId');
    var childs = navsbar.childNodes;
    var project = document.getElementById('project');
    for(var i = 0 ; i < childs.length ; i ++ ) {
      if(childs[i].id == "navsbarMenu"){
        navsbar.insertBefore(childs[i],project);
      }
    }
    $('#project').hide();
    $('#run').hide();
    $('#navsbarMenu').show();
  }

}
var menuHided = 1;

window.addEventListener('resize', function () {
  if ( Mode == 1 ) {
    document.getElementById('stop').style.opacity = 1;
    document.getElementById('runn').style.opacity = 0.5 ;
  }
  if ( Mode == 0 ) {
    document.getElementById('stop').style.opacity = 0.5;
    document.getElementById('runn').style.opacity = 1 ;
  }
  if(Ind == 0){document.getElementById('previous').style.opacity = 0.5 ;}else{document.getElementById('previous').style.opacity = 1 ;}
  if(Ind == NexPrev.length-1){document.getElementById('next').style.opacity = 0.5 ;}else{document.getElementById('next').style.opacity = 1 ;}
},false);

document.getElementById('navsbarMenuButton').addEventListener('click', function(e) {
  if(menuHided == 1) {
    var buttons = document.getElementsByClassName('buttonsMenu');
    for( var i = 0 ; i < buttons.length ; i ++ ){
      buttons[i].style.display = "grid";
    }
    menuHided = 0;
  } else {
    var buttons = document.getElementsByClassName('buttonsMenu');
    for( var i = 0 ; i < buttons.length ; i ++ ){
      buttons[i].style.display = "none";
    }
    menuHided = 1;
  }

},false);



function WidthChange2(mq2) {
  if (mq2.matches) {
    document.getElementById('buttonChronoParent').style.width = "400px";
  } else {
    document.getElementById('buttonChronoParent').style.width = "220px";
  }
}


function WidthChange3(mq3) {
  if (mq3.matches) {
    $('#buttonChronoParent').show();
  } else {
    $('#buttonChronoParent').hide();
    $('#ChronoSpace').hide();
  }
}
