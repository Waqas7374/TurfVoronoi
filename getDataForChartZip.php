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
			$zip = $_GET['zip'];
			
			$sql = '';
			switch ($cond) {
				case "zipcode":
					$sql = "SELECT oct2010, nov2010, dec2010, jan2011, feb2011, mar2011, april2011, may2011, june2011, july2011, aug2011, sep2011, oct2011, nov2011, dec2011, jan2012, feb2012, mar2012, april2012, may2012, june2012, july2012, aug2012, sep2012, oct2012, nov2012, dec2012, jan2013, feb2013, mar2013, april2013, may2013, june2013, july2013, aug2013, sep2013, oct2013, nov2013, dec2013, jan2014, feb2014, mar2014, april2014, may2014, june2014, july2014, aug2014, sep2014, oct2014, nov2014, dec2014, jan2015, feb2015, mar2015, april2015, may2015, june2015, july2015, aug2015, sep2015, oct2015, nov2015, dec2015, jan2016, feb2016, mar2016, april2016, may2016, june2016, july2016, aug2016, sep2016, oct2016, nov2016, dec2016, jan2017, feb2017, mar2017, april2017, may2017, june2017, july2017, aug2017 FROM public.ptrr where geoid10='". $zip."';";
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
					$edge['oct2010'] , $edge['nov2010'] , $edge['dec2010'] ,$edge['jan2011'] ,$edge['feb2011'] ,$edge['mar2011'] ,$edge['april2011'] ,$edge['may2011'] ,$edge['june2011'] ,$edge['july2011'] ,$edge['aug2011'] ,$edge['sep2011'] ,$edge['oct2011'] ,$edge['nov2011'] ,$edge['dec2011'] ,$edge['jan2012'] ,$edge['feb2012'] ,$edge['mar2012'] ,$edge['april2012'] ,$edge['may2012'] ,$edge['june2012'] ,$edge['july2012'] ,$edge['aug2012'] ,$edge['sep2012'] ,$edge['oct2012'] ,$edge['nov2012'] ,$edge['dec2012'] ,$edge['jan2013'] ,$edge['feb2013'] ,$edge['mar2013'] ,$edge['april2013'] ,$edge['may2013'] ,$edge['june2013'] ,$edge['july2013'] ,$edge['aug2013'] ,$edge['sep2013'] ,$edge['oct2013'] ,$edge['nov2013'] ,$edge['dec2013'] ,$edge['jan2014'] ,$edge['feb2014'] ,$edge['mar2014'] ,$edge['april2014'] ,$edge['may2014'] ,$edge['june2014'] ,$edge['july2014'] ,$edge['aug2014'] ,$edge['sep2014'] ,$edge['oct2014'] ,$edge['nov2014'] ,$edge['dec2014'] ,$edge['jan2015'] ,$edge['feb2015'] ,$edge['mar2015'] ,$edge['april2015'] ,$edge['may2015'] ,$edge['june2015'] ,$edge['july2015'] ,$edge['aug2015'] ,$edge['sep2015'] ,$edge['oct2015'] ,$edge['nov2015'] ,$edge['dec2015'] ,$edge['jan2016'] ,$edge['feb2016'] ,$edge['mar2016'] ,$edge['april2016'] ,$edge['may2016'] ,$edge['june2016'] ,$edge['july2016'] ,$edge['aug2016'] ,$edge['sep2016'] ,$edge['oct2016'] ,$edge['nov2016'] ,$edge['dec2016'] ,$edge['jan2017'] ,$edge['feb2017'] ,$edge['mar2017'] ,$edge['april2017'] ,$edge['may2017'] ,$edge['june2017'] ,$edge['july2017'] ,$edge['aug2017']
				);
				array_push($feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo json_encode($feature);
		}
	}
?>