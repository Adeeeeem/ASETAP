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

				case "EngNtHvr3F": // The user is an ETAP Admin
					window.location.href="../etap/";
				break;

				case "Ax94PTTP3E": // The user is an ASETAP Admin
					window.location.href="../asetap/";
				break;
			}
		}
	});
});