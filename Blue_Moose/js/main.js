// $(function(){

var flashReady = function()
{

// Initializing Play
// Play/Pause toggle
	var play = true;
	var first_play = true;
	$('.play').on('click', function() {
		
		if(first_play)
		{
			flash.connect('rtmpt://localhost:5080/SMSServer');
			first_play = false;
			$('.play').attr('src', 'images/pause.png');
			play = false;
		}else
		{
			if(play)
			{
				$('.play').attr('src', 'images/pause.png');
				flash.playPause();
				play = false;
			}else
			{
				$('.play').attr('src', 'images/play.png');
				flash.playPause();
				play = true;		
			}
		}

	});

	$(".seek").val(0);

	$('.seek').on("input change",function()
	{
		seekBoolean = false;
		var seek_bar = $('.seek').val();
		var xpos = seek_bar;
		var seekTime = 0;

		seekTime = xpos / 130 * myDuration;

		flash.setTime(seekTime);

	});

	$('.seek').on("mouseup",function(e){

		seekBoolean = true;
		console.log(seekBoolean);

	});

	var mic = false;
	var record = false;
	var camera = false;

	$('.microphone-box').hide();
	$('.record-box').hide();
	$('.camera-box').hide();


// Calling getMicrophone.
// Setting Global variable to be index 0.
// Looping through microphone array to populate div.
	var micArray = flash.getMicrophones();
	selected_mic = 0;
	for(var i=0; i < micArray.length; i++)
	{
		$(".microphone-box").append('<p id=" ' + [i] + ' ">' + micArray[i] +'</p>');
	}


// Calling getCameras().
// Setting Global variable to be index 0.
// Looping through camera array to populate div.
	var camArray = flash.getCameras();
	selected_camera = 0;
	for(var i=0; i < camArray.length; i++)
	{
		$(".camera-box").append('<p id=" ' + [i] + ' ">' + camArray[i] +'</p>');
	}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Showing and hiding the control divs on click.
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
			flash.stopRecording();
			$('.microphone-box').hide();
			$('.record-box').hide();
			$('.camera-box').hide();
			record = false;
		}else
		{
			flash.startRecording("Star_Trek",selected_camera,selected_mic);
			console.log(selected_camera + " : " + selected_mic);
			$('.camera-box').hide();
			$('.microphone-box').hide();
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Volume Bar

	var volume_bar = $('.volume_bar');
	volume_bar.val(flash.getVolume());

	volume_bar.on("input change",function(){
		var volume = $('.volume_bar').val();
		flash.setVolume(volume / 100);
	});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SELECTING FROM THE LIST OF CAMERAS AND MICROPHONES

	$('.microphone-box').on('click', function(event){
		selected_mic = event.target.id;
		console.log('microphone index: ' + selected_mic);
	});

	$('.camera-box').on('click', function(event){
		selected_camera = event.target.id;
		console.log('camera index: ' + selected_camera);
	});


}; // Closing Flash Ready



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scrolling Opacity Code
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

// Login nav drop down on click

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


// Checking to make sure there is a connection to the server.
var connected = function(success,error)
{
	if(success)
	{
		flash.startPlaying('startrekintodarkness_vp6.flv');
	}else
	{
		console.log(error);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Seek Bar

 	seekBoolean = true;

	var seekTime = function(time){
		myTime = time;
		console.log(seekBoolean);
		
		if(seekBoolean)
		{
			$(".seek").val(myTime);
		}
	};

	var getDuration = function(duration){
		myDuration = duration;
	};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIREBASE
// var myDataRef = new Firebase('https://st3vq0l0jta.firebaseio-demo.com/');
// myDataRef.set('User ' + name + ' says ' + text);

// name and text are html type inputs .value

// myDataRef.set({name: name, text: text});
// myDataRef.push({name: name, text: text});
// myDataRef.on('child_added', function(snapshot) {
  	// We'll fill this in later.
// });

// var message = snapshot.val();
// displayChatMessage(message.name, message.text);

// }); // Closing the Self executing function that runs this entire page