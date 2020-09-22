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
				$sql = "SELECT outputpane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$outputValue = $stmt->fetchAll();

				if($outputValue[0]["outputpane"] == 1)
				{
					$sqlTwo = "SELECT layer,stroke FROM borderpref where user_id=" . $_SESSION["user_id"];
					$stmtTwo = $DB->prepare($sqlTwo);
					$stmtTwo->execute();
					$borderValues = $stmtTwo->fetchAll();
					
					$sqlThree = "SELECT layer,stroke FROM radiuspref where user_id=" . $_SESSION["user_id"];
					$stmtThree = $DB->prepare($sqlThree);
					$stmtThree->execute();
					$radiusValues = $stmtThree->fetchAll();
					$sqlFour;
					if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {						
						$sqlFour = "SELECT `user_id`,`latest`,`selectedIcon`,`selectedRadius` FROM project where id=" . $_SESSION["project_id"];
					}
					else{						
						$sqlFour = "SELECT `user_id`,`latest`,`selectedIcon` FROM project where title = '' and user_id=" . $_SESSION["user_id"];
					}
					
					$stmtFour = $DB->prepare($sqlFour);
					$stmtFour->execute();
					$projectValues = $stmtFour->fetchAll();
					
					echo '<div id="mainDivOutput" class="sidebar right sidebar-size-4 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll">
							<div class="container-fluid">
								<ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#boundariesTab">Boundaries</a></li>
									<li><a data-toggle="tab" href="#reportsTab">Reports</a></li>
									<li><a data-toggle="tab" href="#prefTab">Preferences</a></li>
								</ul>
								<div class="tab-content">
									<div id="boundariesTab" class="tab-pane fade in active">
										<div class="div-hand">
											<a data-toggle="collapse" href="#adBound" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Administrative Boundaries</b>
											</a>
											<div id="adBound" class="collapse">
												<select id="selADBoundaries" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="adboundaries();">
													<option value="asb">Agency Service Bounds</option>
													<option value="ag">AG Districts</option>
													<option value="hrr">Hospital Referral Regions (HRRs)</option>
													<option value="hsa">Hospital Service Areas (HSAs)</option>
													<option value="mpo">Metropolitan Planning Organization Boundaries</option>
													<option value="pcsa">Primary Care Service Areas (PCSAs)</option>
													<option value="ccd">Primary School Districts</option>
													<option value="scsd">School Districts</option>
													<option value="str_coverage">STR Coverage</option>
													<option value="zips">Zip Codes</option>
												</select>
												<div id="schoolsTrans" class="condTransDivs">
													<h5> <b> Schools Display Options: </b> </h5>
													<ul>
														<table class="tableConds">
															<tbody>
																<tr class="tdTopBorder">
																	<td id="framesSchools">
																		<h5><b> Frames </b></h5>
																		<div class="onoffswitch">
																			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesSchools" onchange="changeFramesSchools($(this).prop(\'checked\')?\'on\':\'off\')" checked>
																			<label class="onoffswitch-label" for="switchFramesSchools"></label>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
														<div id="divSelFramesSchool">
															<h5> <b> Frame Color: </b> </h5>
															<select id="selFramesSchool" class="selectpicker show-tick" onchange="setFramesSchool();">
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
												<div id="divLabelsAD" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsAD" class="selectpicker show-tick" onchange="changePaletteAD();">
															<option value="flat">Flat Color</option>
															<option value="topo">Topo Color</option>
														</select>
													</ul>
													<h5><b> Labels </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsAD" onchange="changeLabelsAD($(this).prop(\'checked\')?\'on\':\'off\')" checked>
														<label class="onoffswitch-label" for="switchLabelsAD"></label>
													</div>
													<h5><b> Overlay Color </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOCAD" onchange="changeOCAD($(this).prop(\'checked\')?\'on\':\'off\')">
														<label class="onoffswitch-label" for="switchOCAD"></label>
													</div>
													<div id="divOCAD">
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	<h5><b> Masking Color: </b></h5>
																	<input type="text" id="maskingFilterAD" value="rgba(0,0,0,0.4)" data-color-format="hex">
																</li>
																<li>
																	<h5><b> Pattern: </b></h5>
																	<div id="selectAD" class="selectPattern"></div>
																	<div id="pselectAD" class="pselectPattern"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="sizeAD" type="number" min=0 value=5 onchange="refreshAD()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacingAD" type="number" min=0 value=10 onchange="refreshAD()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="angleAD" type="number" value=0 onchange="refreshAD()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offsetAD" type="number" value=0 onchange="refreshAD()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scaleAD" type="number" value=1 onchange="refreshAD()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="colorAD" onchange="refreshAD()">
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
																	<select id="bgAD" onchange="refreshAD()">
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
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#ecBound" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Economic Boundaries</b>
											</a>
											<div id="ecBound" class="collapse">
												<select id="selECBoundaries" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="ecboundaries();">
													<option value="active_coverage">Active Coverage</option>
													<option value="reduced_coverage">Reduced Coverage</option>
													<option value="total_coverage">Total Coverage</option>
													<option value="bea10">BEA10</option>
													<option value="cbsa10">CBSA10</option>
													<option value="commuters_regions">Commuter Regions</option>
													<option value="consumermarketboundaries">Consumer Market</option>
													<option value="ers10">ERS10</option>
													<option value="ers10rep">ERS10REP</option>
													<option value="regions">Geographic (Regions)</option>
													<option value="megaregions">Megaregion</option>
													<option value="pea10">PEA10</option>
													<option value="tp10">TP10</option>
													<option value="tp10metro">TP10METRO</option>
													<option value="tp10micro">TP10MICRO</option>
													<option value="msas">MSAs</option>
													<option value="cfs_area">Shipments (FAF)</option>
													<option value="employment" disabled>Employment</option>
													<option value="eoz" disabled>Econ. opportunity Zones</option>
												</select>
												<div id="divMSASFilter" class="collapse">
													<h5><b> Select MSAs Type: </b></h5>
													<select id="msasFilter" class="selectpicker show-tick" multiple onchange="filterMSAS();">
														<option value="M1" selected>Metro</option>
														<option value="M2" selected>Micro</option>
													</select>
												</div>
												<div id="boundaryRegions" class="collapse">
													<h5><b> Select Region Type: </b></h5>
													<select id="selRegionBoundary" class="selectpicker show-tick" onchange="selectRegionBoundary();">
														<option value="none">None</option>
														<option value="censusfBoundary">Census (4 Regions)</option>
														<option value="censusnBoundary">Census (9 Regions)</option>
														<option value="ariBoundary">ARI</option>
														<option value="beaBoundary">BEA</option>
														<option value="reaBoundary">REA</option>
													</select>
													<div id="divDivisionBoundary">
														<h5><b> Select Division(s): </b></h5>
														<select id="division" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectDivisionRegions();">
														</select>
													</div>
													<div id="divStateBoundary">
														<h5><b> Select State(s): </b></h5>
														<select id="stateRegions" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectStateRegions();">
														</select>
													</div>
													<div id="divCountiesBoundary">
														<h5><b> Select Counties: </b></h5>
														<select id="countyRegions" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="selectCountiesRegions();">
														</select>
													</div>
													<div id="btnBoundaryReset">
														<input type="button" class="btn" value="Reset" onclick="resetSelectionsBoundary();" />
													</div>
												</div>
												<div id="divLabelsEC" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsEC" class="selectpicker show-tick" onchange="changePaletteEC();">
															<option value="flat">Flat Color</option>
															<option value="topo">Topo Color</option>
														</select>
													</ul>
													<h5><b> Labels </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsEC" onchange="changeLabelsEC($(this).prop(\'checked\')?\'on\':\'off\')" checked>
														<label class="onoffswitch-label" for="switchLabelsEC"></label>
													</div>
													<h5><b> Overlay Color </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOCEC" onchange="changeOCEC($(this).prop(\'checked\')?\'on\':\'off\')">
														<label class="onoffswitch-label" for="switchOCEC"></label>
													</div>
													<div id="divOCEC">
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	<h5><b> Masking Color: </b></h5>
																	<input type="text" id="maskingFilterEC" value="rgba(0,0,0,0.4)" data-color-format="hex">
																</li>
																<li>
																	<h5><b> Pattern: </b></h5>
																	<div id="selectEC" class="selectPattern"></div>
																	<div id="pselectEC" class="pselectPattern"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="sizeEC" type="number" min=0 value=5 onchange="refreshEC()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacingEC" type="number" min=0 value=10 onchange="refreshEC()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="angleEC" type="number" value=0 onchange="refreshEC()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offsetEC" type="number" value=0 onchange="refreshEC()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scaleEC" type="number" value=1 onchange="refreshEC()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="colorEC" onchange="refreshEC()">
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
																	<select id="bgEC" onchange="refreshEC()">
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
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#evBound" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Enviromental Boundaries</b>
											</a>
											<div id="evBound" class="collapse">
												<select id="selEVboundaries" class="selectpicker show-tick" multiple data-actions-box="true" onchange="evboundaries();">
													<option value="coastalline">Coastal Line</option>
													<option value="subwatershed">Sub Watershed Boundaries - HUC12</option>
													<option value="watershedsubbasin">Sub Basin Boundaries - HUC8</option>
													<option value="watershedsubregions">Watershed Sub Region Boundaries - HUC4</option>
													<option value="watershedregions">Watershed Region Boundaries - HUC2</option>
												</select>
												<div id="divLabelsEV" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsEV" class="selectpicker show-tick" onchange="changePaletteEV();">
															<option value="flat">Flat Color</option>
															<option value="topo">Topo Color</option>
														</select>
													</ul>
													<h5><b> Labels </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsEV" onchange="changeLabelsEV($(this).prop(\'checked\')?\'on\':\'off\')" checked>
														<label class="onoffswitch-label" for="switchLabelsEV"></label>
													</div>
													<div id="divTextureEV">
														<h5><b> Flip Texture </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbTextureEV" onchange="changeTextureEV($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="cbTextureEV"></label>
														</div>
													</div>
													<h5><b> Overlay Color </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOCEV" onchange="changeOCEV($(this).prop(\'checked\')?\'on\':\'off\')">
														<label class="onoffswitch-label" for="switchOCEV"></label>
													</div>
													<div id="divOCEV">
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	<h5><b> Masking Color: </b></h5>
																	<input type="text" id="maskingFilterEV" value="rgba(0,0,0,0.4)" data-color-format="hex">
																</li>
																<li>
																	<h5><b> Pattern: </b></h5>
																	<div id="selectEV" class="selectPattern"></div>
																	<div id="pselectEV" class="pselectPattern"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="sizeEV" type="number" min=0 value=5 onchange="refreshEV()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacingEV" type="number" min=0 value=10 onchange="refreshEV()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="angleEV" type="number" value=0 onchange="refreshEV()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offsetEV" type="number" value=0 onchange="refreshEV()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scaleEV" type="number" value=1 onchange="refreshEV()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="colorEV" onchange="refreshEV()">
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
																	<select id="bgEV" onchange="refreshEV()">
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
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#pgBound" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Political / Gov. Boundaries</b>
											</a>
											<div id="pgBound" class="collapse">
												<select id="selPGBoundaries" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="pgboundaries();">
													<option value="states">States</option>
													<option value="counties">Counties</option>
													<option value="cities">Cities</option>
													<option value="districts">Political Districts</option>
												</select>
												<div id="divLabelsPG" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsPG" class="selectpicker show-tick" onchange="changePalettePG();">
															<option value="flat">Flat Color</option>
															<option value="topo">Topo Color</option>
														</select>
													</ul>
													<h5><b> Labels </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsPG" onchange="changeLabelsPG($(this).prop(\'checked\')?\'on\':\'off\')" checked>
														<label class="onoffswitch-label" for="switchLabelsPG"></label>
													</div>
													<h5><b> Overlay Color </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOCPG" onchange="changeOCPG($(this).prop(\'checked\')?\'on\':\'off\')">
														<label class="onoffswitch-label" for="switchOCPG"></label>
													</div>
													<div id="divOCPG">
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	<h5><b> Masking Color: </b></h5>
																	<input type="text" id="maskingFilterPG" value="rgba(0,0,0,0.4)" data-color-format="hex">
																</li>
																<li>
																	<h5><b> Pattern: </b></h5>
																	<div id="selectPG" class="selectPattern"></div>
																	<div id="pselectPG" class="pselectPattern"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="sizePG" type="number" min=0 value=5 onchange="refreshPG()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacingPG" type="number" min=0 value=10 onchange="refreshPG()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="anglePG" type="number" value=0 onchange="refreshPG()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offsetPG" type="number" value=0 onchange="refreshPG()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scalePG" type="number" value=1 onchange="refreshPG()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="colorPG" onchange="refreshPG()">
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
																	<select id="bgPG" onchange="refreshPG()">
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
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#soBound" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Social & Other Boundaries</b>
											</a>
											<div id="soBound" class="collapse">
												<select id="selSOboundaries" class="selectpicker show-tick" multiple data-selected-text-format="count" data-actions-box="true" onchange="soboundaries();">
													<option value="cultural_regions">Cultural Regions</option>
													<option value="neighborhoods">Neighborhoods</option>
													<option value="padus">Federal & Protected Land</option>
													<option value="rff">Refrigerated</option>
													<option value="std5">Food Regions (5)</option>
													<option value="std10">Food Regions (10)</option>
													<option value="triballand">Tribal Nation Lands (US)</option>
												</select>
												<div id="divLabelsSO" class="condTransDivs">
													<h5> <b> Data Display Options: </b> </h5>
													<ul>
														<select id="cohortOptsSO" class="selectpicker show-tick" onchange="changePaletteSO();">
															<option value="flat">Flat Color</option>
															<option value="topo">Topo Color</option>
														</select>
													</ul>
													<h5><b> Labels </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsSO" onchange="changeLabelsSO($(this).prop(\'checked\')?\'on\':\'off\')" checked>
														<label class="onoffswitch-label" for="switchLabelsSO"></label>
													</div>
													<div id="divTextureSO">
														<h5><b> Flip Texture </b></h5>
														<div class="onoffswitch">
															<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cbTextureSO" onchange="changeTextureSO($(this).prop(\'checked\')?\'active\':\'dull\')">
															<label class="onoffswitch-label" for="cbTextureSO"></label>
														</div>
													</div>
													<h5><b> Overlay Color </b></h5>
													<div class="onoffswitch">
														<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOCSO" onchange="changeOCSO($(this).prop(\'checked\')?\'on\':\'off\')">
														<label class="onoffswitch-label" for="switchOCSO"></label>
													</div>
													<div id="divOCSO">
														<div class="options" style="min-width:300px;">
															<ul>
																<li>
																	<h5><b> Masking Color: </b></h5>
																	<input type="text" id="maskingFilterSO" value="rgba(0,0,0,0.4)" data-color-format="hex">
																</li>
																<li>
																	<h5><b> Pattern: </b></h5>
																	<div id="selectSO" class="selectPattern"></div>
																	<div id="pselectSO" class="pselectPattern"></div>
																</li>
																<li style="clear:both;">
																	<label>Size:</label>
																	<input id="sizeSO" type="number" min=0 value=5 onchange="refreshSO()" />
																</li>
																<li>
																	<label>Spacing: </label>
																	<input id="spacingSO" type="number" min=0 value=10 onchange="refreshSO()" /> 
																</li>
																<li>
																	<label>Angle: </label>
																	<input id="angleSO" type="number" value=0 onchange="refreshSO()" /> <small>(deg)</small>
																</li>
																<li>
																	<label>Offset: </label>
																	<input id="offsetSO" type="number" value=0 onchange="refreshSO()" />
																</li>
																<li>
																	<label>Scale: </label>
																	<input id="scaleSO" type="number" value=1 onchange="refreshSO()" min=0 step=0.5 />
																</li>
																<li>
																	<label>Color: </label>
																	<select id="colorSO" onchange="refreshSO()">
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
																	<select id="bgSO" onchange="refreshSO()">
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
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
									</div>

									<div id="reportsTab" class="tab-pane fade in">
										<h4>Data for Report:</h4>
										<select id="dataForReport" class="selectpicker show-tick" multiple data-actions-box="true" data-selected-text-format="count">
											<optgroup label="Primary Data">
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/tractor.png\' /> &nbsp;&nbsp;Farmers Market" value="reportFarmer" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/store.png\' /> &nbsp;&nbsp;Grocery Stores" value="reportStores" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/logosIL/marker.png\' /> &nbsp;&nbsp;Stores Logos" value="reportLogos" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/brownfields.png\' /> &nbsp;&nbsp;Brownfields" value="reportBrown" selected></option>
											</optgroup>
											<optgroup label="Own Data">
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/garden.png\' /> &nbsp;&nbsp;Community Gardens" value="reportGardens" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/natural.png\' /> &nbsp;&nbsp;Natural Resources" value="reportNatural" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Destinations" value="reportManMadeDest" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Faith Based" value="reportManMadeFaith" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Government" value="reportManMadeGovt" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Infrastructure" value="reportManMadeInfra" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Public Spaces" value="reportManMadePublic" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/manmade.png\' /> &nbsp;&nbsp;Manmade-Retail Places" value="reportManMadeRetail" selected></option>
											</optgroup>
											<optgroup label="Transportation Data">
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/Airports/medium.png\' /> &nbsp;&nbsp;Airports" value="reportAirports" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/freight.png\' /> &nbsp;&nbsp;Freight Intersects" value="reportFreightInt" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/crossing.png\' /> &nbsp;&nbsp;Interchanges" value="reportInterchanges" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/iana.png\' /> &nbsp;&nbsp;Intermodal Sites" value="reportIana" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/transit.png\' /> &nbsp;&nbsp;Transit Stops" value="reportTransitStop" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/port.png\' /> &nbsp;&nbsp;Port Facility" value="reportPortFacility" selected></option>
											</optgroup>
											<optgroup label="Distribution Centers">
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/amazon.png\' /> &nbsp;&nbsp;Amazon" value="reportAmazon" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/sysco.png\' /> &nbsp;&nbsp;Sysco Foods" value="reportSysco" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/usf.png\' /> &nbsp;&nbsp;US Foods" value="reportUsf" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/fedex.png\' /> &nbsp;&nbsp;Fedex" value="reportFedex" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/dhl.png\' /> &nbsp;&nbsp;DHL" value="reportDhl" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/distributions/ups.png\' /> &nbsp;&nbsp;UPS" value="reportUps" selected></option>
											</optgroup>
											<optgroup label="Retail Datasets">
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/Albertsons/2.png\' /> &nbsp;&nbsp;Albertsons Stores" value="reportAlbertsons" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/culver.png\' /> &nbsp;&nbsp;Culver Stores" value="reportCulver" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/dicks.png\' /> &nbsp;&nbsp;Dicks Sporting Goods" value="reportDicks" selected></option>
												<option data-content="<img height=\'25px\' width=\'40px\' src=\'images/Icons/retail/publix.png\' /> &nbsp;&nbsp;Publix Stores" value="reportPublix" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/shoppingcenter.png\' /> &nbsp;&nbsp;Shopping Centers" value="reportShopping" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/tyson.png\' /> &nbsp;&nbsp;Foodplants & Cooperate Offices" value="reportFoodPlants" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/ranches.png\' /> &nbsp;&nbsp;Ranches & Farms" value="reportFarmRanches" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/traderjoes.png\' /> &nbsp;&nbsp;Trader Joe\'s" value="reportTraderJoes" selected></option>
												<option data-content="<img height=\'25px\' width=\'25px\' src=\'images/Icons/retail/wholefoods.png\' /> &nbsp;&nbsp;Whole Foods" value="reportWholeFoods" selected></option>
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
										<br/>
										<br/>
										<div class="bottomBar"></div>
										<h4>Data to Graph:</h4>
										<select id="dataToGraph" class="selectpicker show-tick" onchange="dataGraph();">
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
										<div id="divZipcode">
											Select the zipcode to view trend:
											<select id="zipcode" class="selectpicker show-tick" data-size="10" data-live-search="true" onchange="getChartForZip();">
											</select>
										</div>
										<div class="bottomBar"></div>
										<div id="ShippingData"  style="padding:1px;">
											<div id="topVolume"><h4>Top Volume Destinations:</h4></div>
											<div id="InteractiveChord"><h4>Refrigerated Inter-State Shipping:</h4><div id="container" class="legend"></div></div>
											<div id="intraBar"><h4>Refrigerated Intra-State Shipping:</h4></div>
										</div>
										<div id="wholeData" style="padding:5px;">
											<div id="marketOverviewTableBig" class="divTable paleBlueRows">
											<h4>Market Overview:</h4>
												<div class="divTableHeading">
													<div class="divTableRow">
														<div class="divTableHead">Icon</div>
														<div class="divTableHead">Dataset</div>
														<div class="divTableHead" id="headFirstInt">1 Mile</div>
														<div class="divTableHead" id="headSecondInt">3 Mile</div>
														<div class="divTableHead" id="headThirdInt">6 Mile</div>
													</div>
												</div>
												<div class="divTableBody">
													<div class="divTableRow" id="tableFarmerMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/tractor.png" /></div>
														<div class="divTableCell">Farmers Market</div>
														<div class="divTableCell" id="farmer1Mile">0</div>
														<div class="divTableCell" id="farmer3Mile">0</div>
														<div class="divTableCell" id="farmer6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableStoresMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/store.png" /></div>
														<div class="divTableCell">Grocery Stores</div>
														<div class="divTableCell" id="gs1Mile">0</div>
														<div class="divTableCell" id="gs3Mile">0</div>
														<div class="divTableCell" id="gs6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableLogosMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/logosIL/marker.png" /></div>
														<div class="divTableCell">Store Logos</div>
														<div class="divTableCell" id="sl1Mile">0</div>
														<div class="divTableCell" id="sl3Mile">0</div>
														<div class="divTableCell" id="sl6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableBrownMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/brownfields.png" /></div>
														<div class="divTableCell">Brownfields</div>
														<div class="divTableCell" id="bf1Mile">0</div>
														<div class="divTableCell" id="bf3Mile">0</div>
														<div class="divTableCell" id="bf6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableGardensMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/garden.png" /></div>
														<div class="divTableCell">Gardens</div>
														<div class="divTableCell" id="garden1Mile">0</div>
														<div class="divTableCell" id="garden3Mile">0</div>
														<div class="divTableCell" id="garden6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableNaturalMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/natural.png" /></div>
														<div class="divTableCell">Natural</div>
														<div class="divTableCell" id="natural1Mile">0</div>
														<div class="divTableCell" id="natural3Mile">0</div>
														<div class="divTableCell" id="natural6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMDMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Destinations</div>
														<div class="divTableCell" id="mmd1Mile">0</div>
														<div class="divTableCell" id="mmd3Mile">0</div>
														<div class="divTableCell" id="mmd6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMFMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Faith Based</div>
														<div class="divTableCell" id="mmf1Mile">0</div>
														<div class="divTableCell" id="mmf3Mile">0</div>
														<div class="divTableCell" id="mmf6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMGMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Government Places</div>
														<div class="divTableCell" id="mmg1Mile">0</div>
														<div class="divTableCell" id="mmg3Mile">0</div>
														<div class="divTableCell" id="mmg6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMIMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Infrastructure</div>
														<div class="divTableCell" id="mmi1Mile">0</div>
														<div class="divTableCell" id="mmi3Mile">0</div>
														<div class="divTableCell" id="mmi6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMPMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Public Spaces</div>
														<div class="divTableCell" id="mmp1Mile">0</div>
														<div class="divTableCell" id="mmp3Mile">0</div>
														<div class="divTableCell" id="mmp6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableMMRMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/manmade.png" /></div>
														<div class="divTableCell">Manmade-Retail Places</div>
														<div class="divTableCell" id="mmr1Mile">0</div>
														<div class="divTableCell" id="mmr3Mile">0</div>
														<div class="divTableCell" id="mmr6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableAirportsMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/Airports/medium.png" /></div>
														<div class="divTableCell">Airports</div>
														<div class="divTableCell" id="airports1Mile">0</div>
														<div class="divTableCell" id="airports3Mile">0</div>
														<div class="divTableCell" id="airports6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableFreightMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/freight.png" /></div>
														<div class="divTableCell">Freight</div>
														<div class="divTableCell" id="freight1Mile">0</div>
														<div class="divTableCell" id="freight3Mile">0</div>
														<div class="divTableCell" id="freight6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableCrossingMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/crossing.png" /></div>
														<div class="divTableCell">Crossing</div>
														<div class="divTableCell" id="crossing1Mile">0</div>
														<div class="divTableCell" id="crossing3Mile">0</div>
														<div class="divTableCell" id="crossing6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableIanaMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/iana.png" /></div>
														<div class="divTableCell">IANA</div>
														<div class="divTableCell" id="iana1Mile">0</div>
														<div class="divTableCell" id="iana3Mile">0</div>
														<div class="divTableCell" id="iana6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableTransitMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/transit.png" /></div>
														<div class="divTableCell">Transit</div>
														<div class="divTableCell" id="transit1Mile">0</div>
														<div class="divTableCell" id="transit3Mile">0</div>
														<div class="divTableCell" id="transit6Mile">0</div>
													</div>
													<div class="divTableRow" id="tablePortMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/port.png" /></div>
														<div class="divTableCell">Port</div>
														<div class="divTableCell" id="port1Mile">0</div>
														<div class="divTableCell" id="port3Mile">0</div>
														<div class="divTableCell" id="port6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableAmazonMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/distributions/amazon.png" /></div>
														<div class="divTableCell">Amazon</div>
														<div class="divTableCell" id="amazon1Mile">0</div>
														<div class="divTableCell" id="amazon3Mile">0</div>
														<div class="divTableCell" id="amazon6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableSyscoMulti">
														<div class="divTableHead"><img height="25px" width="50px" src="images/Icons/distributions/sysco.png" /></div>
														<div class="divTableCell">Sysco</div>
														<div class="divTableCell" id="sysco1Mile">0</div>
														<div class="divTableCell" id="sysco3Mile">0</div>
														<div class="divTableCell" id="sysco6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableUsfMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/distributions/usf.png" /></div>
														<div class="divTableCell">USFoods</div>
														<div class="divTableCell" id="usf1Mile">0</div>
														<div class="divTableCell" id="usf3Mile">0</div>
														<div class="divTableCell" id="usf6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableFedexMulti">
														<div class="divTableHead"><img height="25px" width="50px" src="images/Icons/distributions/fedex.png" /></div>
														<div class="divTableCell">Fedex</div>
														<div class="divTableCell" id="fedex1Mile">0</div>
														<div class="divTableCell" id="fedex3Mile">0</div>
														<div class="divTableCell" id="fedex6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableDhlMulti">
														<div class="divTableHead"><img height="25px" width="50px" src="images/Icons/distributions/dhl.png" /></div>
														<div class="divTableCell">DHL</div>
														<div class="divTableCell" id="dhl1Mile">0</div>
														<div class="divTableCell" id="dhl3Mile">0</div>
														<div class="divTableCell" id="dhl6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableUpsMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/distributions/ups.png" /></div>
														<div class="divTableCell">UPS</div>
														<div class="divTableCell" id="ups1Mile">0</div>
														<div class="divTableCell" id="ups3Mile">0</div>
														<div class="divTableCell" id="ups6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableAlbertsonsMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/Albertsons/2.png" /></div>
														<div class="divTableCell">Albertsons</div>
														<div class="divTableCell" id="albertsons1Mile">0</div>
														<div class="divTableCell" id="albertsons3Mile">0</div>
														<div class="divTableCell" id="albertsons6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableCulverMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/culver.png" /></div>
														<div class="divTableCell">Culver</div>
														<div class="divTableCell" id="culver1Mile">0</div>
														<div class="divTableCell" id="culver3Mile">0</div>
														<div class="divTableCell" id="culver6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableDicksMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/dicks.png" /></div>
														<div class="divTableCell">Dicks</div>
														<div class="divTableCell" id="dicks1Mile">0</div>
														<div class="divTableCell" id="dicks3Mile">0</div>
														<div class="divTableCell" id="dicks6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableGiantEagleMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/GiantEagle/gianteagle.png" /></div>
														<div class="divTableCell">Giant Eagle</div>
														<div class="divTableCell" id="gianteagle1Mile">0</div>
														<div class="divTableCell" id="gianteagle3Mile">0</div>
														<div class="divTableCell" id="gianteagle6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableKrogerMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/Kroger/Kroger.png" /></div>
														<div class="divTableCell">Kroger</div>
														<div class="divTableCell" id="kroger1Mile">0</div>
														<div class="divTableCell" id="kroger3Mile">0</div>
														<div class="divTableCell" id="kroger6Mile">0</div>
													</div>
													<div class="divTableRow" id="tablePublixMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/publix.png" /></div>
														<div class="divTableCell">Publix</div>
														<div class="divTableCell" id="publix1Mile">0</div>
														<div class="divTableCell" id="publix3Mile">0</div>
														<div class="divTableCell" id="publix6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableShoppingMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/shoppingcenter.png" /></div>
														<div class="divTableCell">Shopping Center</div>
														<div class="divTableCell" id="shopping1Mile">0</div>
														<div class="divTableCell" id="shopping3Mile">0</div>
														<div class="divTableCell" id="shopping6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableTysonMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/tyson.png" /></div>
														<div class="divTableCell">Tyson</div>
														<div class="divTableCell" id="tyson1Mile">0</div>
														<div class="divTableCell" id="tyson3Mile">0</div>
														<div class="divTableCell" id="tyson6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableRanchesMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/ranches.png" /></div>
														<div class="divTableCell">Ranches & Farms</div>
														<div class="divTableCell" id="ranches1Mile">0</div>
														<div class="divTableCell" id="ranches3Mile">0</div>
														<div class="divTableCell" id="ranches6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableTraderJoesMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/traderjoes.png" /></div>
														<div class="divTableCell">Trader Joe\'s</div>
														<div class="divTableCell" id="traderjoes1Mile">0</div>
														<div class="divTableCell" id="traderjoes3Mile">0</div>
														<div class="divTableCell" id="traderjoes6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableWholeFoodsMulti">
														<div class="divTableHead"><img height="25px" width="25px" src="images/Icons/retail/wholefoods.png" /></div>
														<div class="divTableCell">Whole Foods</div>
														<div class="divTableCell" id="wholefoods1Mile">0</div>
														<div class="divTableCell" id="wholefoods3Mile">0</div>
														<div class="divTableCell" id="wholefoods6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableDenMulti">
														<div class="divTableCell">&nbsp;</div>
														<div class="divTableCell">Density Count</div>
														<div class="divTableCell" id="den1Mile">0</div>
														<div class="divTableCell" id="den3Mile">0</div>
														<div class="divTableCell" id="den6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableHHMulti">
														<div class="divTableCell">&nbsp;</div>
														<div class="divTableCell">Households</div>
														<div class="divTableCell" id="hh1Mile">0</div>
														<div class="divTableCell" id="hh3Mile">0</div>
														<div class="divTableCell" id="hh6Mile">0</div>
													</div>
													<div class="divTableRow" id="tablePopuMulti">
														<div class="divTableCell">&nbsp;</div>
														<div class="divTableCell">Total Population</div>
														<div class="divTableCell" id="pop1Mile">0</div>
														<div class="divTableCell" id="pop3Mile">0</div>
														<div class="divTableCell" id="pop6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableIncMulti">
														<div class="divTableCell">&nbsp;</div>
														<div class="divTableCell">Median Income</div>
														<div class="divTableCell" id="inc1Mile">0</div>
														<div class="divTableCell" id="inc3Mile">0</div>
														<div class="divTableCell" id="inc6Mile">0</div>
													</div>
													<div class="divTableRow" id="tableVacMulti">
														<div class="divTableCell">&nbsp;</div>
														<div class="divTableCell">Vacancies</div>
														<div class="divTableCell" id="vac1Mile">0</div>
														<div class="divTableCell" id="vac3Mile">0</div>
														<div class="divTableCell" id="vac6Mile">0</div>
													</div>
												</div>
											</div>
											<div id="marketOverviewTableSmall" class="divTable paleBlueRows">
											<h4>Market Overview:</h4>
												<div class="divTableHeading">
													<div class="divTableRow">
														<div class="divTableHead">Dataset</div>
														<div class="divTableHead" id="headFirstInt">Feature Count</div>
													</div>
												</div>
												<div class="divTableBody">
													<div class="divTableRow" id="tableAirports">
														<div class="divTableCell">Airports</div>
														<div class="divTableCell" id="airportsFCount">0</div>
													</div>
													<div class="divTableRow" id="tableAlbertsons">
														<div class="divTableCell">Albertsons</div>
														<div class="divTableCell" id="albertsonsFCount">0</div>
													</div>
													<div class="divTableRow" id="tableAmazon">
														<div class="divTableCell">Amazon</div>
														<div class="divTableCell" id="amazonFCount">0</div>
													</div>
													<div class="divTableRow" id="tableBanks12">
														<div class="divTableCell">Banks 2012</div>
														<div class="divTableCell" id="banks12Count">0</div>
													</div>
													<div class="divTableRow" id="tableBanks16">
														<div class="divTableCell">Banks 2016</div>
														<div class="divTableCell" id="banks16Count">0</div>
													</div>
													<div class="divTableRow" id="tableBanks17">
														<div class="divTableCell">Banks 2017</div>
														<div class="divTableCell" id="banks17Count">0</div>
													</div>
													<div class="divTableRow" id="tableBrown">
														<div class="divTableCell">Brownfields</div>
														<div class="divTableCell" id="bfFCount">0</div>
													</div>
													<div class="divTableRow" id="tableCrossing">
														<div class="divTableCell">Crossing</div>
														<div class="divTableCell" id="crossingFCount">0</div>
													</div>
													<div class="divTableRow" id="tableCulver">
														<div class="divTableCell">Culver</div>
														<div class="divTableCell" id="culverFCount">0</div>
													</div>
													<!--<div class="divTableRow" id="tableDen">
														<div class="divTableCell">Density Count</div>
														<div class="divTableCell" id="denFCount">0</div>
													</div>-->
													<div class="divTableRow" id="tableDhl">
														<div class="divTableCell">DHL</div>
														<div class="divTableCell" id="dhlFCount">0</div>
													</div>
													<div class="divTableRow" id="tableDicks">
														<div class="divTableCell">Dicks</div>
														<div class="divTableCell" id="dicksFCount">0</div>
													</div>
													<div class="divTableRow" id="tableDMA">
														<div class="divTableCell">DMA</div>
														<div class="divTableCell" id="dmaFCount">0</div>
													</div>
													<div class="divTableRow" id="tableFarmer">
														<div class="divTableCell">Farmers Market</div>
														<div class="divTableCell" id="farmerFCount">0</div>
													</div>
													<div class="divTableRow" id="tableFedex">
														<div class="divTableCell">Fedex</div>
														<div class="divTableCell" id="fedexFCount">0</div>
													</div>
													<div class="divTableRow" id="tableFreight">
														<div class="divTableCell">Freight</div>
														<div class="divTableCell" id="freightFCount">0</div>
													</div>
													<div class="divTableRow" id="tableGardens">
														<div class="divTableCell">Gardens</div>
														<div class="divTableCell" id="gardenFCount">0</div>
													</div>
													<div class="divTableRow" id="tableStores">
														<div class="divTableCell">Grocery Stores</div>
														<div class="divTableCell" id="gsFCount">0</div>
													</div>
													<!--<div class="divTableRow" id="tableHH">
														<div class="divTableCell">Households</div>
														<div class="divTableCell" id="hhFCount">0</div>
													</div>-->
													<div class="divTableRow" id="tableIana">
														<div class="divTableCell">IANA</div>
														<div class="divTableCell" id="ianaFCount">0</div>
													</div>
													<!--<div class="divTableRow" id="tableInc">
														<div class="divTableCell">Median Income</div>
														<div class="divTableCell" id="incFCount">0</div>
													</div>-->
													<div class="divTableRow" id="tableManmadeDest">
														<div class="divTableCell">Manmade-Destinations</div>
														<div class="divTableCell" id="mmdFCount">0</div>
													</div>
													<div class="divTableRow" id="tableManmadeFaith">
														<div class="divTableCell">Manmade-Faith Based</div>
														<div class="divTableCell" id="mmfFCount">0</div>
													</div>
													<div class="divTableRow" id="tableManmadeGovt">
														<div class="divTableCell">Manmade-Government Places</div>
														<div class="divTableCell" id="mmgFCount">0</div>
													</div>
													<div class="divTableRow" id="tableManmadeInfra">
														<div class="divTableCell">Manmade-Infrastructure</div>
														<div class="divTableCell" id="mmiFCount">0</div>
													</div>
													<div class="divTableRow" id="tableManmadePublic">
														<div class="divTableCell">Manmade-Public Spaces</div>
														<div class="divTableCell" id="mmpFCount">0</div>
													</div>
													<div class="divTableRow" id="tableManmadeRetail">
														<div class="divTableCell">Manmade-Retail Places</div>
														<div class="divTableCell" id="mmrFCount">0</div>
													</div>
													<div class="divTableRow" id="tableNatural">
														<div class="divTableCell">Natural</div>
														<div class="divTableCell" id="naturalFCount">0</div>
													</div>
													<div class="divTableRow" id="tablePort">
														<div class="divTableCell">Port</div>
														<div class="divTableCell" id="portFCount">0</div>
													</div>
													<div class="divTableRow" id="tablePublix">
														<div class="divTableCell">Publix</div>
														<div class="divTableCell" id="publixFCount">0</div>
													</div>
													<div class="divTableRow" id="tableGiantEagle">
														<div class="divTableCell">Giant Eagle</div>
														<div class="divTableCell" id="gianteagleFCount">0</div>
													</div>
													<div class="divTableRow" id="tableKroger">
														<div class="divTableCell">Kroger</div>
														<div class="divTableCell" id="krogerFCount">0</div>
													</div>
													<div class="divTableRow" id="tableRanches">
														<div class="divTableCell">Ranches & Farms</div>
														<div class="divTableCell" id="ranchesFCount">0</div>
													</div>
													<div class="divTableRow" id="tableTraderJoes">
														<div class="divTableCell">Trader Joe\'s</div>
														<div class="divTableCell" id="traderjoesFCount">0</div>
													</div>
													<div class="divTableRow" id="tableWholeFoods">
														<div class="divTableCell">Whole Foods</div>
														<div class="divTableCell" id="wholefoodsFCount">0</div>
													</div>
													<div class="divTableRow" id="tableShopping">
														<div class="divTableCell">Shopping Center</div>
														<div class="divTableCell" id="shoppingFCount">0</div>
													</div>
													<div class="divTableRow" id="tableLogos">
														<div class="divTableCell">Store Logos</div>
														<div class="divTableCell" id="slFCount">0</div>
													</div>
													<div class="divTableRow" id="tableSysco">
														<div class="divTableCell">Sysco</div>
														<div class="divTableCell" id="syscoFCount">0</div>
													</div>
													<!--<div class="divTableRow" id="tablePopu">
														<div class="divTableCell">Total Population</div>
														<div class="divTableCell" id="popFCount">0</div>
													</div>-->
													<div class="divTableRow" id="tableTransit">
														<div class="divTableCell">Transit</div>
														<div class="divTableCell" id="transitFCount">0</div>
													</div>
													<div class="divTableRow" id="tableTyson">
														<div class="divTableCell">Tyson</div>
														<div class="divTableCell" id="tysonFCount">0</div>
													</div>
													<div class="divTableRow" id="tableUsf">
														<div class="divTableCell">USFoods</div>
														<div class="divTableCell" id="usfFCount">0</div>
													</div>
													<div class="divTableRow" id="tableUps">
														<div class="divTableCell">UPS</div>
														<div class="divTableCell" id="upsFCount">0</div>
													</div>
													<!--<div class="divTableRow" id="tableVac">
														<div class="divTableCell">Vacancies</div>
														<div class="divTableCell" id="vacFCount">0</div>
													</div>-->
												</div>
											</div>
											<div id="cropTable">
												<table class="tableizer-table">
													<thead>
														<tr class="tableizer-firstrow">
															<th>Category</th>
															<th>Count</th>
															<th>Acreage</th>
														</tr>
													</thead>				
													<tbody>
														<tr>
															<td> Corn</td>
															<td>51934044</td>
															<td>11549853.4</td>
														</tr>
														<tr>
															<td> Sorghum</td>
															<td>920073</td>
															<td>204619.3</td>
														</tr>
														<tr>
															<td> Soybeans</td>
															<td>33497690</td>
															<td>7449706.9</td>
														</tr>
														<tr>
															<td> Sunflowers</td>
															<td>24698</td>
															<td>5492.7</td>
														</tr>
														<tr>
															<td> Pop or Orn Corn</td>
															<td>203425</td>
															<td>45240.6</td>
														</tr>
														<tr>
															<td> Barley</td>
															<td>3426</td>
															<td>761.9</td>
														</tr>
														<tr>
															<td> Durum Wheat</td>
															<td>491</td>
															<td>109.2</td>
														</tr>
														<tr>
															<td> Spring Wheat</td>
															<td>7832</td>
															<td>1741.8</td>
														</tr>
														<tr>
															<td> Winter Wheat</td>
															<td>2806412</td>
															<td>624131</td>
														</tr>
														<tr>
															<td> Dbl Crop WinWht/Soybeans</td>
															<td>5331</td>
															<td>1185.6</td>
														</tr>
														<tr>
															<td> Rye</td>
															<td>117463</td>
															<td>26123.1</td>
														</tr>
														<tr>
															<td> Oats</td>
															<td>330925</td>
															<td>73595.9</td>
														</tr>
														<tr>
															<td> Millet</td>
															<td>96790</td>
															<td>21525.6</td>
														</tr>
														<tr>
															<td> Flaxseed</td>
															<td>1</td>
															<td>0.2</td>
														</tr>
														<tr>
															<td> Mustard</td>
															<td>46</td>
															<td>10.2</td>
														</tr>
														<tr>
															<td> Alfalfa</td>
															<td>3276301</td>
															<td>728631.8</td>
														</tr>
														<tr>
															<td> Other Hay/Non Alfalfa</td>
															<td>1008202</td>
															<td>224218.7</td>
														</tr>
														<tr>
															<td> Buckwheat</td>
															<td>54</td>
															<td>12</td>
														</tr>
														<tr>
															<td> Sugarbeets</td>
															<td>9666</td>
															<td>2149.7</td>
														</tr>
														<tr>
															<td> Dry Beans</td>
															<td>163586</td>
															<td>36380.7</td>
														</tr>
														<tr>
															<td> Potatoes</td>
															<td>17652</td>
															<td>3925.7</td>
														</tr>
														<tr>
															<td> Other Crops</td>
															<td>3851</td>
															<td>856.4</td>
														</tr>
														<tr>
															<td> Watermelons</td>
															<td>41</td>
															<td>9.1</td>
														</tr>
														<tr>
															<td> Lentils</td>
															<td>7</td>
															<td>1.6</td>
														</tr>
														<tr>
															<td> Peas</td>
															<td>102558</td>
															<td>22808.4</td>
														</tr>
														<tr>
															<td> Clover/Wildflowers</td>
															<td>889</td>
															<td>197.7</td>
														</tr>
														<tr>
															<td> Sod/Grass Seed</td>
															<td>7116</td>
															<td>1582.6</td>
														</tr>
														<tr>
															<td> Switchgrass</td>
															<td>809</td>
															<td>179.9</td>
														</tr>
														<tr>
															<td> Fallow/Idle Cropland</td>
															<td>1994487</td>
															<td>443563.2</td>
														</tr>
														<tr>
															<td> Grapes</td>
															<td>83</td>
															<td>18.5</td>
														</tr>
														<tr>
															<td> Open Water</td>
															<td>2297729</td>
															<td>511002.6</td>
														</tr>
														<tr>
															<td> Developed/Open Space</td>
															<td>6490310</td>
															<td>1443410.2</td>
														</tr>
														<tr>
															<td> Developed/Low Intensity</td>
															<td>1703372</td>
															<td>378820.8</td>
														</tr>
														<tr>
															<td> Developed/Medium Intensity</td>
															<td>520081</td>
															<td>115663.2</td>
														</tr>
														<tr>
															<td> Developed/High Intensity</td>
															<td>204212</td>
															<td>45415.7</td>
														</tr>
														<tr>
															<td> Barren</td>
															<td>46899</td>
															<td>10430.1</td>
														</tr>
														<tr>
															<td> Deciduous Forest</td>
															<td>5275438</td>
															<td>1173229.2</td>
														</tr>
														<tr>
															<td> Evergreen Forest</td>
															<td>318488</td>
															<td>70830</td>
														</tr>
														<tr>
															<td> Mixed Forest</td>
															<td>287472</td>
															<td>63932.2</td>
														</tr>
														<tr>
															<td> Shrubland</td>
															<td>28223</td>
															<td>6276.6</td>
														</tr>
														<tr>
															<td> Grass/Pasture</td>
															<td>97969688</td>
															<td>21787934.2</td>
														</tr>
														<tr>
															<td> Woody Wetlands</td>
															<td>2543519</td>
															<td>565665</td>
														</tr>
														<tr>
															<td> Herbaceous Wetlands</td>
															<td>2527103</td>
															<td>562014.2</td>
														</tr>
														<tr>
															<td> Triticale</td>
															<td>13894</td>
															<td>3090</td>
														</tr>
														<tr>
															<td> Dbl Crop WinWht/Corn</td>
															<td>7075</td>
															<td>1573.4</td>
														</tr>
														<tr>
															<td> Pumpkins</td>
															<td>88</td>
															<td>19.6</td>
														</tr>
														<tr>
															<td> Dbl Crop WinWht/Sorghum</td>
															<td>2800</td>
															<td>622.7</td>
														</tr>
														<tr>
															<td> Dbl Crop Soybeans/Oats</td>
															<td>5</td>
															<td>1.1</td>
														</tr>
														<tr>
															<td> Dbl Crop Corn/Soybeans</td>
															<td>421</td>
															<td>93.6</td>
														</tr>
														<tr>
															<td> Cabbage</td>
															<td>566</td>
															<td>125.9</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div id="bankTable">
												<table class="tableizer-table">
													<thead>
														<tr class="tableizer-firstrow">
															<th></th>
															<th colspan="3">1 Year Change</th>
															<th colspan="3">5 Year % Change</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>&nbsp;</td>
															<td>HQ</td>
															<td>BR</td>
															<td>DEP</td>
															<td>HQ</td>
															<td>BR</td>
															<td>DEP</td>
														</tr>
														<tr>
															<td>Alabama</td>
															<td>-4.69%</td>
															<td>-1.37%</td>
															<td>2.95%</td>
															<td>-12.86%</td>
															<td>-3.85%</td>
															<td>18.34%</td>
														</tr>
														<tr>
															<td>Arizona</td>
															<td style="background-color:#FF9690;">-16.67%</td>
															<td>-2.69%</td>
															<td>5.94%</td>
															<td style="background-color:#FF9690;">-51.61%</td>
															<td style="background-color:#FF9690;">-9.13%</td>
															<td style="background-color:#B6DF9B;">41.53%</td>
														</tr>
														<tr>
															<td>Arkansas</td>
															<td style="background-color:#FF9690;">-8.65%</td>
															<td>-0.16%</td>
															<td>5.06%</td>
															<td>-24.60%</td>
															<td>-5.17%</td>
															<td>19.76%</td>
														</tr>
														<tr>
															<td>California</td>
															<td>-6.45%</td>
															<td>-1.21%</td>
															<td>6.71%</td>
															<td style="background-color:#FF9690;">-30.12%</td>
															<td>-4.34%</td>
															<td style="background-color:#B6DF9B;">41.98%</td>
														</tr>
														<tr>
															<td>Colorado</td>
															<td>-7.69%</td>
															<td>-1.55%</td>
															<td>5.48%</td>
															<td>-20.75%</td>
															<td>-7.41%</td>
															<td>32.86%</td>
														</tr>
														<tr>
															<td>Connecticut</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-2.57%</td>
															<td>3.15%</td>
															<td>-17.65%</td>
															<td>-7.78%</td>
															<td>30.85%</td>
														</tr>
														<tr>
															<td>Delaware</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.22%</td>
															<td>1.32%</td>
															<td>-12.00%</td>
															<td>-7.95%</td>
															<td style="background-color:#FF9690;">-0.98%</td>
														</tr>
														<tr>
															<td>District of Columbia</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td style="background-color:#FF9690;">-3.54%</td>
															<td>2.48%</td>
															<td style="background-color:#FF9690;">-40.00%</td>
															<td style="background-color:#FF9690;">-8.40%</td>
															<td style="background-color:#B6DF9B;">42.34%</td>
														</tr>
														<tr>
															<td>Florida</td>
															<td style="background-color:#FF9690;">-9.93%</td>
															<td>-2.73%</td>
															<td>4.03%</td>
															<td style="background-color:#FF9690;">-37.04%</td>
															<td>-6.62%</td>
															<td>33.56%</td>
														</tr>
														<tr>
															<td>Georgia</td>
															<td>-6.25%</td>
															<td style="background-color:#FF9690;">-3.61%</td>
															<td style="background-color:#FF9690;">-9.39%</td>
															<td>-23.73%</td>
															<td style="background-color:#FF9690;">-9.88%</td>
															<td>9.95%</td>
														</tr>
														<tr>
															<td>Idaho</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.43%</td>
															<td>7.13%</td>
															<td>-25.00%</td>
															<td>-6.95%</td>
															<td>27.44%</td>
														</tr>
														<tr>
															<td>Illinois</td>
															<td>-6.21%</td>
															<td>-2.43%</td>
															<td>0.89%</td>
															<td>-20.39%</td>
															<td style="background-color:#FF9690;">-8.73%</td>
															<td>22.10%</td>
														</tr>
														<tr>
															<td>Indiana</td>
															<td>-7.76%</td>
															<td style="background-color:#FF9690;">-2.89%</td>
															<td>4.51%</td>
															<td>-22.46%</td>
															<td style="background-color:#FF9690;">-11.57%</td>
															<td>21.09%</td>
														</tr>
														<tr>
															<td>Iowa</td>
															<td>-6.17%</td>
															<td>-0.24%</td>
															<td>2.91%</td>
															<td>-15.00%</td>
															<td>1.23%</td>
															<td>14.53%</td>
														</tr>
														<tr>
															<td>Kansas</td>
															<td>-7.43%</td>
															<td style="background-color:#B6DF9B;">0.25%</td>
															<td>3.92%</td>
															<td>-20.70%</td>
															<td style="background-color:#B6DF9B;">0.08%</td>
															<td>16.93%</td>
														</tr>
														<tr>
															<td>Kentucky</td>
															<td>-6.67%</td>
															<td>-1.12%</td>
															<td>3.48%</td>
															<td>-20.21%</td>
															<td>-4.14%</td>
															<td>12.35%</td>
														</tr>
														<tr>
															<td>Louisiana</td>
															<td>-2.29%</td>
															<td>-2.32%</td>
															<td>2.48%</td>
															<td>-11.72%</td>
															<td>-5.82%</td>
															<td>18.18%</td>
														</tr>
														<tr>
															<td>Maine</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-0.44%</td>
															<td>4.26%</td>
															<td>-10.34%</td>
															<td>-5.79%</td>
															<td style="background-color:#FF9690;">-16.53%</td>
														</tr>
														<tr>
															<td>Maryland</td>
															<td>-5.26%</td>
															<td style="background-color:#FF9690;">-3.13%</td>
															<td>4.80%</td>
															<td style="background-color:#FF9690;">-33.33%</td>
															<td style="background-color:#FF9690;">-10.16%</td>
															<td>20.85%</td>
														</tr>
														<tr>
															<td>Massachusetts</td>
															<td>-6.57%</td>
															<td>-0.49%</td>
															<td style="background-color:#FF9690;">-1.83%</td>
															<td>-18.47%</td>
															<td>-0.44%</td>
															<td>28.79%</td>
														</tr>
														<tr>
															<td>Michigan</td>
															<td style="background-color:#FF9690;">-10.19%</td>
															<td style="background-color:#FF9690;">-4.16%</td>
															<td>4.93%</td>
															<td>-25.38%</td>
															<td style="background-color:#FF9690;">-11.49%</td>
															<td>26.30%</td>
														</tr>
														<tr>
															<td>Minnesota</td>
															<td>-3.13%</td>
															<td>-1.98%</td>
															<td>5.40%</td>
															<td>-19.06%</td>
															<td>-0.57%</td>
															<td>16.72%</td>
														</tr>
														<tr>
															<td>Mississippi</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.30%</td>
															<td>4.76%</td>
															<td>-8.14%</td>
															<td>-3.53%</td>
															<td>14.91%</td>
														</tr>
														<tr>
															<td>Missouri</td>
															<td>-5.21%</td>
															<td>-1.32%</td>
															<td>6.90%</td>
															<td>-17.02%</td>
															<td>-2.50%</td>
															<td>25.33%</td>
														</tr>
														<tr>
															<td>Montana</td>
															<td>-7.27%</td>
															<td style="background-color:#B6DF9B;">0.61%</td>
															<td>3.10%</td>
															<td>-22.73%</td>
															<td style="background-color:#B6DF9B;">1.53%</td>
															<td>21.72%</td>
														</tr>
														<tr>
															<td>Nebraska</td>
															<td>-6.95%</td>
															<td style="background-color:#B6DF9B;">1.58%</td>
															<td>1.54%</td>
															<td>-19.44%</td>
															<td style="background-color:#B6DF9B;">7.02%</td>
															<td>24.89%</td>
														</tr>
														<tr>
															<td>Nevada</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.44%</td>
															<td style="background-color:#B6DF9B;">13.09%</td>
															<td style="background-color:#FF9690;">-29.17%</td>
															<td>-7.35%</td>
															<td style="background-color:#B6DF9B;">104.99%</td>
														</tr>
														<tr>
															<td>New Hampshire</td>
															<td>-5.26%</td>
															<td>-1.71%</td>
															<td>3.60%</td>
															<td>-18.18%</td>
															<td>-0.99%</td>
															<td>18.56%</td>
														</tr>
														<tr>
															<td>New Jersey</td>
															<td>-5.62%</td>
															<td>-2.24%</td>
															<td>5.24%</td>
															<td>-23.64%</td>
															<td>-7.68%</td>
															<td>23.85%</td>
														</tr>
														<tr>
															<td>New Mexico</td>
															<td>-2.50%</td>
															<td style="background-color:#FF9690;">-3.13%</td>
															<td style="background-color:#FF9690;">-0.41%</td>
															<td>-20.41%</td>
															<td>-5.66%</td>
															<td>17.52%</td>
														</tr>
														<tr>
															<td>New York</td>
															<td>-1.92%</td>
															<td>-2.70%</td>
															<td style="background-color:#B6DF9B;">9.78%</td>
															<td>-16.85%</td>
															<td>-6.81%</td>
															<td style="background-color:#B6DF9B;">58.24%</td>
														</tr>
														<tr>
															<td>North Carolina</td>
															<td>-7.81%</td>
															<td>-2.40%</td>
															<td>4.58%</td>
															<td style="background-color:#FF9690;">-36.56%</td>
															<td style="background-color:#FF9690;">-9.80%</td>
															<td>6.37%</td>
														</tr>
														<tr>
															<td>North Dakota</td>
															<td>-1.28%</td>
															<td>-0.28%</td>
															<td>4.42%</td>
															<td>-14.44%</td>
															<td style="background-color:#B6DF9B;">9.72%</td>
															<td>30.31%</td>
														</tr>
														<tr>
															<td>Ohio</td>
															<td>-7.39%</td>
															<td style="background-color:#FF9690;">-2.99%</td>
															<td>3.24%</td>
															<td>-20.34%</td>
															<td style="background-color:#FF9690;">-8.28%</td>
															<td>37.11%</td>
														</tr>
														<tr>
															<td>Oklahoma</td>
															<td>-2.86%</td>
															<td style="background-color:#B6DF9B;">0.09%</td>
															<td>2.46%</td>
															<td>-13.92%</td>
															<td>-1.13%</td>
															<td>15.56%</td>
														</tr>
														<tr>
															<td>Oregon</td>
															<td style="background-color:#FF9690;">-8.00%</td>
															<td>-2.20%</td>
															<td>6.63%</td>
															<td style="background-color:#FF9690;">-32.35%</td>
															<td style="background-color:#FF9690;">-10.04%</td>
															<td>14.90%</td>
														</tr>
														<tr>
															<td>Pennsylvania</td>
															<td>-7.14%</td>
															<td>-1.79%</td>
															<td>6.44%</td>
															<td>-22.77%</td>
															<td>-7.91%</td>
															<td>25.09%</td>
														</tr>
														<tr>
															<td>Rhode Island</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.59%</td>
															<td>5.10%</td>
															<td style="background-color:#FF9690;">-35.71%</td>
															<td style="background-color:#B6DF9B;">1.64%</td>
															<td style="background-color:#FF9690;">-32.57%</td>
														</tr>
														<tr>
															<td>South Carolina</td>
															<td>-5.17%</td>
															<td>-1.06%</td>
															<td>6.93%</td>
															<td>-22.54%</td>
															<td>-7.88%</td>
															<td>26.20%</td>
														</tr>
														<tr>
															<td>South Dakota</td>
															<td style="background-color:#B6DF9B;">1.45%</td>
															<td>-1.50%</td>
															<td style="background-color:#B6DF9B;">18.13%</td>
															<td>-12.50%</td>
															<td style="background-color:#B6DF9B;">6.79%</td>
															<td style="background-color:#B6DF9B;">70.74%</td>
														</tr>
														<tr>
															<td>Tennessee</td>
															<td>-6.13%</td>
															<td>-1.61%</td>
															<td>6.12%</td>
															<td>-17.30%</td>
															<td>-5.73%</td>
															<td>29.12%</td>
														</tr>
														<tr>
															<td>Texas</td>
															<td>-4.65%</td>
															<td>-2.65%</td>
															<td>6.08%</td>
															<td>-23.04%</td>
															<td>-3.32%</td>
															<td>36.20%</td>
														</tr>
														<tr>
															<td>Utah</td>
															<td>-6.38%</td>
															<td>-1.21%</td>
															<td style="background-color:#FF9690;">-17.11%</td>
															<td>-20.00%</td>
															<td style="background-color:#FF9690;">-9.41%</td>
															<td>37.52%</td>
														</tr>
														<tr>
															<td>Vermont</td>
															<td style="background-color:#FF9690;">-16.67%</td>
															<td>-1.30%</td>
															<td>2.97%</td>
															<td style="background-color:#FF9690;">-28.57%</td>
															<td>-5.00%</td>
															<td>11.90%</td>
														</tr>
														<tr>
															<td>Virginia</td>
															<td style="background-color:#FF9690;">-11.11%</td>
															<td style="background-color:#FF9690;">-3.23%</td>
															<td>7.13%</td>
															<td style="background-color:#FF9690;">-27.27%</td>
															<td style="background-color:#FF9690;">-8.86%</td>
															<td>23.60%</td>
														</tr>
														<tr>
															<td>Washington</td>
															<td>-7.69%</td>
															<td>-0.88%</td>
															<td>7.50%</td>
															<td style="background-color:#FF9690;">-32.39%</td>
															<td>-6.08%</td>
															<td>36.30%</td>
														</tr>
														<tr>
															<td>West Virginia</td>
															<td>-5.08%</td>
															<td>-1.19%</td>
															<td>3.60%</td>
															<td>-9.68%</td>
															<td>-3.65%</td>
															<td>8.41%</td>
														</tr>
														<tr>
															<td>Wisconsin</td>
															<td>-7.79%</td>
															<td style="background-color:#FF9690;">-4.17%</td>
															<td>7.55%</td>
															<td>-21.40%</td>
															<td style="background-color:#FF9690;">-8.98%</td>
															<td>16.76%</td>
														</tr>
														<tr>
															<td>Wyoming</td>
															<td style="background-color:#B6DF9B;">0.00%</td>
															<td>-1.04%</td>
															<td style="background-color:#FF9690;">-0.74%</td>
															<td>-8.57%</td>
															<td>-1.55%</td>
															<td>17.90%</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div id="chartContainerParent" style="height: 300px; width: 425px;">
											</div>
											<div id="output" style="margin: 10px;">
											</div>
											<div id="csvTable" style="margin: 10px;">
											</div>
										</div>
									</div>

									<div id="prefTab" class="tab-pane fade in">
										<div class="div-hand">
											<a data-toggle="collapse" href="#radiusData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Layers Radius</b>
											</a>
											<div id="radiusData" class="collapse">
												<div class="tabs">
													<div class="tab">
														<input type="radio" id="chkRadiusOne" name="radiusControls" '.(($projectValues[0]["selectedRadius"]==='1')?'checked':"checked").'>
														<label style="border-radius: 10px 0px 0px 10px;" for="chkRadiusOne">Border</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkRadiusTwo" name="radiusControls" '.(($projectValues[0]["selectedRadius"]==='2')?'checked':"").'>
														<label class="lblVorCntrls" for="chkRadiusTwo">Venn-Style</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkRadiusThree" name="radiusControls" '.(($projectValues[0]["selectedRadius"]==='3')?'checked':"").'>
														<label style="border-radius: 0px 10px 10px 0px; border-right: 1px solid #26A69A;" class="lblVorCntrls" for="chkRadiusThree">Coverage Area</label>
													</div>
												</div>
												<div class="bottomBar"></div>
												<h5><b>Transparency:</h5></b>
												<div id="iptRadiusOpacity"><div id="radiushandle" class="ui-slider-handle"></div></div>
												<div class="bottomBar"></div>
												<h5><b>(Minimum: 1 & Maximum: 200)</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Dataset</div>
															<div class="divTableHead">Radius (Miles)</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">Agencies</div>
															<div class="divTableCell" id="radiusAgencies"><input type="number" id="intervalAgencies" min="1" value='.(($radiusValues[0]["stroke"]==NULL)?'5':$radiusValues[0]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Address Based</div>
															<div class="divTableCell" id="radiusCA"><input type="number" id="intervalCA" min="1" value='.(($radiusValues[1]["stroke"]==NULL)?'5':$radiusValues[1]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Zip Based</div>
															<div class="divTableCell" id="radiusZA"><input type="number" id="intervalZA" min="1" value='.(($radiusValues[2]["stroke"]==NULL)?'5':$radiusValues[2]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Airports</div>
															<div class="divTableCell" id="radiusAirport"><input type="number" id="intervalAirport" min="1" value='.(($radiusValues[3]["stroke"]==NULL)?'15':$radiusValues[3]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Albertsons</div>
															<div class="divTableCell" id="radiusAlbertsons"><input type="number" id="intervalAlbertsons" min="1" value='.(($radiusValues[4]["stroke"]==NULL)?'1':$radiusValues[4]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Aldi Stores</div>
															<div class="divTableCell" id="radiusAldi"><input type="number" id="intervalAldi" min="1" value='.(($radiusValues[5]["stroke"]==NULL)?'1':$radiusValues[5]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Amazon</div>
															<div class="divTableCell" id="radiusAmazon"><input type="number" id="intervalAmazon" min="1" value='.(($radiusValues[6]["stroke"]==NULL)?'50':$radiusValues[6]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ambulatory Surgical Centers</div>
															<div class="divTableCell" id="radiusAsc"><input type="number" id="intervalAsc" min="1" value='.(($radiusValues[7]["stroke"]==NULL)?'5':$radiusValues[7]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Biodiesel Plants</div>
															<div class="divTableCell" id="radiusBiodiesel"><input type="number" id="intervalBiodiesel" min="1" value='.(($radiusValues[8]["stroke"]==NULL)?'5':$radiusValues[8]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Brownfields</div>
															<div class="divTableCell" id="radiusBrownfields"><input type="number" id="intervalBrownfields" min="1" value='.(($radiusValues[9]["stroke"]==NULL)?'5':$radiusValues[9]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Credit Unions</div>
															<div class="divTableCell" id="radiusCreditUnions"><input type="number" id="intervalCreditUnions" min="1" value='.(($radiusValues[10]["stroke"]==NULL)?'5':$radiusValues[10]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Culver</div>
															<div class="divTableCell" id="radiusCulver"><input type="number" id="intervalCulver" min="1" value='.(($radiusValues[11]["stroke"]==NULL)?'5':$radiusValues[11]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Dental Health</div>
															<div class="divTableCell" id="radiusDental"><input type="number" id="intervalDental" min="1" value='.(($radiusValues[12]["stroke"]==NULL)?'5':$radiusValues[12]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Derma Solo</div>
															<div class="divTableCell" id="radiusDermaSolo"><input type="number" id="intervalDermaSolo" min="1" value='.(($radiusValues[13]["stroke"]==NULL)?'5':$radiusValues[13]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Derma Group</div>
															<div class="divTableCell" id="radiusDermaGroup"><input type="number" id="intervalDermaGroup" min="1" value='.(($radiusValues[14]["stroke"]==NULL)?'5':$radiusValues[14]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Dicks</div>
															<div class="divTableCell" id="radiusDicks"><input type="number" id="intervalDicks" min="1" value='.(($radiusValues[15]["stroke"]==NULL)?'5':$radiusValues[15]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA</div>
															<div class="divTableCell" id="radiusDMA"><input type="number" id="intervalDMA" min="1" value='.(($radiusValues[16]["stroke"]==NULL)?'75':$radiusValues[16]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA DCs</div>
															<div class="divTableCell" id="radiusDmaDcs"><input type="number" id="intervalDmaDcs" min="1" value='.(($radiusValues[17]["stroke"]==NULL)?'5':$radiusValues[17]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Edward Jones</div>
															<div class="divTableCell" id="radiusEdwardJones"><input type="number" id="intervalEdwardJones" min="1" value='.(($radiusValues[18]["stroke"]==NULL)?'5':$radiusValues[18]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ethanol Plants</div>
															<div class="divTableCell" id="radiusEthanol"><input type="number" id="intervalEthanol" min="1" value='.(($radiusValues[19]["stroke"]==NULL)?'5':$radiusValues[19]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Farmers Market</div>
															<div class="divTableCell" id="radiusFarmers"><input type="number" id="intervalFarmers" min="1" value='.(($radiusValues[20]["stroke"]==NULL)?'5':$radiusValues[20]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Five Guys</div>
															<div class="divTableCell" id="radiusFiveGuys"><input type="number" id="intervalFiveGuys" min="1" value='.(($radiusValues[21]["stroke"]==NULL)?'5':$radiusValues[21]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Freight Intersections</div>
															<div class="divTableCell" id="radiusFreight"><input type="number" id="intervalFreight" min="1" value='.(($radiusValues[22]["stroke"]==NULL)?'1':$radiusValues[22]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Giant Eagle</div>
															<div class="divTableCell" id="radiusGiantEagle"><input type="number" id="intervalGiantEagle" min="1" value='.(($radiusValues[23]["stroke"]==NULL)?'1':$radiusValues[23]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grainger</div>
															<div class="divTableCell" id="radiusGrainger"><input type="number" id="intervalGrainger" min="1" value='.(($radiusValues[24]["stroke"]==NULL)?'25':$radiusValues[24]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grocery Stores</div>
															<div class="divTableCell" id="radiusStores"><input type="number" id="intervalStores" min="1" value='.(($radiusValues[25]["stroke"]==NULL)?'1':$radiusValues[25]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Gymboree</div>
															<div class="divTableCell" id="radiusGymboree"><input type="number" id="intervalGymboree" min="1" value='.(($radiusValues[26]["stroke"]==NULL)?'1':$radiusValues[26]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Homemade Shelters</div>
															<div class="divTableCell" id="radiusShelter"><input type="number" id="intervalShelter" min="1" value='.(($radiusValues[27]["stroke"]==NULL)?'5':$radiusValues[27]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hot Springs</div>
															<div class="divTableCell" id="radiusHotSprings"><input type="number" id="intervalHotSprings" min="1" value='.(($radiusValues[28]["stroke"]==NULL)?'5':$radiusValues[28]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hydroponics</div>
															<div class="divTableCell" id="radiusHydroponics"><input type="number" id="intervalHydroponics" min="1" value='.(($radiusValues[29]["stroke"]==NULL)?'5':$radiusValues[29]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Interchanges</div>
															<div class="divTableCell" id="radiusCrossing"><input type="number" id="intervalCrossing" min="1" value='.(($radiusValues[30]["stroke"]==NULL)?'1':$radiusValues[30]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Intermodal Sites</div>
															<div class="divTableCell" id="radiusIana"><input type="number" id="intervalIana" min="1" value='.(($radiusValues[31]["stroke"]==NULL)?'50':$radiusValues[31]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Keef</div>
															<div class="divTableCell" id="radiusKeef"><input type="number" id="intervalKeef" min="1" value='.(($radiusValues[32]["stroke"]==NULL)?'5':$radiusValues[32]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">KeHE Distributors</div>
															<div class="divTableCell" id="radiusKeHE"><input type="number" id="intervalKeHE" min="1" value='.(($radiusValues[33]["stroke"]==NULL)?'5':$radiusValues[33]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Kroger</div>
															<div class="divTableCell" id="radiusKroger"><input type="number" id="intervalKroger" min="1" value='.(($radiusValues[34]["stroke"]==NULL)?'1':$radiusValues[34]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Land Banks</div>
															<div class="divTableCell" id="radiusLandBanks"><input type="number" id="intervalLandBanks" min="1" value='.(($radiusValues[35]["stroke"]==NULL)?'5':$radiusValues[35]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Major US Ports</div>
															<div class="divTableCell" id="radiusPorts"><input type="number" id="intervalPorts" min="1" value='.(($radiusValues[36]["stroke"]==NULL)?'5':$radiusValues[36]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">McLane</div>
															<div class="divTableCell" id="radiusMclane"><input type="number" id="intervalMclane" min="1" value='.(($radiusValues[37]["stroke"]==NULL)?'50':$radiusValues[37]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Mental Health</div>
															<div class="divTableCell" id="radiusMental"><input type="number" id="intervalMental" min="1" value='.(($radiusValues[38]["stroke"]==NULL)?'50':$radiusValues[38]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Oil Refineries</div>
															<div class="divTableCell" id="radiusOilrefineries"><input type="number" id="intervalOilrefineries" min="1" value='.(($radiusValues[39]["stroke"]==NULL)?'5':$radiusValues[39]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Parkway Bank</div>
															<div class="divTableCell" id="radiusParkway"><input type="number" id="intervalParkway" min="1" value='.(($radiusValues[40]["stroke"]==NULL)?'5':$radiusValues[40]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PFG / PFS</div>
															<div class="divTableCell" id="radiusKeHE"><input type="number" id="intervalPFGPSF" min="1" value='.(($radiusValues[41]["stroke"]==NULL)?'5':$radiusValues[41]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Plastic Surgery Solo</div>
															<div class="divTableCell" id="radiusPlasticSurgerySolo"><input type="number" id="intervalPlasticSurgerySolo" min="1" value='.(($radiusValues[42]["stroke"]==NULL)?'5':$radiusValues[42]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Plastic Surgery Group</div>
															<div class="divTableCell" id="radiusPlasticSurgeryGroup"><input type="number" id="intervalPlasticSurgeryGroup" min="1" value='.(($radiusValues[43]["stroke"]==NULL)?'5':$radiusValues[43]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Port Facility</div>
															<div class="divTableCell" id="radiusPort"><input type="number" id="intervalPort" min="1" value='.(($radiusValues[44]["stroke"]==NULL)?'1':$radiusValues[44]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Potbelly</div>
															<div class="divTableCell" id="radiusPotbelly"><input type="number" id="intervalPotbelly" min="1" value='.(($radiusValues[45]["stroke"]==NULL)?'3':$radiusValues[45]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Providers</div>
															<div class="divTableCell" id="radiusProviders"><input type="number" id="intervalProviders" min="1" value='.(($radiusValues[46]["stroke"]==NULL)?'5':$radiusValues[46]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Primary Care Facilities</div>
															<div class="divTableCell" id="radiusPrimary"><input type="number" id="intervalPrimary" min="1" value='.(($radiusValues[47]["stroke"]==NULL)?'1':$radiusValues[47]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Publix</div>
															<div class="divTableCell" id="radiusPublix"><input type="number" id="intervalPublix" min="1" value='.(($radiusValues[48]["stroke"]==NULL)?'1':$radiusValues[48]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Raising Cranes</div>
															<div class="divTableCell" id="radiusRaisingCanes"><input type="number" id="intervalRaisingCanes" min="1" value='.(($radiusValues[49]["stroke"]==NULL)?'5':$radiusValues[49]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Refrigerated Locations</div>
															<div class="divTableCell" id="radiusRefrigerated"><input type="number" id="intervalRefri" min="1" value='.(($radiusValues[50]["stroke"]==NULL)?'2':$radiusValues[50]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">RobinsonFresh</div>
															<div class="divTableCell" id="radiusRobinsonFresh"><input type="number" id="intervalRobinsonFresh" min="1" value='.(($radiusValues[51]["stroke"]==NULL)?'5':$radiusValues[51]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Shopping Centers</div>
															<div class="divTableCell" id="radiusShopping"><input type="number" id="intervalShopping" min="1" value='.(($radiusValues[52]["stroke"]==NULL)?'5':$radiusValues[52]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Starbucks</div>
															<div class="divTableCell" id="radiusStarbucks"><input type="number" id="intervalStarbucks" min="1" value='.(($radiusValues[53]["stroke"]==NULL)?'5':$radiusValues[53]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Store Closings</div>
															<div class="divTableCell" id="radiusInterchanges"><input type="number" id="intervalInterchanges" min="1" value='.(($radiusValues[54]["stroke"]==NULL)?'5':$radiusValues[54]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sygma</div>
															<div class="divTableCell" id="radiusSygma"><input type="number" id="intervalSygma" min="1" value='.(($radiusValues[55]["stroke"]==NULL)?'5':$radiusValues[55]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sysco</div>
															<div class="divTableCell" id="radiusSysco"><input type="number" id="intervalSysco" min="1" value='.(($radiusValues[56]["stroke"]==NULL)?'50':$radiusValues[56]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TA Petro</div>
															<div class="divTableCell" id="radiusTAPetro"><input type="number" id="intervalTAPetro" min="1" value='.(($radiusValues[57]["stroke"]==NULL)?'50':$radiusValues[57]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tartan Listings</div>
															<div class="divTableCell" id="radiusTartan"><input type="number" id="intervalTartan" min="1" value='.(($radiusValues[58]["stroke"]==NULL)?'5':$radiusValues[58]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Thornton</div>
															<div class="divTableCell" id="radiusThornton"><input type="number" id="intervalThornton" min="1" value='.(($radiusValues[59]["stroke"]==NULL)?'5':$radiusValues[59]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Toys R Us</div>
															<div class="divTableCell" id="radiusToysrus"><input type="number" id="intervalToysrus" min="1" value='.(($radiusValues[60]["stroke"]==NULL)?'1':$radiusValues[60]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Trader Joes</div>
															<div class="divTableCell" id="radiusTraderJoes"><input type="number" id="intervalTraderJoes" min="1" value='.(($radiusValues[61]["stroke"]==NULL)?'1':$radiusValues[61]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Transit Stops</div>
															<div class="divTableCell" id="radiusTransit"><input type="number" id="intervalTransit" min="1" value='.(($radiusValues[62]["stroke"]==NULL)?'1':$radiusValues[62]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tyson Food Plants</div>
															<div class="divTableCell" id="radiusTyson"><input type="number" id="intervalTyson" min="1" value='.(($radiusValues[63]["stroke"]==NULL)?'5':$radiusValues[63]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Uhaul</div>
															<div class="divTableCell" id="radiusUhaul"><input type="number" id="intervalUhaul" min="1" value='.(($radiusValues[64]["stroke"]==NULL)?'5':$radiusValues[64]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fortune</div>
															<div class="divTableCell" id="radiusFortune"><input type="number" id="intervalFortune" min="1" value='.(($radiusValues[65]["stroke"]==NULL)?'5':$radiusValues[65]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fairgrounds</div>
															<div class="divTableCell" id="radiusFairgrounds"><input type="number" id="intervalFairgrounds" min="1" value='.(($radiusValues[66]["stroke"]==NULL)?'5':$radiusValues[66]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PACA</div>
															<div class="divTableCell" id="radiusPACA"><input type="number" id="intervalPACA" min="1" value='.(($radiusValues[67]["stroke"]==NULL)?'5':$radiusValues[67]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Poultry</div>
															<div class="divTableCell" id="radiusPoultry"><input type="number" id="intervalPoultry" min="1" value='.(($radiusValues[68]["stroke"]==NULL)?'5':$radiusValues[68]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units A</div>
															<div class="divTableCell" id="radiusUnitsA"><input type="number" id="intervalUnitsA" min="1" value='.(($radiusValues[69]["stroke"]==NULL)?'5':$radiusValues[69]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units B</div>
															<div class="divTableCell" id="radiusUnitsB"><input type="number" id="intervalUnitsB" min="1" value='.(($radiusValues[70]["stroke"]==NULL)?'5':$radiusValues[70]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">USFoods</div>
															<div class="divTableCell" id="radiusUsf"><input type="number" id="intervalUsf" min="1" value='.(($radiusValues[71]["stroke"]==NULL)?'50':$radiusValues[71]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Vistar</div>
															<div class="divTableCell" id="radiusVistar"><input type="number" id="intervalVistar" min="1" value='.(($radiusValues[72]["stroke"]==NULL)?'5':$radiusValues[72]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Whole Foods</div>
															<div class="divTableCell" id="radiusWholeFoods"><input type="number" id="intervalWholeFoods" min="1" value='.(($radiusValues[73]["stroke"]==NULL)?'1':$radiusValues[73]["stroke"]).' max="200" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="saveRadius" type="button" class="btn" value="Update" onclick="updateRadius();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>										
										<div class="div-hand">
											<a data-toggle="collapse" href="#scalingData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Icon Scales</b>
											</a>
											<div id="scalingData" class="collapse">
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Dataset</div>
															<div class="divTableHead">Scale</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">Agencies</div>
															<div class="divTableCell"><input type="number" id="scaleAgencies" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Address Based</div>
															<div class="divTableCell"><input type="number" id="scaleCA" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Zip Based</div>
															<div class="divTableCell"><input type="number" id="scaleZA" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Airports</div>
															<div class="divTableCell"><input type="number" id="scaleAirport" min="0.01" value="0.25" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Albertsons</div>
															<div class="divTableCell"><input type="number" id="scaleAlbertsons" min="0.01" value="0.3" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Aldi Stores</div>
															<div class="divTableCell"><input type="number" id="scaleAldi" min="0.01" value="0.9" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Amazon</div>
															<div class="divTableCell"><input type="number" id="scaleAmazon" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ambulatory Surgical Centers</div>
															<div class="divTableCell"><input type="number" id="scaleAsc" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Biodiesel Plants</div>
															<div class="divTableCell"><input type="number" id="scaleBiodiesel" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Banks</div>
															<div class="divTableCell"><input type="number" id="scaleBank" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Brownfields</div>
															<div class="divTableCell"><input type="number" id="scaleBrownfields" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Community Gardens</div>
															<div class="divTableCell"><input type="number" id="scaleCommunityGardens" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Constellation Brands</div>
															<div class="divTableCell"><input type="number" id="scaleCbrands" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Credit Unions</div>
															<div class="divTableCell"><input type="number" id="scaleCreditUnions" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Culver</div>
															<div class="divTableCell"><input type="number" id="scaleCulver" min="0.01" value="0.05" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Dental Health</div>
															<div class="divTableCell"><input type="number" id="scaleDental" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Derma Solo</div>
															<div class="divTableCell"><input type="number" id="scaleDermaSolo" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Derma Group</div>
															<div class="divTableCell"><input type="number" id="scaleDermaGroup" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DHL</div>
															<div class="divTableCell"><input type="number" id="scaleDHL" min="0.01" value="1" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Dicks</div>
															<div class="divTableCell"><input type="number" id="scaleDicks" min="0.01" value="0.25" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Distributor</div>
															<div class="divTableCell"><input type="number" id="scaleDistributor" min="0.01" value="0.07" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA</div>
															<div class="divTableCell"><input type="number" id="scaleDMA" min="0.01" value="0.2" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA DCs</div>
															<div class="divTableCell"><input type="number" id="scaleDmaDcs" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Edward Jones</div>
															<div class="divTableCell"><input type="number" id="scaleEdwardJones" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Enterprise Buildings</div>
															<div class="divTableCell"><input type="number" id="scaleEnterpriseBuildings" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ethanol Plants</div>
															<div class="divTableCell"><input type="number" id="scaleEthanol" min="0.01" value="0.8" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fairgrounds</div>
															<div class="divTableCell"><input type="number" id="scaleFairgrounds" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Farmers Market</div>
															<div class="divTableCell"><input type="number" id="scaleFarmers" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fedex</div>
															<div class="divTableCell"><input type="number" id="scaleFedex" min="0.01" value="1" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Five Guys</div>
															<div class="divTableCell"><input type="number" id="scaleFiveGuys" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fortune</div>
															<div class="divTableCell"><input type="number" id="scaleFortune" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Freight Intersections</div>
															<div class="divTableCell"><input type="number" id="scaleFreight" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Giant Eagle</div>
															<div class="divTableCell"><input type="number" id="scaleGiantEagle" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grainger</div>
															<div class="divTableCell"><input type="number" id="scaleGrainger" min="0.01" value="0.8" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grocery Stores</div>
															<div class="divTableCell"><input type="number" id="scaleStores" min="0.01" value="1" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Gymboree</div>
															<div class="divTableCell"><input type="number" id="scaleGymboree" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Homemade Shelters</div>
															<div class="divTableCell"><input type="number" id="scaleShelter" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hospitals</div>
															<div class="divTableCell"><input type="number" id="scaleHospitals" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hot Springs</div>
															<div class="divTableCell"><input type="number" id="scaleHotSprings" min="0.01" value="0.3" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hydroponics</div>
															<div class="divTableCell"><input type="number" id="scaleHydroponics" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Interchanges</div>
															<div class="divTableCell"><input type="number" id="scaleCrossing" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Intermodal Sites</div>
															<div class="divTableCell"><input type="number" id="scaleIana" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Keef</div>
															<div class="divTableCell"><input type="number" id="scaleKeef" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">KeHE Distributors</div>
															<div class="divTableCell"><input type="number" id="scaleKeHE" min="0.01" value="0.3" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Kroger</div>
															<div class="divTableCell"><input type="number" id="scaleKroger" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Land Banks</div>
															<div class="divTableCell"><input type="number" id="scaleLandBanks" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Major US Ports</div>
															<div class="divTableCell"><input type="number" id="scalePorts" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Manmade</div>
															<div class="divTableCell"><input type="number" id="scaleManmade" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Mental Health</div>
															<div class="divTableCell"><input type="number" id="scaleMental" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">McLane</div>
															<div class="divTableCell"><input type="number" id="scaleMclane" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Natural</div>
															<div class="divTableCell"><input type="number" id="scaleNatural" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Network Buildings</div>
															<div class="divTableCell"><input type="number" id="scaleNetworkBuildings" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">NGP Operators</div>
															<div class="divTableCell"><input type="number" id="scaleNGPOperators" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Oil Refineries</div>
															<div class="divTableCell"><input type="number" id="scaleOilrefineries" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PACA</div>
															<div class="divTableCell"><input type="number" id="scalePACA" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Parkway Bank</div>
															<div class="divTableCell"><input type="number" id="scaleParkway" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PFG / PFS</div>
															<div class="divTableCell"><input type="number" id="scalePFGPSF" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Plastic Surgery Solo</div>
															<div class="divTableCell"><input type="number" id="scalePlasticSurgerySolo" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Plastic Surgery Group</div>
															<div class="divTableCell"><input type="number" id="scalePlasticSurgeryGroup" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Port Facility</div>
															<div class="divTableCell"><input type="number" id="scalePort" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Potbelly</div>
															<div class="divTableCell"><input type="number" id="scalePotbelly" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Poultry</div>
															<div class="divTableCell"><input type="number" id="scalePoultry" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Providers</div>
															<div class="divTableCell"><input type="number" id="scaleProviders" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Primary Care Facilities</div>
															<div class="divTableCell"><input type="number" id="scalePrimary" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Publix</div>
															<div class="divTableCell"><input type="number" id="scalePublix" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Raising Cranes</div>
															<div class="divTableCell"><input type="number" id="scaleRaisingCanes" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ranches & Farms</div>
															<div class="divTableCell"><input type="number" id="scaleRanches" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Retailers (sample)</div>
															<div class="divTableCell"><input type="number" id="scaleRetailers" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">R&F Locations</div>
															<div class="divTableCell"><input type="number" id="scaleRefri" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">RobinsonFresh</div>
															<div class="divTableCell"><input type="number" id="scaleRobinsonFresh" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Starbucks</div>
															<div class="divTableCell"><input type="number" id="scaleStarbucks" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Schools CCD Primary</div>
															<div class="divTableCell"><input type="number" id="scalePrimary" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Schools PSS Private</div>
															<div class="divTableCell"><input type="number" id="scalePrivate" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Shopping Centers</div>
															<div class="divTableCell"><input type="number" id="scaleShopping" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Store Closings</div>
															<div class="divTableCell"><input type="number" id="scaleLogos" min="0.01" value="0.4" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Stores Logo</div>
															<div class="divTableCell"><input type="number" id="scaleDistributor" min="0.01" value="0.07" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sygma</div>
															<div class="divTableCell"><input type="number" id="scaleSygma" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sysco</div>
															<div class="divTableCell"><input type="number" id="scaleSysco" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TA Petro</div>
															<div class="divTableCell"><input type="number" id="scaleTAPetro" min="0.01" value="0.2" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tartan Listings</div>
															<div class="divTableCell"><input type="number" id="scaleTartan" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Thornton</div>
															<div class="divTableCell"><input type="number" id="scaleThornton" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Toys R Us</div>
															<div class="divTableCell"><input type="number" id="scaleToysrus" min="0.01" value="0.6" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Trader Joes</div>
															<div class="divTableCell"><input type="number" id="scaleTraderJoes" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Transit Stops</div>
															<div class="divTableCell"><input type="number" id="scaleTransit" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Transit Stations</div>
															<div class="divTableCell"><input type="number" id="scaleTransitStations" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tyson Food Plants</div>
															<div class="divTableCell"><input type="number" id="scaleTyson" min="0.01" value="0.08" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Uhaul</div>
															<div class="divTableCell"><input type="number" id="scaleUhaul" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units A</div>
															<div class="divTableCell"><input type="number" id="scaleUnitsA" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units B</div>
															<div class="divTableCell"><input type="number" id="scaleUnitsB" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">UPS</div>
															<div class="divTableCell"><input type="number" id="scaleUPS" min="0.01" value="1" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">US Foods</div>
															<div class="divTableCell"><input type="number" id="scaleUsf" min="0.01" value="0.7" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Vistar</div>
															<div class="divTableCell"><input type="number" id="scaleVistar" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Whole Foods</div>
															<div class="divTableCell"><input type="number" id="scaleWholeFoods" min="0.01" value="0.5" max="5" step="0.1" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="updateScale" type="button" class="btn" value="Update" onclick="updateStyle();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#borderiesLabelsData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Boundaries Labels</b>
											</a>
											<div id="borderiesLabelsData" class="collapse">
												<h5><b>Boundaries Datasets Border Style:</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Boundary</div>
															<div class="divTableHead">Font Size</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">States</div>
															<div class="divTableCell"><input type="number" id="labelStates" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Counties</div>
															<div class="divTableCell"><input type="number" id="labelCounties" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Cities</div>
															<div class="divTableCell"><input type="number" id="labelCities" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Districts</div>
															<div class="divTableCell"><input type="number" id="labelDistricts" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Commuter Regions</div>
															<div class="divTableCell"><input type="number" id="labelCommuterRegions" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Geographic (Regions)</div>
															<div class="divTableCell"><input type="number" id="labelRegions" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Megaregion</div>
															<div class="divTableCell"><input type="number" id="labelMegaregion" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">HRR</div>
															<div class="divTableCell"><input type="number" id="labelHRR" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">HSA</div>
															<div class="divTableCell"><input type="number" id="labelHSA" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PCSA</div>
															<div class="divTableCell"><input type="number" id="labelPCSA" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">CCD</div>
															<div class="divTableCell"><input type="number" id="labelCCD" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">SCSD</div>
															<div class="divTableCell"><input type="number" id="labelSCSD" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">STR Coverage</div>
															<div class="divTableCell"><input type="number" id="labelSTR" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Zip Codes</div>
															<div class="divTableCell"><input type="number" id="labelZip" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Cultural Regions</div>
															<div class="divTableCell"><input type="number" id="labelCR" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Neighborhoods</div>
															<div class="divTableCell"><input type="number" id="labelNeighbour" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Refrigerated</div>
															<div class="divTableCell"><input type="number" id="labelRefrigerated" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Food Regions (5)</div>
															<div class="divTableCell"><input type="number" id="labelRFF" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Food Regions (10)</div>
															<div class="divTableCell"><input type="number" id="labelFRT" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tribal Nation Lands (US)</div>
															<div class="divTableCell"><input type="number" id="labelTribal" min="2" value="20" step="2" max="30" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="saveBorder" type="button" class="btn" value="Update" onclick="updateStroke();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#borderiesData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Boundaries Styling</b>
											</a>
											<div id="borderiesData" class="collapse">
												<h5><b>Boundaries Datasets Border Style:</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Boundary</div>
															<div class="divTableHead">Color</div>
															<div class="divTableHead">Type</div>
															<div class="divTableHead">Stroke</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">AG Districts</div>
															<div class="divTableCell">
																<input type="text" id="borderAG" value="rgba(127, 212, 255, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/ag.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeagdistrict" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agency Service Bounds</div>
															<div class="divTableCell">
																<input type="text" id="borderASB" value="rgba(43, 106, 139, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/asb.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeasb" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">BEA10</div>
															<div class="divTableCell">
																<input type="text" id="borderBEA" value="rgba(0, 255, 0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokebea10" min="0.5" value='.(($borderValues[0]["stroke"]==NULL)?'0.5':$borderValues[0]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">CBSA10</div>
															<div class="divTableCell">
																<input type="text" id="borderCBSA" value="rgba(255, 0, 42, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokecbsa10" min="0.5" value='.(($borderValues[0]["stroke"]==NULL)?'0.5':$borderValues[0]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">City</div>
															<div class="divTableCell">
																<input type="text" id="borderCity" value="rgba(243, 110, 33, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/cities.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeCity" min="0.5" value='.(($borderValues[0]["stroke"]==NULL)?'0.5':$borderValues[0]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Consumer Market</div>
															<div class="divTableCell">
																<input type="text" id="borderCMB" value="rgba(42, 64, 42, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeConsumermarketboundaries" min="0.5" value='.(($borderValues[1]["stroke"]==NULL)?'0.5':$borderValues[1]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">County</div>
															<div class="divTableCell">
																<input type="text" id="borderCounties" value="rgba(164, 109, 5, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/counties.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeCounty" min="0.5" value='.(($borderValues[1]["stroke"]==NULL)?'0.5':$borderValues[1]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">ERS10</div>
															<div class="divTableCell">
																<input type="text" id="borderERS" value="rgba(255, 255, 0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeers10" min="0.5" value='.(($borderValues[0]["stroke"]==NULL)?'0.5':$borderValues[0]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">ERS10REP</div>
															<div class="divTableCell">
																<input type="text" id="borderERSRep" value="rgba(0, 255, 255, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeers10rep" min="0.5" value='.(($borderValues[0]["stroke"]==NULL)?'0.5':$borderValues[0]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hospital Referral Regions (HRRs)</div>
															<div class="divTableCell">
																<input type="text" id="borderHRR" value="rgba(60, 171, 219, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/hrr.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeHrr" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hospital Service Areas (HSAs)</div>
															<div class="divTableCell">
																<input type="text" id="borderHSA" value="rgba(89, 91, 212, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/hsa.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeHsa" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Metropolitan Planning Organizations</div>
															<div class="divTableCell">
																<input type="text" id="borderMPO" value="rgba(193, 194, 174, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/mpo.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeMPO" min="0.5" value='.(($borderValues[4]["stroke"]==NULL)?'2':$borderValues[4]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">MSAs</div>
															<div class="divTableCell">
																<input type="text" id="borderMSA" value="rgba(114, 42, 120, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/msa.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeMsa" min="0.5" value='.(($borderValues[4]["stroke"]==NULL)?'2':$borderValues[4]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Neighborhood</div>
															<div class="divTableCell">
																<input type="text" id="borderNeig" value="rgba(237, 2, 140, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/neighbor.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeNeighbor" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Opportunity Zones</div>
															<div class="divTableCell">
																<input type="text" id="borderOZ" value="rgba(0, 0, 0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeOpporZones" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PEA10</div>
															<div class="divTableCell">
																<input type="text" id="borderPEA" value="rgba(0, 127, 255, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokepea10" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Primary Care Service Areas (PCSAs)</div>
															<div class="divTableCell">
																<input type="text" id="borderPCSA" value="rgba(253, 50, 89, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/pcsa.png" /></div>
															<div class="divTableCell"><input type="number" id="strokePcsa" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Political District</div>
															<div class="divTableCell">
																<input type="text" id="borderPD" value="rgba(0, 165, 79, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/district.png" /></div>
															<div class="divTableCell"><input type="number" id="strokePDistrict" min="0.5" value='.(($borderValues[6]["stroke"]==NULL)?'0.5':$borderValues[6]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Region</div>
															<div class="divTableCell">
																<input type="text" id="borderReg" value="rgba(250, 175, 24, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/region.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeRegion" min="0.5" value='.(($borderValues[7]["stroke"]==NULL)?'0.5':$borderValues[7]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">State</div>
															<div class="divTableCell">
																<input type="text" id="borderState" value="rgba(0, 0, 0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeState" min="0.5" value='.(($borderValues[8]["stroke"]==NULL)?'0.5':$borderValues[8]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TP10</div>
															<div class="divTableCell">
																<input type="text" id="borderTP10" value="rgba(142, 171, 142, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="stroketp10" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TP10METRO</div>
															<div class="divTableCell">
																<input type="text" id="borderTP10Metro" value="rgba(195, 195, 195, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="stroketp10metro" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TP10MICRO</div>
															<div class="divTableCell">
																<input type="text" id="borderTP10Micro" value="rgba(212, 255, 0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/states.png" /></div>
															<div class="divTableCell"><input type="number" id="stroketp10micro" min="0.5" value='.(($borderValues[5]["stroke"]==NULL)?'0.5':$borderValues[5]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Zip Code</div>
															<div class="divTableCell">
																<input type="text" id="borderZip" value="rgba(0, 174, 239, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/zip.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeZip" min="0.5" value='.(($borderValues[10]["stroke"]==NULL)?'0.5':$borderValues[10]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Zoning Counties Boundaries</div>
															<div class="divTableCell">
																<input type="text" id="borderZCounties" value="rgba(255,0,0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/counties.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeZoningCounty" min="0.5" value='.(($borderValues[10]["stroke"]==NULL)?'0.5':$borderValues[10]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Zoning Cities Boundaries</div>
															<div class="divTableCell">
																<input type="text" id="borderZCities" value="rgba(255,0,0, 1)" data-color-format="hex" class="colorTxt">
															</div>
															<div class="divTableCell"><img src="images/Legend/cities.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeZoningCity" min="0.5" value='.(($borderValues[10]["stroke"]==NULL)?'0.5':$borderValues[10]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="saveBorder" type="button" class="btn" value="Update" onclick="updateStroke();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#transportData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Transport Styling</b>
											</a>
											<div id="transportData" class="collapse">
												<h5><b>Transport Datasets Border Style:</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Boundary</div>
															<div class="divTableHead">Color</div>
															<div class="divTableHead">Type</div>
															<div class="divTableHead">Stroke</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">Data Fiber</div>
															<div class="divTableCell"></div>
															<div class="divTableCell"><img src="images/Legend/metrobackbone.png" /><br><img src="images/Legend/metrolateral.png" /><br><img src="images/Legend/canadalonghaulnetwork.png" /><br><img src="images/Legend/longhaulnetwork.png" /><br><img src="images/Legend/ownedlonghaulnetwork.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeDataFiber" min="0.5" value='.(($borderValues[2]["stroke"]==NULL)?'0.5':$borderValues[2]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Freight Carriers / Line</div>
															<div class="divTableCell"><div style="height: 20px; width: 20px; margin-left: 10px; margin-top: 5px; float: left; background-color:#F89319;"></div></div>
															<div class="divTableCell"><img src="images/Legend/freight.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeFreight" min="0.5" value='.(($borderValues[2]["stroke"]==NULL)?'0.5':$borderValues[2]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Highway Network</div>
															<div class="divTableCell"><div style="height: 20px; width: 20px; margin-left: 10px; margin-top: 5px; float: left; background-color:#AA3333;"></div></div>
															<div class="divTableCell"><img src="images/Legend/highway.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeHighway" min="0.5" value='.(($borderValues[3]["stroke"]==NULL)?'0.5':$borderValues[3]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Transit Network</div>
															<div class="divTableCell"><div style="height: 20px; width: 20px; margin-left: 10px; margin-top: 5px; float: left; background-color:#FF4CA6;"></div></div>
															<div class="divTableCell"><img src="images/Legend/transit.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeTransit" min="0.5" value='.(($borderValues[9]["stroke"]==NULL)?'0.5':$borderValues[9]["stroke"]).' step="0.5" max="10" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="saveBorder" type="button" class="btn" value="Update" onclick="updateStroke();" /></div>
														</div>
													</div>
												</div>
												<h5><b>Boundary Datasets Transparency:</h5></b>
												<div id="iptTransportOpacity"><div id="tpthandle" class="ui-slider-handle"></div></div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#clusterData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Cluster Distance</b>
											</a>
											<div id="clusterData" class="collapse">
												<h5><b>(Minimum: 1 & Maximum: 200)</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Dataset</div>
															<div class="divTableHead">Radius (Miles)</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">Agencies</div>
															<div class="divTableCell" id="clusterAgencies"><input type="number" id="clusterIntAgencies" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Address Based</div>
															<div class="divTableCell" id="clusterCA"><input type="number" id="clusterIntCA" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Agent Locations - Zip Based</div>
															<div class="divTableCell" id="clusterZA"><input type="number" id="clusterIntZA" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Airports</div>
															<div class="divTableCell" id="clusterAirport"><input type="number" id="clusterIntAirport" min="1" value="15" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Albertsons</div>
															<div class="divTableCell" id="clusterAlbertsons"><input type="number" id="clusterIntAlbertsons" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Aldi Stores</div>
															<div class="divTableCell" id="clusterAldi"><input type="number" id="clusterIntAldi" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Amazon</div>
															<div class="divTableCell" id="clusterAmazon"><input type="number" id="clusterIntAmazon" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Banks</div>
															<div class="divTableCell" id="clusterBank"><input type="number" id="clusterIntBank" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Biodiesel Plants</div>
															<div class="divTableCell" id="clusterBiodieselplants"><input type="number" id="clusterIntBiodieselplants" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Brownfields</div>
															<div class="divTableCell" id="clusterBrownfields"><input type="number" id="clusterIntBrownfields" min="1" value="100" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Credit Unions</div>
															<div class="divTableCell" id="clusterCreditUnions"><input type="number" id="clusterIntCreditUnions" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Culver</div>
															<div class="divTableCell" id="clusterCulver"><input type="number" id="clusterIntCulver" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DHL</div>
															<div class="divTableCell" id="clusterDHL"><input type="number" id="clusterIntDHL" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Dicks</div>
															<div class="divTableCell" id="clusterDicks"><input type="number" id="clusterIntDicks" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Distributor</div>
															<div class="divTableCell" id="clusterDistributor"><input type="number" id="clusterIntDistributor" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA</div>
															<div class="divTableCell" id="clusterDMA"><input type="number" id="clusterIntDMA" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">DMA DCs</div>
															<div class="divTableCell" id="clusterDmaDcs"><input type="number" id="clusterIntDmaDcs" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Edward Jones</div>
															<div class="divTableCell" id="clusterEdwardJones"><input type="number" id="clusterIntEdwardJones" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ethanol Plants</div>
															<div class="divTableCell" id="clusterEthanol"><input type="number" id="clusterIntEthanol" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Farmers Market</div>
															<div class="divTableCell" id="clusterFarmers"><input type="number" id="clusterIntFarmers" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fedex</div>
															<div class="divTableCell" id="clusterFedex"><input type="number" id="clusterIntFedex" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Five Guys</div>
															<div class="divTableCell" id="clusterFiveGuys"><input type="number" id="clusterIntFiveGuys" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Freight Intersections</div>
															<div class="divTableCell" id="clusterFreight"><input type="number" id="clusterIntFreight" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Garden</div>
															<div class="divTableCell" id="clusterGarden"><input type="number" id="clusterIntGarden" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Giant Eagle</div>
															<div class="divTableCell" id="clusterGiantEagle"><input type="number" id="clusterIntGiantEagle" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grainger</div>
															<div class="divTableCell" id="clusterGrainger"><input type="number" id="clusterIntGrainger" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Grocery Stores</div>
															<div class="divTableCell" id="clusterStores"><input type="number" id="clusterIntStores" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Gymboree</div>
															<div class="divTableCell" id="clusterGymboree"><input type="number" id="clusterIntGymboree" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Homemade Shelters</div>
															<div class="divTableCell" id="clusterShelter"><input type="number" id="clusterIntShelter" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hot Springs</div>
															<div class="divTableCell" id="clusterHotSprings"><input type="number" id="clusterIntHotSprings" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Hydroponics</div>
															<div class="divTableCell" id="clusterHydroponics"><input type="number" id="clusterIntHydroponics" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Interchanges</div>
															<div class="divTableCell" id="clusterCrossing"><input type="number" id="clusterIntCrossing" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Intermodal Sites</div>
															<div class="divTableCell" id="clusterIana"><input type="number" id="clusterIntIana" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Keef</div>
															<div class="divTableCell" id="clusterKeef"><input type="number" id="clusterIntKeef" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">KeHE Distributors</div>
															<div class="divTableCell" id="clusterKeHE"><input type="number" id="clusterIntKeHE" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Kroger</div>
															<div class="divTableCell" id="clusterKroger"><input type="number" id="clusterIntKroger" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Land Banks</div>
															<div class="divTableCell" id="clusterLandBanks"><input type="number" id="clusterIntLandBanks" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Major US Ports</div>
															<div class="divTableCell" id="clusterPorts"><input type="number" id="clusterIntPorts" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Manmade</div>
															<div class="divTableCell" id="clusterManmade"><input type="number" id="clusterIntManmade" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">McLane</div>
															<div class="divTableCell" id="clusterMclane"><input type="number" id="clusterIntMclane" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Natural</div>
															<div class="divTableCell" id="clusterNatural"><input type="number" id="clusterIntNatural" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Oil Refineries</div>
															<div class="divTableCell" id="clusterOilrefineries"><input type="number" id="clusterIntOilrefineries" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Parkway Bank</div>
															<div class="divTableCell" id="clusterParkway"><input type="number" id="clusterIntParkway" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Port Facility</div>
															<div class="divTableCell" id="clusterPort"><input type="number" id="clusterIntPort" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Potbelly</div>
															<div class="divTableCell" id="clusterPotbelly"><input type="number" id="clusterIntPotbelly" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Primary Schools</div>
															<div class="divTableCell" id="clusterPrimary"><input type="number" id="clusterIntPrimary" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PFG / PFS</div>
															<div class="divTableCell" id="clusterPfgpfs"><input type="number" id="clusterIntPfgpfs" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PSS Private</div>
															<div class="divTableCell" id="clusterPss"><input type="number" id="clusterIntPss" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Publix</div>
															<div class="divTableCell" id="clusterPublix"><input type="number" id="clusterIntPublix" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Raising Cranes</div>
															<div class="divTableCell" id="clusterRaisingCranes"><input type="number" id="clusterIntRaisingCranes" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Ranches & Farms</div>
															<div class="divTableCell" id="clusterRanches"><input type="number" id="clusterIntRanches" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Refrigerated Locations</div>
															<div class="divTableCell" id="clusterRefrigerated"><input type="number" id="clusterIntRefri" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">RobinsonFresh</div>
															<div class="divTableCell" id="clusterRobinsonFresh"><input type="number" id="clusterIntRobinsonFresh" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sears</div>
															<div class="divTableCell" id="clusterSears"><input type="number" id="clusterIntSears" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Shopping Centers</div>
															<div class="divTableCell" id="clusterShopping"><input type="number" id="clusterIntShopping" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Store Closings</div>
															<div class="divTableCell" id="clusterInterchanges"><input type="number" id="clusterIntInterchanges" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Starbucks</div>
															<div class="divTableCell" id="clusterStarbucks"><input type="number" id="clusterIntStarbucks" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Store Logos</div>
															<div class="divTableCell" id="clusterLogo"><input type="number" id="clusterIntLogo" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sygma</div>
															<div class="divTableCell" id="clusterSygma"><input type="number" id="clusterIntSygma" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Sysco</div>
															<div class="divTableCell" id="clusterSysco"><input type="number" id="clusterIntSysco" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tartan Listings</div>
															<div class="divTableCell" id="clusterTartan"><input type="number" id="clusterIntTartan" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">TA Petro</div>
															<div class="divTableCell" id="clusterTAPetro"><input type="number" id="clusterIntTAPetro" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Thornton</div>
															<div class="divTableCell" id="clusterThornton"><input type="number" id="clusterIntThornton" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Toys R Us</div>
															<div class="divTableCell" id="clusterToys"><input type="number" id="clusterIntToys" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Trader Joe\'s</div>
															<div class="divTableCell" id="clusterTraderJoes"><input type="number" id="clusterIntTraderJoes" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Traffic Counts</div>
															<div class="divTableCell" id="clusterTraffic"><input type="number" id="clusterIntTraffic" min="1" value="50" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Transit Stops</div>
															<div class="divTableCell" id="clusterTransit"><input type="number" id="clusterIntTransit" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Tyson Food Plants</div>
															<div class="divTableCell" id="clusterTyson"><input type="number" id="clusterIntTyson" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Uhaul</div>
															<div class="divTableCell" id="clusterUhaul"><input type="number" id="clusterIntUhaul" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units A</div>
															<div class="divTableCell" id="clusterUnitsA"><input type="number" id="clusterIntUnitsA" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Units B</div>
															<div class="divTableCell" id="clusterUnitsB"><input type="number" id="clusterIntUnitsB" min="1" value="20" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Poultry</div>
															<div class="divTableCell" id="clusterPoultry"><input type="number" id="clusterIntPoultry" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">PACA</div>
															<div class="divTableCell" id="clusterPACA"><input type="number" id="clusterIntPACA" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fairgrounds</div>
															<div class="divTableCell" id="clusterFairgrounds"><input type="number" id="clusterIntFairgrounds" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Fortune</div>
															<div class="divTableCell" id="clusterFortune"><input type="number" id="clusterIntFortune" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">UPS</div>
															<div class="divTableCell" id="clusterUPS"><input type="number" id="clusterIntUPS" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">USFoods</div>
															<div class="divTableCell" id="clusterUsf"><input type="number" id="clusterIntUsf" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Vistar</div>
															<div class="divTableCell" id="clusterVistar"><input type="number" id="clusterIntVistar" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Whole Foods</div>
															<div class="divTableCell" id="clusterWholeFoods"><input type="number" id="clusterIntWholeFoods" min="1" value="30" max="200" class="underLineText" /></div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input type="button" class="btn" value="Update" onclick="updateCluster();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a data-toggle="collapse" href="#iconsData" aria-expanded="true" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Icons</b>
											</a>
											<div id="iconsData" class="collapse">
												<div class="tabs">
													<div class="tab">
														<input type="radio" id="chkIcon" name="iconsControls" '.(($projectValues[0]["selectedIcon"]==='1')?'checked':"checked").'>
														<label style="border-radius: 10px 0px 0px 10px;" for="chkIcon">Icon(s)</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkLogo" name="iconsControls" '.(($projectValues[0]["selectedIcon"]==='2')?'checked':"").'>
														<label class="lblVorCntrls" for="chkLogo">Logo(s)</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkCluster" name="iconsControls" '.(($projectValues[0]["selectedIcon"]==='3')?'checked':"").'>
														<label class="lblVorCntrls" for="chkCluster">Cluster</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkVoronoi" name="iconsControls" '.(($projectValues[0]["selectedIcon"]==='4')?'checked':"").'>
														<label class="lblVorCntrls" for="chkVoronoi">Voronoi</label>
													</div>
													<div class="tab">
														<input type="radio" id="chkHybrid" name="iconsControls" '.(($projectValues[0]["selectedIcon"]==='5')?'checked':"").'>
														<label style="border-radius: 0px 10px 10px 0px; border-right: 1px solid #26A69A;" class="lblVorCntrls" for="chkHybrid">Hybrid</label>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#divSaveProject" aria-expanded="false" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Projects</b>
											</a>
											<div id="divSaveProject" class="collapse">
												<h5><b>Save Current Work:</h5></b>
												<input id="saveProject" type="button" class="btn" value="Save Now" />
												<input id="resetProject" type="button" class="btn" style="background-color:red;" value="Reset Project" />
												<h5><b>  Select (and Load) a Saved Project:</h5></b>
												<!--<span id="saveTime">'.(($projectValues[0]["latest"]==NULL)?'No record Found':$projectValues[0]["latest"]).'</span>-->
												<select id="projects" title="List of saved projects" data-show-subtext="true" class="selectpicker show-tick" onchange="loadProject();">
												<option value="none" selected>None</option>
												</select>
												<input id="delProject" type="button" class="btn" style="background-color:red;" value="Delete Project" />
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#layersReorder" aria-expanded="false" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Layers</b>
											</a>
											<div id="layersReorder" class="collapse">
												<div class="external layerSwitcher"></div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#voronoiSettings" aria-expanded="false" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Voronoi</b>
											</a>
											<div id="voronoiSettings" class="collapse">
												
												<h5><b>Boundaries Datasets Border Style:</h5></b>
												<div class="divTable paleBlueRows">
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">Type</div>
															<div class="divTableHead">Color</div>
															<div class="divTableHead">Stroke</div>
														</div>
													</div>
													<div class="divTableBody">
														<div class="divTableRow">
															<div class="divTableCell">Line Stroke</div>
															<div class="divTableCell"><img src="images/Legend/voronoi.png" /></div>
															<div class="divTableCell"><input type="number" id="strokeVoronoi" min="0.5" value="2" step="0.5" max="10" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Polygons Color</div>
															<div id="divMaskColor">
																<input type="text" id="voronoiPolygon" value="rgba(255,0,0,0.4)" data-color-format="hex">
															</div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Second Polygons Color</div>
															<div id="divMaskColor">
																<input type="text" id="voronoiPolygonTwo" value="rgba(0,0,255,0.4)" data-color-format="hex">
															</div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Pin Size</div>
															<div class="divTableCell">
																<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve"><path fill="#FF0000" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/><circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>
															</div>
															<div class="divTableCell"><input type="number" id="strokePin" min="10" value="35" step="1" max="200" class="underLineText" /></div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Pin Color</div>
															<div class="divTableCell">
																<input type="text" id="voronoiPin" value="#ff0000" data-color-format="hex">
															</div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Second Pin Color</div>
															<div class="divTableCell">
																<input type="text" id="voronoiPinTwo" value="#0000ff" data-color-format="hex">
															</div>
														</div>
														<div class="divTableRow">
															<div class="divTableCell">Pin Circle Color</div>
															<div class="divTableCell">
																<input type="text" id="voronoiPinCircle" value="#FFFFFF" data-color-format="hex">
															</div>
														</div>
													</div>
													<div class="divTableHeading">
														<div class="divTableRow">
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead">&nbsp;</div>
															<div class="divTableHead"><input id="saveBorder" type="button" class="btn" value="Update" onclick="updateStroke();" /></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#crosswalksSettings" aria-expanded="false" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Crosswalks</b>
											</a>
											<div id="crosswalksSettings" class="collapse">
												<h5><b style="color: #51b4ac;">Boundaries Labels </b></h5>
												<div class="onoffswitch">
													<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchLabelsCR" onchange="changeLabelsCR($(this).prop(\'checked\')?\'on\':\'off\')">
													<label class="onoffswitch-label" for="switchLabelsCR"></label>
												</div>
												<h5><b style="color: #51b4ac;"> Crosswalk Labels </b></h5>
												<div class="onoffswitch">
													<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchOverlay" onchange="toggleOverlay($(this).prop(\'checked\')?\'on\':\'off\')">
													<label class="onoffswitch-label" for="switchOverlay"></label>
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
										<div class="div-hand">
											<a id="aLeg" data-toggle="collapse" href="#withinRadiusSettings" aria-expanded="false" class="collapsed">
												<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Datasets Within Radius</b>
											</a>
											<div id="withinRadiusSettings" class="collapse">
												<h5><b> Select request type: </b></h5>
												<select id="selRadius" class="selectpicker show-tick show-tick dropup" data-dropup-auto="false" onchange="selRadiusChange()">
													<option value="none" selected>None</option>
													<option value="within">Find Data Within Radius</option>
													<option value="sql">Perform SQL Joins</option>
												</select>
												<div id="dvSelWithin">
													<h5><b> Select dataset to find: </b></h5>
													<select id="selWithinRadius" class="selectpicker show-tick dropup" data-dropup-auto="false">
														<option value="agencies">Agencies</option>
														<option value="agent_ca">Agent Locations - Address Based</option>
														<option value="agent_za">Agent Locations - Zip Based</option>
														<option value="airports">Airports</option>
														<option value="albertsons">Albertsons</option>
														<option value="Aldi Stores (2016)">Aldi Stores</option>
														<option value="aldi_2016_closed">Aldi Stores (Now Closed)</option>
														<option value="aldi_2018">Aldi Stores (2018)</option>
														<option value="aldi_2018_new">Aldi Stores (Newly Opened)</option>
														<option value="amazon">Amazon</option>
														<option value="asc">Ambulatory Surgical Centers</option>
														<option value="biodiesel_plants">Biodiesel Plants</option>
														<option value="banks_2012">Banks - 2012</option>
														<option value="banks_2016">Banks - 2016</option>
														<option value="banks_2017">Banks - 2017</option>
														<option value="brownfields">Brownfields</option>
														<option value="gardens">Community Gardens</option>
														<option value="cbrands">Constellation Brands</option>
														<option value="creditunions">Credit Unions</option>
														<option value="culver">Culver</option>
														<option value="dentalfacilities">Dental Health</option>
														<option value="dermasolo">Derma Solo</option>
														<option value="dermagroup">Derma Group</option>
														<option value="dhl">DHL</option>
														<option value="dicks">Dicks</option>
														<option value="distributor">Distributor</option>
														<option value="dma">DMA</option>
														<option value="dmadcs">DMA DCs</option>
														<option value="edwardjones">Edward Jones</option>
														<option value="enterprisebuildings">Enterprise Buildings</option>
														<option value="ethanol_plants">Ethanol Plants</option>
														<option value="fairgrounds">Fairgrounds</option>
														<option value="farmers">Farmers Market</option>
														<option value="fedex">Fedex</option>
														<option value="fiveguys">Five Guys</option>
														<option value="fortune">Fortune</option>
														<option value="freightintersects">Freight Intersections</option>
														<option value="gianteagle">Giant Eagle</option>
														<option value="grainger">Grainger</option>
														<option value="stores">Grocery Stores</option>
														<option value="gymboree">Gymboree</option>
														<option value="homemade_shelters">Homemade Shelters</option>
														<option value="Hospitals_Speciality">Hospitals</option>
														<option value="hot_springs">Hot Springs</option>
														<option value="hydroponic_growers">Hydroponics</option>
														<option value="interchanges">Interchanges</option>
														<option value="iana">Intermodal Sites</option>
														<option value="keef">Keef</option>
														<option value="kehe">KeHE Distributors</option>
														<option value="kroger">Kroger</option>
														<option value="landbanks">Land Banks</option>
														<option value="ports">Major US Ports</option>
														<option value="names_manmade">Manmade</option>
														<option value="names_manmade_destinations Destinations">Manmade</option>
														<option value="names_manmade_faith Faith-based">Manmade</option>
														<option value="names_manmade_govt_places Government Places">Manmade</option>
														<option value="names_manmade_infrastructure">Manmade Infrastructure</option>
														<option value="names_manmade_public_spaces">Manmade Public Spaces</option>
														<option value="names_manmade_retail_prices">Manmade Retail Places</option>
														<option value="mentalfacilities">Mental Health</option>
														<option value="mclane">McLane</option>
														<option value="names_natural">Natural</option>
														<option value="networkbuildings">Network Buildings</option>
														<option value="strcentroids">NGP Policies</option>
														<option value="oil_refineries">Oil Refineries</option>
														<option value="paca">PACA</option>
														<option value="parkway">Parkway Bank</option>
														<option value="pfgpfs">PFG / PFS</option>
														<option value="plasticsurgerysolo">Plastic Surgery Solo</option>
														<option value="plasticsurgerygroup">Plastic Surgery Group</option>
														<option value="port_facility">Port Facility</option>
														<option value="potbelly">Potbelly</option>
														<option value="potbellytwo">Potbelly Two</option>
														<option value="poultryfacilities">Poultry</option>
														<option value="providers">Providers</option>
														<option value="primaryfacilities">Primary Care Facilities</option>
														<option value="publix">Publix</option>
														<option value="raisingcanes">Raising Cranes</option>
														<option value="ranchesandfarms">Ranches & Farms</option>
														<option value="logos">Retailers (sample)</option>
														<option value="refrigeratedlocations">R&F Locations</option>
														<option value="robinsonfresh">RobinsonFresh</option>
														<option value="closings">Sears</option>
														<option value="starbucks">Starbucks</option>
														<option value="schools_ccd_primary">Schools CCD Primary</option>
														<option value="schools_pss_private">Schools PSS Private</option>
														<option value="shoppingcenter">Shopping Centers</option>
														<option value="sygma">Sygma</option>
														<option value="sysco">Sysco</option>
														<option value="tapetro">TA Petro</option>
														<option value="tartan">Tartan Listings</option>
														<option value="thornton">Thornton</option>
														<option value="toysrus">Toys R Us</option>
														<option value="traderjoes">Trader Joes</option>
														<option value="ntm_tstops">Transit Stops</option>
														<option value="transitstations">Transit Stations</option>
														<option value="foodplants">Tyson Food Plants</option>
														<option value="uhaul">Uhaul</option>
														<option value="unitsa">Units A</option>
														<option value="unitsb">Units B</option>
														<option value="ups">UPS</option>
														<option value="usfoods">US Foods</option>
														<option value="vistar">Vistar</option>
														<option value="wholefoods">Whole Foods</option>
													</select>
												</div>
												<div id="dvSelSQL">
													<h5><b> Select dataset to cross: </b></h5>
													<select id="selSQLJoin" class="selectpicker show-tick dropup" data-dropup-auto="false">
														<option value="counties">Counties</option>
														<option value="zip">Zip</option>
													</select>
													<!--<h5><b> SQL Operator: </b></h5>
													<select id="selSQLOperator" class="selectpicker show-tick dropup" data-dropup-auto="false">
														<option value="coverage">Coverage (&#189; of the area) </option>
														<option value="difference">Difference</option>
														<option value="union">Union</option>
													</select>-->
												</div>
											</div>
										</div>
										<div class="bottomBar"></div>
									</div>
								</div>
							</div>
							<div class="loading" id="loading">
								<div class="loader"></div>
							</div>
						</div>';
				}
			} catch (Exception $ex) {
				echo $ex->getMessage();
			}
		}
	}
?>