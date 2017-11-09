var cliqueBib = false;

document.addEventListener('click' ,  function(e) {
  if(e.target.id.indexOf('Library')!=-1) {
    cliqueBib = true;
  }
},false);

if(cliqueBib == true ){
    document.getElementById('Library').click();
}
