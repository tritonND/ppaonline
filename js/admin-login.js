/**
 * Created by UTOPIA SOFTWARE on 06/06/2017.
 */

$(document).ready(function(){

    // initialise bootstrap form validator for admin login form
    $('#admin-login-form').validator();

    // listen for admin login form submission
    $('#admin-login-form').on("submit", function(submitEvent){
        // form was successfully validated
        if(! submitEvent.isDefaultPrevented()) {
            // prevent the form from submitting automatically
            submitEvent.preventDefault();
            // display the app-loader
            $('.app-loader').css("display", "block");
            $('.app-loader-message').html("<div>Signing In...</div><div>Please wait</div>");
        }
    });
});

