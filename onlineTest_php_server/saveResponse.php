<?php

require("dbConnection.php");
session_start();
function getStudentResponse(){
	if(!empty($_POST)){
		return $_POST;
	}
	else 
		return null;
}

$student_id = session_id();
$student_response = getStudentResponse();
$query = updateResponse($student_id,$student_response);
if($query){
	echo "Successfully Updated.";
}
else{
	"Failed to Update";
}
session_destroy();