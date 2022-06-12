<?php

$Template = file_get_contents("./email-template.html");
$errorMSG = "";

if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

if (empty($_POST["phone"])) {
    $errorMSG = "Phone is required ";
} else {
    $phone = $_POST["phone"];
}

$variables = array();
$variables['title'] = "New Registration Details";
$variables['name'] = "Name: ".$name;
$variables['contact'] = "Contact: ".$phone;
$variables['email'] = $_POST["email"] != "" ? "Email: ".$_POST["email"] : "Email: Not Available";
$variables['date'] = "Registration Date: ".date("d-m-Y");

foreach($variables as $key => $value)
{
    $Template = str_replace('{{ '.$key.' }}', $value, $Template);
}

$EmailTo = "admin@braceacademy.in,marketing@braceacademy.in";
$Subject = "New registration for Brace Education Academy";


$Headers  = "From:admin@braceacademy.in";
// $Headers .= "Cc: marketing@braceacademy.in";
$Headers .= "MIME-Version: 1.0\r\n";
$Headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// send email
$success = mail($EmailTo, $Subject, $Template, $Headers);
// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>