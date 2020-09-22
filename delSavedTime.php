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
			$sql = "Delete FROM project WHERE id=" . $_GET["id"];
			$stmt = $DB->prepare($sql);
			$stmt->execute();

			$sqlTwo = "Delete FROM voronoi WHERE user_id=" . $_SESSION["user_id"]. " and project_id=" . $_SESSION["project_id"] . ";";
			$stmtTwo = $DB->prepare($sqlTwo);
			$stmtTwo->execute();
		}
	}
?>