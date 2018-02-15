$(document).ready(function() {
	$('#fullpage').fullpage({
		anchors:['menu', 'initial', 'problems', 'solution', 'advantages', 'architecture', 'team', 'cases', 'roadmap', 'tokensale'],
    verticalCentered: true,
    scrollOverflow: true,
		responsiveWidth: 900
  });

	$('#langToggle').click(function(){
		$('.langes').toggleClass('opened');
	});

});
