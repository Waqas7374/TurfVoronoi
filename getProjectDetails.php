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
			if(isset($_GET['id']) && $_GET['id'] !== "none"){
				$_SESSION["project_id"] = $_GET['id'];
			}
			else
			{
				unset($_SESSION["project_id"]);
			}
			// $sqlTwo = "SELECT id, title, latest FROM project where id=" . $id . ";";
			// $stmtTwo = $DB->prepare($sqlTwo);
			// $stmtTwo->execute();
			// $borderValues = $stmtTwo->fetchAll();
			
			// echo json_encode($borderValues);
		}
	}
?>