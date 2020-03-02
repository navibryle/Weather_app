<?php
header('Content-type: application/json');
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "weather_db";
$conn = new mysqli($servername,$username,$password,$dbname);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}
//this php script will return cur_user  in for of json
$sql = "SELECT * FROM cur_user;";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$uname = $row['username'];
$pass = $row['password'];
$JSON_array = array('username'=>$uname,'password'=>$pass);
echo json_encode($JSON_array);
