
document.addEventListener('keyup', function (e) {
  if( (e.keyCode == 8 || e.keyCode == 46) && tabSelectionElem.length != 0) {
    for(var kk =0 ; kk<elemtraite.length ;kk++){
      var tmp= document.getElementById(elemtraite[kk].id);

      var Objj = searchObject(tmp.id);


      for (var i = 0; i < Objj.inputs.length; i++) {
        for (var j = 0; j < tabChrono.length; j++) {
          if ( Objj.inputs[i].id == tabChrono[j].objet.id ) {
            document.getElementById(tabChrono[j].objet.parentId).remove();
            clearInterval(tabChrono[j].fct);
            tabChrono.splice(j,1);
          }
        }
      }
        if(tmp.id.indexOf("led")==-1 && tmp.id.indexOf("HEX")==-1){
      for (var i = 0; i < Objj.outputs.length; i++) {
        for (var j = 0; j < tabChrono.length; j++) {
          if ( Objj.outputs[i].id == tabChrono[j].objet.id ) {
            document.getElementById(tabChrono[j].objet.parentId).remove();
            clearInterval(tabChrono[j].fct);
            tabChrono.splice(j,1);
          }
        }
      }
    }

      supFunction(tmp.id);
      var listEnfants = tmp.childNodes;

      for ( var i = 0 ; i < listEnfants.length ; i ++ ) {

          var files = getFiles( listEnfants[i].id ) ;// get all the lines linked with each child ( array of lines )

          for ( j = 0 ; j < files.length ; j ++ ) {

            var inp = document.getElementById(files[j].idOutput);
            inp.setAttribute('occuped','0');
            WhenRemoveFile(files[j]) ;
            //supFunction(files[j].idLine1);
            removeElemFromTabElem(files[j]);
            files[j].remove(); // update each line ..
        }
      }

          removeElemFromTabElem(searchObject(tmp.id));
          $(tmp).remove();
    }
    SaveAction() ;

    }
},false);
document.addEventListener('click', function(e) {
 coordsX = e.clientX ;
 coordsY = e.clientY -40 ;
 coordsX = coordsX - coordsX%indiceMove ;
 coordsY = coordsY - coordsY%indiceMove ;
},false);


document.addEventListener('keyup', function (e) {
      if(e.ctrlKey  && e.keyCode == 83) {
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

      if( e.ctrlKey && e.keyCode == 67) {
            elemsCopySelet=elemtraite;
            optionCopy=2;
      }
      if ( e.ctrlKey && e.keyCode == 86 ) {
            if(optionCopy==1){
                Paste_one_elem(coordsX-50,coordsY);
             }
             else{
               if(optionCopy==2){
                 var difX ; var difY ;var x ; var y ;
                 var premierelem = document.getElementById(elemsCopySelet[0].id);

                 difX=coordsX-parseInt(premierelem.style.left.substr(0,premierelem.style.left.length-2)) ;

                 difY=coordsY-parseInt(premierelem.style.top.substr(0,premierelem.style.top.length-2)) ;

                 for(var i =0 ; i<elemsCopySelet.length ; i++){
                   elem_a_coller=document.getElementById(elemsCopySelet[i].id);
                   elems=searchObject(elem_a_coller.id);
                   get_original_id(elem_a_coller.id);
                   idParent_cut_copy = document.getElementById(originl_id).parentNode.id ;
                   cut=false;
                   x = difX+parseInt(elem_a_coller.style.left.substr(0,elem_a_coller.style.left.length-2));
                   y = difY+parseInt(elem_a_coller.style.top.substr(0,elem_a_coller.style.top.length-2));
                   Paste_one_elem(x,y);        // appler la fonction qui colle un element pour chaque element de tableau a coller
                 }
               }
             }
              SaveAction() ;
          }
},false);
