$(document).ready(function(){
$('.mokup').fadeIn('slow');
$('h1').fadeIn('slow');
var navOffset=$('#nav1').offset().top;
$(window).scroll(function(){
var wScroll=$(this).scrollTop();
$('#nav1').wrap('<div class="navStick" ></div>');
$('.navStick').height($('#nav1').outerHeight());

if (wScroll>navOffset)
{
    $('#nav1').addClass("fixed");
}
else{
    $('#nav1').removeClass("fixed");
}

    });
});

function goTo(win)
{
    if(win==1)
    {
        $('html,body').animate({
              scrollTop: $('.1').offset().top
            }, 2000);
    }
    if(win==2)
    {
        $('html,body').animate({
              scrollTop: $('.2').offset().top
            }, 2000);
    }
    if(win==3)
    {
        $('html,body').animate({
              scrollTop: $('.3').offset().top
            }, 2000);
    }
    if(win==4)
    {
        $('html,body').animate({
              scrollTop: $('.4').offset().top
            }, 2000);
    }
}
