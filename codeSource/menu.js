var elem_a_coller ;              // il contient l'elem copier ou couper
var originl_id ;                 // il contient le id dans le menu qui correspond à element dans workspace
var elems;                       // il contient l'objet d'un element html copier ou couper
var text_etiq ;                  // il contient L'innerHTML d'etiquette d'un element
var etiq_elem_selec ;            // il contient le div d'etiquette d'un element
var cut=false;                   // pour regler des probleme de choix d'etiquette pour copier et coller on utlilise un boolean cut
var cut_etiq;                    // il contient l'etiquette de l'element couper
var rotated_elems=[];            // il contient les elemment pivotées
var annuler = false ;            // un lien entre les classes et la fonction edit pour annuler la modification en cas d'erreur
var elemsCopySelet = [];        // contenir les elements copiers dans la selection multiple
var optionCopy = 0 ;            // convontion 1 pour coller un seul elem ; 2 pour coller plusieur donc coller elemsCopySelet
var idParent_cut_copy ;         // il contient l'id de grand div qui contient l'elem
var edit_use_var ;              // une var utliser dans edit costum et Standard
//- - - - - - - - -  recuperer l'etiquette d'un element - - - - - - - - - -
function recuperer_inner_etiq(selector){
  var id=$(selector).attr('id');
  var elem=document.getElementById(id);
  var elems=elem.childNodes;
  var etiquette=elems[elems.length-1];
  etiq_elem_selec=etiquette;
  text_etiq=etiquette.innerHTML;
}
//- - - - - -  La modification Personnaliser d'un element - - - - - - - - - -

function EDIT_custom(selector){
  var elem_context_menu_ref = document.getElementById($(selector).attr('id'));
  var id=$(selector).attr('id');
            get_original_id(id);
            var parent = document.getElementById('workspace');
            edit_use_var=document.getElementById(originl_id);
            var idParent=edit_use_var.parentNode.id;

            var elem =edit_use_var.cloneNode(true);
            elem.id=elem.id+indice;
            indice++;
            parent.appendChild(elem);

              $(elem).draggable({
                  helper: 'original',
                  containment: '#espace',
                  tolerance: 'fit'
                });
            elem.style.position = "absolute";
            elem.style.left = elem_context_menu_ref.style.left;;
            elem.style.top = elem_context_menu_ref.style.top;;

             if(elem.className.indexOf('gate')!=-1){ elem.className = 'nodeEspace gate' ; } else elem.className = 'nodeEspace';

             if (( elem.id.indexOf('led')!=-1) || (elem.id.indexOf('HEX')!=-1))
             {
               Objet = new afficheurs(elem.id);
             }
             else if (idParent == "combi" || idParent == "combicpl") { Objet = new LogicGates(elem.id,"combi");}
             else if (idParent == "seq" || idParent == "seqcpl") {Objet = new Sequentiel(elem.id,"seq");}
             Objet.CreerElem();
             context.attach('#'+Objet.id, test_menu);
          //   context.attach('#'+etiq.id, menu_etiq);

           if(annuler==false){
             var tmp= elem_context_menu_ref;
             supFunction(tmp.id);
             var listEnfants = tmp.childNodes;
             for ( var i = 0 ; i < listEnfants.length ; i ++ ) {
                 var files = getFiles( listEnfants[i].id ) ; // get all the lines linked with each child ( array of lines )
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
               else{
                 var tmp= document.getElementById(Objet.id);
                 supFunction(tmp.id);
                 var listEnfants = tmp.childNodes;
                 for ( var i = 0 ; i < listEnfants.length ; i ++ ) {
                     var files = getFiles( listEnfants[i].id ) ; // get all the lines linked with each child ( array of lines )
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
               annuler = false ;
}
//- - - - - -  La modification Standard  d'un element - - - - - - - - - -

function EDIT_standard(selector,mod,time,inp,out){

  var elem_context_menu_ref = document.getElementById($(selector).attr('id'));
                      var id=$(selector).attr('id');
                                get_original_id(id);
                                var parent = document.getElementById('workspace');
                                edit_use_var=document.getElementById(originl_id);
                                var idParent=edit_use_var.parentNode.id;

                                var elem =edit_use_var.cloneNode(true);
                                elem.id=elem.id+indice;
                                indice++;
                                parent.appendChild(elem);

                                  $(elem).draggable({
                                      helper: 'original',
                                      containment: '#espace',
                                      tolerance: 'fit'
                                    });
                                elem.style.position = "absolute";
                                elem.style.left = elem_context_menu_ref.style.left;
                                elem.style.top = elem_context_menu_ref.style.top;

                                 if(elem.className.indexOf('gate')!=-1){ elem.className = 'nodeEspace gate' ; } else elem.className = 'nodeEspace';

                                 if (( elem.id.indexOf('led')!=-1) || (elem.id.indexOf('HEX')!=-1))
                                 {
                                   Objet = new afficheurs(elem.id);
                                 }
                                 else if (idParent == "combi" || idParent == "combicpl") { Objet = new LogicGates(elem.id,"combi");}
                                 else if (idParent == "seq" || idParent == "seqcpl") {Objet = new Sequentiel(elem.id,"seq");}
                                 Objet.CreerElem_standard(mod,time,inp,out);
                                 context.attach('#'+Objet.id, test_menu);
                          //       context.attach('#'+etiq.id, menu_etiq);

                                 var tmp= elem_context_menu_ref;
                                 supFunction(tmp.id);
                                 var listEnfants = tmp.childNodes;
                                 for ( var i = 0 ; i < listEnfants.length ; i ++ ) {
                                     var files = getFiles( listEnfants[i].id ) ; // get all the lines linked with each child ( array of lines )
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
//- - - - - - - - - -  Coller un  element - - - - - - -  - - - - - - - -

function Paste_one_elem(POsX , POsY){
  var ckilg=elem_a_coller;
  var elem_a_coller_style = elem_a_coller.style.transform;
if(elem_a_coller){
    get_original_id(elem_a_coller.id);
    var parent = document.getElementById('workspace');
    ckilg=document.getElementById(originl_id);
    var elem =ckilg.cloneNode(true);
    elem.style.transform=elem_a_coller_style;
    elem.id=elem.id+indice;
    indice++;
    parent.appendChild(elem);

      $(elem).draggable({
          helper: 'original',
          containment: '#espace',
          tolerance: 'fit'
        });

//===================================================  si vous voulez implémenter le scroll enlever les 2slash de commentaires
if( POsY%(indiceMove) >=5 ) POsY = POsY - POsY%(indiceMove) + 10;
else POsY = POsY - POsY%(indiceMove);
if (POsX%(indiceMove) >= 5) POsX = POsX - POsX%(indiceMove) + 10 ;
POsX = POsX- POsX%(indiceMove) ;
POsY = POsY+parseInt(wScrollTop);
POsX = POsX+parseInt(wScrollLeft);
//=======================================================

    elem.style.position = "absolute";
    elem.style.left = POsX+'px';
    elem.style.top = (POsY)+'px';

     if(elem.className.indexOf('gate')!=-1){ elem.className = 'nodeEspace gate' ; } else elem.className = 'nodeEspace';

     if (( elem.id.indexOf('led')!=-1) || (elem.id.indexOf('HEX')!=-1))
     {
       Objet = new afficheurs(elem.id);
     }
     else if (idParent_cut_copy == "combi" || idParent_cut_copy == "combicpl") { Objet = new LogicGates(elem.id,"combi");}
     else if (idParent_cut_copy == "seq" || idParent_cut_copy == "seqcpl") {Objet = new Sequentiel(elem.id,"seq");}
     if(elem.id.indexOf("Horloge")!=-1){Objet.time = elems.time;} // = ================== pour le fonctionmment de l'horloge
     Objet.nbInputs=elems.nbInputs;
     Objet.nbOutputs=elems.nbOutputs;
     if(elem.id.indexOf("MUXX")!=-1 || elem.id.indexOf("DEMUX")!=-1 ) {Objet.nbSelect=elems.nbSelect;}
     Objet.updateInputsImg();
     if(cut===true){cut=false;etiq.innerHTML=cut_etiq;}// car il a suuprimer l'elem dans cut donc il va pas le compter dans last_etiq : il faut le compter
     tabElem.push(Objet);
     context.attach('#'+elem.id, test_menu);
    // context.attach('#'+etiq.id, menu_etiq);


}
}

//- - - - - -  Recuperer L'id original d'un element   - - - - - - - - - -

function get_original_id(id){
  if(id.indexOf("switch")!=-1){originl_id= "switch" ; }
  if(id.indexOf("NOT")!=-1){originl_id="NOT";}
  if(id.indexOf("OUI")!=-1){originl_id= "OUI";}
  if(id.indexOf("ORR")!=-1){originl_id= "ORR";}
  if(id.indexOf("XOR")!=-1){originl_id= "XOR";}
  if(id.indexOf("NOR")!=-1){originl_id= "NOR";}
  if(id.indexOf("ANND")!=-1){originl_id= "ANND";}
  if(id.indexOf("NAND")!=-1){originl_id= "NAND";}
  if(id.indexOf("DECOD")!=-1){originl_id= "DECOD";}
  if(id.indexOf("ENCOD")!=-1){originl_id= "ENCOD";}
  if(id.indexOf("MUXX")!=-1){originl_id= "MUXX";}
  if(id.indexOf("DEMUX")!=-1){originl_id= "DEMUX";}
  if(id.indexOf("HEX")!=-1){originl_id= "HEX";}
  if(id.indexOf("led")!=-1){originl_id= "led";}
  if(id.indexOf("DFF")!=-1){originl_id= "DFF";}
  if(id.indexOf("TFF")!=-1){originl_id= "TFF";}
  if(id.indexOf("JKFF")!=-1){originl_id= "JKFF";}
  if(id.indexOf("RSFF")!=-1){originl_id= "RSFF";}
  if(id.indexOf("RSHFF")!=-1){originl_id= "RSHFF";}
  if(id.indexOf("Horloge")!=-1){originl_id= "Horloge";}
  if(id.indexOf("Compteur")!=-1){originl_id= "Compteur";}
  if(id.indexOf("Line")!=-1){originl_id= "Line";}
  if(id=="0"){originl_id= "000";}
  if(id.indexOf("ADDc")!=-1){originl_id= "ADDc";}
  if(id.indexOf("Sous")!=-1){originl_id= "Sous";}
  if(id.indexOf("CMP")!=-1){originl_id= "CMP";}
  if(id.indexOf("REG_UNIVER")!=-1){originl_id= "REG_UNIVER";}

   return originl_id ;
}
//- - - - - -  Un Sub-Menu de Menu Principale  - - - - - - - - - -

exampleMenuItemSource = function (selector) {
  var id=$(selector).attr('id');
  var elem=document.getElementById(id);
  var original_class_name = elem.className;

    if (original_class_name.indexOf("nodeEspace gate")!=-1) {
      if(id.indexOf("DEMUX")!=-1){
        return [
                {
                    header: ''
                },
                {
                    text: '2 Sorties',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,2);etiq.innerHTML=text_etiq;SaveAction() ;}
                                            // le plus important c'est le 4 eme champ : out


                },
                {
                    text: '4 Sorties',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                          // le plus important c'est le 4 eme champ : out

                },
                {
                    text: '8 Sorties',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,8);etiq.innerHTML=text_etiq;SaveAction() ;}
                                        // le plus important c'est le 4 eme champ : out

                },
                {   divider: true   },
                {
                    icon: 'glyphicon-list-alt',
                    text: 'Personnaliser',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_custom(selector);etiq.innerHTML=text_etiq;SaveAction() ;}
                }
            ]
          }
          else{
            if(id.indexOf("ENCOD")!=-1 || id.indexOf("MUXX")!=-1){
              return [
                      {
                          header: ''
                      },
                      {
                          text: '2 Entrées',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                               // le plus important c'est le 3 eme champ : inp

                      },
                      {
                          text: '4 Entrées',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,4,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                               // le plus important c'est le 3 eme champ : inp

                      },
                      {
                          text: '8 Entrées',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,8,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                  // le plus important c'est le 3 eme champ : inp

                      },
                      {   divider: true   },
                      {
                          icon: 'glyphicon-list-alt',
                          text: 'Personnaliser',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_custom(selector);etiq.innerHTML=text_etiq;SaveAction() ;}
                      }
                  ]
            }
          else {
            if(id.indexOf("ADDc")!=-1 || id.indexOf("Sous")!=-1 || id.indexOf("CMP")!=-1 ){
              return [
                      {
                          header: ''
                      },
                      {
                          text: '1 bit',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                               // le plus important c'est le 3 eme champ : inp

                      },
                      {
                          text: '2 bits',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,4,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                  // le plus important c'est le 3 eme champ : inp

                      },
                      {
                          text: '3 bits',
                          action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,6,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                  // le plus important c'est le 3 eme champ : inp

                      },  {
                            text: '4 bits',
                            action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,8,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                    // le plus important c'est le 3 eme champ : inp

                        }
                  ]
            }
            else{
                  return [
                          {
                              header: ''
                          },
                          {
                              text: '2 Entrées',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                   // le plus important c'est le 3 eme champ : inp

                          },
                          {
                              text: '3 Entrées',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,3,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                   // le plus important c'est le 3 eme champ : inp

                          },
                          {
                              text: '4 Entrées',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,4,4);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                      // le plus important c'est le 3 eme champ : inp

                          },
                          {   divider: true   },
                          {
                              icon: 'glyphicon-list-alt',
                              text: 'Personnaliser',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_custom(selector);etiq.innerHTML=text_etiq;SaveAction() ;}
                          }
                      ]
                    }
                    }
                  }
    } else {

      if((id.indexOf("DFF"))!=-1||(id.indexOf("TFF"))!=-1||(id.indexOf("JKFF"))!=-1||(id.indexOf("RSHFF"))!=-1){
                  return [
                {
                    header: ''
                },
                {
                    text: 'Front Montant',
                    action: function(e, selector) {
                        var k = searchIndex(id);
                        tabElem[k].etatfront = 1 ;
                        if (tabElem[k].id.indexOf("D") != -1) { document.getElementById(tabElem[k].id).firstChild.src = "img/D.png";}
                        if (tabElem[k].id.indexOf("T") != -1) { document.getElementById(tabElem[k].id).firstChild.src = "img/T.png";}
                        if (tabElem[k].id.indexOf("RSH") != -1) { document.getElementById(tabElem[k].id).firstChild.src = "img/RSH.png";}
                        if (tabElem[k].id.indexOf("JK") != -1) { document.getElementById(tabElem[k].id).firstChild.src = "img/JK.png";}
                        SaveAction() ;}
                                                    // le plus important c'est le 2 eme champ : time
                },
                {
                    text: 'Front Descendant',
                    action: function(e, selector) {
                        var s = searchIndex(id);
                        tabElem[s].etatfront = 0 ;
                        if (tabElem[s].id.indexOf("D") != -1) { document.getElementById(tabElem[s].id).firstChild.src = "img/Dd.png";}
                        if (tabElem[s].id.indexOf("T") != -1) { document.getElementById(tabElem[s].id).firstChild.src = "img/Td.png";}
                        if (tabElem[s].id.indexOf("RSH") != -1) { document.getElementById(tabElem[s].id).firstChild.src = "img/RSHd.png";}
                        if (tabElem[s].id.indexOf("JK") != -1) { document.getElementById(tabElem[s].id).firstChild.src = "img/JKd.png";}
                        SaveAction() ;}
                                                    // le plus important c'est le 2 eme champ : time
                }
              ]
            }

      if(id.indexOf("Horloge")!=-1){
        return [
                {
                    header: ''
                },
                {
                    text: '1 Sec',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,1,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                    // le plus important c'est le 2 eme champ : time
                },
                {
                    text: '2 Sec',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,2,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                    // le plus important c'est le 2 eme champ : time
                },
                {
                    text: '3 Sec',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,3,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                    // le plus important c'est le 2 eme champ : time
                },
                {
                    text: '4 Sec',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,10,4,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                  // le plus important c'est le 2 eme champ : time

                },
                {
                  icon: 'glyphicon-list-alt',
                  text: 'Personnaliser',
                    action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_custom(selector);etiq.innerHTML=text_etiq;SaveAction() ;}

                }
              ]
            }
              else{
                if(id.indexOf("Compteur")!=-1){
                  return [
                          {
                              header: ''
                          },
                          {
                              text: 'MOD 4',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,4,2,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                              // le plus important c'est le 1 er champ : modulo
                          },
                          {
                              text: 'MOD 8',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,8,3,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                            // le plus important c'est le 1 er champ : modulo
                          },
                          {
                              text: 'MOD 16',
                              action: function(e, selector) {recuperer_inner_etiq(selector);EDIT_standard(selector,16,4,2,1);etiq.innerHTML=text_etiq;SaveAction() ;}
                                                               // le plus important c'est le 1 er champ : modulo

                          }
                        ]
                      }
      else  return [
                {
                    icon: 'glyphicon-exclamation-sign',
                    text: 'aucun changemment supporté!'
                }
            ]
          }
    }
}
//- - - - - -  Le Menu Principale  - - - - - - - - - -

test_menu = {
    id: 'Principal-MENU',
    data: [
        {
            header: 'Menu Principale'
        },
        {
            text: 'Modifier',
            subMenu: [
                {
                    menu_item_src : exampleMenuItemSource
                }
            ]
        },
        {
            icon: 'glyphicon-duplicate',
            text: 'Copier',
            action: function(e, selector) { var elem_context_menu_ref = document.getElementById($(selector).attr('id'));
                                          elem_a_coller=elem_context_menu_ref;
                                          elems=searchObject(elem_a_coller.id);
                                          cut=false;                            // pour que s'il ya cut a true a cause de cut
                                                                                // il faut retourner cut a false quand je fait un Copy
                                                                                // pour l'instruction speciale au cut dans paste va pas s'exucuter
                                          optionCopy=1 ;
                                          get_original_id((selector).attr('id'));
                                          idParent_cut_copy = document.getElementById(originl_id).parentNode.id ;
                                        }

        },
        {
            icon: 'glyphicon-scissors',
            text: 'Couper',
            action: function(e, selector) {
              var elem_context_menu_ref = document.getElementById($(selector).attr('id'));
                elem_a_coller=elem_context_menu_ref;
                elems=searchObject(elem_a_coller.id);
                //============== pour regler le prob de mm id pour cut =========
                optionCopy=1 ;
                cut=true;
                recuperer_inner_etiq(selector);
                cut_etiq=text_etiq;
                get_original_id((selector).attr('id'));
                idParent_cut_copy = document.getElementById(originl_id).parentNode.id ;
                //===============================================================

                var tmp= elem_context_menu_ref;

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
                    var files = getFiles( listEnfants[i].id ) ; // get all the lines linked with each child ( array of lines )
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
                    SaveAction() ;
            }

        },
        {
            divider: true
        },
        {
            header: ''
        },
        {
            icon: 'glyphicon-eye-open',
            text: 'Afficher Etiquette',
            action: function(e, selector) {
             recuperer_inner_etiq(selector);
             etiq_elem_selec.style.display="initial";

             }
        },
        {
            icon: 'glyphicon-eye-close',
            text: 'Cacher Etiquette',
            action: function(e, selector) {
              recuperer_inner_etiq(selector);
             etiq_elem_selec.style.display="none";

              }


            },
        {
            icon: 'glyphicon-trash',
            text: 'Supprimer',
            action: function(e, selector) {
              var elem_context_menu_ref = document.getElementById($(selector).attr('id'));
              var tmp= elem_context_menu_ref;
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
        // car les afficheurs n'ont pas un tableau de outputs dans la structure
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

                  var files = getFiles( listEnfants[i].id ) ; // get all the lines linked with each child ( array of lines )
                  for ( j = 0 ; j < files.length ; j ++ ) {

                    var inp = document.getElementById(files[j].idOutput);
                    inp.setAttribute('occuped','0');
                    WhenRemoveFile(files[j]) ;
                    // supFunction(files[j].idLine1);
                    removeElemFromTabElem(files[j]);
                    files[j].remove();                       // mis a jour chaque ligne ..
                }
              }

                  removeElemFromTabElem(searchObject(tmp.id));

                  $(tmp).remove();

                 SaveAction() ;

             }
        }
    ]
};
//- - - - - -  Le Menu de Workspace  - - - - - - - - - -

test_menu2 = [
    {
        header: "Menu d'espace"
    },
    {
        icon: 'glyphicon-paperclip',
        text: 'Coller',
        action: function(e, selector) {
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


         }

];
//- - - - - -  Le Menu de l'etiquette - - - - - - - - - -

menu_etiq = [
    {
        header: ''
    },
    {
        icon: 'glyphicon-eye-close',
        text: 'Cacher',
        action: function(e, selector) {
         var id = $(selector).attr('id');
         var elem=document.getElementById(id);
         elem.style.display="none";

          }


         }

];

//- - - - - -  Le menu de la table de selection  - - - - - - - - - -

menu_select = [
    {
        header: 'Menu De selection'
    },
    {
        icon: 'glyphicon-eye-close',
        text: 'Copier',
        action: function(e, selector) {
          elemsCopySelet=elemtraite;
          optionCopy=2;

        }
      },
      {
          divider: true
      }
      ,
      {
          icon: 'glyphicon-eye-close',
          text: 'Supprimer',
          action: function(e, selector) {
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
           }


];
