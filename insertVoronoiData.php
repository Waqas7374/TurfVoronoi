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
			$user_id = $_SESSION['user_id'];
			$project_id = $_SESSION['project_id'];
			$extent = $_GET['extent'];
			$cb = $_GET['cb'];

			$sql = "Delete FROM voronoi WHERE user_id=" . $user_id. " and project_id=" . $project_id . ";";
			$stmt = $DB->prepare($sql);
			$stmt->execute();
			
			$dataToInsert = [
				'user_id' => $user_id,
				'project_id' => $project_id,
				'extent' => $_GET['extent'],
				'cb' => $_GET['cb'],
				'level' => $_GET['level']
			];

			$sqlTwo = "INSERT INTO `multi-admin`.`voronoi`(`user_id`,`project_id`,`extent`,`cb`,`level`)VALUES (:user_id,:project_id,:extent,:cb,:level);";

			$stmtTwo= $DB->prepare($sqlTwo);
			$data = $stmtTwo->execute($dataToInsert);
		}
	}
?>