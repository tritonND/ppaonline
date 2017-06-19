/**
 * Created by UTOPIA SOFTWARE on 24/03/2017.
 */

$(document).ready(function(){
    // initialise submission modal
    $('#submission-completed-modal').modal({show: false});

    // initialise bootstrap form validator for contractor basic information
    $('#register-contractors-consultants-form').validator({
        custom: {
            filesize: function($element) {

                // check that this is file input element
                if($element.is('#company-owner-photo')){
                    // check the file size
                    if($element.get(0).files[0] && ($element.get(0).files[0].size > (512 * 1024))){ // file must not be greater than 512kb
                        // set the written content for the preview box
                        $('#company-owner-photo-preview').html("photo must not be larger than 512KB. File type must be .jpg");
                        // clear background image
                        $('#company-owner-photo-preview').css("background-image", "none");
                        return "image file too large";
                    }
                    // check file type
                    if(! $element.val().endsWith(".jpg") &&
                        ! $element.val().endsWith(".jpge")){
                        // set the written content for the preview box
                        $('#company-owner-photo-preview').html("photo must not be larger than 512KB. File type must be .jpg");
                        // clear background image
                        $('#company-owner-photo-preview').css("background-image", "none");
                        return "wrong file format";
                    }

                    if($element.get(0).files[0] && ($element.get(0).files[0].size <= (512 * 1024))){ // since file is <= 512kb
                        photoPreview($element.get(0).files[0], $('#company-owner-photo-preview')); // preview the image
                    }
                }

            }
        }
    });

    // initialise bootstrap form validator for contractor uploaded documents
    $('#register-contractors-consultants-upload-documents-form').validator({
        custom: {
            imagefilesize: function($element) {

                // check that this is file input element for single image
                if($element.is('[type="file"]') && $element.attr("accept").indexOf("jpg") >= 0){
                    // check the file size
                    if($element.get(0).files[0] && ($element.get(0).files[0].size > (512 * 1024))){ // file must not be greater than 512kb
                        // set the written content for the preview box
                        $('#' + $element.attr("data-preview-block")).html($element.data("imagefilesize"));
                        // clear background image
                        $('#' + $element.attr("data-preview-block")).css("background-image", "none");
                        return "image file too large";
                    }

                    // check file type
                    if(! $element.val().endsWith(".jpg") &&
                        ! $element.val().endsWith(".jpge")){
                        // set the written content for the preview box
                        $('#' + $element.attr("data-preview-block")).html($element.data("imagefilesize"));
                        // clear background image
                        $('#' + $element.attr("data-preview-block")).css("background-image", "none");
                        return "wrong file format";
                    }

                    if($element.get(0).files[0] && ($element.get(0).files[0].size <= (512 * 1024))){ // since file <= 512kb
                        photoPreview($element.get(0).files[0], $('#' + $element.attr("data-preview-block"))); // preview the image
                    }

                }

            },

            pdffilesize: function($element) {

                // check that this is file input element for single pdf
                if($element.is('[type="file"]') && $element.attr("accept").indexOf("pdf") >= 0){
                    // check the file size
                    if($element.get(0).files[0] && ($element.get(0).files[0].size > (2 * 1024 * 1024))){ // file must not be greater than 2mb
                        // set the written content for the preview box
                        $('#' + $element.attr("data-preview-block")).html($element.data("pdffilesize"));
                        // clear background image
                        $('#' + $element.attr("data-preview-block")).css("background-image", "none");
                        return "pdf file too large";
                    }

                    // check file type
                    if(! $element.val().endsWith(".pdf")){
                        // set the written content for the preview box
                        $('#' + $element.attr("data-preview-block")).html($element.data("imagefilesize"));
                        // clear background image
                        $('#' + $element.attr("data-preview-block")).css("background-image", "none");
                        return "wrong file format";
                    }

                    if($element.get(0).files[0] && ($element.get(0).files[0].size <= (2 * 1024 * 1024))){ // since file <= 2mb
                        pdfPreview($('#' + $element.attr("data-preview-block"))); // preview the pdf doc
                    }

                }

            }
        }
    });

    // initialise bootstrap form validator for attestation-payment section
    $('#attestation-form').validator();

    // listen for form submission for the basic information form
    $('#register-contractors-consultants-form').on("submit", function(submitEvent){

        // form was successfully validated
        if(! submitEvent.isDefaultPrevented()) {
            // prevent the form from submitting automatically
            submitEvent.preventDefault();
            // move to the next screen/section
            moveScreenForward($('#basic-information-container'), $('#upload-documents-container'));
        }
    });

    // listen for form submission for the upload documents form
    $('#register-contractors-consultants-upload-documents-form').on("submit", function(submitEvent){

        // form was successfully validated
        if(! submitEvent.isDefaultPrevented()) {
            // prevent the form from submitting automatically
            submitEvent.preventDefault();
            // move to the next screen/section
            moveScreenForward($('#upload-documents-container'), $('#attestation-payment-container'));
        }
    });

    // listen for form attestation form
    $('#attestation-form').on("submit", function(submitEvent){

        // form was successfully validated
        if(! submitEvent.isDefaultPrevented()) {
            // prevent the form from submitting automatically
            submitEvent.preventDefault();
            // call payment dialog
            makePayment();
            // the submission workflow continues in the payment block
        }
    });

    // listen for when the email field is successfully validated on the basic information form
    $('#register-contractors-consultants-form').on("validated.bs.validator invalid.bs.validator valid.bs.validator", function(validEvent){
        if($(validEvent.relatedTarget).is('#company-email')){ // ensure that this is the company email field
            switch(validEvent.type){ // check what type of event was triggered
                case "invalid":
                    $(validEvent.relatedTarget).get(0).app_isValid = false; // flag that the email input is NOT valid
                    break;

                case "valid":
                    $(validEvent.relatedTarget).get(0).app_isValid = true; // flag that the email input is valid
                    break;

                case "validated":
                    // check if the flag marks the email input as valid
                    if($(validEvent.relatedTarget).get(0).app_isValid === true) { // email input is valid
                        // assign the provided company email to the hidden fields
                        $('#hidden-company-email-1').val($(validEvent.relatedTarget).val());
                        $('#hidden-company-email-2').val($(validEvent.relatedTarget).val());
                    }
                    else{ // reset the hidden field to empty value
                        $('#hidden-company-email-1').val("");
                        $('#hidden-company-email-2').val("");
                    }
                    break;
            }
        }
    });
});

/**
 * function is used to preview the image
 * @param fileObj
 * @param elemContainer
 */
function photoPreview(fileObj, elemContainer){
    // create a file read object
    var reader = new FileReader();

    // listen for when the image file is loaded
    reader.onload = function (event) {

        // create written content in the preview box
        $(elemContainer).html("");
        $(elemContainer).css("background-image", "url(" + event.target.result + ")"); // set the back image to the image url

    };

    // read the data from the image file
    reader.readAsDataURL(fileObj);
}

/**
 * function is used to provide thumbnail of pdf document
 *
 * @param elemContainer
 */
function pdfPreview(elemContainer){

    // create written content in the preview box
    $(elemContainer).html("");
    $(elemContainer).css("background-image", "url(images/pdf-file.png)"); // set the back image to the image url
}


/**
 * function is used to move the contractor & consultants registration process forward
 * @param currentScreen
 * @param nextScreen
 */
function moveScreenForward(currentScreen, nextScreen){
    // create the Promise object that will be returned

    return new Promise(function(resolve, reject){
        // slide out the previous screen
        Promise.resolve(kendo.fx($(currentScreen)).slideIn("right").add(kendo.fx($(currentScreen)).fadeIn()).duration(500).reverse()).
        then(function(){
            $(currentScreen).css("display", "none"); // hide the current screen
            $(nextScreen).css("display", "block"); // display the next screen
            $(window).scrollTop(0); // screen window to the top
            kendo.fx($(nextScreen)).slideIn("left").add(kendo.fx($(currentScreen)).fadeIn()).duration(500).play();
            resolve(); // resolve the returned promise object
        });
    });
}



/**
 * function is used to move the contractor & consultants registration process backward
 * @param currentScreen
 * @param nextScreen
 */
function moveScreenBackward(currentScreen, nextScreen){
    // create the Promise object that will be returned

    return new Promise(function(resolve, reject){
        // slide out the previous screen
        Promise.resolve(kendo.fx($(currentScreen)).slideIn("left").add(kendo.fx($(currentScreen)).fadeIn()).duration(500).reverse()).
        then(function(){
            $(currentScreen).css("display", "none"); // hide the current screen
            $(nextScreen).css("display", "block"); // display the next screen
            $(window).scrollTop(0); // screen window to the top
            kendo.fx($(nextScreen)).slideIn("right").add(kendo.fx($(currentScreen)).fadeIn()).duration(500).play();
            resolve(); // resolve the returned promise object
        });
    });
}

function makePayment(){
    var handler = PaystackPop.setup({
        key: 'pk_test_bb38bb42837268ab602ee41b1116c785e9a76aea',
        email: $('#hidden-company-email-2').val(),
        amount: 20000 * 100, // convert naira amount to kobo
        ref: new Random(Random.engines.nativeMath).uuid4(),
        metadata: {
            custom_fields: [
                {
                    display_name: "Email",
                    variable_name: "email",
                    value: $('#hidden-company-email-2').val()
                }
            ]
        },
        callback: function(response){
            // complete document submission
            completeSubmissionOfDocuments();
        },
        onClose: function(){
            swal({
                title: "No Payment",
                text: "Registration cannot be completed without a successful payment",
                type: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#FF0000",
                closeOnConfirm: true
            });
        }
    });
    handler.openIframe();
}


function completeSubmissionOfDocuments(){

    // display the app-loader
    $('#attestation-payment-container .app-loader').css("display", "block");
    $('#attestation-payment-container .app-loader-message').html("<div>Step 1 of 2</div><div>Uploading Basic Information...</div>" +
        "<div>PLEASE DO NOT CLOSE BROWSER</div>");
    // submit form data
    Promise.resolve($.ajax({
        url: "register-contractors-consultants.html", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: new FormData($('#register-contractors-consultants-form').get(0)), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        dataType:"text",
        timeout: 300000,
        cache: false,             // To unable request pages to be cached
        processData: false
    })).
    then(function(){
        // display the app-loader
        $('#attestation-payment-container .app-loader').css("display", "block");
        $('#attestation-payment-container .app-loader-message').html("<div>Step 2 of 2</div><div>Uploading Company Documents...</div>" +
            "<div>PLEASE DO NOT CLOSE BROWSER</div>");
        // submit form data
        return Promise.resolve($.ajax({
            url: "register-contractors-consultants.html", // Url to which the request is send
            type: "POST",             // Type of request to be send, called as method
            data: new FormData($('#register-contractors-consultants-upload-documents-form').get(0)), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            dataType:"text",
            timeout: 300000,
            cache: false,             // To unable request pages to be cached
            processData: false
        }));
    }).
    then(function(){
        // append update email address to submission complete modal
        $('#submission-completed-modal-email').html($('#hidden-company-email-2').val());
        // hide the app-loader
        $('#attestation-payment-container .app-loader').css("display", "none");
        // show the submission complete modal
        $('#submission-completed-modal').modal("show");
    }).
    catch(function(){
        swal({
            title: "Registration Failed",
            text: 'Your registration process failed. <br>Please click on the button below to retry ' +
            'submission WITHOUT repeating payment',
            type: "error",
            html: true,
            showCancelButton: false,
            confirmButtonText: "Retry Submission",
            confirmButtonColor: "#808080",
            closeOnConfirm: false
        }, function(){
            completeSubmissionOfDocuments();
        });
    });
}