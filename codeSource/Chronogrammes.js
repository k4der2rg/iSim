
/*
window.addEventListener('focus', function() {
  for (var i = 0; i < tabChrono.length; i++) {
      chronoID = setInterval(run,50 - speed  * 5,tabChrono[i].objet);
      tabChrono[i].fct = chronoID ;
  }},false);


window.addEventListener('blur', function() {
  for (var i = 0; i < tabChrono.length; i++) {
    clearInterval(tabChrono[i].fct);
  }
};
,false);      */
var speed = 2 ;
function Chronogramme(id,parentId) {

  //Attributs :
  this.id = id ;
  this.parentId = parentId;
  this.cvs = document.createElement('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.basculement = false ;

  //Methodes  :
  //----------------------------------------------------------------------------------------------------------
  this.rechercheElem = function () {
    var parent = document.getElementById(this.id).parentNode;
      for (var i = 0; i < tabElem.length; i++) {
        if ( tabElem[i].id == parent.id ){

          if ( this.id.indexOf('input')!= -1 )
            for (var j = 0; j < tabElem[i].inputs.length; j++)
              if (tabElem[i].inputs[j].id == this.id )  this.elem = tabElem[i].inputs[j];

          if ( this.id.indexOf('output')!= -1 )
            for (var j = 0; j < tabElem[i].outputs.length; j++)
              if (tabElem[i].outputs[j].id == this.id )  this.elem = tabElem[i].outputs[j];

        }
      }
  }

  //----------------------------------------------------------------------------------------------------------
  this.initChro = function () {
    this.cvs.id = "canvas" + indice ; indice++;
    this.cvs.className = "canvas"
    this.cvs.style.width = "330px";             // par rapport a la taille du parentNode.
    this.cvs.style.height = "75px";

    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();

    this.x = CordX;
    this.y = 112;

    this.ctx.moveTo(this.x,this.y);

    document.getElementById(this.parentId).appendChild(this.cvs);

    //var butt = document.createElement('div');
    //butt.className = "Dell";
    //butt.innerHTML = "x";
    //document.getElementById(this.parentId).appendChild(butt);

  }

  //----------------------------------------------------------------------------------------------------------
  this.run = function () {
    this.rechercheElem();
    if ( this.elem.value == 1 && this.y == 112  ) {this.y = 38; this.basculement = true; }
    else if ( this.elem.value == 0 && this.y == 38 )  {this.y = 112 ; this.basculement = true; }
    else this.x++;
    this.ctx.lineTo(this.x,this.y);
    this.ctx.stroke();
    if ( this.basculement == true )
    {
      this.basculement = false ; this.x++;
    }
    if (this.x == 300 )
    {
      this.ctx.closePath();
      this.x = 0 ;
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, 300, 200);
      this.ctx.clearRect(0, 0, 300, 200);
      this.ctx.beginPath();
      this.ctx.moveTo(this.x,this.y);
      this.ctx.strokeStyle = "black";
      for (var i = 0; i < tabChrono.length; i++) {
        tabChrono[i].objet.ctx.closePath();
        tabChrono[i].objet.x = 0 ;
        tabChrono[i].objet.ctx.fillStyle = "white";
        tabChrono[i].objet.ctx.fillRect(0, 0, 300, 200);
        tabChrono[i].objet.ctx.clearRect(0, 0, 300, 200);
        tabChrono[i].objet.ctx.beginPath();
        tabChrono[i].objet.ctx.moveTo(0,tabChrono[i].objet.y);
        tabChrono[i].objet.ctx.strokeStyle = "black";
      }
    }
    CordX = this.x;
  }

  //----------------------------------------------------------------------------------------------------------
  this.drowChrono = function () {
    this.initChro();
    this.rechercheElem();
    if ( Mode == 1 ) { chronoID = setInterval(run,75 - speed  * 15,this);}
    else {chronoID = null ;}
    tabChrono.push({ fct:chronoID , objet : this });
  }
}

////-------------test------------- :

document.getElementById('addChrono').addEventListener(
  'click',
  function () {
    $('#workspace').css('opacity' , "0.5");
  //  $("#Menu").css('opacity','0.5');
  //  $("#buttonMenu").css('opacity','0.5');
    $(".output").css('border','1.5px solid red');
    $(".input").css('border','1.5px solid red');
    stopProp = true;
    document.addEventListener(
      'click',
      function (e) {
        if (stopProp)
        {
          if ( e.target.id.indexOf('input') != -1 || e.target.id.indexOf('output') != -1)
          {
            var parentSpace = document.createElement('div');
            parentSpace.className = 'parentSpace';
            parentSpace.id = "parentSpace"+indice; indice++;
            var chr = new Chronogramme(e.target.id,parentSpace.id );
            var etiquette = document.createElement('div');
            etiquette.innerHTML = e.target.parentNode.lastChild.innerHTML;
            var obj = searchObject(e.target.parentNode.id);
            if ( e.target.id.indexOf('input') != -1 )
            {
              for (var i = 0; i < obj.inputs.length; i++) {
                if ( obj.inputs[i].id == e.target.id ) etiquette.innerHTML += " - entrée"+(i+1);
              }
            }
            else
            {
              for (var i = 0; i < obj.outputs.length; i++) {
                if ( obj.outputs[i].id == e.target.id ) etiquette.innerHTML += " - sortie"+(i+1);
              }
            }

            etiquette.style.color ="white";
            etiquette.className = "etiquetteChrono";
            parentSpace.appendChild(etiquette);
            var close = document.createElement('img');
            close.className = "closebutton";
            close.id = "closebutton"+indice;indice++;
            close.src = "img/close.png";
            close.style.width = "25px";
            close.style.height = "25px";
            close.style.float = "right";

            parentSpace.appendChild(close);

            var plus = document.getElementById("addChrono");
            document.getElementById('ChronoSpace').appendChild(parentSpace);
            removeChrono();
            chr.drowChrono();
            stopProp = false;
            $('#workspace').css('opacity' , "1");
            $(".output").css('border','1px solid black');
            $(".input").css('border','1px solid black');
          }
        }
      }
      ,false
    )
    },false);

    document.addEventListener('keyup', function (e) {
      if(e.keyCode == 27) {
        if ( stopProp == true ) {
          stopProp = false;
          $('#workspace').css('opacity' , "1");
          $(".output").css('border','1px solid black');
          $(".input").css('border','1px solid black');
        }
      }
    },false);

// -------------------------- bouton remove ----------------------------
function removeChrono() {
  var chronoTab = document.getElementsByClassName('closebutton');
  for (var i = 0; i < chronoTab.length; i++) {
    chronoTab[i].addEventListener('click',function (e) {
      for (var j = 0; j < tabChrono.length; j++) {
        if ( tabChrono[j].objet.parentId == e.target.parentNode.id )
        {
          clearInterval(tabChrono[j].fct);
          tabChrono.splice(j,1);
        }
      }
      $("#"+e.target.parentNode.id).remove();
    },false);

    chronoTab[i].addEventListener('mouseover',function (e) {
      $("#"+e.target.id).animate({width :'25px',height:'25px'},50,'swing');
      e.target.src = "img/close-hover.png";
    },false);

    chronoTab[i].addEventListener('mouseout',function (e) {
      $("#"+e.target.id).animate({width :'25px',height:'25px'},50,'swing');
      e.target.src = "img/close.png";
    },false);
  }
}



// ------------------------- Speeeeed ---------------------------
// j'ai supprimer ces methodes , on va discuter ca plus tard nchlh ..
/*


<div class="buttons" id="+speed">
    <img src="img/+.png" >
</div>

<div class="buttons" id="-speed">
    <img src="img/-.png" >
</div>    */

// ------------------------- Speeeeed ---------------------------

document.getElementById('speedplus').addEventListener(
  'click',function (e) {

    if (speed < 5 && !pause && Mode == 1) {
    speed++ ;
    var nb = document.getElementById('imgNbChr');
    nb.src = "img/" + parseInt(speed) + ".png";
    if(speed == 5 ) document.getElementById('speedplus').style.opacity = " 0.6";
    else document.getElementById('speedmoins').style.opacity = " 1";
    for (var i = 0; i < tabChrono.length; i++) {
      clearInterval(tabChrono[i].fct);
      chronoID = setInterval(run,75 - speed  * 15,tabChrono[i].objet);
      tabChrono[i].fct = chronoID;
    }
  }
  },
  false
);

document.getElementById('speedmoins').addEventListener(
  'click',function () {
    if ( speed > 0 && !pause  && Mode == 1 ) {
    speed--;
    var nb = document.getElementById('imgNbChr');
    nb.src = "img/" + parseInt(speed) + ".png";
    if(speed == 0 ) document.getElementById('speedmoins').style.opacity = " 0.6";
    else document.getElementById('speedplus').style.opacity = " 1";
    for (var i = 0; i < tabChrono.length; i++) {
      clearInterval(tabChrono[i].fct);
      chronoID = setInterval(run,75 - speed  * 15,tabChrono[i].objet);
      tabChrono[i].fct = chronoID;
    }
  }
},
  false
);


// ------------------------- play/pause ----------------------------
document.getElementById('pauseChrono').addEventListener(
  'click',function () {
    if ( pause == false && Mode == 1 )
    {
      for (var i = 0; i < tabChrono.length; i++) {
        clearInterval(tabChrono[i].fct);
      }
      pause = true ;
      document.getElementById('startChrono').style.opacity = "1";
      document.getElementById('pauseChrono').style.opacity = "0.6";
    }
  },
  false
);

document.getElementById('startChrono').addEventListener(
  'click',function () {
    if ( pause == true && Mode == 1 )
    {
        for (var i = 0; i < tabChrono.length; i++) {
        chronoID = setInterval(run,75 - speed  * 15,tabChrono[i].objet);
        tabChrono[i].fct = chronoID;
    }
    pause = false ;
    document.getElementById('startChrono').style.opacity = "0.6";
    document.getElementById('pauseChrono').style.opacity = "1";
    }

},
  false
);
