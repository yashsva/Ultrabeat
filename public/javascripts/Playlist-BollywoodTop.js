$(document).ready(function () {
	//Poppulate the user table on initial page load
	populateTable();



	//Add Song button click
	//$('#addSongbtn').on('click',addSong);


});

//FUNCTIONS

//Fill the table with data 
function populateTable() {
	//Empty Content String
	var playlistContent = '';

	//jQuery AJAX call for JSON
	$.getJSON('/playlist/bolly/top/20', (data) => {
		//tempContent for putting top songs on 3rd place in slider to make it visible first

		//for each item in our JSON ,add a table row and cells to the content string
		$.each(data, function () {



			playlistContent += "<li class='playlist_entry_li song' rel='bolly/" + this.filename + "' >";
			playlistContent += "<span class='playlist_entry_moreOptions'>&#8942</span>"
			playlistContent += "<img class='playlist_entry_img' src='/image/getImage/" + this.filename + "'>";
			playlistContent += "<div class='playlist_entry_div'><span class='playlist_entry_songName'>" + this.filename + "</span></div>";
			playlistContent += "</li>";

		});

		//Inject the whole content string into list
		$('.playlist_list').html(playlistContent);

	});
};