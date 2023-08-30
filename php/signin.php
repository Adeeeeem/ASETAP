<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	$login = $_POST["login"];
	$password = $_POST["password"];

	// To protect MySQL injection
	$login = stripslashes($login);
	$password = stripslashes($password);

	$login = mysqli_real_escape_string($connection,$login);
	$password = mysqli_real_escape_string($connection,$password);

	// Check for User
	$request = "SELECT * FROM user WHERE BINARY login_user='".$login."' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // User Found
	{
		// Check for Password
		$request = "SELECT * FROM user WHERE BINARY login_user='".$login."' AND BINARY password_user='".$password."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User Authenticated
		{
			// Check for Type
			$request = "SELECT type_user AS TUCbR9hw7m FROM user WHERE BINARY login_user='".$login."' AND password_user='".$password."' LIMIT 1";
			$result = mysqli_query($connection,$request);
			$row = mysqli_fetch_array($result);

			if (mysqli_num_rows($result) == 1)
			{
				$_SESSION["LY9nJ4FfxK"] = $login;
				$_SESSION["TUCbR9hw7m"] = $row["TUCbR9hw7m"];

				switch ($row["TUCbR9hw7m"])
				{
					case "user": echo "UeqcPggTJ9"; break; // Normal User
					case "etap": echo "EngNtHvr3F"; break; // ETAP Admin
					case "asetap": echo "Ax94PTTP3E"; break; // ASETAP Admin
				}
			}
		}
		else // Wrong Password
		{
			echo "PpwzhN4yV7";
		}
	}
	else // User Not Found
	{
		echo "FpbzxVzEr4";
	}

	mysqli_close($connection);
?>