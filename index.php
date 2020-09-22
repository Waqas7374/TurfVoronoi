<?php
require_once("config.php");

if (isset($_SESSION["user_id"]) && $_SESSION["user_id"] != "") {
    if(!isLoginSessionExpired()) 
    {
		// redirect("main.php");
		redirect("initializeProject.php");
    } 
    else
    {
		redirect("logout.php?session_expired=1");
	}
}

$title = "Login";
$mode = $_REQUEST["mode"];
if ($mode == "login") {
    $username = trim($_POST['username']);
    $pass = trim($_POST['user_password']);

    if ($username == "" || $pass == "") {

        $_SESSION["errorType"] = "danger";
        $_SESSION["errorMsg"] = "Enter manadatory fields";
    } else {
        $sql = "SELECT * FROM system_users WHERE u_username = :uname AND u_password = :upass ";

        try {
            $stmt = $DB->prepare($sql);

            // bind the values
            $stmt->bindValue(":uname", $username);
            $stmt->bindValue(":upass", $pass);

            // execute Query
            $stmt->execute();
            $results = $stmt->fetchAll();

            if (count($results) > 0) {
                $_SESSION["errorType"] = "success";
                $_SESSION["errorMsg"] = "You have successfully logged in.";

                $_SESSION["user_id"] = $results[0]["u_userid"];
                $_SESSION["rolecode"] = $results[0]["u_rolecode"];
                $_SESSION["username"] = $results[0]["u_username"];
                $_SESSION["name"] = $results[0]["u_name"];
				$_SESSION['loggedin_time'] = time();  

				redirect("initializeProject.php");
                exit;
            } else {
                $_SESSION["errorType"] = "info";
                $_SESSION["errorMsg"] = "username or password does not exist.";
            }
        } catch (Exception $ex) {

            $_SESSION["errorType"] = "danger";
            $_SESSION["errorMsg"] = $ex->getMessage();
        }
    }
    redirect("index.php");
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
      <div class="row" >
<!-- main content -->
				
				<div class="item col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-xs-12">
				
				<!-- wizard -->
				<div class="wizard-container wizard-1" id="wizard-demo-1" style="margin-top: 50px">
					<form class="max-width-400 h-center" name="contact_form" id="contact_form" method="post" action="">
						<input type="hidden" name="mode" value="login" >
					
						<fieldset class="step">
							<div class="page-section-heading">
								<h2 class="text-h3 margin-v-0">Login</h2>
							</div>
							<div class="form-group form-control-default required">
								<label for="username">E-mail or Username:</label>
								<input class="form-control" type="text" name="username" id="username" placeholder="E-mail or Username" />
							</div>
							<div class="form-group form-control-default required">
								<label for="user_password">Password:</label>
								<input class="form-control" type="password" name="user_password" id="user_password" placeholder="Password" />
							</div>
							<div class="row">
								<div class="col-md-6">
									<label>
										<a href="register.php">Register?</a>
									</label>
								</div>
								<div class="col-md-6 text-right">
									<a href="#">Forgot password?</a>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 text-center">
									<button type="submit" class="wiz-next btn btn-primary">Login</button>
								</div>
							</div>
							<hr>
							<div class="row">
								<div class="col-md-12 text-center">
									<h4>Or Login using Social Media Networks</h4>
								</div>
								<div class="col-md-4 text-center">
										<button class="btn btn-indigo-500 "><i class="fa fa-lg fa-facebook"></i> Facebook</button>
								</div>
								<div class="col-md-4 text-center">
										<button class="btn btn-light-blue-500 "><i class="fa fa-lg fa-twitter"></i> Twitter</button>
								</div>	
								<div class="col-md-4 text-center">
										<button class="btn btn-red-500 "><i class="fa fa-lg fa-google-plus"></i> Google+</button>
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

</body>


</html>