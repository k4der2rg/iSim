var tabElem = new Array();

var tabFunction = new Array();

var tabChrono = [], tabSelectionElem = [] , DejaSelec = false;

var Objet = new LogicGates([],[],"",0,0,0,"",0);

var INputs = [] ; var OUTputs = [] ;

var indice = 0 ; var stopProp = false; var CordX = 0 ;

var indiceMove = 10 ;

var speed = 8 , chronoID;

var pause = false , retourner = false;

var tabSizeElem = [] , sizePx = 0 , sizeHeight = 1000 , sizeWidth = 2000 ;

var scrollCpt = 0 ;
//----------------------------------------
 var Mode = 0 ;
var NexPrev = [] ;
var Ind = 0 ;
var LineIDs = [];
var InOut = 0
//------------   1 er changemment -----------------------------
var elemtraite = [];
//=============================

function SaveIDs(line)
{
  var id = []
  id.push(line.ls.id);
  for(var k = 0 ; k < line.divs.length;k++)
     {
       	id.push(line.divs[k].id);

     }
     LineIDs.push(id);
}


function run(Obj)  {  Obj.run(); updateColor(); }

function removeElemFromTabElem(elem) {
  var i = -1 ;
  i = tabElem.indexOf(elem);
  if (i > -1) {
    tabElem.splice(i, 1);
   }
}

function searchObject(id) {
  var object;
  for (var i = 0 ; i < tabElem.length ; i ++ ){
    if ( id == tabElem[i].id) {
      object = tabElem[i];
    }
  }
  return object;
}
function searchIndex(id) {
  var object;
  for (var i = 0 ; i < tabElem.length ; i ++ ){
    if ( id == tabElem[i].id) {
      return i ;
    }
  }
  return -1 ;
}

function supFunction(id) {
  for ( var i = 0 ; i < tabFunction.length ; i ++ ) {
    if ( id == tabFunction[i].id) {
      clearInterval(tabFunction[i].fct);
      tabFunction.splice(i,1);
    }
  }
}
function WhenRemoveFile (file){
  if( file.idOutput != null ) {
                var outt = document.getElementById(file.idOutput);
                outt.style.backgroundColor = "white";
            }
            //-----------------------------------------------------------------------------------------
            for(var i =0 ; i < LineIDs.length ;i++)
            {
                if (LineIDs[i][0]==file.ls.id)
                {
                  LineIDs.splice(i , 1);
                }
            }
            //-----------------------------------------------------------------------------------------
            if( file.idInput != null  && file.idOutput != null ) {
            var parentIn = document.getElementById(file.idInput);
            parentIn=parentIn.parentNode ;
            var parentOut = document.getElementById(file.idOutput);
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
                if(tabElem[indice].inputs[j].id == file.idOutput )
                {
                    tabElem[indice].inputs[j].value = 0 ;
                    tabElem[indice].run();
                }
                }
            }
            supFunction(file.id);

}


// ----------------------------------------SELECTION---------------------------------------------
function SelectionnerElem( id ) {
  $("#"+id).css( "border","2px solid #0969eb" );//     ou bien outline
}

function DeSelectionnerElem( id ) {
  $("#"+id).css( "border","1px solid black" );
}

var Selection = false  , sel = null ;
var firstX = 0 ,firstY = 0 , newX = 0 , newY = 0;
var Xpoint1 , Xpoint2, Ypoint1, Ypoint2;

document.getElementById('workspace').addEventListener(
  'mousedown',
  function (e) {

    if ( (e.target.id.indexOf('workspace')!=-1)) {
      //===============================
      //------------   2 eme changemment -----------------------------

for(var k =0 ; k<elemtraite.length ; k++ ){
  destroyMenu(elemtraite[k].id);
  context.attach('#'+elemtraite[k].id, test_menu);
}
      //======================================
    if ( Selection == false && e.target.className != "image" && e.target.className.indexOf("nodeEspace")==-1  ) {
      for (var i = 0; i < tabSelectionElem.length; i++) {   //**
          if (tabSelectionElem[i].id.indexOf('Line')==-1 ) DeSelectionnerElem(tabSelectionElem[i].id);         //**
      }                                                     // si le click est sur le workplace (pour enlever la selecion)
      tabSelectionElem = [] ;                               //**
      //------------   3 eme changemment -----------------------------

      elemtraite=[];
      //-----------------------------------------

      DejaSelec = false ;
    }
                                //**
    if ( Selection == false && e.target.className != "image" && e.target.className.indexOf("nodeEspace")==-1 && e.button != 2 ) {
      firstX = e.clientX ;
      firstY = e.clientY - 50 ;   // 50 ---> navbar
      sel = document.createElement('div');
      sel.id = 'selection'+indice;indice++;
      sel.className = 'selection';
      document.getElementById('workspace').appendChild(sel);
      Selection = true;
    }
  }
  },false
);

document.getElementById('workspace').addEventListener(
  'mousemove',
  function (e) {

    if ( Selection == true ) {
      newX = e.clientX ;
      newY = e.clientY  - 50 ;

      if ( firstX < newX && firstY < newY ){
        sel.style.left = firstX + wScrollLeft +"px";
        sel.style.top = firstY + wScrollTop +"px";
        sel.style.height =  newY - firstY +"px" ;
        sel.style.width = newX - firstX +"px"  ;

      }
      if ( firstX < newX && firstY > newY ){
        sel.style.left = firstX+ wScrollLeft +"px";
        sel.style.height = firstY - newY+"px";
        sel.style.top =  newY + wScrollTop +"px" ;
        sel.style.width = newX - firstX +"px" ;

      }
      if ( firstX > newX && firstY < newY ){
        sel.style.width = firstX - newX+"px";
        sel.style.top = firstY+ wScrollTop +"px";
        sel.style.height =  newY- firstY +"px" ;
        sel.style.left = newX+ wScrollLeft +"px"  ;

      }
      if ( firstX > newX && firstY > newY ){
        sel.style.left = newX+ wScrollLeft + "px";
        sel.style.top = newY+ wScrollTop +"px";
        sel.style.height =  firstY - newY+"px" ;
        sel.style.width = firstX - newX+"px"  ;

      }
      Xpoint1 = parseInt(sel.style.left) ;                            Ypoint1 = parseInt(sel.style.top) ;
      Xpoint2 = parseInt(sel.style.left) + parseInt(sel.style.width); Ypoint2 = parseInt(sel.style.top) + parseInt(sel.style.height);
      SelectionnerElements();
    }
  },false
);

//----------------------------------------------------------------------------------
function SelectionnerElements() {
  tabSelectionElem=[];
  for (var i = 0; i < tabElem.length; i++) {
    var leftElem = parseInt(document.getElementById(tabElem[i].id).style.left);
    var topElem = parseInt(document.getElementById(tabElem[i].id).style.top);
    var widthElem = parseInt(document.getElementById(tabElem[i].id).style.width);
    var heightElem = parseInt(document.getElementById(tabElem[i].id).style.height);

    var x1 = leftElem, y1 = topElem ;
    var x2 = widthElem + leftElem, y2 = topElem ;                 // les 4 points extremites du composant.
    var x3 = leftElem, y3 = heightElem + topElem;
    var x4 = widthElem + leftElem, y4 = heightElem + topElem ;

    if ( x1 < Xpoint2 && x1 > Xpoint1 && y1 < Ypoint2 && y1 > Ypoint1 )
    {
      if (tabElem[i].id.indexOf('Line')==-1 )
      {
        SelectionnerElem(tabElem[i].id); tabSelectionElem.push(tabElem[i]); // plusieurs fois
      }
    }
    else if ( x2 < Xpoint2 && x2 > Xpoint1 && y2 < Ypoint2 && y2 > Ypoint1 )
    {
      if (tabElem[i].id.indexOf('Line')==-1 )
      {
        SelectionnerElem(tabElem[i].id); tabSelectionElem.push(tabElem[i]);
      }
    }
    else if ( x3 < Xpoint2 && x3 > Xpoint1 && y3 < Ypoint2 && y3 > Ypoint1 )
    {
      if (tabElem[i].id.indexOf('Line')==-1 )
      {
        SelectionnerElem(tabElem[i].id); tabSelectionElem.push(tabElem[i]);
      }
    }
    else if ( x4 < Xpoint2 && x4 > Xpoint1 && y4 < Ypoint2 && y4 > Ypoint1 )
    {
      if (tabElem[i].id.indexOf('Line')==-1 )
      {
        SelectionnerElem(tabElem[i].id); tabSelectionElem.push(tabElem[i]);
      }
    }
    else {
        if (tabElem[i].id.indexOf('Line')==-1 )
        {
          DeSelectionnerElem(tabElem[i].id);
        }
    }
  }
}
//=============================================
function rechercheElemTraite(id){
  var trouv = false ;
  for(var i =0 ; i<elemtraite.length ; i++){
    if(elemtraite[i].id == id ){trouv=true;break;}
  }
  return trouv ;
}
//==========================================
function destroyMenu(id){
  var dd=document.getElementById(id);
  $(('#'+id)).off('contextmenu');
}
//==========================================

document.addEventListener(
  'mouseup',
  function (e) {
    var k =0;
    if ( Selection == true ) {
      //------------   4 eme changemment -----------------------------

      for(var i =0 ; i<tabSelectionElem.length ; i++){
        if(rechercheElemTraite(tabSelectionElem[i].id)==false){
          elemtraite[k]=tabSelectionElem[i];
          destroyMenu(elemtraite[k].id);
          context.attach('#'+(elemtraite[k].id), menu_select);
           k++;
        }
      }
      Selection = false ;
      sel.remove();
      sel = null;
    }
  },false
);
//-----------------------------------------------SaveAction------------------------------------------------------------------

function SaveAction ()
{   if(NexPrev.length == 10){NexPrev.splice(0, 1);}
  	 for (var i =Ind+1 ; i<NexPrev.length ; i++)
  	 {
           NexPrev.splice(i, 1);
  	 }

     var espace = document.getElementById("workspace") ;
     var text1 = espace.innerHTML ;
    var TabToSave = {Elements  : tabElem , HTML : text1 , ind1 : indiceId , ind2 : indice , line : LineIDs} ;
    var text = JSON.stringify(TabToSave) ;
     NexPrev.push(text) ;
     Ind = NexPrev.length-1 ;
     document.getElementById('next').style.opacity = 0.5 ;
     if (Ind != 0){document.getElementById('previous').style.opacity = 1 ;}

}
//-----------------------------------------------Reset------------------------------------------------------------------

function Reset (text)
{

//------------------------------------------------------------------------------
tabElem = [];
          for (var i = 0; i < tabFunction.length; i++) {
              clearInterval(tabFunction[i].fct);
          }
      tabFunction =  [];
      LineIDs = [] ;

   //------------------------------------------------------------------------------

  var cpt = 0 ;
  var NewTab = JSON.parse(text);
          var espace = document.getElementById("workspace") ;
          espace.innerHTML = NewTab.HTML;
          InOut = 1 ;
          indice = NewTab.ind2 ;
          indiceId = NewTab.ind1 ;
          var Objet ;
          for (i=0;i<NewTab.Elements.length;i++)
          {
            if (( NewTab.Elements[i].id.indexOf('led')!=-1) || (NewTab.Elements[i].id.indexOf('HEX')!=-1))
                  {
                    Objet = new afficheurs(NewTab.Elements[i].id,NewTab.Elements[i].idParent);
                  }
                  else if (NewTab.Elements[i].idParent == "combi" || NewTab.Elements[i].idParent == "combicpl") { Objet = new LogicGates(NewTab.Elements[i].id,NewTab.Elements[i].idParent);}
                  else if (NewTab.Elements[i].idParent == "seq" || NewTab.Elements[i].idParent == "seqcpl") {Objet = new Sequentiel(NewTab.Elements[i].id,NewTab.Elements[i].idParent);}
                  else {
                  Objet = new Lines("0","0",0,"0","0","0");
                  Objet.idInput = NewTab.Elements[i].idInput;
                  Objet.idOutput = NewTab.Elements[i].idOutput;
                  Objet.value = NewTab.Elements[i].value ;
                  Objet.id = NewTab.Elements[i].id;
                  Objet.ls = document.getElementById(NewTab.line[cpt][0]);
                  Objet.lastX = NewTab.Elements[i].lastX ;
                  Objet.lastY = NewTab.Elements[i].lastY ;
                  Objet.i = NewTab.Elements[i].i;


                  for(var k = 1 ; k < NewTab.line[cpt].length;k++)
                  {
                    Objet.divs[k-1] = document.getElementById(NewTab.line[cpt][k]);

                  }
                  //-----------------------------------------------------------------------------------------
                   cpt++ ;
                  tabElem.push(Objet);
                  SaveIDs(Objet) ;
                  if (Mode == 1)
                  {
                      var fctID = setInterval(run,0,Objet);
                      tabFunction.push({fct :fctID, id : Objet.id });
                  }
                  }
                  if(NewTab.Elements[i].id.indexOf('Line')==-1) {
                  indice = indice + 1 ;
                  if (NewTab.Elements[i].id.indexOf('Horloge') != -1){Objet.time = NewTab.Elements[i].time/1000;}
                  Objet.CreerElem_standard(10,Objet.time,2,1);
                  var elem = document.getElementById(Objet.id);
                  context.attach('#'+elem.id, test_menu);
                  tabElem[tabElem.length-1].inputs = NewTab.Elements[i].inputs ;
                  tabElem[tabElem.length-1].outputs = NewTab.Elements[i].outputs ;
                   if(tabElem[tabElem.length-1].id.indexOf("DFF")!=-1||tabElem[tabElem.length-1].id.indexOf("TFF")!=-1||tabElem[tabElem.length-1].id.indexOf("JKFF")!=-1||tabElem[tabElem.length-1].id.indexOf("RSHFF")!=-1){tabElem[tabElem.length-1].etatfront = NewTab.Elements[i].etatfront ;}
                }


          }
          $(".nodeEspace").draggable({
            helper: 'original',
            cursor: 'move',
            tolerance: 'fit',
            revert: 'invalid'
        });
          InOut = 0 ;

          if ( Ind >= 0 ){

            for (var k = 0; k < tabChrono.length; k++) {
            var supprimer = true ;
            for (var i = 0; i < tabElem.length; i++) {
              for (var j = 0; j < tabElem[i].inputs.length; j++) { if ( tabElem[i].inputs[j].id == tabChrono[k].objet.id ) { supprimer = false; } }
              for (var j = 0; j < tabElem[i].outputs.length; j++) { if ( tabElem[i].outputs[j].id == tabChrono[k].objet.id ) { supprimer = false; } }
            }
            if ( supprimer == true ) {
              document.getElementById(tabChrono[k].objet.parentId).remove();
              clearInterval(tabChrono[k].fct);
              tabChrono.splice(k,1);
              }
          }
        }

        $(".noteDiv").draggable({
          helper: 'original',
          cursor: 'move',
          tolerance: 'fit',
          revert: 'invalid'
      });
      var notes = document.getElementsByClassName('closeNote');
      for ( var i = 0 ; i < notes.length ; i ++) {
        notes[i].id  = "closeNote" + nbNotes ;
        nbNotes++;
      }
      nbNotes = nbNotes - notes.length ;
      notes = document.getElementsByClassName('textNote');
      for ( var i = 0 ; i < notes.length ; i ++) {
        notes[i].id  = "noteText" + nbNotes ;
        nbNotes++;
      }


}
//------------------------------------------ agrandir l'espace du travail ---------------------------------------------------------------------


document.getElementById('boutonAddEspace').addEventListener(
  'click',
  function () {
    scrollCpt++;
    var sizeDiv = document.createElement('div');
    sizeDiv.className = "sizeDiv";
    sizeDiv.id = "sizeDiv" + indice ; indice ++ ;
    sizeDiv.style.top =  sizeHeight + sizePx + "px";
    sizeDiv.style.left = sizeWidth + sizePx + "px" ;
    sizePx += 1000;
    document.getElementById('workspace').appendChild(sizeDiv);
    tabSizeElem.push(sizeDiv.id);
  },false
);

document.getElementById('boutonRemoveEspace').addEventListener(
  'click',
  function () {
    scrollCpt--;
    $("#"+tabSizeElem.pop()).remove();
      if (sizePx > 0 ) sizePx -= 1000;
  },false
);

// ------- les evenements de la fenetre ----------

var boolWindow = 0 ;

window.onfocus = function() {
  if ( Mode == 0 && boolWindow == 0){
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
      		document.getElementById('stop').style.opacity = 1;
      		document.getElementById('runn').style.opacity = 0.5 ;

  }
};

window.onblur = function() {
  if ( Mode == 0 ) boolWindow = 1 ;
  if ( Mode == 1 ){
	  for (var i = 0;i<tabFunction.length;i++)
      		{
                 clearInterval(tabFunction[i].fct);
      		}
      	  	Mode = 0 ;
            tabFunction = [] ;
      	  	document.getElementById('stop').style.opacity = 0.5;
            document.getElementById('runn').style.opacity = 1 ;
            boolWindow = 0 ;
      	}

};
