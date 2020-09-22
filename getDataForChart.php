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
			$cond = $_GET['cond'];
			
			$sql = '';
			switch ($cond) {
				case "Population (count) (Top 10)":
					$sql = "Select SUM(a.population::bigint) AS data, b.name As label FROM public.midwestpop a inner join counties b on a.countyfp=b.countyfp group by label order by data desc Limit 10;";
					break;
				case "Households (count) (Top 10)":
					$sql = "Select SUM(a.households::bigint) AS data, b.name As label FROM public.midwestpop a inner join counties b on a.countyfp=b.countyfp group by label order by data desc Limit 10;";
					break;
				case "Income (average) (Top 10)":
					$sql = "Select SUM(a.income::bigint) AS data, b.name As label FROM public.midwestpop a inner join counties b on a.countyfp=b.countyfp group by label order by data desc Limit 10;";
					break;
				case "Vacancy (rate) (Top 10)":
					$sql = "Select SUM(a.vac_per_b::bigint) AS data, b.name As label FROM public.vacancies a inner join counties b on a.countyfp=b.countyfp group by label order by data desc Limit 10;";
					break;
				case "PTRR Highest Ratio":
					$sql = "select distinct aug2017::double precision as data,countyname as label from ptrr where coalesce(aug2017, '') != 'null' order by aug2017::double precision desc Limit 10;";
					break;
				case "PTRR Lowest Ratio":
					$sql = "select distinct aug2017::double precision as data,countyname as label from ptrr where coalesce(aug2017, '') != 'null' order by aug2017::double precision asc Limit 10;";
					break;
				case "PTRR Highest Ratio-Old":
					$sql = "select distinct oct2010::double precision as data,countyname as label from ptrr where coalesce(oct2010, '') != '' order by oct2010::double precision desc Limit 10;";
					break;
				case "PTRR Lowest Ratio-Old":
					$sql = "select distinct oct2010::double precision as data,countyname as label from ptrr where coalesce(oct2010, '') != '' order by oct2010::double precision asc Limit 10;";
					break;
				case "Change Trend (Top 10)":
					$sql = "select distinct oct2010::double precision as data,countyname as label from ptrr where coalesce(oct2010, '') != '' order by oct2010::double precision desc Limit 10;";
					break;
				case "Change Trend (Bottom 10)":
					$sql = "select distinct oct2010::double precision as data,countyname as label from ptrr where coalesce(oct2010, '') != '' order by oct2010::double precision asc Limit 10;";
					break;
				case "Potbelly":
					$sql = "SELECT distinct state as label,count(gid) as data FROM potbelly group by label order by data desc;";
					break;
				default:
					echo "Your favorite color is neither red, blue, nor green!";
			}
			// $sql = "Select SUM(a.households::bigint) AS data, b.name As label FROM public.midwesthh a inner join counties b on a.countyfp=b.countyfp group by label order by data desc Limit 10;";
			// echo $sql;
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$query = pg_query($dbcon,$sql); 
			$geojson = array(); 
			while($edge=pg_fetch_assoc($query)) {  
				$feature = array
					(
					'data' => $edge['data'],
					'label' => $edge['label']
				);
				array_push($geojson, $feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo json_encode($geojson);
		}
	}
?>