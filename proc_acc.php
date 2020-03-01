<?php
/*
header('Content-type: application/json');
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "weather_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$request_payload = file_get_contents('php://input');*/
foreach ($_POST as $post_var) {
    echo strtoupper($post_var) . "<br>";
}
//$sql = "INSERT INTO User(username,password) Valuse($"
?>