<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$matricule = $_POST["matricule"];
	$type = $_POST["type"];

	// UPDATE Role to User
	$request = "UPDATE user SET type_user='".$type."' WHERE matricule_user='".$matricule."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_affected_rows($connection)) // Updated Role for User
	{
		echo "AtTNzHrs3P";
	}
	else // There was an error
	{
		echo "Apzr9JvY4M"; // Error
	}

	mysqli_close($connection);
?>