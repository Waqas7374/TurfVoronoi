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
			// echo $_SESSION["project_id"];
			$sql;
			$sqlFour;

			if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {
				$sql = "SELECT inputpane FROM components where user_id=" . $_SESSION["user_id"];

				$sqlFour = "SELECT  `user_id`,`zoom`,`latitude`,`longitude`,`rotation`,`base`,`selectedIcon`,`radiusOpacity`,`primary`,`primaryclosings`,`own`,`ownmanmade`,`transportation`,`transportationAirport`,`schools`,`lowincome`,`lowincometrans`,`banks`,`banksfilter` FROM project where id=" . $_SESSION["project_id"];
				
				$sqlEight = "SELECT `extent`,`cb`,`level` FROM voronoi where user_id=" . $_SESSION["user_id"] . " and project_id=" . $_SESSION["project_id"] ;
					
				$stmtFour = $DB->prepare($sqlFour);
				$stmtFour->execute();
				$projectValues = $stmtFour->fetchAll();
				
				$stmtEight = $DB->prepare($sqlEight);
				$stmtEight->execute();
				$voronoiValues = $stmtEight->fetchAll();
			}
			else{
				$sql = "SELECT inputpane FROM components where user_id=" . $_SESSION["user_id"];
				
				$sqlFour = "SELECT  `user_id`,`zoom`,`latitude`,`longitude`,`rotation`,`base`,`selectedIcon`,`primary`,`primaryclosings`,`own`,`ownmanmade`,`transportation`,`transportationAirport`,`schools`,`lowincome`,`lowincometrans`,`banks`,`banksfilter` FROM project where user_id=" . $_SESSION["user_id"];
			}
			// echo $sql;
			// echo $sqlFour;
			// echo $sqlEight;
			try {
				// $sql = "SELECT inputpane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$a = $stmt->fetchAll();
				
				if($a[0]["inputpane"] == 1)
				{
					// $sqlFour = "SELECT  `user_id`,`zoom`,`latitude`,`longitude`,`rotation`,`base`,`primary`,`primaryclosings`,`own`,`ownmanmade`,`transportation`,`transportationAirport`,`schools`,`lowincome`,`lowincometrans`,`banks`,`banksfilter` FROM project where id=" . $_SESSION["project_id"];
					
					// $stmtFour = $DB->prepare($sqlFour);
					// $stmtFour->execute();
					// $projectValues = $stmtFour->fetchAll();
					
					if($projectValues[0]["user_id"] === NULL)
					{
						echo '<script>';
						echo 'user = false;';
						echo '</script>';
					}
					else
					{
						echo '<script>';
						echo 'project_id = ' . $_SESSION["project_id"] .';';
						echo 'user = true;';
						echo 'mapZoom = ' . $projectValues[0]["zoom"] . ';';
						echo 'selectedIcon = ' . $projectValues[0]["selectedIcon"] . ';';
						echo 'mapCenter = [' . $projectValues[0]["latitude"] . ',' . $projectValues[0]["longitude"] . '];';
						echo 'mapRotation = ' . $projectValues[0]["rotation"] . ';';
						echo 'radiusOpacity = "' . $projectValues[0]["radiusOpacity"] . '";';
						echo 'extentForVoronoi = "' . $voronoiValues[0]["extent"] . '";';
						echo 'selectedVoronoiCB = "' . $voronoiValues[0]["cb"] . '";';
						echo 'level = "' . $voronoiValues[0]["level"] . '";';
						echo 'var lowincometrans = ' . $projectValues[0]["lowincometrans"] . ';';
						echo '</script>';
					}
					
					// echo (($projectValues[0]["primary"]==NULL)?'nothing':$projectValues[0]["primary"]);
					
					// echo $projectValues[0]["transportation"];
					
					// echo ((strpos($projectValues[0]["transportation"], 'airports') !== false)?'1':"0");
					
					// echo strcmp($projectValues[0]["transportation"], 'airports');
					
					echo '<!-- sidebar Input -->
							<div id="mainDivInput" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll">
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#visualizeTab">Canvas</a></li>
										<li><a data-toggle="tab" href="#dataTab">Data</a></li>
										<li><a data-toggle="tab" href="#outputTab">Output</a></li>
									</ul>

									<div class="tab-content">

										<div id="visualizeTab" class="tab-pane fade in active">
											<div class="div-hand">
												<a data-toggle="collapse" href="#mapType" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Map Type</b>
												</a>
												<div id="mapType" class="collapse">
													<h5><b> Select a base layer: </b></h5>
													<select id="selBaseMap" class="selectpicker show-tick" onchange="changeBaseMap();">
														<option value="osm" '.((strpos($projectValues[0]["base"], 'aerial') !== false)?'selected="selected"':"").'>OSM</option>
														<option value="aerial" '.((strpos($projectValues[0]["base"], 'aerial') !== false)?'selected="selected"':"").'>Aerial/Satellite</option>
														<option value="terrain" '.((strpos($projectValues[0]["base"], 'terrain') !== false)?'selected="selected"':"").'>Terrain</option>
														<option value="streets" '.((strpos($projectValues[0]["base"], 'streets') !== false)?'selected="selected"':"").'>Streets</option>
													</select>
													
													<h5><b> Contextual Layering: </b></h5>
													<select id="selMapSwipe" class="selectpicker show-tick" onchange="mapSwipeOptions();">
														<option value="off">Swipe Off</option>
														<option value="on">Swipe On</option>
														<optgroup label="Orientation" maxOptions="1">
															<option value="vertical" selected disabled>Swipe Vertical</option>
															<option value="horizontal" disabled>Swipe Horizontal</option>
														</optgroup>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" href="#geographicSelect" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Geographic Selection</b>
												</a>
												<div id="geographicSelect" class="collapse">
													<select id="selSelectionOptions" class="selectpicker show-tick" onchange="showSelectionOptions();">
														<option value="none">Select a</option>
														<option value="boundary">Boundary ...</option>
														<option value="radius">Radius (miles)</option>
														<option value="timedist">Time/Distance</option>
														<option value="cas">Custom Area</option>
													</select><br><br>
													<div id="boundaryOpts">
														<ul>
															<select id="selSelectionOptionsTwo" class="selectpicker show-tick" onchange="showSelectionOptionsTwo();">
																<option value="none">Select detail level</option>
																<option value="macro">Macro (to County-level)</option>
																<option value="market">Market (to Neighborhood-level)</option>
															</select>
															<div id="divStates">
																<br>
																<select id="state" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectState();">
																</select>
															</div>
															<div id="divCounties">
																<br>
																<select id="county" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectCounties();">
																</select><br>
																<br>
																<input type="button" class="btn" value="Reset" onclick="resetSelections();" />
															</div>
															<div id="divCity">
																<br>
																<select id="city" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectCity();">
																</select>
															</div>
															<div id="divNeighbour">
																<br>
																<label class="radio-inline">
																	<input name="neighborhoodType" id="city" type="radio"> Within City
																</label>
																<label class="radio-inline">
																	<input name="neighborhoodType" id="notcity" type="radio"> Outside City
																</label>
																<div id="divWithinCity">
																	<li id="lblNeighbour">
																		List of Neighborhoods:
																	</li>
																	<select id="withinCity" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectWithinCity();">
																	</select>
																</div>
																<div id="divWithoutCity">
																	<li id="lblNeighbour">
																		List of Neighborhoods:
																	</li>
																	<select id="withoutCity" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectWithoutCity();">
																	</select>
																</div><br>
																<input type="button" class="btn" value="Reset" onclick="resetSelections();" />
															</div>
														</ul>
													</div>
													<div id="divType">
														<h5><b> Area Selection: </b></h5>
														<select id="drawType" class="selectpicker show-tick " onchange="drawAOI(\'dull\');">
															<option value="None">None</option>
															<option value="Box">Box</option>
															<option value="Polygon">Polygon</option>
															<option value="Circle">Circle</option>
														</select>
													</div>
													<div id="divMask">
														<h5><b> Apply Overlay: </b></h5>
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	Pattern: <div id="select"></div>
																	<div id="pselect"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="size" type="number" min=0 value=5 onchange="refresh()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacing" type="number" min=0 value=10 onchange="refresh()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="angle" type="number" value=0 onchange="refresh()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offset" type="number" value=0 onchange="refresh()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scale" type="number" value=1 onchange="refresh()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="color" onchange="refresh()">
																		<option style="background: #ffffe5; color: Red;" value="rgb(255,255,229)">Light Yellow</option>
																		<option style="background: #f7fcb9; color: Red;" value="rgb(247,252,185)">Chiffon</option>
																		<option style="background: #d9f0a3; color: Red;" value="rgb(217,240,163)">Reef</option>
																		<option style="background: #addd8e; color: Red;" value="rgb(173,221,142)">Feijoa</option>
																		<option style="background: #78c679; color: Red;" value="rgb(120,198,121)">De York</option>
																		<option style="background: #41ab5d; color: Red;" value="rgb(65,171,93)">Chateau Green</option>
																		<option style="background: #238443; color: Red;" value="rgb(35,132,67)">Salem</option>
																		<option style="background: #006837; color: Red;" value="rgb(0,104,55)">Fun Green</option>
																		<option style="background: #004529; color: Red;" value="rgb(0,69,41)">British Racing Green</option>
																	</select>
																</li>
																<li>
																	<label>Background: </label>
																	<select id="bg" onchange="refresh()">
																		<option value="rgba(0,0,0,0)">Transparent</option>
																		<option style="background: White; color: Black;" value="rgba(255,255,255,0.3)">White</option>
																		<option style="background: Blue; color: Red;" value="rgba(0,0,255,0.3)">Blue</option>
																		<option style="background: Red; color: White" value="rgba(255,0,0,0.3)">Red</option>
																		<option style="background: Green; color: Black;" value="rgba(0,255,0,0.5)">Green</option>
																		<option style="background: Yellow; color: Blue;"value="rgba(255,255,0,0.5)">Yellow</option>
																	</select>
																</li>
															</ul>
															<i class="fa fa-bug" style="visibility:hidden"></i>
														</div>
														<h5><b> Overlay / Masking Color: </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="maskCB" onchange="changeMaskColor($(this).prop(\'checked\')?\'dull\':\'active\')" checked>
															<label class="onoffswitch-label" for="maskCB"></label>
														</div>
														<div id="divMaskColor">
															<h5><b> Masking Color: </b></h5>
															<input type="text" id="maskingFilter" value="rgba(0,0,0,0.4)" data-color-format="hex">
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" href="#isochroneDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Accessibility</b>
												</a>
												<div id="isochroneDiv" class="collapse">
													<h5><b> Display Time/Distance: </b></h5>
													<div id="isoDiv" class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="isochrone" onchange="drawIsoChrone($(this).prop(\'checked\')?\'dull\':\'active\')">
														<label class="onoffswitch-label" for="isochrone"></label>
													</div>
													<div id="isoTrans">
														<ul>
															<li id="labelFrames">
																<h5>Multiple Locations</h5>
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbMultiIso" onchange="turnMultipleIso($(this).prop(\'checked\')?\'dull\':\'active\')">
																<label class="onoffswitch-label" for="cbMultiIso"></label>
																<h5>Transparency</h5>
																<div id="iptIsoOpacity"><div id="isohandle" class="ui-slider-handle"></div></div>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>
										<div id="dataTab" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refPrimary" href="#primData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Primary Data</b>
												</a>
												<div id="primData" class="collapse">
													<select id="primaryData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addPrimaryData();">
														<option value="brownfields" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'brownfields') !== false)?'selected="selected"':"").'>Brownfields</option>
														<option value="datafiberbuildings" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'datafiber') !== false)?'selected="selected"':"").'>Data Fiber Buildings</option>
														<option value="dicks" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'dicks') !== false)?'selected="selected"':"").'>Dicks Sporting Goods</option>
														<option value="grainger" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'grainger') !== false)?'selected="selected"':"").'>Grainger</option>
														<option value="stores" '.((strpos($projectValues[0]["primary"], 'stores') !== false)?'selected="selected"':"").'>Grocery Stores</option>
														<option value="keef" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'keef') !== false)?'selected="selected"':"").'>Keef Brands</option>
														<option value="parkway" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'parkway') !== false)?'selected="selected"':"").'>Parkway Bank</option>
														<option value="tartan" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'tartan') !== false)?'selected="selected"':"").'>Tartan Current Listing</option>
														<option value="shopping" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'shopping') !== false)?'selected="selected"':"").'>Shopping Centers</option>
														<option value="closings" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'closings') !== false)?'selected="selected"':"").'>Store Closings</option>
														<option value="logos" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'logos') !== false)?'selected="selected"':"").'>Retailers (sample)</option>
														<option value="uhaul" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'uhaul') !== false)?'selected="selected"':"").'>Uhaul</option>
														<option value="fairgrounds" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'fairgrounds') !== false)?'selected="selected"':"").'>Fairgrounds</option>
														<option value="fortune" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'fortune') !== false)?'selected="selected"':"").'>Fortune</option>
													</select>
													<div id="closingsDataDiv">
														<h5>Closings Stores:</h5>
														<select id="closingsData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addClosingsData();">
															<option value="sears" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'sears') !== false)?'selected="selected"':"").'>Sears</option>
															<option value="toys" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'toys') !== false)?'selected="selected"':"").'>Toys-R-Us</option>
															<option value="gymboree" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'gymboree') !== false)?'selected="selected"':"").'>Gymboree</option>
														</select>
													</div>
													<div id="gymboreeBrandsDiv">
														<h5>Gymboree Brands:</h5>
														<select id="gymboreeBrands" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterGymboreeBrands();">
															<option value="gymboree" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'gymboree') !== false)?'selected="selected"':"").' selected>Gymboree</option>
															<option value="crazy8" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'crazy8') !== false)?'selected="selected"':"").' selected>Crazy8</option>
															<option value="janieandjack" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'janieandjack') !== false)?'selected="selected"':"").' selected>Janie And Jack</option>
														</select>
													</div>
													<div id="gymboreeBrandsTypeDiv">
														<h5>Stores Type:</h5>
														<select id="gymboreeBrandsType" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterGymboreeBrandsType();">
															<option value="retail" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'retail') !== false)?'selected="selected"':"").' selected>Retail</option>
															<option value="outlet" '.((strlen($projectValues[0]["primaryclosings"]) > 0 && strpos($projectValues[0]["primaryclosings"], 'outlet') !== false)?'selected="selected"':"").' selected>Outlet</option>
														</select>
													</div>
													<div id="optDataFiberBuildings">
														<h5><b> Data Fiber Buildings: </b></h5>
														<select id="datafiberBuildingsFilter" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterDataFiberBuildings();">
															<option value="enterprisebuildings" selected>Enterprise Buildings</option>
															<option value="networkbuildings" selected>Network Buildings</option>
														</select>
													</div>
													<div id="logosPrimary">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsPrimary" onchange="changeLabelsPrimary($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsPrimary"></label>
														</div>
													</div>
													<div id="radiusPrimary">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusPrimary" onchange="changePrimaryRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusPrimary"></label>
														</div>
													</div>
													<div id="divVorPrimary">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbPrimaryVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\', $(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbPrimaryVoronoi"></label>
														</div>
														<div id="voroPrimaryAreaDiv">
															<h5><b> Select Area Type: </b></h5>
															<select id="voroPrimaryAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Primary\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>
														<div id="voronoiControlsPrimary">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanPrimary" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanPrimary">Pan</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkAddPrimary" name="controls">
																	<label class="lblVorCntrls" for="chkAddPrimary">Add</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkDelPrimary" name="controls">
																	<label class="lblVorCntrls" for="chkDelPrimary">Delete</label>
																</div>
																	   
																<div class="tab">
																	<input type="radio" id="chkInteractivePrimary" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractivePrimary">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbPrimaryVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbPrimaryVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorPrimaryOpacity"><div id="vorPrimaryhandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refEnergy" href="#enerData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Energy Data</b>
												</a>
												<div id="enerData" class="collapse">
													<select id="energyData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addEnergyData();">
														<option value="biodieselplants" '.((strlen($projectValues[0]["energy"]) > 0 && strpos($projectValues[0]["energy"], 'shopping') !== false)?'selected="selected"':"").'>Biodiesel Plants</option>
														<option value="ethanol" '.((strlen($projectValues[0]["energy"]) > 0 && strpos($projectValues[0]["energy"], 'ethanol') !== false)?'selected="selected"':"").'>Ethanol Plants</option>
														<option value="naturalgaspipelines" '.((strlen($projectValues[0]["energy"]) > 0 && strpos($projectValues[0]["energy"], 'logos') !== false)?'selected="selected"':"").'>Natural Gas Pipelines</option>
														<option value="oilrefineries" '.((strlen($projectValues[0]["energy"]) > 0 && strpos($projectValues[0]["energy"], 'closings') !== false)?'selected="selected"':"").'>Oil Refineries</option>
														<option value="tapetro" '.((strlen($projectValues[0]["energy"]) > 0 && strpos($projectValues[0]["energy"], 'tapetro') !== false)?'selected="selected"':"").'>TA Petro</option>
													</select>
													<div id="logosEnergy">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsEnergy" onchange="changeLabelsEnergy($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsEnergy"></label>
														</div>
													</div>
													<div id="radiusEnergy">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusEnergy" onchange="changeEnergyRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusEnergy"></label>
														</div>
													</div>
													<div id="divVorEnergy">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbEnergyVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbEnergyVoronoi"></label>
														</div>
														<div id="voroEnergyAreaDiv">
															<h5><b> Select Area Type: </b></h5>
															<select id="voroEnergyAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Energy\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>
														<div id="voronoiControlsEnergy">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanEnergy" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanEnergy">Pan</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkAddEnergy" name="controls">
																	<label class="lblVorCntrls" for="chkAddEnergy">Add</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkDelEnergy" name="controls">
																	<label class="lblVorCntrls" for="chkDelEnergy">Delete</label>
																</div>
																	   
																<div class="tab">
																	<input type="radio" id="chkInteractiveEnergy" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveEnergy">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbEnergyVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbEnergyVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorEnergyOpacity"><div id="vorEnergyhandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a id="aOwn" data-toggle="collapse" id="refOwn" href="#owData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;My Own Data</b>
												</a>
												<div id="owData" class="collapse">
													<select id="ownData" class="selectpicker show-tick " multiple data-actions-box="true" data-selected-text-format="count" onchange="addOwnData();">
														<option value="gardens" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'gardens') !== false)?'selected="selected"':"").'>Community Gardens</option>
														<option value="hot_springs" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'hot_springs') !== false)?'selected="selected"':"").'>Hot Springs</option>
														<option value="landbanks" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'landbanks') !== false)?'selected="selected"':"").'>Land Banks</option>
														<option value="shelter" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'shelter') !== false)?'selected="selected"':"").'>Homemade Shelters</option>
														<option value="natural" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'natural') !== false)?'selected="selected"':"").'>Natural</option>
														<option value="manmade" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'manmade') !== false)?'selected="selected"':"").'>Manmade</option>
														<option value="potbellytwo" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'potbellytwo') !== false)?'selected="selected"':"").'>Potbelly Two</option>
														<option value="unitsa" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'unitsa') !== false)?'selected="selected"':"").'>Units A</option>
														<option value="unitsb" '.((strlen($projectValues[0]["own"]) > 0 && strpos($projectValues[0]["own"], 'unitsb') !== false)?'selected="selected"':"").'>Units B</option>
													</select>
													<div id="potbellytwoDiv" class="collapse">
														<b><h5>Potbelly Two Filters</b></h5>
														<select id="potbellytwoData" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" onchange="filterPotbellyTwo();">
															<option value="first" selected>First</option>
															<option value="second" selected>Two</option>
															<option value="third" selected>Third</option>
															<option value="four" selected>Four</option>
														</select>
													</div>
													<div id="manmadeDiv" class="collapse">
														<b><h5>Manmade Datasets </b></h5>
														<select id="manmadeData" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" onchange="addManmadeData();">
															<option value="destinations" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'destinations') !== false)?'selected="selected"':"").'>Destinations</option>
															<option value="faith" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'faith') !== false)?'selected="selected"':"").'>Faith-based</option>
															<option value="govt" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'govt') !== false)?'selected="selected"':"").'>Government Places</option>
															<option value="infrastructure" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'infrastructure') !== false)?'selected="selected"':"").'>Infrastructure</option>
															<option value="public" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'public') !== false)?'selected="selected"':"").'>Public Spaces</option>
															<option value="retail" '.((strlen($projectValues[0]["ownmanmade"]) > 0 && strpos($projectValues[0]["ownmanmade"], 'retail') !== false)?'selected="selected"':"").'>Retail Places</option>
														</select>
													</div>
													<div id="logosOwn">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsOwn" onchange="changeLabelsOwn($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsOwn"></label>
														</div>
													</div>
													<div id="radiusOwn">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusOwn" onchange="changeOwnRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusOwn"></label>
														</div>
													</div>
													<div id="divVorOwn">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbOwnVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbOwnVoronoi"></label>
														</div>
														<div id="voroOwnAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroOwnAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Own\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>								
														<div id="voronoiControlsOwn">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																   <div class="tab">
																	   <input type="radio" id="chkPanOwn" name="controls" checked>
																	   <label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanOwn">Pan</label>
																   </div>
																	
																   <div class="tab">
																	   <input type="radio" id="chkAddOwn" name="controls">
																	   <label class="lblVorCntrls" for="chkAddOwn">Add</label>
																   </div>
																	
																	<div class="tab">
																	   <input type="radio" id="chkDelOwn" name="controls">
																	   <label class="lblVorCntrls" for="chkDelOwn">Delete</label>
																   </div>
																   
																   <div class="tab">
																	   <input type="radio" id="chkInteractiveOwn" name="controls">
																	   <label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveOwn">Interactive</label>
																   </div>
																</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbOwnVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbOwnVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorOwnOpacity"><div id="vorOwnhandle" class="ui-slider-handle"></div></div>
															</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refTransport" href="#transData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Transportation Data</b>
												</a>
												<div id="transData" class="collapse">
													<select id="tptData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addTptData();">
														<optgroup label="Transportation Datasets">
															<option value="airports" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'airports') !== false)?'selected="selected"':"").'>Airports</option>
															<option value="datafiber" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'datafiber') !== false)?'selected="selected"':"").'>Data Fiber Networks</option>
															<option value="flag" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'flag') !== false)?'selected="selected"':"").'>Freight Intersects</option>
															<option value="freight" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'freight') !== false)?'selected="selected"':"").'>Freight Network</option>
															<option value="highway" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'highway') !== false)?'selected="selected"':"").'>Highway Network</option>
															<option value="traffic" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'traffic') !== false)?'selected="selected"':"").'>IL Traffic Counts</option>
															<option value="trafficRaster" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'trafficRaster') !== false)?'selected="selected"':"").'>IL Traffic Heatmap</option>
															<option value="interchange" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'interchange') !== false)?'selected="selected"':"").'>Interchanges</option>
															<option value="iana" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'iana') !== false)?'selected="selected"':"").'>Intermodal Site</option>
															<option value="railway" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'railway') !== false)?'selected="selected"':"").'>Railway Network</option>
															<option value="ports" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'ports') !== false)?'selected="selected"':"").'>Major US Ports</option>
															<option value="transStops" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'transStops') !== false)?'selected="selected"':"").'>Transit Stops</option>
															<option value="transNetwork" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'transNetwork') !== false)?'selected="selected"':"").'>Transit Network</option>
														</optgroup>
														<optgroup label="Waterways">
															<option value="portBoundary" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'portBoundary') !== false)?'selected="selected"':"").'>Port Boundary</option>
															<option value="portFacility" '.((strlen($projectValues[0]["transportation"]) > 0 && strpos($projectValues[0]["transportation"], 'portFacility') !== false)?'selected="selected"':"").'>Port Facility</option>
														</optgroup>
													</select>
													<div id="optAirports">
														<h5><b> Airports Filters: </b></h5>
														<select id="airportFilter" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterAirport();">
															<option value="large_airport" selected>Large Aiports</option>
															<option value="medium_airport" '.((strlen($projectValues[0]["transportationAirport"]) > 0 && strpos($projectValues[0]["transportationAirport"], 'medium_airport') !== false)?'selected="selected"':"").'>Medium Airports</option>
															<option value="small_airport" '.((strlen($projectValues[0]["transportationAirport"]) > 0 && strpos($projectValues[0]["transportationAirport"], 'small_airport') !== false)?'selected="selected"':"").'>Small Airpors</option>
															<option value="heliport" '.((strlen($projectValues[0]["transportationAirport"]) > 0 && strpos($projectValues[0]["transportationAirport"], 'heliport') !== false)?'selected="selected"':"").'>Heliports</option>
															<option value="seaplane_base" '.((strlen($projectValues[0]["transportationAirport"]) > 0 && strpos($projectValues[0]["transportationAirport"], 'seaplane_base') !== false)?'selected="selected"':"").'>Seaplane Bases</option>
														</select>
													</div>
													<div id="optDataFiber">
														<h5><b> Data Fiber Filters: </b></h5>
														<select id="datafiberFilter" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterDataFiber();">
															<option value="metrobackbone" selected>Metro Backbone</option>
															<option value="metrolateral" selected>Metro Lateral</option>
															<option value="canadalonghaulnetwork" selected>Canada Longhaul Network</option>
															<option value="longhaulnetwork" selected>IRU Longhaul Network</option>
															<option value="ownedlonghaulnetwork" selected>Owned Longhaul Network</option>
														</select>
													</div>
													<div id="optFreight">
														<h5><b> Filter Carriers: </b></h5>
														<select id="carrierFilter" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="filterCompanies();">
															<option value="bnsf">Burlington Northern and Santa Fe</option>
															<option value="cn">Canadian National Railway</option>
															<option value="cprs">Canadian Pacific Railway</option>
															<option value="csxt">CSX Transportation</option>
															<option value="kcs">Kansas City Southern</option>
															<option value="ns">Norfolk Southern</option>
															<option value="up">Union Pacific</option>
														</select>
													</div>
													<div id="logosTpt">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsTpt" onchange="changeLabelsTpt($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsTpt"></label>
														</div>
													</div>
													<div id="radiusTpt">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusTpt" onchange="changeTptRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusTpt"></label>
														</div>
													</div>
													<div id="divVorTpt">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbTptVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbTptVoronoi"></label>
														</div>
														<div id="voroTptAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroTptAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Tpt\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>							
														<div id="voronoiControlsTpt">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanTpt" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanTpt">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddTpt" name="controls">
																	<label class="lblVorCntrls" for="chkAddTpt">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelTpt" name="controls">
																	<label class="lblVorCntrls" for="chkDelTpt">Delete</label>
																</div>
															   
																<div class="tab">
																	<input type="radio" id="chkInteractiveTpt" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveTpt">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbTptVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbTptVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorTptOpacity"><div id="vorTpthandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refSchool" href="#transitDataDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Transit Data</b>
												</a>
												<div id="transitDataDiv" class="collapse">
													<select id="transitData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addTransitData();">
														<option value="tstops" '.((strlen($projectValues[0]["transit"]) > 0 && strpos($projectValues[0]["transit"], 'tstops') !== false)?'selected="selected"':"").'>Transit Stops</option>
														<option value="fr" '.((strlen($projectValues[0]["transit"]) > 0 && strpos($projectValues[0]["transit"], 'fr') !== false)?'selected="selected"':"").'>Ferry Routes</option>
														<option value="scr" '.((strlen($projectValues[0]["transit"]) > 0 && strpos($projectValues[0]["transit"], 'scr') !== false)?'selected="selected"':"").'>Street Car Routes</option>
														<option value="rr" '.((strlen($projectValues[0]["transit"]) > 0 && strpos($projectValues[0]["transit"], 'rr') !== false)?'selected="selected"':"").'>Rail Routes</option>
														<option value="br" '.((strlen($projectValues[0]["transit"]) > 0 && strpos($projectValues[0]["transit"], 'br') !== false)?'selected="selected"':"").'>Bus Routes</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refSchool" href="#schoolDataDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Schools Data</b>
												</a>
												<div id="schoolDataDiv" class="collapse">
													<select id="schoolData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addSchoolData();">
														<option value="primary" '.((strlen($projectValues[0]["schools"]) > 0 && strpos($projectValues[0]["schools"], 'primary') !== false)?'selected="selected"':"").'>Schools CCD Primary</option>
														<option value="private" '.((strlen($projectValues[0]["schools"]) > 0 && strpos($projectValues[0]["schools"], 'private') !== false)?'selected="selected"':"").'>Schools PSS Private</option>
													</select>
													<div id="logosSchools">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsSchools" onchange="changeLabelsSchools($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsSchools"></label>
														</div>
													</div>
													<div id="divVorSchools">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbSchoolsVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbSchoolsVoronoi"></label>
														</div>
														<div id="voroSchoolsAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroSchoolsAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Schools\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>								
														<div id="voronoiControlsSchools">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanSchools" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanSchools">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddSchools" name="controls">
																	<label class="lblVorCntrls" for="chkAddSchools">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelSchools" name="controls">
																	<label class="lblVorCntrls" for="chkDelSchools">Delete</label>
																</div>
															   
																<div class="tab">
																	<input type="radio" id="chkInteractiveSchools" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveSchools">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbSchoolsVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbSchoolsVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorSchoolsOpacity"><div id="vorSchoolshandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refBank" href="#bankDataDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Banks & Credit Unions</b>
												</a>
												<div id="bankDataDiv" class="collapse">
													<select id="bankData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addBanksData();">
														<option value="2017" '.((strlen($projectValues[0]["banks"]) > 0 && strpos($projectValues[0]["banks"], '2017') !== false)?'selected="selected"':"").'>Banks 2017</option>
														<option value="2016" '.((strlen($projectValues[0]["banks"]) > 0 && strpos($projectValues[0]["banks"], '2016') !== false)?'selected="selected"':"").'>Banks 2016</option>
														<option value="2012" '.((strlen($projectValues[0]["banks"]) > 0 && strpos($projectValues[0]["banks"], '2012') !== false)?'selected="selected"':"").'>Banks 2012</option>
														<option value="creditunions" '.((strlen($projectValues[0]["banks"]) > 0 && strpos($projectValues[0]["banks"], 'creditunions') !== false)?'selected="selected"':"").'>Credit Unions</option>
													</select>
													<div id="logosBanks">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsBanks" onchange="changeLabelsBanks($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsBanks"></label>
														</div>
													</div>
													<div id="radiusBanks">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusBanks" onchange="changeBanksRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusBanks"></label>
														</div>
													</div>
													<div id="optBanks">
														<h5><b> Bank Branches Filter: </b></h5>
														<select id="bankFilter" class="selectpicker show-tick" onchange="filterBanks();">
															<option value="none" selected>None</option>
															<option value="all" '.((strlen($projectValues[0]["banksfilter"]) > 0 && strpos($projectValues[0]["banksfilter"], 'all') !== false)?'selected="selected"':"").'>All</option>
															<option value="hq" '.((strlen($projectValues[0]["banksfilter"]) > 0 && strpos($projectValues[0]["banksfilter"], 'hq') !== false)?'selected="selected"':"").'>Headquarters (Main Offices)</option>
															<option value="branches" '.((strlen($projectValues[0]["banksfilter"]) > 0 && strpos($projectValues[0]["banksfilter"], 'branches') !== false)?'selected="selected"':"").'>Branches</option>
														</select>
													</div>
													<div id="divVorBanks">
															<h5><b> Voronoi </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbBanksVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbBanksVoronoi"></label>
															</div>
															<div id="voroBanksAreaDiv">
															<h5><b> Select Area Type: </b></h5>
																<select id="voroBanksAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Banks\');">
																	<option value="none">None</option>
																	<option value="CAS">Custom Area Selection</option>
																	<option value="state">State Level</option>
																	<option value="full">Full Map Extent</option>
																</select>
															</div>
															<div id="voronoiControlsBanks">
																<h5><b> Voronoi Controls: </b></h5>
																<div class="tabs">
																	<div class="tab">
																		<input type="radio" id="chkPanBanks" name="controls" checked>
																		<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanBanks">Pan</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkAddBanks" name="controls">
																		<label class="lblVorCntrls" for="chkAddBanks">Add</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkDelBanks" name="controls">
																		<label class="lblVorCntrls" for="chkDelBanks">Delete</label>
																	</div>
																   
																	<div class="tab">
																		<input type="radio" id="chkInteractiveBanks" name="controls">
																		<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveBanks">Interactive</label>
																	</div>
																</div>
																<div class="bottomBar"></div>
																<h5><b> Voronoi Color Ramp: </b></h5>
																<div class="onoffswitch">
																	<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbBanksVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																	<label class="onoffswitch-label" for="cbBanksVoronoiRamp"></label>
																</div>
																<h5>Transparency</h5>
																<div id="iptVorBanksOpacity"><div id="vorBankshandle" class="ui-slider-handle"></div></div>
															</div>
														</div>
													</div>
												</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refFin" href="#finDataDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp; Insurance & Fin. Inst.</b>
												</a>
												<div id="finDataDiv" class="collapse">
													<select id="finData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addFinData();">
														<option value="agencies" '.((strlen($projectValues[0]["fin"]) > 0 && strpos($projectValues[0]["fin"], 'agencies') !== false)?'selected="selected"':"").'>AG-Crop Agencies</option>
														<option value="agent_ca" '.((strlen($projectValues[0]["fin"]) > 0 && strpos($projectValues[0]["fin"], 'agent_ca') !== false)?'selected="selected"':"").'>Agent Locations - Address Based</option>
														<option value="agent_za" '.((strlen($projectValues[0]["fin"]) > 0 && strpos($projectValues[0]["fin"], 'agent_za') !== false)?'selected="selected"':"").'>Agent Locations - Zip Based</option>
														<option value="edwardjones" '.((strlen($projectValues[0]["banks"]) > 0 && strpos($projectValues[0]["banks"], 'edwardjones') !== false)?'selected="selected"':"").'>Edward Jones</option>
													</select>
													<div id="logosFin">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsFin" onchange="changeLabelsFin($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsFin"></label>
														</div>
													</div>
													<div id="radiusFin">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusFin" onchange="changeFinRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusFin"></label>
														</div>
													</div>
													<div id="divVorFin">
															<h5><b> Voronoi </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFinVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbFinVoronoi"></label>
															</div>
															<div id="voroFinAreaDiv">
															<h5><b> Select Area Type: </b></h5>
																<select id="voroFinAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Finance\');">
																	<option value="none">None</option>
																	<option value="CAS">Custom Area Selection</option>
																	<option value="state">State Level</option>
																	<option value="full">Full Map Extent</option>
																</select>
															</div>
															<div id="voronoiControlsFin">
																<h5><b> Voronoi Controls: </b></h5>
																<div class="tabs">
																	<div class="tab">
																		<input type="radio" id="chkPanFin" name="controls" checked>
																		<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanFin">Pan</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkAddFin" name="controls">
																		<label class="lblVorCntrls" for="chkAddFin">Add</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkDelFin" name="controls">
																		<label class="lblVorCntrls" for="chkDelFin">Delete</label>
																	</div>
																   
																	<div class="tab">
																		<input type="radio" id="chkInteractiveFin" name="controls">
																		<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveFin">Interactive</label>
																	</div>
																</div>
																<div class="bottomBar"></div>
																<h5><b> Voronoi Color Ramp: </b></h5>
																<div class="onoffswitch">
																	<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFinVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																	<label class="onoffswitch-label" for="cbFinVoronoiRamp"></label>
																</div>
																<h5>Transparency</h5>
																<div id="iptVorFinOpacity"><div id="vorFinhandle" class="ui-slider-handle"></div></div>
															</div>
														</div>
													</div>
												</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refSurfaceWater" href="#surfaceWaterDataDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Surface Water</b>
												</a>
												<div id="surfaceWaterDataDiv" class="collapse">
													<select id="surfaceWaterData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addSurfaceWaterData();">
														<option value="surfacewater" '.((strlen($projectValues[0]["surfaceWater"]) > 0 && strpos($projectValues[0]["surfaceWater"], 'surfaceWater') !== false)?'selected="selected"':"").'>Surface Water</option>
													</select>
													<div id="surfaceWaterDiv" class="condTransDivs">
														<h5> <b> Data Display Options: </b> </h5>
														<ul>
															<table class="tableConds">
																<tbody>
																	<tr class="tdTopBorder">
																		<td>
																			<h5><b> Frames </b></h5>
																			<div class="onoffswitch">
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesSW" onchange="changeFramesSW($(this).prop(\'checked\')?\'on\':\'off\')" unchecked>
																				<label class="onoffswitch-label" for="switchFramesSW"></label>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
															<div id="divSelFramesSW">
																<h5> <b> Frame Color: </b> </h5>
																<select id="selFramesSW" class="selectpicker show-tick" onchange="setFrames();">
																	<optgroup label="Frame Color" maxOptions="1">
																		<option value="black" selected>Black</option>
																		<option value="darkgray">Dark Gray</option>
																		<option value="lightgray">Light Gray</option>
																		<option value="white">White</option>
																	</optgroup>
																</select>
															</div>
														</ul>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>

										<div id="outputTab" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" href="#dataDisplays" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Data Display</b>
												</a>
												<div id="dataDisplays" class="collapse">
													<h5><b> Heatmaps: </b></h5>
													<select class="selectpicker show-tick" id="selHeatMap" onchange="drawHeatMap();">
														<option value="reset">Select layer</option>
														<optgroup label="Primary Data">
															<option value="farmer">Farmers Market</option>
															<option value="stores">Grocery Stores</option>
															<option value="culver">Culvers</option>
														</optgroup>
														<optgroup label="Secondary Data">
															<option value="vacancy">Vacancy</option>
															<option value="population">Population</option>
															<option value="income">Income</option>
															<option value="density">Density</option>
														</optgroup>
													</select>
												</div>
												<div id="heatOpts">
													<h5><b> Heatmap Radius Size: </b></h5>
													<input id="radius" type="range" min="1" max="50" step="1" value="5"/>
													<h5><b> Heatmap Blur Size: </b></h5>
													<input id="blur" type="range" min="1" max="50" step="1" value="15"/>
												</div>
												<div class="bottomBar"></div>
													<a data-toggle="collapse" href="#comparativeDisplay" aria-expanded="true" class="collapsed">
														<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Comparative Display</b>
													</a>
												<div id="comparativeDisplay" class="collapse">
													<ul>
														<li id="labelSwipe">
															Time Swipe
														</li>
														<div id="" class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="activateSwipeCrops" onchange="caliCropsFunction($(this).prop(\'checked\')?\'dull\':\'active\')">
															<label class="onoffswitch-label" for="activateSwipeCrops"></label>
														</div>
														<li id="labelOrientation" style="display:none;">
															Swipe Orientation
															<div id="orientation" class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="orientationSwipe" onchange="swipe.set("orientation",$(this).prop(\'checked\')?"horizontal":"vertical")">
																<label class="onoffswitch-label" for="orientationSwipe"></label>
															</div>
														</li>
													</ul>
												</div>
												<div class="bottomBar"></div>
												<div class="div-hand">
													<a data-toggle="collapse" href="#measureDiv" aria-expanded="true" class="collapsed">
														<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Measures</b>
													</a>
													<div id="measureDiv" class="collapse">
														<select id="measureType" class="selectpicker show-tick" onchange="updateMeasureType();">
															<option value="clear">None</option>
															<option value="length">Length (LineString)</option>
															<option value="area">Area (Polygon)</option>
														</select>
														<div id="measureFilters">
															<h5><b> Multiple Measurements: </b></h5>									
															<input type="checkbox" id="contMeasure" onchange="continueMeasure($(this).prop(\'checked\')?\'on\':\'off\')" checked>
															<h5><b> Remove Last Point: </b></h5>									
															<input type="button" class="btn" id="btnRemoveVertex" onclick="removeVertex();" value="Remove">
														</div>
													</div>
												</div>
												<div class="bottomBar"></div>
												<a id="aLeg" data-toggle="collapse" href="#legend" aria-expanded="false" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Legend</b>
												</a>
												<div id="legend" class="collapse">
													<div id="divLegend">
														<table>
															<tr style="border-bottom:1px solid #ccc;">
																<td>
																	<a data-toggle="collapse" id="refLegendArea" href="#legendArea" aria-expanded="true" class="collapsed">
																		<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Area Selected</b>
																	</a>
																	<div id="legendArea"></div>
																</td>
															</tr>
															<tr style="border-bottom:1px solid #ccc;">
																<td>
																	<a data-toggle="collapse" id="refLegendData" href="#legendData" aria-expanded="true" class="collapsed">
																		<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Data</b>
																	</a>
																	<div id="legendData"></div>
																</td>
															</tr>
															<tr style="border-bottom:1px solid #ccc;">
																<td>
																	<a data-toggle="collapse" id="refLegendConditions" href="#legendConditions" aria-expanded="true" class="collapsed">
																		<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Conditions</b>
																	</a>
																	<div id="legendConditions"></div>
																</td>
															</tr>
															<tr>
																<td>
																	<a data-toggle="collapse" id="refLegendDisplayBoundaries" href="#legendDisplayBoundaries" aria-expanded="true" class="collapsed">
																		<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Display Boundaries</b>
																	</a>
																	<div id="legendDisplayBoundaries"></div>
																</td>
															</tr>
														</table>
													</div>
												</div>
												<div class="bottomBar"></div>
												<a id="aLeg" data-toggle="collapse" href="#export" aria-expanded="false" class="collapsed">
														<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Export Map</b>
													</a>
												<div id="export" class="collapse">							
													<div style="padding:5px; text-align:center;">
														<label>Resolution</label>
														<select id="pngDPI">
															<option value="72">72 dpi (fast)</option>
															<option value="150">150 dpi</option>
															<option value="212">212 dpi</option>
															<option value="300">300 dpi</option>
															<option value="500" selected>500 dpi</option>
															<option value="700">700 dpi</option>
															<option value="900">900 dpi (slow)</option>
														</select><br>
														<a id="export-png" class="btn btn-default"><i class="fa fa-download"></i> PNG</a>
														<a id="export-jpeg" class="btn btn-default"><i class="fa fa-download"></i> JPG</a>
														<a id="export-pdf-main" class="btn"><i class="fa fa-download"></i> PDF</a>
													</div>
													<div id="pdfOpts">
														<h4>Printing Preferences:</h4>
														<form class="form">
														  <label>Page size</label>
														  <select id="format">
															<option value="a0">A0 (slow)</option>
															<option value="a1">A1</option>
															<option value="a2">A2</option>
															<option value="a3">A3</option>
															<option value="a4" selected>A4</option>
															<option value="a5">A5 (fast)</option>
															<option value="letter">Letter</option>
															<option value="legal">Legal</option>
															<option value="tabloid">Tabloid</option>
														  </select><br>
														  <label>Resolution</label>
														  <select id="resolution">
															<option value="72">72 dpi (fast)</option>
															<option value="150">150 dpi</option>
															<option value="212" selected>212 dpi</option>
															<option value="300">300 dpi (slow)</option>
														  </select><br>
														  <label>Orientation</label>
														  <select id="orient">
															<option value="l" selected>Landscape</option>
															<option value="p">Portrait</option>
														  </select><br>
														  <label>Legend Alignment</label>
														  <select id="legendLocation">
															<option value="topleft" selected>Top Left Corner</option>
															<option value="bottomleft">Bottom Left Corner</option>
															<option value="topright" selected>Top Right Corner</option>
															<option value="bottomright">Bottom Right Corner</option>
														  </select>
														</form>
														<button id="export-pdf" data-margin="10" class="btn">Export PDF</button>
														
														<!--<div class="block">
															<a id="export-jpg" class="btn" download="map.jpg" target="_new">
																Export JPEG
															</a>
															<a id="export-png" class="btn" download="map.png" target="_new">
																Export PNG
															</a>
															<a id="export-pdf" class="btn" download="map.pdf" data-margin="10" target="_new">
																Export PDF
															</a>
														</div>-->

													</div>
												</div>
												<div class="bottomBar"></div>
											</div>
										</div>
									</div>
								</div>
							</div>';
				}
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>