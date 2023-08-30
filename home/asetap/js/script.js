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

				case "EngNtHvr3F": // The user is an ETAP Admin
					window.location.href="../etap/";
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
						proposed = "<td><input id='"+result[i].id_sport+"' class='uk-input uk-width-small asetap-proposed' type='number' value='0' key='"+result[i].year+"'> DT </td>";
					}
					else
					{
						proposed = "<td><input id='"+result[i].id_sport+"' class='uk-input uk-width-small asetap-proposed' type='number' value='"+result[i].proposed+"' key='"+result[i].year+"'> DT </td>";
					}
					if (result[i].agreed == null)
					{
						agreed = "<td><input class='uk-input uk-width-small etap-proposed' type='number' value='0' key='"+result[i].year+"' readonly> DT </td>";
					}
					else
					{
						agreed = "<td><input class='uk-input uk-width-small etap-proposed' type='number' value='"+result[i].agreed+"' key='"+result[i].year+"' readonly> DT </td>";
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

					$("#asetap #budget table tbody").append("<tr>"+sport+proposed+agreed+year+done+"</tr>");
				}
			}
		}
	});

	var today = new Date();

	$("#year-sport").attr("min",today.getFullYear()-1);
	$("#year-sport").attr("max",today.getFullYear()+1);

	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/allsport.php",
		data: {},
		success: function(result)
		{
			if (result != "Rbd7ca7tsx")
			{
				var len = result.length;

				for (var i = 0; i < len; i++)
				{
					$("#asetap #budget #sports-result").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>");
				}
			}
		}
	});

	$("#add-propose-sport").click(function()
	{
		var sport = $("#asetap #budget #sports-result").val();
		var year = $("#asetap #budget #year-sport").val();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/asetapbudget.php",
			data: {sport: sport, year: year},
			success: function(result)
			{
				if (result == "KtTNzHrs3P")
				{
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
					toastr["success"]("Proposition Ajouté avec suuccés");
				}
				else
				{
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
					toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
				}
			}
		});
	});

	$("#asetap #budget").on("change",".asetap-proposed",function()
	{
		var sport = $(this).attr("id");
		var budget = $(this).val();
		var year = $(this).attr("key");

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/setasetapbudget.php",
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

// Switch Between Sport Settings
$(function()
{
	$("#admin-sport-add-btn").click(function()
	{
		$("#admin-sport-edit").hide(); // Hide Edit Form
		$("#admin-sport-delete").hide(); // Hide Delete Form
		$("#admin-sport-add").show(); // Display Add Form
	});

	$("#admin-sport-edit-btn").click(function()
	{
		$("#admin-sport-add").hide(); // Hide Add Form
		$("#admin-sport-delete").hide(); // Hide Delete Form
		$("#admin-sport-edit").show(); // Display Edit Form
	});

	$("#admin-sport-delete-btn").click(function()
	{
		$("#admin-sport-add").hide(); // Hide Add Form
		$("#admin-sport-edit").hide(); // Hide Edit Form
		$("#admin-sport-delete").show(); // Display Delete Form
	});
})

// Admin Add Sport
$(function()
{
	$("#confirm-admin-add-sport-btn").click(function()
	{
		var name = $("#admin-add-sport-name").val();
		var address = $("#admin-add-sport-address").val();

		var dispo = "";
		$("input[name='add-available']:checked").each(function()
		{
			dispo = dispo + this.value;
		});

		var start = $("#admin-add-sport-start").val();
		start = start + ":00";
		var end = $("#admin-add-sport-end").val();
		end = end + ":00";

		var tag = $("input[name='add-tag']:checked").val();

		var convinced = $("input[name='add-convinced']:checked").val();

		var price = $("#admin-add-sport-price").val();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/adminaddsport.php",
			data: {name: name, address: address, dispo: dispo, start: start, end: end, tag: tag, convinced: convinced, price: price},
			success: function(result)
			{
				if (result == "HhCm7rshxx")
				{
					toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
					toastr["error"]("Remplir tous les Champs");
				}
				else
				{
					if (result == "Epzr9JvY4M")
					{
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
					}
					else
					{
						toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
						toastr["success"]("Sport Ajouté avec Succées");
					}
				}
			}
		});
	});
});

// Admin Edit Sport
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/allsport.php",
		data: {},
		success: function(result)
		{
			if (result != "Rbd7ca7tsx")
			{
				var len = result.length;

				for (var i = 0 ; i< len ; i++)
				{
					$("#asetap #app-settings #admin-edit-sport-name").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>")
				}

				$("#admin-edit-sport-name").change(function()
				{
					$.ajax
					({
						type: "POST",
						dataType: "json",
						url: "../php/sportsdetails.php",
						data: {sport: $("#admin-edit-sport-name").val()},
						success: function(result)
						{
							$("#admin-edit-sport-address").val(result.address_sport);
							$("#admin-edit-sport-start").val(result.start_sport);
							$("#admin-edit-sport-end").val(result.end_sport);
							$("#admin-edit-sport-price").val(result.price_sport);

							// Update Sport
							$("#confirm-admin-edit-sport-btn").click(function()
							{
								var address = $("#admin-edit-sport-address").val();

								var dispo = "";
								$("input[name='edit-available']:checked").each(function()
								{
									dispo = dispo + this.value;
								});

								var start = $("#admin-edit-sport-start").val();
								start = start + ":00";
								var end = $("#admin-edit-sport-end").val();
								end = end + ":00";

								var tag = $("input[name='edit-tag']:checked").val();

								var convinced = $("input[name='edit-convinced']:checked").val();

								var price = $("#admin-edit-sport-price").val();

								$.ajax
								({
									type: "POST",
									dataType: "text",
									url: "../php/adminupdatesport.php",
									data: {id: $("#admin-edit-sport-name").val(), address: address, dispo: dispo, start: start, end: end, tag: tag, convinced: convinced, price: price},
									success: function(result)
									{
										if (result == "HhCm7rshxx")
										{
											toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
											toastr["error"]("Remplir tous les Champs");
										}
										else
										{
											toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
											toastr["success"]("Sport est mis à jour avec Succées");
										}
									}
								});
							});
						}
					});
				});
			}
		}
	});
});

// Admin Delete Sport
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/allsport.php",
		data: {},
		success: function(result)
		{
			if (result != "Rbd7ca7tsx")
			{
				var len = result.length;

				for (var i = 0 ; i< len ; i++)
				{
					$("#asetap #app-settings #admin-delete-sport-name").append("<option value='"+result[i].id_sport+"'>"+result[i].name_sport+"</option>")
				}
			}

			$("#admin-delete-sport-name").change(function()
			{
				$.ajax
				({
					type: "POST",
					dataType: "json",
					url: "../php/sportsdetails.php",
					data: {sport: $("#admin-delete-sport-name").val()},
					success: function(result)
					{
						$("#admin-delete-sport-address").val(result.address_sport);
					}
				});
			});

			// Delete Sport
			$("#confirm-admin-delete-sport-btn").click(function()
			{
				$.ajax
				({
					type: "POST",
					dataType: "text",
					url: "../php/admindeletesport.php",
					data: {id: $("#admin-delete-sport-name").val()},
					success: function(result)
					{
						if (result == "HhCm7rshxx")
						{
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard");
						}
						else
						{
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Sport Supprimé avec Succées");
						}
					}
				});	
			});
		}
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
		toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-center","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
		toastr["error"]("Aucune Donnée Trouvé");
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
			matricule = "<td>"+result[i].matricule+"</td>"; // Get Empolyee Matricule
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
				case "user": type = "<td class='membre-type' style='background-color: #2F96B4; font-weight: bold;'>Employé</td>"; break;
				case "etap": type = "<td class='membre-type' style='background-color: #F89406; font-weight: bold;'>Admin ETAP</td>"; break;
				case "asetap": type = "<td class='membre-type' style='background-color: #BD362F; font-weight: bold;'>Admin ASETAP</td>"; break;
			}

			$("#etap-members table tbody").append("<tr>"+matricule+user+spouse+kid1+kid2+type+"</tr>");
		}
	}
}