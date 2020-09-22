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
	}
?>
<!DOCTYPE html>
<html class="ls-top-navbar show-sidebar sidebar-l2" lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>The Living Land</title>

  <!-- Vendor CSS BUNDLE
    Includes styling for all of the 3rd party libraries used with this module, such as Bootstrap, Font Awesome and others.
    TIP: Using bundles will improve performance by reducing the number of network requests the client needs to make when loading the page. -->
<!-- ALL css --
    <link href="css/vendor/all.css" rel="stylesheet">
<!-- / ALL css-->
  <!-- Vendor CSS Standalone Libraries
        NOTE: Some of these may have been customized (for example, Bootstrap).
        See: src/less/themes/{theme_name}/vendor/ directory -->
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
  <link href="css/vendor/select2.css" rel="stylesheet">

  <!-- APP CSS BUNDLE [css/app/app.css]
INCLUDES:
    - The APP CSS CORE styling required by the "music" module, also available with main.css - see below;
    - The APP CSS STANDALONE modules required by the "music" module;
NOTE:
    - This bundle may NOT include ALL of the available APP CSS STANDALONE modules;
      It was optimised to load only what is actually used by the "music" module;
      Other APP CSS STANDALONE modules may be available in addition to what's included with this bundle.
      See src/less/themes/music/app.less
TIP:
    - Using bundles will improve performance by greatly reducing the number of network requests the client needs to make when loading the page. -->

<!-- ALL APP CSS -->
  <link href="css/app/app.css" rel="stylesheet">
<!-- /ALL APP CSS -->
  
  <!-- App CSS CORE
This variant is to be used when loading the separate styling modules -->
  <!-- <link href="css/app/main.css" rel="stylesheet"> -->

  <!-- App CSS Standalone Modules
    As a convenience, we provide the entire UI framework broke down in separate modules
    Some of the standalone modules may have not been used with the current theme/module
    but ALL modules are 100% compatible -->

<!--  <link href="css/app/essentials.css" rel="stylesheet" />
  <link href="css/app/layout.css" rel="stylesheet" />
  <link href="css/app/sidebar.css" rel="stylesheet" />
  <link href="css/app/sidebar-skins.css" rel="stylesheet" />
  <link href="css/app/navbar.css" rel="stylesheet" />
  <link href="css/app/media.css" rel="stylesheet" />
  <link href="css/app/player.css" rel="stylesheet" />
  <link href="css/app/timeline.css" rel="stylesheet" />
  <link href="css/app/cover.css" rel="stylesheet" />
  <link href="css/app/chat.css" rel="stylesheet" />
  <link href="css/app/charts.css" rel="stylesheet" />
  <link href="css/app/maps.css" rel="stylesheet" />
  <link href="css/app/colors-alerts.css" rel="stylesheet" />
  <link href="css/app/colors-background.css" rel="stylesheet" />
  <link href="css/app/colors-buttons.css" rel="stylesheet" />
  <link href="css/app/colors-calendar.css" rel="stylesheet" />
  <link href="css/app/colors-progress-bars.css" rel="stylesheet" />
  <link href="css/app/colors-text.css" rel="stylesheet" />
  <link href="css/app/ui.css" rel="stylesheet" />
-->
 
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries
WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!-- If you don't need support for Internet Explorer <= 8 you can safely remove these -->
  <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- this page only -->

<!-- /this page only -->

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet">
<!-- /Google Fonts -->

<!-- custom css -->
<link href="css/dgi.css" rel="stylesheet" />
<!--
	<style>
		.sidebar.sidebar-skin-white-green.left, .navbar-header { -webkit-box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.2);	-moz-box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.2); box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.2);}
		
		.sidebar-block ul li { font-family: 'Lato', sans-serif; font-size: 18px; font-weight: bold; margin: 10px 0;}
		.sidebar-block ul li:hover { color: #5a8709;}
		.sidebar-block ul li a { text-decoration: none; color: #212121;}
		.sidebar-block ul li a:hover  { color: #5a8709;}
		
		#home-body { background-image: url(images/new/mountain-06.jpg); background-position: center center; background-repeat: no-repeat; background-size: cover; }
		body {font-family: 'Lato', sans-serif;}
		
		.topbar-items li:first-child { border-left: 1px solid #cdcdcd;}
		.topbar-items li { border-right: 1px solid #cdcdcd; color: #cdcdcd; height: 50px; line-height: 50px; padding: 0 15px;}
		.topbar-items li i { margin:0 10px; font-size: 20px;}
		.topbar-items li i:hover {color:#5a8709;}
		.topbar-items li .dropdown-toggle { display: inline-block;}
		
		.btn-inverse { background: #fff; border: 1px solid #efefef; color: #cdcdcd;}
		.btn-inverse:hover { background: #cdcdcd; color: #fff; border: 1px solid #efefef;}
		
		#sidebar-menu .sidebar-block { padding:40px;}
		
		.navbar-nav > li > a.dropdown-toggle img { max-width:45px;}
		
		/* map */
		#slides_container { right: 0; left: auto !important; top: 0; background-color: rgba(255,255,255,0.9); height: 100vh;}
		ul#navButtons { bottom:0; }
		
	</style>
<!-- /custom css -->
</head>

<body>
  
<? include '_top.php'; ?>
  
  
<? include '_sidebar.php'; ?>

  <div id="content">
    <div class="container-fluid" style="padding-left: 5px; margin-top: -15px;">
      <div class="row" data-toggle="isotope">
<!-- main content -->
				
				<div class="item col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-xs-12">
				
				<!-- wizard -->
				<h4 class="page-section-heading">Register Account</h4>
				<div class="wizard-container wizard-1" id="wizard-demo-1">
					<div data-scrollable-h>
						<ul class="wiz-progress">
							<li class="active">Location Settings</li>
							<li>Account Setup</li>
							<li>Social Profiles</li>
						</ul>
					</div>
					<form action="#" data-toggle="wizard" class="max-width-400 h-center">

						<fieldset class="step">
							<div class="page-section-heading">
								<h2 class="text-h3 margin-v-0">Location</h2>
								<h3 class="text-h4 margin-v-10 text-grey-400">This is a multi step form</h3>
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-email">Name:</label>
								<input class="form-control" type="text" id="wiz-name" placeholder="Name" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-password">City:</label>
								<input class="form-control" type="text" id="wiz-city" placeholder="City" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-password2">State:</label>
								<input class="form-control" type="text" id="wiz-state" placeholder="State" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-password2">Address:</label>
								<input class="form-control" type="text" id="wiz-address" placeholder="Address" />
							</div>
							<div class="row">
								<div class="col-xs-6">
								</div>
								<div class="col-xs-6 text-right">
									<button type="button" class="wiz-next btn btn-primary">Next</button>
								</div>
							</div>
						</fieldset>
					
						<fieldset class="step">
							<div class="page-section-heading">
								<h2 class="text-h3 margin-v-0">Account Setup</h2>
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-email">Email:</label>
								<input class="form-control" type="text" id="wiz-email" placeholder="Email" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-email">Username:</label>
								<input class="form-control" type="text" id="wiz-username" placeholder="Username" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-password">Password:</label>
								<input class="form-control" type="password" id="wiz-password" placeholder="Password" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-password2">Confirm Password:</label>
								<input class="form-control" type="password" id="wiz-password2" placeholder="Confirm Password" />
							</div>
							<div class="row">
								<div class="col-xs-6">
									<button type="button" class="wiz-prev btn btn-default">Previous</button>
								</div>
								<div class="col-xs-6 text-right">
									<button type="button" class="wiz-next btn btn-primary">Next</button>
								</div>
							</div>
						</fieldset>

						<fieldset class="step">
							<div class="page-section-heading">
								<h2 class="text-h3 margin-v-0">Social Profiles</h2>
								<h3 class="text-h4 margin-v-10 text-grey-400">Your presence on social networks</h3>
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-twitter">Twitter:</label>
								<input class="form-control" type="text" id="wiz-twitter" placeholder="Twitter" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-facebook">Facebook:</label>
								<input class="form-control" type="text" id="wiz-facebook" placeholder="Facebook" />
							</div>
							<div class="form-group form-control-default">
								<label for="wiz-gplus">Google Plus:</label>
								<input class="form-control" type="text" id="wiz-gplus" placeholder="Google Plus" />
							</div>
							<div class="row">
								<div class="col-xs-6">
									<button type="button" class="wiz-prev btn btn-default">Previous</button>
								</div>
								<div class="col-xs-6 text-right">
									<button type="button" class="wiz-next btn btn-primary">Finish</button>
								</div>
							</div>
						</fieldset>


					</form>
				</div>
				<!-- /wizard -->
				
				
			
					
					
				</div>


<!-- /main content -->

      </div>
    </div>
  </div>

  <!-- Inline Script for colors and config objects; used by various external scripts; -->
  <script>
    var colors = {
      "danger-color": "#e74c3c",
      "success-color": "#81b53e",
      "warning-color": "#f0ad4e",
      "inverse-color": "#2c3e50",
      "info-color": "#2d7cb5",
      "default-color": "#6e7882",
      "default-light-color": "#cfd9db",
      "purple-color": "#9D8AC7",
      "mustard-color": "#d4d171",
      "lightred-color": "#e15258",
      "body-bg": "#f6f6f6"
    };
    var config = {
      theme: "layout",
      skins: {
        "default": {
          "primary-color": "#16ae9f"
        }
      }
    };
  </script>

  <!-- Vendor Scripts Bundle
    Includes all of the 3rd party JavaScript libraries above.
    The bundle was generated using modern frontend development tools that are provided with the package
    To learn more about the development process, please refer to the documentation.
    Do not use it simultaneously with the separate bundles above. -->
  <script src="js/vendor/all.js"></script>

  <!-- Vendor Scripts Standalone Libraries -->
  <!-- <script src="js/vendor/core/all.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.js"></script> -->
  <!-- <script src="js/vendor/core/bootstrap.js"></script> -->
  <!-- <script src="js/vendor/core/breakpoints.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.nicescroll.js"></script> -->
  <!-- <script src="js/vendor/core/isotope.pkgd.js"></script> -->
  <!-- <script src="js/vendor/core/packery-mode.pkgd.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.grid-a-licious.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.cookie.js"></script> -->
  <!-- <script src="js/vendor/core/jquery-ui.custom.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.hotkeys.js"></script> -->
  <!-- <script src="js/vendor/core/handlebars.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.hotkeys.js"></script> -->
  <!-- <script src="js/vendor/core/load_image.js"></script> -->
  <!-- <script src="js/vendor/core/jquery.debouncedresize.js"></script> -->
  <!-- <script src="js/vendor/tables/all.js"></script> -->
  <!-- <script src="js/vendor/forms/all.js"></script> -->
  <!-- <script src="js/vendor/media/all.js"></script> -->
  <!-- <script src="js/vendor/player/all.js"></script> -->
  <!-- <script src="js/vendor/charts/all.js"></script> -->
  <!-- <script src="js/vendor/charts/flot/all.js"></script> -->
  <!-- <script src="js/vendor/charts/easy-pie/jquery.easypiechart.js"></script> -->
  <!-- <script src="js/vendor/charts/morris/all.js"></script> -->
  <!-- <script src="js/vendor/charts/sparkline/all.js"></script> -->
  <!-- <script src="js/vendor/maps/vector/all.js"></script> -->
  <!-- <script src="js/vendor/tree/jquery.fancytree-all.js"></script> -->
  <!-- <script src="js/vendor/nestable/jquery.nestable.js"></script> -->
  <!-- <script src="js/vendor/angular/all.js"></script> -->

  <!-- App Scripts Bundle
    Includes Custom Application JavaScript used for the current theme/module;
    Do not use it simultaneously with the standalone modules below. -->
  <script src="js/app/app.js"></script>

  <!-- App Scripts Standalone Modules
    As a convenience, we provide the entire UI framework broke down in separate modules
    Some of the standalone modules may have not been used with the current theme/module
    but ALL the modules are 100% compatible -->

  <!-- <script src="js/app/essentials.js"></script> -->
  <!-- <script src="js/app/layout.js"></script> -->
  <!-- <script src="js/app/sidebar.js"></script> -->
  <!-- <script src="js/app/media.js"></script> -->
  <!-- <script src="js/app/player.js"></script> -->
  <!-- <script src="js/app/timeline.js"></script> -->
  <!-- <script src="js/app/chat.js"></script> -->
  <!-- <script src="js/app/maps.js"></script> -->
  <!-- <script src="js/app/charts/all.js"></script> -->
  <!-- <script src="js/app/charts/flot.js"></script> -->
  <!-- <script src="js/app/charts/easy-pie.js"></script> -->
  <!-- <script src="js/app/charts/morris.js"></script> -->
  <!-- <script src="js/app/charts/sparkline.js"></script> -->



<!-- this page only -->




<!-- /this page only -->

</body>


</html>