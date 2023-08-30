<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$name = $_POST["name"];
	$address = $_POST["address"];
	$dispo = $_POST["dispo"];
	$start = $_POST["start"];
	$end = $_POST["end"];
	$tag = $_POST["tag"];
	$convinced = $_POST["convinced"];
	$price = $_POST["price"];

	if (isset($name) && !empty($name) && isset($address) && !empty($address) && isset($dispo) && !empty($dispo) && isset($start) && !empty($start) && isset($end) && !empty($end) && isset($price) && !empty($price)) // Fields not Empty
	{
		$request = "INSERT INTO sport (name_sport,available_sport,start_sport,end_sport,address_sport,tag_sport,convinced_sport,price_sport) VALUES ('".$name."','".$dispo."','".$start."','".$end."','".$address."','".$tag."','".$convinced."',".$price.")";
		$result = mysqli_query($connection,$request);

		if (mysqli_affected_rows($connection)) // Sport Added Successfully
		{
				echo "AtTNzHrs3P";
		}
		else // There was an error adding the user
		{
			echo "Epzr9JvY4M"; // Error Adding Sport
		}
	}
	else // Fields Empty
	{
		echo "HhCm7rshxx";
	}

	mysqli_close($connection);
?>