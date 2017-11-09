function Sequentiel(id,idParent){
//Attributs
this.inputs = [];
this.outputs = [];
this.id = id;
this.idParent = idParent;
this.elem = document.getElementById(this.id);
this.change = true ;
this.valmax = 0 ;
this.time = 0 ;
this.etatfront = 1 ;

//---------------------------------------------------------------------------------------------------------------------
this.setTime = function () {   // la periode de l horloge.
  if ( this.id.indexOf('Horloge')!=-1 ) this.time = parseFloat(prompt('donner la periode entre 0.3sec et 6sec :'))*1000;
    if(isNaN(this.time)){annuler=true;}
    else{
  if(this.time>6000 || this.time<300 ){annuler=true;}
}
}

//---------------------------------------------------------------------------------------------------------------------
this.updateInputsImg = function () {    // ajouter les entrees et les sorties.
  var nd = this.elem;
  var width = 60 ;
  var height = 60 ;
  if (this.nbInputs > this.nbOutputs) {
      height = this.nbInputs * 20;
  } else {
      height = this.nbOutputs * 20;
  }
  if (this.nbInputs <= 3 && this.nbOutputs <= 3) {
      height = 60;
  }

  var spaceIn = (height/20 - this.nbInputs)*10 +  4;
  var spaceOut = (height/20 - this.nbOutputs)*10 +  4;
  var spaceInUp;
  var spaceSel;
    nd.style.backgroundColor="white";
    nd.style.height=height+"px";
    nd.style.width=width+"px";
    nd.firstChild.style.width = "60px";
    nd.firstChild.style.height = "60px";

    nd.firstChild.style.marginTop = (height - 60) / 2 + "px";
    nd.firstChild.style.marginLeft = (width - 60) / 2 + "px";
    if ( this.id.indexOf('Horloge')!=-1 )  { // pour l'horloge
      height = 40;
      width = 40;
      nd.style.height="40px";
      nd.style.width="40px";
      nd.firstChild.style.width = "30px";
      nd.firstChild.style.height = "30px";
      nd.firstChild.style.marginTop = "5px";
      nd.firstChild.style.marginLeft = "5px";
      spaceIn = (height/20 - this.nbInputs)*10 +  4;
      spaceOut = (height/20 - this.nbOutputs)*10 +  4;
    }
    if ( this.id.indexOf('REG_UNIVER')!=-1 ) {
      height = 120;
      width = 80;
      this.inputUP = 3;
      this.nbInputs = 4;
      this.nbOutputs = 4;
      this.nbSelect = 3;
      nd.style.height="120px";
      nd.style.width="80px";
      nd.firstChild.style.width = "70px";
      nd.firstChild.style.height = "110px";
      nd.firstChild.style.marginTop = "5px";
      nd.firstChild.style.marginLeft = "5px";
      spaceIn = (height/20 - this.nbInputs)*10 +  4;
      spaceOut = (height/20 - this.nbOutputs)*10 +  4;
      spaceInUp = (width/20 - this.inputUP)*10 +  4;
      spaceSel = (width/20 - this.nbSelect)*10 +  4;

    }

    var i;
    for(i=0;i<this.nbInputs;i++){
      var inp;
      inp = document.createElement('div');
      inp.id = 'input'+indice;indice++;
      this.inputs.push({id : inp.id, value : 0 ,logique : 1});
      inp.className = 'input';
      inp.setAttribute('occuped','0');
      var j;
      j = spaceIn + i * 20 ;
      inp.style.left= "-6px";
      inp.style.top= j+"px";
      nd.appendChild(inp);
    }
    if ( nd.id.indexOf("JKFF")!=-1){
      inp = document.createElement('div');
      inp.id = 'input'+indice;indice++;
      this.inputs.push({id : inp.id, value : 0 , logique : 1});
      inp.className = 'input';
      inp.setAttribute('occuped','0');
      inp.style.left= "24px";
      inp.style.top= 60-6+"px";
      nd.appendChild(inp);

      inp = document.createElement('div');
      inp.id = 'input'+indice;indice++;
      this.inputs.push({id : inp.id, value : 0 , logique : 1});
      inp.className = 'input';
      inp.setAttribute('occuped','0');
      inp.style.left= "24px";
      inp.style.bottom= height-6+"px";
      nd.appendChild(inp);
    }
    for(i=0;i<this.nbOutputs ;i++){
      var out;
      out = document.createElement('div');
      out.id = 'output'+indice;indice++;
      this.outputs.push({id : out.id, value : 0});
      out.className = 'output';
      j = spaceOut + i * 20 ;
      out.style.left= width - 5 + "px";
      out.style.top= j+"px";
      nd.appendChild(out);
    }
    for (i = 0; i < this.nbSelect; i++) {
        var out;
        out = document.createElement('div');
        out.id = 'input' + indice;
        indice++;
        this.inputs.push({
            id: out.id,
            value: 0 ,
            logique : 1
        });
        out.className = 'output';
        out.setAttribute('occuped', '0');
        j = spaceSel + i * 20 ;
        out.style.left = j + "px";
        out.style.top = height - 6 + "px";
        nd.appendChild(out);
    }
    for (i = 0; i < this.inputUP; i++) {
        var out;
        out = document.createElement('div');
        out.id = 'input' + indice;
        indice++;
        this.inputs.push({
            id: out.id,
            value: 0 ,
            logique : 1
        });
        out.className = 'input';
        out.setAttribute('occuped', '0');
        j = spaceInUp + i * 20 ;
        out.style.left = j + "px";
        out.style.top = - 6 + "px";
        if(i !=4)nd.appendChild(out);
    }


        //===================== 1 er changemment =====================
    etiq = document.createElement('div');
    etiq.id = 'etiq' + indice;
    etiq.className='etiq';
    last_etiq(this.id);
    etiq.innerHTML=alphabet+num_ordre;
    etiq.style.left= "17px";
    etiq.style.top= height+5+"px";
    nd.appendChild(etiq);

}

//---------------------------------------------------------------------------------------------------------------------
this.nbInOut = function () {      // calculer le nombre d entrees et de sorties.
  if ((this.id.indexOf('DFF')!=-1)||(this.id.indexOf('TFF')!=-1)||(this.id.indexOf('RSFF')!=-1)) {
    this.nbInputs = 2 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('RSHFF')!=-1) {
    this.nbInputs = 3 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('JKFF')!=-1) {
    this.nbInputs = 3 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('Compteur')!=-1) {
    this.nbInputs = 3 ; var i = 0 , val = parseInt(prompt("Compteur modulo !"));
      if(isNaN(val)) {annuler = true;}
    while((Math.pow(2,i))< val ){i++;}
    this.nbOutputs = i;
  }
  else if (this.id.indexOf('Horloge')!=-1) {
    this.nbInputs = 0 ; this.nbOutputs = 1 ;
  }
}

//---------------------------------------------------------------------------------------------------------------------
this.REG_UNIVER = function (){
    var i ;
    if (this.inputs[6].value==0){change = true ;}
    if (this.inputs[4].value==1)
    {
      for(i=0;i<this.nbOutputs;i++)//raz
      {
        this.outputs[i].value = 0 ;
      }
    }
    //-------------------------------------------------------------
    else if (this.inputs[5].value==1) // chg
     { for (i=0;i<this.nbOutputs;i++)
      {
        this.outputs[i].value = this.inputs[i].value ;

      }
     }
     //----------------------------------------------------------
     else if(this.inputs[8].value==1) // dg
     { if(change == true && this.inputs[6].value==1)//H
      {
        for (i=this.nbOutputs-1;i>0;i--)
        {
          this.outputs[i].value = this.outputs[i-1].value ;

        }
        this.outputs[0].value = this.inputs[7].value ;
      }

     }
     //-------------------------------------------------------------
     else if (this.inputs[9].value==1) //dd
     {if(change == true && this.inputs[6].value==1)//H
      {
        for (i=0;i<this.nbOutputs-1;i++)
        {
          this.outputs[i].value = this.outputs[i+1].value ;

        }
        this.outputs[this.nbOutputs-1].value = this.inputs[7].value ;
      }
     }
     //-------------------------------------------------------------
     if (this.inputs[6].value==1){change = false ;} // desactivé

  }

  //-----------------------------------------------------------------------------------------------------------------
  this.basculer= function(){
      if(outputs[0].value==1){outputs[0].value=0;outputs[1].value=1;}
      else if(outputs[0].value==0){outputs[0].value=1;outputs[1].value=0;}
  }

  //---------------------------------------------------------------------------------------------------------------------
  this.RS=function(){
      if(this.nbInputs==2){
        if(this.inputs[0].value==1 && this.inputs[1].value==0) {this.outputs[0].value=0;this.outputs[1].value=1;}
        if(this.inputs[0].value==0 && this.inputs[1].value==1) {this.outputs[0].value=1;this.outputs[1].value=0;}
      }
  }

      //-------------------------------------------
      //------ inputs[0] est le R ::: inputs[1] est CLK ::: inputs[2] est S ::: --------
      //------ outputs[0] est Q ::: outputs[1] est nonQ---------------------------------

//---------------------------------------------------------------------------------------------------------------------
  this.RSH=function(){
      if(this.nbInputs==3){
          if(this.inputs[1].value==this.etatfront){
              if(this.inputs[0].value==1 && this.inputs[2].value==0){
                 this.outputs[0].value=0;this.outputs[1].value=1;
              }
              else if(this.inputs[0].value==0 && this.inputs[2].value==1){
                  this.outputs[0].value=1;this.outputs[1].value=0;
              }
          }
      }
  }

//-------------------------------------------
  //------ inputs[0] est le D ::: inputs[1] est CLK ::: --------

  //---------------------------------------------------------------------------------------------------------------------
this.D=function(){
    if(this.inputs[1].value == !this.etatfront )
    {
      this.change = true ;
    }
      if(this.nbInputs==2){
          if(this.inputs[1].value==this.etatfront  && this.change == true){
              if(this.inputs[0].value==1){
                  this.outputs[0].value=1;this.outputs[1].value=0;
              }
              else if(this.inputs[0].value==0){
                  this.outputs[0].value=0;this.outputs[1].value=1;
              }
          }
      }
      if (this.inputs[1].value==this.etatfront )       this.change = false  ;
  }

  //---------------------------------------------------------------------------------------------------------------------
  this.T=function(){
    if(this.inputs[1].value == !this.etatfront  )
    {
      this.change = true ;
    }
      if(this.nbInputs==2){
          if( this.inputs[1].value==this.etatfront  && this.change == true ){
              if(this.inputs[0].value==1){

                if ( this.outputs[0].value == 0 )
                {
                      this.outputs[0].value=1;
                      this.outputs[1].value=0;
                }
                else {
                    this.outputs[0].value=0;
                    this.outputs[1].value=1;
                }
              }
          }
      }
      if (this.inputs[1].value==this.etatfront )       this.change = false  ;
  }


//-------------------------------------------------
// par convention on choisit inputs [0] J // inputs [1] CLK // inputs [2] k // inputs [3] CLR // inputs [4] PR
// on appelle la fonction jk seulement si h change l'etat de 1 a 0 ( jk foctionne au front descendant)
// CLR et PR sont en logique positive(mode normale)
//---------------------------------------------------------------------------------------------------------------------
this.JK=function(){
  if(this.nbInputs==5){
if ( this.inputs[1].value==!this.etatfront  )
{
  this.change = true ;
}
if(this.inputs[3].value==1 && this.inputs[4].value==0){this.outputs[0].value=0;this.outputs[1].value=1;}
if(this.inputs[3].value==0 && this.inputs[4].value==1){this.outputs[0].value=1;this.outputs[1].value=0;}
      //if(inputs[3]==0 && inputs[4]==0){} interdit il faut sigaler une erreur
if(this.inputs[3].value==1 && this.inputs[4].value==1){
if(this.inputs[0].value==0 && this.inputs[2].value==1 && this.inputs[1].value==this.etatfront  && this.change==1){this.outputs[0].value=0;this.outputs[1].value=1;}
if(this.inputs[0].value==1 && this.inputs[2].value==0 && this.inputs[1].value==this.etatfront  && this.change==1){this.outputs[0].value=1;this.outputs[1].value=0;}
if(this.inputs[0].value==1 && this.inputs[2].value==1 && this.inputs[1].value==this.etatfront  && this.change==1){this.basculer();}
      }
  }
  if ( this.inputs[1].value==this.etatfront  )
  {
    this.change = false ;
  }
}
  //-----------------------------------------------Compteur------------------------------------------------------------------------------------------
  //-----------------------------------------------Compteur---------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------
    this.InitCpt =function(valmax){    // fonction pour initialiser les inputs de compteurs

      var i=0;
       this.valmax=valmax;

         while((Math.pow(2,i))< this.valmax){i++;}

         this.nbOutputs=i;
         // ==== Initialiser le compteur
         if (this.inputs[2].value==0)
         {
             this.set(0);
         }
         else
         {
                 this.set(this.valmax);
         }
}

//---------------------------------------------------------------------------------------------------------------------
this.set =function (x){ // initialiser le compteur à la valeur x (x en decimal)
                      //Bit du poit faible a l'indice nbInputs+2



   var i ;
      for (i = 0 ; i < this.nbOutputs; i++)
      {
         this.outputs[i].value=x%2;
         x= parseInt(x/2);
      }
}

//---------------------------------------------------------------------------------------------------------------------
this.IncrCpt = function () {

      var i = 0 ;
     while ((i < this.nbOutputs) && (this.outputs[i].value==1))
     {
         i = i + 1 ;
     }
     if (i==-this.nbOutputs) { i=0; }
     else
     {
         this.outputs[i].value=1;
          i -= 1;
         for (i ; i>=0 ; i--)
         {
             this.outputs[i].value=0;
         }

     }

}

//---------------------------------------------------------------------------------------------------------------------
this.DecCpt= function(){

     var i = 0;

     while ((i < this.nbOutputs) && (this.outputs[i].value==0))
     {
         i = i + 1 ;
     }
     if (i==-1) {i=0;}
     else
     {
         this.outputs[i].value=0;
         i = i - 1 ;
         for (i ;  i>=0 ; i--)
         {
             this.outputs[i].value=1;
         }
     }

}

//---------------------------------------------------------------------------------------------------------------------
this.Compteur = function(){
if ((this.inputs[0].value==0)&&(this.change == true))
{
 this.change=false;
}
 if (this.inputs[1].value==0) // La RAZ
 {
     if ((this.inputs[0].value == 1)&&(this.change == false))
     {
         if (this.inputs[2].value == 0 )
          {
           this.IncrCpt();
          }
         else
         {this.DecCpt();}
          this.change=true;
     }


 }
 else {this.set(0);
 }
}

//---------------------------------------------------------------------------------------------------------------------
  this.Horlog = function ()
  { var idh ;

     if (this.outputs[0].value==1){
      this.outputs[0].value=0 ;
     idh= document.getElementById(this.id);
     idh.firstChild.src='img/clock-off.png';
    } else
    {
      this.outputs[0].value=1;
      idh= document.getElementById(this.id);
     idh.firstChild.src='img/clock-on.png';
    }

  }

  this.run = function() {
       if (this.id.indexOf('DFF') != -1) this.D();
       if (this.id.indexOf('Horloge') != -1) this.Horlog();
       if (this.id.indexOf('Compt') != -1) this.updateCpt();

  }


  //------------------------------------------------------------------------------------------------------------
  this.Horlog = function ()
  { var idh ;

     if (this.outputs[0].value==1){
      this.outputs[0].value=0 ;
     idh = document.getElementById(this.id);
     idh.firstChild.src='img/clock-off.png';
    } else
    {
      this.outputs[0].value=1;
      idh= document.getElementById(this.id);
     idh.firstChild.src='img/clock-on.png';
    }

  }

  //---------------------------------------------------------------------------------------------------------------------
  this.run = function() {
       if (this.id.indexOf('DFF') != -1) this.D();
       if (this.id.indexOf('TFF') != -1) this.T();
       if (this.id.indexOf('JKFF') != -1) this.JK();
       if (this.id.indexOf('RSFF') != -1) this.RS();
       if (this.id.indexOf('RSHFF') != -1) this.RSH();
       if (this.id.indexOf('Horloge') != -1) this.Horlog();
       if (this.id.indexOf('Compteur') != -1) this.Compteur();
       if(this.id.indexOf('REG_UNIVER')!= -1)this.REG_UNIVER();

  }

  //---------------------------------------------------------------------------------------------------------------------
  this.CreerElem = function () {
    this.nbInOut();
    this.updateInputsImg();
    this.setTime();
    if ( this.id.indexOf("Horloge")!=-1 && Mode == 1 ){
      var fctID = setInterval(run,this.time,this);
      tabFunction.push({fct :fctID, id : this.id});
    }
    tabElem.push(this);
  }

  //----------------------------------  2 eme changemment ----------------------------------------
this.CreerElem_standard = function (mod,time,inp,out) {
  if ((this.id.indexOf('DFF')!=-1)||(this.id.indexOf('TFF')!=-1)||(this.id.indexOf('RSFF')!=-1)) {
    this.nbInputs = 2 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('RSHFF')!=-1) {
    this.nbInputs = 3 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('JKFF')!=-1) {
    this.nbInputs = 3 ; this.nbOutputs = 2 ;
  }
  else if (this.id.indexOf('Compteur')!=-1) {
    this.nbInputs = 3 ; var i = 0 , val = mod;
    while((Math.pow(2,i))< val ){i++;}
    this.nbOutputs = i;
  }
  else if (this.id.indexOf('Horloge')!=-1) {
    this.nbInputs = 0 ; this.nbOutputs = 1 ;
  }
  if ( this.id.indexOf('REG_UNIVER')!=-1 ) {
      this.inputUP = 3;
      this.nbInputs = 4;
      this.nbOutputs = 4;
      this.nbSelect = 3;}
  if(InOut == 0)
     {this.updateInputsImg();}
  if ( this.id.indexOf('Horloge')!=-1 ) this.time = 1000*time;
  if ( this.id.indexOf("Horloge")!=-1 && Mode == 1){
    var fctID = setInterval(run,this.time,this);
    tabFunction.push({fct :fctID, id : this.id});
  }
  tabElem.push(this);
}

}
