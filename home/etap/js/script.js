// Preloader
$(window).on("load",function()
{
	$("#status").fadeOut();
	$("#preloader").delay(500).fadeOut("slow");
});

// If User tries to access home page without login in, it will redirect him to the first page
$(function ()
{
	$.ajax
	({
		type: "POST",
		dataType: "text",
		url: "../../php/session.php",
		data: {},
		success: function(result)
		{
			switch (result)
			{
				case "FJCRgVa9V9": // User not Logged in
					window.location.href="../../";
				break;

				case "UeqcPggTJ9": // The user is a Normal User
					window.location.href="../user/";
				break;

				case "Ax94PTTP3E": // The user is an ASETAP Admin
					window.location.href="../asetap/";
				break;
			}
		}
	});
});

// Load All Members on Window Load
$(function()
{
	LoadAll();
});

// Search Members
$(function()
{
	$("#member-search-btn").click(function()
	{
		var input = $("#member-search").val();
		var type = $("#type").val();

		switch (type)
		{
			case "all": LoadAll(); break;
			case "matricule": // Search By Matricule
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/membersmatricule.php",
					data: {matricule: input},
					success: function(result)
					{
						LoadMembers(result);
					}
				});
			break;
			case "name": // Search By Employee's First Name
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/membersname.php",
					data: {name: input},
					success: function(result)
					{
						LoadMembers(result);
					}
				});
			break;
			case "user": // Search By Employee's Type
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/memberstype.php",
					data: {user: "user"},
					success: function(result)
					{
						LoadMembers(result);
					}
				});
			break;
			case "etap": // Search By Employee's Type
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/memberstype.php",
					data: {user: "etap"},
					success: function(result)
					{
						LoadMembers(result);
					}
				});
			break;
			case "asetap": // Search By Employee's Type
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/memberstype.php",
					data: {user: "asetap"},
					success: function(result)
					{
						LoadMembers(result);
					}
				});
			break;
		}
	});
});

// Change Members Type
$(function()
{
	$("#etap #etap-members").on("click",".change-type-btn",function()
	{
		var matricule = $(this).attr("id");
		
		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "../php/employeedetails.php",
			data: {matricule: matricule},
			success: function(result)
			{
				if (result.statut == "Tk3BnS79sE")
				{
					$("#etap #etap-change-type .uk-modal-title span").html(result.user_first_name +" "+ result.user_last_name);
				
					// Confirm Employee Type Change
					$(function()
					{
						$("#etap #confirm-change-type").click(function()
						{
							var type = $("#etap #etap-change-type select").val();
							
							$.ajax
							({
								type: "POST",
								dataType: "text",
								url: "../php/changerole.php",
								data: {matricule: matricule, type: type},
								success: function(result)
								{
									if (result == "AtTNzHrs3P")
									{
										toastr["success"]("Rôle Changé avec Succées");
										toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
									}
									else
									{
										toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
										toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
									}
								}
							});
						});
					});
				}
			}
		});
	});
});

// Members Paiement
$(function()
{
	EmpolyeePaiement();
});

// Members's Spouse Paiement
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/loadmembersfamilynotpaid.php",
		data: {type: "spouse"},
		success: function(result)
		{
			LoadConjoint(result);
		}
	});
});

// Members's Kid 1 Paiement
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/loadmembersfamilynotpaid.php",
		data: {type: "kid1"},
		success: function(result)
		{
			LoadKid1(result);
		}
	});
});

// Members's Kid 2 Paiement
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/loadmembersfamilynotpaid.php",
		data: {type: "kid2"},
		success: function(result)
		{
			LoadKid2(result);
		}
	});
});

// Confirm Paiemnt
$(function()
{
	$("#etap #app-settings").on("click",".paid-member",function()
	{
		var matricule = $(this).attr("id");
		var type = $(this).attr("key");
		var value = $(this).prop("value");
		value = value.split("/");
		var start = value[0];
		var end = value[1];
		
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/paid.php",
			data: {matricule: matricule, type: type, start: start, end: end},
			success: function(result)
			{
				if (result == "AtTNzHrs3P")
				{
					toastr["success"]("Paiement Changé avec Succées");
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
				}
				else
				{
					toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
				}
			}
		});
	});
});

$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/budget.php",
		data: {},
		success: function(result)
		{
			if (result != "")
			{
				var sport;
				var proposed;
				var agreed;
				var year;
				var done;

				var len = result.length;

				for (var i = 0; i < len; i++)
				{
					sport = "<td>"+result[i].name_sport+"</td>";
					if (result[i].proposed == null)
					{
						proposed = "<td><input class='uk-input uk-width-small asetap-proposed' type='number' value='0' key='"+result[i].year+"' readonly> DT </td>";
					}
					else
					{
						proposed = "<td><input class='uk-input uk-width-small asetap-proposed' type='number' value='"+result[i].proposed+"' key='"+result[i].year+"' readonly> DT </td>";
					}
					if (result[i].agreed == null)
					{
						agreed = "<td><input id='"+result[i].id_sport+"' class='uk-input uk-width-small etap-proposed' type='number' value='0' key='"+result[i].year+"'> DT </td>";
					}
					else
					{
						agreed = "<td><input id='"+result[i].id_sport+"' class='uk-input uk-width-small etap-proposed' type='number' value='"+result[i].agreed+"' key='"+result[i].year+"'> DT </td>";
					}
					year = "<td>"+result[i].year+"</td>";

					if (result[i].done == 'Y')
					{
						done = "<td class='success-input'>Oui</td>";
					}
					else
					{
						done = "<td class='danger-input'>Non</td>";
					}

					$("#etap #budget table tbody").append("<tr>"+sport+proposed+agreed+year+done+"</tr>");
				}
			}
		}
	});

	$("#etap #budget").on("change",".etap-proposed",function()
	{
		var sport = $(this).attr("id");
		var budget = $(this).val();
		var year = $(this).attr("key");

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/setetapbudget.php",
			data: {sport: sport, year: year, budget: budget},
			success: function(result)
			{
				if (result == "KtTNzHrs3P")
				{
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
					toastr["success"]("Mis à Jour avec suuccés");
				}
			}
		});
	});
});

// Load all Members
function LoadAll()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/members.php",
		data: {},
		success: function(result)
		{
			LoadMembers(result);
		}
	});
};

function LoadMembers(result)
{	
	if (result.statut == "Rbd7ca7tsx")
	{
		toastr["error"]("Aucune Donnée Trouvé");
		toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
	}
	else
	{
		// Clear Table
		$("#etap-members table tbody > tr").remove();

		// Clear the input field
		$("#member-search").val("");

		var len = result.length;

		var matricule;
		var user;
		var spouse;
		var kid1;
		var kid2;
		var type;

		for (var i = 0 ; i < len ; i++)
		{
			matricule = result[i].matricule; // Get Empolyee Matricule
			user = "<td>"+result[i].user_fname+" "+result[i].user_lname+"</td>"; // Get Employee Full Name

			if (isNULL(result[i].spouse_fname)) // If No Spouse Found Display " - "
			{
				spouse = "<td>-</td>";
			}
			else
			{
				spouse = "<td>"+result[i].spouse_fname+" "+result[i].spouse_lname+"</td>"; // Get Employee's Spouse Full Name
			}

			if (isNULL(result[i].kid1_fname)) // If No Kid 1 Found Display " - "
			{
				kid1 = "<td>-</td>";
			}
			else
			{
				kid1 = "<td>"+result[i].kid1_fname+" "+result[i].kid1_lname+"</td>"; // Get Employee's Kid 1 Full Name
			}

			if (isNULL(result[i].kid2_fname)) // If No Kid 2 Found Display " - "
			{
				kid2 = "<td>-</td>";
			}
			else
			{
				kid2 = "<td>"+result[i].kid2_fname+" "+result[i].kid2_lname+"</td>"; // Get Employee's Kid 2 Full Name
			}

			switch (result[i].user_type)
			{
				case "user": type = "<td class='membre-type' style='background-color: #2F96B4; font-weight: bold;'><button id='"+matricule+"' class='uk-button uk-button-secondary change-type-btn' href='#etap-change-type' uk-toggle>Employé</button></td>"; break;
				case "etap": type = "<td class='membre-type' style='background-color: #F89406; font-weight: bold;'><button id='"+matricule+"' class='uk-button uk-button-secondary change-type-btn' href='#etap-change-type' uk-toggle>Admin ETAP</button></td>"; break;
				case "asetap": type = "<td class='membre-type' style='background-color: #BD362F; font-weight: bold;'><button id='"+matricule+"' class='uk-button uk-button-secondary change-type-btn' href='#etap-change-type' uk-toggle>Admin ASETAP</button></td>"; break;
			}

			$("#etap-members table tbody").append("<tr><td>"+matricule+"</td>"+user+spouse+kid1+kid2+type+"</tr>");
		}
	}
}

function EmpolyeePaiement()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/loadmembersnotpaid.php",
		data: {},
		success: function(result)
		{
			if (result.statut != "Rbd7ca7tsx")
			{
				var len = result.length;

				var matricule;
				var name;
				var sport;
				var period;
				var start;
				var end;
				var price;

				for (var i = 0 ; i < len ; i++)
				{
					matricule = "<td>" + result[i].user_matricule + "</td>";
					name = "<td>" + result[i].fname + " " + result[i].lname+ "</td>";
					sport = "<td>" + result[i].name_sport + "</td>";
					period = "<td>" + result[i].period + "</td>";
					start = "<td>" + result[i].period_start + "</td>";
					end = "<td>" + result[i].period_end + "</td>";
					price = "<td>" + result[i].price + " DT</td>";

					$("#etap #app-settings table tbody").append("<tr>"+matricule+"<td>Adhérent</td>"+name+sport+period+start+end+price+"<td><button id='"+result[i].user_matricule+"' class='paid-member' key='user' value='"+result[i].period_start+"/"+result[i].period_end+"'>Confirmer</button></td></tr>");
				}
			}
		}
	});
}

function LoadConjoint(result)
{
	if (result.statut != "Rbd7ca7tsx")
	{
		var len = result.length;

		var matricule;
		var name;
		var sport;
		var period;
		var start;
		var end;
		var price;

		for (var i = 0 ; i < len ; i++)
		{
			matricule = "<td>" + result[i].user_matricule + "</td>";
			name = "<td>" + result[i].fname + " " + result[i].lname+ "</td>";
			sport = "<td>" + result[i].name_sport + "</td>";
			period = "<td>" + result[i].period + "</td>";
			start = "<td>" + result[i].period_start + "</td>";
			end = "<td>" + result[i].period_end + "</td>";
			price = "<td>" + result[i].price + " DT</td>";

			$("#etap #app-settings table tbody").append("<tr>"+matricule+"<td>Conjoint</td>"+name+sport+period+start+end+price+"<td><button id='"+result[i].user_matricule+"' class='paid-member' key='spouse' value='"+result[i].period_start+"/"+result[i].period_end+"'>Confirmer</button></td></td></tr>");
		}
	}
}

function LoadKid1(result)
{
	if (result.statut != "Rbd7ca7tsx")
	{
		var len = result.length;

		var matricule;
		var name;
		var sport;
		var period;
		var start;
		var end;
		var price;

		for (var i = 0 ; i < len ; i++)
		{
			matricule = "<td>" + result[i].user_matricule + "</td>";
			name = "<td>" + result[i].fname + " " + result[i].lname+ "</td>";
			sport = "<td>" + result[i].name_sport + "</td>";
			period = "<td>" + result[i].period + "</td>";
			start = "<td>" + result[i].period_start + "</td>";
			end = "<td>" + result[i].period_end + "</td>";
			price = "<td>" + result[i].price + " DT</td>";

			$("#etap #app-settings table tbody").append("<tr>"+matricule+"<td>Enfant 1</td>"+name+sport+period+start+end+price+"<td><button id='"+result[i].user_matricule+"' class='paid-member' key='kid1' value='"+result[i].period_start+"/"+result[i].period_end+"'>Confirmer</button></td></td></tr>");
		}
	}
}

function LoadKid2(result)
{
	if (result.statut != "Rbd7ca7tsx")
	{
		var len = result.length;

		var matricule;
		var name;
		var sport;
		var period;
		var start;
		var end;
		var price;

		for (var i = 0 ; i < len ; i++)
		{
			matricule = "<td>" + result[i].user_matricule + "</td>";
			name = "<td>" + result[i].fname + " " + result[i].lname+ "</td>";
			sport = "<td>" + result[i].name_sport + "</td>";
			period = "<td>" + result[i].period + "</td>";
			start = "<td>" + result[i].period_start + "</td>";
			end = "<td>" + result[i].period_end + "</td>";
			price = "<td>" + result[i].price + " DT</td>";

			$("#etap #app-settings table tbody").append("<tr>"+matricule+"<td>Enfant 2</td>"+name+sport+period+start+end+price+"<td><button id='"+result[i].user_matricule+"' class='paid-member' key='kid2' value='"+result[i].period_start+"/"+result[i].period_end+"'>Confirmer</button></td></td></tr>");
		}
	}
}