(function ($) {

  "use strict";

  	$('.counter').counterUp({
        delay: 10,
        time: 1000
    });

  	$("#features").owlCarousel({

          navigation : true,
          slideSpeed : 400,
          paginationSpeed : 400,
          singleItem:true,
          autoPlay: true

      });

  	$(window).load(function(){
	    $(".page-loader").fadeOut("slow");
	  });


  	$.stellar();

  	$('#grid').mixItUp();

  	lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'fadeDuration':900,
      'imageFadeDuration':600,
      'positionFromTop':150,
      'disableScrolling':false
    })

})(jQuery);
