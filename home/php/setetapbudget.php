<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$sport = $_POST["sport"];
	$year = $_POST["year"];
	$budget = $_POST["budget"];

	$request = "UPDATE budget SET agreed=".$budget.", done='Y' WHERE id_sport='".$sport."' AND year='".$year."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_affected_rows($connection)) // Inserted With Succeess
	{
		echo "KtTNzHrs3P";
	}

	mysqli_close($connection);
?>