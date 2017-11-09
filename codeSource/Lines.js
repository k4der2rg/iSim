

//--------------------------------- Les variables globales necessaires ----------------------------------------
var size = 2; // la taille du fil
var centre = 6;
var dontDelete = 0;
var drawing = 0;
var x,y;
var pos = [0,0];
var id1 ;
var id2 = document.getElementById('workspace');
var id3 ;
var indiceId = 0 ;
var draggedElementId;
var dragging = 0 ;
var done = 0 ;
var moved = 0 ;
var draggineLine = 0 ;
var line;
var id;
var inPos;
var hold = 0 ;
var boolOUT;
var maxY = 0 ;
var minY = 0 ;
var fixedMin = false ;
var fixedMax = false ;
var curvedline = false;
var curvedlineY = 0 ;
var borders = false;
var draggingLineStated = false ;
var y1, y2, x1, x2;
//--------------------------------- Realisation de la classe Lines  ----------------------------------------
function Lines(idInput, idOutput, value, id, idLine2, idLine3 ) {

  this.idInput = idInput; //contient l’identité de la sortie d’un composant source.
  this.idOutput = idOutput; // contient l’identité de l’entré d’un composant destination.
  this.value = value ; // contient la valeur logique ( 1 ou 0 selon la valeur fournit par l’élément source ).
  this.ids;
  this.id; // Contient l’identité du fil
  this.divsId = new Array(); // Un tableau qui contient tous les identités des touts le morceaux du fil ( ils sont des éléments HTML )
  this.divs = new Array(); // Un tableau qui contient tous les morceaux du fil ( ils sont des éléments HTML )
  this.ls;
  this.i=0;
  this.differenceX;
  this.differenceY;
  this.color = '#333'; // Un attribut de type chaine de caractère qui contient la couleur selon la valeur contenant par le fil (rouge si la valeur 1 et noir si la valeur 0).
  var fixing = false ;
  this.inposA = new Array();
  this.inposB = new Array();
  this.inposAA = new Array();
  this.inposBB = new Array();
  this.lastX ;
  this.lasty ;

// les Methodes :
//------------------------------------------------------------------------------------------------------------------------------//
// cette methode a comme rôle de donner la main à l’utilisateur pour commencer à dessiner le fil.
//------------------------------------------------------------------------------------------------------------------------------//

  this.DrawingBegin = function (e) {
      id1 = document.getElementById(e.target.id);
      if( drawing == 0) {
      dontDelete = 0
      drawing = 1;
      var inPos = findPos(id1);
      x = inPos[0] + centre; y = inPos[1] + centre;
      this.ls = creatDiv();
      this.ls.id = "Line"+indiceId ; indiceId++ ;
      this.ls.style.width = "12px";
      this.divs[0] = creatDiv();
      this.divs[0].id = "Line"+indiceId ; indiceId++ ;
      this.id = this.divs[0].id;
      this.divsId[0] = this.divs[0].id;
      this.divs[1]= creatDiv();
      this.divs[1].id = "Line"+indiceId ; indiceId++ ;
      this.idLine2 = this.divs[0].id;
      this.divs[0].style.left = x + "px";
      this.divs[0].style.top = y + "px";
      this.divs[1].style.left = x + "px";
      this.divs[1].style.top = y + "px";
      id2.appendChild(this.ls);
      id2.appendChild(this.divs[0]);
      id2.appendChild(this.divs[1]);
      }
  }

//------------------------------------------------------------------------------------------------------------------------------//
// Cette méthode nous permet de visualiser le chemin du fil à chaque fois le curseur est déplacé
//------------------------------------------------------------------------------------------------------------------------------//

  this.Drawing = function (e)
  {
      var espace = 10 ;
      var elem = document.getElementById(document.getElementById(this.idInput).parentNode.id);
      var half = 0;
      var cas1 , cas2 , cas3 , cas4 ;

      inPos = findPos(document.getElementById(this.idInput));
      if( this.i == 0 ) { x = inPos[0] +13 + parseInt(this.ls.style.width); y = inPos[1] +6; }
      else { x = this.lastX ; y = this.lastY ;}
      pos = getMousePositionRelativeTo(e,id2);
      pos[0] = parseInt(pos[0]) + parseInt(wScrollLeft);
      pos[1] = parseInt(pos[1]) + parseInt(wScrollTop);
      pos[1] = pos[1] - pos[1]%(indiceMove) + 2 ;
      pos[0] = pos[0] - pos[0]%(indiceMove) + 1 ;
      if (fixedMin == true && pos[1] > minY) { pos[1] = minY; }
      if (fixedMax == true && pos[1] < maxY) { pos[1] = maxY; }
      this.differenceX = Math.abs(pos[0] - x);
      this.differenceY = Math.abs(pos[1] - y);
      cas1 = (pos[0] >= x) && (pos[1] >= y) ;
      cas2 = (pos[0] >= x) && (pos[1] < y) ;
      cas3 = (pos[0] < x) && (pos[1] >= y) ;
      cas4 = (pos[0] < x) && (pos[1] < y) ;
      this.ls.style.left = findPos(document.getElementById(this.idInput))[0] + 12 + "px";
      this.ls.style.top = findPos(document.getElementById(this.idInput))[1] + 6 +"px";
      // ------------------------------------------ 1er cas -------------------------------------//
      if( cas1 ) {
      this.divs[this.i].style.top = y  + "px"
      this.divs[this.i].style.left = x - 1 +"px";
      this.divs[this.i].style.height = this.differenceY  +"px";
      this.divs[this.i+1].style.left = this.divs[this.i].style.left;
      this.divs[this.i+1].style.top = pos[1] -2 + "px";
      this.divs[this.i+1].style.width = this.differenceX + 1 +"px";
      this.divs[this.i].style.width = size + "px" ;
      this.divs[this.i+1].style.height = size + "px" ;
      curvedline = false ;
      }
      // ------------------------------------------ 2eme cas -------------------------------------//
      else if ( cas2 ){
      this.divs[this.i].style.top = pos[1] - 2 + "px"
      this.divs[this.i].style.left = x - 1 +"px";
      this.divs[this.i].style.height = this.differenceY + 4 +"px";
      this.divs[this.i+1].style.left = this.divs[this.i].style.left ;
      this.divs[this.i+1].style.top = pos[1] - 2+ "px";
      this.divs[this.i+1].style.width = this.differenceX + 1 +"px";
      this.divs[this.i].style.width = size + "px" ;
      this.divs[this.i+1].style.height = size + "px" ;
      curvedline = false ;
      }
      // ------------------------------------------ 3eme et 4eme cas ------------------------------//
      else if ( cas3 || cas4 ){
      if ((this.differenceY < half) && (pos[0] < x) && this.i == 0) {
          curvedline = true ;
          if( pos[1] > y) {
          this.differenceY = half +2 ;
          curvedlineY = y + half;
          }
          else {
          this.differenceY = half -2 ;
          curvedlineY = y - half;
          }
      } else {
          curvedline = false ;
      }
      // ------------------------------------------ 3eme cas -------------------------------------//
      if( cas3 ) {
      this.divs[this.i].style.top = y  + "px"
      this.divs[this.i].style.left = x - 1 +"px";
      this.divs[this.i].style.height = this.differenceY +"px";
      this.divs[this.i+1].style.left =  x - this.differenceX - 1 +"px";
      this.divs[this.i+1].style.top = y + this.differenceY - 2 + "px";
      this.divs[this.i+1].style.width = this.differenceX + size +"px";
      this.divs[this.i+1].style.height = size + "px" ;
      this.divs[this.i].style.width = size + "px" ;
      }
      // ------------------------------------------ 4eme cas -------------------------------------//
      else if ( cas4 ){
      this.divs[this.i].style.top = y - this.differenceY  +"px"
      this.divs[this.i].style.left = x -1 +"px";
      this.divs[this.i].style.height = this.differenceY + size +"px";
      this.divs[this.i+1].style.left =  x - this.differenceX - 1 +"px";
      this.divs[this.i+1].style.top = y - this.differenceY - 2 + "px";
      this.divs[this.i+1].style.width = this.differenceX + size +"px";
      this.divs[this.i+1].style.height = size + "px" ;
      this.divs[this.i].style.width = size + "px" ;
      }
      }
  }

//------------------------------------------------------------------------------------------------------------------------------//
// cette méthode nous donne la possibilité de dessiner le fil de tels sort qu’elle fixe des morceaux du fil et donne la main pour dessiner des autres. Elle aide l’utilisateur pour mieux visualiser le circuit.
//------------------------------------------------------------------------------------------------------------------------------//

  this.Continue = function (e) {
      x = e.clientX - e.clientX%(indiceMove)  + parseInt(wScrollLeft)  ;
      y = e.clientY - e.clientY%(indiceMove) - 40 + parseInt(wScrollTop) ;

      this.i = this.i + 2;
      this.divs[this.i] = creatDiv();
      this.divs[this.i].id = "Line"+indiceId ; indiceId++ ;
      this.divs[this.i+1]= creatDiv();
      this.divs[this.i+1].id = "Line"+indiceId ; indiceId++ ;
      id2.appendChild(this.divs[this.i]);
      id2.appendChild(this.divs[this.i+1]);
      if(fixedMin && y > minY) { y = minY-2; }
      if(fixedMax && y < maxY) { y = maxY-2; }
      if(curvedline) { y = curvedlineY; }
      this.lastX = x ;
      this.lastY = y ;
      if ( parseInt(this.divs[this.i-1].style.width) < 10 ) {
      if( parseInt(this.divs[this.i-1].style.top) > (parseInt(this.divs[this.i-2].style.top) + 2) )   {
          fixedMin = false;
          fixedMax = true ;
          maxY = parseInt(this.divs[this.i-1].style.top) + parseInt(this.divs[this.i-1].style.height) ;
      }
      else {
          fixedMax = false ;
          fixedMin = true;
          minY = parseInt(this.divs[this.i-1].style.top) + 2 ;
      }
      } else {
          fixedMin = false;
          fixedMax = false ;
      }

  }

//------------------------------------------------------------------------------------------------------------------------------//
// cette méthode termine le procédure de dessiner un fil.
//------------------------------------------------------------------------------------------------------------------------------//

  this.DrawingEnd = function (e)
  {
    if (e.target.getAttribute('occuped') == 0 ) {
    e.target.setAttribute('occuped','1');
    var x = findPos(document.getElementById(this.idOutput))[0]
    this.divs[this.i+1].style.width = parseInt(this.divs[this.i+1].style.width) -5 + "px";
    boolOUT = true;
    this.inposB = findPos(document.getElementById(this.idOutput)) ;
    this.inposB[1] = this.inposB[1] + 6 ;
    if( this.i != 0 )  {
    if ( parseInt(this.divs[this.i-1].style.left) >= parseInt(this.divs[this.i-2].style.left)) {
        this.inposA[0] = parseInt(this.divs[this.i-1].style.left) + parseInt(this.divs[this.i-1].style.width) - 2 ;
        this.inposA[1] = parseInt(this.divs[this.i-1].style.top)  ;
    }
    else {
        this.inposA[0] = parseInt(this.divs[this.i-1].style.left)  ;
        this.inposA[1] = parseInt(this.divs[this.i-1].style.top)  ;
    }
    }
    else {
    if ( parseInt(this.divs[1].style.left) <= findPos(document.getElementById(this.idInput))[0] )  {
        if(parseInt(this.divs[1].style.left) < parseInt(this.divs[0].style.left)) {
        this.inposA[0] = findPos(document.getElementById(this.idInput))[0] +11 ;
        this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
    } else {
        this.inposA[0] = findPos(document.getElementById(this.idInput))[0] - 11 - parseInt(this.ls.style.width);
        this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
    }
    } else {
        this.inposA[0] = findPos(document.getElementById(this.idInput))[0] + 11 + parseInt(this.ls.style.width);
        this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
    }
    }
    this.regler();
  } else {
    this.remove();
  }
     drawing = 0 ;
     dontDelete = 1 ;
  }

//------------------------------------------------------------------------------------------------------------------------------//
// Après avoir dessiné le fil, si l’utilisateur veut déplacer le composant source ou le composant destination cette méthode assure que le fil soit toujours bien lié. Elle appelle la méthode ‘relger ‘.
//------------------------------------------------------------------------------------------------------------------------------//

  this.update = function (e) {
      this.inposB = findPos(document.getElementById(this.idOutput)) ;
      this.inposB[1] = this.inposB[1] + 6 ;
      this.inposAA = findPos(document.getElementById(this.idInput));
      this.inposAA[1] = this.inposAA[1] + 6;

      if( hold == 0 ) {
      if( this.i != 0 )  {
      if ( parseInt(this.divs[this.i-1].style.left) >= parseInt(this.divs[this.i-2].style.left)) {
          this.inposA[0] = parseInt(this.divs[this.i-1].style.left) + parseInt(this.divs[this.i-1].style.width) - 2 ;
          this.inposA[1] = parseInt(this.divs[this.i-1].style.top)  ;
      }
      else {
          this.inposA[0] = parseInt(this.divs[this.i-1].style.left)  ;
          this.inposA[1] = parseInt(this.divs[this.i-1].style.top)  ;
      }
      }
      else {
      if ( parseInt(this.divs[1].style.left) <= findPos(document.getElementById(this.idInput))[0] )  {
          if(parseInt(this.divs[1].style.left) < parseInt(this.divs[0].style.left)) {
          this.inposA[0] = findPos(document.getElementById(this.idInput))[0] +11 ;
          this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
      } else {
          this.inposA[0] = findPos(document.getElementById(this.idInput))[0] - 11 - parseInt(this.ls.style.width);
          this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
      }
      } else {
          this.inposA[0] = findPos(document.getElementById(this.idInput))[0] + 11 + parseInt(this.ls.style.width);
          this.inposA[1] = findPos(document.getElementById(this.idInput))[1] + 6;
      }
      }
      if ( parseInt(this.divs[0].style.left) > parseInt(this.divs[1].style.left) ) {
          this.inposBB[0] = parseInt(this.divs[1].style.left) + parseInt(this.divs[1].style.width);
          this.inposBB[1] = parseInt(this.divs[1].style.top) + parseInt(this.divs[1].style.height);
      }
      else {
          this.inposBB[0] = parseInt(this.divs[1].style.left);
          this.inposBB[1] = parseInt(this.divs[1].style.top);
      }
      }
      hold = 1 ;
      this.regler ();

  }
//------------------------------------------------------------------------------------------------------------------------------//
// C’est une méthode qui intervient dans le déplacement d’un composant.
//------------------------------------------------------------------------------------------------------------------------------//

  this.regler = function () {
      if(boolOUT) {
      if (this.inposA[1]>this.inposB[1]) {
          if(this.inposA[0]>this.inposB[0]) { // TOP LEFT
          this.divs[this.i].style.top = this.inposA[1] - Math.abs(this.inposA[1] - this.inposB[1])  +"px";
          this.divs[this.i].style.height = Math.abs(this.inposB[1] - this.inposA[1]) + 2 + "px";
          this.divs[this.i+1].style.left = this.inposB[0] + 2  +"px";
          this.divs[this.i+1].style.top = this.inposA[1] - Math.abs(this.inposA[1] - this.inposB[1])   +"px";
          this.divs[this.i+1].style.width = Math.abs(parseInt(this.divs[this.i].style.left) - this.inposB[0]) +"px" ;
          } else { // TOP RIGHT
          this.divs[this.i].style.top = this.inposA[1] - Math.abs(this.inposA[1] - this.inposB[1])   +"px";
          this.divs[this.i].style.height = Math.abs(this.inposB[1] - this.inposA[1])  + 2  + "px";
          this.divs[this.i+1].style.left = parseInt(this.divs[this.i].style.left)  + "px";
          this.divs[this.i+1].style.top = this.inposA[1] - Math.abs(this.inposA[1] - this.inposB[1]) + "px";
          this.divs[this.i+1].style.width = Math.abs(parseInt(this.divs[this.i].style.left) - this.inposB[0]) + 2 +"px" ;
          }
          } else {
          if(this.inposA[0]>this.inposB[0]) { // BOTTOM LEFT
          this.divs[this.i].style.top = this.inposA[1]  +"px";
          this.divs[this.i].style.height = Math.abs(this.inposA[1] - this.inposB[1])   +"px";
          this.divs[this.i+1].style.top = this.inposA[1] + Math.abs(this.inposA[1] - this.inposB[1]) +"px";
          this.divs[this.i+1].style.left = this.inposB[0] + 2 +"px";
          this.divs[this.i+1].style.width = Math.abs(parseInt(this.divs[this.i].style.left) - this.inposB[0])  +"px" ;
          } else { // BOTTOM RIGHT
          this.divs[this.i].style.top = this.inposA[1]  +"px";
          this.divs[this.i].style.height = Math.abs(this.inposA[1] - this.inposB[1]) + 2 +"px";
          this.divs[this.i+1].style.left = parseInt(this.divs[this.i].style.left)  +"px";
          this.divs[this.i+1].style.top = this.inposA[1] + Math.abs(this.inposA[1] - this.inposB[1])  +"px";
          this.divs[this.i+1].style.width = Math.abs(parseInt(this.divs[this.i].style.left) - this.inposB[0]) + 2  +"px" ;
          }
          }
      }
      if(!boolOUT) {
      if (this.inposAA[1]>this.inposBB[1]) {
          if(this.inposAA[0]>this.inposBB[0]) {  // BOTTOM RIGHT
          this.ls.style.width = Math.abs(this.inposAA[0] - this.inposBB[0]) - centre + "px";
          this.ls.style.left = parseInt(this.divs[0].style.left) + "px";
          this.ls.style.top = this.inposAA[1]  + "px";
          this.divs[0].style.top = this.inposBB[1] + "px";
          this.divs[0].style.height = Math.abs(this.inposAA[1] - this.inposBB[1])  + "px";
          } else {  // BOTTOM LEFT
          this.ls.style.width = Math.abs(this.inposAA[0] - this.inposBB[0]) - 2*centre + "px";
          this.ls.style.left = this.inposAA[0] + 2*centre + "px";
          this.ls.style.top = this.inposAA[1]  + "px";
          this.divs[0].style.top = this.inposBB[1] + "px";
          this.divs[0].style.height = Math.abs(this.inposAA[1] - this.inposBB[1])  + 2 + "px";
          }
          } else {
          if(this.inposAA[0]>this.inposBB[0]) {  // TOP RIGHT
          this.ls.style.width = Math.abs(this.inposAA[0] - this.inposBB[0]) - centre + "px";
          this.ls.style.left = parseInt(this.divs[0].style.left) + "px";
          this.ls.style.top = this.inposAA[1]  + "px";
          this.divs[0].style.top = this.inposAA[1]  + "px";
          this.divs[0].style.height = Math.abs(this.inposAA[1] - this.inposBB[1])  + "px";
          } else {  // TOP LEFT
          this.ls.style.width = Math.abs(this.inposAA[0] - this.inposBB[0]) - 2*centre + "px";
          this.ls.style.left = this.inposAA[0] + 2*centre + "px";
          this.ls.style.top = this.inposAA[1]  + "px";
          this.divs[0].style.top = this.inposAA[1]  + "px";
          this.divs[0].style.height = Math.abs(this.inposAA[1] - this.inposBB[1]) + 2 + "px";
          }
          }
      }

  }

//------------------------------------------------------------------------------------------------------------------------------//
// Le rôle de cette méthode est de supprimer un fil, elle supprime tous les éléments qui composent ce fil.
//------------------------------------------------------------------------------------------------------------------------------//

  this.remove = function () {
      this.ls.remove();
      for ( var l = 0 ; l < this.divs.length ; l ++ ) {
        this.divs[l].remove();
      }
      var inn = document.getElementById(this.idInput);
      inn.style.backgroundColor = "white";
      var outt = document.getElementById(this.idOutput);
      if(outt != null ) outt.style.backgroundColor = "white";
      this.idOutput = null ;
      this.idInput = null ;
      drawing = 0 ;
      fixedMax = false;
      fixedMin = false;
      curvedline = false;
    }

//------------------------------------------------------------------------------------------------------------------------------//
// Le rôle principal de cette méthode est de transférer l’information à partir la sortie de l’élément source vers l’entrée de l’autre élément.
//------------------------------------------------------------------------------------------------------------------------------//

  this.run = function () {
      if( this.idInput != null  && this.idOutput != null ) {
          var parentIn = document.getElementById(this.idInput);
          parentIn=parentIn.parentNode ;
          var parentOut = document.getElementById(this.idOutput);
          parentOut=parentOut.parentNode ;
          //-------- la Mise a jour
          var i ,j,val,indice,ind1 = 0 ,ind2 = 0 ;
          for(i=0;i<tabElem.length;i++) {
              if(tabElem[i].id==parentIn.id ) {
              for (j=0;j<tabElem[i].outputs.length;j++) {
                  if(tabElem[i].outputs[j].id == this.idInput ){
                  ind1 = i ;
                  ind2 = j ;
                  if(document.getElementById(get_original_id(parentIn.id)).className.indexOf('onlyckl')!=-1 && document.getElementById(get_original_id(parentOut.id)).className.indexOf('onlyckl')!=-1 && (parentIn.id != parentOut.id)) {
                      var z = searchIndex(parentOut.id) ;
                      if (tabElem[i].change == false && tabElem[z].change == false) {  this.value = tabElem[i].outputs[j].value ; }
                      } else {this.value = tabElem[i].outputs[j].value ; }
                  }
                }
              }
              if(tabElem[i].id==parentOut.id ) {  indice = i ; }
          }
          for (j=0;j<tabElem[indice].inputs.length;j++) {
                if(tabElem[indice].inputs[j].id == this.idOutput ){
                    if(j == 1){this.value = tabElem[ind1].outputs[ind2].value;}
                    if(tabElem[indice].inputs[j].logique == 1){ tabElem[indice].inputs[j].value = this.value; }
                    else { tabElem[indice].inputs[j].value = !this.value; }
                    if(tabElem[indice].id.indexOf("switch") == -1 && tabElem[indice].id.indexOf("Horloge") == -1) { tabElem[indice].run(); }
                    tabElem[indice].cptInputs++ ;}
              }
          }
    }
//------------------------------------------------------------------------------------------------------------------------------//
// Cette méthode mit à jour et la couleur de fil à chaque fois qu’on a une modification dans la valeur de la sortie du composant source.
//------------------------------------------------------------------------------------------------------------------------------//

  this.updateColor = function ( value ) {
    if( this.idInput != null  && this.idOutput != null ) {
      var inn = document.getElementById(this.idInput);
      var outt = document.getElementById(this.idOutput);
      if(value == 1) {
          inn.style.backgroundColor = "red";
          if( outt.childNodes.length == 0 ) outt.style.backgroundColor = "red";
          else outt.style.backgroundColor = "white";
          this.ls.style.backgroundColor = "red";
          this.color = 'red';
          for ( var i = 0 ; i < this.divs.length ; i ++ ){
            this.divs[i].style.backgroundColor = "red";
          }
      } else {
          inn.style.backgroundColor = "white";
          if( outt.childNodes.length == 0 ) outt.style.backgroundColor = "white";
          else outt.style.backgroundColor = "red";
          this.ls.style.backgroundColor = "#333";
          this.color = '#333';
          for ( var i = 0 ; i < this.divs.length ; i ++ ){
            this.divs[i].style.backgroundColor = "#333";
          }
      }
        for( var i = 0 ; i < this.divs.length ; i ++ ) {
          var children = this.divs[i].childNodes;
          for ( var j = 0 ; j < children.length ; j ++ ) {
              children[j].style.backgroundColor = this.color;
              if(parseInt(this.divs[i].style.width) < 5 ) {
              this.divs[i].style.borderLeft = "1px solid " + this.color;
              this.divs[i].style.borderRight = "1px solid " + this.color;
              }
              else {
                this.divs[i].style.borderTop = "1px solid " + this.color;
              this.divs[i].style.borderBottom = "1px solid " + this.color;
              }
          }
        }
    }
}
//------------------------------------------------------------------------------------------------------------------------------//
// C’est une méthode très importante car elle nous donne la possibilité de sélectionner un morceau d’un fil et le déplacer, mais elle assure toujours la bonne connexion entre les morceaux.
//------------------------------------------------------------------------------------------------------------------------------//

  this.dragLine = function (e,id) {
      var indice = -1 , x, y, d1, d2;
      for ( var i = 0 ; i < this.divs.length ; i++ ) {
          if (this.divs[i].id == id ) indice = i;
      }
      if ( indice >= 0  && indice != this.i+1) {
          if( parseInt(this.divs[indice].style.width) < 10 ) { // si le fil est vertical ..
              x = parseInt(e.clientX) - parseInt(e.clientX)%(indiceMove) - 1 + wScrollLeft;
              if ( !draggingLineStated ) {
                  if( indice != 0 ) x1 = parseInt(this.divs[indice-1].style.left);
                  else x1 = parseInt(this.ls.style.left);
                  x2 = parseInt(this.divs[indice+1].style.left);
                  if (Math.abs(x - x1) < 10 && Math.abs(x - x2) < 10 ) {
                  if( indice != 0 ) { x1 = parseInt(this.divs[indice-1].style.left) + parseInt(this.divs[indice-1].style.width); }
                  else { x1 = parseInt(this.ls.style.left) + parseInt(this.ls.style.width); }
                  x2 = parseInt(this.divs[indice+1].style.left) + parseInt(this.divs[indice+1].style.width)  ;
                  }
                  else if ( x > x1 && x > x2 && Math.abs(x - x1) >= 10 && Math.abs(x - x2) >= 10) { /* on ne change rien */ }
                  else if( x1 < x2) {
                  x2 = parseInt(this.divs[indice+1].style.left) + parseInt(this.divs[indice+1].style.width)  ;
                  } else {
                  if( indice != 0 ) { x1 = parseInt(this.divs[indice-1].style.left) + parseInt(this.divs[indice-1].style.width); }
                  else { x1 = parseInt(this.ls.style.left) + parseInt(this.ls.style.width); }
                  }
                  draggingLineStated = true ;
              }
              d1 = Math.abs(x - x1);
              d2 = Math.abs(x - x2);
              this.divs[indice].style.left = x + "px";
              if ( x < x1 ) {
                  if( indice != 0 ) {
                  this.divs[indice-1].style.left = x + "px";
                  this.divs[indice-1].style.width = d1 + "px";
                  } else {
                  this.ls.style.left = x + "px";
                  this.ls.style.width = d1 + "px";
                  }
              }
              else if ( x >= x1) {
                  if( indice != 0 ) {
                  this.divs[indice-1].style.left = x1 + "px";
                  this.divs[indice-1].style.width = d1 + "px";
                  } else {
                  this.ls.style.left = x1 + "px";
                  this.ls.style.width = d1 + "px";
                  }
              }
              if ( x <= x2 ) {
                  this.divs[indice+1].style.left = x + "px";
                  this.divs[indice+1].style.width = d2 + "px";
              }
              else if ( x > x2 ) {
                  this.divs[indice+1].style.left = x2 + "px";
                  this.divs[indice+1].style.width = d2 + "px";
              }
          }

        if( parseInt(this.divs[indice].style.height) < 10 ) {   // if the line is horizontal ..
            y = parseInt(e.clientY) - parseInt(e.clientY)%(indiceMove) - 40 + wScrollTop;
            if ( !draggingLineStated ) {
                y1 = parseInt(this.divs[indice-1].style.top);
                y2 = parseInt(this.divs[indice+1].style.top);
                if (Math.abs(y - y1) < 10 && Math.abs(y - y2) < 10) {
                y1 = parseInt(this.divs[indice-1].style.top) + parseInt(this.divs[indice-1].style.height)  ;
                y2 = parseInt(this.divs[indice+1].style.top) + parseInt(this.divs[indice+1].style.height)  ;
                }
                else if ( y > y1 && y > y2 ) {  /* on ne change rien */ }
                else if( y1 < y2) {
                y2 = parseInt(this.divs[indice+1].style.top) + parseInt(this.divs[indice+1].style.height)  ;
                } else {
                y1 = parseInt(this.divs[indice-1].style.top) + parseInt(this.divs[indice-1].style.height)  ;
                }
                draggingLineStated = true ;
            }
            d1 = Math.abs(y - y1);
            d2 = Math.abs(y - y2);
            this.divs[indice].style.top = y + "px";
            if ( y < y1 ) {
                this.divs[indice-1].style.top = y + "px";
                this.divs[indice-1].style.height = d1 + "px";
            }
            else if ( y >= y1) {
                this.divs[indice-1].style.top = y1 + "px";
                this.divs[indice-1].style.height = d1 + "px";
            }

            if ( y < y2 ) {
                this.divs[indice+1].style.top = y + "px";
                this.divs[indice+1].style.height = d2 + "px";
            }
            else if ( y >= y2 ) {
                this.divs[indice+1].style.top = y2 + "px";
                this.divs[indice+1].style.height = d2 + "px";
            }
        }
    }
    this.lastX = parseInt(this.divs[this.i].style.left) +1 ;
    if ( this.i != 0 ) this.lastY = parseInt(this.divs[this.i-1].style.top) ;
    else this.lastY = parseInt(this.ls.style.top)  ;

  }

//------------------------------------------------------------------------------------------------------------------------------//
// C’est une méthode qui a un rôle de modifier le style d’un morceau sélectionné d’un fil.
//------------------------------------------------------------------------------------------------------------------------------//

  this.selectedLine = function(id) {
    var lineDiv = document.getElementById(id);
    if(parseInt(lineDiv.style.width) == size ) {
        var borderTop = document.createElement('div');
        var borderBottom = document.createElement('div');
        borderTop.className = "LineBorders";
        borderBottom.className = "LineBorders";
        borderTop.style.height = "8px";
        borderTop.style.width = "8px";
        borderTop.style.backgroundColor = this.color ;
        borderTop.style.marginLeft = "-3px";
        borderTop.style.marginTop = "-3px";
        borderBottom.style.height = "8px";
        borderBottom.style.width = "8px";
        borderBottom.style.backgroundColor = this.color ;
        borderBottom.style.marginLeft = "-3px";
        borderBottom.style.marginTop = parseInt(lineDiv.style.height) - 10 + "px";
        lineDiv.style.borderLeft = "1px solid " + this.color;
        lineDiv.style.borderRight = "1px solid " + this.color;
        lineDiv.appendChild(borderTop);
        lineDiv.appendChild(borderBottom);
        borders = true ;
    } else if ( parseInt(lineDiv.style.height) == size ) {
        var borderTop = document.createElement('div');
        var borderBottom = document.createElement('div');
        borderTop.className = "LineBorders";
        borderBottom.className = "LineBorders";
        borderTop.style.height = "8px";
        borderTop.style.width = "8px";
        borderTop.style.backgroundColor = this.color;
        borderTop.style.marginLeft = "-3px";
        borderTop.style.marginTop = "-3px";
        borderBottom.style.height = "8px";
        borderBottom.style.width = "8px";
        borderBottom.style.backgroundColor =  this.color;
        borderBottom.style.marginLeft = parseInt(lineDiv.style.width) - 5 + "px";
        borderBottom.style.marginTop = "-8px";
        lineDiv.style.borderTop = "1px solid " + this.color;
        lineDiv.style.borderBottom = "1px solid " + this.color;
        lineDiv.appendChild(borderTop);
        lineDiv.appendChild(borderBottom);
        borders = true ;
    }
  }
//------------------------------------------------------------------------------------------------------------------------------//
// C’est la méthode qui fait le travail inverse de ‘selectedLine’, elle désactive le style d’un morceau désélectionné.
//------------------------------------------------------------------------------------------------------------------------------//
  this.unselectedLine = function(id) {
    var lineDiv = document.getElementById(id);
    lineDiv.style.border = "0px solid #333";
    var listEnfants = lineDiv.childNodes;
    for ( var i = 0 ; i < listEnfants.length ; i ++ ) {
      if ( listEnfants[i].className == 'LineBorders'){
        listEnfants[i].remove();
        i--;
      }
    }
  }
}

//--------------------------------- Les evenements de la classe Lines ----------------------------------------
  var file;

  document.addEventListener('click', function(e){
        if ((e.target.id.indexOf('output')!=-1) && drawing == 1 ) { // si l'utilisateur essayer de dessiner un fil d'entré vers une autre entré
        file.remove();                                              // done le fil est supprimer.
      }

      else if (e.target.id.indexOf('input')!=-1 && drawing == 1 && e.target.getAttribute('occuped') == 0 ) {  // si l'utilisateur a dessiné un fil correctement.
        file.idOutput = e.target.id ;
        file.DrawingEnd(e);
        tabElem.push(file);
        if(Mode == 1) {
        var fctID = setInterval(run,0,tabElem[tabElem.length-1]);
        tabFunction.push({fct :fctID, id : file.id });
        }
        SaveIDs(file);
        SaveAction();
        file = null ;
      }

      else if (e.target.id.indexOf('input')!=-1 && drawing == 0 && e.target.getAttribute('occuped') == 1 ) { // si l'utilisateur veut change un fil deja dessiner.
        if (!stopProp && takeLine == true)
        {
            file = getFile(e.target.id);
            WhenRemoveFile(file) ;
            removeElemFromTabElem(file);
            e.target.setAttribute('occuped','0');
            drawing = 1 ;
        }
        takeLine = true;
      }

      else if (e.target.id.indexOf('output')!=-1 ) { // si l'utilisateur veut dessiner un fil.
        if (!stopProp) {
        inverserStart = false ;
        file = new Lines("0","0",0,"0");
        file.idInput = e.target.id ;
        file.DrawingBegin(e);
        }
      }

      else if ( drawing == 1  && e.target.id.indexOf('workspace')!=-1){ // si l'utilisateur a cliqué dans l'espace pour fixer un morceau d'un fil.
      file.Continue(e) ;
      }

    },false);

  document.addEventListener('mousemove', function (e){ // evenement de mouvement du curseur pour dessiner le fil ou le déplacer
      if( drawing == 1 ) {
      file.Drawing(e) ;
      }
      if(draggineLine == 1 && id != undefined && id != null && line != undefined && line != null )  {
      line.dragLine(e,id);
      }
   },false) ;


  document.addEventListener('mouseover', function (e) { // evenement de changement du curseur si le curseur est sur un fil
     if(e.target.id.indexOf('Line')!=-1 ) {
       if(parseInt(e.target.style.height) < 10) {
         e.target.style.cursor = 'row-resize';
       }
       if(parseInt(e.target.style.width) < 10){
         e.target.style.cursor = 'col-resize';
       }
     }
     if(e.target.id.indexOf('input')!=-1 || e.target.id.indexOf('output')!=-1 ) {
       e.target.style.backgroundColor = "red";
     }
   },false);

   document.addEventListener('mouseout',function(e) {
     if(e.target.id.indexOf('input')!=-1 || e.target.id.indexOf('output')!=-1 ) {
       e.target.style.backgroundColor = "white";
     }
   },false);

   document.addEventListener('mousedown', function (e) { // evenement de la fin d'un déplacement d'un fil.
     if(e.target.id.indexOf('Line')!=-1 && drawing == 0 && !draggingLineStated) {
       for ( var i = 0 ; i < tabElem.length ; i ++ ){
         for ( var j = 0 ; j < (tabElem[i].i+2) ; j++ ) {
           if( tabElem[i].divs[j].id == e.target.id ) {
             line = tabElem[i];
             id = e.target.id;
             if(!(line.divs[line.i+1].id == id )) {
                line.selectedLine(id);
             }
           }
         }
       }
       draggineLine = 1 ;
     }
   },false);

   document.addEventListener('mouseup', function() { // evenement du démmarage d'un déplacement d'un fil.
     if ( draggineLine == 1 && id != undefined && id != null) {
       draggineLine = 0 ;
       line.unselectedLine(id);
       id = null ;
       borders = false;
       draggingLineStated = false;
     }
   },false);

   document.addEventListener('keyup', function (e) { // evenement d'annuler la création d'un fil par un clique sur 'Esc'
     if(e.keyCode == 27 && drawing == 1) {
         file.remove();
         file = null;
         drawing = 0 ;
         SaveAction();
     }
   },false);
   //


 //--------------------------------- Fonctions necessaires ----------------------------------------

//-----------------------------------------------------------------------------------//
// fonction qui retourne un element HTML qui joue le rôle d'un morceau d'un fil.
//-----------------------------------------------------------------------------------//
   function creatDiv() {
        var elt = document.createElement('div');
        elt.className = "Line";
        elt.style.position = 'absolute';
        elt.style.background = '#333';
        elt.style.width = size + "px";
        elt.style.height = size + "px";
        elt.style.zIndex = -10;
        return elt;
   }
//-----------------------------------------------------------------------------------//
// fonction qui retourn la position absolue du curseur
//-----------------------------------------------------------------------------------//
   function getMousePosition(e) {
       	var left = topp = 0;
        if (!e) var e = window.event;
       	left = e.clientX;
        topp = e.clientY;
       	return [left,topp];
   }

//-----------------------------------------------------------------------------------//
// fonction qui retourn la position du curseur reletivement à un objet HTML
//-----------------------------------------------------------------------------------//
   function getMousePositionRelativeTo(e , reference) {
       	var left = topp = 0;
        left = e.clientX;
        topp = e.clientY;
        var rpos = findPos(reference);
       	return [left - rpos[0],topp - rpos[1]];
   }
//-----------------------------------------------------------------------------------//
// fonction qui retourn la position absolue d'un objet HTML.
//-----------------------------------------------------------------------------------//
   function findPos(obj) {
       	var curleft = curtop = 0;
        curtop = obj.offsetTop;
        curleft = obj.offsetLeft;
        if (obj.offsetParent) {
        obj = obj.offsetParent;
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
        }
       	return [curleft,curtop];
   }
//-----------------------------------------------------------------------------------//
// fonction qui recherche un fil dans le tableau des éléments par son Id
//-----------------------------------------------------------------------------------//
   function getFile(id){
       for ( var i = 0 ; i < tabElem.length ; i++ ){
       if ( tabElem[i].idOutput == id ) { return tabElem[i]; }
       }
   }
//-----------------------------------------------------------------------------------//
// fonction qui retourn un tableau des fils reliés à un composant.
//-----------------------------------------------------------------------------------//
   function getFiles(id){
       var files = [] ;
       for ( var i = 0 ; i < tabElem.length ; i++ ){
       if ( tabElem[i].idOutput == id || tabElem[i].idInput == id ) { files.push(tabElem[i]); }
       }
       return files ;
   }
//-----------------------------------------------------------------------------------//
// fonction qui aide à mettre à jour la couleur du fil, d'une entré ou un sortie
//-----------------------------------------------------------------------------------//
   function updateColor(){
     for ( var i = 0 ; i < tabElem.length ; i++ ){
       if( tabElem[i].value == 1 ||  tabElem[i].value == 0 ) {
           tabElem[i].updateColor(tabElem[i].value);
       }
     }
   }
