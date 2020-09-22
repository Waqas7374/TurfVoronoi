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
			
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$geojson = array(
				'type'      => 'FeatureCollection',
				'features'  => array()
			); 
			// $c1 = "select sum(a.population) as population,sum(a.households) as households,sum(a.medianinc) as income, sum(b.density) as density, sum(c.vac_per_b) as vacancy from midwestinc a inner join density b on a.countyfp = b.countyfp inner join vacancies c on a.countyfp = c.countyfp WHERE ST_DWithin(a.geom, ST_MakePoint(". $clickedPoint .")::geography, 1000) and ST_DWithin(b.geom, ST_MakePoint(". $clickedPoint .")::geography, 1000) and ST_DWithin(c.geom, ST_MakePoint(". $clickedPoint .")::geography, 1000);";
			$c1 = "select sum(population) as population,sum(households) as households,sum(medianinc) as income from midwestinc WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $firstInterval .")";
			// echo $c1;
			$queryc1 = pg_query($dbcon,$c1);
			while($edgec1=pg_fetch_assoc($queryc1)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'population' => $edgec1['population'],
						'households' => $edgec1['households'],
						'income' => $edgec1['income'],
						'total1M' => pg_num_rows($queryc1)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			// $c3 = "select sum(a.population) as population,sum(a.households) as households,sum(a.medianinc) as income, sum(b.density) as density, sum(c.vac_per_b) as vacancy from midwestinc a inner join density b on a.countyfp = b.countyfp inner join vacancies c on a.countyfp = c.countyfp WHERE ST_DWithin(a.geom, ST_MakePoint(". $clickedPoint .")::geography, 3000) and ST_DWithin(b.geom, ST_MakePoint(". $clickedPoint .")::geography, 3000) and ST_DWithin(c.geom, ST_MakePoint(". $clickedPoint .")::geography, 3000);";
			$c3 = "select sum(population) as population,sum(households) as households,sum(medianinc) as income from midwestinc WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $secondInterval .")";
			// echo $c3;
			$queryc3 = pg_query($dbcon,$c3);
			while($edgec3=pg_fetch_assoc($queryc3)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'population' => $edgec3['population'],
						'households' => $edgec3['households'],
						'income' => $edgec3['income'],
						'total3M' => pg_num_rows($queryc3)
					)
				);
				array_push($geojson['features'], $feature);
			}
			
			// $c5 = "select sum(a.population) as population,sum(a.households) as households,sum(a.medianinc) as income, sum(b.density) as density, sum(c.vac_per_b) as vacancy from midwestinc a inner join density b on a.countyfp = b.countyfp inner join vacancies c on a.countyfp = c.countyfp WHERE ST_DWithin(a.geom, ST_MakePoint(". $clickedPoint .")::geography, 5000) and ST_DWithin(b.geom, ST_MakePoint(". $clickedPoint .")::geography, 5000) and ST_DWithin(c.geom, ST_MakePoint(". $clickedPoint .")::geography, 5000);";
			$c5 = "select sum(population) as population,sum(households) as households,sum(medianinc) as income from midwestinc WHERE ST_DWithin(geom, ST_MakePoint(". $clickedPoint .")::geography, ". $thirdInterval .")";
			// echo $c5;
			$queryc5 = pg_query($dbcon,$c5);
			while($edgec5=pg_fetch_assoc($queryc5)) {  
				$feature = array
					(
					'type' => 'Feature',
					'properties' => array
					(
						'population' => $edgec5['population'],
						'households' => $edgec5['households'],
						'income' => $edgec5['income'],
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