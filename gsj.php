<?php
	require_once("server_scripts/config.php");
	$passedFeatures = json_decode($_POST['f']);
	$id = $_POST['id'];

	$geojson = array(
				'type'      => 'FeatureCollection',
				'features'  => array()
			);
	for ($i = 0; $i < count($passedFeatures); $i++) {
		$sql = "SELECT gid,ST_AsGeoJSON(a.geom) AS geojson FROM ". $id ." a WHERE ST_Intersects(ST_BuildArea(ST_Transform(ST_GeomFromText('". $passedFeatures[$i] ."',3857),4326)), a.geom) and (st_area(st_intersection(ST_BuildArea(ST_Transform(ST_GeomFromText('". $passedFeatures[$i] ."',3857),4326)),a.geom))/st_area(ST_BuildArea(ST_Transform(ST_GeomFromText('". $passedFeatures[$i] ."',3857),4326)))) > .5;";
		$query = pg_query($dbcon,$sql);
		while($edge=pg_fetch_assoc($query)) {
			$feature = array (
						'type' => 'Feature',
						'geometry' => json_decode($edge['geojson'], true),
						 'crs' => array(
							'type' => 'EPSG',
							'properties' => array('code' => '3857')
						),
						'geometry_name' => 'geom',
						'properties' => array
						(
							'gid'  => $edge['gid']
							// 'statefp' => $edge['statefp'],
							// 'countyfp'  => $edge['countyfp'],
							// 'countyns' => $edge['countyns'],
							// 'name' => $edge['name'],
							// 'latitude' => $edge['latitude'],
							// 'longitude'  => $edge['longitude'],
							// 'state'  => $edge['state']
						)
					);
			array_push($geojson['features'], $feature);
		}
	}

	pg_close($dbcon);
	header('Content-type: application/json',true);
	echo json_encode($geojson);
?>
