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
			
			$city = $_GET['city'];
			$county = $_GET['county'];
			$freight = $_GET['freight'];
			$highway = $_GET['highway'];
			$msas = $_GET['msas'];
			$neighborhood = $_GET['neighborhood'];
			$district = $_GET['district'];
			$region = $_GET['region'];
			$state = $_GET['state'];
			$transit = $_GET['transit'];
			$zip = $_GET['zip'];
			
			$message;
			
			$rowsToInsert = array(
				array(
					'user_id' => $user_id,
					'layer' => 'city',
					'stroke' => $city
				),
				array(
					'user_id' => $user_id,
					'layer' => 'county',
					'stroke' => $county
				),
				array(
					'user_id' => $user_id,
					'layer' => 'freight',
					'stroke' => $freight
				),
				array(
					'user_id' => $user_id,
					'layer' => 'highway',
					'stroke' => $highway
				),
				array(
					'user_id' => $user_id,
					'layer' => 'msas',
					'stroke' => $msas
				),
				array(
					'user_id' => $user_id,
					'layer' => 'neighborhood',
					'stroke' => $neighborhood
				),
				array(
					'user_id' => $user_id,
					'layer' => 'district',
					'stroke' => $district
				),
				array(
					'user_id' => $user_id,
					'layer' => 'region',
					'stroke' => $region
				),
				array(
					'user_id' => $user_id,
					'layer' => 'state',
					'stroke' => $state
				),
				array(
					'user_id' => $user_id,
					'layer' => 'transit',
					'stroke' => $transit
				),
				array(
					'user_id' => $user_id,
					'layer' => 'zip',
					'stroke' => $zip
				)
			);

			$sql = "Delete FROM borderpref WHERE user_id=" . $_SESSION["user_id"];
			$stmt = $DB->prepare($sql);
			$stmt->execute();
			
			$data = pdoMultiInsert('borderpref', $rowsToInsert, $DB);
			if($data){
				$message = "Done";
			}else{
				$message = "Sorry.";
			}
			echo $message;
		}
	}
?>