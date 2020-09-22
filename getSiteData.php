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
			$center = $_GET['center'];
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			
			$geojson = array(
				'type' => 'FeatureCollection',
				'features' => array()
			); 
			$sqlState = "SELECT name FROM states WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint(". $center ."),4326))";
			$queryc1 = pg_query($dbcon,$sqlState);
			while($edgec1=pg_fetch_assoc($queryc1)) {  
				$feature = array
				(
					'type' => 'State',
					'name' => $edgec1['name']
				);
				array_push($geojson['features'], $feature);
			}
			
			$sqlZip = "SELECT name FROM zip WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint(". $center ."),4326))";
			$queryc2 = pg_query($dbcon,$sqlZip);
			while($edgec2=pg_fetch_assoc($queryc2)) {  
				$feature = array
				(
					'type' => 'Zip',
					'name' => $edgec2['name']
				);
				array_push($geojson['features'], $feature);
			}
			
			$sqlCounties = "SELECT name FROM counties WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint(". $center ."),4326))";
			$queryc3 = pg_query($dbcon,$sqlCounties);
			while($edgec3=pg_fetch_assoc($queryc3)) {  
				$feature = array
				(
					'type' => 'County',
					'name' => $edgec3['name']
				);
				array_push($geojson['features'], $feature);
			}
			
			$sqlDistrict = "SELECT name FROM districts WHERE ST_Intersects(geom, ST_SetSRID(ST_MakePoint(". $center ."),4326))";
			$queryc4 = pg_query($dbcon,$sqlDistrict);
			while($edgec4=pg_fetch_assoc($queryc4)) {  
				$feature = array
				(
					'type' => 'District',
					'name' => $edgec4['name']
				);
				array_push($geojson['features'], $feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo $_GET['callback'] . '('.json_encode($geojson).')';
		}
	}
?>