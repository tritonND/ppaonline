<?php
require_once("dbconnect.php");
//get parameters sent

session_start();
//$emailuser="test@test.com";
$emailuser=$_SESSION['username'];


    $address = mysqli_real_escape_string($con, $_POST['address']);
    $lga=  mysqli_real_escape_string($con,$_POST['lga']);
    $state=  mysqli_real_escape_string($con,$_POST['state']);
    $town=  mysqli_real_escape_string($con,$_POST['town']);

$name = mysqli_real_escape_string($con,$_POST['name1']);
$phone = mysqli_real_escape_string($con,$_POST['phone']);
$website = mysqli_real_escape_string($con,$_POST['website']);
$email = mysqli_real_escape_string($con,$_POST['email']);

$govappr =  mysqli_real_escape_string($con,$_POST['govappr']);
$description =  mysqli_real_escape_string($con,$_POST['description']);
$motto = mysqli_real_escape_string($con,$_POST['motto']);


$firstfolder="gallery/G".$phone;
$eventfolder="gallery/G".$phone."/events";
$proofsfolder="gallery/G".$phone."/proofs";
$postsfolder="gallery/G".$phone."/posts";



$qry = "update schooldetails set NAME='$name', STREET='$address',TOWN='$town',STATE='$state', GALLERY = '$firstfolder', LGA='$lga', PHONE='$phone',WEBSITE='$website', GOVTREG='$govappr', DESCRIPTION='$description', MISSION='$motto' where EMAIL='$emailuser' ";

    $result=mysqli_query($con, $qry) or die("Script not executale");

    $rowcount=mysqli_affected_rows($con);
    if($rowcount>0)
    {
        echo "successful";
    }


    mysqli_query($con,"insert into profile(USERNAME,LEVEL) values ('$email',10)");

//now create folders for galleries using phone number if gallery does not exist yet



    $result=mysqli_query($con,"select * from schooldetails where EMAIL='$email' ");
    $row=  mysqli_fetch_array($result);
    $gallery=$row['GALLERY'];

//echo $gallery . " here gallery";

    if($gallery=='')
    {
        mysqli_query($con,"update schooldetails set GALLERY='$firstfolder' where EMAIL='$email' ");

        if(is_dir($firstfolder))
        {

        }else
        {
            mkdir($firstfolder);
            mkdir($eventfolder);
            mkdir($proofsfolder);
            mkdir($postsfolder);
           // mysqli_query($con,"update schooldetails set GALLERY='$firstfolder' where EMAIL='$email' ");
        }
    }
    else
    {
        //gallery already exist. Even though user changes his/her phone number, ignore
    }

mysqli_close($con);
?>