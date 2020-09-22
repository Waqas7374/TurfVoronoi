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
			
			$airports = $_GET['airports'];
			$albertsons = $_GET['albertsons'];
			$aldistores = $_GET['aldistores'];
			$amazon = $_GET['amazon'];
			$brownfields = $_GET['brownfields'];
			$culver = $_GET['culver'];
			$dicks = $_GET['dicks'];
			$dma = $_GET['dma'];
			$ethanol = $_GET['ethanol'];
			$farmers = $_GET['farmers'];
			$freight = $_GET['freight'];
			$grainger = $_GET['grainger'];
			$grocery = $_GET['grocery'];
			$shelter = $_GET['shelter'];
			$interchanges = $_GET['interchanges'];
			$iana = $_GET['iana'];
			$keef = $_GET['keef'];
			$majorports = $_GET['majorports'];
			$mclane = $_GET['mclane'];
			$mls = $_GET['mls'];
			$parkway = $_GET['parkway'];
			$ports = $_GET['ports'];
			$publix = $_GET['publix'];
			$refri = $_GET['refri'];
			$shopping = $_GET['shopping'];
			$stores = $_GET['stores'];
			$sysco = $_GET['sysco'];
			$tartan = $_GET['tartan'];
			$thornton = $_GET['thornton'];
			$toys = $_GET['toys'];
			$tyson = $_GET['tyson'];
			$transit = $_GET['transit'];
			$usf = $_GET['usf'];
			
			$message;
			
			$rowsToInsert = array(
				array(
					'user_id' => $user_id,
					'layer' => 'airports',
					'stroke' => $airports
				),
				array(
					'user_id' => $user_id,
					'layer' => 'albertsons',
					'stroke' => $albertsons
				),
				array(
					'user_id' => $user_id,
					'layer' => 'aldistores',
					'stroke' => $aldistores
				),
				array(
					'user_id' => $user_id,
					'layer' => 'amazon',
					'stroke' => $amazon
				),
				array(
					'user_id' => $user_id,
					'layer' => 'brownfields',
					'stroke' => $brownfields
				),
				array(
					'user_id' => $user_id,
					'layer' => 'culver',
					'stroke' => $culver
				),
				array(
					'user_id' => $user_id,
					'layer' => 'dicks',
					'stroke' => $dicks
				),
				array(
					'user_id' => $user_id,
					'layer' => 'dma',
					'stroke' => $dma
				),
				array(
					'user_id' => $user_id,
					'layer' => 'ethanol',
					'stroke' => $ethanol
				),
				array(
					'user_id' => $user_id,
					'layer' => 'farmers',
					'stroke' => $farmers
				),
				array(
					'user_id' => $user_id,
					'layer' => 'freight',
					'stroke' => $freight
				),
				array(
					'user_id' => $user_id,
					'layer' => 'grainger',
					'stroke' => $grainger
				),
				array(
					'user_id' => $user_id,
					'layer' => 'grocery',
					'stroke' => $grocery
				),
				array(
					'user_id' => $user_id,
					'layer' => 'shelter',
					'stroke' => $shelter
				),
				array(
					'user_id' => $user_id,
					'layer' => 'interchanges',
					'stroke' => $interchanges
				),
				array(
					'user_id' => $user_id,
					'layer' => 'iana',
					'stroke' => $iana
				),
				array(
					'user_id' => $user_id,
					'layer' => 'keef',
					'stroke' => $keef
				),
				array(
					'user_id' => $user_id,
					'layer' => 'majorports',
					'stroke' => $majorports
				),
				array(
					'user_id' => $user_id,
					'layer' => 'mclane',
					'stroke' => $mclane
				),
				array(
					'user_id' => $user_id,
					'layer' => 'mls',
					'stroke' => $mls
				),
				array(
					'user_id' => $user_id,
					'layer' => 'parkway',
					'stroke' => $parkway
				),
				array(
					'user_id' => $user_id,
					'layer' => 'ports',
					'stroke' => $ports
				),
				array(
					'user_id' => $user_id,
					'layer' => 'publix',
					'stroke' => $publix
				),
				array(
					'user_id' => $user_id,
					'layer' => 'refri',
					'stroke' => $refri
				),
				array(
					'user_id' => $user_id,
					'layer' => 'shopping',
					'stroke' => $shopping
				),
				array(
					'user_id' => $user_id,
					'layer' => 'stores',
					'stroke' => $stores
				),
				array(
					'user_id' => $user_id,
					'layer' => 'sysco',
					'stroke' => $sysco
				),
				array(
					'user_id' => $user_id,
					'layer' => 'tartan',
					'stroke' => $tartan
				),
				array(
					'user_id' => $user_id,
					'layer' => 'thornton',
					'stroke' => $thornton
				),
				array(
					'user_id' => $user_id,
					'layer' => 'toys',
					'stroke' => $toys
				),
				array(
					'user_id' => $user_id,
					'layer' => 'tyson',
					'stroke' => $tyson
				),
				array(
					'user_id' => $user_id,
					'layer' => 'transit',
					'stroke' => $transit
				),
				array(
					'user_id' => $user_id,
					'layer' => 'usf',
					'stroke' => $usf
				)
			);

			$sql = "Delete FROM radiuspref WHERE user_id=" . $_SESSION["user_id"];
			$stmt = $DB->prepare($sql);
			$stmt->execute();
			
			$data = pdoMultiInsert('radiuspref', $rowsToInsert, $DB);
			if($data){
				$message = "Done";
			}else{
				$message = "Sorry.";
			}
			echo $message;
		}
	}
?>