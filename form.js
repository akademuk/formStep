$(document).ready(function() {

  // Get the total number of steps
  var totalSteps = $("#form > div").length;
  var totalSteps = 7;

  // Initialize the current step to 1
  var currentStep = 1;

  // Set the desired step number
  var desiredStepNumber = totalSteps - 1;

  // Update the progress bar based on the current step
  function updateProgressBar() {
    var percent = (currentStep - 1) / (totalSteps - 1) * 100;
    $(".progress-bar").css("width", percent + "%");
    $(".step-number").text(currentStep + "/" + totalSteps);
  }
  
  // Show the current step and hide the others
  function showCurrentStep() {
    $("#form > div").hide();
    $("#step" + currentStep).show();
  }

  // Add change event handlers for radio inputs
  $("#form input[type='radio']").change(function() {
    // If the radio button is checked
    if ($(this).is(":checked")) {
      // Move to the next step
      nextStep();
      canProceed();
    }
  });

  // Check if the user has made a choice before proceeding to the next step
  function canProceed() {
    // Always allow the user to proceed to the next step
    var canMove = true;

    // Enable/disable the next button based on whether the user can proceed
    $(".nextButton").prop("disabled", !canMove);
  
    // Enable/disable the submit button based on whether the user can proceed
    $("#submitButton").prop("disabled", !canMove);
  
    return canMove;
  }

  // Move to the next step
  function nextStep() {
    if (canProceed()) {
      currentStep++;
      showCurrentStep();
      updateProgressBar();

      // Enable/disable the back button based on the current step
      $(".backButton").prop("disabled", currentStep === 1);

      // Enable/disable the submit button based on the current step
      $("#submitButton").prop("disabled", currentStep < desiredStepNumber);
    }
  }

  // Move to the previous step
  function prevStep() {
    currentStep--;
    showCurrentStep();
    updateProgressBar();

    // Enable/disable the back button based on the current step
    $(".backButton").prop("disabled", currentStep === 1);

    // Enable/disable the submit button based on the current step
    $("#submitButton").prop("disabled", currentStep < desiredStepNumber);

    // Check if the user can proceed to the next step
    canProceed();
  }

  // Show the first step and hide the others
  showCurrentStep();

  // Check if the user can proceed to the next step on page load
  canProceed();

  // Disable the back button on the first step
  $(".backButton").prop("disabled", true);

  // Add click event handlers for the next and back buttons
  $(".nextButton").click(nextStep);
  $(".backButton").click(prevStep);

  // Add change event handlers for input elements
  $("#form input[type='radio'], #form input[type='checkbox']").change(canProceed);

});
