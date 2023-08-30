<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Get Empolyee DATA
	$request = "SELECT fname_user AS user_first_name, lname_user AS user_last_name, fname_spouse AS spouse_first_name, lname_spouse AS spouse_last_name, fname_kid1 AS kid1_first_name, lname_kid1 AS kid1_last_name, fname_kid2 AS kid2_first_name, lname_kid2 AS kid2_last_name FROM user LEFT JOIN spouse USING(login_user) LEFT JOIN kid1 USING(login_user) LEFT JOIN kid2 USING(login_user) WHERE BINARY user.login_user='".$_SESSION['LY9nJ4FfxK']."' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Found DATA
	{
		// Fetch DATA into  Array
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