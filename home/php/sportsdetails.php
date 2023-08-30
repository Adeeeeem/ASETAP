<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$sport = $_POST["sport"];

	// To protect MySQL injection
	$sport = stripslashes($sport);
	$sport = mysqli_real_escape_string($connection,$sport);

	// Get Current Empolyee Sport DATA
	$request = "SELECT * FROM sport WHERE id_sport='".$sport."' OR UPPER(name_sport) LIKE UPPER('%".$sport."%') LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) > 0) // Found DATA
	{
		$row = mysqli_fetch_array($result);

		// Return Array DATA as Json Format
		echo json_encode($row);
	}
	else // DATA Not Found
	{
		$row = array();
		$row["statut"] = "Rbd7ca7tsx";
		echo json_encode($row);
	}

	mysqli_close($connection);
?>