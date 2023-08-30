<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$user = $_POST["user"];

	// Get All Members Accorrding to Type
	$request = "SELECT matricule_user AS matricule, fname_user AS user_fname, lname_user AS user_lname, type_user AS user_type, fname_spouse AS spouse_fname, lname_spouse AS spouse_lname, fname_kid1 AS kid1_fname, lname_kid1 AS kid1_lname, fname_kid2 AS kid2_fname, lname_kid2 AS kid2_lname FROM user LEFT JOIN spouse USING(login_user) LEFT JOIN kid1 USING(login_user) LEFT JOIN kid2 USING(login_user) WHERE type_user='".$user."'";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) > 0) // Found DATA
	{
		$row = array();

		while ($i = mysqli_fetch_array($result)) // Fetch DATA into Array
		{
			$row[] = $i;
		}

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