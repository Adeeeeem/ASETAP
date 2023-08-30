<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	// Check user if already logged in
	if (isset($_SESSION["LY9nJ4FfxK"]))
	{
		switch ($_SESSION["TUCbR9hw7m"]) // Check user type
		{
			case "user": echo "UeqcPggTJ9"; break; // Normal User
			case "etap": echo "EngNtHvr3F"; break; // ETAP Admin
			case "asetap": echo "Ax94PTTP3E"; break; // ASETAP Admin
		}
	}
	else
	{
		echo "FJCRgVa9V9"; // User not logged in
		session_destroy();
	}
	
	mysqli_close($connection);
?>