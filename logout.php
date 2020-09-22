<?php
	require_once("config.php");
	session_start();
	$_SESSION = array();
	unset($_SESSION);
	session_destroy();
	
	
	$url = "index.php";
	if(isset($_GET["session_expired"])) 
	{
		$url .= "?session_expired=" . $_GET["session_expired"];
	}
	redirect($url);
	exit;
?>