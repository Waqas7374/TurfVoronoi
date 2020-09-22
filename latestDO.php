<?php
	$dir = "Drought/Outlook/*";
	$array = glob($dir);
	foreach($array as $key => $file) 
	{
		end($array);
		if ($key === key($array)){
			$fileName = str_replace("Drought/Outlook/","",$file);
			$fileName = str_replace("sdo_polygons_","",$fileName);
			$fileName = str_replace(".zip","",$fileName);
			echo $fileName;
		}
	}
?>