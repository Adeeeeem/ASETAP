<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Get Empolyee's Family Not Paid Sport DATA
	$request = "SELECT matricule_user AS user_matricule, fname_user AS fname, lname_user AS lname, training.period, training.period_start, training.period_end, training.price, sport.name_sport FROM training INNER JOIN user ON training.login=user.login_user NATURAL JOIN sport WHERE type='user' AND training.paid ='N'";

	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) > 0) // Found DATA
	{
		$row = array();

		while($i = mysqli_fetch_array($result))
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