 var assessmentresponse;
function createUsers()
{
    //$('#createusersreponsemessage').html("Error! Blanks spaces");
//alert("hello");
        var username=$('#username').val();
        var firstname=$('#firstname').val();
        var othernames=$('#othernames').val();
        var password=$('#password1').val();
        var password2=$('#password2').val();
        
    var usertype=$('#usertype').val();
 var dept="";
        //get coditional variable dept
        if(usertype=="Dirctor")
        {
             dept=$('#dept').val();
        }
        if(usertype=="HOU")
        {
             dept=$('#unit').val();
        }
        if(usertype=="Team Lead")
        {
             dept=$('#team').val();
        }
        
        
        if(username==""||firstname==""||othernames==""||password==""||usertype=="select")
        {
            $('#createusersreponsemessage').html("Error! Blanks spaces");
            
        }
        else if(password!==password2)
        {
        $('#createusersreponsemessage').html("Error! Passwords mismatch.");
        }
        else{
        
        var x = $.ajax(
            {
                url: "php/adduser.php",
                type: "post",
                dataType: "text",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: "username="+encodeURIComponent(username)+"&firstname="+encodeURIComponent(firstname)+"&othernames="+
                            encodeURIComponent(othernames)+"&password="+encodeURIComponent(password)+"&usertype="+
                            encodeURIComponent(usertype)+"&dept="+encodeURIComponent(dept)
            }
        );

        x.done(function(serverResponse){

            if(serverResponse.trim()=="successful")
            {
           
                $('#createusersform').get(0).reset();
               $('#createusersreponsemessage').html("User Created!")
               $('#userstable').html(serverResponse.trim());
               //$('.ben').bootstrapSwitch();//initialise toogle switch bootstrap plugin

            }
            else{
                $('#createusersreponsemessage').html(serverResponse.trim());
            }

        });

        x.fail(function(serverResponse)
        {
            $('#createusersreponsemessage').html("Server error. Please try again");

        });

        x.always(function(){
           
        });
        }
            
        }
    
    //login users from dashboard
    function login()
{
   
        var username=$('#username').val();
        var password=$('#password').val();
        
        
        if(username==""||password=="")
        {
            $('#loginresponse').html("Error! Username or password cannot be empty");
            
        }
      
        else{
        
        var x = $.ajax(
            {
                url: "php/login.php",
                type: "post",
                dataType: "text",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: "username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)
            }
        );

        x.done(function(serverResponse){

            if(serverResponse.trim()=="successful")
            {
                //location.href = "/Surebettingtips.php";
                location.href = "dashboard.php";
           
            }
            else{
                $('#loginresponse').html(serverResponse.trim());
            }

        });

        x.fail(function(serverResponse)
        {
            $('#createusersreponsemessage').html("Server error. Please try again");

        });

        x.always(function(){
           
        });
        }
            
        }
    
//
    //function for editing users
    function editUser()
{
 
        var username=$('#editusername').val();
        var usertype=$('#editusertype').val();
        
 var dept="";
        //get coditional variable dept
        if(usertype=="Director")
        {
             dept=$('#editdept').val();
        }
        if(usertype=="HOU")
        {
             dept=$('#editunit').val();
        }
        if(usertype=="Team Lead")
        {
             dept=$('#editteam').val();
        }
        
        if(username==""||usertype=="select"||dept=="select")
        {
            $('#editusersresponse').html("Error! Blanks spaces");
            
        }
        
        else{
        
        var x = $.ajax(
            {
                url: "php/edituser.php",
                type: "post",
                dataType: "text",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: "username="+encodeURIComponent(username)+"&usertype="+
                            encodeURIComponent(usertype)+"&dept="+encodeURIComponent(dept)
            }
        );

        x.done(function(serverResponse){
        $("#myModal").modal("hide");
         
         $('#deleteusers_message').html("User Edited");
               
        $('#deleteuserstable').html(serverResponse.trim());
               

        });

        x.fail(function(serverResponse)
        {
            $('#editusersresponse').html("Server error. Please try again");

        });

        x.always(function(){
            
        });
        }
            
        }
    
//    ************
    
    function resetPassword()
    {
        var oldpassword=$('#oldpassword').val();
        var newpassword1=$('#newpassword').val();
        var newpassword2=$('#newpassword2').val();
        
        if(oldpassword==""||newpassword1==""||newpassword2=="")
        {
            $('#passwordresetmessage').html("Error! Empty  spaces");
        }
        else if(newpassword1!==newpassword2)
        {
         $('#passwordresetmessage').html("Error! Password mismatch.");
        }
        else if(newpassword1.length<8)
        {
            $('#passwordresetmessage').html("Error! Password is too short.");
        }
        else if (newpassword1.indexOf(' ') >= 0)
        {
            $('#passwordresetmessage').html("Error! Password contains empty spaces");
            
        }
        else{
            
        
        var x=$.ajax({
      type: "POST",
      url: 'php/changepassword.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: "newpassword=" + encodeURIComponent(newpassword1)+"&oldpassword=" + encodeURIComponent(oldpassword),
      dataType: "text"
     });
     
     x.done(function(serverResponse)
     {
         var servervalue=serverResponse.trim();
         $('#passwordresetmessage').html(servervalue);
        
     });
     
      x.fail(function(){
         $('#passwordresetmessage').html("Server Error. Please try again");
     });
     
     x.always(function(){
         //$('#reassessed_message').html("");
     });
 }
    }
    
    //delete users button clicked on the modal
$(document).ready(function deleteusers() {
 $(document).on("click", "#delete-user", function(){
     var username=document.getElementById('editusername').value;
  
  swal({
  title: "Are you sure?",
  text: "User's account will be deleted",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, Go ahead!",
  closeOnConfirm: true
},
function(){
      
	var username=document.getElementById('editusername').value;
        
      var x=$.ajax({
      type: "POST",
      url: 'php/delete.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: "username=" + encodeURIComponent(username),
	  dataType: "text"
     });
     
     x.done(function(serverResponse)
     {
         $("#myModal").modal("hide");
         
         $('#deleteusers_message').html("User Deleted");
         $('#deleteuserstable').html(serverResponse.trim());
         
     });
     
      x.fail(function(){
         alert("Server Error. Please try again");
     });
     
     x.always(function(){
         $('#messagespan').html("");
     });
  });
  
              
  return false;
});	
});



// displays modal window to edit registered users
$(document).ready(function(){
    $(document).on("click", ".myBtn", function(){
        var span = $(this);
        $("#changepasswordform #editusername").val(span.data("username2"));
        $("#myModal").modal("show");
    });
});

    

//this function is used to display report modal on click of a particular property 
$(document).ready(function(){
    //clear the tables first
  
    $(document).on("click", ".reportpropid", function()
    {
        $('#reporttable1 tbody').html("");
    $('#reporttable2 tbody').html("");
    
    var span = $(this);
        var propid=span.data("propid");
        $('#reportsmodalheader').html(propid);
        
        var x=$.ajax({
      type: "POST",
      url: 'php/getreports.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: "propid=" + encodeURIComponent(propid),
      dataType: "text"
     });
     
     x.done(function(serverResponse)
     {
             response=$.parseJSON(serverResponse.trim());
             
             for(index = 0; index < response.length; index++) 
             {
    $('#reporttable1').append("<tr><td>"+response[index].PaymentDate + "</td><td>"+response[index].AmountPaid + "</td></tr>");
            } 
           
           //$("#reportsmodal").modal("show");
     });
     
      x.fail(function(){
         alert("Server Error. Please try again");
     });
     
     x.always(function(){
         //$('#reassessed_message').html("");
     });
       
       //now trigger second report 
       
           var y=$.ajax({
      type: "POST",
      url: 'php/getreports2.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: "propid=" + encodeURIComponent(propid),
      dataType: "text"
     });
     
     y.done(function(serverResponse2)
     {
             response2=$.parseJSON(serverResponse2.trim());
             
             $('#thisyearlandcharge').html(response2[0]);
             
             $('#Paymentmadethisyear').html(response2[2]);
             $('#outstandingbalance').html(response2[1]);
             
             //previously using table to display landusecomp details per property
//             for(index2 = 0; index2 < response2.length; index2++) 
//             {
//    $('#reporttable2').append("<tr><td>"+response2[index2].ChargeYear + "</td><td>"+response2[index2].LandCharge + "</td><td>"+response2[index2].Amount_Paid + "</td><td>"+response2[index2].Balance + "</td><td>"+response2[index2].Status + "</td></tr>");
//            } 
           
         
     });
     
      y.fail(function(){
         alert("Server Error. Please try again");
     });
     
     y.always(function(){
         //$('#reassessed_message').html("");
     });
       
       
     //now trigger third report 
       
           var z=$.ajax({
      type: "POST",
      url: 'php/getreports3.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: "propid=" + encodeURIComponent(propid),
      dataType: "text"
     });
     
     z.done(function(serverResponse3)
     {
             response3=$.parseJSON(serverResponse3.trim());
        $('#addressinfo').html(response3[0].PropAddress);
            $('#firstinfo').html("<b>Property Occupier: </b>"+response3[0].PropOccupier);
             $('#secondinfo').html("<b>Property registered:</b> "+response3[0].PropEnrollDate);
             $('#thirdinfo').html("<b>Property Owner:</b> "+response3[0].PropOwner);
            
            document.getElementById("propertyimage").src =response3[0].PropPic1;

           //
           //you can now show the modal report
           $("#reportsmodal").modal("show");
     });
     
      z.fail(function(){
         alert("Server Error. Please try again");
     });
     
     z.always(function(){
         //$('#reassessed_message').html("");
     });
    
        
    });
    
    });
//function for printing
function printPropertyRevenueReport() 
{
     w=window.open();
w.document.write($('#printablereports2').html());
w.print();
w.close();
}
function printPropertyReport() 
{
     w=window.open();
w.document.write($('#printablereports1').html());
w.print();
w.close();
}

  function logout()
    {
        swal({
  title: "Log Out?",
  text: "Are you sure you really want to log out!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes,Log Me Out!",
  cancelButtonText: "No, Sorry!",
  closeOnConfirm: false,
  closeOnCancel: true
},
function(isConfirm){
  if (isConfirm) 
  {
    var xy=$.ajax({
      type: "POST",
      url: 'php/logout.php',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: false,
      dataType: "text"
     });
     
     xy.done(function(serverResponse)
     {
          
          location.href = "/LandUsePortal/index.html";
             
     });
     
      xy.fail(function(){
         //$('#notices_message').html("Server Error. Please try again");
     });
     
     xy.always(function(){
         
     });
  } else 
  {
	   // log out cancelled
  }
});
    }
    
    //codes to run when usertype is selected in users.php
    $(document).on("change", "#usertype", function(event)
    {
        var selectoption=$('#usertype').val();
        if(selectoption=="select")
        {
            
        }
        else if(selectoption=="Director")
        {
            $('#deptdiv').show(500);
            $('#unitdiv').hide();
            $('#teamdiv').hide();
        }
        else if(selectoption=="HOU")
        {
             $('#deptdiv').hide();
            $('#unitdiv').show(500);
            $('#teamdiv').hide();
        }
        
        else if(selectoption=="Team Lead")
        {
             $('#deptdiv').hide();
            $('#unitdiv').hide();
            $('#teamdiv').show(500);
        
        }
        else{
             $('#deptdiv').hide();
            $('#unitdiv').hide();
            $('#teamdiv').hide();
        }
            
            
         
    });
   
   //codes to run when usertype is selected in edit users modal
     $(document).on("change", "#editusertype", function(event)
    {
        var selectoption=$('#editusertype').val();
        if(selectoption=="select")
        {
            
        }
        else if(selectoption=="Director")
        {
            $('#editdeptdiv').show(500);
            $('#editunitdiv').hide();
            $('#editteamdiv').hide();
        }
        else if(selectoption=="HOU")
        {
             $('#editdeptdiv').hide();
            $('#editunitdiv').show(500);
            $('#editteamdiv').hide();
        }
        
        else if(selectoption=="Team Lead")
        {
             $('#editdeptdiv').hide();
            $('#editunitdiv').hide();
            $('#editteamdiv').show(500);
        
        }
        else{
             $('#editdeptdiv').hide();
            $('#editunitdiv').hide();
            $('#editteamdiv').hide();
        }
            
            
         
    });