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
			$clickedPoint = $_GET['point'];
			$firstInterval = $_GET['fInt'];
			$secondInterval = $_GET['sInt'];
			$thirdInterval = $_GET['tInt'];
			
			$c1 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $firstInterval .")";
			// $c1 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(". $clickedPoint ."),4326), 0.0144927536231884);";
			
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			
			$query = pg_query($dbcon,$sql); 
			$geojson = array(
				'type'      => 'FeatureCollection',
				'features'  => array()
			); 
			$queryc1 = pg_query($dbcon,$c1);
			while($edgec1=pg_fetch_assoc($queryc1)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'vacancy' => $edgec1['vacancy'],
						'total1M' => pg_num_rows($queryc1)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			$c3 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $secondInterval .")";
			// $c3 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(". $clickedPoint ."),4326), 0.0434782608695652);";
			$queryc3 = pg_query($dbcon,$c3);
			while($edgec3=pg_fetch_assoc($queryc3)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'vacancy' => $edgec3['vacancy'],
						'total3M' => pg_num_rows($queryc3)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			$c5 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $thirdInterval .")";
			// $c5 = "select sum(vac_per_b) as vacancy from vacancies WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(". $clickedPoint ."),4326), 0.0869565217391304);";
			$queryc5 = pg_query($dbcon,$c5);
			while($edgec5=pg_fetch_assoc($queryc5)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'vacancy' => $edgec5['vacancy'],
						'total6M' => pg_num_rows($queryc5)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo json_encode($geojson);
		}
	}
?>