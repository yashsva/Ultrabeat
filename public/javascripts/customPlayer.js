
/**	This file contains implementation of both 
 * 	CIRCULAR and LINEAR CUSTOM AUDIO PLAYERS
 * 
 *  */

$(document).ready(function () {

	playerProgress();

	$('#play-pause').on('click', changePlayerStatus);
	$('#nextSongButton').on('click', () => { changeAudio(1) });
	$('#prevSongButton').on('click', () => { changeAudio(-1) });

	//play songs from playlist 
	$('.playlist_list').on('click', 'li', playAudio);
	
	//Delete Song  (currently of no use)
	$('#audioList table tbody').on('click', 'td a.linkdeleteuser', deleteAudio);



	/* For CIRCULAR  player  */
	$('.play-pauseIconDiv').on('click', changePlayerStatus);




});




//Play audio
function playAudio(event) {
	console.log("Inside playAudio function");
	var audioPlayer = document.getElementById('audioPlayer')

	var trackName = $(this).attr('rel');
	// debugger
	console.log("trackName", trackName);

	songURL = '/audio/tracks/' + trackName;
	songIndex = $(".song").index(this);
	// loadAudio(trackName);
	$("#audioSource").attr('src', songURL);
	loadPlayerTrackName(trackName);

	audioPlayer.load();
	audioPlayer.play();

	// audioPlayer.style.display='block';
	// $('#custom-audioPlayer').css("display","block");
	document.documentElement.requestFullscreen();

	// window.alert("hi"+ songIndex);



};


/* 	To change the audio
	choice = +1 for next audio 
	choice= -1 for previous audio  */
function changeAudio(choice) {
	console.log("Inside changeAudio function ");
	var playing;
	// $("song").index(this);


	var audioPlayer = document.getElementById('audioPlayer')
	length = $(".song").size();
	if (choice == 1) {
		playing = "Next Audio";
		if (songIndex == length - 1) {
			songIndex = 0;
		}
		else {
			songIndex += 1;
		}
	}
	else if (choice == -1) {
		playing = "Previous Audio";
		if (songIndex == 0) {
			songIndex = length - 1;
		}
		else {
			songIndex -= 1;
		}
	}


	var nextSongName = $(".song").eq(songIndex).attr('rel');

	nextSongURL = '/audio/tracks/' + nextSongName;
	console.log("Playing --" + playing + "|  SongName :", nextSongName);
	$("#audioSource").attr('src', nextSongURL);
	loadPlayerTrackName(nextSongName);


	audioPlayer.load();
	audioPlayer.play();

	// audioPlayer.style.display='block';


}

function playHollyAudio(event) {
	var audioPlayer = document.getElementById('audioPlayer')
	var trackName = $(this).attr('rel');
	songURL = '/audio/tracks/' + trackName;
	$("#audioSource").attr('src', songURL);
	//jQuery AJAX call for JSON
	//$.getJSON('/users/tracks/'+trackName);

	/* audioPlayer.load(); */
	audioPlayer.play();
	// audioPlayer.style.display = 'block';
	$('#custom-audioPlayer').css("display", "block");

};

function deleteAudio(event) {
	event.preventDefault();
	var trackName = $(this).attr('rel');
	window.alert('Sorry ! You Do Not Have This Permission');
	/* var confirmation=confirm('Are you sure you want to delete this song');
	
	if(confirmation===true)
	{
		$.ajax(
		{
			type:'DELETE',
			url:'/audio/deleteSong/'+trackName
		}).done(function(response)
		{
			//check for a successful blank response
			if(response.msg!=='')
			{
				alert('Error : ' +response.msg);
			}
			//populate the Table
			populateTable();
		});
	}
	else */
	return false;
};


function canplaythrough() {
	console.log("In canplaythrough");
}



function changePlayerStatus() {
	// event.preventDefault();
	var A_Player = document.getElementById('audioPlayer');


	if (A_Player.paused) {
		if (A_Player.duration == 0) {
			A_Player.load();
		}
		A_Player.play();
		// TO Change Icon to play State
		changePlayPauseIcon(1);
		console.log("AudioPlayer status changed --  Playing");

	}
	else {
		A_Player.pause();
		// TO Change Icon to paused State
		changePlayPauseIcon(0);
		console.log("AudioPlayer status changed -- paused");

	}


}

/* choice =1 to switch to  playing state choice = 0 to switch to pause state*/
function changePlayPauseIcon(choice) {
	var newStatus;
	var playing = "pause";
	var paused = "play_arrow";
	if (choice == 1) {
		newStatus = playing;
		console.log("In changePlayPauseIcon func. - New Status -- playing");
	}
	else if (choice == 0) {
		newStatus = paused;
		console.log("In changePlayPauseIcon func. - New Status -- paused");
	}

	/* For Linear Player */
	$('#play-pause').html(newStatus);

	/* For Circular Player */
	$('.play-pauseIcon').html(newStatus);

}
function loadPlayerTrackName(trackName) {
	trackName = trackName.slice(6);
	$('#player-TrackName').html(trackName);

	/* To load song name and its image in notification section*/
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: trackName,
			artwork: [{ src: "/image/getImage/" + trackName, type: 'image/png' }]
		});
		// console.log(" metadata");
	}
}
function playerProgress() {
	var audioPlayer = document.getElementById('audioPlayer');
	audioPlayer.addEventListener("loadedmetadata", () => {
		/* To show progress of audio playing using backround colours */
		audioPlayer.addEventListener('timeupdate', () => {
			progress = (audioPlayer.currentTime / audioPlayer.duration);

			//TO show the progrees of current track playing  Player


			/* For Linear Player */

			value = "-webkit-linear-gradient(left, #1e1e30 " + (progress * 100) + "% ,#00001d " + progress + "% )";
			$('#custom-audioPlayer').css("background", value);
			// console.log(value);




			/* For Circular Player */

			radius = 35;
			circumference = 2 * (22 / 7) * radius;
			progressLength = (circumference * (1 - progress));

			$('.customCircularAudioPlayer svg circle:nth-child(2)').css("stroke-dashoffset", progressLength);
			// console.log(value);


		});

	});



	/* To control music from keyboard or from notification icon in mobile  */


	navigator.mediaSession.setActionHandler('nexttrack', () => {
		console.log('Nexttrack Keyboard key pressed');
		changeAudio(1);
	});
	navigator.mediaSession.setActionHandler('previoustrack', () => {
		console.log('previoustrack Keyboard key pressed');
		changeAudio(-1);
	});
	navigator.mediaSession.setActionHandler('play', () => {
		console.log('Play Keyboard key pressed');
		changePlayerStatus(1);
	});
	navigator.mediaSession.setActionHandler('pause', () => {
		console.log('Pause Keyboard key pressed');
		changePlayerStatus(0);
	});

}

