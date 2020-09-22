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
			$col = $_GET['col'];
			// $sql = "SELECT gid,ST_AsGeoJSON(om) as onemile,ST_AsGeoJSON(tm) as threemile,ST_AsGeoJSON(fm) as fivemile,ST_AsGeoJSON(geom) AS geojson FROM flagpoints";
			$sql = "";
			switch ($col) {
				case "main":
					$sql = "SELECT gid,name,latitude,longitude,geom,ST_AsGeoJSON(geom) AS geojson FROM flagpoints order by Random();";
					break;
				case "one":
					$sql = "SELECT gid,ST_AsGeoJSON(om) AS geojson FROM flagpoints;";
					break;
				case "three":
					$sql = "SELECT gid,ST_AsGeoJSON(tm) AS geojson FROM flagpoints;";
					break;
				case "five":
					$sql = "SELECT gid,ST_AsGeoJSON(fm) AS geojson FROM flagpoints;";
					break;
				default:
					echo "Your favorite color is neither red, blue, nor green!";
			}
			
			// echo $sql;
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			
			$query = pg_query($dbcon,$sql); 
			$geojson = array(
				// 'type'      => 'FeatureCollection',
				'features'  => array()
			); 
			while($edge=pg_fetch_assoc($query)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => 'flags.' . $edge['gid'],
					'geometry' => json_decode($edge['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						'gid' => htmlspecialchars($edge['gid'])
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