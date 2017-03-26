$(document).ready(function(){
	var touch 	= $('#resp-menu');
	var menu 	= $('.menu');
  var login = $('.login');

	$(touch).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
    login.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 959 && menu.is(':hidden')) {
			menu.removeAttr('style');
      login.removeAttr('style');
		}
	});

});
