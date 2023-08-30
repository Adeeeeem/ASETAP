<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$id = $_POST["id"];
	$address = $_POST["address"];
	$dispo = $_POST["dispo"];
	$start = $_POST["start"];
	$end = $_POST["end"];
	$tag = $_POST["tag"];
	$convinced = $_POST["convinced"];
	$price = $_POST["price"];

	if (isset($address) && !empty($address) && isset($dispo) && !empty($dispo) && isset($start) && !empty($start) && isset($end) && !empty($end) && isset($price) && !empty($price)) // Fields not Empty
	{
		$request = "UPDATE sport SET available_sport='".$dispo."', start_sport='".$start."', end_sport='".$end."', address_sport='".$address."', tag_sport='".$tag."', convinced_sport='".$convinced."', price_sport=".$price." WHERE id_sport=".$id;
		$result = mysqli_query($connection,$request);

		if (mysqli_affected_rows($connection)) // Sport Added Successfully
		{
				echo "AtTNzHrs3P";
		}
	}
	else // Fields Empty
	{
		echo "HhCm7rshxx";
	}

	mysqli_close($connection);
?>