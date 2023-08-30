<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Get Current Empolyee's Spouse Sport DATA
	$request = "SELECT spouse.fname_spouse AS spouse_first_name, spouse.lname_spouse AS spouse_last_name, sport.name_sport spouse_sport_name, sport.address_sport AS spouse_sport_address, training.period spouse_sport_period, training.period_start AS spouse_sport_period_start, training.period_end AS spouse_sport_period_end, training.paid AS spouse_sport_paid, sport.available_sport AS spouse_sport_available, sport.start_sport AS spouse_sport_start_time, sport.end_sport AS spouse_sport_end_time, sport.tag_sport AS spouse_sport_tag, sport.convinced_sport AS spouse_sport_convinced, training.price AS spouse_sport_price FROM training INNER JOIN spouse ON training.login=spouse.login_user INNER JOIN sport ON training.id_sport=sport.id_sport WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' AND type='spouse' AND training.period_start <= CURDATE() AND training.period_end >= CURDATE() AND suspended='0' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Found DATA
	{
		$row = mysqli_fetch_array($result);
		$row["statut"] = "Tk3BnS79sE";

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