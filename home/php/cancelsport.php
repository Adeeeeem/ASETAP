<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$user = $_POST["user"];
	$suspended = $_POST["suspended"];

	// Set Suspended to yes and set Suspended Date which is today to end of current sport period time
	$request = "UPDATE training SET training.period_end='".$suspended."', suspended='1' WHERE BINARY login='".$_SESSION['LY9nJ4FfxK']."' AND type='".$user."' AND training.period_start <= '".$suspended."' AND training.period_end >= '".$suspended."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_affected_rows($connection)) // Sport Updated Successfully
	{
		echo "AtTNzHrs3P";
	}
	else // There was an error Updating
	{
		echo "Epzr9JvY4M"; // Error Updating
	}

	mysqli_close($connection);
?>