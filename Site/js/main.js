$(function(){

var divs = $('#wrapper');

divs.hide().fadeIn(1000);

divs.css({'background-color' : 'rgba(244,244,244, 0)'});

$(window).on('scroll', function() {
   var st = $(this).scrollTop();
   divs.css({ 'background-color' : 'rgba(244,244,244, ' + (0 + st/250) + '' + ')' });
});

var login = $('#login');
var navShow = false;
$('.login_dropdown').hide();


login.on('click',function() {

	if(navShow)
	{
	    $(".login_dropdown").hide();
	    navShow = false;
	}else
	{
	    $(".login_dropdown").show();
	    navShow = true;
	}
});

var play = true;
$('.play').on('click', function() {

	if(play)
	{
		$('.play').attr('src', 'images/pause.png');
		play = false;
	}else
	{
		$('.play').attr('src', 'images/play.png');
		play = true;		
	}

});

var mic = false;
var record = false;
var camera = false;

$('.microphone-box').hide();
$('.record-box').hide();
$('.camera-box').hide();

$('.microphone').on('click', function() {

	if(mic)
	{
		$('.microphone-box').hide();
		$('.record-box').hide();
		$('.camera-box').hide();
		mic = false;
	}else
	{
		$('.record-box').hide();
		$('.camera-box').hide();
		$('.microphone-box').show();
		mic = true;
		record = false;
		camera = false;	
	}

});

$('.record').on('click', function() {

	if(record)
	{
		$('.microphone-box').hide();
		$('.record-box').hide();
		$('.camera-box').hide();
		record = false;
	}else
	{
		$('.camera-box').hide();
		$('.microphone-box').hide();
		$('.record-box').show();
		record = true;	
		mic = false;
		camera = false;	
	}

});

$('.camera').on('click', function() {

	if(camera)
	{
		$('.microphone-box').hide();
		$('.record-box').hide();
		$('.camera-box').hide();
		camera = false;
	}else
	{
		$('.microphone-box').hide();
		$('.record-box').hide();
		$('.camera-box').show();
		camera = true;	
		mic = false;
		record = false;	
	}

});



// var flashReady = function()
// {
// 	flash.connect('rtmpt://localhost:5080/SMSServer');

// }

}); // Closing the Self executing function that runs this entire page