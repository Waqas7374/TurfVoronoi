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
<!-------------------------------------------- sidebar -------------------------------------------->    
					  <div class="sidebar left sidebar-size-2 sidebar-offset-0 sidebar-skin-white-green sidebar-visible-desktop sidebar-visible-mobile" id="sidebar-menu" data-type="dropdown">
						<div class="split-vertical">
						  <div class="sidebar-block">
									<ul>
										<li><a href="index.php">First Page</a></li>
										<li><a href="register.php">Register</a></li>
										<li><a href="login.php">Login</a></li>
										<li><a href="stories.php">Stories</a></li>
										<li><a href="layout2.php">Single Story</a></li>
										<li><a href="search.php">Search</a></li>
										<li><a href="category.php">Category</a></li>
										<li><a href="pillars.php">Pillars</a></li>
										<li><a href="townsq.php">TownSQ</a></li>
									</ul>

									<hr>

									<ul>
										<li><a href="map-1.php">Map</a></li>
										<li><a href="forms.php">Forms</a></li>
										<li><a href="layoutb.php">Crops</a></li>
									</ul>
									
									<hr>
						 
									<p>
										<a class="btn btn-primary social-login-btn social-facebook" href="/auth/facebook"><i class="fa fa-lg fa-facebook"></i></a>
										<a class="btn btn-primary social-login-btn social-twitter" href="/auth/twitter"><i class="fa fa-lg fa-twitter"></i></a>
										</p>
										<p>
										<a class="btn btn-primary social-login-btn social-linkedin" href="/auth/linkedin"><i class="fa fa-lg fa-linkedin"></i></a>
										<a class="btn btn-primary social-login-btn social-google" href="/auth/google"><i class="fa fa-lg fa-google-plus"></i></a>
									</p>
						  </div>
						</div>
					  </div>
					<!-------------------------------------------- /sidebar -------------------------------------------->