<?php
	require_once("config.php");
	if (!isset($_SESSION["user_id"]) || $_SESSION["user_id"] == "") {
		redirect("index.php");
	}
	else if(isset($_SESSION["user_id"])) 
	{
		if(isLoginSessionExpired()) 
		{
			header("Location:logout.php?session_expired=1");
		}
		else{
			// $sqlTwo = "SELECT id, title, latest FROM project where user_id=" . $_SESSION["user_id"] . ";";
			// $stmtTwo = $DB->prepare($sqlTwo);
			// $stmtTwo->execute();
			// $borderValues = $stmtTwo->fetchAll();
			
			// echo json_encode($borderValues);
		}
	}
?>
<!DOCTYPE html>
<html class="ls-top-navbar show-sidebar sidebar-l2 sidebar-r2" lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Census Tracts</title>

	<link href="css/vendor/bootstrap.css" rel="stylesheet">
	<link href="css/vendor/font-awesome.css" rel="stylesheet">
	<link href="css/vendor/picto.css" rel="stylesheet">
	<link href="css/vendor/material-design-iconic-font.css" rel="stylesheet">
	<link href="css/vendor/datepicker3.css" rel="stylesheet">
	<link href="css/vendor/jquery.minicolors.css" rel="stylesheet">
	<link href="css/vendor/bootstrap-slider.css" rel="stylesheet">
	<link href="css/vendor/railscasts.css" rel="stylesheet">
	<link href="css/vendor/jquery-jvectormap.css" rel="stylesheet">
	<link href="css/vendor/owl.carousel.css" rel="stylesheet">
	<link href="css/vendor/slick.css" rel="stylesheet">
	<link href="css/vendor/morris.css" rel="stylesheet">
	<link href="css/vendor/ui.fancytree.css" rel="stylesheet">
	<link href="css/vendor/daterangepicker-bs3.css" rel="stylesheet">
	<link href="css/vendor/jquery.bootstrap-touchspin.css" rel="stylesheet">

	<!-- ALL APP CSS -->
	<link href="css/app/app.css" rel="stylesheet">
	<!-- /ALL APP CSS -->

	<!-- Google Fonts -->
	<link href="css/Lato.css" rel="stylesheet">
	<link href="css/Cormorant+Garamond.css" rel="stylesheet">
	<!-- /Google Fonts -->

	<!-- custom css -->
	<link href="css/dgi.css" rel="stylesheet" />
	<!-- /custom css -->

	<script type="text/javascript" src="js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="style/bootstrap-select.min.css" />
	<link rel="stylesheet" type="text/css" href="style/toastr.min.css" />
	<link rel="stylesheet" type="text/css" href="style/bootstrap-slider.min.css" />
	<link rel="stylesheet" type="text/css" href="style/jquery-ui.min.css" />

	<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<script type="text/javascript" src="js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/toastr.min.js"></script>
	<!-- Custom Coding block -->
	<script type="text/javascript" src="AppScripts/initialize.js"></script>
	
	<script type="text/javascript" src="js/main.js"></script>
	<style>
		.ui-dialog-buttonset{
			margin-right: 75px;
		}
	</style>
</head>

<body id="home-body" onload="init();">
	<div id="loadProjectModal" class="tab-pane fade in active" title="Choose a project to load or cancel for new one" style="display:none;">
		<h5> <b> Saved Projects </b> </h5>
		<select id="loadProjects" data-size="7" title="Select a saved projects" data-show-subtext="true" class="selectpicker show-tick">
		</select>
	</div>
</body>

</html>