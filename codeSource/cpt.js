//-----------------------------------------------Compteur---------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------
  //-------------------------------------- Constructeur compteur  -------
    /* Par convention pur le compteur :
    this.inputs[0]l'horloge
    this.inputs[1] Raz (remise a zero){logique négatif}
    this.inputs[2] commande pour savoir Si c'est un compteur ou décompteur

  */

this.InitCpt =function(valmax){    // fonction pour initialiser les inputs de compteurs

   var i=0;
    this.valmax=valmax;

          this.inputs.push({id : 'id1' , value : 0}) ;
          this.inputs.push({id : 'id2' , value : 0}) ;
          this.inputs.push({id : 'id3' , value : 0}) ;

          while((Math.pow(2,i))< this.valmax){i++;}

          this.nbOutputs=i;
          addInputs()

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

this.set =function (x){ // initialiser le compteur à la valeur x (x en decimal)
                       //Bit du poit faible a l'indice nbInputs+2


    this.outputs.push({id : 'id1' , value : 0}) ;
    this.outputs.push({id : 'id2' , value : 0}) ;
    this.outputs.push({id : 'id3' , value : 0}) ;


    var i = this.nbOutputs-1;
    for (i; i >= 0; i--)
       {
          this.outputs[i].value=x%2;
          x= parseInt(x/2);
       }
}
this.IncrCpt = function () {

      var i = this.nbOutputs -1;

      while ((i >= 0) && (this.outputs[i].value==1))
      {
          i = i - 1 ;
      }
      if (i==-1) {i=0;}// le cas de 1 partout le max du compteur !!! Es-que RAZZZZ ?
      else
      {
          this.outputs[i].value=1;// metre le premier bit nul à 1 et le reste à 0
          var c=this.nbOutputs-1;
          for (i+1 ; i<=c ; i++)
          {
              this.outputs[i].value=0;

          }
      }

}

this.DecCpt= function(){
      var i = this.nbOutputs-1;
      while ((i >= 0) && (this.inputs[i].value==0))
      {
          i = i - 1 ;
      }
      if (i==-1) {i=0;}//*to check* le cas de 0 partout !!!!esque Mise à valmax ?? sinon variable stop compage
      else
      {
          this.outputs[i].value=0;
          var c=this.nbOutputs-1;
          for (i+1 ;  i<=c ; i++)
          {
              this.outputs[i].value=1;

          }
      }

}

this.updateCpt = function(){
if ((!this.inputs[0].value)&&(this.change))
{
  this.change=true;
}

  if (!this.inputs[1].value) // La RAZ
  {
      if ((this.inputs[0].value)&&(!this.change))
      {
          if (!this.inputs[2].value)
           {
            this.IncrCpt();
           }
          else
          {this.DecCpt();}
        this.change=true;
      }


  }
  else {this.set(0);}
}
//===========================================================================================================
//===========================================================================================================
