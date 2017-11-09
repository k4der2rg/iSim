
var stopAll = false;

function sleep(milliseconds) {
var start = new Date().getTime();
for (var i = 0; i < 1e7; i++) {
if ((new Date().getTime() - start) > milliseconds){
  break;
}
}
}

function LogicGates( id, idParent ) {

    //Attributs
    this.id = id ;
    this.idParent= idParent;
    this.inputs = [];
    this.outputs = [];
    this.elem = document.getElementById(this.id);

    //Methodes :

    //---------------------------------------------------------------------------------------------------------------------
   // ============== lemiter decod par 5  // les portes par 10 ============

    this.nbInOut = function () {
      if (this.elem.className.indexOf('gate')!=-1) {
        var ins=0;
        if (this.id.indexOf('DEMUX') == -1 ) {if(this.id.indexOf('DECOD') != -1){ins = prompt('Donner le nombre des entrees <= 5.');}else{ins = prompt('Donner le nombre des entrees <=16.');}}
        else ins = prompt('Donner le nombre des sorties <=16 :  ');
        ins = parseInt(ins);
        //- - - -- - -   tester l'annulation de l'operation EDIT - - - - - -  - - - --  -

        if(isNaN(ins) || ((this.id.indexOf('MUXX') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 )) ||((this.id.indexOf('DEMUX') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 )) ||
                                                           ((this.id.indexOf('ENCOD') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 ))){annuler=true;}
      //- - - - - - - - - -   limiter l'intervalle des Portes logiques - - - - - -  - - - --  -
        if(isNaN(ins) || ((this.id.indexOf('MUXX')==-1)&& (this.id.indexOf('DEMUX')==-1)&& (this.id.indexOf('ENCOD')==-1)&& (this.id.indexOf('DECOD')==-1) && ((ins>16)|| (ins < 2)) ) )
        {annuler=true;}
      //- - - - - - - - - -   limiter l'intervalle des DECODEURS - - - - - -  - - - --  -

        if(isNaN(ins) || ((this.id.indexOf('DECOD') != -1) && ((ins>5) || (ins<1)))){annuler=true;}
      //- - limiter l'intervalle des MUX DEMUX ENCODEUR avec test sur le nombre d'entree -
      //------------------ s'il est une puissance de 2 ou non ----------------------


        if(((this.id.indexOf('MUXX') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 )) ||((this.id.indexOf('DEMUX') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 )) ||
                                                    ((this.id.indexOf('ENCOD') != -1)&&((!Number.isInteger(Math.log2(ins))) || ins > 16 )) ){stopAll=true;}
        if ( this.id.indexOf('MUX')!=-1 && (!stopAll) ) {
          this.updateNbInputs(ins);
          this.updateNbSelect();
        }
        else {if(!stopAll){this.updateNbInputs(ins,0);}}
      }else {
        this.updateNbInputs(0,0);
      }
    }

     //---------------------------------------------------------------------------------------------------------------------
     this.updateNbSelect = function () {
       var num , n = 0;
       if ( this.id.indexOf('DEMUX')!= -1 ) num = this.nbOutputs
       else num = this.nbInputs ;
       while (num != 1) {
           n += 1;
           num /= 2;
       }
       this.nbSelect = n;
     }

    //---------------------------------------------------------------------------------------------------------------------
    this.updateNbInputs = function(newNbInputs) {

      if ( this.id.indexOf('DEMUX') != -1 ) {
          this.nbOutputs = newNbInputs;
          this.nbInputs = 1;
        }

        else {
            this.nbInputs = newNbInputs;
            this.nbOutputs = 1;
      }

      if ( this.id.indexOf('ADDc') != -1 || this.id.indexOf('Sous') != -1){
        this.nbOutputs = newNbInputs/2 + 1;
        this.nbSelect = 0;
      }

      if ( this.id.indexOf('CMP') != -1 ){
        this.nbOutputs = 3;
        this.nbSelect = 0;
      }

        if (this.id.indexOf('DECOD') != -1) {
            this.nbOutputs = Math.pow(2, this.nbInputs);
        }

        if (this.id.indexOf('ENCOD') != -1) {
            var num = this.nbInputs,
                n = 0;
            while (num != 1) {
                n += 1;
                num /= 2;
            }
            this.nbOutputs = n;
        }
        if (this.id.indexOf('switch') != -1)
        {
          this.nbInputs = 0 ; this.nbOutputs = 1 ; this.nbSelect = 0 ;
        }
        if (this.id.indexOf('led') != -1)
        {
          this.nbInputs = 1 ; this.nbOutputs = 0 ; this.nbSelect = 0 ;
        }

        if (this.id.indexOf('NOT') != -1 || this.id.indexOf('OUI') != -1)
        {
          this.nbInputs = 1 ; this.nbOutputs = 1 ; this.nbSelect = 0 ;
        }

    }


          //---------------------------------------------------------------------------------------------------------------------
          this.updateInputsImg = function() {
              var nd = this.elem;
              var height = 40 , width = 40;

              if (this.nbInputs > this.nbOutputs) {
                  height = this.nbInputs * 20;
              } else {
                  height = this.nbOutputs * 20;
              }
              if (this.nbInputs <= 2 && this.nbOutputs <= 2) {
                  height = 40;
              }
              if(this.nbSelect > 2) width = this.nbSelect*20;
              if ( this.id.indexOf('ADDc')!= -1  || this.id.indexOf('Sous')!= -1  || this.id.indexOf('CMP')!= -1)
              {
                height = (this.nbInputs+1)*20 ;
                width = 60 ;
                this.nbInputs ++ ;
              }

              var spaceIn = (height/20 - this.nbInputs)*10 +  4;
              var spaceOut = (height/20 - this.nbOutputs)*10 +  4;
              var spaceSel = (width/20 - this.nbSelect)*10 +  4;
              nd.style.backgroundColor = "white";
              nd.style.height = height + "px";
              nd.style.width = width + "px";
              nd.firstChild.style.marginTop = (height - 40) / 2 + "px";
              nd.firstChild.style.marginLeft = (width - 35) / 2 + "px";
              nd.firstChild.style.width = "35px";
              nd.firstChild.style.height = "40px";
              if ( this.id.indexOf('ADDc')!= -1  || this.id.indexOf('Sous')!= -1 || this.id.indexOf('CMP')!= -1 )
              {
                if (this.nbInputs == 3 ){
                  if ( this.id.indexOf('ADDc') != -1) nd.firstChild.src ="img/add.png";
                  if ( this.id.indexOf('Sous') != -1) nd.firstChild.src ="img/sous.png";
                  if ( this.id.indexOf('CMP') != -1) nd.firstChild.src ="img/comp.png";

                  nd.firstChild.style.marginTop = "0px";
                  nd.firstChild.style.marginLeft = "5px";
                  nd.firstChild.style.width = "50px";
                  nd.firstChild.style.height = "60px";
                }
                if (this.nbInputs == 5){
                  if ( this.id.indexOf('ADDc') != -1) nd.firstChild.src ="img/add2.png";
                  if ( this.id.indexOf('Sous') != -1) nd.firstChild.src ="img/sous2.png";
                  if ( this.id.indexOf('CMP') != -1) nd.firstChild.src ="img/comp2.png";

                  nd.firstChild.style.marginTop = "0px";
                  nd.firstChild.style.marginLeft = "5px";
                  nd.firstChild.style.width = "50px";
                  nd.firstChild.style.height = "100px";
                }
                if (this.nbInputs == 7){
                  if ( this.id.indexOf('ADDc') != -1) nd.firstChild.src ="img/add3.png";
                  if ( this.id.indexOf('Sous') != -1) nd.firstChild.src ="img/sous3.png";
                  if ( this.id.indexOf('CMP') != -1) nd.firstChild.src ="img/comp3.png";

                  nd.firstChild.style.marginTop = "0px";
                  nd.firstChild.style.marginLeft = "5px";
                  nd.firstChild.style.width = "50px";
                  nd.firstChild.style.height = "140px";
                }
                if (this.nbInputs == 9){
                  if ( this.id.indexOf('ADDc') != -1) nd.firstChild.src ="img/add4.png";
                  if ( this.id.indexOf('Sous') != -1) nd.firstChild.src ="img/sous4.png";
                  if ( this.id.indexOf('CMP') != -1) nd.firstChild.src ="img/comp4.png";

                  nd.firstChild.style.marginTop = "0px";
                  nd.firstChild.style.marginLeft = "5px";
                  nd.firstChild.style.width = "50px";
                  nd.firstChild.style.height = "180px";
                }
              }

              var i;

              for (i = 0; i < this.nbInputs; i++) {
                  var inp;
                  inp = document.createElement('div');
                  inp.id = 'input' + indice;
                  indice++;
                  if(! ((this.id.indexOf('ADDc')!= -1 || this.id.indexOf('Sous')!= -1 || this.id.indexOf('CMP')!= -1) && i ==  parseInt(this.nbInputs /2)))
                  this.inputs.push({
                      id: inp.id,
                      value: 0 ,
                      logique : 1
                  });
                  inp.className = 'input';
                  inp.setAttribute('occuped', '0');
                  var j;
                  j = spaceIn + i * 20 ;
                  inp.style.left = "-6px";
                  inp.style.top = j + "px";
                  if(! ((this.id.indexOf('ADDc')!= -1 || this.id.indexOf('Sous')!= -1 || this.id.indexOf('CMP')!= -1) && i ==  parseInt(this.nbInputs /2))) nd.appendChild(inp);
              }

              for (i = 0; i < this.nbOutputs; i++) {
                  var out;
                  out = document.createElement('div');
                  out.id = 'output' + indice;
                  indice++;
                  this.outputs.push({
                      id: out.id,
                      value: 0
                  });
                  out.className = 'output';
                  j = spaceOut + i * 20 ;
                  out.style.left = width - 5 +"px";
                  out.style.top = j + "px";
                  nd.appendChild(out);
              }


              for (i = 0; i < this.nbSelect; i++) {
                  var out;
                  out = document.createElement('div');
                  out.id = 'input' + indice;
                  indice++;
                  this.inputs.push({
                      id: out.id,
                      value: 0,
                      logique : 1
                  });
                  out.className = 'input';
                  out.setAttribute('occuped', '0');
                  j = spaceSel + i * 20 ;
                  out.style.left = j + "px";
                  out.style.top = height - 6 + "px";
                  nd.appendChild(out);
              }
                if ( this.id.indexOf('ADDc')!= -1  || this.id.indexOf('Sous')!= -1  || this.id.indexOf('CMP')!= -1) this.nbInputs --;

                //=============================   changement 1    ============= creation de div detiquette====

        etiq = document.createElement('div');
        etiq.id = 'etiq' + indice;
        etiq.className='etiq';
        last_etiq(this.id);
        etiq.innerHTML=alphabet+num_ordre;
        etiq.style.left= "10px";
        etiq.style.top= height + 5 +"px";
        nd.appendChild(etiq);

    }

    //---------------------------------------------------------------------------------------------------------------------
    this.OUI = function() {
        this.outputs[0].value = this.inputs[0].value;
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.NON = function() {
        if (this.inputs[0].value == 1) this.outputs[0].value = 0
        else this.outputs[0].value = 1;
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.AND = function() {
        this.outputs[0].value = 1;
        var i = 0;
        for (i = 0; i < this.nbInputs; i++) {
            this.outputs[0].value = this.outputs[0].value && this.inputs[i].value;
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.NAND = function() {

        this.outputs[0].value = !this.inputs[0].value || !this.inputs[1].value;
        var i;
        for (i = 2; i < this.nbInputs; i++) {
            this.outputs[0].value = !this.outputs[0].value || !this.inputs[i].value;
        }
        if (this.outputs[0].value) this.outputs[0].value = 1;
        else this.outputs[0].value = 0;
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.OR = function() {
        this.outputs[0].value = this.inputs[0].value;
        for (var i = 0; i < this.nbInputs; i++) {
            this.outputs[0].value = this.outputs[0].value || this.inputs[i].value;
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.NOR = function() {
        this.outputs[0].value = !this.inputs[0].value && !this.inputs[1].value;
        var i;
        for (i = 2; i < this.nbInputs; i++) {
            this.outputs[0].value = !this.outputs[0].value && !this.inputs[i].value;
        }
        if (this.outputs[0].value) this.outputs[0].value = 1;
        else this.outputs[0].value = 0;
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.XOR = function() {
        this.outputs[0].value = this.inputs[0].value;

        for (var i = 1; i < this.nbInputs; i++) {
            if ((this.outputs[0].value == 1 && this.inputs[i].value == 1) || (this.outputs[0].value == 0 && this.inputs[i].value == 0)) {
                this.outputs[0].value = 0;
            } else {
                this.outputs[0].value = 1;
            }
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.ENCOD = function() {
        var i, j = 0;
        for (i = this.nbInputs - 1; i >= 0; i--) {
            if (this.inputs[i].value == 1) {
                var s = i;
                j = 0;
                while (s != 0) {
                    this.outputs[j].value = s % 2;
                    s = parseInt(s / 2);
                    j++;
                }
                for(var k = j; j<this.nbOutputs;j++)
                {
                  this.outputs[j].value = 0 ;
                }
                break;
            }
        }
        if (j==0){
          for(j=0 ; j<this.nbOutputs;j++)
          {
            this.outputs[j].value = 0 ;
          }
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.DECOD = function() {
        var i, s = 0;
        for (i = 0; i < this.nbInputs; i++) {
            s = s + (this.inputs[i].value * Math.pow(2, i));
        }
        for (i = 0; i < this.nbOutputs; i++) {
            if (i == s) {
                this.outputs[i].value = 1;
            } else {
                this.outputs[i].value = 0;
            }
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.MUX = function() { // nbSelect derniere cases de inputs sont les bits de selection.
        var Select = [],
            j = 0,
            decimale = 0;
        for (var i = this.nbInputs; i < this.nbInputs + this.nbSelect; i++) {
            Select[j] = this.inputs[i].value;
            j++; // recuperer les bits de selections qui se trouvent dans les dernieres cases du tableau inputs.
        }
        for (var i = 0; i < this.nbSelect; i++) {
            decimale += Select[i] * Math.pow(2, i); // recuperer l indice de l'information choisie.
        }
        this.outputs[0].value = this.inputs[decimale].value;
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.DEMUX = function() { // 1ere case d'inputs est l'entree, les autres cases sont les bits de selection.
        var Select = [],
            decimale = 0;
        for (var i = 1; i <= this.nbSelect; i++) {
            decimale += this.inputs[i].value * Math.pow(2, i-1);// recuperer l indice de l'information choisie.
        }
        for (var i = 0; i < this.outputs.length; i++) {
          if ( i == decimale )  this.outputs[i].value = this.inputs[0].value
          else this.outputs[i].value = 0;
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    this.COMP = function() {
        var i, j = 0,
            s1 = 0,
            s2 = 0;

        for (i = 0; i < (this.nbInputs / 2); i++) {
            s1 = s1 + (this.inputs[i].value * Math.pow(2, i));
        }
        for (i = (this.nbInputs / 2); i < this.nbInputs; i++) {
            s2 = s2 + (this.inputs[i].value * Math.pow(2, j));
            j++;

        }

        if (s1 > s2) {
            this.outputs[0].value = 1;
            this.outputs[1].value = 0;
            this.outputs[2].value = 0;

        } else if (s1 < s2) {
            this.outputs[2].value = 0;
            this.outputs[0].value = 0;
            this.outputs[1].value = 1;

        } else {
            this.outputs[1].value = 0;
            this.outputs[0].value = 0;
            this.outputs[2].value = 1;
        }
    }
    //---------------------------------------------------------------------------------------------------------------------
    this.ADD = function() {
        var i, j = 0,
            s1 = 0,
            s2 = 0;

        for (i = 0; i < (this.nbInputs / 2); i++) {
            s1 = s1 + (this.inputs[i].value * Math.pow(2, i));
        }
        for (i = (this.nbInputs / 2); i < this.nbInputs; i++) {
            s2 = s2 + (this.inputs[i].value * Math.pow(2, j));
            j++;

        }
        var s;
        s = s1 + s2;
        j = 0;
        while (s != 0) {

            this.outputs[j].value = s % 2;
            s = parseInt(s / 2);
            j++;
        }
        for(i = j ; i < this.nbOutputs ; i++)
        {
          this.outputs[i].value = 0 ;
        }


    }
    //---------------------------------------------------------------------------------------------------------------------
    this.SOUS = function() {

        var i, j = 0,
            s1 = 0,
            s2 = 0;

        for (i = 0; i < (this.nbInputs / 2); i++) {
            s1 = s1 + (this.inputs[i].value * Math.pow(2, i));
        }
        for (i = (this.nbInputs / 2); i < this.nbInputs; i++) {
            s2 = s2 + (this.inputs[i].value * Math.pow(2, j));
            j++;

        }
        var s, n;
        n = s1 - s2;

        if (n >= 0) {
            s = n;
        } else {
            s = -n;
        }

        j = 0 ;
        while (s != 0) {

            this.outputs[j].value = s % 2;
            s = parseInt(s / 2);
            j++;
        }
        for(i = j ; i < this.nbOutputs ; i++)
        {
          this.outputs[i].value = 0 ;
        }

        var premier = 0 ; 
       
       if ( n < 0 )
       {
         for ( var p = 0 ; p < this.nbOutputs ; p++ ) {
            if ( this.outputs[p].value == 1 && premier == 0 ) {
                premier = 1; 
            }
            else {
                if ( premier == 1 ){
                    if (this.outputs[p].value == 1 ) { this.outputs[p].value = 0 ; }
                    else { this.outputs[p].value = 1; }
                    }
                }

            }
        }
       


    }

    //---------------------------------------------------------------------------------------------------------------------
    this.run = function() { // update outputs

        if (this.id.indexOf('OUI') != -1) this.OUI();
        if (this.id.indexOf('NOT') != -1) this.NON();
        if (this.id.indexOf('ANND') != -1) this.AND();
        if (this.id.indexOf('NAND') != -1) this.NAND();
        if (this.id.indexOf('ORR') != -1) this.OR();
        if (this.id.indexOf('NOR') != -1) this.NOR();
        if (this.id.indexOf('XOR') != -1) this.XOR();
        if (this.id.indexOf('ENCOD') != -1) this.ENCOD();
        if (this.id.indexOf('DECOD') != -1) this.DECOD();
        if (this.id.indexOf('DEMUX') != -1) this.DEMUX();
        if (this.id.indexOf('MUXX') != -1) this.MUX();
        if (this.id.indexOf('ADDc') != -1) this.ADD();
        if (this.id.indexOf('Sous') != -1) this.SOUS();
        if (this.id.indexOf('CMP') != -1) this.COMP();


        // add , sous , comparateur.
  }

  //---------------------------------------------------------------------------------------------------------------------
  this.CreerElem = function () {
     this.nbInOut();
     //-----------------------------------  3 eme changemment pour res prblm mux decod costum-----------------------------------------------------------

     if(!stopAll){
     this.updateInputsImg();
     tabElem.push(this);
   }
   stopAll=false ;
  }

      //------------------------ 2 eme changement ------------------------------------------------------
   this.CreerElem_standard = function (mod,time,inp,out) {
     //========================
     //vous remarquez que mod et time ne sont pas utiliser
     // mais on a fait un fonction identique dans logiquigates et Sequentiel et afficheur
     // s'appelle CreerElem_standard pour eviter les if dans drop de script
     //==========================
     if (this.elem.className.indexOf('gate')!=-1) {
       var ins=0;
       if (this.id.indexOf('DEMUX') == -1 ) ins = inp;
       else ins = out;
       if ( this.id.indexOf('MUX')!=-1 ) {
         this.updateNbInputs(ins);
         this.updateNbSelect();
       }
       else this.updateNbInputs(ins,0);

     }else {
       if(this.id.indexOf('ADDc') != -1 || this.id.indexOf('Sous') != -1 || this.id.indexOf('CMP') != -1 )
       {
         this.updateNbInputs(4,0);
       }
       else {
         this.updateNbInputs(0,0);
       }
     }

     //========================
      if(InOut == 0)
     {this.updateInputsImg();
     }
      tabElem.push(this);
   }

}
