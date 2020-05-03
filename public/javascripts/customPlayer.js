$(document).ready(function () {

	playerProgress();
    //Username link click
	
	$('#play-pause').on('click',changePlayerStatus);
	$('#nextSongButton').on('click',()=>{ changeAudio(1)});
	$('#prevSongButton').on('click',()=>{ changeAudio(-1)});
	
	$('#audioList table tbody').on('click', 'td a.linkshowuser', playAudio);
	//Delete Song
	$('#audioList table tbody').on('click', 'td a.linkdeleteuser', deleteAudio);


});




//Play audio
function playAudio(event) {
	console.log("Inside playAudio function");
	var audioPlayer=document.getElementById('audioPlayer')
	
	var trackName = $(this).attr('rel');
	// debugger
	console.log("trackName", trackName);

	songURL='/audio/tracks/'+trackName;
	songIndex = $(".song").index(this);
	// loadAudio(trackName);
	$("#audioSource").attr('src',songURL);
	loadPlayerTrackName(trackName);

	audioPlayer.load();
	audioPlayer.play();

	// audioPlayer.style.display='block';
	$('#custom-audioPlayer').css("display","block");
	document.documentElement.requestFullscreen();

	// window.alert("hi"+ songIndex);



};

	/* function to play next song after completion of current song */
/* function nextAudio()
{
		console.log("Inside nextAudio function");
		// $("song").index(this);
		

		var audioPlayer=document.getElementById('audioPlayer')
		length = $(".song").size();
		if (songIndex == length - 1) {
			songIndex = 0;
		}
		else {
			songIndex += 1;
		}
		var nextSongName=$(".song").eq(songIndex).attr('rel');
		
		nextSongURL='/audio/tracks/'+nextSongName;
		console.log("nextSongName :",nextSongName,"nextSongURL:",nextSongURL);
		$("#audioSource").attr('src',nextSongURL);
		loadPlayerTrackName(nextSongName);
	
		audioPlayer.load();
		audioPlayer.play();
		// audioPlayer.style.display='block';
		
}
 */
/* 	To change the audio
	choice = +1 for next audio 
	choice= -1 for previous audio  */
function changeAudio(choice)
{
	console.log("Inside changeAudio function ");
	var playing;
		// $("song").index(this);
		

		var audioPlayer=document.getElementById('audioPlayer')
		length = $(".song").size();
		if(choice==1)
		{
			playing="Next Audio";
			if (songIndex == length - 1) {
				songIndex = 0;
			}
			else {
				songIndex += 1;
			}
		}
		else if(choice==-1)
		{
			playing="Previous Audio";
			if (songIndex == 0) {
				songIndex =  length - 1;
			}
			else {
				songIndex -= 1;
			}
		}


		var nextSongName=$(".song").eq(songIndex).attr('rel');
		
		nextSongURL='/audio/tracks/'+nextSongName;
		console.log("Playing --" + playing+ "|  SongName :",nextSongName);
		$("#audioSource").attr('src',nextSongURL);
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
	$('#custom-audioPlayer').css("display","block");

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


/*  It is disabled as the task had alreday implemented in easier way

//Add Song with POST request
function addSong(event)
{
	event.preventDefault();
	var errorCount=0;
	$('#addAudioForm input').each(function(index,val)
	{
		if($(this).val===''){errorCount++;}
	});

	if(errorCount===0)
	{
		var newAudio=
		{
			'track':$('#addAudioForm fieldset input #songFile ').val(),
			'name':$('#addAudioForm fieldset input #songName ').val()
		}

		//AJAX to post the song
		$.ajax(
		{
			type:'POST',
			data:newAudio,
			url:'/audio/addAudio/',
			dataType:'JSON'
		}).done(function(response)
		{
			//check for successful blank response
			if(response.msg==='')
			{
				//Clear the form inputs
				$('#addAudioForm input').val('');
				//Update the table
				populateTable();
			}
			else
			{
				//if something went wrong
				alert('ERROR :'+response.msg);
			}
		});
	}
	else
	{
		//if any field is empty
		alert('Please fill in sll the fields');
		return false;
	}
};

*/


function canplaythrough()
{
	console.log("In canplaythrough");
}


            
function changePlayerStatus()
{
	// event.preventDefault();
	var A_Player=document.getElementById('audioPlayer');
	var playing="pause_circle_filled";
	var paused="play_circle_filled";
	var currentStatus=$('#play-pause').html();
	var newStatus;
	if(A_Player.paused)
	{
		if(A_Player.duration==0)
		{
			A_Player.load();
		}
		A_Player.play();
		// TO Change Icon to play State
		changePlayPauseIcon(1);
		console.log("AudioPlayer status changed --  Playing"  );
		
	}
	else
	{
		A_Player.pause();
		// TO Change Icon to paused State
		changePlayPauseIcon(0);
		console.log("AudioPlayer status changed -- paused"  );
		
	}
	$('#play-pause').html(newStatus);
	
}

/* choice =1 to switch to  playing state choice = 0 to switch to pause state*/
function changePlayPauseIcon(choice)
{
	var newStatus;
	var playing="pause_circle_filled";
	var paused="play_circle_filled";
	if(choice==1)
	{
		newStatus=playing;
		console.log("In changePlayPauseIcon func. - New Status -- playing");
	}
	else if(choice==0)
	{
		newStatus=paused;
		console.log("In changePlayPauseIcon func. - New Status -- paused");
	}

	$('#play-pause').html(newStatus);
	
}
function loadPlayerTrackName(trackName)
{
	trackName=trackName.slice(6);
	$('#player-TrackName').html(trackName);

	/* To load song name and its image in notification section*/
	if('mediaSession' in navigator)
	{
		navigator.mediaSession.metadata=new MediaMetadata({
			title:trackName,
			artwork:[ {src:"/image/getImage/"+trackName, type: 'image/png'}]
		});
		// console.log(" metadata");
	}
}
function playerProgress()
{
	var audioPlayer=document.getElementById('audioPlayer');
	audioPlayer.addEventListener("loadedmetadata",()=>
	{
		/* To show progress of audio playing using backround colours */
		audioPlayer.addEventListener('timeupdate',()=>
		{
			progress=(audioPlayer.currentTime/audioPlayer.duration)*100;
			progress=Math.round(progress);
			//TO show the progrees of song played in Custom audio Player
			value="-webkit-linear-gradient(left, #1e1e30 "+ progress + "% ,black " +progress+"% )";
			$('#custom-audioPlayer').css("background",value);
			// console.log(value);
		});
		
	});



	/* To control music from keyboard or from notification icon in mobile  */
	
	
	navigator.mediaSession.setActionHandler('nexttrack',()=>{
		console.log('Nexttrack Keyboard key pressed');
		changeAudio(1);
	});
	navigator.mediaSession.setActionHandler('previoustrack',()=>{
		console.log('previoustrack Keyboard key pressed');
		changeAudio(-1);
	});
	navigator.mediaSession.setActionHandler('play',()=>{
		console.log('Play Keyboard key pressed');
		changePlayerStatus(1);
	});
	navigator.mediaSession.setActionHandler('pause',()=>{
		console.log('Pause Keyboard key pressed');
		changePlayerStatus(0);
	});

}

