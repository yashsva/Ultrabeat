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
	var tableContent = '';
	var i = 0;
	var sliderContent = '';
	//jQuery AJAX call for JSON
	$.getJSON('/playlist/bolly/top/20', (data) => {
		//tempContent for putting top songs on 3rd place in slider to make it visible first
		var tempContent = '';
		//for each item in our JSON ,add a table row and cells to the content string
		$.each(data, function () {
			
			
				tableContent += '<tr>';
				tableContent += '<td><a href="#"   class="a linkshowuser song" rel="bolly/' + this.filename + '">' + this.filename + '</a></td>';
				tableContent += '<td><a href="#" class="a linkdeleteuser" rel="bolly/' + this.filename + '">delete</a></td>';
				tableContent += '</tr>';
			
		});

		//Inject the whole content string into our existing HTML table
		
		$('#audioList table tbody').html(tableContent);
		
	});
};