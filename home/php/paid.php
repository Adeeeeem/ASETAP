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
	$start = $_POST["start"];
	$end = $_POST["end"];

	// Mark Member as Paid
	$request = "UPDATE training INNER JOIN user ON training.login = user.login_user SET paid = 'Y' WHERE training.type ='".$type."' AND matricule_user = '".$matricule."' AND training.period_start = '".$start."' AND training.period_end = '".$end."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_affected_rows($connection)) // Updated Successfully
	{
		echo "AtTNzHrs3P";
	}
	else // There was an error
	{
		echo "Apzr9JvY4M"; // Error
	}

	mysqli_close($connection);
?>