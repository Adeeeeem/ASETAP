// Get User DATA on window load
$(window).on("load",function()
{
	// Get DATA for HTML Fields
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/data.php",
		data: {},
		success: function(result)
		{
			if (result != "")
			{
				var user_first_name = result.user_first_name; // Get Empolyee First Name
				var user_last_name = result.user_last_name; // Get Empolyee Last Name

				var spouse_first_name = result.spouse_first_name // Get Empolyee's Spouse First Name
				var spouse_last_name = result.spouse_last_name; // Get Empolyee's Spouse Last Name

				var kid1_first_name = result.kid1_first_name; // Get Empolyee's Kid 1 First Name
				var kid1_last_name = result.kid1_last_name; // Get Empolyee's Kid 1 Last Name

				var kid2_first_name = result.kid2_first_name; // Get Empolyee's Kid2 First Name
				var kid2_last_name = result.kid2_last_name; // Get Empolyee's Kid2 Last Name

				// Display Full Name
				$("#header-name").html(user_first_name+" "+result.user_last_name);
				// Display Last Name in Table
				$(".family-last-name").html(user_last_name);
				// Get Todeay's Date
				var today = new Date();
				
				// Fill Family Section
				$("#user-family table tbody").append("<tr><th>Adhérent</th><td>"+user_first_name+" "+user_last_name+"</td></tr>");
				
				if (!isNULL(user_first_name))
				{
					// Fill Inscriptions Settings Section
					$("#user-inscript table tbody").append("<tr><th>Adhérent</th><td>"+user_first_name+" "+user_last_name+"</td><td><button id='user-add-btn' href='#user-sport-add' uk-toggle>Ajouter</button></td><td><button id='user-sport-cancel-btn'>Annuler</button></td></tr>");
					// Fill History Section
					$("#user-history table tbody").append("<tr><th>Adhérent</th><td>"+user_first_name+" "+user_last_name+"</td><td><button id='user-sport-history-btn' uk-toggle='target: #user-sport-history'>Consulter</button></td></tr>");
					// Fill History Name
					$("#user-history-name").html(user_first_name+" "+user_last_name);
				}

				if (isNULL(spouse_first_name)) // If Spouse Doesn't Exist You can add it
				{
					// Family Section
					$("#user-family table tbody").append("<tr><th>Conjoint</th><td><button id='spouse-family-add-btn' href='#family-spouse-add' uk-toggle>Ajouter</button></td></tr>");
				}
				else // If Exists Then Display Spouse Name
				{
					$("#user-family table tbody").append("<tr><th>Conjoint</th><td>"+spouse_first_name+" "+spouse_last_name+"</td></tr>");
					// Fill Inscriptions Settings Section
					$("#user-inscript table tbody").append("<tr><th>Conjoint</th><td>"+spouse_first_name+" "+spouse_last_name+"</td><td><button id='spouse-add-btn' href='#spouse-sport-add' uk-toggle>Ajouter</button></td><td><button id='spouse-sport-cancel-btn'>Annuler</button></td></tr>");
					// Fill History Section
					$("#user-history table tbody").append("<tr><th>Conjoint</th><td>"+spouse_first_name+" "+spouse_last_name+"</td><td><button id='spouse-sport-history-btn' uk-toggle='target: #spouse-sport-history'>Consulter</button></td></tr>");
					// Fill History Name
					$("#spouse-history-name").html(spouse_first_name+" "+spouse_last_name);
				}

				if (isNULL(kid1_first_name)) // If Kid 1 Doesn't Exist You can add it
				{
					$("#user-family table tbody").append("<tr><th>Enfant 1</th><td><button id='kid1-family-add-btn' href='#family-kid1-add' uk-toggle>Ajouter</button></td></tr>");
				}
				else // If Exists Then Display Spouse Name
				{
					$("#user-family table tbody").append("<tr><th>Enfant 1</th><td>"+kid1_first_name+" "+kid1_last_name+"</td></tr>");
					// Fill Inscriptions Settings Section
					$("#user-inscript table tbody").append("<tr><th>Enfant 1</th><td>"+kid1_first_name+" "+kid1_last_name+"</td><td><button id='kid1-add-btn' href='#kid1-sport-add' uk-toggle>Ajouter</button></td><td><button id='kid1-sport-cancel-btn'>Annuler</button></td></tr>");
					// Fill History Section
					$("#user-history table tbody").append("<tr><th>Enfant 1</th><td>"+kid1_first_name+" "+kid1_last_name+"</td><td><button id='kid1-sport-history-btn' uk-toggle='target: #kid1-sport-history'>Consulter</button></td></tr>");
					// Fill History Name
					$("#kid1-history-name").html(kid1_first_name+" "+kid1_last_name);
				}

				if (isNULL(kid2_first_name)) // If Kid 2 Doesn't Exist You can add it
				{
					$("#user-family table tbody").append("<tr><th>Enfant 2</th><td><button id='kid2-family-add-btn' href='#family-kid2-add' uk-toggle>Ajouter</button></td></tr>");
				}
				else // If Exists Then Display Spouse Name
				{
					$("#user-family table tbody").append("<tr><th>Enfant 2</th><td>"+kid2_first_name+" "+kid2_last_name+"</td></tr>");
					// Fill Inscriptions Settings Section
					$("#user-inscript table tbody").append("<tr><th>Enfant 2</th><td>"+kid2_first_name+" "+kid2_last_name+"</td><td><button id='kid2-add-btn' href='#kid2-sport-add' uk-toggle>Ajouter</button></td><td><button id='kid2-sport-cancel-btn'>Annuler</button></td></tr>");
					// Fill History Section
					$("#user-history table tbody").append("<tr><th>Enfant 2</th><td>"+kid2_first_name+" "+kid2_last_name+"</td><td><button id='kid2-sport-history-btn' uk-toggle='target: #kid2-sport-history'>Consulter</button></td></tr>");
					// Fill History Name
					$("#kid2-history-name").html(kid2_first_name+" "+kid2_last_name);
				}

				// Get Empolyee Sport DATA
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/user.php",
					data: {},
					success: function(result)
					{
						if (result.statut == "Tk3BnS79sE")
						{
							// FUll Name
							var user_name = "<td>"+result.user_first_name+" "+result.user_last_name+"</td>";
							// Sport Details
							var user_sport_details = "<div class='uk-card uk-card-body uk-card-default uk-text-center'>Jours Disponible <span>"+availableDays(result.user_sport_available)+"</span><br>De <span>"+result.user_sport_start_time+"</span> à <span>"+result.user_sport_end_time+"</span><br>Pour <span>"+sport_tag(result.user_sport_tag)+"</span><br> <span>"+sport_convinced(result.user_sport_convinced)+"</span><br>Prix Total <span>"+result.user_sport_price+"</span> DT</div>";
							// Sport Name
							var user_sport_name = "<td><div class='uk-inline'><a href#>"+result.user_sport_name+"</a><div uk-drop='mode: click; pos: right-center'>"+user_sport_details+"</div></div></td>";
							// Sport Address
							var user_sport_address = "<td>"+result.user_sport_address+"</td>";
							// Sport Period
							var user_sport_period = "<td>"+result.user_sport_period+"</td>";
							// Split Start Period
							var year_start = result.user_sport_period_start.slice(0,4); // Start Year
							var month_start = result.user_sport_period_start.slice(5,7); // Start Month
							var day_start = result.user_sport_period_start.slice(8,10); // Start Day
							// Split Start Period
							var year_end = result.user_sport_period_end.slice(0,4); // End Year
							var month_end = result.user_sport_period_end.slice(5,7); // End Month
							var day_end = result.user_sport_period_end.slice(8,10); // End Day
							// Sport Start Period
							var user_sport_period_start = "<td>"+day_start+"/"+month_start+"/"+year_start+"</td>";
							// Sport End Period
							var user_sport_period_end = "<td>"+day_end+"/"+month_end+"/"+year_end+"</td>";
							// Calculate Difference between sport start periode and sport end periode
							var end = month_end+"/"+day_end+"/"+year_end;
							// Calculate Difference between sport start periode and sport end periode
							var user_sport_periode_rest = "<td>"+differenceDates(today,end)+" Jours</td>";
							// Payment Sport
							if (result.user_sport_paid == "Y")
							{
								// If User Paid his Payment Background will be green
								user_sport_paid = "<td class='success-input'>Payé</td>";
							}
							else
							{
								// If User not Paid his Payment Background will be red
								user_sport_paid = "<td class='danger-input'>Non payé</td>";
							}

							// Fill Inscriptions Section
							$("#user-data table tbody").append("<tr><th>Adhérent</th>"+user_name+user_sport_name+user_sport_address+user_sport_period+user_sport_period_start+user_sport_period_end+user_sport_periode_rest+user_sport_paid+"</tr>");
							// Fill Cancel Inscription User Sport
							$("#user-sport-cancel span").text(result.user_sport_name);
						}
					}
				});
				// Get Empolyee's Spouse Sport DATA
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/spouse.php",
					data: {},
					success: function(result)
					{
						if (result.statut == "Tk3BnS79sE")
						{
							// FUll Name
							var spouse_name = "<td>"+result.spouse_first_name+" "+result.spouse_last_name+"</td>";
							// Sport Details
							var spouse_sport_details = "<div class='uk-card uk-card-body uk-card-default uk-text-center'>Jours Disponible <span>"+availableDays(result.spouse_sport_available)+"</span><br>De <span>"+result.spouse_sport_start_time+"</span> à <span>"+result.spouse_sport_end_time+"</span><br>Pour <span>"+sport_tag(result.spouse_sport_tag)+"</span><br> <span>"+sport_convinced(result.spouse_sport_convinced)+"</span><br>Prix Total <span>"+result.spouse_sport_price+"</span> DT</div>";
							// Sport Name
							var spouse_sport_name = "<td><div class='uk-inline'><a href#>"+result.spouse_sport_name+"</a><div uk-drop='mode: click; pos: right-center'>"+spouse_sport_details+"</div></div></td>";
							// Sport Address
							var spouse_sport_address = "<td>"+result.spouse_sport_address+"</td>";
							// Sport Period
							var spouse_sport_period = "<td>"+result.spouse_sport_period+"</td>";
							// Split Start Period
							var year_start = result.spouse_sport_period_start.slice(0,4); // Start Year
							var month_start = result.spouse_sport_period_start.slice(5,7); // Start Month
							var day_start = result.spouse_sport_period_start.slice(8,10); // Start Day
							// Split Start Period
							var year_end = result.spouse_sport_period_end.slice(0,4); // End Year
							var month_end = result.spouse_sport_period_end.slice(5,7); // End Month
							var day_end = result.spouse_sport_period_end.slice(8,10); // End Day
							// Sport Start Period
							var spouse_sport_period_start = "<td>"+day_start+"/"+month_start+"/"+year_start+"</td>";
							// Sport End Period
							var spouse_sport_period_end = "<td>"+day_end+"/"+month_end+"/"+year_end+"</td>";
							// Calculate Difference between sport start periode and sport end periode
							var end = month_end+"/"+day_end+"/"+year_end;
							// Calculate Difference between sport start periode and sport end periode
							var spouse_sport_periode_rest = "<td>"+differenceDates(today,end)+" Jours</td>";
							// Payment Sport
							if (result.spouse_sport_paid == "Y")
							{
								// If User Paid his Payment Background will be green
								spouse_sport_paid = "<td class='success-input'>Payé</td>";
							}
							else
							{
								// If User not Paid his Payment Background will be red
								spouse_sport_paid = "<td class='danger-input'>Non payé</td>";
							}

							// Fill Inscriptions Section
							$("#user-data table tbody").append("<tr><th>Conjoint</th>"+spouse_name+spouse_sport_name+spouse_sport_address+spouse_sport_period+spouse_sport_period_start+spouse_sport_period_end+spouse_sport_periode_rest+spouse_sport_paid+"</tr>");
							// Fill Cancel Inscription Spouse Sport
							$("#spouse-sport-cancel span").text(result.spouse_sport_name);
						}
					}
				});
				// Get Empolyee's Kid 1 Sport DATA
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/kid1.php",
					data: {},
					success: function(result)
					{
						if (result.statut == "Tk3BnS79sE")
						{
							// FUll Name
							var kid1_name = "<td>"+result.kid1_first_name+" "+result.kid1_last_name+"</td>";
							// Sport Details
							var kid1_sport_details = "<div class='uk-card uk-card-body uk-card-default uk-text-center'>Jours Disponible <span>"+availableDays(result.kid1_sport_available)+"</span><br>De <span>"+result.kid1_sport_start_time+"</span> à <span>"+result.kid1_sport_end_time+"</span><br>Pour <span>"+sport_tag(result.kid1_sport_tag)+"</span><br> <span>"+sport_convinced(result.kid1_sport_convinced)+"</span><br>Prix Total <span>"+result.kid1_sport_price+"</span> DT</div>";
							// Sport Name
							var kid1_sport_name = "<td><div class='uk-inline'><a href#>"+result.kid1_sport_name+"</a><div uk-drop='mode: click; pos: right-center'>"+kid1_sport_details+"</div></div></td>";
							// Sport Address
							var kid1_sport_address = "<td>"+result.kid1_sport_address+"</td>";
							// Sport Period
							var kid1_sport_period = "<td>"+result.kid1_sport_period+"</td>";
							// Split Start Period
							var year_start = result.kid1_sport_period_start.slice(0,4); // Start Year
							var month_start = result.kid1_sport_period_start.slice(5,7); // Start Month
							var day_start = result.kid1_sport_period_start.slice(8,10); // Start Day
							// Split Start Period
							var year_end = result.kid1_sport_period_end.slice(0,4); // End Year
							var month_end = result.kid1_sport_period_end.slice(5,7); // End Month
							var day_end = result.kid1_sport_period_end.slice(8,10); // End Day
							// Sport Start Period
							var kid1_sport_period_start = "<td>"+day_start+"/"+month_start+"/"+year_start+"</td>";
							// Sport End Period
							var kid1_sport_period_end = "<td>"+day_end+"/"+month_end+"/"+year_end+"</td>";
							// Change Sport Start Period and Sport End Period Format for Calculating Difference in Days
							var end = month_end+"/"+day_end+"/"+year_end;
							// Calculate Difference between sport start periode and sport end periode
							var kid1_sport_periode_rest = "<td>"+differenceDates(today,end)+" Jours</td>";
							// Payment Sport
							if (result.kid1_sport_paid == "Y")
							{
								// If User Paid his Payment Background will be green
								kid1_sport_paid = "<td class='success-input'>Payé</td>";
							}
							else
							{
								// If User not Paid his Payment Background will be red
								kid1_sport_paid = "<td class='danger-input'>Non payé</td>";
							}
							
							// Fill Inscriptions Section
							$("#user-data table tbody").append("<tr><th>Enfant 1</th>"+kid1_name+kid1_sport_name+kid1_sport_address+kid1_sport_period+kid1_sport_period_start+kid1_sport_period_end+kid1_sport_periode_rest+kid1_sport_paid+"</tr>");
							// Fill Cancel Inscription Kid 1 Sport
							$("#kid1-sport-cancel span").text(result.kid1_sport_name);
						}
					}
				});

				// Get Empolyee's Kid 2 Sport DATA
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/kid2.php",
					data: {},
					success: function(result)
					{
						if (result.statut == "Tk3BnS79sE")
						{
							// FUll Name
							var kid2_name = "<td>"+result.kid2_first_name+" "+result.kid2_last_name+"</td>";
							// Sport Details
							var kid2_sport_details = "<div class='uk-card uk-card-body uk-card-default uk-text-center'>Jours Disponible <span>"+availableDays(result.kid2_sport_available)+"</span><br>De <span>"+result.kid2_sport_start_time+"</span> à <span>"+result.kid2_sport_end_time+"</span><br>Pour <span>"+sport_tag(result.kid2_sport_tag)+"</span><br> <span>"+sport_convinced(result.kid2_sport_convinced)+"</span><br>Prix Total <span>"+result.kid2_sport_price+"</span> DT</div>";
							// Sport Name
							var kid2_sport_name = "<td><div class='uk-inline'><a href#>"+result.kid2_sport_name+"</a><div uk-drop='mode: click; pos: right-center'>"+kid2_sport_details+"</div></div></td>";
							// Sport Address
							var kid2_sport_address = "<td>"+result.kid2_sport_address+"</td>";
							// Sport Period
							var kid2_sport_period = "<td>"+result.kid2_sport_period+"</td>";
							// Split Start Period
							var year_start = result.kid2_sport_period_start.slice(0,4); // Start Year
							var month_start = result.kid2_sport_period_start.slice(5,7); // Start Month
							var day_start = result.kid2_sport_period_start.slice(8,10); // Start Day
							// Split Start Period
							var year_end = result.kid2_sport_period_end.slice(0,4); // End Year
							var month_end = result.kid2_sport_period_end.slice(5,7); // End Month
							var day_end = result.kid2_sport_period_end.slice(8,10); // End Day
							// Sport Start Period
							var kid2_sport_period_start = "<td>"+day_start+"/"+month_start+"/"+year_start+"</td>";
							// Sport End Period
							var kid2_sport_period_end = "<td>"+day_end+"/"+month_end+"/"+year_end+"</td>";
							// Change Sport Sport End Period Format for Calculating Difference in Days
							var end = month_end+"/"+day_end+"/"+year_end;
							// Calculate Difference between sport start periode and sport end periode
							var kid2_sport_periode_rest = "<td>"+differenceDates(today,end)+" Jours</td>";
							// Payment Sport
							if (result.kid2_sport_paid == "Y")
							{
								// If User Paid his Payment Background will be green
								kid2_sport_paid = "<td class='success-input'>Payé</td>";
							}
							else
							{
								// If User not Paid his Payment Background will be red
								kid2_sport_paid = "<td class='danger-input'>Non payé</td>";
							}
							
							// Fill Inscriptions Section
							$("#user-data table tbody").append("<tr><th>Enfant 2</th>"+kid2_name+kid2_sport_name+kid2_sport_address+kid2_sport_period+kid2_sport_period_start+kid2_sport_period_end+kid2_sport_periode_rest+kid2_sport_paid+"</tr>");
							// Fill Cancel Inscription Kid 2 Sport
							$("#kid2-sport-cancel span").text(result.kid2_sport_name);
						}
					}
				});
			}
		}
	});
});

// Add Spouse to Family
$(function()
{
	$("#confirm-spouse-family-add-btn").click(function()
	{
		var fname = $("#family-spouse-fname"); // Get Spouse First Name
		var lname = $("#family-spouse-lname"); // Get Spouse Last Name
		var gender = $("input[name='spouse-gender']:checked"); // Get Spouse Gender

		Empty(fname.val(),fname,"#family-spouse-fname-necessary"); // If First Name Input Field is Empty Display Error
		Empty(lname.val(),lname,"#family-spouse-lname-necessary"); // If Last Name Input Field is Empty Display Error

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/familyadd.php",
			data: {type: "spouse", fname: fname.val(), lname: lname.val(), gender: gender.val()},
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ": // Fields are Empty
						Empty(fname.val(),fname,"#family-spouse-fname-necessary"); // If First Name Input Field is Empty Display Error
						Empty(lname.val(),lname,"#family-spouse-lname-necessary"); // If Last Name Input Field is Empty Display Error
					break;

					case "YR4zqKAdwY": // Spouse Already Exist
						$("#family-spouse-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Conjoint Déja Existe");
					break;

					case "Pdee3kCkqv": // Spouse Added Successfully
						$("#family-spouse-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Conjoint Ajouté avec succès");
					break;

					case "Xa3XFqfzkY": // Error Adding Spouse
						$("#family-spouse-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					break;
				}
			}
		});
	});
});

// Add Kid 1 to Family
$(function()
{
	$("#confirm-kid1-family-add-btn").click(function()
	{
		var fname = $("#family-kid1-fname"); // Get Kid 1 First Name
		var lname = $("#family-kid1-lname"); // Get Kid 1 Last Name
		var gender = $("input[name='kid1-gender']:checked"); // Get Kid 1 Gender

		Empty(fname.val(),fname,"#family-kid1-fname-necessary"); // If First Name Input Field is Empty Display Error
		Empty(lname.val(),lname,"#family-kid1-lname-necessary"); // If Last Name Input Field is Empty Display Error

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/familyadd.php",
			data: {type: "kid1", fname: fname.val(), lname: lname.val(), gender: gender.val()},
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ": // Fields are Empty
						Empty(fname.val(),fname,"#family-kid1-fname-necessary"); // If First Name Input Field is Empty Display Error
						Empty(lname.val(),lname,"#family-kid1-lname-necessary"); // If Last Name Input Field is Empty Display Error
					break;

					case "YR4zqKAdwY": // Kid 1 Already Exist
						$("#family-kid1-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Enfant 1 Déja Existe");
					break;

					case "Pdee3kCkqv": // Kid 1 Added Successfully
						$("#family-kid1-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Enfant 1 Ajouté avec succès");
					break;

					case "Xa3XFqfzkY": // Error Adding Kid 1
						$("#family-kid1-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					break;
				}
			}
		});
	});
});

// Add Kid 2 to Family
$(function()
{
	$("#confirm-kid2-family-add-btn").click(function()
	{
		var fname = $("#family-kid2-fname"); // Get Kid 2 First Name
		var lname = $("#family-kid2-lname"); // Get Kid 2 Last Name
		var gender = $("input[name='kid2-gender']:checked"); // Get Kid 2 Gender

		Empty(fname.val(),fname,"#family-kid2-fname-necessary"); // If First Name Input Field is Empty Display Error
		Empty(lname.val(),lname,"#family-kid2-lname-necessary"); // If Last Name Input Field is Empty Display Error

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/familyadd.php",
			data: {type: "kid2", fname: fname.val(), lname: lname.val(), gender: gender.val()},
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ": // Fields are Empty
						Empty(fname.val(),fname,"#family-kid2-fname-necessary"); // If First Name Input Field is Empty Display Error
						Empty(lname.val(),lname,"#family-kid2-lname-necessary"); // If Last Name Input Field is Empty Display Error
					break;

					case "YR4zqKAdwY": // Kid 2 Already Exist
						$("#family-kid2-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Enfant 2 Déja Existe");
					break;

					case "Pdee3kCkqv": // Kid 2 Added Successfully
						$("#family-kid2-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Enfant 2 Ajouté avec succès");
					break;

					case "Xa3XFqfzkY": // Error Adding Kid 2
						$("#family-kid2-add").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					break;
				}
			}
		});
	});
});

// Make Today's Date is the Minimum in Adding Sport and a year after is max
$(function()
{
	var today = new Date();
	var ty = today.getFullYear();
	
	today = ty+"-01-01";

	var last_day = ty+"-12-31";

	$("[type='date']").prop("min",today);
	$("[type='date']").prop("max",last_day);
});

// Add Employee Sport Button
$(function ()
{
	// Send Request To get gender
	$.ajax
	({
		type:"POST",
		dataType:"text",
		url: "../php/getgender.php",
		data:{user: "user"},
		success: function(result)
		{
			var tag = result[6];

			$.ajax // Load Sports DATA for Employee in Datalist
			({
				type: "POST",
				dataType: "json",
				url: "../php/sports.php",
				data: {tag: tag},
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						$("#user-sports-result").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>");
					}
				}
			});
		}
	});

	// Fill Sport Details while typing
	$("#user-search-sports").change(function()
	{
		if ($("#user-search-sports").val() == "") // If Sport Search Input is Empty then Empty all the fields
		{
			$("#user-sport-name").val("");
			$("#user-sport-available").val("");
			$("#user-sport-address").val("");
			$("#user-sport-start").val("");
			$("#user-sport-end").val("");
			$("#user-sport-convinced").val("");
			$("#user-sport-convinced").removeClass("success-input");
			$("#user-sport-convinced").removeClass("danger-input");
			$("#user-sport-price").val("");
		}
		else // Display Sport Details in Fields
		{
			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "../php/sportsdetails.php",
				data: {sport: $("#user-search-sports").val()},
				success: function(result)
				{
					$("#user-sport-name").val(result.name_sport); // Set Sport Name
					$("#user-sport-available").val(availableDays(result.available_sport)); // Set Available Days
					$("#user-sport-address").val(result.address_sport); // Set Sport Address
					$("#user-sport-start").val(result.start_sport); // Set Sport Start Time
					$("#user-sport-end").val(result.end_sport); // Set Sport End Time
					// Sport is Convinced by ETAP
					if (result.convinced_sport == '1')
					{
						$("#user-sport-convinced").val("Oui");
						$("#user-sport-convinced").addClass("success-input");
					}
					else // Sport not Convinced by ETAP
					{
						$("#user-sport-convinced").val("Non");
						$("#user-sport-convinced").addClass("danger-input");
					}
					$("#user-sport-price").val(result.price_sport+" DT"); // Set Sport Price
				}
			});
		}
	});
});

// Confirm Add Employee Sport Button
$(function()
{
	$("#confirm-user-sport-add-btn").click(function()
	{
		// If user didn't choose an option
		if ($("#user-search-sports").val() == "")
		{
			$("#user-search-sports").css("border","1px solid red"); // Display Search's Input Error
			$("#invalid-choosing-sport-user").show(); // Display Invalid Sport Error
		}
		else
		{
			$("#user-search-sports").css("border","1px solid #999"); // Hide Search's Input Error
			$("#invalid-choosing-sport-user").hide(); // Hide Invalid Sport Error

			if ($("#user-sport-start-period").val() == "") // If user didn't fill Start Period Sport Input
			{
				$("#user-sport-start-period").css("border","1px solid red"); // Display Date's Input Error
				$("#necessary-sport-start-period-user").show(); // Display Necessary Error
			}
			else
			{
				$("#user-sport-start-period").css("border","1px solid #999"); // Hide Date's Input Error
				$("#necessary-sport-start-period-user").hide(); // Hide Necessary Error

				var sport = $("#user-search-sports").val(); // Get Sport ID
				var period = $("#user-sport-period").val(); // Get Sport Period
				var start_period = $("#user-sport-start-period").val(); // Get Sport Start Period
				// Splitting Sport Start Period Date
				var start_period_day = new Date(start_period).getDate(); // Get Sport Start Day Period
				var start_period_month = new Date(start_period).getMonth()+1; // Get Sport Start Month Period
				var start_period_year = new Date(start_period).getFullYear(); // Get Sport Start Year Period

				start_period = new Date(start_period);
				var end_period = new Date();

				var price; // Calculate Sport Price per month
				// Set Sport End Period and Sport Price
				switch (period)
				{
					case "1 mois": end_period = end_period.setTime(start_period.getTime()+30*24*60*60*1000); price = 1; break;
					case "3 mois": end_period = end_period.setTime(start_period.getTime()+90*24*60*60*1000);  price = 3;break;
					case "6 mois": end_period = end_period.setTime(start_period.getTime()+180*24*60*60*1000); price = 6; break;
					case "1 ans": end_period = end_period.setTime(start_period.getTime()+365*24*60*60*1000); price = 12; break;
				}
				var end_period_day = new Date(end_period).getDate(); // Get Sport End Day Period
				var end_period_month = new Date(end_period).getMonth()+1; // Get Sport End Month Period
				var end_period_year = new Date(end_period).getFullYear(); // Get Sport End Year Period
				
				// Change Format for DATABASE
				start_period = start_period_year+"-"+start_period_month+"-"+start_period_day;
				end_period = end_period_year+"-"+end_period_month+"-"+end_period_day;

				$.ajax
				({
					type: "POST",
					dataType: "text",
					url: "../php/addsport.php",
					data: {user: 'user', sport: sport, period: period, start: start_period, end: end_period, price: price},
					success: function(result)
					{
						switch (result)
						{
							case "FRLr9kTFyM": // Already Registered to a Gym at that time
								$("#user-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("vous êtes déjà inscrit");
							break;
							case "AtTNzHrs3P": // Sport Added Successfully
								$("#user-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["success"]("vous êtes maintenant inscrit");
							break;
							case "Epzr9JvY4M": // Error Adding Sport
								$("#user-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
							break;
						}
					}
				});
			}
		}
	});
});

// Add Spouse Sport Button
$(function ()
{
	// Send Request To get Spouse gender
	$.ajax
	({
		type:"POST",
		dataType:"text",
		url: "../php/getgender.php",
		data:{user: "spouse"},
		success: function(result)
		{
			var tag = result[6];

			$.ajax // Load Sports DATA for Employee's Spouse in Datalist
			({
				type: "POST",
				dataType: "json",
				url: "../php/sports.php",
				data: {tag: tag},
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						$("#spouse-sports-result").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>");
					}
				}
			});
		}
	});

	// Fill Sport Details while typing
	$("#spouse-search-sports").change(function()
	{
		if ($("#spouse-search-sports").val() == "") // If Sport Search Input is Empty then Empty all the fields
		{
			$("#spouse-sport-name").val("");
			$("#spouse-sport-available").val("");
			$("#spouse-sport-address").val("");
			$("#spouse-sport-start").val("");
			$("#spouse-sport-end").val("");
			$("#spouse-sport-convinced").val("");
			$("#spouse-sport-convinced").removeClass("success-input");
			$("#spouse-sport-convinced").removeClass("danger-input");
			$("#spouse-sport-price").val("");
		}
		else // Display Sport Details in Fields
		{
			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "../php/sportsdetails.php",
				data: {sport: $("#spouse-search-sports").val()},
				success: function(result)
				{
					$("#spouse-sport-name").val(result.name_sport); // Set Sport Name
					$("#spouse-sport-available").val(availableDays(result.available_sport)); // Set Available Days
					$("#spouse-sport-address").val(result.address_sport); // Set Sport Address
					$("#spouse-sport-start").val(result.start_sport); // Set Sport Start Time
					$("#spouse-sport-end").val(result.end_sport); // Set Sport End Time
					// Sport is Convinced by ETAP
					if (result.convinced_sport == '1')
					{
						$("#spouse-sport-convinced").val("Oui");
						$("#spouse-sport-convinced").addClass("success-input");
					}
					else // Sport not Convinced by ETAP
					{
						$("#spouse-sport-convinced").val("Non");
						$("#spouse-sport-convinced").addClass("danger-input");
					}
					$("#spouse-sport-price").val(result.price_sport+" DT"); // Set Sport Price
				}
			});
		}
	});
});

// Confirm Add Spouse Sport Button
$(function()
{
	$("#confirm-spouse-sport-add-btn").click(function()
	{
		// If spouse didn't choose an option
		if ($("#spouse-search-sports").val() == "")
		{
			$("#spouse-search-sports").css("border","1px solid red"); // Display Search's Input Error
			$("#invalid-choosing-sport-spouse").show(); // Display Invalid Sport Error
		}
		else
		{
			$("#spouse-search-sports").css("border","1px solid #999"); // Hide Search's Input Error
			$("#invalid-choosing-sport-spouse").hide(); // Hide Invalid Sport Error

			if ($("#spouse-sport-start-period").val() == "") // If spouse didn't fill Start Period Sport Input
			{
				$("#spouse-sport-start-period").css("border","1px solid red"); // Display Date's Input Error
				$("#necessary-sport-start-period-spouse").show(); // Display Necessary Error
			}
			else
			{
				$("#spouse-sport-start-period").css("border","1px solid #999"); // Hide Date's Input Error
				$("#necessary-sport-start-period-spouse").hide(); // Hide Necessary Error

				var sport = $("#spouse-search-sports").val(); // Get Sport ID
				var period = $("#spouse-sport-period").val(); // Get Sport Period
				var start_period = $("#spouse-sport-start-period").val(); // Get Sport Start Period
				// Splitting Sport Start Period Date
				var start_period_day = new Date(start_period).getDate(); // Get Sport Start Day Period
				var start_period_month = new Date(start_period).getMonth()+1; // Get Sport Start Month Period
				var start_period_year = new Date(start_period).getFullYear(); // Get Sport Start Year Period

				start_period = new Date(start_period);
				var end_period = new Date();

				var price; // Calculate Sport Price per month
				// Set Sport End Period and Sport Price
				switch (period)
				{
					case "1 mois": end_period = end_period.setTime(start_period.getTime()+30*24*60*60*1000); price = 1; break;
					case "3 mois": end_period = end_period.setTime(start_period.getTime()+90*24*60*60*1000); price = 3; break;
					case "6 mois": end_period = end_period.setTime(start_period.getTime()+180*24*60*60*1000); price = 6; break;
					case "1 ans": end_period = end_period.setTime(start_period.getTime()+365*24*60*60*1000); price = 12; break;
				}
				var end_period_day = new Date(end_period).getDate(); // Get Sport End Day Period
				var end_period_month = new Date(end_period).getMonth()+1; // Get Sport End Month Period
				var end_period_year = new Date(end_period).getFullYear(); // Get Sport End Year Period
				
				// Change Format for DATABASE
				start_period = start_period_year+"-"+start_period_month+"-"+start_period_day;
				end_period = end_period_year+"-"+end_period_month+"-"+end_period_day;

				$.ajax
				({
					type: "POST",
					dataType: "text",
					url: "../php/addsport.php",
					data: {user: 'spouse', sport: sport, period: period, start: start_period, end: end_period, price: price},
					success: function(result)
					{
						switch (result)
						{
							case "HhCm7rshxx": // Member Doesn't Exists, Need to be Added First
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Aucun Conjoint trouvé, Veuillez d'abord ajouter");
							break;

							case "FRLr9kTFyM": // Already Registered to a Gym at that time
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("vous êtes déjà inscrit");
							break;
							case "AtTNzHrs3P": // Sport Added Successfully
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["success"]("vous êtes maintenant inscrit");
							break;
							case "Epzr9JvY4M": // Error Adding Sport
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
							break;
						}
					}
				});
			}
		}
	});
});

// Add kid 1 Sport Button
$(function ()
{
	// Send Request To get kid 1 gender
	$.ajax
	({
		type:"POST",
		dataType:"text",
		url: "../php/getgender.php",
		data:{user: "kid1"},
		success: function(result)
		{
			var tag = result[6]+result[7];

			$.ajax // Load Sports DATA for Employee's kid 1 in Datalist
			({
				type: "POST",
				dataType: "json",
				url: "../php/sports.php",
				data: {tag: tag},
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						$("#kid1-sports-result").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>");
					}
				}
			});
		}
	});

	// Fill Sport Details while typing
	$("#kid1-search-sports").change(function()
	{
		if ($("#kid1-search-sports").val() == "") // If Sport Search Input is Empty then Empty all the fields
		{
			$("#kid1-sport-name").val("");
			$("#kid1-sport-available").val("");
			$("#kid1-sport-address").val("");
			$("#kid1-sport-start").val("");
			$("#kid1-sport-end").val("");
			$("#kid1-sport-convinced").val("");
			$("#kid1-sport-convinced").removeClass("success-input");
			$("#kid1-sport-convinced").removeClass("danger-input");
			$("#kid1-sport-price").val("");
		}
		else // Display Sport Details in Fields
		{
			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "../php/sportsdetails.php",
				data: {sport: $("#kid1-search-sports").val()},
				success: function(result)
				{
					$("#kid1-sport-name").val(result.name_sport); // Set Sport Name
					$("#kid1-sport-available").val(availableDays(result.available_sport)); // Set Available Days
					$("#kid1-sport-address").val(result.address_sport); // Set Sport Address
					$("#kid1-sport-start").val(result.start_sport); // Set Sport Start Time
					$("#kid1-sport-end").val(result.end_sport); // Set Sport End Time
					// Sport is Convinced by ETAP
					if (result.convinced_sport == '1')
					{
						$("#kid1-sport-convinced").val("Oui");
						$("#kid1-sport-convinced").addClass("success-input");
					}
					else // Sport not Convinced by ETAP
					{
						$("#kid1-sport-convinced").val("Non");
						$("#kid1-sport-convinced").addClass("danger-input");
					}
					$("#kid1-sport-price").val(result.price_sport+" DT"); // Set Sport Price
				}
			});
		}
	});
});

// Confirm Add kid 1 Sport Button
$(function()
{
	$("#confirm-kid1-sport-add-btn").click(function()
	{
		// If kid1 didn't choose an option
		if ($("#kid1-search-sports").val() == "")
		{
			$("#kid1-search-sports").css("border","1px solid red"); // Display Search's Input Error
			$("#invalid-choosing-sport-kid1").show(); // Display Invalid Sport Error
		}
		else
		{
			$("#kid1-search-sports").css("border","1px solid #999"); // Hide Search's Input Error
			$("#invalid-choosing-sport-kid1").hide(); // Hide Invalid Sport Error

			if ($("#kid1-sport-start-period").val() == "") // If kid 1 didn't fill Start Period Sport Input
			{
				$("#kid1-sport-start-period").css("border","1px solid red"); // Display Date's Input Error
				$("#necessary-sport-start-period-kid1").show(); // Display Necessary Error
			}
			else
			{
				$("#kid1-sport-start-period").css("border","1px solid #999"); // Hide Date's Input Error
				$("#necessary-sport-start-period-kid1").hide(); // Hide Necessary Error

				var sport = $("#kid1-search-sports").val(); // Get Sport ID
				var period = $("#kid1-sport-period").val(); // Get Sport Period
				var start_period = $("#kid1-sport-start-period").val(); // Get Sport Start Period
				// Splitting Sport Start Period Date
				var start_period_day = new Date(start_period).getDate(); // Get Sport Start Day Period
				var start_period_month = new Date(start_period).getMonth()+1; // Get Sport Start Month Period
				var start_period_year = new Date(start_period).getFullYear(); // Get Sport Start Year Period

				start_period = new Date(start_period);
				var end_period = new Date();

				var price; // Calculate Sport Price per month
				// Set Sport End Period and Sport Price
				switch (period)
				{
					case "1 mois": end_period = end_period.setTime(start_period.getTime()+30*24*60*60*1000); price = 1; break;
					case "3 mois": end_period = end_period.setTime(start_period.getTime()+90*24*60*60*1000); price = 3; break;
					case "6 mois": end_period = end_period.setTime(start_period.getTime()+180*24*60*60*1000); price = 6; break;
					case "1 ans": end_period = end_period.setTime(start_period.getTime()+365*24*60*60*1000); price = 12; break;
				}
				var end_period_day = new Date(end_period).getDate(); // Get Sport End Day Period
				var end_period_month = new Date(end_period).getMonth()+1; // Get Sport End Month Period
				var end_period_year = new Date(end_period).getFullYear(); // Get Sport End Year Period
				
				// Change Format for DATABASE
				start_period = start_period_year+"-"+start_period_month+"-"+start_period_day;
				end_period = end_period_year+"-"+end_period_month+"-"+end_period_day;

				$.ajax
				({
					type: "POST",
					dataType: "text",
					url: "../php/addsport.php",
					data: {user: 'kid1', sport: sport, period: period, start: start_period, end: end_period, price: price},
					success: function(result)
					{
						switch (result)
						{
							case "HhCm7rshxx": // Member Doesn't Exists, Need to be Added First
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Aucun Enfant trouvé, Veuillez d'abord ajouter");
							break;

							case "FRLr9kTFyM": // Already Registered to a Gym at that time
								$("#kid1-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("vous êtes déjà inscrit");
							break;
							case "AtTNzHrs3P": // Sport Added Successfully
								$("#kid1-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["success"]("vous êtes maintenant inscrit");
							break;
							case "Epzr9JvY4M": // Error Adding Sport
								$("#kid1-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
							break;
						}
					}
				});
			}
		}
	});
});

// Add kid 2 Sport Button
$(function ()
{
	// Send Request To get kid 2 gender
	$.ajax
	({
		type:"POST",
		dataType:"text",
		url: "../php/getgender.php",
		data:{user: "kid2"},
		success: function(result)
		{
			var tag = result[6]+result[7];

			$.ajax // Load Sports DATA for Employee's kid 2 in Datalist
			({
				type: "POST",
				dataType: "json",
				url: "../php/sports.php",
				data: {tag: tag},
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						$("#kid2-sports-result").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>");
					}
				}
			});
		}
	});

	// Fill Sport Details while typing
	$("#kid2-search-sports").change(function()
	{
		if ($("#kid2-search-sports").val() == "") // If Sport Search Input is Empty then Empty all the fields
		{
			$("#kid2-sport-name").val("");
			$("#kid2-sport-available").val("");
			$("#kid2-sport-address").val("");
			$("#kid2-sport-start").val("");
			$("#kid2-sport-end").val("");
			$("#kid2-sport-convinced").val("");
			$("#kid2-sport-convinced").removeClass("success-input");
			$("#kid2-sport-convinced").removeClass("danger-input");
			$("#kid2-sport-price").val("");
		}
		else // Display Sport Details in Fields
		{
			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "../php/sportsdetails.php",
				data: {sport: $("#kid2-search-sports").val()},
				success: function(result)
				{
					$("#kid2-sport-name").val(result.name_sport); // Set Sport Name
					$("#kid2-sport-available").val(availableDays(result.available_sport)); // Set Available Days
					$("#kid2-sport-address").val(result.address_sport); // Set Sport Address
					$("#kid2-sport-start").val(result.start_sport); // Set Sport Start Time
					$("#kid2-sport-end").val(result.end_sport); // Set Sport End Time
					// Sport is Convinced by ETAP
					if (result.convinced_sport == '1')
					{
						$("#kid2-sport-convinced").val("Oui");
						$("#kid2-sport-convinced").addClass("success-input");
					}
					else // Sport not Convinced by ETAP
					{
						$("#kid2-sport-convinced").val("Non");
						$("#kid2-sport-convinced").addClass("danger-input");
					}
					$("#kid2-sport-price").val(result.price_sport+" DT"); // Set Sport Price
				}
			});
		}
	});
});

// Confirm Add kid 2 Sport Button
$(function()
{
	$("#confirm-kid2-sport-add-btn").click(function()
	{
		// If kid2 didn't choose an option
		if ($("#kid2-search-sports").val() == "")
		{
			$("#kid2-search-sports").css("border","1px solid red"); // Display Search's Input Error
			$("#invalid-choosing-sport-kid2").show(); // Display Invalid Sport Error
		}
		else
		{
			$("#kid2-search-sports").css("border","1px solid #999"); // Hide Search's Input Error
			$("#invalid-choosing-sport-kid2").hide(); // Hide Invalid Sport Error

			if ($("#kid2-sport-start-period").val() == "") // If kid 2 didn't fill Start Period Sport Input
			{
				$("#kid2-sport-start-period").css("border","1px solid red"); // Display Date's Input Error
				$("#necessary-sport-start-period-kid2").show(); // Display Necessary Error
			}
			else
			{
				$("#kid2-sport-start-period").css("border","1px solid #999"); // Hide Date's Input Error
				$("#necessary-sport-start-period-kid2").hide(); // Hide Necessary Error

				var sport = $("#kid2-search-sports").val(); // Get Sport ID
				var period = $("#kid2-sport-period").val(); // Get Sport Period
				var start_period = $("#kid2-sport-start-period").val(); // Get Sport Start Period
				// Splitting Sport Start Period Date
				var start_period_day = new Date(start_period).getDate(); // Get Sport Start Day Period
				var start_period_month = new Date(start_period).getMonth()+1; // Get Sport Start Month Period
				var start_period_year = new Date(start_period).getFullYear(); // Get Sport Start Year Period

				start_period = new Date(start_period);
				var end_period = new Date();

				var price; // Calculate Sport Price per month
				// Set Sport End Period and Sport Price
				switch (period)
				{
					case "1 mois": end_period = end_period.setTime(start_period.getTime()+30*24*60*60*1000); price = 1; break;
					case "3 mois": end_period = end_period.setTime(start_period.getTime()+90*24*60*60*1000); price = 3; break;
					case "6 mois": end_period = end_period.setTime(start_period.getTime()+180*24*60*60*1000); price = 6; break;
					case "1 ans": end_period = end_period.setTime(start_period.getTime()+365*24*60*60*1000); price = 12; break;
				}
				var end_period_day = new Date(end_period).getDate(); // Get Sport End Day Period
				var end_period_month = new Date(end_period).getMonth()+1; // Get Sport End Month Period
				var end_period_year = new Date(end_period).getFullYear(); // Get Sport End Year Period
				
				// Change Format for DATABASE
				start_period = start_period_year+"-"+start_period_month+"-"+start_period_day;
				end_period = end_period_year+"-"+end_period_month+"-"+end_period_day;

				$.ajax
				({
					type: "POST",
					dataType: "text",
					url: "../php/addsport.php",
					data: {user: 'kid2', sport: sport, period: period, start: start_period, end: end_period, price: price},
					success: function(result)
					{
						switch (result)
						{
							case "HhCm7rshxx": // Member Doesn't Exists, Need to be Added First
								$("#spouse-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Aucun Enfant trouvé, Veuillez d'abord ajouter");
							break;
							
							case "FRLr9kTFyM": // Already Registered to a Gym at that time
								$("#kid2-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("vous êtes déjà inscrit");
							break;
							case "AtTNzHrs3P": // Sport Added Successfully
								$("#kid2-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["success"]("vous êtes maintenant inscrit");
							break;
							case "Epzr9JvY4M": // Error Adding Sport
								$("#kid2-add").hide();
								toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
								toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
							break;
						}
					}
				});
			}
		}
	});
});

// Employee Cancel Sport Inscription
$(function()
{
	// We can't add events to dynamique elements so we use on click because of live method in jQuery
	$("#user-inscript").on("click","#user-sport-cancel-btn",function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "../php/user.php",
			data: {},
			success: function(result)
			{
				if (result != "")
				{
					$("#user-sport-cancel").slideDown();
				}
				else
				{
					$("#user-sport-cancel").slideUp();
				}
			}
		});
		
		$("#cancel-user-sport-cancel-btn").click(function()
		{
			$("#user-sport-cancel").slideUp();
		});

		$("#confirm-user-sport-cancel-btn").click(function()
		{
			var today = new Date(); // Get Today's Date
			var today_day = today.getDate(); // Get Today's Day
			var today_month = today.getMonth()+1; // Get Today's Month
			var today_year = today.getFullYear(); // Get Today's Year
			today = today_year+"-"+today_month+"-"+today_day;
			$.ajax
			({
				type: "POST",
				dataType: "text",
				url: "../php/cancelsport.php",
				data: {user: 'user', suspended: today},
				success: function(result)
				{
					if (result == "AtTNzHrs3P") // Updated Successfully
					{
						$("#user-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Votre Inscription à ètè suspendu");
					}
					else // There was an error Updating
					{
						$("#user-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					}
				}
			});
		});
	});
});

// Spouse Cancel Sport Inscription
$(function()
{
	// We can't add events to dynamique elements so we use on click because of live method in jQuery
	$("#user-inscript").on("click","#spouse-sport-cancel-btn",function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "../php/spouse.php",
			data: {},
			success: function(result)
			{
				if (result != "")
				{
					$("#spouse-sport-cancel").slideDown();
				}
				else
				{
					$("#spouse-sport-cancel").slideUp();
				}
			}
		});

		$("#cancel-spouse-sport-cancel-btn").click(function()
		{
			$("#spouse-sport-cancel").slideUp();
		});

		$("#confirm-spouse-sport-cancel-btn").click(function()
		{
			var today = new Date(); // Get Today's Date
			var today_day = today.getDate(); // Get Today's Day
			var today_month = today.getMonth()+1; // Get Today's Month
			var today_year = today.getFullYear(); // Get Today's Year
			today = today_year+"-"+today_month+"-"+today_day;
			$.ajax
			({
				type: "POST",
				dataType: "text",
				url: "../php/cancelsport.php",
				data: {user: 'spouse', suspended: today},
				success: function(result)
				{
					if (result == "AtTNzHrs3P") // Updated Successfully
					{
						$("#spouse-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Votre Inscription à ètè suspendu");
					}
					else // There was an error Updating
					{
						$("#spouse-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					}
				}
			});
		});
	});
});

// Kid 1 Cancel Sport Inscription
$(function()
{
	// We can't add events to dynamique elements so we use on click because of live method in jQuery
	$("#user-inscript").on("click","#kid1-sport-cancel-btn",function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "../php/kid1.php",
			data: {},
			success: function(result)
			{
				if (result != "")
				{
					$("#kid1-sport-cancel").slideDown();
				}
				else
				{
					$("#kid1-sport-cancel").slideUp();
				}
			}
		});

		$("#cancel-kid1-sport-cancel-btn").click(function()
		{
			$("#kid1-sport-cancel").slideUp();
		});

		$("#confirm-kid1-sport-cancel-btn").click(function()
		{
			var today = new Date(); // Get Today's Date
			var today_day = today.getDate(); // Get Today's Day
			var today_month = today.getMonth()+1; // Get Today's Month
			var today_year = today.getFullYear(); // Get Today's Year
			today = today_year+"-"+today_month+"-"+today_day;
			$.ajax
			({
				type: "POST",
				dataType: "text",
				url: "../php/cancelsport.php",
				data: {user: 'kid1', suspended: today},
				success: function(result)
				{
					if (result == "AtTNzHrs3P") // Updated Successfully
					{
						$("#kid1-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Votre Inscription à ètè suspendu");
					}
					else // There was an error Updating
					{
						$("#kid1-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					}
				}
			});
		});
	});
});

// Kid 2 Cancel Sport Inscription
$(function()
{
	// We can't add events to dynamique elements so we use on click because of live method in jQuery
	$("#user-inscript").on("click","#kid2-sport-cancel-btn",function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "../php/kid2.php",
			data: {},
			success: function(result)
			{
				if (result != "")
				{
					$("#kid2-sport-cancel").slideDown();
				}
				else
				{
					$("#kid2-sport-cancel").slideUp();
				}
			}
		});

		$("#cancel-kid2-sport-cancel-btn").click(function()
		{
			$("#kid2-sport-cancel").slideUp();
		});

		$("#confirm-kid2-sport-cancel-btn").click(function()
		{
			var today = new Date(); // Get Today's Date
			var today_day = today.getDate(); // Get Today's Day
			var today_month = today.getMonth()+1; // Get Today's Month
			var today_year = today.getFullYear(); // Get Today's Year
			today = today_year+"-"+today_month+"-"+today_day;
			$.ajax
			({
				type: "POST",
				dataType: "text",
				url: "../php/cancelsport.php",
				data: {user: 'kid2', suspended: today},
				success: function(result)
				{
					if (result == "AtTNzHrs3P") // Updated Successfully
					{
						$("#kid2-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Votre Inscription à ètè suspendu");
					}
					else // There was an error Updating
					{
						$("#kid2-sport-cancel").hide();
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					}
				}
			});
		});
	});
});

// Display Employee Sport History
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/sporthistory.php",
		data: {user: "user"},
		success: function(result)
		{
			if (result != "")
			{
				var len = result.length;

				for (var i = 0 ; i < len ; i++)
				{
					var suspended = result[i].suspended;
					var paid = result[i].paid;

					if (suspended == '0')
					{
						suspended = "<td class='success-input'>Non</td>";
					}
					else
					{
						suspended = "<td class='danger-input'>Oui</td>";
					}


					if (paid == 'N')
					{
						paid = "<td class='danger-input'>Non Payé</td>";
					}
					else
					{
						paid = "<td class='success-input'>Payé</td>";
					}

					$("#user-sport-history table tbody").append("<tr><td>"+result[i].name_sport+"</td><td>"+result[i].period+"</td><td>"+result[i].period_start+"</td><td>"+result[i].period_end+"</td>"+suspended+paid+"</tr>");
				}
			}

		}
	});
});

// Display Spouse Sport History
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/sporthistory.php",
		data: {user: "spouse"},
		success: function(result)
		{
			if (result != "")
			{
				var len = result.length;

				for (var i = 0 ; i < len ; i++)
				{
					var suspended = result[i].suspended;
					var paid = result[i].paid;

					if (suspended == '0')
					{
						suspended = "<td class='success-input'>Non</td>";
					}
					else
					{
						suspended = "<td class='danger-input'>Oui</td>";
					}


					if (paid == 'N')
					{
						paid = "<td class='danger-input'>Non Payé</td>";
					}
					else
					{
						paid = "<td class='success-input'>Payé</td>";
					}

					$("#spouse-sport-history table tbody").append("<tr><td>"+result[i].name_sport+"</td><td>"+result[i].period+"</td><td>"+result[i].period_start+"</td><td>"+result[i].period_end+"</td>"+suspended+paid+"</tr>");
				}
			}

		}
	});
});

// Display Kid 1 Sport History
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/sporthistory.php",
		data: {user: "kid1"},
		success: function(result)
		{
			if (result != "")
			{
				var len = result.length;

				for (var i = 0 ; i < len ; i++)
				{
					var suspended = result[i].suspended;
					var paid = result[i].paid;

					if (suspended == '0')
					{
						suspended = "<td class='success-input'>Non</td>";
					}
					else
					{
						suspended = "<td class='danger-input'>Oui</td>";
					}


					if (paid == 'N')
					{
						paid = "<td class='danger-input'>Non Payé</td>";
					}
					else
					{
						paid = "<td class='success-input'>Payé</td>";
					}

					$("#kid1-sport-history table tbody").append("<tr><td>"+result[i].name_sport+"</td><td>"+result[i].period+"</td><td>"+result[i].period_start+"</td><td>"+result[i].period_end+"</td>"+suspended+paid+"</tr>");
				}
			}

		}
	});
});

// Display Kid 2 Sport History
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/sporthistory.php",
		data: {user: "kid2"},
		success: function(result)
		{
			if (result != "")
			{
				var len = result.length;

				for (var i = 0 ; i < len ; i++)
				{
					var suspended = result[i].suspended;
					var paid = result[i].paid;

					if (suspended == '0')
					{
						suspended = "<td class='success-input'>Non</td>";
					}
					else
					{
						suspended = "<td class='danger-input'>Oui</td>";
					}


					if (paid == 'N')
					{
						paid = "<td class='danger-input'>Non Payé</td>";
					}
					else
					{
						paid = "<td class='success-input'>Payé</td>";
					}

					$("#kid2-sport-history table tbody").append("<tr><td>"+result[i].name_sport+"</td><td>"+result[i].period+"</td><td>"+result[i].period_start+"</td><td>"+result[i].period_end+"</td>"+suspended+paid+"</tr>");
				}
			}

		}
	});
});

// Logout Button
$(function ()
{
	$(".logout-btn").click(function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../../php/logout.php",
			data: {},
			success: function()
			{
				window.location.href="../../";
			}
		});
	});
});

// Return True if DATA is NULL
function isNULL(data)
{
	if ((data == null) || (data == "")) {return true}

	return false;
}

// Calculating Difference between 2 Dates in Days
function differenceDates(start, end)
{
	date_start = new Date(start);
	date_end = new Date(end);
	return Math.floor((Date.UTC(date_end.getFullYear(), date_end.getMonth(), date_end.getDate()) - Date.UTC(date_start.getFullYear(), date_start.getMonth(), date_start.getDate()) ) /(1000 * 60 * 60 * 24));
}

function availableDays(data)
{
	var available = "";

	switch(data.charAt(0))
	{
		case "1": available+="Dimanche"; break;
		case "2": available+="Lundi"; break;
		case "3": available+="Mardi"; break;
		case "4": available+="Mercredi"; break;
		case "5": available+="Jeudi"; break;
		case "6": available+="Vendredi"; break;
		case "7": available+="Samedi"; break;
	}

	for (var i = 1; i <= data.length; i++)
	{
		switch (data.charAt(i))
		{
			case "1": available+=" et Dimanche"; break;
			case "2": available+=" et Lundi"; break;
			case "3": available+=" et Mardi"; break;
			case "4": available+=" et Mercredi"; break;
			case "5": available+=" et Jeudi"; break;
			case "6": available+=" et Vendredi"; break;
			case "7": available+=" et Samedi"; break;
		}
	}
	return available;
}

// Sport Tag
function sport_tag(data)
{
	switch (data)
	{
		case "M": return "Hommes";break;
		case "F": return "Femmes";break;
		case "KM": return "Enfants"; break;
		case "KF": return "Enfants"; break;
	}
};

// Display if Sport is Convinced or not
function sport_convinced(data)
{
	switch (data)
	{
		case "0": return "Conventionné";break;
		case "1": return "Non Conventionné";break;
	}
};

// If Input is Empty Display Input's Error and Empty Fields Error
function Empty(input_value,input,error)
{
	if (input_value == "")
	{
		// Display Input Error
		$(input).css("border","1px solid red");
		// Display Necessary Input Error
		$(error).show();
	}
}