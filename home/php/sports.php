<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$tag = $_POST["tag"];

	// Get Current Empolyee Sport DATA
	$request = "SELECT * FROM sport WHERE tag_sport='".$tag."' ORDER BY name_sport";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) > 0) // Found DATA
	{
		$row = array();

		while ($i = mysqli_fetch_array($result))
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