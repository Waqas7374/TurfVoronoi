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
			$value = $_GET['value'];
			
			$sql = "";
			switch ($value) {
				case "farmers":
					$sql = "SELECT name,zip as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "stores":
					$sql = "SELECT name,zip as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "vacancies":
					$sql = "SELECT name,vac_per_b as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "midwestpop":
					$sql = "SELECT name,population as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "midwestinc":
					$sql = "SELECT name,medianinc as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "density":
					$sql = "SELECT name,density as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "chicagofood":
					$sql = "SELECT name,gid as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				case "culver":
					$sql = "SELECT name,gid as weight, ST_AsGeoJSON(ST_centroid(geom)) AS geojson FROM ". $value;
					break;
				default:
			}
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$query = pg_query($dbcon,$sql); 
			$geojson = array(
				'type'      => 'FeatureCollection',
				'features'  => array()
			); 
			while($edge=pg_fetch_assoc($query)) {  
				$feature = array
					(
					'type' => 'Feature',
					'geometry' => json_decode($edge['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '4326')
					),
					'properties' => array
					(
						'weight' => $edge['weight'],
						'name' => $edge['name']
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