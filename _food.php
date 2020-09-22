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
				$sql = "SELECT foodpane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$radiusValues = $stmt->fetchAll();
				
				if($radiusValues[0]["foodpane"] == 1)
				{
					$sqlFour;
					if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {						
						$sqlFour = "SELECT `user_id`,`foodagri`,`foodcommodities`,`foodbeverages`,`fooddc`,`fooddcdma`,`foodrefri`,`foodrefriactivities`,`foodhome`,`foodhomesuper`,`foodhomealbertsons`,`foodaway`,`foodretailsuper` FROM project where title <> '' and id=" . $_SESSION["project_id"];
					}
					else{						
						$sqlFour = "SELECT `user_id`,`foodagri`,`foodcommodities`,`foodbeverages`,`fooddc`,`fooddcdma`,`foodrefri`,`foodrefriactivities`,`foodhome`,`foodhomesuper`,`foodhomealbertsons`,`foodaway`,`foodretailsuper` FROM project where title = '' and user_id=" . $_SESSION["user_id"];
					}

					$stmtFour = $DB->prepare($sqlFour);
					$stmtFour->execute();
					$projectValues = $stmtFour->fetchAll();
					
					echo '<!----Sidebar Food--->
							<div id="mainDivFood" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll" style="display:none;" >
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#foodTab">Production</a></li>
										<li><a data-toggle="tab" href="#distributionTab">Distribution</a></li>
										<li><a data-toggle="tab" href="#retailTab">Retail</a></li>
									</ul>

									<div class="tab-content">
										<div id="foodTab" class="tab-pane fade in active">
											<div class="div-hand">
												<a data-toggle="collapse" id="refFoodProd" href="#foodData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Agriculture / Food Production Datasets</b>
												</a>
												<div id="foodData" class="collapse">
													<select id="foodProd" class="selectpicker show-tick" title="Choose one of the following..." multiple data-selected-text-format="count" onchange="addFoodProd();">
														<option value="cropsUs" '.((strpos($projectValues[0]["foodagri"], 'cropsUs') !== false)?'selected="selected"':"").'>Crops (US) 2016</option>
														<option value="cropsNe" '.((strpos($projectValues[0]["foodagri"], 'cropsNe') !== false)?'selected="selected"':"").'>Crops (NE) 2017</option>
														<option value="cropsCACustom" '.((strpos($projectValues[0]["foodagri"], 'cropsCACustom') !== false)?'selected="selected"':"").'>Seleted Crops (CA) 2018</option>
														<option value="cropsGACustom" '.((strpos($projectValues[0]["foodagri"], 'cropsGACustom') !== false)?'selected="selected"':"").'>Seleted Crops (GA) 2018</option>
														<option value="cropsFLCustom" '.((strpos($projectValues[0]["foodagri"], 'cropsFLCustom') !== false)?'selected="selected"':"").'>Seleted Crops (FL) 2018</option>
														<option value="cropsNCCustom" '.((strpos($projectValues[0]["foodagri"], 'cropsNCCustom') !== false)?'selected="selected"':"").'>Seleted Crops (NC) 2018</option>
														<option value="cropsSCCustom" '.((strpos($projectValues[0]["foodagri"], 'cropsSCCustom') !== false)?'selected="selected"':"").'>Seleted Crops (SC) 2018</option>
														<option value="cropsCalifornia" '.((strpos($projectValues[0]["foodagri"], 'cropsCalifornia') !== false)?'selected="selected"':"").'>Crops (California 08 & 16)</option>
													</select>
													<div id="logosFood">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsFood" onchange="changeLabelsFood($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsFood"></label>
														</div>
													</div>
													<div id="radiusFood">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusFood" onchange="changeFoodRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusFood"></label>
														</div>
													</div>
													<div id="divVorFood">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbFoodVoronoi"></label>
														</div>
														<div id="voroFoodAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroFoodAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Food\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>							
														<div id="voronoiControlsFood">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanFood" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanFood">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddFood" name="controls">
																	<label class="lblVorCntrls" for="chkAddFood">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelFood" name="controls">
																	<label class="lblVorCntrls" for="chkDelFood">Delete</label>
																</div>
															   
																<div class="tab">
																	<input type="radio" id="chkInteractiveFood" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveFood">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbFoodVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorFoodOpacity"><div id="vorFoodhandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
													<div id="divCropArea">
														<h5><b> Detail Level: </b></h5>
														<select id="cropArea" class="selectpicker show-tick" title="Choose one of the following..." onchange="fetchCrops();">
															<option value="us">Whole US</option>
															<option value="region">Regions</option>
															<option value="state">States</option>
														</select>
													</div>
													<div id="divYears">
														<h5><b> Imagery Year: </b></h5>
														<div id="iptCropYears"><div id="crophandle" class="ui-slider-handle"></div></div>
														<h5><b> Animate Layers: </b></h5>
														<div role="group" aria-label="Animation controls">
															<button id="play" type="button" onclick="play();">Play</button>
															<button id="pause" type="button" onclick="stop();">Pause</button>
															<span id="info"></span>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCommodities" href="#commoditiesData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Commodities</b>
												</a>
												<div id="commoditiesData" class="collapse">
													<select id="commoditiesSelect" class="selectpicker show-tick" title="Choose one of the following..." onchange="addCommodities();">
														<option value="none">None</option>
														<option value="corn" '.((strpos($projectValues[0]["foodcommodities"], 'corn') !== false)?'selected="selected"':"").'>Corn</option>
														<option value="eggplants" '.((strpos($projectValues[0]["foodcommodities"], 'eggplants') !== false)?'selected="selected"':"").'>Eggplants</option>
													</select>
													<div id="divEggplantOptions">
														<h5> <b> Direction: </b> </h5>
														<select id="selTrafficEgg" class="selectpicker show-tick" onchange="shippingRef(\'selTrafficEgg\');">
															<option value="in">Inbound</option>
															<option value="out">Outbound</option>
														</select>
													</div>
													<div id="logosEggPlants">
														<h5><b> Eggplants Type Icon </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsEggs" onchange="changeLabelsShipping($(this).prop(\'checked\')?\'active\':\'dull\')">
																<label class="onoffswitch-label" for="switchLabelsEggs"></label>
														</div>
													</div>
													<div id="divCornOptions">
														<h5> <b> Chart Type: </b> </h5>
														<select id="graph" class="selectpicker show-tick" onchange="doAnimate();">
															<option value="pie">Pie</option>
															<option value="pie3D">Pie 3D</option>
															<option value="donut">Donut</option>
															<option value="bar">Bar</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refBeverages" href="#beveragesData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Beverages</b>
												</a>
												<div id="beveragesData" class="collapse">
													<select id="beveragesSelect" class="selectpicker show-tick" title="Choose one of the following..." multiple data-selected-text-format="count" onchange="addBeverages();">
														<option value="cbrands" '.((strpos($projectValues[0]["foodbeverages"], 'cbrands') !== false)?'selected="selected"':"").'>Constellation Brands</option>
													</select>
												</div>
											</div>
											<div id="divVorBeverages">
												<h5><b> Voronoi </b></h5>
												<div class="onoffswitch">
													<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbBeveragesVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
													<label class="onoffswitch-label" for="cbBeveragesVoronoi"></label>
												</div>
												<div id="voroBeveragesAreaDiv">
												<h5><b> Select Area Type: </b></h5>
												<select id="voroBeveragesAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Beverages\');">
													<option value="none">None</option>
													<option value="CAS">Custom Area Selection</option>
													<option value="state">State Level</option>
													<option value="full">Full Map Extent</option>
												</select>
												</div>							
												<div id="voronoiControlsBeverages">
													<h5><b> Voronoi Controls: </b></h5>
													<div class="tabs">
														<div class="tab">
															<input type="radio" id="chkPanBeverages" name="controls" checked>
															<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanBeverages">Pan</label>
														</div>
																		
														<div class="tab">
															<input type="radio" id="chkAddBeverages" name="controls">
															<label class="lblVorCntrls" for="chkAddBeverages">Add</label>
														</div>
																		
														<div class="tab">
															<input type="radio" id="chkDelBeverages" name="controls">
															<label class="lblVorCntrls" for="chkDelBeverages">Delete</label>
														</div>
																	   
														<div class="tab">
															<input type="radio" id="chkInteractiveBeverages" name="controls">
															<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveBeverages">Interactive</label>
														</div>
													</div>
													<div class="bottomBar"></div>
													<h5><b> Voronoi Color Ramp: </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbBeveragesVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
														<label class="onoffswitch-label" for="cbBeveragesVoronoiRamp"></label>
													</div>
													<h5>Transparency</h5>
													<div id="iptVorBeveragesOpacity"><div id="vorBeverageshandle" class="ui-slider-handle"></div></div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondNAICS" href="#naicsData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;NAICS</b>
												</a>
												<div id="naicsData" class="collapse">
													<select id="naicsMainSelect" class="selectpicker show-tick" onchange="addMainNAICS();">
														<option value="none">None</option>
														<option value="cropsProduction">Crops Production (111)</option>
													</select>
													<div id="naicsMainDiv">
														<h5> <b> Datasets </b> </h5>
														<select id="naicsSelect" class="selectpicker show-tick" onchange="addNAICS();">
															<option value="none">None</option>
															<option value="establishments2018" '.((strpos($projectValues[0]["conditions"], 'establishments2018') !== false)?'selected="selected"':"").'>Establishments (2018)</option>
															<option value="establishmentsoneyear" '.((strpos($projectValues[0]["conditions"], 'establishmentsoneyear') !== false)?'selected="selected"':"").'>Establishments (1-Year Change; #)</option>
															<option value="establishmentsoneyearper" '.((strpos($projectValues[0]["conditions"], 'establishmentsoneyearper') !== false)?'selected="selected"':"").'>Establishments (1-Year % Change)</option>
															<option value="establishmentslocation" '.((strpos($projectValues[0]["conditions"], 'establishmentslocation') !== false)?'selected="selected"':"").'>Establishments (Location Quot.)</option>
															<option value="wagespayroll" '.((strpos($projectValues[0]["conditions"], 'wagespayroll') !== false)?'selected="selected"':"").'>Wages (payroll; $)</option>
															<option value="totalwagesoneyearper" '.((strpos($projectValues[0]["conditions"], 'totalwagesoneyearper') !== false)?'selected="selected"':"").'>Total Wages (1-Year % Change)</option>
															<option value="avgannualpay" '.((strpos($projectValues[0]["conditions"], 'avgannualpay') !== false)?'selected="selected"':"").'>Average Annual Pay</option>
															<option value="avgannualpayoneyearper" '.((strpos($projectValues[0]["conditions"], 'avgannualpayoneyearper') !== false)?'selected="selected"':"").'>Average Annual Pay (1 Year % Change)</option>
															<option value="avgweeklypay" '.((strpos($projectValues[0]["conditions"], 'avgweeklypay') !== false)?'selected="selected"':"").'>Average Weekly Pay</option>
															<option value="avgwagesoneyearper" '.((strpos($projectValues[0]["conditions"], 'avgwagesoneyearper') !== false)?'selected="selected"':"").'>Avg. Wages (1 Year % Change)</option>
															<option value="annualpaylocation" '.((strpos($projectValues[0]["conditions"], 'annualpaylocation') !== false)?'selected="selected"':"").'>Annual Pay (Location Quotient)</option>
															<option value="employees2018" '.((strpos($projectValues[0]["conditions"], 'employees2018') !== false)?'selected="selected"':"").'>Employees (2018)</option>
															<option value="employeesoneyear" '.((strpos($projectValues[0]["conditions"], 'employeesoneyear') !== false)?'selected="selected"':"").'>Employees  (1-Year Change; #)</option>
															<option value="employee" '.((strpos($projectValues[0]["conditions"], 'employee') !== false)?'selected="selected"':"").'>Employee (1-Year % Change)</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondOL" href="#olData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Operator Locations</b>
												</a>
												<div id="olData" class="collapse">
													<select id="olSelect" class="selectpicker show-tick" multiple onchange="addOL();">
														<option value="paca" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'paca') !== false)?'selected="selected"':"").'>PACA Operators</option>
														<option value="ranchesandfarms" '.((strpos($projectValues[0]["foodagri"], 'ranchesandfarms') !== false)?'selected="selected"':"").'>Ranches & Farms</option>
														<option value="poultryfacilities" '.((strlen($projectValues[0]["primary"]) > 0 && strpos($projectValues[0]["primary"], 'poultryfacilities') !== false)?'selected="selected"':"").'>Poultry Facilities</option>
														<option value="foodplants" '.((strpos($projectValues[0]["foodagri"], 'foodplants') !== false)?'selected="selected"':"").'>Tyson Food Plants</option>
														<option value="hydroponics" '.((strpos($projectValues[0]["foodagri"], 'hydroponics') !== false)?'selected="selected"':"").'>Hydroponics</option>
														<option value="ngpoperators" '.((strpos($projectValues[0]["foodagri"], 'ngpoperators') !== false)?'selected="selected"':"").'>NGP Operators</option>
													</select>
													<div id="logosOL">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsOL" onchange="changeLabelsOL($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsOL"></label>
														</div>
													</div>
													<div id="radiusOL">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusOL" onchange="changeOLRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusOL"></label>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div id="divTransFood" class="condTransDivs">
												<h5> <b> Data Display Options: </b> </h5>
												<ul>
													<select id="cohortOptsFood" class="selectpicker show-tick" onchange="changePaletteFood();">
														<option value="standard">Standard</option>
														<option value="divergent">Divergent</option>
													</select>
													<table id="econoCohortsOpts" class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeFood" id="cbfirstThemeFood">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeFood" id="cbsecondThemeFood" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeFood" id="cbthirdThemeFood">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																</td>
															</tr>
														</tbody>
													</table>
													<table class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td id="flipEco">
																	<h5 id="flipFoodCohorts"><b> Flip Cohorts </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsFood" onchange="flipCohortsFood($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="flipCohortsFood"></label>
																	</div>
																</td>
																<td id="framesEco">
																	<h5><b> Frames </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesFood" onchange="changeFramesFood($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="switchFramesFood"></label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<div id="divSelFramesFood">
														<h5> <b> Frame Color: </b> </h5>
														<select id="selFramesFood" class="selectpicker show-tick" onchange="setFramesFood();">
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

										<div id="distributionTab" class="tab-pane fade">
											<div class="div-hand">
												<a data-toggle="collapse" id="refDC" href="#distData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Distribution Centers</b>
												</a>
												<div id="distData" class="collapse">
													<select id="dcData" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" title="Choose one of the following..." onchange="addDCData();">
														<option value="amazon" '.((strpos($projectValues[0]["fooddc"], 'amazon') !== false)?'selected="selected"':"").'>Amazon DCs</option>
														<option value="dhl" '.((strpos($projectValues[0]["fooddc"], 'dhl') !== false)?'selected="selected"':"").'>DHL</option>
														<option value="dma" '.((strpos($projectValues[0]["fooddc"], 'dma') !== false)?'selected="selected"':"").'>DMA</option>
														<option value="dmadcs" '.((strpos($projectValues[0]["fooddc"], 'dmadcs') !== false)?'selected="selected"':"").'>DMA DCs</option>
														<option value="fedex" '.((strpos($projectValues[0]["fooddc"], 'fedex') !== false)?'selected="selected"':"").'>FedEx</option>
														<option value="kehe" '.((strpos($projectValues[0]["fooddc"], 'kehe') !== false)?'selected="selected"':"").'>KeHE Distributors</option>
														<option value="mclane" '.((strpos($projectValues[0]["fooddc"], 'mclane') !== false)?'selected="selected"':"").'>McLane</option>
														<option value="pfgpfs" '.((strpos($projectValues[0]["fooddc"], 'pfgpfs') !== false)?'selected="selected"':"").'>PFG / PFS (performance group)</option>
														<option value="robinsonfresh" '.((strpos($projectValues[0]["fooddc"], 'Robinsonfresh') !== false)?'selected="selected"':"").'>RobinsonFresh</option>
														<option value="sygma" '.((strpos($projectValues[0]["fooddc"], 'sygma') !== false)?'selected="selected"':"").'>Sygma</option>
														<option value="sysco" '.((strpos($projectValues[0]["fooddc"], 'sysco') !== false)?'selected="selected"':"").'>Sysco Foods DCs</option>
														<option value="target" disabled>Target</option>
														<option value="usfoods" '.((strpos($projectValues[0]["fooddc"], 'usfoods') !== false)?'selected="selected"':"").'>US Foods DCs</option>
														<option value="usps" '.((strpos($projectValues[0]["fooddc"], 'usps') !== false)?'selected="selected"':"").'>USPS</option>
														<option value="vistar" '.((strpos($projectValues[0]["fooddc"], 'vistar') !== false)?'selected="selected"':"").'>Vistar</option>
														<option value="walmart" disabled>Walmart</option>
													</select>
													<div id="optDMA">
														<h5><b>DMA Companies:</b></h5>
														<select id="dmaCompanies" class="selectpicker show-tick " multiple data-actions-box="true" data-selected-text-format="count" onchange="filterDMA();">
															<option value="1" '.((strpos($projectValues[0]["fooddcdma"], '1') !== false)?'selected="selected"':"").'>Ben E. Keith Foods</option>
															<option value="2" '.((strpos($projectValues[0]["fooddcdma"], '2') !== false)?'selected="selected"':"").'>Cheney Brothers, Inc</option>
															<option value="3" '.((strpos($projectValues[0]["fooddcdma"], '3') !== false)?'selected="selected"':"").'>Food Services of America</option>
															<option value="4" '.((strpos($projectValues[0]["fooddcdma"], '4') !== false)?'selected="selected"':"").'>Gordon Food Service</option>
															<option value="5" '.((strpos($projectValues[0]["fooddcdma"], '5') !== false)?'selected="selected"':"").'>HPC Foodservice</option>
															<option value="6" '.((strpos($projectValues[0]["fooddcdma"], '6') !== false)?'selected="selected"':"").'>Jacmar</option>
															<option value="7" '.((strpos($projectValues[0]["fooddcdma"], '7') !== false)?'selected="selected"':"").'>Merchants Foodservice</option>
															<option value="8" '.((strpos($projectValues[0]["fooddcdma"], '8') !== false)?'selected="selected"':"").'>Nicholas & Co., Inc.</option>
															<option value="9" '.((strpos($projectValues[0]["fooddcdma"], '9') !== false)?'selected="selected"':"").'>Reinhart Foodservice</option>
															<option value="10" '.((strpos($projectValues[0]["fooddcdma"], '10') !== false)?'selected="selected"':"").'>Shamrock Foods</option>
															<option value="11" '.((strpos($projectValues[0]["fooddcdma"], '11') !== false)?'selected="selected"':"").'>Systems Services of America</option>
														</select>
													</div>
													<div id="logosDC">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsDC" onchange="changeLabelsDC($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsDC"></label>
														</div>
													</div>
													<div id="radiusDC">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusDC" onchange="changeDCRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusDC"></label>
														</div>
													</div>
													<!--start-->
													<div id="divVorDC">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbDCVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbDCVoronoi"></label>
														</div>
														<div id="voroDCAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroDCAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'DC\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>								
														<div id="voronoiControlsDC">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanDC" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanDC">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddDC" name="controls">
																	<label class="lblVorCntrls" for="chkAddDC">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelDC" name="controls">
																	<label class="lblVorCntrls" for="chkDelDC">Delete</label>
																</div>
															   
																<div class="tab">
																	<input type="radio" id="chkInteractiveDC" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px; border-right: 1px solid #26A69A;" class="lblVorCntrls" for="chkInteractiveDC">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbDCVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbDCVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorDCOpacity"><div id="vorDChandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
													<!--end-->
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" href="#warehouseData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Warehouses</b>
												</a>
												<div id="warehouseData" class="collapse">
													<!--<h5><b> Warehouses </b></h5>-->
													<select id="selWarehouses" class="selectpicker show-tick" multiple data-selected-text-format="count" title="Choose one of the following..." onchange="addWarehouseData();">
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refRefrigerated" href="#refrigeratedData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Refrigerated & Frozen</b>
												</a>
												<div id="refrigeratedData" class="collapse">
													<!--<h5><b> Refrigerated & Frozen </b></h5>-->
													<select id="selRefrigerated" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" title="Choose one of the following..." onchange="addRefrigeratedData();">
														<option value="refrigerated" '.((strpos($projectValues[0]["foodrefri"], 'refrigerated') !== false)?'selected="selected"':"").'>Refrigerated Locations</option>
														<option value="refri" '.((strpos($projectValues[0]["foodrefri"], 'refri') !== false)?'selected="selected"':"").'>Total # of Facilities</option>
														<option value="shipping" '.((strpos($projectValues[0]["foodrefri"], 'shipping') !== false)?'selected="selected"':"").'>Refrigerated Shipping</option>
													</select>
													<div id="activitesRef">
														<div class="bottomBar"></div>
														<h5><b> Activities Filter: </b></h5>
														<select id="activityFilter" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" title="Choose one of the following..." onchange="filterActivities();">
															<option value="AMS RTE Canada EV Program" '.((strpos($projectValues[0]["foodrefriactivities"], 'AMS RTE Canada EV Program') !== false)?'selected="selected"':"").'>AMS RTE Canada EV Program</option>
															<option value="Exotic" '.((strpos($projectValues[0]["foodrefriactivities"], 'Exotic') !== false)?'selected="selected"':"").'>Exotic</option>
															<option value="Imported Product" '.((strpos($projectValues[0]["foodrefriactivities"], 'Imported Product') !== false)?'selected="selected"':"").'>Imported Product</option>
															<option value="Inspection and Certification" '.((strpos($projectValues[0]["foodrefriactivities"], 'Inspection and Certification') !== false)?'selected="selected"':"").'>Inspection & Certification</option>
															<option value="Meat" '.((strpos($projectValues[0]["foodrefriactivities"], 'Meat') !== false)?'selected="selected"':"").'>Meat</option>
															<option value="Poultry" '.((strpos($projectValues[0]["foodrefriactivities"], 'Poultry') !== false)?'selected="selected"':"").'>Poultry</option>
															<option value="Siluriformes" '.((strpos($projectValues[0]["foodrefriactivities"], 'Siluriformes') !== false)?'selected="selected"':"").'>Siluriformes</option>
															<option value="Technical Animal Fats" '.((strpos($projectValues[0]["foodrefriactivities"], 'Technical Animal Fats') !== false)?'selected="selected"':"").'>Technical Animal Fats</option>
														</select>
													</div>
													<div id="logosRefri">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsRefri" onchange="changeLabelsRefri($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchLabelsRefri"></label>
														</div>
													</div>
													<div id="radiusRefri">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusRefri" onchange="changeRefriRadius($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchRadiusRefri"></label>
														</div>
													</div>
													<div id="divShippingOpts">
														<div class="bottomBar"></div>
														<h5><b> Direction: </b></h5>
														<select id="selTraffic" class="selectpicker show-tick" onchange="shippingRef(\'selTraffic\');">
															<option value="in">Inbound</option>
															<option value="out">Outbound</option>
														</select>
														<h5><b> Transportation Type: </b></h5>
														<select id="selMode" class="selectpicker show-tick" onchange="shippingRef(\'selMode\');">
															<option value="all">All</option>
															<option value="air">Air</option>
															<option value="truck">Truck</option>
															<option value="train">Train</option>
															<option value="mail">Multimode</option>
														</select>
														<div id="logosShipping">
															<h5><b> Shipping Type Icon </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsShipping" onchange="changeLabelsShipping($(this).prop(\'checked\')?\'active\':\'dull\')">
																<label class="onoffswitch-label" for="switchLabelsShipping"></label>
															</div>
														</div>
													</div>
													<div id="divVorRef">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbRefVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbRefVoronoi"></label>
														</div>
														<div id="voroRefAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroRefAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Refrigerated\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>							
														<div id="voronoiControlsRef">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanRef" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanRef">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddRef" name="controls">
																	<label class="lblVorCntrls" for="chkAddRef">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelRef" name="controls">
																	<label class="lblVorCntrls" for="chkDelRef">Delete</label>
																</div>
																   
																<div class="tab">
																	<input type="radio" id="chkInteractiveRef" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveRef">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbRefVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbRefVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorRefOpacity"><div id="vorRefhandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
													<div id="divTransRefri" class="condTransDivs">
														<h5> <b> Sector & Year: </b> </h5>
														<select id="refriSelectColumn" class="selectpicker show-tick" onchange="updateLook();">
															<option value="pub_18" selected>Public 2018</option>
															<option value="prisem_18">Private & Semi Private 2018</option>
															<option value="total_18">Total 2018</option>
															<option value="pub_16">Public 2016</option>
															<option value="prisem_16">Private & Semi Private 2016</option>
															<option value="total_16">Total 2016</option>
															<option value="pub_14">Public 2014</option>
															<option value="prisem_14">Private & Semi Private 2014</option>
															<option value="total_14">Total 2014</option>
															<option value="pub_12">Public 2012</option>
															<option value="prisem_12">Private & Semi Private 2012</option>
															<option value="total_12">Total 2012</option>
															<option value="pub_10">Public 2010</option>
															<option value="prisem_10">Private & Semi Private 2010</option>
															<option value="total_10">Total 2010</option>
														</select>
														<h5> <b> Data Display Options: </b> </h5>
														<ul>
															<select id="cohortOptsRefri" class="selectpicker show-tick" onchange="changePaletteRefri();">
																<option value="standard">Standard</option>
																<option value="divergent">Divergent</option>
															</select>
															<table id="refriCohortsOpts" class="tableConds">
																<tbody>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeRefri" id="cbfirstThemeRefri">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																		</td>
																	</tr>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeRefri" id="cbsecondThemeRefri" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																		</td>
																	</tr>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeRefri" id="cbthirdThemeRefri">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																		</td>
																	</tr>
																	</tbody>
															</table>
															<table class="tableConds">
																<tbody>
																	<tr class="tdTopBorder">
																		<td>
																			<h5><b> Flip Cohorts </b></h5>
																			<div class="onoffswitch">
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsRefri" onchange="flipCohorts($(this).prop(\'checked\')?\'on\':\'off\')">
																				<label class="onoffswitch-label" for="flipCohortsRefri"></label>																
																			</div>
																		</td>
																		<td>
																			<h5><b> Frames </b></h5>
																			<div class="onoffswitch">
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesRefri" onchange="changeFrames($(this).prop(\'checked\')?\'on\':\'off\')">
																				<label class="onoffswitch-label" for="switchFramesRefri"></label>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
															<div id="divSelFramesRefri">
																<h5> <b> Frame Color: </b> </h5>
																<select id="selFramesRefri" class="selectpicker show-tick" onchange="setFrames();">
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

										<div id="retailTab" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refFoodHome" href="#foodhomeData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Food-at-Home</b>
												</a>
												<div id="foodhomeData" class="collapse">
													<select id="selFoodHome" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" data-selected-text-format="count" onchange="addFoodHomeData();">
														<option value="supermarkets" '.((strpos($projectValues[0]["foodhome"], 'supermarkets') !== false)?'selected="selected"':"").'>Supermarkets</option>
														<option value="supercenters" disabled>Supercenters</option>
														<option value="club" disabled>Club</option>
														<option value="convenience" disabled>Convenience</option>
														<option value="dollar" disabled>Dollar</option>
														<option value="farmers" '.((strpos($projectValues[0]["foodhome"], 'farmers') !== false)?'selected="selected"':"").'>Farmers Markets</option>
													</select>
													<div id="supermarketsDiv" class="collapse">
														<select id="retailData" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" onchange="addRetailData();">
															<option value="albertsons" '.((strpos($projectValues[0]["foodhomesuper"], 'albertsons') !== false)?'selected="selected"':"").'>Albertsons</option>
															<option value="gianteagle" '.((strpos($projectValues[0]["foodhomesuper"], 'gianteagle') !== false)?'selected="selected"':"").'>Giant Eagle</option>
															<option value="kroger" '.((strpos($projectValues[0]["foodhomesuper"], 'kroger') !== false)?'selected="selected"':"").'>Kroger</option>
															<option value="publix" '.((strpos($projectValues[0]["foodhomesuper"], 'publix') !== false)?'selected="selected"':"").'>Publix</option>
															<option value="traderjoes" '.((strpos($projectValues[0]["foodhomesuper"], 'traderjoes') !== false)?'selected="selected"':"").'>Trader Joe\'s</option>
															<option value="wholefoods" '.((strpos($projectValues[0]["foodhomesuper"], 'wholefoods') !== false)?'selected="selected"':"").'>Whole Foods</option>
														</select>
													</div>
													<div id="optAlbert">
														<h5><b>Albertsons Brands:</b></h5>
														<select id="albertsonsBrands" class="selectpicker show-tick " multiple data-actions-box="true" data-selected-text-format="count" onchange="filterAlbertsons();">
															<option value="AcmeMarket" '.((strpos($projectValues[0]["foodhomealbertsons"], 'AcmeMarket') !== false)?'selected="selected"':"").'>Acme Market</option>
															<option value="Albertsons" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Albertsons') !== false)?'selected="selected"':"").'>Albertsons</option>
															<option value="JewelOsco" '.((strpos($projectValues[0]["foodhomealbertsons"], 'JewelOsco') !== false)?'selected="selected"':"").'>Jewel-Osco</option>
															<option value="Lucky" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Lucky') !== false)?'selected="selected"':"").'>Lucky</option>
															<option value="PakNSave" '.((strpos($projectValues[0]["foodhomealbertsons"], 'PakNSave') !== false)?'selected="selected"':"").'>Pak N Save</option>
															<option value="Pavilions" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Pavilions') !== false)?'selected="selected"':"").'>Pavilions</option>
															<option value="Randalls" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Randalls') !== false)?'selected="selected"':"").'>Randalls</option>
															<option value="Safeway" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Safeway') !== false)?'selected="selected"':"").'>Safeway</option>
															<option value="Shaws" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Shaws') !== false)?'selected="selected"':"").'>Shaws</option>
															<option value="StarMarket" '.((strpos($projectValues[0]["foodhomealbertsons"], 'StarMarket') !== false)?'selected="selected"':"").'>Star Market</option>
															<option value="TomThumb" '.((strpos($projectValues[0]["foodhomealbertsons"], 'TomThumb') !== false)?'selected="selected"':"").'>Tom Thumb</option>
															<option value="Vons" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Vons') !== false)?'selected="selected"':"").'>Vons</option>
														</select>
													</div>
													<div id="optKroger">
														<h5><b>Kroger Brands:</b></h5>
														<select id="krogerBrands" class="selectpicker show-tick " multiple data-actions-box="true" data-selected-text-format="count" onchange="filterKroger();">
															<option value="Bakers" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Bakers') !== false)?'selected="selected"':"").'>Baker\'s</option>
															<option value="CityMarket" '.((strpos($projectValues[0]["foodhomealbertsons"], 'CityMarket') !== false)?'selected="selected"':"").'>City Market</option>
															<option value="Copps" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Copps') !== false)?'selected="selected"':"").'>Copps</option>
															<option value="Dillions" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Dillions') !== false)?'selected="selected"':"").'>Dillions</option>
															<option value="Food4Less" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Food4Less') !== false)?'selected="selected"':"").'>Food 4 Less</option>
															<option value=""Foodsco"" '.((strpos($projectValues[0]["foodhomealbertsons"], '"Foodsco"') !== false)?'selected="selected"':"").'>Foodsco</option>
															<option value="FredMeyer" '.((strpos($projectValues[0]["foodhomealbertsons"], 'FredMeyer') !== false)?'selected="selected"':"").'>Fred Meyer</option>
															<option value="FrysFoodStores" '.((strpos($projectValues[0]["foodhomealbertsons"], 'FrysFoodStores') !== false)?'selected="selected"':"").'>Frys Food Stores</option>
															<option value="Gerbes" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Gerbes') !== false)?'selected="selected"':"").'>Gerbes</option>
															<option value="HarrisTeeter" '.((strpos($projectValues[0]["foodhomealbertsons"], 'HarrisTeeter') !== false)?'selected="selected"':"").'>Harris Teeter</option>
															<option value="JayC" '.((strpos($projectValues[0]["foodhomealbertsons"], 'JayC') !== false)?'selected="selected"':"").'>Jay C</option>
															<option value="KingSoopers" '.((strpos($projectValues[0]["foodhomealbertsons"], 'KingSoopers') !== false)?'selected="selected"':"").'>King Soopers</option>
															<option value="Kroger" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Kroger') !== false)?'selected="selected"':"").'>Kroger</option>
															<option value="Marianos" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Marianos') !== false)?'selected="selected"':"").'>Marianos</option>
															<option value="MetroMarket" '.((strpos($projectValues[0]["foodhomealbertsons"], 'MetroMarket') !== false)?'selected="selected"':"").'>Metro Market</option>
															<option value="Owens" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Owens') !== false)?'selected="selected"':"").'>Owen\'s</option>
															<option value="PaylessSuperMarket" '.((strpos($projectValues[0]["foodhomealbertsons"], 'PaylessSuperMarket') !== false)?'selected="selected"':"").'>Payless Super Market</option>
															<option value="PicknSave" '.((strpos($projectValues[0]["foodhomealbertsons"], 'PicknSave') !== false)?'selected="selected"':"").'>Pick n Save</option>
															<option value="QualityFoodCenter" '.((strpos($projectValues[0]["foodhomealbertsons"], 'QualityFoodCenter') !== false)?'selected="selected"':"").'>Quality Food Center</option>
															<option value="Ralphs" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Ralphs') !== false)?'selected="selected"':"").'>Ralphs</option>
															<option value="RalphsFreshFare" '.((strpos($projectValues[0]["foodhomealbertsons"], 'RalphsFreshFare') !== false)?'selected="selected"':"").'>Ralphs Fresh Fare</option>
															<option value="Ruler" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Ruler') !== false)?'selected="selected"':"").'>Ruler</option>
															<option value="Smiths" '.((strpos($projectValues[0]["foodhomealbertsons"], 'Smiths') !== false)?'selected="selected"':"").'>Smith\'s</option>
														</select>
													</div>
													<div id="logosFoodHome">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsFoodHome" onchange="changeLabelsFoodHome($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
																<label class="onoffswitch-label" for="switchLabelsFoodHome"></label>
														</div>
													</div>
													<div id="radiusFoodHome">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusFoodHome" onchange="changeFoodHomeRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusFoodHome"></label>
														</div>
													</div>
													<div id="divVorFoodHome">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodHomeVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbFoodHomeVoronoi"></label>
														</div>
														<div id="voroFoodHomeAreaDiv">
															<h5><b> Select Area Type: </b></h5>
															<select id="voroFoodHomeAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'FoodHome\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>
														<div id="voronoiControlsFoodHome">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanFoodHome" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanFoodHome">Pan</label>
																</div>
																			
																<div class="tab">
																	<input type="radio" id="chkAddFoodHome" name="controls">
																	<label class="lblVorCntrls" for="chkAddFoodHome">Add</label>
																</div>
																			
																<div class="tab">
																	<input type="radio" id="chkDelFoodHome" name="controls">
																	<label class="lblVorCntrls" for="chkDelFoodHome">Delete</label>
																</div>
																		   
																<div class="tab">
																	<input type="radio" id="chkInteractiveFoodHome" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveFoodHome">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodHomeVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbFoodHomeVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorFoodHomeOpacity"><div id="vorFoodHomehandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refFoodAway" href="#foodawayData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Food Away</b>
												</a>
												<div id="foodawayData" class="collapse">
													<select id="selFoodaway" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" data-selected-text-format="count" onchange="addFoodAwayData();">
														<option value="culver" '.((strpos($projectValues[0]["foodaway"], 'culver') !== false)?'selected="selected"':"").'>Culver\'s Restaurants</option>
														<option value="fiveguys" '.((strpos($projectValues[0]["foodaway"], 'fiveguys') !== false)?'selected="selected"':"").'>Five Guys</option>
														<option value="potbelly" '.((strpos($projectValues[0]["foodaway"], 'potbelly') !== false)?'selected="selected"':"").'>Potbelly</option>
														<option value="raisingcanes" '.((strpos($projectValues[0]["foodaway"], 'raisingcanes') !== false)?'selected="selected"':"").'>Raising Cane\'s</option>
														<option value="starbucks" '.((strpos($projectValues[0]["foodaway"], 'starbucks') !== false)?'selected="selected"':"").'>Starbucks Coffee</option>
														<option value="thornton" '.((strpos($projectValues[0]["foodaway"], 'thornton') !== false)?'selected="selected"':"").'>Thornton</option>
													</select>
													<div id="optFiveGuys">
														<h5><b>Five Guys Filters:</b></h5>
														<select id="fiveguysFilter" class="selectpicker show-tick " multiple data-actions-box="true" data-selected-text-format="count" onchange="filterFiveGuys();">
															<option value="beer" selected>Serves Beer</option>
															<option value="breakfast" selected>Serves Breakfast</option>
															<option value="cokefrees" selected>Serves Coca-Cola Freestyle</option>
															<option value="milkshakes" selected>Serves Milkshakes</option>
															<option value="delivery" selected>Has Delivery</option>
														</select>
													</div>
													<div id="logosFoodAway">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsFoodAway" onchange="changeLabelsFoodAway($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
																<label class="onoffswitch-label" for="switchLabelsFoodAway"></label>
														</div>
													</div>
													<div id="radiusFoodAway">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusFoodAway" onchange="changeFoodAwayRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusFoodAway"></label>
														</div>
													</div>
													<div id="divVorFoodAway">
															<h5><b> Voronoi </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodAwayVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbFoodAwayVoronoi"></label>
															</div>
															<div id="voroFoodAwayAreaDiv">
															<h5><b> Select Area Type: </b></h5>
																<select id="voroFoodAwayAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'FoodAway\');">
																	<option value="none">None</option>
																	<option value="CAS">Custom Area Selection</option>
																	<option value="state">State Level</option>
																	<option value="full">Full Map Extent</option>
																</select>
															</div>						
															<div id="voronoiControlsFoodAway">
																<h5><b> Voronoi Controls: </b></h5>
																<div class="tabs">
																	<div class="tab">
																		<input type="radio" id="chkPanFoodAway" name="controls" checked>
																		<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanFoodAway">Pan</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkAddFoodAway" name="controls">
																		<label class="lblVorCntrls" for="chkAddFoodAway">Add</label>
																	</div>
																	
																	<div class="tab">
																		<input type="radio" id="chkDelFoodAway" name="controls">
																		<label class="lblVorCntrls" for="chkDelFoodAway">Delete</label>
																	</div>
																   
																	<div class="tab">
																		<input type="radio" id="chkInteractiveFoodAway" name="controls">
																		<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveFoodAway">Interactive</label>
																	</div>
																</div>
																<div class="bottomBar"></div>
																<h5><b> Voronoi Color Ramp: </b></h5>
																<div class="onoffswitch">
																	<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodAwayVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																	<label class="onoffswitch-label" for="cbFoodAwayVoronoiRamp"></label>
																</div>
																<h5>Transparency</h5>
																<div id="iptVorFoodAwayOpacity"><div id="vorFoodAwayhandle" class="ui-slider-handle"></div></div>
															</div>
														</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refSupermarkets" href="#foodSuperMarket" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Supermarkets (Ltd.)</b>
												</a>
												<div id="foodSuperMarket" class="collapse">
													<select id="selFoodSuperMarket" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" data-selected-text-format="count" onchange="addFoodSuperMarket();">
														<option value="aldiEighteen" '.((strpos($projectValues[0]["foodretailsuper"], 'aldiEighteen') !== false)?'selected="selected"':"").'>Aldi Current (2018)</option>
														<option value="aldiEighteenNew" '.((strpos($projectValues[0]["foodretailsuper"], 'aldiEighteenNew') !== false)?'selected="selected"':"").'>Aldi Stores (Newly Opened)</option>
														<option value="aldiSixteenClosed" '.((strpos($projectValues[0]["foodretailsuper"], 'aldiSixteenClosed') !== false)?'selected="selected"':"").'>Aldi Stores (Now Closed)</option>
														<option value="aldiSixteen" '.((strpos($projectValues[0]["foodretailsuper"], 'aldiSixteen') !== false)?'selected="selected"':"").'>Aldi Stores (2016)</option>
														<option value="aldiDivisions" '.((strpos($projectValues[0]["foodretailsuper"], 'aldiDivisions') !== false)?'selected="selected"':"").'>Aldi Divisions</option>
													</select>
													<div id="logosFoodSuperMarket">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsFoodSuperMarket" onchange="changeLabelsFoodSuperMarket($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
																<label class="onoffswitch-label" for="switchLabelsFoodSuperMarket"></label>
														</div>
													</div>
													<div id="radiusFoodSuperMarket">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusFoodSuperMarket" onchange="changeFoodSuperMarketRadius($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusFoodSuperMarket"></label>
														</div>
													</div>
													<div id="divVorFoodSuperMarket">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodSuperMarketVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbFoodSuperMarketVoronoi"></label>
														</div>
														<div id="voroFoodSuperMarketAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroFoodSuperMarketAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'FoodSuperMarket\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>							
														<div id="voronoiControlsFoodSuperMarket">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanFoodSuperMarket" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanFoodSuperMarket">Pan</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkAddFoodSuperMarket" name="controls">
																	<label class="lblVorCntrls" for="chkAddFoodSuperMarket">Add</label>
																</div>
																
																<div class="tab">
																	<input type="radio" id="chkDelFoodSuperMarket" name="controls">
																	<label class="lblVorCntrls" for="chkDelFoodSuperMarket">Delete</label>
																</div>
															   
																<div class="tab">
																	<input type="radio" id="chkInteractiveFoodSuperMarket" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveFoodSuperMarket">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbFoodSuperMarketVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbFoodSuperMarketVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorFoodSuperMarketOpacity"><div id="vorFoodSuperMarkethandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
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