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
			$table = $_GET['tab'];
			$idorgid = $_GET['idorgid'];
			
			$c1 = "select '1M' as radius, " . $idorgid . " as id, ST_AsGeoJSON(geom) AS geojson, geom from " . $table . " WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $firstInterval .")";
			// echo $c1;
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			
			$query = pg_query($dbcon,$c1); 
			$geojson = array(
				'type'      => 'FeatureCollection',
				'features'  => array()
			); 
			$queryc1 = pg_query($dbcon,$c1);
			while($edgec1=pg_fetch_assoc($queryc1)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => $table . '.' . $edgec1['id'],
					'geometry' => json_decode($edgec1['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						$idorgid => $edgec1['id'],
						'geom' => $edgec1['geom'],
						'radius' => $edgec1['radius'],
						'total1M' => pg_num_rows($queryc1)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			$c3 = "select '3M' as radius, " . $idorgid . " as id, ST_AsGeoJSON(geom) AS geojson, geom from " . $table . " WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $secondInterval .")";
			$queryc3 = pg_query($dbcon,$c3);
			while($edgec3=pg_fetch_assoc($queryc3)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => $table . '.' . $edgec3['id'],
					'geometry' => json_decode($edgec3['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						$idorgid => $edgec3['id'],
						'geom' => $edgec3['geom'],
						'radius' => $edgec3['radius'],
						'total3M' => pg_num_rows($queryc3)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			$c5 = "select '6M' as radius, " . $idorgid . " as id, ST_AsGeoJSON(geom) AS geojson, geom from " . $table . " WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $thirdInterval .")";
			$queryc5 = pg_query($dbcon,$c5);
			while($edgec5=pg_fetch_assoc($queryc5)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => $table . '.' . $edgec5['id'],
					'geometry' => json_decode($edgec5['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						$idorgid => $edgec5['id'],
						'geom' => $edgec5['geom'],
						'radius' => $edgec5['radius'],
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