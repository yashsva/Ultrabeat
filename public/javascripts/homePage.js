window.onbeforeunload = function() {
	var message = 'Do you want to leave this page?';
	return message;
}

//DOM Ready
$(document).ready(function () {
	//Poppulate the user table on initial page load
	populateTable();
	loadHollySlider();
	$('.playlist').on('click',playlistParser);
	// document.documentElement.requestFullscreen();
	

	$('#slider1').on('click', 'div .imgslider', playAudio);
	$('#slider3').on('click', 'div .imgslider', playAudio);
	
    
	//Add Song button click
	//$('#addSongbtn').on('click',addSong);


});


//Listeners to activate after loading of page 
$(window).load(function(){

	$('.hoverPlayIcon').on('click',function(){
	
		$(this).siblings(".imgslider").trigger("click");
	
	});
});




//FUNCTIONS

//Fill the table with data 
function populateTable() {
	//Empty Content String
	var tableContent = '';
	var i = 0;
	var sliderContent = '';
	//jQuery AJAX call for JSON
	$.getJSON('/users/audiolist', (data) => {
		//tempContent for putting top songs on 3rd place in slider to make it visible first
		var tempContent = '';
		//for each item in our JSON ,add a table row and cells to the content string
		$.each(data, function () {
			if (i <= 8) {
				if (i < 3) {
					tempContent += '<div class="hide animation "><img  src="/image/getImage/' + this.filename + '"  class="imgslider song" rel="bolly/' + this.filename
					 + '"><i class="material-icons hoverPlayIcon">play_arrow</i>'
					 +'<div class="div_thumbnailOptions">'
						+'<i class="material-icons icon_thumbnailOptions">more_vert</i>'
						+'<div class="div_list_thumbnailOptions">'
							+'<ul class="list_thumbnailOptions">'
								+'<li>Play Next</li>'
								+'<li>Add to Queue</li>'
							+'</ul>'
						+'</div>'
					 +'</div>'
					 +'<div class="caption">' + this.filename + '</div></div>';
				}
				else {
					sliderContent += '<div class="hide animation "><img  src="/image/getImage/' + this.filename + '"  class="imgslider song" rel="bolly/' + this.filename 
					+ '"><i class="material-icons hoverPlayIcon">play_arrow</i>'
					+'<div class="div_thumbnailOptions">'
						+'<i class="material-icons icon_thumbnailOptions">more_vert</i>'
						+'<div class="div_list_thumbnailOptions">'
							+'<ul class="list_thumbnailOptions">'
								+'<li>Play Next</li>'
								+'<li>Add to Queue</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<div class="caption">' + this.filename + '</div></div>';
					 

				}
				if (i == 6) {
					sliderContent += tempContent;
				}
				i++;
			}
			else {
				tableContent += '<tr>';
				tableContent += '<td><a href="#"   class="a linkshowuser song" rel="bolly/' + this.filename + '">' + this.filename + '</a></td>';
				tableContent += '<td><a href="#" class="a linkdeleteuser" rel="bolly/' + this.filename + '">delete</a></td>';
				tableContent += '</tr>';
			}
		});

		//Inject the whole content string into our existing HTML table
		$(sliderContent).appendTo('#slider1 ');
		$('#audioList table tbody').html(tableContent);
		initialSlider();
	});
};

/* function loadBollyNewReleaseSlider()
{
   var tableContent='';
   var i=0;
   var sliderContent='';
   $.getJSON('/users/audiolist/bollynew',(data)=>
   {
	   //tempContent for putting top songs on 3rd place in slider to make it visible first
	   var tempContent='';
   	
	   $.each(data,function()
	   {
		   if(i<=5)
		   {
			   if(i<3)
			   {
				   tempContent+='<div class="hide2 animation"><img  src="/image/getImage/'+this.filename+'"  class="imgslider" rel="holly/'+this.filename+'"><div class="caption">'+this.filename+'</div></div>';
			   }
			   else
			   {
				   sliderContent+='<div class="hide2 animation"><img  src="/image/getImage/'+this.filename+'"  class="imgslider" rel="holly/'+this.filename+'"><div class="caption">'+this.filename+'</div></div>';
		   	
			   }
			   if(i==4)
			   {
				   sliderContent+=tempContent;
			   }
			   i++;
		   }
		   else
		   {
			   tableContent+='<tr>';
			   tableContent+= '<td><a href="#"   class="a linkshowuser" rel="holly/'+this.filename+'">'+this.filename+'</a></td>';
			   tableContent+= '<td><a href="#" class="a linkdeleteuser" rel="holly/'+this.filename+'">delete</a></td>';
			   tableContent+='</tr>';
		   }
		   	
	   });
	   $(sliderContent).appendTo('#slider2');
	   $(tableContent).appendTo('#audioList table tbody');
	   initialBollyNewReleaseSlider();
   });
	
};
*/
function loadHollySlider() {
	var tableContent = '';
	var i = 0;
	var sliderContent = '';
	$.getJSON('/users/audiolist/holly', (data) => {
		//tempContent for putting top songs on 3rd place in slider to make it visible first
		var tempContent = '';

		$.each(data, function () {
			if (i <= 5) {
				if (i < 3) {
					tempContent += '<div class="hide2 animation "><img  src="/image/getImage/' + this.filename + 
							'"  class="imgslider song" rel="holly/' + this.filename 
							+ '"><i class="material-icons hoverPlayIcon">play_arrow</i>'
							+'<div class="div_thumbnailOptions">'
					+'<i class="material-icons icon_thumbnailOptions">more_vert</i>'
					+'<div class="div_list_thumbnailOptions">'
							+'<ul class="list_thumbnailOptions">'
								+'<li>Play Next</li>'
								+'<li>Add to Queue</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<div class="caption">' + this.filename + '</div></div>';
				}
				else {
					sliderContent += '<div class="hide2 animation"><img  src="/image/getImage/' + this.filename + '"  class="imgslider song" rel="holly/' + this.filename 
					+ '"><i class="material-icons hoverPlayIcon">play_arrow</i>' 
					+'<div class="div_thumbnailOptions">'
						+'<i class="material-icons icon_thumbnailOptions">more_vert</i>'
						+'<div class="div_list_thumbnailOptions">'
							+'<ul class="list_thumbnailOptions">'
								+'<li>Play Next</li>'
								+'<li>Add to Queue</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
					+'<div class="caption">' + this.filename + '</div></div>';

				}
				if (i == 4) {
					sliderContent += tempContent;
				}
				i++;
			}
			else {
				tableContent += '<tr>';
				tableContent += '<td><a href="#"   class="a linkshowuser song" rel="holly/' + this.filename + '">' + this.filename + '</a></td>';
				tableContent += '<td><a href="#" class="a linkdeleteuser" rel="holly/' + this.filename + '">delete</a></td>';
				tableContent += '</tr>';
			}

		});
		$(sliderContent).appendTo('#slider3');
		$(tableContent).appendTo('#audioList table tbody');
		initialHollySlider();
	});

};




/* $(document).ready(function()
{
	initialSlider();
}); */
//window.onresize = initialSlider;
var slides=document.getElementsByClassName("hide");
var i,cindex=2,frwd=6,back=4;
function setSlideNo()
{
	if(window.matchMedia("(max-width:600px)").matches)
	{
		frwd=back;
	}
	else
	{
		frwd=back+2;
	}
}
function initialSlider()
{
	setSlideNo();
	
	for(i=0;i<slides.length;i++)
  {
   if(i>=back&&i<=frwd)
      slides[i].style.display="block";
   else
      slides[i].style.display="none";
   }
}


function changeslide(j)
{
	
	initialSlider(); 
	back+=j;
  frwd+=j;
  if(frwd>slides.length-1)
	  {
		frwd=slides.length-1;
		back=slides.length-3;
		if(window.matchMedia("(max-width:600px)").matches)
			{
				back=frwd;
			}  
	  }
  if(back<0)
	  {
		  back=0;frwd=2;
			if(window.matchMedia("(max-width:600px)").matches)
			{
				frwd=back;
			}
	  }
  
  for(i=0;i<slides.length;i++)
  {
   if(i>=back&&i<=frwd)
      slides[i].style.display="block";
   else
      slides[i].style.display="none";
   }

}




//slider3 is for hollywood songs
var slider3=document.getElementsByClassName("hide2");
var k,frwdHol=5,backHol=2;
function setHollySlideNo()
{
	if(window.matchMedia("(max-width:600px)").matches)
	{
		frwdHol=backHol;
	}
	else
	{
		frwdHol=backHol+2;
	}
}
function initialHollySlider()
{
	setHollySlideNo();
	
	for(k=0;k<slider3.length;k++)
  {
   if(k>=backHol&&k<=frwdHol)
      slider3[k].style.display="block";
   else
      slider3[k].style.display="none";
   }
}


function changeHollySlide(j)
{
	
	initialHollySlider();
	backHol+=j;
  frwdHol+=j;
  if(frwdHol>slider3.length-1)
	  {
		frwdHol=slider3.length-1;
		backHol=slider3.length-3;
		if(window.matchMedia("(max-width:600px)").matches)
			{
				backHol=frwdHol;
			}  
	  }
  if(backHol<0)
	  {
		  backHol=0;frwdHol=2;
			if(window.matchMedia("(max-width:600px)").matches)
			{
				frwdHol=backHol;
			}
	  }
  
  for(k=0;k<slider3.length;k++)
  {
   if(k>=backHol&&k<=frwdHol)
      slider3[k].style.display="block";
   else
      slider3[k].style.display="none";
   }

}




function playlistParser(event)
{
		event.preventDefault();
		var url=$(this).children("a").attr("href");
		console.log('Parsing Playlist');
		window.location.href=url;
}

