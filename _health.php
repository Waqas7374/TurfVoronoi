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
				$sql = "SELECT healthcarepane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$radiusValues = $stmt->fetchAll();
				
				if($radiusValues[0]["healthcarepane"] == 1)
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
							<div id="mainDivHealth" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll" style="display:none;" >
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#tabHealthBoundary">Boundaries</a></li>
										<li><a data-toggle="tab" href="#tabHealthData">Data</a></li>
										<li><a data-toggle="tab" href="#tabHealthCond">Conditions</a></li>
									</ul>

									<div class="tab-content">
										<div id="tabHealthBoundary" class="tab-pane fade in active">
										</div>
										
										<div id="tabHealthData" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" href="#divHospitals" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Hospitals</b>
												</a>
												<div id="divHospitals" class="collapse">
													<select id="selHospitals" class="selectpicker show-tick" onchange="addHospitals();">
														<option value="none" selected>None</option>
														<option value="all">All</option>
														<option value="PSYCH">PSYCH</option>
														<option value="CHILDRENS">CHILDRENS</option>
														<option value="LTACH">LTACH</option>
														<option value="RELIGIOUS/NONMED">RELIGIOUS/NONMED</option>
														<option value="REHAB">REHAB</option>
													</select>
													<div id="logosHospitals">
														<h5><b> Logos/Icons </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsHospitals" onchange="changeLabelsHospitals($(this).prop(\'checked\')?\'active\':\'dull\')" checked>
															<label class="onoffswitch-label" for="switchLabelsHospitals"></label>
														</div>
													</div>
													<div id="divVorHealth">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbVoronoi"></label>
														</div>
														<div id="voroHospitalAreaDiv">
														<h5><b> Select Area Type: </b></h5>
															<select id="voroAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'Hospital\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>
														<div id="voronoiControlsHospital">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPan" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPan">Pan</label>
																</div>
																	
																<div class="tab">
																	<input type="radio" id="chkAdd" name="controls">
																	<label class="lblVorCntrls" for="chkAdd">Add</label>
																</div>
																	
																<div class="tab">
																	<input type="radio" id="chkDel" name="controls">
																	<label class="lblVorCntrls" for="chkDel">Delete</label>
																</div>
																   
																<div class="tab">
																	<input type="radio" id="chkInteractive" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;  border-right: 1px solid #26A69A;" class="lblVorCntrls" for="chkInteractive">Interactive</label>
															   </div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbHospitalVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbHospitalVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorHospitalOpacity"><div id="vorHospitalhandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" href="#healthfacilitiesDiv" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Healthcare Facilities</b>
												</a>
												<div id="healthfacilitiesDiv" class="collapse">
													<select id="healthFacilitiesSel" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count" onchange="addHealthFacilities();">
														<option value="asc">Ambulatory Surgical Centers</option>
														<option value="dermasolo">Derma Solo</option>
														<option value="dermagroup">Derma Group</option>
														<option value="providers">Providers</option>
														<option value="plasticsurgerysolo">Plastic Surgery Solo</option>
														<option value="plasticsurgerygroup">Plastic Surgery Group</option>
														<option value="primary">Primary Care</option>
														<option value="dental">Dental Health</option>
														<option value="mental">Mental Health</option>
													</select>
													<div id="radiusHealth">
														<h5><b> Radius </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchRadiusHealth" onchange="changePrimaryHealth($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="switchRadiusHealth"></label>
														</div>
													</div>
													<div id="divVorHealthFacilities">
														<h5><b> Voronoi </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbHealthFacilitiesVoronoi" onchange="showVorOpts($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
															<label class="onoffswitch-label" for="cbHealthFacilitiesVoronoi"></label>
														</div>
														<div id="voroHealthFacilitiesAreaDiv">
															<h5><b> Select Area Type: </b></h5>
															<select id="voroHealthFacilitiesAreaType" class="selectpicker show-tick" onchange="activateVorArea(\'HealthFacilities\');">
																<option value="none">None</option>
																<option value="CAS">Custom Area Selection</option>
																<option value="state">State Level</option>
																<option value="full">Full Map Extent</option>
															</select>
														</div>
														<div id="voronoiControlsHealthFacilities">
															<h5><b> Voronoi Controls: </b></h5>
															<div class="tabs">
																<div class="tab">
																	<input type="radio" id="chkPanHealthFacilities" name="controls" checked>
																	<label style="border-radius: 10px 0px 0px 10px;" class="lblVorCntrls" for="chkPanHealthFacilities">Pan</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkAddHealthFacilities" name="controls">
																	<label class="lblVorCntrls" for="chkAddHealthFacilities">Add</label>
																</div>
																		
																<div class="tab">
																	<input type="radio" id="chkDelHealthFacilities" name="controls">
																	<label class="lblVorCntrls" for="chkDelHealthFacilities">Delete</label>
																</div>
																	   
																<div class="tab">
																	<input type="radio" id="chkInteractiveHealthFacilities" name="controls">
																	<label style="border-radius: 0px 10px 10px 0px;" class="lblVorCntrls" for="chkInteractiveHealthFacilities">Interactive</label>
																</div>
															</div>
															<div class="bottomBar"></div>
															<h5><b> Voronoi Color Ramp: </b></h5>
															<div class="onoffswitch">
																<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbHealthFacilitiesVoronoiRamp" onchange="handleVorRamp($(this).prop(\'checked\')?\'active\':\'dull\',$(this).attr(\'id\'))">
																<label class="onoffswitch-label" for="cbHealthFacilitiesVoronoiRamp"></label>
															</div>
															<h5>Transparency</h5>
															<div id="iptVorHealthFacilitiesOpacity"><div id="vorHealthFacilitieshandle" class="ui-slider-handle"></div></div>
														</div>
													</div>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>
										
										<div id="tabHealthCond" class="tab-pane fade in">
											<div class="div-hand">
												<a data-toggle="collapse" id="refHealthConditions" href="#divHealthCond" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Conditions</b>
												</a>
												<div id="divHealthCond" class="collapse">
													<select id="selHealthCond" class="selectpicker show-tick" onchange="addHealthConditions();">
														<option value="none" '.((strpos($projectValues[0]["healthconditions"], 'none') !== false)?'selected="selected"':"").'>None</option>
														<option value="healthy" '.((strpos($projectValues[0]["healthconditions"], 'healthy') !== false)?'selected="selected"':"").'>All</option>
														<option value="1" '.((strpos($projectValues[0]["healthconditions"], '1') !== false)?'selected="selected"':"").'>Recreational / THC</option>
														<option value="2" '.((strpos($projectValues[0]["healthconditions"], '2') !== false)?'selected="selected"':"").'>Medical / CBD</option>
														<option value="3" '.((strpos($projectValues[0]["healthconditions"], '3') !== false)?'selected="selected"':"").'>Restricted CBD</option>
														<option value="4" '.((strpos($projectValues[0]["healthconditions"], '4') !== false)?'selected="selected"':"").'>No Legal Use</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refMUAP" href="#divMUAP" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Medically Underserved Areas</b>
												</a>
												<div id="divMUAP" class="collapse">
													<select id="selMUAP" class="selectpicker show-tick" onchange="addMUAPConditions();">
														<option value="none" '.((strpos($projectValues[0]["healthconditions"], 'none') !== false)?'selected="selected"':"").'>None</option>
														<option value="muarscivpp" '.((strpos($projectValues[0]["healthconditions"], 'healthy') !== false)?'selected="selected"':"").'>Total Population in Underserved Area</option>
														<option value="muascore" '.((strpos($projectValues[0]["healthconditions"], '1') !== false)?'selected="selected"':"").'>% Population Age 65+</option>
														<option value="ppage65pct" '.((strpos($projectValues[0]["healthconditions"], '2') !== false)?'selected="selected"':"").'>% Population Below Poverty Level</option>
														<option value="pvt100pnum" '.((strpos($projectValues[0]["healthconditions"], '3') !== false)?'selected="selected"':"").'>Number of Primary Care Physicians / 1K</option>
														<option value="prvd1000pp" '.((strpos($projectValues[0]["healthconditions"], '4') !== false)?'selected="selected"':"").'>Index of Medical Underservice (IMU Score)</option>
													</select>
												</div>
											<div id="divTransMuap" class="condTransDivs">
												<h5> <b> Data Display Options: </b> </h5>
												<ul>
													<select id="cohortOptsMuap" class="selectpicker show-tick" onchange="changePaletteMuap();">
														<option value="standard">Standard</option>
														<option value="divergent">Divergent</option>
													</select>
													<table id="muapCohortsOpts" class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeMuap" id="cbfirstThemeMuap">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeMuap" id="cbsecondThemeMuap" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemeMuap" id="cbthirdThemeMuap">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																</td>
															</tr>
														</tbody>
													</table>
													<table class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td id="flipEco">
																	<h5 id="flipMuapCohorts"><b> Flip Cohorts </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsMuap" onchange="flipCohorts($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="flipCohortsMuap"></label>
																	</div>
																</td>
																<td id="framesEco">
																	<h5><b> Frames </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesMuap" onchange="changeFrames($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="switchFramesMuap"></label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<div id="divSelFramesMuap">
														<h5> <b> Frame Color: </b> </h5>
														<select id="selFramesMuap" class="selectpicker show-tick" onchange="setFrames();">
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