<?php
function redirect($url) {

    echo "<script language=\"JavaScript\">\n";
    echo "<!-- hide from old browser\n\n";

    echo "window.location = \"" . $url . "\";\n";

    echo "-->\n";
    echo "</script>\n";

    return true;
}

function isLoginSessionExpired() 
{
	$login_session_duration = 3600; 
	$current_time = time(); 
	if(isset($_SESSION['loggedin_time']) and isset($_SESSION["user_id"]))
	{  
		if(((time() - $_SESSION['loggedin_time']) > $login_session_duration))
		{ 
			return true; 
		} 
	}
	return false;
}

function pdoMultiInsert($tableName, $data, $pdoObject){
    $rowsSQL = array();
    $toBind = array();
    $columnNames = array_keys($data[0]);
 
    foreach($data as $arrayIndex => $row){
        $params = array();
        foreach($row as $columnName => $columnValue){
            $param = ":" . $columnName . $arrayIndex;
            $params[] = $param;
            $toBind[$param] = $columnValue; 
        }
        $rowsSQL[] = "(" . implode(", ", $params) . ")";
    }
 
    $sql = "INSERT INTO `$tableName` (" . implode(", ", $columnNames) . ") VALUES " . implode(", ", $rowsSQL);
 
    $pdoStatement = $pdoObject->prepare($sql);
 
    foreach($toBind as $param => $val){
        $pdoStatement->bindValue($param, $val);
    }
    
    return $pdoStatement->execute();
}

?>