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
			$gid = $_GET['gid'];
			$table = $_GET['table'];
			
			if($table != "UrbanRural_2013")
				$sql = "Select gid,name,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson From ". $table . " where gid='". $gid . "'";
			else
				$sql = "Select gid,county_nam as name,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson From \"UrbanRural_2013\" where gid='". $gid . "'";
			// echo $sql;
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$query = pg_query($dbcon,$sql); 
			$geojson = array(); 
			while($edge=pg_fetch_assoc($query)) {  
				$feature = array
				(			
					'type' => 'Feature',
					'id' => 'layer.' . $edge[gid],					
					'geometry' =>json_decode($edge['geojson'],true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						'gid' => htmlspecialchars($edge['gid']),
						'name' => $edge['name']
					)
				);
				array_push($geojson, $feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo $_GET['callback'] . '('.json_encode($geojson).')';
		}
	}
?>