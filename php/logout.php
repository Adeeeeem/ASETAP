<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");
	
	$_SESSION["LY9nJ4FfxK"] = "";
	$_SESSION["TUCbR9hw7m"] = "";
	session_destroy();

	mysqli_close($connection);
?>