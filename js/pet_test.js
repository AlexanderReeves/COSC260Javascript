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
	  	}
	  	if(petScore >=26 && petScore <=50){
	  		$("#resultDog").removeClass("hidden");
	  		var resultTextColour = "highScore";
	  	}

	  	$("#resultDog").after('<h2 class="centertext ' + resultTextColour + '" >Your score is ' + petScore +'</h2>');
	  	$("#endQuiz").after('<span class="centertext" >Scroll down to see your results!</span>');
	  	//Remove the submit button
	  	$("#submitTest").remove();
	  }
    });


});



