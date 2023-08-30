<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$request = "SELECT proposed, agreed, year, done, name_sport, id_sport FROM budget NATURAL JOIN sport ORDER BY year DESC,done";
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