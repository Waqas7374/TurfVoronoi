<?php
	$dir = "Drought/Monitor/*";

	$dates = array();
	foreach(glob($dir) as $file) 
	{
		$fileName = str_replace("Drought/Monitor/","",$file);
		$fileName = str_replace(".zip","",$fileName);
		$fileName = str_replace("USDM_","",$fileName);
		$fileName = str_replace("_M","",$fileName);

		$year = substr($fileName,0,4);
		$month = substr($fileName,4,2);
		$date = substr($fileName,6,2);
		
		array_push($dates, $date . "-" . $month . "-" . $year);
		// echo $date . "-" . $month . "-" . $year . "<br>";
	}
	$json = json_encode($dates);
	// $json = str_replace('"','', (string) json_encode($dates));
	
	echo $json
?>