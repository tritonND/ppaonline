<?php
require_once("dbconnect.php");
//get parameters sent
//session_start();
//$email=$_SESSION['username'];

//copy files to folder
$pic_name=$_FILES["pics"]["name"];
$pic_type=$_FILES["pics"]["type"];
$pic_temp=$_FILES["pics"]["tmp_name"];


$pic_name2=$_FILES["pics2"]["name"];
$pic_type2=$_FILES["pics2"]["type"];
$pic_temp2=$_FILES["pics2"]["tmp_name"];


$pic_name3=$_FILES["pics3"]["name"];
$pic_type3=$_FILES["pics3"]["type"];
$pic_temp3=$_FILES["pics3"]["tmp_name"];


//echo $pic_name;
//echo "for profile pic";


if($pic_name=="" || $pic_name2=="" || $pic_name3=="")//dont upload since no new profile image is found
{

}
else{

    if (file_exists("pictures/" . $_FILES["pics"]["name"]))
    {
        $randomnum=rand();
        move_uploaded_file($_FILES["pics"]["tmp_name"],"pictures/R" .$randomnum. $_FILES["pics"]["name"]);
        $prop_pic=mysqli_real_escape_string($con, "pictures/R".$randomnum.$pic_name);
    }
    else
    {
        $prop_pic=mysqli_real_escape_string($con, "pictures/".$pic_name);
        move_uploaded_file($_FILES["pics"]["tmp_name"],"pictures/" . $_FILES["pics"]["name"]);

    }


    $result=mysqli_query($con, "update schooldetails set PROFILEPIC='$prop_pic' where EMAIL='$email'");
    $rowcount=mysqli_affected_rows($con);
    if($rowcount>0)
    {
        echo "successful";
    }
}



?>