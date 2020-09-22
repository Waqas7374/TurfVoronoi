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
			
			$sql = "SELECT '1M' as radius, gid,name,street,city,county,state,zip,loct,geom,ST_AsGeoJSON(geom) AS geojson FROM farmers WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $firstInterval .")";

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
					'id' => 'farmerswgs.' . $edge['gid'],
					'geometry' => json_decode($edge['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						'gid' => htmlspecialchars($edge['gid']),
						'marketname' => $edge['name'],
						'street' => $edge['street'],
						'city' => $edge['city'],
						'county' => $edge['county'],
						'state' => $edge['state'],
						'zip' => $edge['zip'],
						'loct' => $edge['loct'],
						'geom' => $edge['geom'],
						'radius' => $edge['radius'],
						'circleGeom' => json_decode($edge['circleGeom'],true),
						'total1M' => pg_num_rows($query)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			$sql3 = "SELECT '3M' as radius, gid,name,street,city,county,state,zip,loct,geom,ST_AsGeoJSON(geom) AS geojson FROM farmers WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $secondInterval .")";
			$query3 = pg_query($dbcon,$sql3); 
			while($edge3=pg_fetch_assoc($query3)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => 'farmerswgs.' . $edge3['gid'],
					'geometry' => json_decode($edge3['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						'gid' => htmlspecialchars($edge3['gid']),
						'marketname' => $edge3['name'],
						'street' => $edge3['street'],
						'city' => $edge3['city'],
						'county' => $edge3['county'],
						'state' => $edge3['state'],
						'zip' => $edge3['zip'],
						'loct' => $edge3['loct'],
						'geom' => $edge3['geom'],
						'radius' => $edge3['radius'],
						'total3M' => pg_num_rows($query3)
					)
				);
				array_push($geojson['features'], $feature);
			}	
			
			$sql5 = "SELECT '6M' as radius, gid,name,street,city,county,state,zip,loct,geom,ST_AsGeoJSON(geom) AS geojson FROM farmers WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $thirdInterval .")";
			$query5 = pg_query($dbcon,$sql5); 
			while($edge5=pg_fetch_assoc($query5)) {  
				$feature = array
					(
					'type' => 'Feature',
					'id' => 'farmerswgs.' . $edge5['gid'],
					'geometry' => json_decode($edge5['geojson'], true),
					 'crs' => array(
						'type' => 'EPSG',
						'properties' => array('code' => '3857')
					),
					'geometry_name' => 'geom',
					'properties' => array
					(
						'gid' => htmlspecialchars($edge5['gid']),
						'marketname' => $edge5['name'],
						'street' => $edge5['street'],
						'city' => $edge5['city'],
						'county' => $edge5['county'],
						'state' => $edge5['state'],
						'zip' => $edge5['zip'],
						'loct' => $edge5['loct'],
						'geom' => $edge5['geom'],
						'radius' => $edge5['radius'],
						'total6M' => pg_num_rows($query5)
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