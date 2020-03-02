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
$in_db = "SELECT * FROM Users WHERE username='$uname' and password='$pass';";
$sql = "INSERT INTO Users(username,password) values('$uname','$pass');";
$result_in_db = $conn->query($in_db);
if ($result_in_db->num_rows>0){
    echo "User already exist";
}else{
    $conn->query($sql);
    echo "Succesfully registered $uname";
}

$conn->close
?>