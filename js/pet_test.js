var petScore = 0;

$(document).ready(function() {

    $('#petquiz').submit(function(e) {
      //Prevent page reload attempt
      e.preventDefault();
	  

      //Remove old warnings
      $(".errors").remove();
      var validSelection = true;

      //Track the pet compatibility score
      petScore = 0;

      //Loop through each 'Select option selected' dropdown element
      $( "select option:selected" ).each(function( index ) {
      	    //Check the selected items value to see if it is 'None Selected'
            var chosenItem = $( this ).text();
            console.log($(this).val());
            //The values are appeariing as strings,
            // so convert to int and add to total
            petScore += parseInt($(this).val());
		    if(chosenItem == "None Selected"){
		    	//Add a warning above the parent dropdown item
      	  	    $( this ).parent().before('<span class="errors" >Please make a selection!</span>');
      	  	    validSelection = false;
      	    }

	  });

      var resultTextColour = "lowScore";
      //This code only runs if no errors were thrown
	  if(validSelection){
		//Show the registration button after 5 seconds
		setTimeout(createRegButton, 5000 );

	    if(petScore >=0 && petScore <=10){
	  		$("#resultFish").removeClass("hidden");
	  		var $fadeInImage = $('#resultFish'); 
		    $fadeInImage.fadeTo(5000, 1.0, function(){
				$fadeInImage.addClass('active');
			});
	  	}

	  	if(petScore >=11 && petScore <=25){
	  		$("#resultCat").removeClass("hidden");
	  		var resultTextColour = "medScore";
			var $stretchImage = $('#resultCat'); 
			$stretchImage.animate({width: '200px'}, 5000);			
	  	}
	  	if(petScore >=26 && petScore <=50){
	  		$("#resultDog").removeClass("hidden");
	  		var resultTextColour = "highScore";
			var $slideImage = $('#resultDog'); 
			//This one is quite interesting...
			//It increases the entire page width, however as it returns to its
			//normal location, the page resumes the normal size and
			//I can't see any true negatives to this approach apart from being quircky which
			//I quite like!
			$slideImage.animate({'padding-left': '0px'}, 5000);	
	  	}

	  	$("#resultDog").after('<h2 id="displayScore" class="centertext  ' + resultTextColour + '" >Your score is ' + petScore +'</h2>');
	  	$("#endQuiz").after('<span class="centertext"  id="scrollMessage" >Scroll down to see your results!</span>');
	  	//Remove the submit button
	  	$("#submitTest").remove();
	  }
    });


});

function createRegButton(){
	$("#displayScore").after(
		'<form action="./a3Registration.html"> <input type="submit" value="Adopt Me!" class="button center"/> </form>');
}



