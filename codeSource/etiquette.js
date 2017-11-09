var etiq;
var alphabet ;
var num_ordre ;
var last_alphabet=0 ;
var tab_alphabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'
,'Y','Z'];
var num_alpha ;
function last_etiq(id){
var prec=0;
  num_ordre=0 ;
  var bol=true;
  for (var i = 0 ; i < tabElem.length ; i ++ ){
      get_original_id(tabElem[i].id);
    if ( id.indexOf(originl_id)!=-1) {
      bol=false;
      var elem = document.getElementById(tabElem[i].id);
      var elems=elem.childNodes;
      var text= elems[elems.length-1].innerHTML;
      search_alpha(originl_id);
      alphabet=tab_alphabet[num_alpha];
      prec=text.substring(1,2);
      if(prec>num_ordre){num_ordre=prec;}
    }
  }
  if(bol==true){ get_original_id(id);search_alpha(originl_id);alphabet=tab_alphabet[num_alpha];}
  else{num_ordre++;}

}
//==============================================================
function search_alpha(id){
  if(id.indexOf("switch")!=-1){num_alpha=18 ;}
  if(id.indexOf("NOT")!=-1){num_alpha=13 ;}
  if(id.indexOf("OUI")!=-1){num_alpha=24 ;}
  if(id.indexOf("ORR")!=-1){num_alpha=14 ;}
  if(id.indexOf("XOR")!=-1){num_alpha=15 ;}
  if(id.indexOf("NOR")!=-1){num_alpha=8 ;}
  if(id.indexOf("ANND")!=-1){num_alpha=0 ;}
  if(id.indexOf("NAND")!=-1){num_alpha=6 ;}
  if(id.indexOf("DECOD")!=-1){num_alpha=1 ;}
  if(id.indexOf("ENCOD")!=-1){num_alpha=4 ;}
  if(id.indexOf("MUXX")!=-1){num_alpha=12 ;}
  if(id.indexOf("DEMUX")!=-1){num_alpha=20 ;}
  if(id.indexOf("HEX")!=-1){num_alpha=23 ;}
  if(id.indexOf("led")!=-1){num_alpha=11 ;}
  if(id.indexOf("DFF")!=-1){num_alpha=3 ;}
  if(id.indexOf("TFF")!=-1){num_alpha=19;}
  if(id.indexOf("JKFF")!=-1){num_alpha=9 ;}
  if(id.indexOf("RSFF")!=-1){num_alpha=17 ;}
  if(id.indexOf("RSHFF")!=-1){num_alpha=5 ;}
  if(id.indexOf("Horloge")!=-1){num_alpha=7 ;}
  if(id.indexOf("Compteur")!=-1){num_alpha=2 ;}
  if(id.indexOf("ADDc")!=-1){num_alpha=25 ;}
  if(id.indexOf("Sous")!=-1){num_alpha=20 ;}
  if(id.indexOf("CMP")!=-1){num_alpha=10 ;}
  if(id.indexOf("REG_UNIVER")!=-1){num_alpha=21 ;}

}
