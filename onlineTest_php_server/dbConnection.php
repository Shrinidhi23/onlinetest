<?php

// Create connection
function getDBConnection(){
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "onlinetest";

	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	return $conn;
}

function updateResponse($student_id,$response){
	$connection = getDBConnection();
	$sql = "INSERT INTO student_response (student_id, response, date)
	VALUES ('$student_id', '$response', NOW())";

	if ($connection->query($sql) === TRUE) {
		return true;
	} else {
		echo "Error: " . $sql . "<br>" . $connection->error;
		$connection->close();
		return false;
	}

}
?>