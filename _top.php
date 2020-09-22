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
		else
		{
			try {
				$sql = "SELECT topbar FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$a = $stmt->fetchAll();
				
				if($a[0]["topbar"] == 1)
				{
					echo '<div class="navbar navbar-main navbar-default navbar-fixed-top" role="navigation">
						<div class="container-fluid">
						  <div class="navbar-header">
							<a class="navbar-brand navbar-brand-primary" href="index.php"><img src="images/ll-logo-w-g.jpg" height="40px" style="margin-top: 4px;" /></a>
						  </div>
							<div class="navbar-collapse collapse" id="collapse">
								<ul class="nav navbar-nav topbar-items">
									<li>
										<div id="magicsuggest"></div>
									</li>
								</ul>
							  
								<ul class="nav navbar-nav navbar-right">
									<li class="dropdown user">
									  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<img src="images/new/avatars/m4-avatar-circle-head-shoulders-100x100.png" alt="" class="img-circle" /> ' . $_SESSION["name"] . '<span class="caret"></span>
									  </a>
									  <ul class="dropdown-menu" role="menu">
										<li><a href="#"><i class="fa fa-user"></i>Profile</a></li>
										<li><a href="#"><i class="fa fa-wrench"></i>Settings</a></li>
										<li><a href="logout.php"><i class="fa fa-sign-out"></i>Logout</a></li>
									  </ul>
									</li>
								</ul>
							</div>
						</div>
					  </div>';
				}
				else
				{
					echo '<div style="position: absolute; right: 15px; top: 0; z-index:6;">
								<ul class="nav navbar-nav navbar-right">
									<li class="dropdown user">
									  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<img src="images/new/avatars/m4-avatar-circle-head-shoulders-100x100.png" alt="" class="img-circle" /> ' . $_SESSION["name"] . '<span class="caret"></span>
									  </a>
									  <ul class="dropdown-menu" role="menu">
										<li><a href="#"><i class="fa fa-user"></i>Profile</a></li>
										<li><a href="#"><i class="fa fa-wrench"></i>Settings</a></li>
										<li><a href="logout.php"><i class="fa fa-sign-out"></i>Logout</a></li>
									  </ul>
									</li>
								</ul>
								</div>';
				}
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>