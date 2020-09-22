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
			
			// $sqlTwo = "SELECT id, latest FROM project where user_id=" . $_SESSION["user_id"] . " order by latest desc limit 1;";
			$sqlTwo = "SELECT id, latest FROM project where user_id=" . $_SESSION["user_id"] . " order by latest desc;";
			$stmtTwo = $DB->prepare($sqlTwo);
			$stmtTwo->execute();
			$borderValues = $stmtTwo->fetchAll();
			
			echo $borderValues[0]["id"] . "-----" . $borderValues[0]["latest"];
		}
	}
?>