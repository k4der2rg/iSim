var wScrollTop = 0 ; var wScrollLeft = 0 ;

$("#workspace").scroll(function(){
                wScrollTop=$(this).scrollTop();
                wScrollLeft= $(this).scrollLeft();
                var x = $("#workspace").scrollLeft();
                var y = $("#workspace").scrollTop();
                x = x - x%indiceMove;
                y = y - y%indiceMove;
              document.getElementById('workspace').scrollTop = y;
              document.getElementById('workspace').scrollLeft = x;
});


//------------------------------------- le boutton clean-----------------------------------------------
var id = document.getElementById('buttonClean');
id.addEventListener('click',function(){
        $('.nodeEspace').remove();
        $('.Line').remove();
        $('.noteDiv').remove();

        tabElem = [] ;
        LineIDs = [] ;
        for (var i = 0; i < tabFunction.length; i++) {
          clearInterval(tabFunction[i].fct);
        }
        tabFunction =  [];  last_alphabet=0 ;
        for (var i = 0; i < tabChrono.length; i++) {
                document.getElementById(tabChrono[i].objet.parentId).remove();
                clearInterval(tabChrono[i].fct);
                tabChrono.splice(i,1);
              }
              tabChrono =  [];
              $('.parentSpace').remove();
        SaveAction() ;
    },false);

 //------------------------------------- inverser une entre  -----------------------------------------------
var takeLine = true;
var inverserStart = false;
document.addEventListener('click', function(e) {
  //---------------------------------------------------------------
    if ( e.target.id.indexOf('input')==-1 && inverserStart == true ) {
      document.getElementById('workspace').style.opacity ="1";
      inverserStart = false ;
      takeLine = true;
    }
    if ( e.target.id.indexOf('inverser')!=-1 ) {
        inverserStart = true ;
        takeLine = false;
        document.getElementById('workspace').style.opacity ="0.8";

    }
      if ( e.target.id.indexOf('input')!=-1 && inverserStart == true ) {
      var parentOut = document.getElementById(e.target.id);
          parentOut=parentOut.parentNode ;
          //-------- la Mise a jour
      var i ,j,val,indice ;

      for(i=0;i<tabElem.length;i++)
      {
          if(tabElem[i].id==parentOut.id )
          {
            indice = i ;
          }

      }

      for (j=0;j<tabElem[indice].inputs.length;j++)
          {
            if(tabElem[indice].inputs[j].id == e.target.id )
              {
                tabElem[indice].inputs[j].logique = !tabElem[indice].inputs[j].logique;
                if(tabElem[indice].inputs[j].logique == 0)
                {
                  var inv = document.createElement('div')
                  var inp = document.getElementById(e.target.id);
                  inv.style.width = " 6px";
                  inv.style.height = " 6px";
                  inv.style.border = " 1px solid black";
                  inv.style.borderRadius = " 6px";
                  inv.style.backgroundColor = "skyblue";
                  inv.style.marginLeft = "-6px";
                  inv.style.marginTop = "1px";
                  inp.appendChild(inv);
                  document.getElementById('workspace').style.opacity ="1";
                  inverserStart = false ;
                }else
                {
                   var inp = document.getElementById(e.target.id);
                   inp.childNodes[0].remove();
                   document.getElementById('workspace').style.opacity ="1";
                   inverserStart = false ;

                }
              }
          }
    }
},false);

document.addEventListener('keyup', function (e) {
  if(e.keyCode == 27) {
    if ( inverserStart == true ) {
      document.getElementById('workspace').style.opacity ="1";
      inverserStart = false ;
      takeLine = true;
    }
  }
},false);


document.addEventListener('dblclick', function(e) {
  if ( e.target.id.indexOf('input')!=-1) {
  var parentOut = document.getElementById(e.target.id);
      parentOut=parentOut.parentNode ;
  var i ,j,val,indice ;

  for(i=0;i<tabElem.length;i++)
  {
      if(tabElem[i].id==parentOut.id )
      {
        indice = i ;
      }

  }

  for (j=0;j<tabElem[indice].inputs.length;j++)
      {
        if(tabElem[indice].inputs[j].id == e.target.id )
          {
            tabElem[indice].inputs[j].logique = !tabElem[indice].inputs[j].logique;
            if(tabElem[indice].inputs[j].logique == 0)
            {
              var inv = document.createElement('div')
              var inp = document.getElementById(e.target.id);
              inv.style.width = " 6px";
              inv.style.height = " 6px";
              inv.style.border = " 1px solid black";
              inv.style.borderRadius = " 6px";
              inv.style.backgroundColor = "skyblue";
              inv.style.marginLeft = "-6px";
              inv.style.marginTop = "1px";
              inp.appendChild(inv);
              document.getElementById('workspace').style.opacity ="1";
              inverserStart = false ;
            }else
            {
               var inp = document.getElementById(e.target.id);
               inp.childNodes[0].remove();
               document.getElementById('workspace').style.opacity ="1";
               inverserStart = false ;

            }
          }
      }
}
},false);

//------------------------------------- les evenement du switch -----------------------------------------------
    document.addEventListener('click',function(e){
            if (e.target.id.indexOf('switch')!=-1 && e.target.parentNode.id.length != 6 )
            {
               for(var i=0 ; i<tabElem.length;i++)
               {
                 if(tabElem[i].id==e.target.parentNode.id){
                 if(tabElem[i].outputs[0].value==1){ tabElem[i].outputs[0].value=0; } else {tabElem[i].outputs[0].value=1;}

                 }
               }
               if (e.target.src.indexOf('img/in-off.png')!=-1)
                {
                 e.target.src='img/in-on.png';
                 e.target.parentNode.setAttribute('value','1');
               }
               else if (e.target.src.indexOf('img/in-on.png')!=-1){
                 e.target.src='img/in-off.png';
                 e.target.parentNode.setAttribute('value','0');
               }
               SaveAction() ;
            }
        },false);


//------------------------------------- fonction hid -----------------------------------------------
function hid(id){
var x="#"+id;
  $(x).toggle('blind', 200);
}


var animate = 1 ;

$('#buttonMenu').on('click',function () {
  $('#Menu').toggle('slide', 500);
  $('#combi').show();
  $('#seq').show();
  $('#combicpl').show();
  $('#seqcpl').show();


  if (animate) {
      $(this).animate({marginLeft :'260px'},500,'swing');
      animate = 0;
      $("#arrow2").css({
        'transition':'0.4s',
        '-moz-transform':'rotate(90deg)',
        '-webkit-transform':'rotate(90deg)',
        '-o-transform':'rotate(90deg)',
        '-ms-transform':'rotate(90deg)',
        'transform': 'rotate(90deg)'
     });
}
else {
    $(this).animate({marginLeft :'0%'},500,'swing');
    animate=1;
     $("#arrow2").css({
       'transition':'0.4s',
       '-moz-transform':'rotate(270deg)',
       '-webkit-transform':'rotate(270deg)',
       '-o-transform':'rotate(270deg)',
       '-ms-transform':'rotate(270deg)',
       'transform': 'rotate(270deg)'
    });
    }
  }
);

//------------------------------------- Les commentaires -----------------------------------------------
var nbNotes = 0 ;
var note = 0 ;
var worksp = document.getElementById('workspace') ;

// cet evenement pour crear le champ d'un commentaire dans l'espace de travail ..
//------------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('click',function(e) {
  if( note == 1 && (e.target.id.indexOf('workspace')!=-1 )) {
  worksp.style.opacity ="1";
  var text = document.createElement('textarea');
  var divNote = document.createElement('div');
  var close = document.createElement('img');
  close.className = "closeNote";
  close.id = "closeNote" + nbNotes ;
  close.src = "img/closeNote.png";
  close.style.width = "17px";
  close.style.height = "17px";
  close.style.float = "right";
  divNote.appendChild(close);
  divNote.style.height = "50px";
  divNote.style.width = "50px";
  divNote.appendChild(text);
  divNote.style.background = "black";
  divNote.style.left = e.clientX +"px";
  divNote.style.top = e.clientY +"px";
  divNote.style.position = "fixed";
  divNote.className = "noteDiv";
  divNote.style.borderRadius = "7px";
  divNote.style.borderBottomLeftRadius = "0px";
  divNote.style.borderBottomRightRadius = "0px";
  divNote.style.zIndex = "1000000";
  text.style.height = parseInt(divNote.style.height) -25+"px";
  text.style.width = parseInt(divNote.style.width)-8+"px";
  text.style.background = "#a8c1ce";
  text.style.color = "black" ;
  text.className = "textNote" ;
  text.style.fontSize ="13px";
  text.style.border = "2px solid black";
  text.style.borderRadius = "5px";
  text.id = "noteText" + nbNotes ;
  $(divNote).draggable({
      cursor: 'move',
      helper: 'original',
      containment: '#workspace',
      tolerance: 'fit'
    });
  worksp.appendChild(divNote);
  note =0 ;
  nbNotes++;
  worksp.style.cursor = "default";

  }

  if(e.target.id.indexOf('buttonNote')!=-1 ) {

    worksp.style.opacity ="0.8";
    worksp.style.cursor = " pointer";
    note = 1 ;
  }

  if(e.target.id.indexOf('closeNote')!=-1 ) {
      e.target.parentNode.remove();
  }

},false);

document.addEventListener('keyup', function (e) {
  if(e.keyCode == 27) {
    if ( note == 1 ) {
      worksp.style.cursor = "default";
      note = 0 ;
      worksp.style.opacity ="1";
    }
  }
},false);

document.addEventListener('mouseover',function(e) {
  if (e.target.id.indexOf('noteText')!=-1) {
    e.target.setAttribute('value',e.target.value);

  }
},false);



//------------------------------------------------------------------------------------------------------------------------------//




// ces evenements pour ajuster les commentaires ..
//------------------------------------------------------------------------------------------------------------------------------//
var resizingNote = false;
var textAreaId ;
document.addEventListener('mousedown',function(e) {
  if(e.target.id.indexOf('noteText')!=-1 ) {
    resizingNote = true;
    textAreaId = e.target.id;
  }
},false);
document.addEventListener('mousemove',function(e) {
  if(resizingNote) {
    var t = document.getElementById(textAreaId);
    var parent = t.parentNode ;
    parent.style.height = parseInt(t.style.height) + 25 + "px";
    parent.style.width = parseInt(t.style.width) + 8 + "px";
  }
},false);
document.addEventListener('mouseup',function(e) {
  if(resizingNote) {
    resizingNote = false;
  }
},false);
//------------------------------------------------------------------------------------------------------------------------------//




//------------------------------------- button de Library -----------------------------------------------
var circuitNb ;
open = 0 ;
document.addEventListener('click', function(e) {
  if(e.target.id.indexOf('Library')!=-1) {
    var x = document.getElementById('espace');
    var body = document.getElementById('body');
    var c = document.getElementById('ChronoSpace');
    body.style.background = "black";
    x.style.background = "black";
    x.style.opacity ="0.3";
    x.style.transition = "0.5s";
    c.style.transition = "0.5s";
    c.style.opacity ="0.3";
    if( open == 0 ) {
        $('#windowbib').show();
    }
    open = 1;
  }
  if(e.target.className.indexOf('closeWindow')!=-1) {
    var x = document.getElementById('espace');
    var body = document.getElementById('body');
    var c = document.getElementById('ChronoSpace');
    x.style.opacity ="1";
    c.style.opacity ="1";
    x.style.transition = "";
    c.style.transition = "";
    if( open == 1 )  $('#windowbib').hide();
    open = 0;
  }
var nb ;
  if(e.target.id.indexOf('buttonBib')!=-1){
    nb = parseInt(e.target.id[e.target.id.length-1]);
    circuitNb = nb;
    for ( var i = 0 ; i <= 8  ; i ++ ) {
      var str = "contenu" + i ;
      if(i == nb ) {
          $("#"+str).show();
          $("#buttonImporter").show();
      }
      else $("#"+str).hide();

    }
    if(nb == 1) {
      $("#welcome").show();
      $("#buttonImporter").hide();
    }
  }

  if(e.target.id.indexOf('buttonImporter')!=-1){
    var x = document.getElementById('espace');
    var body = document.getElementById('body');
    var c = document.getElementById('ChronoSpace');
    x.style.opacity ="1";
    c.style.opacity ="1";
    x.style.transition = "";
    c.style.transition = "";

    if( circuitNb != 0 && circuitNb != 1 ) {
        var url ;
        if( circuitNb == 2 ) url = "bib/ADD_1Bit_Complet.isim";
        if( circuitNb == 3 ) url = "bib/Cmp2Bits.isim";
        if( circuitNb == 4 ) url = "bib/Compteur_Mod_8.isim";
        if( circuitNb == 5 ) url = "bib/Mux_4---1.isim";
        if( circuitNb == 6 ) url = "bib/Registe_a_decalage_droite.isim";
        if( circuitNb == 7 ) url = "bib/Registe_EP_SP.isim";
        if( circuitNb == 8 ) url = "bib/Registre_a_decalage_cerculaire.isim";
        var a = document.createElement("a");
        a.style = "display: none";
        document.body.appendChild(a);
        a.href = url;
        a.download = url;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    if( open == 1 )  $('#windowbib').hide();
    open = 0;
  }
},false);

document.addEventListener('keyup', function (e) {
  if(e.keyCode == 27) {
    var x = document.getElementById('espace');
    var body = document.getElementById('body');
    var c = document.getElementById('ChronoSpace');
    x.style.opacity ="1";
    c.style.opacity ="1";
    x.style.transition = "";
    c.style.transition = "";
    if( open == 1 )  $('#windowbib').hide();
    open = 0;
  }
},false);


//---------------------- deplacement d'un ensemble d'elements ----------------------------

var ar=new Array(33,34,35,36,37,38,39,40);

$(document).keydown(function(e) {
     var key = e.which;
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});

document.addEventListener('keydown', function (e) {
  if(e.keyCode == 38 && tabSelectionElem.length != 0) {
    for (var i = 0; i < tabSelectionElem.length; i++) {
      document.getElementById(tabSelectionElem[i].id).style.top = parseInt(document.getElementById(tabSelectionElem[i].id).style.top) - 10 +"px";


      var listEnfants = document.getElementById(tabSelectionElem[i].id).childNodes ;
      for ( var k = 0 ; k < listEnfants.length ; k ++ ) {
          files = getFiles( listEnfants[k].id ) ;
          for ( j = 0 ; j < files.length ; j ++ ) {
            if ( listEnfants[k].id == files[j].idOutput ) {
              boolOUT = true;
            }
            if ( listEnfants[k].id == files[j].idInput ) {
              boolOUT = false;
            }
            files[j].update(e);
            hold = 0 ;
          }
      }


    }
  }
},false);

document.addEventListener('keydown', function (e) {
  if(e.keyCode == 40 && tabSelectionElem.length != 0) {
    for (var i = 0; i < tabSelectionElem.length; i++) {
      document.getElementById(tabSelectionElem[i].id).style.top = parseInt(document.getElementById(tabSelectionElem[i].id).style.top) + 10 +"px";

      var listEnfants = document.getElementById(tabSelectionElem[i].id).childNodes ;
      for ( var k = 0 ; k < listEnfants.length ; k ++ ) {
          files = getFiles( listEnfants[k].id ) ;
          for ( j = 0 ; j < files.length ; j ++ ) {
            if ( listEnfants[k].id == files[j].idOutput ) {
              boolOUT = true;
            }
            if ( listEnfants[k].id == files[j].idInput ) {
              boolOUT = false;
            }
            files[j].update(e);
            hold = 0 ;
          }
      }

    }
  }
},false);

document.addEventListener('keydown', function (e) {
  if(e.keyCode == 39 && tabSelectionElem.length != 0) {
    for (var i = 0; i < tabSelectionElem.length; i++) {
      document.getElementById(tabSelectionElem[i].id).style.left = parseInt(document.getElementById(tabSelectionElem[i].id).style.left) + 10 +"px";

      var listEnfants = document.getElementById(tabSelectionElem[i].id).childNodes ;
      for ( var k = 0 ; k < listEnfants.length ; k ++ ) {
          files = getFiles( listEnfants[k].id ) ;
          for ( j = 0 ; j < files.length ; j ++ ) {
            if ( listEnfants[k].id == files[j].idOutput ) {
              boolOUT = true;
            }
            if ( listEnfants[k].id == files[j].idInput ) {
              boolOUT = false;
            }
            files[j].update(e);
            hold = 0 ;
          }
      }

    }
  }
},false);

document.addEventListener('keydown', function (e) {
  if(e.keyCode == 37 && tabSelectionElem.length != 0) {
    for (var i = 0; i < tabSelectionElem.length; i++) {
      document.getElementById(tabSelectionElem[i].id).style.left = parseInt(document.getElementById(tabSelectionElem[i].id).style.left) - 10 +"px";

            var listEnfants = document.getElementById(tabSelectionElem[i].id).childNodes ;
            for ( var k = 0 ; k < listEnfants.length ; k ++ ) {
                files = getFiles( listEnfants[k].id ) ;
                for ( j = 0 ; j < files.length ; j ++ ) {
                  if ( listEnfants[k].id == files[j].idOutput ) {
                    boolOUT = true;
                  }
                  if ( listEnfants[k].id == files[j].idInput ) {
                    boolOUT = false;
                  }
                  files[j].update(e);
                  hold = 0 ;
                }
            }

    }
  }
},false);
//------------------------------------------------------------------------------------------------------

//------------------------------------- button de fullscreen -----------------------------------------------

document.addEventListener('click', function(e) {
  if (e.target.id.indexOf('fullscreenButton')!=-1 ) {
    var full = document.getElementById('body')
    full.webkitRequestFullscreen();
  //  full.mozRequestFullScreen();
  //  full.msRequestFullscreen();
  //  full.requestFullscreen();
  }
},false);



//------------------------------------- Slide du menu -----------------------------------------------
var myfunction = function(e) {
  var button = document.getElementById('buttonMenu');
  var menu = document.getElementById('Menu');
  button.style.opacity = "0.5";
  menu.style.opacity = "0.5";
  $('.Menu').toggle('slide',500);
};


var elem = document.getElementsByClassName('node');
for(var i=0 ; i< elem.length ; i++){
  elem[i].addEventListener('mousedown', myfunction , false);
  document.addEventListener('mouseup', function(){var menu = document.getElementById('Menu');  menu.style.opacity = "1"; document.getElementById('buttonMenu').style.opacity = "1"; } , false);
}

//------------------------------------- Slide du Chronogrammes -----------------------------------------------

var animate2 = 1 ;
var left = parseInt(window.innerWidth);
window.addEventListener('resize', function () {
  var left = parseInt(window.innerWidth) - 400;
  document.getElementById('ChronoSpace').style.marginLeft =   left + "px";
},false);
document.getElementById('ChronoSpace').style.marginLeft =
$('#buttonChrono').on('click',function () {
  var left = parseInt(window.innerWidth) - 400;
  document.getElementById('ChronoSpace').style.marginLeft =   left + "px";
  $('#ChronoSpace').toggle('blind', 500);
  if (animate2) {
      animate2 = 0;
      $("#arrow").css({
        'transition':'0.4s',
        '-moz-transform':'rotate(-180deg)',
        '-webkit-transform':'rotate(-180deg)',
        '-o-transform':'rotate(-180deg)',
        '-ms-transform':'rotate(-180deg)',
        'transform': 'rotate(-180deg)'
     });

}
else {
    animate2=1;
    $("#arrow").css({
      'transition':'0.4s',
      '-moz-transform':'rotate(0deg)',
      '-webkit-transform':'rotate(0deg)',
      '-o-transform':'rotate(0deg)',
      '-ms-transform':'rotate(0deg)',
      'transform': 'rotate(0deg)'
   });
    }
  }
);



//------------------------------------- DRAG AND DROP -----------------------------------------------
$( function() {
    var x = null;



    $(".node").draggable({
        helper: 'clone',
        cursor: 'move',
        tolerance: 'fit',
        revert: 'invalid'
    });

    $("#espace").droppable({

        drop: function (e, ui) {
            var idd = $(ui.draggable)[0].id;
            var idParent = $(ui.draggable)[0].parentNode.id;

            if ($(ui.draggable)[0].id != "") {
                x = ui.helper.clone();
                ui.helper.remove();

                if(e.clientX<240){
                      if ( $("#Menu").css('display') != 'none' ){
                          document.getElementById('buttonMenu').click();
                      }
                  }

            x.draggable({
                grid:[10,10],
                helper: 'original',
                containment: '#workspace',
                tolerance: 'fit'
              });
          //    wScrollTop = parseInt(wScrollTop) - parseInt(wScrollTop)%indiceMove  ;
          //    wScrollLeft = parseInt(wScrollLeft) - parseInt(wScrollLeft)%indiceMove ;



              if( parseInt(x[0].style.top)%(indiceMove) >=5 ) x[0].style.top = parseInt(x[0].style.top) - parseInt(x[0].style.top)%(indiceMove) + 10  + "px";
              else x[0].style.top = parseInt(x[0].style.top) - parseInt(x[0].style.top)%(indiceMove)  + "px";
              if (parseInt(x[0].style.left)%(indiceMove) >= 5) x[0].style.left = parseInt(x[0].style.left) - parseInt(x[0].style.left)%(indiceMove) + 10 + "px";
              x[0].style.left = parseInt(x[0].style.left) - parseInt(x[0].style.left)%(indiceMove)  + "px";

              if ( idParent != 'workspace')  x[0].style.top = parseInt(x[0].style.top)+parseInt(wScrollTop)+"px";
              if ( idParent != 'workspace')  x[0].style.left = parseInt(x[0].style.left)+parseInt(wScrollLeft)+"px";

            if ( idParent != 'workspace') {

              x[0].id =idd + indice ; indice++;
              if(x[0].className.indexOf('gate')!=-1){ x[0].className = 'nodeEspace gate' ; } else x[0].className = 'nodeEspace';

              x.appendTo('#workspace');

              if (( x[0].id.indexOf('led')!=-1) || (x[0].id.indexOf('HEX')!=-1))
              {
                Objet = new afficheurs(x[0].id,idParent);
              }
              else if (idParent == "combi" || idParent == "combicpl") { Objet = new LogicGates(x[0].id,idParent);}
              else if (idParent == "seq" || idParent == "seqcpl") {Objet = new Sequentiel(x[0].id,idParent);}

              //================             1 er changemment          ==================
              Objet.CreerElem_standard(10,1,2,2);
              context.attach('#'+x[0].id, test_menu);
              //context.attach('#'+etiq.id, menu_etiq);

            }else {
              //  = ======================= 2 eme changemment =========================
              if(x[0].className.indexOf('gate')!=-1){ x[0].className = 'nodeEspace gate' ; } else x[0].className = 'nodeEspace';
            //  if (x[0].className.indexOf('REG_UNIVER' != -1) ) {
            //    x[0].firstChild.width = "80px";
            //    x[0].firstChild.height = "120px";
            //  }
              x.appendTo('#workspace');
              context.attach('#'+x[0].id, test_menu);
              //context.attach('#'+etiq.id, menu_etiq);

           }


                         // le code ci-dessous pour déplacer un element déja lié.
                   //------------------------------------------------------------------------------//
                   //------------------------------------------------------------------------------//
                    if ( drawing == 0 ) {
                    //------------------------------------------------------------------------------//
                      document.addEventListener('mousemove', function (e){
                       if ( dragging == 1 ) {
                         moved = 1 ;
                         var listEnfants = x[0].childNodes ;
                         for ( var i = 0 ; i < listEnfants.length ; i ++ ) {

                             files = getFiles( listEnfants[i].id ) ;
                             for ( j = 0 ; j < files.length ; j ++ ) {
                               if ( listEnfants[i].id == files[j].idOutput ) {
                                 boolOUT = true;
                               }
                               if ( listEnfants[i].id == files[j].idInput ) {
                                 boolOUT = false;
                               }
                               files[j].update(e);
                               hold = 0 ;
                             }
                         }
                       }
                     },false) ;
                    //------------------------------------------------------------------------------//
                     document.addEventListener('mousedown' , function (e) {
                       if (e.target.parentNode.className.indexOf('nodeEspace')!=-1) {
                         dragging = 1 ;
                         x[0] = e.target.parentNode ;
                       }
                       if (e.target.className.indexOf('nodeEspace')!=-1) {
                         dragging = 1 ;
                         x[0] = e.target ;
                       }

                     },false);
                    //------------------------------------------------------------------------------//
                     document.addEventListener('mouseup' , function (e) {
                       if ( dragging == 1 && moved == 1 ) {
                         var listEnfants = x[0].childNodes ;
                         for ( var i = 0 ; i < listEnfants.length ; i ++ ) {
                           files = getFiles( listEnfants[i].id ) ;
                           for ( j = 0 ; j < files.length ; j ++ ) {
                             if ( listEnfants[i].id == files[j].idOutput ) {
                               boolOUT = true;
                             }
                             if ( listEnfants[i].id == files[j].idInput ) {
                               boolOUT = false;
                             }
                             files[j].update(e);
                             hold = 0 ;
                           }
                         }
                       }
                         moved = 0 ;
                         dragging = 0 ;
                     },false);
                   }
                   //------------------------------------------------------------------------------//
                   //------------------------------------------------------------------------------//
                   // end.
                   SaveAction() ;


        }
      }
    });


} );


//------------------------------------- LA RECHERCHE  -----------------------------------------------

var idMenu=document.getElementById('Menu');
function leave() {
}

function switchH(id) {
}
var Rslt = document.getElementById('Rslt');
function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');

        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function() {
            $(this).empty();
            Rslt.innerHTML = "Combinatoire simple";
            $(".rslt").fadeIn(300);
            $(".section").show();
            $(".node").each(function() {
                $(this).show(100);
                $('.node').css("display", "inline-block");

            });
        });
    }
}

var bol = false;
$("#filter").keyup(function() {

    var filter = $(this).val();
    $(this).data().term = null;
    $(".node").each(function() {

        if ($(this).attr('name').search(new RegExp(filter, "i")) < 0) {
            $(this).fadeOut(300);
            $(".rsltt").fadeOut(300);
            Rslt.innerHTML = "Resultats :";

        } else {
            $(this).show(200);
            if (filter == '') {
                $(".section").fadeIn(500);
                Rslt.innerHTML = "Combinatoire simple";
            }
        }
    });

});


//-------------------------------------Sauvgarder------------------------------------------------------------------------------------------------------------
    document.addEventListener('click',function(e){
                if (e.target.id.indexOf('upload')!=-1)
                {

                var input = document.createElement("input");
                document.body.appendChild(input);
                input.style = "display: none";
                input.type = 'file';
                input.accept ='.isim' ;
                input.setAttribute("onchange","openFile(event)") ;
                input.click();
                }
            },false);

              document.addEventListener('click',function(e){
                if (e.target.id.indexOf('sauv')!=-1)
                {
                  var NameFile = prompt("Save as :");
                  if(NameFile != null)
                  {
                    var notes = document.getElementsByClassName('textNote');
                    for ( var i = 0 ; i < notes.length ; i ++) {
                      notes[i].innerHTML  = notes[i].value;
                    }
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    var espace = document.getElementById("workspace") ;
                    var text1 = espace.innerHTML ;
                    var TabToSave = {Elements  : tabElem , HTML : text1 , ind1 : indiceId , ind2 : indice , line : LineIDs} ;
                    var text = JSON.stringify(TabToSave) ;
                    var blob = new Blob([text], {type: 'log/plain'});
                     url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = NameFile+".isim";
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }

                }
            },false);
  //--------------------------------------OUVRIR-----------------------------------------------------------------------------------------------------------

      var openFile = function(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
          tabElem = [];
          for (var i = 0; i < tabFunction.length; i++) {
              clearInterval(tabFunction[i].fct);
            }
            tabFunction =  [];
            for (var i = 0; i < tabChrono.length; i++) {
                document.getElementById(tabChrono[i].objet.parentId).remove();
                clearInterval(tabChrono[i].fct);
                tabChrono.splice(i,1);
              }
              tabChrono =  [];
          var Newtext = reader.result;
          Reset(Newtext) ;
          SaveAction();
        };
        reader.readAsText(input.files[0]);
      };
      //-------------------------------------------------------ARRETER------------------------------------------------------------------------------------------

      document.addEventListener('click',function(e){

      	if(e.target.id == 'stop' && Mode == 1)
      	{
      		for (var i = 0;i<tabFunction.length;i++)
      		{
                 clearInterval(tabFunction[i].fct);

      		}
      		Mode = 0 ;
            if ( tabChrono.length != 0){
            for (var i = 0; i < tabChrono.length; i++) {
              clearInterval(tabChrono[i].fct);
            }
            pause = true ;
          }
          tabFunction = [] ;
      		document.getElementById('stop').style.opacity = 0.5;
           document.getElementById('runn').style.opacity = 1 ;
      	}

      },false);
      //-------------------------------------------------------------SIMULER------------------------------------------------------------------------------------

       document.addEventListener('click',function(e){
      	if (e.target.id == 'runn' && Mode == 0)
      	{
      		for(var i=0;i<tabElem.length;i++)
      		{
      			if(tabElem[i].id.indexOf('Horloge')!=-1)
                  {
                  	var fctID = setInterval(run,tabElem[i].time,tabElem[i]);
                    tabFunction.push({fct :fctID, id : tabElem[i].id});
                  }
                  else
                  {

                  	 if(tabElem[i].id.indexOf('Line')!=-1)
                  {

                     var fctID = setInterval(run,0,tabElem[i]);
                     tabFunction.push({fct :fctID, id : tabElem[i].id });
                  }
                  }

      		}
      		Mode = 1 ;
          if ( tabChrono.length != 0){
          for (var i = 0; i < tabChrono.length; i++) {
              chronoID = setInterval(run,75 - speed  * 15,tabChrono[i].objet);
              tabChrono[i].fct = chronoID;
          }
          pause = false ;
          document.getElementById('startChrono').style.opacity = "0.6";
         document.getElementById('pauseChrono').style.opacity = "1";
        }
      		  document.getElementById('stop').style.opacity = 1;
      		 document.getElementById('runn').style.opacity = 0.5 ;



      	}
      },false);

      //--------------------------------------------------Precedent---suivant--------------------------------------------------------------------------------------------
      document.addEventListener('click',function(e){
      	if (e.target.id == 'next' || e.target.id == 'previous')
      	{
          var yes = false ;
      	  var espace = document.getElementById("workspace") ;
          if(e.target.id == 'next' && Ind < NexPrev.length-1){Ind = Ind + 1 ; yes = true ;}
          if(e.target.id == 'previous' && Ind > 0){ Ind = Ind - 1 ; yes = true ;}
          if (yes == true)
          {

          var text = NexPrev[Ind] ;
          Reset(text);
          if(Ind == 0){document.getElementById('previous').style.opacity = 0.5 ;}else{document.getElementById('previous').style.opacity = 1 ;}
          if(Ind == NexPrev.length-1){document.getElementById('next').style.opacity = 0.5 ;}else{document.getElementById('next').style.opacity = 1 ;}
          }

      	}
      },false);
 //---------------------------------------------------------------------------------------------------------------------------


 $('body').css('overflow','hidden');
 setTimeout(function(){
     $('.loader').fadeOut(400);
     $('#logoImg').fadeOut(1000);
     setTimeout(function(){
        $('.overlay').remove();
                 document.getElementById('buttonMenu').click();
                 $('.search-icon').click();
          var h = window.location.href ;
          h = h[h.length-3]+h[h.length-2]+h[h.length-1] ;
          if( h.indexOf('bib') != -1) {
           document.getElementById('Library').click();
           $('body').css('overflow','hidden');
          }
     },500);
 },1000);
