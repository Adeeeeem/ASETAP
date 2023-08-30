<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$type = $_POST["type"];
	$fname = $_POST["fname"];
	$lname = $_POST["lname"];
	$gender = $_POST["gender"];

	// To protect MySQL injection
	$fname = stripslashes($fname);
	$lname = stripslashes($lname);

	$fname = mysqli_real_escape_string($connection,$fname);
	$lname = mysqli_real_escape_string($connection,$lname);

	if ( isset($fname) && !empty($fname) && isset($lname) && !empty($lname) )
	{
		// Get If user Already Added
		$request = "SELECT * FROM ".$type." WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // Family Member Already Exist
		{
			echo "YR4zqKAdwY";
		}
		else
		{
			$request = "INSERT INTO ".$type." VALUES ('".$_SESSION['LY9nJ4FfxK']."','".$fname."','".$lname."','".$gender."')";
			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection)) // Family Member Added Successfully
			{
				echo "Pdee3kCkqv";
			}
			else // There was an error adding the Family Member
			{
				echo "Xa3XFqfzkY"; // Error Adding Family Member
			}
		}
	}
	else // Fields are Empty
	{
		echo "WbFAW7kstJ";
	}

	mysqli_close($connection);
?>