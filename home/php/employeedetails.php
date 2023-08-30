<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$matricule = $_POST["matricule"];

	// Get Current Empolyee Sport DATA
	$request = "SELECT user.fname_user AS user_first_name, user.lname_user AS user_last_name FROM user WHERE matricule_user='".$matricule."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Found DATA
	{
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