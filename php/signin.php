<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "weather_db";

$conn = new mysqli($servername,$username,$password,$dbname);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}
$uname = $_POST['username'];
$pass = $_POST['password'];
$sql = "SELECT * FROM Users WHERE username='$uname' and password='$pass';";
$result = $conn->query($sql);
if ($result->num_rows>0){ 
    $clear_cur_user = "TRUNCATE TABLE cur_user;";
    #=====These line will put assign the signed in user as the current user
    $cur_user = "INSERT INTO cur_user values('$uname','$pass');";
    $conn->query($clear_cur_user);
    $conn->query($cur_user);
    #======================================================================
    echo "YES";
}else{
    echo $uname . $pass;
}