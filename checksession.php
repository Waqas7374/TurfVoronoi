<?php
	require_once("config.php");
	
	if(isset($_SESSION["user_id"])) {
		if(isLoginSessionExpired()) {
			redirect("logout.php?session_expired=1");
		}
	}
?>