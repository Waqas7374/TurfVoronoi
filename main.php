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
		else
		{
			try {
				$sql = "SELECT topbar,sidebar,inputpane,foodpane,housingpane,healthcarepane,conditionspane,outputpane,determinantspane,crosswalk FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$paneValues = $stmt->fetchAll();
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>
<!DOCTYPE html>
<html class="ls-top-navbar show-sidebar sidebar-l2 sidebar-r2" lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Census Tracts</title>

	<link href="css/vendor/bootstrap.css" rel="stylesheet">
	<link href="css/vendor/font-awesome.css" rel="stylesheet">
	<link href="css/vendor/picto.css" rel="stylesheet">
	<link href="css/vendor/material-design-iconic-font.css" rel="stylesheet">
	<link href="css/vendor/datepicker3.css" rel="stylesheet">
	<link href="css/vendor/jquery.minicolors.css" rel="stylesheet">
	<link href="css/vendor/bootstrap-slider.css" rel="stylesheet">
	<link href="css/vendor/railscasts.css" rel="stylesheet">
	<link href="css/vendor/jquery-jvectormap.css" rel="stylesheet">
	<link href="css/vendor/owl.carousel.css" rel="stylesheet">
	<link href="css/vendor/slick.css" rel="stylesheet">
	<link href="css/vendor/morris.css" rel="stylesheet">
	<link href="css/vendor/ui.fancytree.css" rel="stylesheet">
	<link href="css/vendor/daterangepicker-bs3.css" rel="stylesheet">
	<link href="css/vendor/jquery.bootstrap-touchspin.css" rel="stylesheet">

	<!-- ALL APP CSS -->
	<link href="css/app/app.css" rel="stylesheet">
	<!-- /ALL APP CSS -->

	<!-- Google Fonts -->
	<link href="css/Lato.css" rel="stylesheet">
	<link href="css/Cormorant+Garamond.css" rel="stylesheet">
	<!-- /Google Fonts -->

	<!-- custom css -->
	<link href="css/dgi.css" rel="stylesheet" />
	<!-- /custom css -->

	<script type="text/javascript" src="js/jquery.js"></script>
	<link rel="stylesheet" href="style/ol.css" type="text/css" />
	<link rel="stylesheet" type="text/css" href="style/ol3-contextmenu.css" />
	<link rel="stylesheet" type="text/css" href="style/magicsuggest-min.css" />
	<link rel="stylesheet" type="text/css" href="style/LayerControl.css" />
	<link rel="stylesheet" type="text/css" href="style/swipecontrol.css" />
	<link rel="stylesheet" type="text/css" href="style/bootstrap-select.min.css" />
	<link rel="stylesheet" type="text/css" href="style/toastr.min.css" />
	<link rel="stylesheet" type="text/css" href="style/bootstrap-slider.min.css" />
	<link rel="stylesheet" type="text/css" href="style/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="style/ol-geocoder.min.css" />
	<link rel="stylesheet" type="text/css" href="style/animate.css" />
	<link rel="stylesheet" type="text/css" href="style/style.css">
	<link rel="stylesheet" type="text/css" href="style/bootstrap.colorpickersliders.min.css">
	<link rel="stylesheet" type="text/css" href="style/ol-ext.css">
	<link rel="stylesheet" type="text/css" href="style/jquery.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="style/bootstrap-datepicker3.css">

	<script type="text/javascript" src="js/ol.js"></script>
	<script type="text/javascript" src="js/ol-ext.js"></script>
	<script type="text/javascript" src="js/proj4.js"></script>
	<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/d3.v4.min.js"></script>
	<script type="text/javascript" src="js/init_ol_d3.js"></script>
	<script type="text/javascript" src="js/gistfile1.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<script type="text/javascript" src="js/turf.min.js"></script>
	<script type="text/javascript" src="js/jquery.multiselect.js"></script>
	<script type="text/javascript" src="js/reqwest.js"></script>
	<script type="text/javascript" src="js/ol3-contextmenu.js"></script>
	<script type="text/javascript" src="js/getpreview.js"></script>
	<script type="text/javascript" src="js/magicsuggest.js"></script>
	<script type="text/javascript" src="js/swipecontrol.js"></script>
	<script type="text/javascript" src="js/bootstrap-select.min.js"></script>
	<script type="text/javascript" src="js/toastr.min.js"></script>
	<script type="text/javascript" src="js/FileSaver.min.js"></script>
	<script type="text/javascript" src="js/jspdf.min.js"></script>
	<script type="text/javascript" src="js/bootstrap-slider.min.js"></script>
	<script type="text/javascript" src="js/jqExportMap.js"></script>
	<script type="text/javascript" src="js/Chart.bundle.min.js"></script>
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/selectclusterinteraction.js"></script>
	<script type="text/javascript" src="js/animatedclusterlayer.js"></script>
	<script type="text/javascript" src="js/topojson.v1.min.js"></script>
	<script type="text/javascript" src="js/ol-geocoder.js"></script>
	<script type="text/javascript" src="js/rbush.min.js"></script>
	<script type="text/javascript" src="js/labelgun.min.js"></script>
	<script type="text/javascript" src="js/html2pdf.bundle.min.js"></script>
	<script type="text/javascript" src="js/prettify.js"></script>
	<script type="text/javascript" src="js/tinycolor.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.colorpickersliders.min.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
	<!--<script type="text/javascript" src="js/ExportMap.js"></script> -->
	<script src="js/jszip.js"></script>
	<script src="js/jszip-utils.js"></script>
	<script src="js/preprocess.js"></script>
	<script src="js/preview.js"></script>
	<script src="js/jszipTwo.js"></script>
	<script src="js/jszip-utilsTwo.js"></script>
	<script src="js/preprocessTwo.js"></script>
	<script src="js/previewTwo.js"></script>

    <!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="js/papaparse.min.js"></script>
	<script src="js/plotly-basic-latest.min.js"></script>

	<!-- PivotTable.js libs from ../dist -->
	<link rel="stylesheet" type="text/css" href="js/dist/pivot.css">
	<script type="text/javascript" src="js/dist/pivot.js"></script>
	<script type="text/javascript" src="js/dist/d3_renderers.js"></script>
	<script type="text/javascript" src="js/dist/plotly_renderers.js"></script>
	<script type="text/javascript" src="js/dist/export_renderers.js"></script>

	<!-- Custom Coding block -->
	<script type="text/javascript" src="AppScripts/MapGeneralFunctions.js"></script>
	<script type="text/javascript" src="AppScripts/supportingFunctions.js"></script>
	<script type="text/javascript" src="AppScripts/Script.js"></script>
	<script type="text/javascript" src="AppScripts/handleCohorts.js"></script>
	<script type="text/javascript" src="AppScripts/LogosOnOff.js"></script>
	<script type="text/javascript" src="AppScripts/measuring.js"></script>
	<script type="text/javascript" src="AppScripts/AppScript.js"></script>
	<script type="text/javascript" src="AppScripts/functions.js"></script>
	<script type="text/javascript" src="AppScripts/functionsRatios.js"></script>
	
	<script type="text/javascript" src="js/main.js"></script>
</head>

<body id="home-body" onload="init()">

	<?php include '_top.php'; ?>

	<?php if($paneValues[0]["sidebar"] == 1) include '_sidebar.php'; ?>

	<?php   
			// echo '<div id="showInput">&nbsp;I
				// <br>N
				// <br>P
				// <br>U
				// <br>T
			// </div>';
			echo '<div id="showInput" title="Project"><img src="images/Icons/panes/project.png" height="40" width="40" /></div>';
			include '_input.php';
	?>

	<?php if($paneValues[0]["conditionspane"] == 1) 
		{ 
			// echo '<div id="showConditions">C
				// <br>O
				// <br>N
				// <br>D
				// <br>I
				// <br>T
				// <br>I
				// <br>O
				// <br>N
				// <br>S
			// </div>';
			echo '<div id="showConditions" title="Conditions"><img src="images/Icons/panes/conditions.png" height="40" width="40" /></div>';
			include '_conditions.php'; 
		}
	?>

	<?php if($paneValues[0]["determinantspane"] == 1) 
		{ 
			// echo '<div id="showConditions">C
				// <br>O
				// <br>N
				// <br>D
				// <br>I
				// <br>T
				// <br>I
				// <br>O
				// <br>N
				// <br>S
			// </div>';
			echo '<div id="showDeterminants" title="Determinants"><img src="images/Icons/panes/determinants.png" height="40" width="40" /></div>';
			include '_determinants.php'; 
		}
	?>

	<?php if($paneValues[0]["foodpane"] == 1)
		{   
			// echo '<div id="showFood">F
		        // <br>O
				// <br>O
				// <br>D
			// </div>';
			echo '<div id="showFood" title="Food"><img src="images/Icons/panes/food.png" height="40" width="40" /></div>';
			include '_food.php';
		}
	?>

	<?php if($paneValues[0]["housingpane"] == 1)
		{   
			// echo '<div id="showHousing">H
		        // <br>O
				// <br>U
				// <br>S
				// <br>I
				// <br>N
				// <br>G
			// </div>';
			echo '<div id="showHousing" title="Housing"><img src="images/Icons/panes/housing.png" height="40" width="40" /></div>';
			include '_housing.php';
		}
	?>

	<?php if($paneValues[0]["healthcarepane"] == 1) 
		{   
			// echo '<div id="showHealth">H
				// <br>E
				// <br>A
				// <br>L
				// <br>T
				// <br>H
				// <br>C
				// <br>A
				// <br>R
				// <br>E
			// </div>';
			echo '<div id="showHealth" title="Healthcare"><img src="images/Icons/panes/healthcare.png" height="40" width="40" /></div>';
			include '_health.php';
		}
	?>

	<?php if($paneValues[0]["crosswalk"] == 1) 
		{   
			// echo '<div id="showHealth">H
				// <br>E
				// <br>A
				// <br>L
				// <br>T
				// <br>H
				// <br>C
				// <br>A
				// <br>R
				// <br>E
			// </div>';
			echo '<div id="showCrosswalk" title="Crosswalks"><img src="images/Icons/panes/crosswalk.png" height="40" width="40" /></div>';
			include '_crosswalk.php';
		}
	?>

	<?php if($paneValues[0]["outputpane"] == 1) 
		{  
			// echo '<div id="showOutput">O
				// <br>U
				// <br>T
				// <br>P
				// <br>U
				// <br>T
			// </div>';
			echo '<div id="showOutput" title="Output"><img src="images/Icons/panes/output.png" height="40" width="40" /></div>';
			include '_output.php';
		}
	?>
	
	<div id="content">
		<div class="container-fluid">
			<div class="umair" data-toggle="isotope">
				<div id="divSBS" style="display:none;">
					<div id="headerleft">
						<h2>2016 Crop Cover</h2>
					</div>
					<div id="headerright">
						<h2>2008 Crop Cover</h2>
					</div>

					<div id="mapleft"></div>
					<div id="mapright"></div>
				</div>

				<!-- main content -->
				<div id="map" class="map">
					<div id="printDiv" style="display:none;">
						<table>
							<!-- logo -->
							<tr>
							<td>
								<img src="images/Legend/ari-logo.png" height="50" width="190" />
							</td>
							</tr>
							<!-- legend -->
							<tr>
							<td>
								<div id="legendInPrint">
								</div>
							</td>
							</tr>
							<!-- copyright -->
							<tr>
							<td>
								© 2018 The Association for RedevelopmentInitiatives. <br>All rights reserved.
							</td>
							</tr>
						</table>
					</div>
					<div class="progress">
						<div id="js-progress-bar" class="progress-bar"></div>
					</div>
					<div class="table-loader"><img src="style/images/loader.gif" alt="Be patient..." /></div>
					
					<div id="filters" style="z-index:15000;padding-left:225px;">
					</div>
					<div id="voronoiTable" class="tab-pane fade in active" title="Voronoi Analysis for Selected Voronoi Polygon">
					</div>
				</div>
				<div id="popup" class="ol-popup" style="display:none;">
					<a href="#" id="popup-closer" class="ol-popup-closer"></a>
					<div id="popup-content"></div>
				</div>
				<div class="loading" id="loading">Please Wait....
					<div class="loader"></div>
				</div>
				<div id="mouse-position"></div>
				<!-- /main content -->

			</div>
		</div>
	</div>

	<div id="modal" class="tab-pane fade in active" title="Select data for analysis" style="display:none;">
		<h4>Data for Report:</h4>
		<select id="dataForReportModal" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count">
				<optgroup label="Primary Data">
					<option data-content="<img height='25px' width='25px' src='images/Icons/tractor.png' /> &nbsp;&nbsp;Farmer's Market" value="reportFarmer" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/store.png' /> &nbsp;&nbsp;Grocery Stores" value="reportStores" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/logosIL/marker.png' /> &nbsp;&nbsp;Stores Logos" value="reportLogos" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/brownfields.png' /> &nbsp;&nbsp;Brownfields" value="reportBrown" selected></option>
				</optgroup>
				<optgroup label="Own Data">
					<option data-content="<img height='25px' width='25px' src='images/Icons/garden.png' /> &nbsp;&nbsp;Community Gardens" value="reportGardens" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/natural.png' /> &nbsp;&nbsp;Natural Resources" value="reportNatural" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Destinations" value="reportManMadeDest" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Faith Based" value="reportManMadeFaith" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Government" value="reportManMadeGovt" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Infrastructure" value="reportManMadeInfra" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Public Spaces" value="reportManMadePublic" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/manmade.png' /> &nbsp;&nbsp;Manmade-Retail Places" value="reportManMadeRetail" selected></option>
				</optgroup>
				<optgroup label="Transportation Data">
					<option data-content="<img height='25px' width='25px' src='images/Icons/Airports/medium.png' /> &nbsp;&nbsp;Airports" value="reportAirports" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/freight.png' /> &nbsp;&nbsp;Freight Intersects" value="reportFreightInt" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/crossing.png' /> &nbsp;&nbsp;Interchanges" value="reportInterchanges" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/iana.png' /> &nbsp;&nbsp;Intermodal Sites" value="reportIana" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/transit.png' /> &nbsp;&nbsp;Transit Stops" value="reportTransitStop" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/port.png' /> &nbsp;&nbsp;Port Facility" value="reportPortFacility" selected></option>
				</optgroup>
				<optgroup label="Distribution Centers">
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/amazon.png' /> &nbsp;&nbsp;Amazon" value="reportAmazon" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/sysco.png' /> &nbsp;&nbsp;Sysco Foods" value="reportSysco" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/usf.png' /> &nbsp;&nbsp;US Foods" value="reportUsf" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/fedex.png' /> &nbsp;&nbsp;Fedex" value="reportFedex" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/dhl.png' /> &nbsp;&nbsp;DHL" value="reportDhl" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/distributions/ups.png' /> &nbsp;&nbsp;UPS" value="reportUps" selected></option>
				</optgroup>
				<optgroup label="Retail Datasets">
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/Albertsons/2.png' /> &nbsp;&nbsp;Albertsons Stores" value="reportAlbertsons" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/culver.png' /> &nbsp;&nbsp;Culver Stores" value="reportCulver" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/dicks.png' /> &nbsp;&nbsp;Dicks Sporting Goods" value="reportDicks" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/tyson.png' /> &nbsp;&nbsp;Foodplants & Cooperate Offices" value="reportFoodPlants" selected></option>
					<option data-content="<img height='25px' width='50px' src='images/Icons/retail/GiantEagle/gianteagle.png' /> &nbsp;&nbsp;Giant Eagle" value="reportGiantEagle" selected></option>
					<option data-content="<img height='25px' width='50px' src='images/Icons/retail/Kroger/Kroger.png' /> &nbsp;&nbsp;Kroger" value="reportKroger" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/publix.png' /> &nbsp;&nbsp;Publix Stores" value="reportPublix" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/ranches.png' /> &nbsp;&nbsp;Ranches & Farms" value="reportFarmRanches" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/shoppingcenter.png' /> &nbsp;&nbsp;Shopping Centers" value="reportShopping" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/traderjoes.png' /> &nbsp;&nbsp;Trader Joe's" value="reportTraderJoes" selected></option>
					<option data-content="<img height='25px' width='25px' src='images/Icons/retail/wholefoods.png' /> &nbsp;&nbsp;Whole Foods" value="reportWholeFoods" selected></option>
				</optgroup>
				<optgroup label="Social Datasets">
					<option value="reportPopu" selected>Population (count)</option>
					<option value="reportDensity" selected>Population (Density)</option>
					<option value="reportHH" selected>Households (count)</option>
				</optgroup>
				<optgroup label="Economic Datasets">
					<option value="reportIncome" selected>Income (average)</option>
					<option value="reportVacancy" selected>Vacancy (rate)</option>
				</optgroup>
		</select>
		<h4>Data to Graph:</h4>
		<select id="dataToGraphModal" class="selectpicker show-tick">
				<optgroup label="Common Sets">
					<option value="none">Select the layer(s)</option>
					<option value="Vacancy (rate) (Top 10)">Vacancy (rate)</option>
					<option value="Population (count) (Top 10)">Population (count)</option>
					<option value="Income (average) (Top 10)">Income (average)</option>
					<option value="Households (count) (Top 10)">Households (count)</option>
				</optgroup>
				<optgroup label="Price to Rent Ratio">
					<option value="PTRR Highest Ratio">Highest Ratio Latest (Top 10)</option>
					<option value="PTRR Lowest Ratio">Lowest Ratio Latest (Bottom 10)</option>
					<option value="PTRR Highest Ratio-Old">Highest Ratio Oldest (Top 10)</option>
					<option value="PTRR Lowest Ratio-Old">Lowest Ratio Oldest (Bottom 10)</option>
					<option value="Change Trend (Top 10)">Change Trend Oldest->New (Top 10)</option>
					<option value="Change Trend (Bottom 10)">Change Trend Oldest->New (Bottom 10)</option>
					<option value="Zipcode">Pick a Zipcode</option>
				</optgroup>
			</select>
		<div id="divZipcodeModal">
			Select the zipcode to view trend:<br>
			<select id="zipcodeModal" class="selectpicker show-tick" data-size="10" data-live-search="true" onchange="getChartForZip();">
			</select>
		</div>
	</div>

	<div id="isoModal" class="tab-pane fade in active" title="Accessibility" style="display:none;">
		<h5 id="headingTimeDist"><b> Distance </b></h5>
		<div class="onoffswitch">
			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchTimeDistance" onchange="changeTimeDist($(this).prop('checked')?'active':'dull')" checked>
			<label class="onoffswitch-label" for="switchTimeDistance"></label>
		</div>
		<div class="bottomBar"></div>
		<div id="intervalValues">
			<h5 id="timeInterval">Time Intervals (In Minutes, max value: 60)</h5>
			<h5 id="distInterval">Distance Intervals (In Miles, max value: 60)</h5>
			<input type="number" id="firstInterval" min="5" step="1" value="5" class="underLineText" /> , <input type="number" id="secondInterval" min="5" step="1" value="10" class="underLineText" /> , <input type="number" id="thirdInterval" min="5" step="1" value="15" class="underLineText" /> , <input type="number" id="fourthInterval" min="5" step="1" value="20" class="underLineText" /> , <input type="number" id="fifthInterval" min="5" step="1" value="25" class="underLineText" /> , <input type="number" id="sixthInterval" min="5" step="1" value="30" class="underLineText" /><br>
			<div class="bottomBar"></div>
			<div id="driveProfile">
				<h5>Transportation</h5>
				<select id="isoProfile" class="selectpicker show-tick dropup">
						<option value="driving-car">Driving Car</option>
						<option value="cycling-regular">Cycling</option>
						<option value="foot-walking">Walking</option>
				</select>
				<div class="bottomBar"></div>
				<h5>Avg. Speed:</h5><input type="number" id="speedLimit" min="25" max="150" step="1" value="35" class="underLineText" /> miles / hour
			</div>
		</div>
	</div>

	<div id="radiusModal" class="tab-pane fade in active" title="Options for Radius based selection" style="display:none;">
		<h5>Radius Intervals (In Miles)</h5>
		<input type="number" id="radFirstInt" min="1" step="1" value="1" class="underLineText" />, <input type="number" id="radSecondInt" min="3" step="1" value="3" class="underLineText" />, <input type="number" id="radThirdInt" min="5" step="1" value="5" class="underLineText" />
	</div>

	<div id="isochroneModal" class="tab-pane fade in active" title="Options for Isochrones based selection" style="display:none;">
		<h5>Distance Intervals (In Miles, max value: 60)</h5>
		<input type="number" id="isoFirstInt" min="5" step="1" value="5" max="35" class="underLineText" />, <input type="number" id="isoSecondInt" min="10" step="1" value="10" max="40" class="underLineText" />, <input type="number" id="isoThirdInt" min="15" step="1" value="15" max="45" class="underLineText" />, <input type="number" id="isoFourthInt" min="20" step="1" value="20" max="50" class="underLineText" />, <input type="number" id="isoFifthInt" min="25" step="1" value="25" max="55" class="underLineText" />, <input type="number" id="isoSixthInt" min="30" step="1" value="30" max="60" class="underLineText" />
	</div>

	<div id="projectModal" class="tab-pane fade in active" title="Choose name of the project" style="display:none;">
		<h5>Project Title</h5>
		<input type="text" id="txtProjectTitle" placeholder="Enter a project name.." />
	</div>

	<div id="myModal" class="tab-pane fade in active" title="Select data for analysis" style="display:none;">
		<div class="modal-dialog" role="document" >
			<div class="modal-content ui-widget-content" id="resizeDiv">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title"><b id="myModalLabel"></b></h4>
				</div>
				<div class="modal-body">
					<div id="table" style="display:none; text-align:center;"></div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>