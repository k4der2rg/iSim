//================================ la classe afficheurs ====================================================

function afficheurs (id, idParent){  // inputs: tableau des inputs

  this.id=id ;
  this.idParent = idParent;
  this.elem = document.getElementById(this.id);
  this.inputs = [];

  //---------------------------------------------------------------------------------------------------------------------
   this.nbIn = function () {
     if (this.id.indexOf('led')!=-1) this.nbInputs = 1;
     if (this.id.indexOf('HEX')!=-1) this.nbInputs = 4;
   }
//---------------------------------------------------------------------------------------------------------------------
        this.updateInputsImg = function () {

          var nd = this.elem;
          var height = this.nbInputs*20;

          if(this.nbInputs<=2) {height=40;}
          var spaceIn = (height/20 - this.nbInputs)*10 +  4;
          nd.style.backgroundColor="white";
          nd.style.height=height+"px";
          nd.firstChild.style.marginTop=(height-40)/2+"px";
          if (this.id.indexOf('HEX')!=-1)  {
            nd.style.width="60px";
            nd.firstChild.style.marginTop = "5px";
            nd.firstChild.style.marginLeft = "5px";
            nd.firstChild.style.width = "50px";
            nd.firstChild.style.height = "70px";
          }



          var i;
          for(i=0;i<this.nbInputs;i++){

            var inp;
            inp = document.createElement('div');

            inp.id = 'input'+indice;indice++;
            this.inputs.push({id : inp.id, value : 0 , logique : 1});
            inp.className = 'input';
            inp.setAttribute('occuped','0');
            var j;
            j = spaceIn + i * 20 ;
            inp.style.left= "-6px";
            inp.style.top= j+"px";
            nd.appendChild(inp);
          }
                    //=============  1 er changemment =================
          etiq = document.createElement('div');
          etiq.id = 'etiq' + indice;
          etiq.className='etiq';
          last_etiq(this.id);
          etiq.innerHTML=alphabet+num_ordre;
          if (this.id.indexOf('led')!=-1){etiq.style.left= "8px";}
         else {etiq.style.left= "18px";}
          etiq.style.top= height+5+"px";
          nd.appendChild(etiq);
        }

//---------------------------------------------------------------------------------------------------------------------
    this.updateimgLED= function(){
        var elem=document.getElementById(this.id).firstChild;

        if(this.inputs[0].value==1){

            elem.src='img/out-on.png';
        }
        else
        {
            elem.src='img/out-off.png';
        }

    }

//---------------------------------------------------------------------------------------------------------------------
    this.updateimgHEXA= function(){ // AFICHEUR 7 SEGMENT : TABLE DE VERITES
        var child= document.getElementById(this.id).firstChild;
        if(this.nbInputs>0){
          if(this.inputs[0].value==0 && this.inputs[1].value==0 &&this.inputs[2].value==0 &&this.inputs[3].value==0 ) child.src='img/HEX/out-7seg-0.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==0 &&this.inputs[2].value==0 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-1.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==1 &&this.inputs[2].value==0 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-2.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==1 &&this.inputs[2].value==0 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-3.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==0 &&this.inputs[2].value==1 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-4.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==0 &&this.inputs[2].value==1 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-5.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==1 &&this.inputs[2].value==1 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-6.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==1 &&this.inputs[2].value==1 &&this.inputs[3].value==0 )child.src='img/HEX/out-7seg-7.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==0 &&this.inputs[2].value==0 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-8.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==0 &&this.inputs[2].value==0 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-9.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==1 &&this.inputs[2].value==0 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-10.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==1 &&this.inputs[2].value==0 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-11.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==0 &&this.inputs[2].value==1 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-12.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==0 &&this.inputs[2].value==1 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-13.png';
          else if(this.inputs[0].value==0 && this.inputs[1].value==1 &&this.inputs[2].value==1 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-14.png';
          else if(this.inputs[0].value==1 && this.inputs[1].value==1 &&this.inputs[2].value==1 &&this.inputs[3].value==1 )child.src='img/HEX/out-7seg-15.png';
        }
      }

  //---------------------------------------------------------------------------------------------------------------------
      this.run = function () {
        if (this.id.indexOf('led')!=-1)
        {
          this.updateimgLED();
        }
        else if (this.id.indexOf('HEX')!=-1) {
          this.updateimgHEXA();
        }
      }

      //---------------------------------------------------------------------------------------------------------------------
      this.CreerElem = function () {
        this.nbIn();
        this.updateInputsImg();
        tabElem.push(this);
        this.run();
      }

        this.CreerElem_standard = function (mod,time,inp,out) {
        this.nbIn();
        if(InOut == 0)
     {this.updateInputsImg();this.run();
     }
        tabElem.push(this);

      }

}
//==========================================================================================================
