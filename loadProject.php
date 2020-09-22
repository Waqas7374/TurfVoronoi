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
			$sqlTwo = "SELECT * FROM project where id=" . $id . ";";
			$stmtTwo = $DB->prepare($sqlTwo);
			$stmtTwo->execute();
			$projectValues = $stmtTwo->fetchAll();
			
			echo json_encode($projectValues);
		}
	}
?>