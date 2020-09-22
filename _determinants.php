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
				$sql = "SELECT determinantspane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$radiusValues = $stmt->fetchAll();
				
				if($radiusValues[0]["determinantspane"] == 1)
				{
					$sqlFour;
					if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {						
						$sqlFour = "SELECT `user_id`,`healthboundaries`,`healthconditions`,`healthcondtrans` FROM project where title <> '' and id=" . $_SESSION["project_id"];
					}
					else{						
						$sqlFour = "SELECT `user_id`,`healthboundaries`,`healthconditions`,`healthcondtrans` FROM project where title = '' and user_id=" . $_SESSION["user_id"];
					}
					
					$stmtFour = $DB->prepare($sqlFour);
					$stmtFour->execute();
					$projectValues = $stmtFour->fetchAll();
					
					if($projectValues[0]["user_id"] === NULL)
					{
					}
					else
					{
						echo '<script>';
						echo 'var helathtrans = ' . $projectValues[0]["healthcondtrans"] . ';';
						echo '</script>';
					}
					
					echo '<!----Sidebar Health--->
							<div id="mainDivDeterminants" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll" style="display:none;" >
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#socialTabTwo">Social</a></li>
										<li><a data-toggle="tab" href="#economicTabTwo">Economic</a></li>
										<li><a data-toggle="tab" href="#environmentalTabTwo">Environmental</a></li>
									</ul>

									<div class="tab-content">
										<div id="socialTabTwo" class="tab-pane fade in active">
											<div class="div-hand">
												<a data-toggle="collapse" id="refLowIncome" href="#urbanRuralIncome" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Low Income</b>
												</a>
												<div id="urbanRuralIncome" class="collapse">
													<select id="urbanRuralIncomeSelect" class="selectpicker show-tick" onchange="addUrbanRuralIncome();">
														<option value="none">None</option>
														<option value="lowincomet" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'lowincomet') !== false)?'selected="selected"':"").'>Low Income Tracts</option>
														<option value="la1and10" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'la1and10') !== false)?'selected="selected"':"").'>Low Food Access (1&10)</option>
														<option value="latracts_h" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'latracts_h') !== false)?'selected="selected"':"").'>Low Food Access (1/2 mile)</option>
														<option value="latracts20" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'latracts20') !== false)?'selected="selected"':"").'>Low Food Access (20 miles)</option>
														<option value="lilatracts" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'lilatracts') !== false)?'selected="selected"':"").'>LILA Tracts 1 And 10</option>
														<option value="low_educat" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'low_educat') !== false)?'selected="selected"':"").'>Low Education 2015</option>
														<option value="low_employ" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'low_employ') !== false)?'selected="selected"':"").'>Low Employment County 2008-2012</option>
														<option value="pop_loss_2" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'pop_loss_2') !== false)?'selected="selected"':"").'>Population Loss 2015</option>
														<option value="retirement" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'retirement') !== false)?'selected="selected"':"").'>Retirement Destination 2015</option>
														<option value="persistent" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'persistent') !== false)?'selected="selected"':"").'>Persistent Poverty 2013</option>
														<option value="persisten2" '.((strlen($projectValues[0]["lowincome"]) > 0 && strpos($projectValues[0]["lowincome"], 'persisten2') !== false)?'selected="selected"':"").'>Persistent Related Child Poverty 2013</option>
													</select>
													<div id="divTransSocialTwo" class="condTransDivs">
														<h5> <b> Data Display Options: </b> </h5>
														<ul>
															<table class="tableConds">
																<tbody>
																	<tr class="tdTopBorder">
																		<td>
																			<h5><b> Flip Texture </b></h5>
																			<div class="onoffswitch">
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipTextureSocialTwo" onchange="flipTextureSocialTwo($(this).prop(\'checked\')?\'on\':\'off\')">
																				<label class="onoffswitch-label" for="flipTextureSocialTwo"></label>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</ul>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>
										
										<div id="economicTabTwo" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondUrbanRuralIncome" href="#urbanruralData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Datasets</b>
												</a>
												<div id="urbanruralData" class="collapse">
													<select id="urbanruralSelect" class="selectpicker show-tick" onchange="addUrbanRuralLowIncome();">
														<option value="none">None</option>
														<option value="urbanrural" '.((strpos($projectValues[0]["conditions"], 'urbanrural') !== false)?'selected="selected"':"").'>Urban/Rural Counties</option>
														<option value="economictype" '.((strpos($projectValues[0]["conditions"], 'economictype') !== false)?'selected="selected"':"").'>Primary Economic Type</option>
														<option value="nooforganicgrowers" '.((strpos($projectValues[0]["conditions"], 'nooforganicgrowers') !== false)?'selected="selected"':"").'># of Organic Growers</option>
														<option value="noofestt" '.((strpos($projectValues[0]["conditions"], 'noofestt') !== false)?'selected="selected"':"").'># of (FS) Establishment</option>
														<option value="noofjobs" '.((strpos($projectValues[0]["conditions"], 'noofjobs') !== false)?'selected="selected"':"").'># of (FS) Jobs (employment)</option>
														<option value="percentjobs" '.((strpos($projectValues[0]["conditions"], 'percentjobs') !== false)?'selected="selected"':"").'>(FS) Employment per thousand Jobs (%)</option>
														<option value="noofstores" '.((strpos($projectValues[0]["conditions"], 'noofstores') !== false)?'selected="selected"':"").'># of Food Retail Stores</option>
														<option value="job_gravity" '.((strpos($projectValues[0]["conditions"], 'job_gravity') !== false)?'selected="selected"':"").'>Total jobs for every tract in the US divided by its distance from the centroid squared</option>
														<option value="retail_gravity" '.((strpos($projectValues[0]["conditions"], 'retail_gravity') !== false)?'selected="selected"':"").'>Retail jobs for every tract in the US divided by its distance from the centroid squared</option>
													</select>
													<div id="primaryeconomictypeDiv">
													<h5> <b> Primary Economic Filters: </b> </h5>
														<select id="primaryeconomictypeSelect" class="selectpicker show-tick" onchange="addPrimaryEconomicType();">
															<option value="none">None</option>
															<option value="economic" '.((strpos($projectValues[0]["subconditions"], 'all') !== false)?'selected="selected"':"").'>All</option>
															<option value="farming_20" '.((strpos($projectValues[0]["subconditions"], 'farming_20') !== false)?'selected="selected"':"").'>Farming</option>
															<option value="mining_201" '.((strpos($projectValues[0]["subconditions"], 'mining_201') !== false)?'selected="selected"':"").'>Mining</option>
															<option value="manufactur" '.((strpos($projectValues[0]["subconditions"], 'manufactur') !== false)?'selected="selected"':"").'>Manufacturing</option>
															<option value="government" '.((strpos($projectValues[0]["subconditions"], 'government') !== false)?'selected="selected"':"").'>Government</option>
															<option value="recreation" '.((strpos($projectValues[0]["subconditions"], 'recreation') !== false)?'selected="selected"':"").'>Recreation</option>
															<option value="nonspecial" '.((strpos($projectValues[0]["subconditions"], 'nonspecial') !== false)?'selected="selected"':"").'>Diversified</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondDiesel" href="#dieselData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Taxes</b>
												</a>
												<div id="dieselData" class="collapse">
													<select id="dieselSelect" class="selectpicker show-tick" onchange="addDieselData();">
														<option value="none">None</option>
														<option value="2013">2013 Diesel Motor Fuel Tax Rates</option>
														<option value="2017">2017 Diesel Motor Fuel Tax Rates</option>
														<option value="2018">2018 Diesel Motor Fuel Tax Rates</option>
														<option value="oneyear">1 Year Diesel Motor Fuel Change ($)</option>
														<option value="oneyearper">1 Year Diesel Motor Fuel Change (%)</option>
														<option value="fiveyear">5 Year Diesel Motor Fuel Change ($)</option>
														<option value="fiveyearper">5 Year Diesel Motor Fuel Change (%)</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondDiesel" href="#daData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Designated Areas</b>
												</a>
												<div id="daData" class="collapse">
													<select id="daSelect" class="selectpicker show-tick" onchange="addDAData();">
														<option value="none">None</option>
														<option value="opportunityzones">Opportunity Zones</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondEmployment" href="#employmentData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Employment</b>
												</a>
												<div id="employmentData" class="collapse">
													<select id="employmentSelect" class="selectpicker show-tick" onchange="addEmploymentData();">
														<option value="none">None</option>
														<option value="C000">Jobs (Total)</option>
														<option value="CD04">Jobs (Bachelor Degree+)</option>
													</select>
													<div id="divEmploymentSelectStates">
														<h5> Select State(s) </b> </h5>
														<select id="employmentSelectStates" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addEmploymentDataStates();">
															<option value="1">ALABAMA</option>
															<option value="4">ARIZONA</option>
															<option value="5">ARKANSAS</option>
															<option value="6">CALIFORNIA</option>
															<option value="8">COLORADO</option>
															<option value="9">CONNECTICUT</option>
															<option value="10">DELAWARE</option>
															<option value="11">DISTRICT OF COLUMBIA</option>
															<option value="12">FLORIDA</option>
															<option value="13">GEORGIA</option>
															<option value="16">IDAHO</option>
															<option value="17">ILLINOIS</option>
															<option value="18">INDIANA</option>
															<option value="19">IOWA</option>
															<option value="20">KANSAS</option>
															<option value="21">KENTUCKY</option>
															<option value="22">LOUISIANA</option>
															<option value="23">MAINE</option>
															<option value="24">MARYLAND</option>
															<option value="25">MASSACHUSETTS</option>
															<option value="26">MICHIGAN</option>
															<option value="27">MINNESOTA</option>
															<option value="28">MISSISSIPPI</option>
															<option value="29">MISSOURI</option>
															<option value="30">MONTANA</option>
															<option value="31">NEBRASKA</option>
															<option value="32">NEVADA</option>
															<option value="33">NEW HAMPSHIRE</option>
															<option value="34">NEW JERSEY</option>
															<option value="35">NEW MEXICO</option>
															<option value="36">NEW YORK</option>
															<option value="37">NORTH CAROLINA</option>
															<option value="38">NORTH DAKOTA</option>
															<option value="39">OHIO</option>
															<option value="40">OKLAHOMA</option>
															<option value="41">OREGON</option>
															<option value="42">PENNSYLVANIA</option>
															<option value="44">RHODE ISLAND</option>
															<option value="45">SOUTH CAROLINA</option>
															<option value="46">SOUTH DAKOTA</option>
															<option value="47">TENNESSEE</option>
															<option value="48">TEXAS</option>
															<option value="49">UTAH</option>
															<option value="50">VERMONT</option>
															<option value="51">VIRGINIA</option>
															<option value="53">WASHINGTON</option>
															<option value="54">WEST VIRGINIA</option>
															<option value="55">WISCONSIN</option>
															<option value="56">WYOMING</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondCrops" href="#cropsData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Crops</b>
												</a>
												<div id="cropsData" class="collapse">
													<select id="cropsSelect" class="selectpicker show-tick" onchange="addCropsData();">
														<option value="none">None</option>
														<option value="crop_production" '.((strpos($projectValues[0]["conditions"], 'crop_production') !== false)?'selected="selected"':"").'>Crop Production (Type)</option>
														<option value="hydroponic_growers_county" '.((strpos($projectValues[0]["conditions"], 'hydroponic_growers_county') !== false)?'selected="selected"':"").'>Hydroponic Growers</option>
													</select>
													<div id="crop_productionType">
														<h5> <b> Crop Production Type: </b> </h5>
														<select id="crop_productionTypeSelect" class="selectpicker show-tick" multiple data-selected-text-format="count" onchange="addCropProductionType();">
															<option value="apples" '.((strpos($projectValues[0]["subconditions"], 'apples') !== false)?'selected="selected"':"").'>Apples</option>
															<option value="blueberries" '.((strpos($projectValues[0]["subconditions"], 'blueberries') !== false)?'selected="selected"':"").'>Blueberries</option>
															<option value="cherries" '.((strpos($projectValues[0]["subconditions"], 'cherries') !== false)?'selected="selected"':"").'>Cherries</option>
															<option value="field_forageable" '.((strpos($projectValues[0]["subconditions"], 'field_forageable') !== false)?'selected="selected"':"").'>Field Forageable</option>
															<option value="flower_vegetables" '.((strpos($projectValues[0]["subconditions"], 'flower_vegetables') !== false)?'selected="selected"':"").'>Flower Vegetables</option>
															<option value="fruit_berries" '.((strpos($projectValues[0]["subconditions"], 'fruit_berries') !== false)?'selected="selected"':"").'>Berries</option>
															<option value="fruit_citrusfruits" '.((strpos($projectValues[0]["subconditions"], 'fruit_citrusfruits') !== false)?'selected="selected"':"").'>Citrus Fruits</option>
															<option value="fruit_melons" '.((strpos($projectValues[0]["subconditions"], 'fruit_melons') !== false)?'selected="selected"':"").'>Melons</option>
															<option value="fruit_pome" '.((strpos($projectValues[0]["subconditions"], 'fruit_pome') !== false)?'selected="selected"':"").'>Pome</option>
															<option value="fruit_stone" '.((strpos($projectValues[0]["subconditions"], 'fruit_stone') !== false)?'selected="selected"':"").'>Stone</option>
															<option value="fruit_tropicalfruits" '.((strpos($projectValues[0]["subconditions"], 'fruit_tropicalfruits') !== false)?'selected="selected"':"").'>Tropical Fruits</option>
															<option value="fruit_vegetables" '.((strpos($projectValues[0]["subconditions"], 'fruit_vegetables') !== false)?'selected="selected"':"").'>Fruit Vegetables</option>
															<option value="fungi" '.((strpos($projectValues[0]["subconditions"], 'fungi') !== false)?'selected="selected"':"").'>Fungi</option>
															<option value="grapes" '.((strpos($projectValues[0]["subconditions"], 'grapes') !== false)?'selected="selected"':"").'>Grapes</option>
															<option value="greenhouse" '.((strpos($projectValues[0]["subconditions"], 'greenhouse') !== false)?'selected="selected"':"").'>Greenhouse</option>
															<option value="herbs_spices" '.((strpos($projectValues[0]["subconditions"], 'herbs_spices') !== false)?'selected="selected"':"").'>Herbs Spices</option>
															<option value="leaf_vegetables" '.((strpos($projectValues[0]["subconditions"], 'leaf_vegetables') !== false)?'selected="selected"':"").'>Leaf Vegetables</option>
															<option value="lettuce" '.((strpos($projectValues[0]["subconditions"], 'lettuce') !== false)?'selected="selected"':"").'>Lettuce</option>
															<option value="nursery_starts_flowers_trees" '.((strpos($projectValues[0]["subconditions"], 'nursery_starts_flowers_trees') !== false)?'selected="selected"':"").'>Nursery Starts Flowers Trees</option>
															<option value="nuts" '.((strpos($projectValues[0]["subconditions"], 'nuts') !== false)?'selected="selected"':"").'>Nuts</option>
															<option value="other" '.((strpos($projectValues[0]["subconditions"], 'other') !== false)?'selected="selected"':"").'>Other</option>
															<option value="peppers" '.((strpos($projectValues[0]["subconditions"], 'peppers') !== false)?'selected="selected"':"").'>Peppers</option>
															<option value="seed_podvegetables" '.((strpos($projectValues[0]["subconditions"], 'seed_podvegetables') !== false)?'selected="selected"':"").'>Seed Vegetables</option>
															<option value="stem_vegetables" '.((strpos($projectValues[0]["subconditions"], 'stem_vegetables') !== false)?'selected="selected"':"").'>Stem Vegetables</option>
															<option value="strawberries" '.((strpos($projectValues[0]["subconditions"], 'strawberries') !== false)?'selected="selected"':"").'>Strawberries</option>
															<option value="tuber_rootvegetables" '.((strpos($projectValues[0]["subconditions"], 'tuber_rootvegetables') !== false)?'selected="selected"':"").'>Tuber Root Vegetables</option>
															<option value="tomatoes" '.((strpos($projectValues[0]["subconditions"], 'tomatoes') !== false)?'selected="selected"':"").'>Tomatoes</option>
															<option value="watermelon" '.((strpos($projectValues[0]["subconditions"], 'watermelon') !== false)?'selected="selected"':"").'>Watermelon</option>
															<option value="wine_grape" '.((strpos($projectValues[0]["subconditions"], 'wine_grape') !== false)?'selected="selected"':"").'>Wine Grape</option>
														</select>
														<div id="divEconomicThree" class="condTransDivs">
															<h5> <b> Data Display Options: </b> </h5>
															<ul>
																<table class="tableConds">
																	<tbody>
																		<tr class="tdTopBorder">
																			<td>
																				<h5><b> Flip Texture </b></h5>
																				<div class="onoffswitch">
																					<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipTextureEconomicThree" onchange="flipTextureEconoThree($(this).prop(\'checked\')?\'on\':\'off\')">
																					<label class="onoffswitch-label" for="flipTextureEconomicThree"></label>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</ul>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondHousing" href="#housingDataDeter" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Housing</b>
												</a>
												<div id="housingDataDeter" class="collapse">
													<select id="housingSelectDeter" class="selectpicker show-tick" onchange="addHousingDeterData();">
														<option value="none">None</option>
														<option value="median_smoc_mortgage">Median selected monthly ownership costs</option>
														<option value="median_gross_rent">Median gross rent</option>
														<option value="avg_h_cost">Average monthly housing cost</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondDemographics" href="#demographicsDataDeter" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Demographics</b>
												</a>
												<div id="demographicsDataDeter" class="collapse">
													<select id="demographicsSelectDeter" class="selectpicker show-tick" onchange="addDemographicsDeterData();">
														<option value="none">None</option>
														<option value="commuters_per_hh">Average number of commuters per household</option>
														<option value="median_hh_income">Median household income</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondTransport" href="#transportDataDeter" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Transport</b>
												</a>
												<div id="transportDataDeter" class="collapse">
													<select id="transportSelectDeter" class="selectpicker show-tick" onchange="addTransportDeterData();">
														<option value="none">None</option>
														<option value="median_commute">Median distance of commuters in the tracts using the centroid of the employment block</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondTapestryIncome" href="#tapestryData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Tapestry</b>
												</a>
												<div id="tapestryData" class="collapse">
													<select id="tapestrySelect" class="selectpicker show-tick" onchange="addTapestry();">
														<option value="none">None</option>
														<option value="tapestry" '.((strpos($projectValues[0]["conditions"], 'tapestry') !== false)?'selected="selected"':"").'>Tapestry</option>
													</select>
													<div id="tapestrytypeDiv">
													<h5> <b> Type </b> </h5>
														<select id="tapestrytypeSelect" class="selectpicker show-tick" onchange="addTapestryType();">
															<option value="none">None</option>
															<option value="urbancentera" '.((strpos($projectValues[0]["subconditions"], 'urbancentera') !== false)?'selected="selected"':"").'>Urban Center A</option>
															<option value="urbancenterb" '.((strpos($projectValues[0]["subconditions"], 'urbancenterb') !== false)?'selected="selected"':"").'>Urban Center B</option>
															<option value="metrocitiesa" '.((strpos($projectValues[0]["subconditions"], 'metrocitiesa') !== false)?'selected="selected"':"").'>Metro Cities A</option>
															<option value="metrocitiesb" '.((strpos($projectValues[0]["subconditions"], 'metrocitiesb') !== false)?'selected="selected"':"").'>Metro Cities B</option>
															<option value="urbanoutskirtsa" '.((strpos($projectValues[0]["subconditions"], 'urbanoutskirtsa') !== false)?'selected="selected"':"").'>Urban Outskirt A</option>
															<option value="urbanoutskirtsb" '.((strpos($projectValues[0]["subconditions"], 'urbanoutskirtsb') !== false)?'selected="selected"':"").'>Urban Outskirt B</option>
															<option value="suburbana" '.((strpos($projectValues[0]["subconditions"], 'suburbana') !== false)?'selected="selected"':"").'>Suburban A</option>
															<option value="suburbanb" '.((strpos($projectValues[0]["subconditions"], 'suburbanb') !== false)?'selected="selected"':"").'>Suburban B</option>
															<option value="smalltowns" '.((strpos($projectValues[0]["subconditions"], 'smalltowns') !== false)?'selected="selected"':"").'>Small Towns</option>
															<option value="rurala" '.((strpos($projectValues[0]["subconditions"], 'rurala') !== false)?'selected="selected"':"").'>Rural A</option>
															<option value="ruralb" '.((strpos($projectValues[0]["subconditions"], 'ruralb') !== false)?'selected="selected"':"").'>Rural B</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondAG" href="#agData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Agriculture</b>
												</a>
												<div id="agData" class="collapse">
													<select id="agSelect" class="selectpicker show-tick" onchange="addAG();">
														<option value="none">None</option>
														<option value="sum" '.((strpos($projectValues[0]["conditions"], 'sum') !== false)?'selected="selected"':"").'>Sum</option>
														<option value="r18" '.((strpos($projectValues[0]["conditions"], 'r18') !== false)?'selected="selected"':"").'>R18</option>
														<option value="r17" '.((strpos($projectValues[0]["conditions"], 'r17') !== false)?'selected="selected"':"").'>R17</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div id="divTransEconomicTwo" class="condTransDivs">
												<h5> <b> Data Display Options: </b> </h5>
												<ul>
													<select id="cohortOptsEconomicTwo" class="selectpicker show-tick" onchange="changePaletteEconomicTwo();">
														<option value="standard">Standard</option>
														<option value="divergent">Divergent</option>
													</select>
													<table id="economicTwoCohortsOpts" class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEconomicTwo" id="cbfirstThemeEconomicTwo">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEconomicTwo" id="cbsecondThemeEconomicTwo" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEconomicTwo" id="cbthirdThemeEconomicTwo">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																</td>
															</tr>
														</tbody>
													</table>
													<table class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td id="flipEco">
																	<h5 id="flipEconomicTwoCohorts"><b> Flip Cohorts </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsEconomicTwo" onchange="flipCohortsEcono($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="flipCohortsEconomicTwo"></label>
																	</div>
																</td>
																<td id="framesEco">
																	<h5><b> Frames </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesEconomicTwo" onchange="changeFramesEcono($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="switchFramesEconomicTwo"></label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<div id="divSelFramesEconomicTwo">
														<h5> <b> Frame Color: </b> </h5>
														<select id="selFramesEconomicTwo" class="selectpicker show-tick" onchange="setFramesEcono();">
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
										
										<div id="environmentalTabTwo" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondEnviroTwoData" href="#landDeterData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Land Determinants</b>
												</a>
												<div id="landDeterData" class="collapse">
													<select id="landDeterSelect" class="selectpicker show-tick" onchange="addLandDeterData();">
														<option value="none">None</option>
														<option value="wdpa" '.((strpos($projectValues[0]["conditions"], 'wdpa') !== false)?'selected="selected"':"").'>WDPA</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondEnviroTwoData" href="#climateDeterData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Climate Determinants</b>
												</a>
												<div id="climateDeterData" class="collapse">
													<select id="climateDeterSelect" class="selectpicker show-tick" onchange="addClimateDeterData();">
														<option value="none">None</option>
														<option value="drought" '.((strpos($projectValues[0]["conditions"], 'drought') !== false)?'selected="selected"':"").'>Drought Outlook</option>
														<option value="droughtmonitor" '.((strpos($projectValues[0]["conditions"], 'droughtmonitor') !== false)?'selected="selected"':"").'>Drought Monitor</option>
													</select>
													<div id="droughtTimeSeries">
														<h5><b> Drought Time-Series Data: </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbDroughtTS" onchange="activateDroughtTS($(this).prop(\'checked\')?\'dull\':\'active\')">
															<label class="onoffswitch-label" for="cbDroughtTS"></label>
														</div>
														<div id="divDroughtDate">
															<h5><b> Select date: </b></h5>
															<input type="text" class="form-control">
														</div>
													</div>
													<div id="droughtOutlook">
														<h5><b> Drought Outlook Time-Series Data: </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbDroughtOutlookTS" onchange="activateDroughtOutlookTS($(this).prop(\'checked\')?\'dull\':\'active\')">
															<label class="onoffswitch-label" for="cbDroughtOutlookTS"></label>
														</div>
														<div id="divDroughtOutlookDate">
															<h5><b> Select date: </b></h5>
															<input type="text" class="form-control">
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondSolidbiomassDataEnviro" href="#solidbiomassData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Solid Biomass</b>
												</a>
												<div id="solidbiomassData" class="collapse">
													<select id="solidbiomassSelect" class="selectpicker show-tick" onchange="addSolidbiomassData();">
														<option value="none">None</option>
														<option value="crops" '.((strpos($projectValues[0]["conditions"], 'crops') !== false)?'selected="selected"':"").'>Crop</option>
														<option value="urbanwood" '.((strpos($projectValues[0]["conditions"], 'urbanwood') !== false)?'selected="selected"':"").'>Urban Wood</option>
														<option value="secmill" '.((strpos($projectValues[0]["conditions"], 'secmill') !== false)?'selected="selected"':"").'>Sect Mill</option>
														<option value="forest" '.((strpos($projectValues[0]["conditions"], 'forest') !== false)?'selected="selected"':"").'>Forest</option>
														<option value="primmill" '.((strpos($projectValues[0]["conditions"], 'primmill') !== false)?'selected="selected"':"").'>Prim Mill</option>
														<option value="total" '.((strpos($projectValues[0]["conditions"], 'total') !== false)?'selected="selected"':"").'>Total</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondNoise" href="#noiseDataDeter" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Noise Pollution</b>
												</a>
												<div id="noiseDataDeter" class="collapse">
													<select id="noiseSelectDeter" class="selectpicker show-tick" onchange="addNoiseDeterData();">
														<option value="none">None</option>
														<option value="AviationNoise">Aviation Noise</option>
														<option value="RoadNoise">Road Noise</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
												<div id="divTransEnviroTwo" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsEnviroTwo" class="selectpicker show-tick" onchange="changePaletteEnviroTwo();">
															<option value="standard">Standard</option>
															<option value="divergent">Divergent</option>
														</select>
														<table id="enviroTwoCohortsOpts" class="tableConds">
															<tbody>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviroTwo" id="cbfirstThemeEnviroTwo">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																	</td>
																</tr>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviroTwo" id="cbsecondThemeEnviroTwo" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																	</td>
																</tr>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviroTwo" id="cbthirdThemeEnviroTwo">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																	</td>
																</tr>
															</tbody>
														</table>
														<table class="tableConds">
															<tbody>
																<tr class="tdTopBorder">
																	<td>
																		<h5 id="flipEnviroTwoCohorts"><b> Flip Cohorts </b></h5>
																		<div class="onoffswitch">
																			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsEnviroTwo" onchange="flipCohortsEnviro($(this).prop(\'checked\')?\'on\':\'off\')">
																			<label class="onoffswitch-label" for="flipCohortsEnviroTwo"></label>
																		</div>
																	</td>
																	<td id="framesEnviroTwo">
																		<h5><b> Frames </b></h5>
																		<div class="onoffswitch">
																			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesEnviroTwo" onchange="changeFramesEnviro($(this).prop(\'checked\')?\'on\':\'off\')">
																			<label class="onoffswitch-label" for="switchFramesEnviroTwo"></label>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<div id="divSelFramesEnviroTwo">
															<h5> <b> Frame Color: </b> </h5>
															<select id="selFramesEnviroTwo" class="selectpicker show-tick" onchange="setFramesEnviro();">
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
								</div>
							</div>';
				}
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>