<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$user = $_POST["user"];

	// Get Empolyee DATA
	$request = "SELECT gender_".$user." AS gender FROM ".$user." WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Found DATA
	{
		// Fetch DATA into  Array
		$row = mysqli_fetch_array($result);
		$row["statut"] = "Tk3BnS79sE";

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