<?php
$servername = "henkla.se.mysql";
$username = "henkla_se";
$password = "7837hl";
$dbname = "henkla_se";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

?>
