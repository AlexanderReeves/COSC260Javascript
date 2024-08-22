$(document).ready(function() {

    $('#registrationForm').submit(function(e) {
      //This code runs when users submit the pet rego form.

      //Prevent page reload attempt.
      e.preventDefault();

      //Remove old warnings.
      $(".errors").remove();
      //Variable to track for any failed inputs.
      var validInput = true;

      //------------Name-------------------
      //Validate the name field against the requirements.
      //If any results fail, set validInput to false.
      if(IsFieldNull('name', true)){
        validInput = false;
      }
      if(!ValidateLength('name',3,99)){
        validInput = false;
      }
      if(!ValidateRegex('name',/^[a-zA-Z'-]+$/,
      "Field must only containt A-z, whitespace, hyphen or apostrophe!")){
        validInput = false;
      }

      //---------------Age---------------
      //Validate the age field against the requirements.
      //If any results fail, set validInput to false.
      if(IsFieldNull('age', true)){
        validInput = false;
      }
      if(!ValidateMinMax('age',18,130)){
        validInput = false;
      }
      
      //------------Email-----------
      //Validate the email field against the requirements.
      //If any of the the results, fail, set validInput to false.
      if(IsFieldNull('email', true)){
        validInput = false;
      }
      if(!ValidateRegex(
        'email', /^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/, 'Invalid email address!')){
        validInput = false;
      }

      //----------Phone-----------
      //If the phone field is not null, make sure the input is okay.
      if(!IsFieldNull('phone',false)){
        //If the phone number is not blank then...
        //validate the ph num against the requirements.
        if(!ValidateRegex('phone',/^[0-9]*$/, 'Field must be a number!')){
          validInput = false;
        }
        if(!ValidateRegex('phone', /^04/,'Field must start with 04')){
          validInput = false;
        }
        if(!ValidateLength('phone', 10, 10)){
          validInput = false;
        }
        
      }

      //If we reach this point and all inputs were valid.
      if(validInput){
        //Show registration submit success
        $("#submitRegistration").after('<h2 id="regSuccessMessage" class="centertext" >Registration Submitted!</h2>');
        $("#submitRegistration").remove();
      }

    });
});




function ValidateLength(fieldID, minLength, maxLength){
  //Default presume the length is valid, until we learn otherwise.
  var success = true;
  //Ensure a submitted form field has the correct amount of characters.
  var userInput = $('#'+fieldID +'Input').val();
  var inputLength = userInput.length;
  //Compare vs Min and Max length of field
  if(inputLength < minLength || inputLength > maxLength){
    success = false;
    //If the test fails, add a list item to show that error
    DisplayErrorMessage(
      '#'+fieldID +'Errors',
      "Field must be between "+(minLength-1) + " and " + (maxLength+1) + " characters!");
  }
  //Return the result of the valid length test
  return success;
}


function IsFieldNull(fieldID, requiredField){
  //Check is a field is null
  //Displays an error message for empty fields that aren't optional
  var nullField = false;
  var userInput = $('#'+fieldID +'Input').val();

  //If the field is null...
  if(userInput == '' || userInput.length == 0){
    nullField = true;
    //If the field is required and null, show an error
    if(requiredField){
          DisplayErrorMessage('#'+fieldID +'Errors',
          "Field can not be blank!");
    }
  }
  //Return result of field being null
  return nullField;
}


function ValidateRegex(fieldID, regex, errorMessage){
  //Check if input characters are okay via regex
  //Presume they are valid until we learn otherwise
  var success = true;
  var userInput = $('#'+fieldID +'Input').val();
  var validInput = regex.test(userInput);
  
  //If the regext test failed, display an error
  if(!validInput){
    DisplayErrorMessage(
      '#'+fieldID +'Errors',
      errorMessage)
    success = false;
  }
  //Return wether the check passed or failed
  return success;
}


function ValidateMinMax(fieldID, min, max){
  var success = true;
  //We can't validate the min max values unless we are
  //sure the value is a number
  okRegex = ValidateRegex(fieldID, /^[0-9]*$/, 'Field must be a number!');
  if(!okRegex){
    success = false;
    return false;
  }
  //If the numbers are numbers, check the range is okay
  if(okRegex){
    var userInput = $('#'+fieldID +'Input').val();
    var intInput = parseInt(userInput);
    if(intInput < min || intInput > max){
      DisplayErrorMessage('#'+fieldID +'Errors', "Value must be between " + (min-1) + " and " + (max+1) + "!");
      success = false;
    }
  }
  //Return wether the regex test passed or failed
  return success;
}


function DisplayErrorMessage(errorListName, message){
  //Inserts a list item containing an error message to UL items
  //When given the name ID of an Unordered List
      $(errorListName).append(
      $('<li>', {
             text: message,
             //The comfort view class will make it sit nicely in the mid of screen
             class: "errors comfortView"
      }));
}
