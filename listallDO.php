<?php
	$dir = "Drought/Outlook/*";

	$dates = array();
	foreach(glob($dir) as $file) 
	{
		$fileName = str_replace("Drought/Outlook/","",$file);
		$fileName = str_replace(".zip","",$fileName);
		$fileName = str_replace("MDO_polygons_","",$fileName);
		$fileName = str_replace("mdo_polygons_","",$fileName);
		$fileName = str_replace("sdo_polygons_","",$fileName);

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