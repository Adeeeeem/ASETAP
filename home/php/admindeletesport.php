<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$id = $_POST["id"];

	$request = "DELETE FROM sport WHERE id_sport=".$id;
	$result = mysqli_query($connection,$request);

	if (mysqli_affected_rows($connection)) // Sport Added Successfully
	{
		echo "AtTNzHrs3P";
	}
	else
	{
		echo "HhCm7rshxx";
	}

	mysqli_close($connection);
?>