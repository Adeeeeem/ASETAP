<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Get Current Empolyee's Kid 1 Sport DATA
	$request = "SELECT kid1.fname_kid1 AS kid1_first_name, kid1.lname_kid1 AS kid1_last_name, sport.name_sport kid1_sport_name, sport.address_sport AS kid1_sport_address, training.period kid1_sport_period, training.period_start AS kid1_sport_period_start, training.period_end AS kid1_sport_period_end, training.paid AS kid1_sport_paid, sport.available_sport AS kid1_sport_available, sport.start_sport AS kid1_sport_start_time, sport.end_sport AS kid1_sport_end_time, sport.tag_sport AS kid1_sport_tag, sport.convinced_sport AS kid1_sport_convinced, training.price AS kid1_sport_price FROM training INNER JOIN kid1 ON training.login=kid1.login_user INNER JOIN sport ON training.id_sport=sport.id_sport WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' AND type='kid1' AND training.period_start <= CURDATE() AND training.period_end >= CURDATE() AND suspended='0' LIMIT 1";
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