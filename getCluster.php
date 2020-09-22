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
			$table = $_GET['layer'];
			$bbox = $_GET['bbox'];
			$geomfield = "geom";
			list($bbox_west, $bbox_south, $bbox_east, $bbox_north) = split(",", $bbox);
			$sql = "";
			
			switch ($table) {
				case "Airports":
					$sql = "SELECT gid,name,type,importance,latitude,longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM airports where geom is not null";
					break;
				case "Farmers":
					$sql = "SELECT gid, gid as importance,marketname as name,street,county,city,state,zip,latitude,longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM farmerswgs";
					break;
				case "Stores":
					$sql = "SELECT id, id as gid,id as importance,company as name,address,city,state,zip,latitude,longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM stores";
					break;
				case "Logos":
					$sql = "SELECT gid, id,id as importance,company as name,address,city,state,zipcode as zip,latitude,longitude,logo,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM logos";
					break;
				case "HSB":
					$sql = "SELECT id, id as gid,id as importance,name,latitude,longitude,type,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM hsb";
					break;
				case "TransStop":
					$sql = "SELECT gid,gid as importance,station as name,sys_agency,city,state,zip,latitude,longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM transitstations";
					break;
				case "PortFacility":
					$sql = "SELECT gid,gid as importance,nvunitname as name,location, concat(city::text,',',statepcode::text,',',zip::text,',',countyname::text) as address,latitude,longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM port_facility";
					break;
				case "Gardens":
					$sql = "SELECT gid,gid as importance,name,descriptio,ST_X(geom) as latitude,ST_Y(geom) as longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM gardens";
					break;
				case "IANA":
					$sql = "SELECT gid,gid as importance,name,address,city,state,zip,ST_X(geom) as latitude,ST_Y(geom) as longitude,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM iana";
					break;
				case "dhl":
					$sql = "SELECT gid,name,typ,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM dhl;";
					break;
				case "fedex":
					$sql = "SELECT gid,name,typ,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM fedex;";
					break;
				case "ups":
					$sql = "SELECT gid,name,typ,ST_AsGeoJSON(ST_Transform(geom,3857)) AS geojson FROM ups;";
					break;
				default:
					echo "Your favorite color is neither red, blue, nor green!";
			}
				// $sql .= " AND geom && ST_MakeEnvelope(" . $bbox_west . ", " . $bbox_south . ", " . $bbox_east . ", " . $bbox_north . ") ";
			// $sql .= " AND (box(point(" . $bbox_west . "," . $bbox_south . "),point(" . $bbox_east . "," . $bbox_north . ")) ~ (". $geomfield ."))";
			// $sql .=" order by importance desc;";
			$sql .=" where geom is not null;";
			// echo $sql;
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$query = pg_query($dbcon,$sql); 
			$geojson = array(
				'type'      => 'FeatureCollection',
				'totalFeatures' => pg_num_rows($query),
				'features'  => array()
			);
			switch ($table) {
				case "Airports":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'airport.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'type' => $edge['type'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "Farmers":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'farmer.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'street' => $edge['street'],
								'county' => $edge['county'],
								'city' => $edge['city'],
								'state' => $edge['state'],
								'zip' => $edge['zip'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "Stores":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'store.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'address' => $edge['address'],
								'city' => $edge['city'],
								'state' => $edge['state'],
								'zip' => $edge['zip'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "Logos":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'logos.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'address' => $edge['address'],
								'city' => $edge['city'],
								'state' => $edge['state'],
								'zip' => $edge['zip'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'logo' => $edge['logo'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "HSB":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'hsb.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'type' => $edge['type'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "TransStop":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(
							'type' => 'Feature',
							'id' => 'transitstations.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'sys_agency' => $edge['sys_agency'],
								'city' => $edge['city'],
								'state' => $edge['state'],
								'zip' => $edge['zip'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "PortFacility":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(
							'type' => 'Feature',
							'id' => 'portfacility.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'location' => $edge['location'],
								'address' => $edge['address'],
								// 'city' => $edge['city'],
								// 'statepcode' => $edge['statepcode'],
								// 'zip' => $edge['zip'],
								// 'countyname' => $edge['countyname'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "Gardens":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(
							'type' => 'Feature',
							'id' => 'gardens.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'descriptio' => $edge['descriptio'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'name'  =>  $edge['name']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "IANA":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'iana.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'address' => $edge['address'],
								'city' => $edge['city'],
								'state' => $edge['state'],
								'zip' => $edge['zip'],
								'latitude' => $edge['latitude'],
								'longitude' => $edge['longitude'],
								'importance'  =>  $edge['importance']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				case "dhl":
					while($edge=pg_fetch_assoc($query)) {  
						$feature = array
							(			
							'type' => 'Feature',
							'id' => 'dist.' . $edge[gid],
							'geometry' =>json_decode($edge['geojson'],true),
							 'crs' => array(
								'type' => 'EPSG',
								'properties' => array('code' => '3857')
							),
							'geometry_name' => 'geom',
							'properties' => array
							(
								'gid' => htmlspecialchars($edge['gid']),
								'name' => $edge['name'],
								'typ' => $edge['typ'],
								'importance'  =>  $edge['gid']
							)
						);
						array_push($geojson['features'], $feature);
					}
					break;
				default:
					echo "Your favorite color is neither red, blue, nor green!";
			}
			pg_close($dbcon);
			header('Content-type: application/json',true);
			//echo json_encode($geojson);
			// header('Content-type: application/x-javascript');
			echo $_GET['callback'] . '('.json_encode($geojson).')';
		}
	}
?><?php
?>