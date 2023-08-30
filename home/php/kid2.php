<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Get Current Empolyee's Kid 2 Sport DATA
	$request = "SELECT kid2.fname_kid2 AS kid2_first_name, kid2.lname_kid2 AS kid2_last_name, sport.name_sport kid2_sport_name, sport.address_sport AS kid2_sport_address, training.period kid2_sport_period, training.period_start AS kid2_sport_period_start, training.period_end AS kid2_sport_period_end, training.paid AS kid2_sport_paid, sport.available_sport AS kid2_sport_available, sport.start_sport AS kid2_sport_start_time, sport.end_sport AS kid2_sport_end_time, sport.tag_sport AS kid2_sport_tag, sport.convinced_sport AS kid2_sport_convinced, training.price AS kid2_sport_price FROM training INNER JOIN kid2 ON training.login=kid2.login_user INNER JOIN sport ON training.id_sport=sport.id_sport WHERE BINARY login_user='".$_SESSION['LY9nJ4FfxK']."' AND type='kid2' AND training.period_start <= CURDATE() AND training.period_end >= CURDATE() AND suspended='0' LIMIT 1";
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