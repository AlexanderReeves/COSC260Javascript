$(document).ready(function() {

    $('#registrationForm').submit(function(e) {

      //Prevent page reload attempt
      e.preventDefault();
      //Remove old warnings
      $(".errors").remove();
      //Variable to track for any failed inputs
      var validInput = true;

      //Validate the name field against the requirements
      //If any results fail, set validInput to false
      if(!ValidateNotNull('name')){
        validInput = false;
      }
      if(!ValidateLength('name',2,100)){
        validInput = false;
      }
      if(!ValidateRegex('name',/^[a-zA-Z'-]+$/,
      "Field must only containt A-z, whitespace, hyphen or apostrophe!")){
        validInput = false;
      }

      //Validate the age field against the requirements
      //If any results fail, set validInput to false
      if(!ValidateNotNull('age')){
        validInput = false;
      }
      if(!ValidateMinMax('age',18,130)){
        validInput = false;
      }
      

      //Validate the email field against the requirements
      //If any of the the results, fail, set validInput to false
      if(!ValidateNotNull('email')){
        validInput = false;
      }
      if(!ValidateRegex(
        'email', /^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/, 'Invalid email address!')){
        validInput = false;
      }

      //If the phone field is not null, make sure the vals are okay
      if(ValidateNotNull('phone')){
        //If the phone number is blank, the valid Input check
        //will remain the same
        //If it is not blank, check for ph num vailidity
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

      //If we reach this point and all inputs were valid
      if(validInput){
        $("#submitRegistration").after('<h2 id="regSuccessMessage" class="centertext" >Registration Submitted!</h2>');
        $("#submitRegistration").remove();
      }

    });
});




function ValidateLength(fieldID, minLength, maxLength){
  var success = true;
  //Ensure a submitted form field has the correct amount of characters
  var userInput = $('#'+fieldID +'Input').val();
  var inputLength = userInput.length;
  if(inputLength < minLength || inputLength > maxLength){
    success = false;
    //If the test fails, add a list item to show that error
    DisplayErrorMessage(
      '#'+fieldID +'Errors',
      "Field must be between "+(minLength) + " and " + (maxLength) + " characters!");
  }
  return success;
}


function ValidateNotNull(fieldID){
  var success = true;
  var userInput = $('#'+fieldID +'Input').val();
  if(userInput == '' || userInput.length == 0){
    DisplayErrorMessage(
      '#'+fieldID +'Errors',
      "Field can not be blank!");
    success = false;
  }
  return success;
}


function ValidateRegex(fieldID, regex, errorMessage){
  var success = true;
  var userInput = $('#'+fieldID +'Input').val();
  var validInput = regex.test(userInput);
  
  if(!validInput){
    DisplayErrorMessage(
      '#'+fieldID +'Errors',
      errorMessage)
    success = false;
  }
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
      DisplayErrorMessage('#'+fieldID +'Errors', "Value must be between " + min + " and " + max + "!");
      success = false;
    }
  }
  return success;
}


function DisplayErrorMessage(errorListName, message){
      $(errorListName).append(
      $('<li>', {
             text: message,
             class: "errors comfortView"
      }));
}
