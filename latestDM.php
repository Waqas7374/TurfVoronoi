<?php
	$dir = "Drought/Monitor/*";
	$array = glob($dir);
	foreach($array as $key => $file) 
	{
		end($array);
		if ($key === key($array)){
			$fileName = str_replace("Drought/Monitor/","",$file);
			$fileName = str_replace("USDM_","",$fileName);
			$fileName = str_replace("_M","",$fileName);
			$fileName = str_replace(".zip","",$fileName);
			echo $fileName;
		}
	}
?>