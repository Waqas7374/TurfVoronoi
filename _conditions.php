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
				$sql = "SELECT conditionspane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$radiusValues = $stmt->fetchAll();
				
				if($radiusValues[0]["conditionspane"] == 1)
				{
					$sqlFour;
					if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {						
						$sqlFour = "SELECT `user_id`,`conditions`,`subconditions`,`conditionstrans` FROM project where title <> '' and id=" . $_SESSION["project_id"];
					}
					else{						
						$sqlFour = "SELECT `user_id`,`conditions`,`subconditions`,`conditionstrans` FROM project where title = '' and user_id=" . $_SESSION["user_id"];
					}

					$stmtFour = $DB->prepare($sqlFour);
					$stmtFour->execute();
					$projectValues = $stmtFour->fetchAll();
					if((strpos($projectValues[0]["conditions"], 'pop2010') !== false) || (strpos($projectValues[0]["conditions"], 'ohu2010') !== false) || (strpos($projectValues[0]["conditions"], 'povertyrat') !== false) || (strpos($projectValues[0]["conditions"], 'tractkids') !== false) || (strpos($projectValues[0]["conditions"], 'tractsenio') !== false) || (strpos($projectValues[0]["conditions"], 'tractwhite') !== false) || (strpos($projectValues[0]["conditions"], 'tractblack') !== false) || (strpos($projectValues[0]["conditions"], 'tractasian') !== false) || (strpos($projectValues[0]["conditions"], 'tracthispa') !== false))
					{
						echo '<script>';
						echo 'var opacitySocial = ' . $projectValues[0]["conditionstrans"] . ';';
						echo '</script>';
					}
					else if((strpos($projectValues[0]["conditions"], 'ffr') !== false) || (strpos($projectValues[0]["conditions"], 'ffrchange') !== false) || (strpos($projectValues[0]["conditions"], 'ffrpopu') !== false) || (strpos($projectValues[0]["conditions"], 'ffrpopuchange') !== false) || (strpos($projectValues[0]["conditions"], 'fsr') !== false) || (strpos($projectValues[0]["conditions"], 'fsrchange') !== false) || (strpos($projectValues[0]["conditions"], 'fsrpopu') !== false) || (strpos($projectValues[0]["conditions"], 'fsrpopuchange') !== false) || (strpos($projectValues[0]["conditions"], 'farmermarket') !== false) || (strpos($projectValues[0]["conditions"], 'farmermarketchange') !== false) || (strpos($projectValues[0]["conditions"], 'dsf') !== false) || (strpos($projectValues[0]["conditions"], 'dsfchange') !== false) || (strpos($projectValues[0]["conditions"], 'naicsap') !== false) || (strpos($projectValues[0]["conditions"], 'naicsest') !== false) || (strpos($projectValues[0]["conditions"], 'cattleTop') !== false) || (strpos($projectValues[0]["conditions"], 'cattleNinty') !== false) || (strpos($projectValues[0]["conditions"], 'ethanol') !== false) || (strpos($projectValues[0]["conditions"], '--') !== false) || (strpos($projectValues[0]["conditions"], '11') !== false) || (strpos($projectValues[0]["conditions"], '21') !== false) || (strpos($projectValues[0]["conditions"], '22') !== false) || (strpos($projectValues[0]["conditions"], '23') !== false) || (strpos($projectValues[0]["conditions"], '31-33') !== false) || (strpos($projectValues[0]["conditions"], '42') !== false) || (strpos($projectValues[0]["conditions"], '44-45') !== false) || (strpos($projectValues[0]["conditions"], '48-49') !== false) || (strpos($projectValues[0]["conditions"], '51') !== false) || (strpos($projectValues[0]["conditions"], '52') !== false) || (strpos($projectValues[0]["conditions"], '53') !== false) || (strpos($projectValues[0]["conditions"], '54') !== false) || (strpos($projectValues[0]["conditions"], '55') !== false) || (strpos($projectValues[0]["conditions"], '56') !== false) || (strpos($projectValues[0]["conditions"], '61') !== false) || (strpos($projectValues[0]["conditions"], '62') !== false) || (strpos($projectValues[0]["conditions"], '71') !== false) || (strpos($projectValues[0]["conditions"], '72') !== false) || (strpos($projectValues[0]["conditions"], '81') !== false) || (strpos($projectValues[0]["conditions"], 'annual_payroll') !== false) || (strpos($projectValues[0]["conditions"], 'employment') !== false) || (strpos($projectValues[0]["conditions"], 'num_establishments') !== false) || (strpos($projectValues[0]["conditions"], 'bankzip2012') !== false) || (strpos($projectValues[0]["conditions"], 'bankzip2016') !== false) || (strpos($projectValues[0]["conditions"], 'bankzip2017') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyDeposit2012') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyDeposit2016') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyDeposit2017') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyAsset2012') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyAsset2016') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyAsset2017') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountydepchangeone') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountydepchangeoneper') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountydepchangefive') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountydepchangefiveper') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyasschangeone') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyasschangeoneper') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyasschangefive') !== false) || (strpos($projectValues[0]["conditions"], 'bankcountyasschangefiveper') !== false) || (strpos($projectValues[0]["conditions"], 'medianfami') !== false) || (strpos($projectValues[0]["conditions"], 'tractlowi') !== false) || (strpos($projectValues[0]["conditions"], 'tractsnap') !== false) || (strpos($projectValues[0]["conditions"], 'ptrr') !== false) || (strpos($projectValues[0]["conditions"], 'residentialvacancyrates') !== false) || (strpos($projectValues[0]["conditions"], 'urbanrural') !== false) || (strpos($projectValues[0]["conditions"], 'economictype') !== false))
					{
						echo '<script>';
						echo 'var opacityEcono = ' . $projectValues[0]["conditionstrans"] . ';';
						echo '</script>';
					}
					else if((strpos($projectValues[0]["conditions"], 'lapop1') !== false) || (strpos($projectValues[0]["conditions"], 'lapop1shar') !== false) || (strpos($projectValues[0]["conditions"], 'lalowi1') !== false) || (strpos($projectValues[0]["conditions"], 'lalowi1sha') !== false) || (strpos($projectValues[0]["conditions"], 'lapop10') !== false) || (strpos($projectValues[0]["conditions"], 'lapop10sha') !== false) || (strpos($projectValues[0]["conditions"], 'lalowi10') !== false) || (strpos($projectValues[0]["conditions"], 'lalowi10sh') !== false) || (strpos($projectValues[0]["conditions"], 'eqi') !== false) || (strpos($projectValues[0]["conditions"], 'drought') !== false) || (strpos($projectValues[0]["conditions"], 'droughtmonitor') !== false) || (strpos($projectValues[0]["conditions"], 'padus') !== false) || (strpos($projectValues[0]["conditions"], 'wdpa') !== false))
					{
						echo '<script>';
						echo 'var opacityEnviro = ' . $projectValues[0]["conditionstrans"] . ';';
						echo '</script>';
					}
					
					echo '<!-- sidebar Conditions -->
							<div id="mainDivConditions" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll" style="display:none;" >
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#socialTab">Social</a></li>
										<li><a data-toggle="tab" href="#economicTab">Economic</a></li>
										<li><a data-toggle="tab" href="#environmentalTab">Environmental</a></li>
									</ul>

									<div class="tab-content">
										<div id="socialTab" class="tab-pane fade in active">
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondSocial" href="#socialData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Social Datasets</b>
												</a>
												<div id="socialData" class="collapse">
													<select id="socialSelect" class="selectpicker show-tick" onchange="addSocialData();">
														<option value="none">None</option>
														<option value="pop2010" '.((strpos($projectValues[0]["conditions"], 'pop2010') !== false)?'selected="selected"':"").'>POP2010</option>
														<option value="ohu2010" '.((strpos($projectValues[0]["conditions"], 'ohu2010') !== false)?'selected="selected"':"").'>OHU2010</option>
														<option value="povertyrat" '.((strpos($projectValues[0]["conditions"], 'povertyrat') !== false)?'selected="selected"':"").'>Poverty Rate</option>
														<option value="tractkids" '.((strpos($projectValues[0]["conditions"], 'tractkids') !== false)?'selected="selected"':"").'>Children (#s)</option>
														<option value="tractsenio" '.((strpos($projectValues[0]["conditions"], 'tractsenio') !== false)?'selected="selected"':"").'>65+ (#s)</option>
														<option value="tractwhite" '.((strpos($projectValues[0]["conditions"], 'tractwhite') !== false)?'selected="selected"':"").'>Race: White (#s)</option>
														<option value="tractblack" '.((strpos($projectValues[0]["conditions"], 'tractblack') !== false)?'selected="selected"':"").'>Race: Black (#s)</option>
														<option value="tractasian" '.((strpos($projectValues[0]["conditions"], 'tractasian') !== false)?'selected="selected"':"").'>Race: Asian (#s)</option>
														<option value="tracthispa" '.((strpos($projectValues[0]["conditions"], 'tracthispa') !== false)?'selected="selected"':"").'>Race: Latino (#s)</option>
														<option value="households" '.((strpos($projectValues[0]["conditions"], 'households') !== false)?'selected="selected"':"").'>Households</option>
														<option value="avg_hh_size_renters" '.((strpos($projectValues[0]["conditions"], 'avg_hh_size_renters') !== false)?'selected="selected"':"").'>Average number of people in renter households</option>
														<option value="avg_hh_size_owners" '.((strpos($projectValues[0]["conditions"], 'avg_hh_size_owners') !== false)?'selected="selected"':"").'>Average number of people in owner households</option>
														<option value="avg_hh_size" '.((strpos($projectValues[0]["conditions"], 'avg_hh_size') !== false)?'selected="selected"':"").'>Average number of people per household</option>
														<option value="gross_hh_density" '.((strpos($projectValues[0]["conditions"], 'gross_hh_density') !== false)?'selected="selected"':"").'>Number of households per land acre</option>
														<option value="job_density_simple" '.((strpos($projectValues[0]["conditions"], 'job_density_simple') !== false)?'selected="selected"':"").'>Jobs per land acre (simple avg)</option>
														<option value="retail_density_simple" '.((strpos($projectValues[0]["conditions"], 'retail_density_simple') !== false)?'selected="selected"':"").'>Retail jobs per land acre (simple avg)</option>
													</select>
													<div id="divTransSocial" class="condTransDivs">
														<h5> <b> Data Display Options: </b> </h5>
														<ul>
															<select id="cohortOptsSocial" class="selectpicker show-tick" onchange="changePaletteSocial();">
																<option value="standard">Standard</option>
																<option value="divergent">Divergent</option>
															</select>
															<table id="socialCohortsOpts" class="tableConds">
																<tbody>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeSocial" id="cbfirstThemeSocial">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																		</td>
																	</tr>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeSocial" id="cbsecondThemeSocial" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																		</td>
																	</tr>
																	<tr class="tdTopBorder">
																		<td colspan="2">
																			<input type="radio" name="cohortsThemeSocial" id="cbthirdThemeSocial">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
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
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsSocial" onchange="flipCohorts($(this).prop(\'checked\')?\'on\':\'off\')">
																				<label class="onoffswitch-label" for="flipCohortsSocial"></label>
																			</div>
																		</td>
																		<td>
																			<h5><b> Frames </b></h5>
																			<div class="onoffswitch">
																				<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesSocial" onchange="changeFrames($(this).prop(\'checked\')?\'on\':\'off\')">
																				<label class="onoffswitch-label" for="switchFramesSocial"></label>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
															<div id="divSelFramesSocial">
																<h5> <b> Frame Color: </b> </h5>
																<select id="selFramesSocial" class="selectpicker show-tick" onchange="setFrames();">
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

										<div id="economicTab" class="tab-pane fade">
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondEcono" href="#economicData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Datasets</b>
												</a>
												<div id="economicData" class="collapse">
													<select id="economicSelect" class="selectpicker show-tick" onchange="addEconomicData();">
														<option value="none">None</option>
														<option value="ffr" '.((strpos($projectValues[0]["conditions"], 'ffr') !== false)?'selected="selected"':"").'>Fast-food Restaurants, 2014</option>
														<option value="ffrchange" '.((strpos($projectValues[0]["conditions"], 'ffrchange') !== false)?'selected="selected"':"").'>Fast-food restaurants (% change), 2009-14</option>
														<option value="ffrpopu" '.((strpos($projectValues[0]["conditions"], 'ffrpopu') !== false)?'selected="selected"':"").'>Fast-food Restaurants/1,000 pop</option>
														<option value="ffrpopuchange" '.((strpos($projectValues[0]["conditions"], 'ffrpopuchange') !== false)?'selected="selected"':"").'>Fast-food Restaurants/1,000 pop (% change), 2009-14</option>
														<option value="fsr" '.((strpos($projectValues[0]["conditions"], 'fsr') !== false)?'selected="selected"':"").'>Full-service restaurants, 2014</option>
														<option value="fsrchange" '.((strpos($projectValues[0]["conditions"], 'fsrchange') !== false)?'selected="selected"':"").'>Full-service restaurants (% change)</option>
														<option value="fsrpopu" '.((strpos($projectValues[0]["conditions"], 'fsrpopu') !== false)?'selected="selected"':"").'>Full-service restaurants/1,000 pop</option>
														<option value="fsrpopuchange" '.((strpos($projectValues[0]["conditions"], 'fsrpopuchange') !== false)?'selected="selected"':"").'>Full-service restaurants/1,000 pop (% change)</option>
														<option value="farmermarket" '.((strpos($projectValues[0]["conditions"], 'farmermarket') !== false)?'selected="selected"':"").'>Farmer\'s markets, 2016</option>
														<option value="farmermarketchange" '.((strpos($projectValues[0]["conditions"], 'farmermarketchange') !== false)?'selected="selected"':"").'>Farmer\'s markets (% change), 2009-16</option>
														<option value="dsf" '.((strpos($projectValues[0]["conditions"], 'dsf') !== false)?'selected="selected"':"").'>Direct Sales Farms, 2012</option>
														<option value="ngp" '.((strpos($projectValues[0]["conditions"], 'ngp') !== false)?'selected="selected"':"").'>NGP Policies</option>
													</select>
												</div>
											</div>					
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondBusiness" href="#businessData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Business Activity</b>
												</a>
												<div id="businessData" class="collapse">
													<select id="businessActivitySelect" class="selectpicker show-tick" onchange="addBusinessActivityData();">
														<option value="none">None</option>
														<option value="naicsap" '.((strpos($projectValues[0]["conditions"], 'naicsap') !== false)?'selected="selected"':"").'>Agriculture: Annual Payroll</option>
														<option value="naicsest" '.((strpos($projectValues[0]["conditions"], 'naicsest') !== false)?'selected="selected"':"").'>Agriculture: # of Establishments</option>
														<option value="cattleTop" '.((strpos($projectValues[0]["conditions"], 'cattleTop') !== false)?'selected="selected"':"").'>Cattle / Beef (Top 7)</option>
														<option value="cattleNinty" '.((strpos($projectValues[0]["conditions"], 'cattleNinty') !== false)?'selected="selected"':"").'>Cattle / Beef (90%)</option>
														<option value="dataCenters" '.((strpos($projectValues[0]["conditions"], 'dataCenters') !== false)?'selected="selected"':"").'>Data Centers</option>
														<option value="ethanol" '.((strpos($projectValues[0]["conditions"], 'ethanol') !== false)?'selected="selected"':"").'>Ethanol Production</option>
														<option value="manufacturingAP" disabled>Manufacturing: Annual Payroll</option>
														<option value="manufacturingEST" disabled>Manufacturing: # of Establishments</option>
														<option value="vacancy" disabled>Commercial Vacancy Rates</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" href="#graingerData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;NAICS Grainger Groups</b>
												</a>
												<div id="graingerData" class="collapse">
													<select id="graingerSelect" class="selectpicker show-tick" onchange="addGraingerData();">
														<option value="none">None</option>
														<option value="--" '.((strpos($projectValues[0]["conditions"], '--') !== false)?'selected="selected"':"").'>Total</option>
														<option value="11" '.((strpos($projectValues[0]["conditions"], '11') !== false)?'selected="selected"':"").'>Agriculture, Forestry, Fishing and Hunting</option>
														<option value="21" '.((strpos($projectValues[0]["conditions"], '21') !== false)?'selected="selected"':"").'>Mining, Quarrying, and Oil and Gas Extraction</option>
														<option value="22" '.((strpos($projectValues[0]["conditions"], '22') !== false)?'selected="selected"':"").'>Utilities</option>
														<option value="23" '.((strpos($projectValues[0]["conditions"], '23') !== false)?'selected="selected"':"").'>Construction</option>
														<option value="31-33" '.((strpos($projectValues[0]["conditions"], '31-33') !== false)?'selected="selected"':"").'>Manufacturing</option>
														<option value="42" '.((strpos($projectValues[0]["conditions"], '42') !== false)?'selected="selected"':"").'>Wholesale Trade</option>
														<option value="44-45" '.((strpos($projectValues[0]["conditions"], '44-45') !== false)?'selected="selected"':"").'>Retail Trade</option>
														<option value="48-49" '.((strpos($projectValues[0]["conditions"], '48-49') !== false)?'selected="selected"':"").'>Transportation and Warehousing</option>
														<option value="51" '.((strpos($projectValues[0]["conditions"], '51') !== false)?'selected="selected"':"").'>Information</option>
														<option value="52" '.((strpos($projectValues[0]["conditions"], '52') !== false)?'selected="selected"':"").'>Finance and Insurance</option>
														<option value="53" '.((strpos($projectValues[0]["conditions"], '53') !== false)?'selected="selected"':"").'>Real Estate and Rental and Leasing</option>
														<option value="54" '.((strpos($projectValues[0]["conditions"], '54') !== false)?'selected="selected"':"").'>Professional, Scientific, and Technical Services</option>
														<option value="55" '.((strpos($projectValues[0]["conditions"], '55') !== false)?'selected="selected"':"").'>Management of Companies and Enterprises</option>
														<option value="56" '.((strpos($projectValues[0]["conditions"], '56') !== false)?'selected="selected"':"").'>Administrative and Support and Waste Management and Remediation Services</option>
														<option value="61" '.((strpos($projectValues[0]["conditions"], '61') !== false)?'selected="selected"':"").'>Educational Services</option>
														<option value="62" '.((strpos($projectValues[0]["conditions"], '62') !== false)?'selected="selected"':"").'>Health Care and Social Assistance</option>
														<option value="71" '.((strpos($projectValues[0]["conditions"], '71') !== false)?'selected="selected"':"").'>Arts, Entertainment, and Recreation</option>
														<option value="72" '.((strpos($projectValues[0]["conditions"], '72') !== false)?'selected="selected"':"").'>Accommodation and Food Services</option>
														<option value="81" '.((strpos($projectValues[0]["conditions"], '81') !== false)?'selected="selected"':"").'>Other Services (except Public Administration)</option>
													</select>
													<div id="graingerGroupsType">
													<h5> <b> Grainger Groups Filter: </b> </h5>
														<select id="graingerGroupsTypeSelect" class="selectpicker show-tick" onchange="addGraingerGroupsType();">
															<option value="none">None</option>
															<option value="annual_payroll" '.((strpos($projectValues[0]["subconditions"], 'annual_payroll') !== false)?'selected="selected"':"").'>Annual Payroll</option>
															<option value="employment" '.((strpos($projectValues[0]["subconditions"], 'employment') !== false)?'selected="selected"':"").'>Employment</option>
															<option value="num_establishments" '.((strpos($projectValues[0]["subconditions"], 'num_establishments') !== false)?'selected="selected"':"").'>Number of Establishments</option>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondBanks" href="#banksData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Banks Activity</b>
												</a>
												<div id="banksData" class="collapse">
													<select id="banksActivitySelect" class="selectpicker show-tick" onchange="addBanksActivityData();">
														<option value="none">None</option>
														<option value="bankzip2012" '.((strpos($projectValues[0]["conditions"], 'bankzip2012') !== false)?'selected="selected"':"").'>Banks By Zip (2012)</option>
														<option value="bankzip2016" '.((strpos($projectValues[0]["conditions"], 'bankzip2016') !== false)?'selected="selected"':"").'>Banks By Zip (2016)</option>
														<option value="bankzip2017" '.((strpos($projectValues[0]["conditions"], 'bankzip2017') !== false)?'selected="selected"':"").'>Banks By Zip (2017)</option>
														<option value="bankcountyDeposit2012" '.((strpos($projectValues[0]["conditions"], 'bankcountyDeposit2012') !== false)?'selected="selected"':"").'>Banks Deposits By County (2012)</option>
														<option value="bankcountyDeposit2016" '.((strpos($projectValues[0]["conditions"], 'bankcountyDeposit2016') !== false)?'selected="selected"':"").'>Banks Deposits By County (2016)</option>
														<option value="bankcountyDeposit2017" '.((strpos($projectValues[0]["conditions"], 'bankcountyDeposit2017') !== false)?'selected="selected"':"").'>Banks Deposits By County (2017)</option>
														<option value="bankcountyAsset2012" '.((strpos($projectValues[0]["conditions"], 'bankcountyAsset2012') !== false)?'selected="selected"':"").'>Banks Assets By County (2012)</option>
														<option value="bankcountyAsset2016" '.((strpos($projectValues[0]["conditions"], 'bankcountyAsset2016') !== false)?'selected="selected"':"").'>Banks Assets By County (2016)</option>
														<option value="bankcountyAsset2017" '.((strpos($projectValues[0]["conditions"], 'bankcountyAsset2017') !== false)?'selected="selected"':"").'>Banks Assets By County (2017)</option>
														<option value="bankcountydepchangeone" '.((strpos($projectValues[0]["conditions"], 'bankcountydepchangeone') !== false)?'selected="selected"':"").'>Bank Deposits (Counties) One Year Change</option>
														<option value="bankcountydepchangeoneper" '.((strpos($projectValues[0]["conditions"], 'bankcountydepchangeoneper') !== false)?'selected="selected"':"").'>Bank Deposits (Counties) One Year % Change</option>
														<option value="bankcountydepchangefive" '.((strpos($projectValues[0]["conditions"], 'bankcountydepchangefive') !== false)?'selected="selected"':"").'>Bank Deposits (Counties) Five Year Change</option>
														<option value="bankcountydepchangefiveper" '.((strpos($projectValues[0]["conditions"], 'bankcountydepchangefiveper') !== false)?'selected="selected"':"").'>Bank Deposits (Counties) Five Year % Change</option>
														<option value="bankcountyasschangeone" '.((strpos($projectValues[0]["conditions"], 'bankcountyasschangeone') !== false)?'selected="selected"':"").'>Bank Assets (Counties) One Year Change</option>
														<option value="bankcountyasschangeoneper" '.((strpos($projectValues[0]["conditions"], 'bankcountyasschangeoneper') !== false)?'selected="selected"':"").'>Bank Assets (Counties) One Year % Change</option>
														<option value="bankcountyasschangefive" '.((strpos($projectValues[0]["conditions"], 'bankcountyasschangefive') !== false)?'selected="selected"':"").'>Bank Assets (Counties) Five Year Change</option>
														<option value="bankcountyasschangefiveper" '.((strpos($projectValues[0]["conditions"], 'bankcountyasschangefiveper') !== false)?'selected="selected"':"").'>Bank Assets (Counties) Five Year % Change</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondResidents" href="#residentsData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Residents (People)</b>
												</a>
												<div id="residentsData" class="collapse">
													<select id="residentsSelect" class="selectpicker show-tick" onchange="addResidentsData();">
														<option value="none">None</option>
														<option value="medianfami" '.((strpos($projectValues[0]["conditions"], 'medianfami') !== false)?'selected="selected"':"").'>Median Family Income</option>
														<option value="tractlowi" '.((strpos($projectValues[0]["conditions"], 'tractlowi') !== false)?'selected="selected"':"").'>Low Income (#s)</option>
														<option value="tractsnap" '.((strpos($projectValues[0]["conditions"], 'tractsnap') !== false)?'selected="selected"':"").'>Households w/SNAP</option>
														<option value="ptrr" '.((strpos($projectValues[0]["conditions"], 'ptrr') !== false)?'selected="selected"':"").'>Price to Rent Ratio</option>
														<option value="residentialvacancyrates" disabled>Residential Vacancy Rates</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondKH" href="#khData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;KH</b>
												</a>
												<div id="khData" class="collapse">
													<select id="khSelect" class="selectpicker show-tick" onchange="addKHData();">
														<option value="none">None</option>
														<option value="emipc">EMIPC</option>
														<option value="emipcstate">EMIPC - State</option>
														<option value="emitl">EMITL</option>
														<option value="emitlstate">EMITL - State</option>
														<option value="fdipc">FDIPC</option>
														<option value="fdipcstate">FDIPC - State</option>
														<option value="ftpc">FTPC</option>
														<option value="ftpcstate">FTPC - State</option>
														<option value="ihpc">IHPC</option>
														<option value="ihpcstate">IHPC - State</option>
														<option value="ihtl">IHTL</option>
														<option value="ihtlstate">IHTL - State</option>
														<option value="mtpc">MTPC</option>
														<option value="mtpcstate">MTPC - State</option>
														<option value="mttl">MTTL</option>
														<option value="mttlstate">MTTL - State</option>
														<option value="potbellyfranchise">Potbelly Franchise Locations</option>
														<option value="ctxstate">CTX - State</option>
														<option value="emx">EMX</option>
														<option value="emxstate">EMX - State</option>
														<option value="fdx">FDX</option>
														<option value="fdxstate">FDX - State</option>
														<option value="mhbx">MHBX</option>
														<option value="mhbxstate">MHBX - State</option>
														<option value="mtx">MTX</option>
														<option value="mtxstate">MTX - State</option>
														<option value="tlx">TLX</option>
														<option value="tlxstate">TLX - State</option>
														<option value="wdx">WDX</option>
														<option value="wdxstate">WDX - State</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondHousing" href="#housingData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Housing</b>
												</a>
												<div id="housingData" class="collapse">
													<select id="housingSelect" class="selectpicker show-tick" onchange="addHousingData();">
														<option value="none">None</option>
														<option value="owner_occupied_hu">Number of owner-occupied housing units</option>
														<option value="renter_occupied_hu">Number of renter-occupied housing units</option>
														<option value="pct_renters">Percent of rental housing units</option>
														<option value="pct_renter_occupied_hu">Percent of households in renter-occupied housing units</option>
														<option value="pct_hu_1_detached">Percent of single family detached housing units</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div id="divTransEconomic" class="condTransDivs">
												<h5> <b> Data Display Options: </b> </h5>
												<ul>
													<select id="cohortOptsEcono" class="selectpicker show-tick" onchange="changePaletteEcono();">
														<option value="standard">Standard</option>
														<option value="divergent">Divergent</option>
													</select>
													<table id="econoCohortsOpts" class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEcono" id="cbfirstThemeEcono">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEcono" id="cbsecondThemeEcono" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeEcono" id="cbthirdThemeEcono">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																</td>
															</tr>
														</tbody>
													</table>
													<table class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td id="flipEco">
																	<h5 id="flipEconoCohorts"><b> Flip Cohorts </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsEcono" onchange="flipCohorts($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="flipCohortsEcono"></label>
																	</div>
																</td>
																<td id="framesEco">
																	<h5><b> Frames </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesEcono" onchange="changeFrames($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="switchFramesEcono"></label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<div id="divSelFramesEcono">
														<h5> <b> Frame Color: </b> </h5>
														<select id="selFramesEcono" class="selectpicker show-tick" onchange="setFrames();">
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

										<div id="environmentalTab" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondEnviro" href="#enviroData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Environmental Datasets</b>
												</a>
												<div id="enviroData" class="collapse">
													<select id="enviroSelect" class="selectpicker show-tick" onchange="addEnviroData();">
														<option value="none">None</option>
														<option value="aquifer" '.((strpos($projectValues[0]["conditions"], 'aquifer') !== false)?'selected="selected"':"").'>Principal Aquifers</option>
														<option value="alluvialandglacial" '.((strpos($projectValues[0]["conditions"], 'alluvialandglacial') !== false)?'selected="selected"':"").'> Alluvial & Glacial Aquifers</option>
														<option value="majorsoilresource" '.((strpos($projectValues[0]["conditions"], 'majorsoilresource') !== false)?'selected="selected"':"").'>Major Soil Resource Areas</option>
														<option value="eqi" '.((strpos($projectValues[0]["conditions"], 'eqi') !== false)?'selected="selected"':"").'>EQI</option>
													</select>
													<div id="aquifersType">
														<h5> <b> Principal Aquifers Filter: </b> </h5>
														<select id="aquifersTypeSelect" multiple data-actions-box="true" class="selectpicker show-tick" data-selected-text-format="count" onchange="filterAquifers();">
															<optgroup label="Unsolidated and semiconsolidated sand and gravel">
																<option value="1" selected>Basin and Range basin-fill</option>
																<option value="5" selected>California Coastal Basin</option>
																<option value="10" selected>Central Valley</option>
																<option value="18" selected>Coastal lowlands</option>
																<option value="4" selected>Columbia Plateau basin-fill</option>
																<option value="11" selected>High Plains</option>																
																<option value="20" selected>Mississippi embayment</option>
																<option value="13" selected>Mississippi River Valley alluvial</option>
																<option value="22" selected>Northern Atlantic Coastal Plain</option>
																<option value="9" selected>Northern Rocky Mountains</option>
																<option value="3" selected>Pacific Northwest basin-fill</option>
																<option value="12" selected>Pecos River Basin alluvial</option>
																<option value="7" selected>Puget Sound</option>
																<option value="2" selected>Rio Grande</option>
																<option value="14" selected>Seymour</option>
																<option value="6" selected>Snake River Plain basin-fill</option>
																<option value="21" selected>Southeastern Coastal Plain</option>
																<option value="15" selected>Surficial</option>
																<option value="19" selected>Texas coastal uplands</option>
																<option value="8" selected>Willamette Lowland basin-fill</option>
															</optgroup>
															<optgroup label="Sandstone">
																<option value="28" selected>Ada-Vamoosa</option>
																<option value="33" selected>Cambrian-Ordovician</option>
																<option value="27" selected>Central Oklahoma</option>
																<option value="23" selected>Colorado Plateaus</option>
																<option value="24" selected>Denver Basin</option>
																<option value="29" selected>Early Mesozoic basin</option>
																<option value="34" selected>Jacobsville</option>
																<option value="25" selected>Lower Cretaceous</option>
																<option value="35" selected>Lower Tertiary</option>
																<option value="32" selected>Marshall</option>
																<option value="30" selected>New York sandstone</option>
																<option value="31" selected>Pennsylvanian</option>
																<option value="26" selected>Rush Springs</option>
																<option value="36" selected>Upper Cretaceous</option>
																<option value="37" selected>Upper Tertiary</option>
															</optgroup>
															<optgroup label="Sandstone and carbonate-rock">
																<option value="38" selected>Edwards-Trinity</option>
																<option value="40" selected>Mississippian</option>
																<option value="41" selected>Paleozoic</option>
																<option value="39" selected>Valley and Ridge carbonate-rock</option>
															</optgroup>
															<optgroup label="Carbonate-rock">
																<option value="42" selected>Basin and Range carbonate-rock</option>
																<option value="43" selected>Roswell Basin</option>
																<option value="44" selected>Ozark Plateaus</option>
																<option value="45" selected>Blaine</option>
																<option value="46" selected>Arbuckle-Simpson</option>
																<option value="47" selected>Silurian-Devonian</option>
																<option value="48" selected>Ordovician</option>
																<option value="49" selected>Upper carbonate</option>
																<option value="50" selected>Floridan</option>
																<option value="51" selected>Biscayne</option>
																<option value="52" selected>New York and New England carbonate-rock</option>
																<option value="53" selected>Piedmont and Blue Ridge carbonate-rock</option>
																<option value="54" selected>Castle Hayne</option>
															</optgroup>
															<optgroup label="Igneous and metamorphic-rock">
																<option value="57" selected>Southern Nevada volcanic-rock</option>
																<option value="58" selected>Pacific Northwest basaltic-rock</option>
																<option value="59" selected>Snake River Plain basaltic-rock</option>
																<option value="60" selected>Columbia Plateau basaltic-rock</option>
																<option value="62" selected>Piedmont and Blue Ridge crystalline-rock</option>
															</optgroup>
														</select>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondUrbanRuralEnviro" href="#urbanruralFoodAccess" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Urban-Rural</b>
												</a>
												<div id="urbanruralFoodAccess" class="collapse">
													<select id="urbanruralFoodAccessSelect" class="selectpicker show-tick" onchange="addUrbanRuralFoodAccess();">
														<option value="none">None</option>
														<option value="lapop1" '.((strpos($projectValues[0]["conditions"], 'lapop1') !== false)?'selected="selected"':"").'>lapop1</option>
														<option value="lapop1shar" '.((strpos($projectValues[0]["conditions"], 'lapop1shar') !== false)?'selected="selected"':"").'>lapop1share</option>
														<option value="lalowi1" '.((strpos($projectValues[0]["conditions"], 'lalowi1') !== false)?'selected="selected"':"").'>lalowi1</option>
														<option value="lalowi1sha" '.((strpos($projectValues[0]["conditions"], 'lalowi1sha') !== false)?'selected="selected"':"").'>lalowi1share</option>
														<option value="lapop10" '.((strpos($projectValues[0]["conditions"], 'lapop10') !== false)?'selected="selected"':"").'>lapop10</option>
														<option value="lapop10sha" '.((strpos($projectValues[0]["conditions"], 'lapop10sha') !== false)?'selected="selected"':"").'>lapop10share</option>
														<option value="lalowi10" '.((strpos($projectValues[0]["conditions"], 'lalowi10') !== false)?'selected="selected"':"").'>lalowi10</option>
														<option value="lalowi10sh" '.((strpos($projectValues[0]["conditions"], 'lalowi10sh') !== false)?'selected="selected"':"").'>lalowi10share</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondSolarDataEnviro" href="#solarData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Solar Data</b>
												</a>
												<div id="solarData" class="collapse">
													<select id="solardataSelect" class="selectpicker show-tick" onchange="addSolarData();">
														<option value="none">None</option>
														<option value="dni" '.((strpos($projectValues[0]["conditions"], 'dni') !== false)?'selected="selected"':"").'>Avg. Annual Direct Normal Irradiance</option>
														<option value="ghi" '.((strpos($projectValues[0]["conditions"], 'ghi') !== false)?'selected="selected"':"").'>Avg. Annual GHI</option>
														<option value="lalit" '.((strpos($projectValues[0]["conditions"], 'lalit') !== false)?'selected="selected"':"").'>Avg. Annual Tilt at Lat</option>
														<option value="phm" '.((strpos($projectValues[0]["conditions"], 'phm') !== false)?'selected="selected"':"").'>PHM</option>
														<option value="phmzip" '.((strpos($projectValues[0]["conditions"], 'phmzip') !== false)?'selected="selected"':"").'>PHM By Zip</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refCondBiodiversityDataEnviro" href="#biodiversityData" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Biodiversity Data</b>
												</a>
												<div id="biodiversityData" class="collapse">
													<select id="biodiversitydataSelect" class="selectpicker show-tick" onchange="addBiodiversityData();">
														<option value="none">None</option>
														<option value="birds" '.((strpos($projectValues[0]["conditions"], 'birds') !== false)?'selected="selected"':"").'>Birds Total Richness</option>
														<option value="fish" '.((strpos($projectValues[0]["conditions"], 'fish') !== false)?'selected="selected"':"").'>Fish Total Richness</option>
														<option value="mammals" '.((strpos($projectValues[0]["conditions"], 'mammals') !== false)?'selected="selected"':"").'>Mammals Total Richness</option>
														<option value="reptiles" '.((strpos($projectValues[0]["conditions"], 'reptiles') !== false)?'selected="selected"':"").'>Reptiles Total Richness</option>
														<option value="trees" '.((strpos($projectValues[0]["conditions"], 'trees') !== false)?'selected="selected"':"").'>Trees Total Richness</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div id="divTransEnviro" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsEnviro" class="selectpicker show-tick" onchange="changePaletteEnviro();">
															<option value="standard">Standard</option>
															<option value="divergent">Divergent</option>
														</select>
														<table id="enviroCohortsOpts" class="tableConds">
															<tbody>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviro" id="cbfirstThemeEnviro">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																	</td>
																</tr>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviro" id="cbsecondThemeEnviro" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																	</td>
																</tr>
																<tr class="tdTopBorder">
																	<td colspan="2">
																		<input type="radio" name="cohortsThemeEnviro" id="cbthirdThemeEnviro">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																	</td>
																</tr>
															</tbody>
														</table>
														<table class="tableConds">
															<tbody>
																<tr class="tdTopBorder">
																	<td>
																		<h5 id="flipEnviroCohorts"><b> Flip Cohorts </b></h5>
																		<div class="onoffswitch">
																			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsEnviro" onchange="flipCohorts($(this).prop(\'checked\')?\'on\':\'off\')">
																			<label class="onoffswitch-label" for="flipCohortsEnviro"></label>
																		</div>
																	</td>
																	<td id="framesEnviro">
																		<h5><b> Frames </b></h5>
																		<div class="onoffswitch">
																			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesEnviro" onchange="changeFrames($(this).prop(\'checked\')?\'on\':\'off\')">
																			<label class="onoffswitch-label" for="switchFramesEnviro"></label>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<div id="divSelFramesEnviro">
															<h5> <b> Frame Color: </b> </h5>
															<select id="selFramesEnviro" class="selectpicker show-tick" onchange="setFrames();">
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
								</div>
							</div>';
				}
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>