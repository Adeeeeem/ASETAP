// Preloader
$(window).on("load",function()
{
	$("#status").fadeOut();
	$("#preloader").delay(500).fadeOut("slow");
});

// If user is already connected take him to Home Page
$(function ()
{
	$.ajax
	({
		type: "POST",
		dataType: "text",
		url: "php/session.php",
		data: {},
		success: function(result)
		{
			switch (result)
			{
				case "UeqcPggTJ9": // Normal User
					window.location.href="home/user/";
				break;

				case "EngNtHvr3F": // ETAP Admin
					window.location.href="home/etap/";
				break;

				case "Ax94PTTP3E": // ASETAP Admin
					window.location.href="home/asetap/";
				break;
			}
		}
	});
});

// Switch between Sign in and Sign up
$(function()
{
	$("#new-user-btn").click(function()
	{
		$("#signin").hide(); // Hide Sign in Form
		$("#signup").show(); // Display Sign in Form
	});

	$("#already-user-btn").click(function()
	{
		$("#signup").hide(); // Hide Sign in Form
		$("#signin").show(); // Display Sign in Form
	});
});

// Show & Hide Password
$(function()
{
	// Hide/Show Sign in Password
	$("#signin-password-btn").click(function()
	{
		if ($("#signin-password-icon").attr("uk-icon")=="icon: lock")
		{
			$("#signin-password-icon").attr("uk-icon","icon: unlock");
			$("#signin-password").attr("type","text");
			$("#signin-show-password").html("Masquer le mot de passe");
		}
		else
		{
			$("#signin-password-icon").attr("uk-icon","icon: lock");
			$("#signin-password").attr("type","password");
			$("#signin-show-password").html("Afficher le mot de passe");
		}
	});

	// Hide/Show Sign up Password
	$("#signup-password-btn").click(function()
	{
		if ($("#signup-password-icon").attr("uk-icon")=="icon: lock")
		{
			$("#signup-password-icon").attr("uk-icon","icon: unlock");
			$("#signup-password").attr("type","text");
			$("#signup-show-password").html("Masquer le mot de passe");
		}
		else
		{
			$("#signup-password-icon").attr("uk-icon","icon: lock");
			$("#signup-password").attr("type","password");
			$("#signup-show-password").html("Afficher le mot de passe");
		}
	});
});

// Sign in Chech points
$(function ()
{
	$("#signin-btn").click(function(e)
	{
		var login = $("#signin-login");
		var password = $("#signin-password");
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "php/signin.php",
			data: {login: login.val(), password: password.val()},
			success: function(result)
			{
				switch (result)
				{
					case "FpbzxVzEr4": // User Not Found
						// Display Login's Input Error
						$("#signin-login").css("border","1px solid red");
						// Display Login's Message Error
						$("#invalid-signin-login").show();

						// Empty the Login's Input
						$("#signin-login").val("");

						// Display Password's Input Error
						$("#signin-password").css("border","1px solid red");
						// Display Password's Message Error
						$("#invalid-signin-password").show();

						// Empty the Password's Input
						$("#signin-password").val("");
					break;

					case "PpwzhN4yV7": // Password is Incorrect
						// Hide Login's Input Error
						$("#signin-login").css("border","1px solid #999");
						// Hide Login's Message Error
						$("#invalid-signin-login").hide();

						// Display Password's Input Error
						$("#signin-password").css("border","1px solid red");
						// Display Password's Message Error
						$("#invalid-signin-password").show();

						// Empty the Password's Input
						$("#signin-password").val("");
					break;

					case "UeqcPggTJ9": // Normal User
						window.location.href="home/user/";
					break;

					case "EngNtHvr3F": // ETAP Admin
						window.location.href="home/etap/";
					break;

					case "Ax94PTTP3E": // ASETAP Admin
						window.location.href="home/asetap/";
					break;
				}
			}
		});
	});
});

// Sign up Chech points
$(function ()
{
	$("#signup-btn").click(function(e)
	{
		var matricule = $("#signup-matricule");
		var login = $("#signup-login");
		var fname = $("#signup-fname");
		var lname = $("#signup-lname");
		var password = $("#signup-password");
		var gender = $("input[name='gender']:checked");
		var email = $("#signup-email");

		// Check each field if Empty
		Empty(matricule.val(),matricule,"#signup-matricule-necessary"); // Display Matricule Error if Matricule is Empty
		Empty(login.val(),login,"#signup-login-necessary"); // Display Username Error if Login is Empty
		Empty(fname.val(),fname,"#signup-fname-necessary"); // Display First Name Error if First Name is Empty
		Empty(lname.val(),lname,"#signup-lname-necessary"); // Display Last Name Error if Last Name is Empty
		Empty(password.val(),password,"#signup-password-necessary"); // Display Password Error if Password is Empty
		Empty(email.val(),email,"#signup-email-necessary"); // Display Email Error if Email is Empty

		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "php/signup.php",
			data: {matricule: matricule.val(), login: login.val(), fname: fname.val(), lname: lname.val(), password: password.val(), gender: gender.val(), email: email.val()},
			success: function(result)
			{
				switch (result)
				{
					case "BraTz4qwht": // All Fields are Empty
						// Hide All Error
						ResetAllErrors();

						// Display each Input's Error
						InputError(matricule,"#signup-matricule-necessary"); // Display Matricule Error
						InputError(login,"#signup-login-necessary"); // Display Username Error
						InputError(fname,"#signup-fname-necessary"); // Display First Name Error
						InputError(lname,"#signup-lname-necessary"); // Display Last Name Error
						InputError(password,"#signup-password-necessary"); // Display Password Error
						InputError(email,"#signup-email-necessary"); // Display Email Error

						// DIsplay Empty Fields Error
						$("#invalid-signup-empty-fields").show();
					break;

					case "JyqryrC9KT": // Employee Doesn't Exist!
						// Hide All Error
						ResetAllErrors();

						// Display Matricule Error
						InputError(matricule,"");

						// Display Not an ETAP Employee Error
						$("#invalid-signup-not-employee").show();
					break;

					case "Mv3J7jhKcH": // User Already Registered
						// Hide All Error
						ResetAllErrors();

						// Display Username Error
						InputError(matricule,"");

						// Display Already Registered Error
						$("#invalid-signup-already-registered").show();
					break;

					case "TemzkLYV4U": // Username Already Taken
						// Hide All Error
						ResetAllErrors();

						// Display Username Error
						InputError(login,"#signup-login-taken");

						// Display Already Registered Error
						$("#invalid-signup-login-taken").show();
					break;

					case "Gb4jEHdgv7": // Error Adding user
						// Hide All Error
						ResetAllErrors();

						// Display Bug Error Error
						$("#invalid-signup-error").show();
					break;

					case "SdYhfj93co": // Success
						window.location.href="home/user/";
					break;
				}
			}
		});
	});
});

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

// Display Input's error
function InputError(input,error)
{
	// Display Input Error
	$(input).css("border","1px solid red");
	// Display Necessary Input Error
	$(error).show();
}

// Reset All Sign up Errors
function ResetAllErrors()
{
	$("#signup-matricule").css("border","1px solid #999"); // Hide Matricule Input Error
	$("#signup-login").css("border","1px solid #999"); // Hide Username Input Error
	$("#signup-fname").css("border","1px solid #999"); // Hide First Name Input Error
	$("#signup-lname").css("border","1px solid #999"); // Hide Last Name Input Error
	$("#signup-password").css("border","1px solid #999"); // Hide Password Input Error
	$("#signup-email").css("border","1px solid #999"); // Hide Email Input Error

	$("#signup-matricule-necessary").hide(); // Hide Matricule Error if Matricule is Empty
	$("#signup-login-necessary").hide(); // Hide Username Error if Login is Empty
	$("#signup-fname-necessary").hide(); // Hide First Name Error if First Name is Empty
	$("#signup-lname-necessary").hide(); // Hide Last Name Error if Last Name is Empty
	$("#signup-password-necessary").hide(); // Hide Password Error if Password is Empty
	$("#signup-email-necessary").hide(); // Hide Email Error if Email is Empty

	$("#invalid-signup-empty-fields").hide(); // Hide Empty Fields Error
	$("#invalid-signup-not-employee").hide(); // Hide Not an ETAP Employee Error
	$("#invalid-signup-already-registered").hide(); // Hide Already Registered Error
	$("#invalid-signup-login-taken").hide(); // Hide Username Already Taken Error
	$("#invalid-signup-error").hide(); // Hide Bug Error
}