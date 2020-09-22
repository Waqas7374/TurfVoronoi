<?php
	require_once("server_scripts/config.php");
	$passedPolygon = $_GET['passedPolygon'];
	$id = $_GET['id'];
	$sql = "SELECT count(gid) FROM ". $id ." a WHERE ST_Intersects(ST_BuildArea(ST_Transform(ST_GeomFromText('". $passedPolygon ."',3857),4326)), a.geom);";

	// $geojson = array(
		// 'type'      => 'FeatureCollection',
		// 'features'  => array()
	// );

	$query = pg_query($dbcon,$sql);

	$edge = pg_fetch_result($query, 0, 0);
	echo $edge;
?>
