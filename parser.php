<?php
	// $files = scandir('Drought/Outlook');

	// foreach($files as $file) {
		// $fileName = substr(str_replace(".zip","",$file), strpos(str_replace(".zip","",$file), '2'));
		// echo $file . "<br>";
	// }
	
	$dir = "Drought/Outlook/*";

	// Open a known directory, and proceed to read its contents
	foreach(glob($dir) as $file) 
	{
		$fileName = substr(str_replace(".zip","",$file), strpos(str_replace(".zip","",$file), '2'));
		echo $file . "<br>";
	}
?>