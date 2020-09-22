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
			$user_id = $_SESSION['user_id'];
			
			$title = $_GET['title'];
			$zoom = $_GET['zoom'];
			$lati = $_GET['lati'];
			$longi = $_GET['longi'];
			$rotation = $_GET['rotation'];
			$base = $_GET['base'];
			$resultSelectedIcon = $_GET['selectedIcon'];
			$resultPrim = $_GET['resultPrim'];
			$resultClosings = $_GET['resultClosings'];
			$resultOwn = $_GET['resultOwn'];
			$resultManmade = $_GET['resultManmade'];
			$resultTpt = $_GET['resultTpt'];
			$resultAirports = $_GET['resultAirports'];
			$resultSchools = $_GET['resultSchools'];
			$resultLowIncome = $_GET['resultLowIncome'];
			$resultLowIncomeTrans = $_GET['resultLowIncomeTrans'];
			$resultBanks = $_GET['resultBanks'];
			$resultBankFilter = $_GET['resultBankFilter'];
			$resultFoodAgri = $_GET['resultFoodAgri'];
			$resultFoodCommodities = $_GET['resultFoodCommodities'];
			$resultFoodBeverages = $_GET['resultFoodBeverages'];
			$resultFoodDc = $_GET['resultFoodDc'];
			$resultFoodDcDma = $_GET['resultFoodDcDma'];
			$resultFoodRefri = $_GET['resultFoodRefri'];
			$resultFoodRefriActivities = $_GET['resultFoodRefriActivities'];
			$resultFoodHome = $_GET['resultFoodHome'];
			$resultFoodHomeSuper = $_GET['resultFoodHomeSuper'];
			$resultFoodHomeAlbertsons = $_GET['resultFoodHomeAlbertsons'];
			$resultFoodAway = $_GET['resultFoodAway'];
			$resultFoodRetailSuper = $_GET['resultFoodRetailSuper'];
			$resultHealthBoundaries = $_GET['resultHealthBoundaries'];
			$resultHealthCondition = $_GET['resultHealthCondition'];
			$resultHealthConditionTrans = $_GET['resultHealthConditionTrans'];
			$resultCondition = $_GET['resultCondition'];
			$resultSubCondition = $_GET['resultSubCondition'];
			$resultCondTrans = $_GET['resultCondTrans'];
			$resultSelectedRadius = $_GET['resultSelectedRadius'];
			$resultRadiusOpacity = $_GET['resultRadiusOpacity'];
			
			$message;
			
			$dataToInsert = [
				'user_id' => $user_id,
				'title' => $title,
				'zoom' => $zoom,
				'latitude' => $lati,
				'longitude' => $longi,
				'rotation' => $rotation,
				'base' => $base,
				'selectedIcon' => $resultSelectedIcon,
				'primary' => $resultPrim,
				'primaryclosings' => $resultClosings,
				'own' => $resultOwn,
				'ownmanmade' => $resultManmade,
				'transportation' => $resultTpt,
				'transportationAirport' => $resultAirports,
				'schools' => $resultSchools,
				'lowincome' => $resultLowIncome,
				'lowincometrans' => $resultLowIncomeTrans,
				'banks' => $resultBanks,
				'banksfilter' => $resultBankFilter,
				'foodagri' => $resultFoodAgri,
				'foodcommodities' => $resultFoodCommodities,
				'foodbeverages' => $resultFoodBeverages,
				'fooddc' => $resultFoodDc,
				'fooddcdma' => $resultFoodDcDma,
				'foodrefri' => $resultFoodRefri,
				'foodrefriactivities' => $resultFoodRefriActivities,
				'foodhome' => $resultFoodHome,
				'foodhomesuper' => $resultFoodHomeSuper,
				'foodhomealbertsons' => $resultFoodHomeAlbertsons,
				'foodaway' => $resultFoodAway,
				'foodretailsuper' => $resultFoodRetailSuper,
				'healthboundaries' => $resultHealthBoundaries,
				'healthconditions' => $resultHealthCondition,
				'healthcondtrans' => $resultHealthConditionTrans,
				'conditions' => $resultCondition,
				'subconditions' => $resultSubCondition,
				'conditionstrans' => $resultCondTrans,
				'selectedRadius' => $resultSelectedRadius,
				'radiusOpacity' => $resultRadiusOpacity
			];

			// $sql = "Delete FROM project WHERE user_id=" . $_SESSION["user_id"];
			// $stmt = $DB->prepare($sql);
			// $stmt->execute();

			$sqlTwo = "INSERT INTO `multi-admin`.`project`(`user_id`,`title`,`zoom`,`latitude`,`longitude`,`rotation`,`base`,`selectedIcon`,`selectedRadius`,`radiusOpacity`,`primary`,`primaryclosings`,`own`,`ownmanmade`,`transportation`,`transportationAirport`,`schools`,`lowincome`,`lowincometrans`,`banks`,`banksfilter`,`foodagri`,`foodcommodities`,`foodbeverages`,`fooddc`,`fooddcdma`,`foodrefri`,`foodrefriactivities`,`foodhome`,`foodhomesuper`,`foodhomealbertsons`,`foodaway`,`foodretailsuper`,`healthboundaries`,`healthconditions`,`healthcondtrans`,`conditions`,`subconditions`,`conditionstrans`,`latest`)VALUES (:user_id,:title,:zoom,:latitude,:longitude,:rotation,:base,:selectedIcon,:selectedRadius,:radiusOpacity,:primary,:primaryclosings,:own,:ownmanmade,:transportation,:transportationAirport,:schools,:lowincome,:lowincometrans,:banks,:banksfilter,:foodagri,:foodcommodities,:foodbeverages,:fooddc,:fooddcdma,:foodrefri,:foodrefriactivities,:foodhome,:foodhomesuper,:foodhomealbertsons,:foodaway,:foodretailsuper,:healthboundaries,:healthconditions,:healthcondtrans,:conditions,:subconditions,:conditionstrans,now());";

			$stmtTwo= $DB->prepare($sqlTwo);
			$data = $stmtTwo->execute($dataToInsert);
			$_SESSION['project_id'] = $DB->lastInsertId();
			
			if($data){
				$message = "Done";
			}else{
				$message = "Sorry.";
			}
			echo $message;
		}
	}
?>