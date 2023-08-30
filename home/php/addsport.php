<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$user = $_POST["user"];
	$sport = $_POST["sport"];
	$period = $_POST["period"];
	$start = $_POST["start"];
	$end = $_POST["end"];
	$price = $_POST["price"];

	// Check if Member Exists
	$request = "SELECT * FROM ".$user." WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Member Exists
	{
		// Get If Empolyee Already Registered Sport or the time he choose is still filled with an other sport
		$request = "SELECT * FROM training WHERE BINARY login='".$_SESSION['LY9nJ4FfxK']."' AND type='".$user."' AND ((training.period_start <= '".$start."' AND training.period_end >= '".$start."') OR (training.period_start <= '".$end."' AND training.period_end >= '".$end."')) AND suspended='0' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // Already Registered to a Gym at that time
		{
			echo "FRLr9kTFyM";
		}
		else
		{
			$request = "INSERT INTO training (login,type,id_sport,period,period_start,period_end,price) VALUES ('".$_SESSION['LY9nJ4FfxK']."','".$user."','".$sport."','".$period."','".$start."','".$end."','".$price."')";
			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection)) // Sport Added Successfully
			{
				$request = "UPDATE training NATURAL JOIN sport SET training.price = training.price * sport.price_sport WHERE BINARY login='".$_SESSION['LY9nJ4FfxK']."' AND type='".$user."' AND ((training.period_start <= '".$start."' AND training.period_end >= '".$start."') OR (training.period_start <= '".$end."' AND training.period_end >= '".$end."')) AND suspended='0'";
				$result = mysqli_query($connection,$request);

				if (mysqli_affected_rows($connection)) // Updated Prices for User
				{
					echo "AtTNzHrs3P";
				}
				else // There was an error
				{
					echo "Apzr9JvY4M"; // Error
				}
			}
			else // There was an error adding the user
			{
				echo "Epzr9JvY4M"; // Error Adding Sport
			}
		}
	}
	else // Member Doesn't Exists, Needs to be added First
	{
		echo "HhCm7rshxx"; // Member Doesn't Exists, Need to be Added First
	}

	mysqli_close($connection);
?>