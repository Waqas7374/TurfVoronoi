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
			$value = $_GET['value'];
			$table = $_GET['tab'];
			$parentTable = $_GET['par'];
			$colName = $_GET['col'];
			
			$sql = '';
			switch ($cond) {
				case "getDiv":
					// $sql = "SELECT b.gid as gid,a.gid as id, a.name as name FROM division a inner join region b on a.regionid = b.geoid where b.name='". $value ."' order by name";
					$sql = "SELECT distinct name, gid, gid as id FROM ". $table ." order by name";
					break;
				case "getStates":
					// $sql = "SELECT distinct name,gid,statefp as id FROM ". $table . " where region = '". $value ."' order by name";
					$sql = "SELECT b.gid as gid,a.gid as id, a.name as name FROM ". $table . " a inner join ". $parentTable . " b on a.". $colName." = b.gid where b.name='". $value ."' order by name";
					// echo $sql;
					// $sql = "SELECT b.gid as gid,a.statefp as id, a.name as name FROM ". $table . " a inner join division b on a.division = b.name where b.name='". $value ."' order by name";
					break;
				case "allStates":
					$sql = "SELECT distinct name,gid,statefp as id FROM ". $table . " order by name";
					// $sql = "SELECT b.gid as gid,a.gid as id, a.name as name FROM ". $table . " a inner join ". $parentTable . " b on a.". $colName." = b.gid where b.name='". $value ."' order by name";
					// echo $sql;
					// $sql = "SELECT b.gid as gid,a.statefp as id, a.name as name FROM ". $table . " a inner join division b on a.division = b.name where b.name='". $value ."' order by name";
					break;
				case "getCounties":
					$sql = "SELECT distinct a.name || ', ' || b.stusps as name, a.gid as gid,b.gid as id FROM ". $table . " a inner join ". $parentTable . " b on a.statefp = b.statefp where ". $value ." order by name";
					// echo $sql;
					break;
				case "getCity":
					$sql = "SELECT distinct a.name || ', ' || b.stusps as name,a.gid from cities a inner join " . $parentTable . " b on a.statefp=b.statefp where ". $value . " order by name;";
					// echo $sql;
					break;
				case "getNeighbourWith":
					// $sql = "SELECT distinct a.name,a.gid from neighbourcities a inner join cities b on a.city = b.name where a.type='inside' and a.statefp=b.statefp and ". $value . " order by name;";
					$sql = "SELECT distinct a.name,a.gid from neighbourcities a inner join cities b on (a.city = b.name and a.type='inside' and a.statefp=b.statefp) where ". $value . " order by name;";
					// echo $sql;
					break;
				case "getNeighbourWithout":
					$sql = "SELECT distinct a.name,a.gid from neighbourcities a inner join cities b on (a.city = b.name and a.type='outside' and a.statefp=b.statefp) where ". $value . " order by name;";
					// echo $sql;
					break;			
				default:
					echo "Your favorite color is neither red, blue, nor green!";
			}
			// $dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=72342");
			$dbcon = pg_connect("host=localhost dbname=farmer user=postgres password=Census@2018@2018@2018");
			$query = pg_query($dbcon,$sql); 
			$geojson = array(); 
			while($edge=pg_fetch_assoc($query)) {  
				$feature = array
					(
					'id' => $edge['id'],
					'gid' => $edge['gid'],
					'name' => $edge['name']
				);
				array_push($geojson, $feature);
			}
			
			pg_close($dbcon);
			header('Content-type: application/json',true);
			echo json_encode($geojson);
		}
	}
?>