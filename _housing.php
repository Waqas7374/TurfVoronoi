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
				$sql = "SELECT housingpane FROM components where user_id=" . $_SESSION["user_id"];
				$stmt = $DB->prepare($sql);
				$stmt->execute();
				$radiusValues = $stmt->fetchAll();
				
				if($radiusValues[0]["housingpane"] == 1)
				{
					$sqlFour;
					// if(isset($_SESSION['project_id']) && !empty($_SESSION['project_id'])) {						
						// $sqlFour = "SELECT `user_id`,`foodagri`,`foodcommodities`,`foodbeverages`,`fooddc`,`fooddcdma`,`foodrefri`,`foodrefriactivities`,`foodhome`,`foodhomesuper`,`foodhomealbertsons`,`foodaway`,`foodretailsuper` FROM project where title <> '' and id=" . $_SESSION["project_id"];
					// }
					// else{						
						// $sqlFour = "SELECT `user_id`,`foodagri`,`foodcommodities`,`foodbeverages`,`fooddc`,`fooddcdma`,`foodrefri`,`foodrefriactivities`,`foodhome`,`foodhomesuper`,`foodhomealbertsons`,`foodaway`,`foodretailsuper` FROM project where title = '' and user_id=" . $_SESSION["user_id"];
					// }

					$stmtFour = $DB->prepare($sqlFour);
					$stmtFour->execute();
					$projectValues = $stmtFour->fetchAll();
					
					echo '<!----Sidebar Housing--->
							<div id="mainDivHousing" class="sidebar right sidebar-size-3 sidebar-offset-0 sidebar-skin-white sidebar-visible-desktop scroll" style="display:none;" >
								<div class="container-fluid">
									<ul class="nav nav-tabs">
										<li class="active"><a data-toggle="tab" href="#housingTab">Zoning</a></li>
										<li><a data-toggle="tab" href="#buildingsTab">Buildings</a></li>
										<li><a data-toggle="tab" href="#permitsTab">Permits</a></li>
									</ul>

									<div class="tab-content">
										<div id="housingTab" class="tab-pane fade in active">
											<div class="div-hand">
												<a data-toggle="collapse" id="refZoningCounties" href="#zoningDataCounties" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Zoning - Counties</b>
												</a>
												<div id="zoningDataCounties" class="collapse">
													<select id="zoningCountiesData" class="selectpicker show-tick" title="Choose one of the following..." data-actions-box="true" multiple data-selected-text-format="count" onchange="addZoningCountiesData();">
														<option value="SantaBarbara_County_CA">SantaBarbara - CA</option>
														<option value="Riverside_County_CA">Riverside - CA</option>
														<option value="MiamiDade_County_FL">MiamiDade - FL</option>
														<option value="Howard_County_MD">Howard - MD</option>
														<option value="Fresno_County_CA">Fresno - CA</option>
														<option value="Clark_County_NV">Clark - NV</option>
														<option value="Baltimore_County_MD">Baltimore - MD</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
											<div class="div-hand">
												<a data-toggle="collapse" id="refZoningCities" href="#zoningDataCities" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i><b>&nbsp;&nbsp;Zoning - Cities</b>
												</a>
												<div id="zoningDataCities" class="collapse">
													<select id="zoningCitiesData" class="selectpicker show-tick" title="Choose one of the following..." multiple data-actions-box="true" data-selected-text-format="count" onchange="addZoningCitiesData();">
														<option value="Albuquerque_NM">Albuquerque - NM</option>
														<option value="Alexandria_VA">Alexandria - VA</option>
														<option value="Amarillo_TX">Amarillo - TX</option>
														<option value="Anaheim_CA">Anaheim - CA</option>
														<option value="Arlington_TX">Arlington - TX</option>
														<option value="Atlanta_GA">Atlanta - GA</option>
														<option value="Aurora_CO">Aurora - CO</option>
														<option value="Austin_TX">Austin - TX</option>
														<option value="Bakersfield_CA">Bakersfield - CA</option>
														<option value="Baltimore_MD">Baltimore - MD</option>
														<option value="BatonRouge_LA">BatonRouge - LA</option>
														<option value="Boston_MA">Boston - MA</option>
														<option value="Brownsville_TX">Brownsville - TX</option>
														<option value="Cambridge_MA">Cambridge - MA</option>
														<option value="Charlotte_NC">Charlotte - NC</option>
														<option value="Chattanooga_TN">Charlotte - NC</option>
														<option value="Chesapeake_VA">Chesapeake - VA</option>
														<option value="Chicago_IL">Chicago - IL</option>
														<option value="Cincinnati_OH">Cincinnati - OH</option>
														<option value="Cleveland_OH">Cleveland - OH</option>
														<option value="Columbus_OH">Columbus - OH</option>
														<option value="Dallas_TX">Dallas - TX</option>
														<option value="Dayton_OH">Dayton - OH</option>
														<option value="Denver_CO">Denver - CO</option>
														<option value="DesMoines_IA">DesMoines - IA</option>
														<option value="Detroit_MI">Detroit - MI</option>
														<option value="Durham_NC">Durham - NC</option>
														<option value="ElPaso_TX">ElPaso - TX</option>
														<option value="Fargo_ND">Fargo - ND</option>
														<option value="Flint_MI">Flint - MI</option>
														<option value="FortWayne_IN">FortWayne - IN</option>
														<option value="Fremont_CA">Fremont - CA</option>
														<option value="Glendale_AZ">Glendale - AZ</option>
														<option value="Glendale_CA">Glendale - CA</option>
														<option value="Hartford_CT">Hartford - CT</option>
														<option value="Henderson_NV">Henderson - NV</option>
														<option value="Hialeah_FL">Hialeah - FL</option>
														<option value="HuntingtonBeach_CA">HuntingtonBeach - CA</option>
														<option value="Huntsville_AL">Huntsville - AL</option>
														<option value="Indianapolis_IN">Indianapolis - IN</option>
														<option value="Irvine_CA">Irvine - CA</option>
														<option value="KansasCity_MO">KansasCity - MO</option>
														<option value="Kent_WA">Kent - WA</option>
														<option value="Laredo_TX">Laredo - TX</option>
														<option value="LasCruces_NM">LasCruces - NM</option>
														<option value="LasVegas_NV">LasVegas - NV</option>
														<option value="Lexington_KY">Lexington - KY</option>
														<option value="Lincoln_NE">Lincoln - NE</option>
														<option value="LongBeach_CA">LongBeach - CA</option>
														<option value="LosAngeles_CA">LosAngeles - CA</option>
														<option value="Lowell_MA">Lowell - MA</option>
														<option value="Madison_WI">Madison - WI</option>
														<option value="Memphis_TN">Memphis - TN</option>
														<option value="Milwaukee_WI">Milwaukee - WI</option>
														<option value="Minneapolis_MN">Minneapolis - MN</option>
														<option value="Newark_NJ">Newark - NJ</option>
														<option value="NewOrleans_LA">NewOrleans - LA</option>
														<option value="NewportBeach_CA">NewportBeach - CA</option>
														<option value="NewYorkCity_NY">NewYorkCity - NY</option>
														<option value="Norfolk_VA">Norfolk - VA</option>
														<option value="NorthLasVegas_NV">NorthLasVegas - NV</option>
														<option value="Oakland_CA">Oakland - CA</option>
														<option value="Omaha_NE">Omaha - NE</option>
														<option value="Orlando_FL">Orlando - FL</option>
														<option value="Philadelphia_PA">Philadelphia - PA</option>
														<option value="Phoenix_AZ">Phoenix - AZ</option>
														<option value="Pittsburgh_PA">Pittsburgh - PA</option>
														<option value="Plano_TX">Plano - TX</option>
														<option value="Portland_ME">Portland - ME</option>
														<option value="Portland_OR">Portland - OR</option>
														<option value="Providence_RI">Providence - RI</option>
														<option value="Raleigh_NC">Raleigh - NC</option>
														<option value="Richmond_VA">Richmond - VA</option>
														<option value="Rochester_NY">Rochester - NY</option>
														<option value="Sacramento_CA">Sacramento - CA</option>
														<option value="SaltLakeCity_UT">SaltLakeCity - UT</option>
														<option value="SanDiego_CA">SanDiego - CA</option>
														<option value="SanFrancisco_CA">SanFrancisco - CA</option>
														<option value="SanJose_CA">SanJose - CA</option>
														<option value="SantaRosa_CA">SantaRosa - CA</option>
														<option value="Seattle_WA">Seattle - WA</option>
														<option value="SimiValley_CA">SimiValley - CA</option>
														<option value="Somerville_MA">Somerville - MA</option>
														<option value="SouthBurlington_VT">SouthBurlington - VT</option>
														<option value="StLouis_MO">StLouis - MO</option>
														<option value="Stockton_CA">Stockton - CA</option>
														<option value="Tacoma_WA">Tacoma - WA</option>
														<option value="Tallahassee_FL">Tallahassee - FL</option>
														<option value="Tampa_FL">Tampa - FL</option>
														<option value="Toledo_OH">Toledo - OH</option>
														<option value="Tucson_AZ">Tucson - AZ</option>
														<option value="Tulsa_OK">Tulsa - OK</option>
														<option value="VirginiaBeach_VA">VirginiaBeach - VA</option>
														<option value="Washington_DC">Washington - DC</option>
														<option value="Wichita_KS">Wichita - KS</option>
														<option value="WinstonSalem_NC">WinstonSalem - NC</option>
														<option value="Worcester_MA">Worcester - MA</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>

										<div id="buildingsTab" class="tab-pane fade">
											<div class="div-hand">
												<a data-toggle="collapse" href="#buildings" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Buildings</b>
												</a>
												<div id="buildings" class="collapse">
													<select id="buildingsSelect" class="selectpicker show-tick" onchange="addBuildingsData();">
														<option value="none">None</option>
														<option value="buildings">Illinois Buildings</option>
													</select>
												</div>
											</div>
											<div class="bottomBar"></div>
										</div>

										<div id="permitsTab" class="tab-pane fade">
											<div class="div-hand">
												<a data-toggle="collapse" href="#permits" aria-expanded="true" class="collapsed">
													<i class="fa fa-hand-o-down"></i> <b>&nbsp;&nbsp;Permits</b>
												</a>
												<div id="permits" class="collapse">
													<select id="permitsSelect" class="selectpicker show-tick" onchange="addPermitsData();">
														<option value="none">None</option>
														<option value="singlefamily">Single Family Units</option>
														<option value="multifamily">Multi-Family Units</option>
														<option value="totalunits">Total Units</option>
													</select>
												</div>
											</div>
											
											<div id="divTransPermits" class="condTransDivs">
												<h5> <b> Data Display Options: </b> </h5>
												<ul>
													<select id="cohortOptsPermits" class="selectpicker show-tick" onchange="changePalettePermits();">
														<option value="standard">Standard</option>
														<option value="divergent">Divergent</option>
													</select>
													<table id="permitsCohortsOpts" class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemePermits" id="cbfirstThemePermits">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/firsttheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemePermits" id="cbsecondThemePermits" checked>&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/secondtheme.png">
																</td>
															</tr>
															<tr class="tdTopBorder">
																<td colspan="2">
																	<input type="radio" name="cohortsThemePermits" id="cbthirdThemePermits">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/thirdtheme.png">
																</td>
															</tr>
														</tbody>
													</table>
													<table class="tableConds">
														<tbody>
															<tr class="tdTopBorder">
																<td id="flipEco">
																	<h5 id="flipPermitsCohorts"><b> Flip Cohorts </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="flipCohortsPermits" onchange="flipCohortsPermits($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="flipCohortsPermits"></label>
																	</div>
																</td>
																<td id="framesEco">
																	<h5><b> Frames </b></h5>
																	<div class="onoffswitch">
																		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switchFramesPermits" onchange="changeFramesPermits($(this).prop(\'checked\')?\'on\':\'off\')">
																		<label class="onoffswitch-label" for="switchFramesPermits"></label>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
													<div id="divSelFramesPermits">
														<h5> <b> Frame Color: </b> </h5>
														<select id="selFramesPermits" class="selectpicker show-tick" onchange="setFrames();">
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