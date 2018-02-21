$(document).ready(function() {
	$('#fullpage').fullpage({
		anchors:['menu', 'initial', 'problems', 'solution', 'advantages', 'architecture', 'team', 'cases', 'roadmap', 'tokensale'],
    verticalCentered: true,
    scrollOverflow: true,
		responsiveWidth: 1279
  });

	$('#langToggle').click(function(){
		$('.langes').toggleClass('opened');
		$('.navBurger').toggleClass('hided');
	});

	$('.navBurger').click(function(){
		$('.mobile').toggleClass('showed');
		$('.main_container').toggleClass('moved');
	});

	$(".counter li").click(function(){
		if($(this).css('max-width') == '400px') {
			$(".mobile").removeClass('showed');
			$('.main_container').removeClass('moved');
		}
	});

});
