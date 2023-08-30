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

	if (isset($year) && !empty($year))
	{
		$request = "SELECT * FROM budget WHERE id_sport='".$sport."' AND year='".$year."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 0) // Found DATA
		{
			$request = "INSERT INTO budget (id_sport, year) VALUES ('".$sport."','".$year."')";
			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection)) // Inserted With Succeess
			{
				echo "KtTNzHrs3P";
			}
		}
		else
		{
			echo "Sbd7ca7tsx"; // Error
		}
	}
	else // There was an error
	{
		echo "Rbd7ca7tsx"; // Error
	}


	mysqli_close($connection);
?>