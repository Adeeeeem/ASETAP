<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	$matricule = $_POST["matricule"];
	$login = $_POST["login"];
	$fname = $_POST["fname"];
	$lname = $_POST["lname"];
	$password = $_POST["password"];
	$gender = $_POST["gender"];
	$email = $_POST["email"];

	// To protect MySQL injection
	$matricule = stripslashes($matricule);
	$login = stripslashes($login);
	$fname = stripslashes($fname);
	$lname = stripslashes($lname);
	$password = stripslashes($password);
	$gender = stripslashes($gender);
	$email = stripslashes($email);

	$matricule = mysqli_real_escape_string($connection,$matricule);
	$login = mysqli_real_escape_string($connection,$login);
	$fname = mysqli_real_escape_string($connection,$fname);
	$lname = mysqli_real_escape_string($connection,$lname);
	$password = mysqli_real_escape_string($connection,$password);
	$gender = mysqli_real_escape_string($connection,$gender);
	$email = mysqli_real_escape_string($connection,$email);

	if ( isset($matricule) && !empty($matricule) && isset($login) && !empty($login) && isset($fname) && !empty($fname) && isset($lname) && !empty($lname) && isset($password) && !empty($password) && isset($gender) && !empty($gender) && isset($email) && !empty($email) )
	{
		// Check if user is an ETAP employee
		$request = "SELECT * FROM etap WHERE BINARY matricule_etap='".$matricule."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User is an ETAP employee
		{
			// Check if user already have an account in ASETAP Application
			$request = "SELECT * FROM user WHERE BINARY matricule_user='".$matricule."' LIMIT 1";
			$result = mysqli_query($connection,$request);

			// User Already Registered
			if (mysqli_num_rows($result) == 1)
			{
				echo "Mv3J7jhKcH"; // User Already Registered
			}
			else
			{
				// Check if Username is Already Taken
				$request = "SELECT * FROM user WHERE BINARY login_user='".$login."' LIMIT 1";
				$result = mysqli_query($connection,$request);

				if (mysqli_num_rows($result) == 1)
				{
					echo "TemzkLYV4U"; // User Already Taken
				}
				else
				{
					// Add to users
					$request = "INSERT INTO user (login_user,matricule_user,fname_user,lname_user,password_user,gender_user,email_user) VALUES ('".$login."','".$matricule."','".$fname."','".$lname."','".$password."','".$gender."','".$email."')";
					$resultat = mysqli_query($connection,$request);
					
					if (mysqli_affected_rows($connection)) // User Added Successfully
					{
						echo "SdYhfj93co";
						$_SESSION["LY9nJ4FfxK"] = $login;
						$_SESSION["TUCbR9hw7m"] = "user";
					}
					else // There was an error adding the user
					{
						echo "Gb4jEHdgv7"; // Error Adding user
					}
				}
			}
		}
		else
			echo "JyqryrC9KT"; // Employee Doesn't Exist!
	}
	else
	{
		echo "BraTz4qwht"; // Form is Empty
	}

	mysqli_close($connection);
?>