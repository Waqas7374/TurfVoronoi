$(document).ready(function() {
	
	$('#saveRadius').click(function()
	{
		var dataString = 'airports=' + $("#intervalAirport").val() + '&albertsons=' + $("#intervalAlbertsons").val() + '&aldistores=' + $("#intervalAldi").val() + '&amazon=' + $("#intervalAmazon").val() + '&brownfields=' + $("#intervalBrownfields").val() + '&culver=' + $("#intervalCulver").val() + '&dicks=' + $("#intervalDicks").val() + '&dma=' + $("#intervalDMA").val() + '&ethanol=' + $("#intervalEthanol").val() + '&farmers=' + $("#intervalFarmers").val() + '&freight=' + $("#intervalFreight").val() + '&grainger=' + $("#intervalGrainger").val() + '&grocery=' + $("#intervalStores").val() + '&shelter=' + $("#intervalShelter").val() + '&interchanges=' + $("#intervalCrossing").val() + '&iana=' + $("#intervalIana").val() + '&keef=' + $("#intervalKeef").val() + '&majorports=' + $("#intervalPorts").val() + '&mclane=' + $("#intervalMclane").val() + '&mls=' + $("#intervalFlorida").val() + '&parkway=' + $("#intervalParkway").val() + '&ports=' + $("#intervalPort").val() + '&publix=' + $("#intervalPublix").val() + '&refri=' + $("#intervalRefri").val() + '&shopping=' + $("#intervalShopping").val() + '&stores=' + $("#intervalInterchanges").val() + '&sysco=' + $("#intervalSysco").val() + '&tartan=' + $("#intervalTartan").val() + '&thornton=' + $("#intervalThornton").val() + '&toys=' + $("#intervalToysrus").val() + '&tyson=' + $("#intervalTyson").val() + '&transit=' + $("#intervalTransit").val() + '&usf=' + $("#intervalUsf").val();
		$.ajax({
			type: "GET",
			url: "updateRadiusValues.php",
			data: dataString,
			cache: false,
			success: function(data)
			{
				if(data=="Done")
				{
					toastr.success("Radius Values have been saved successfully.");
				}
				else if(data=="Sorry.")
				{
					toastr.error("Changes not saved. Please try again");
				}
			}
		});
	});
	
	$('#saveBorder').click(function()
	{
		var dataString = 'city=' + $("#strokeCity").val() + '&county=' + $("#strokeCounty").val() + '&freight=' + $("#strokeFreight").val() + '&highway=' + $("#strokeHighway").val() + '&msas=' + $("#strokeMsa").val() + '&neighborhood=' + $("#strokeNeighbor").val() + '&district=' + $("#strokePDistrict").val() + '&region=' + $("#strokeRegion").val() + '&state=' + $("#strokeState").val() + '&transit=' + $("#strokeTransit").val() + '&zip=' + $("#strokeZip").val();
		$.ajax({
			type: "GET",
			url: "updateBorderValues.php",
			data: dataString,
			cache: false,
			success: function(data)
			{
				if(data=="Done")
				{
					toastr.success("Border Valus have been saved successfully.");
				}
				else if(data=="Sorry.")
				{
					toastr.error("Changes not saved. Please try again");
				}
			}
		});
	});
	
	$('#saveProject').click(function()
	{
		$("#txtProjectTitle").val('');
		saveDialog = $("#projectModal").dialog({
                autoOpen: false,
                height: 200,
                width: 250,
                modal: true,
                buttons: {
				"Cancel": function() {
                    saveDialog.dialog("close");
				},
				"Submit": function(){
					if($("#txtProjectTitle").val()== "")
					{
						toastr.error("Please enter a name for the project");
						return;
					}
					else
					{
						var hash = window.location.hash.replace('#map=', '');
						var parts = hash.split('/');
						var resultPrim = '';
						var resultClosings = '';
						var resultOwn = '';
						var resultManmade = '';
						var resultTpt = '';
						var resultAirports = '';
						var resultSchools = '';
						var resultLowIncome = '';
						var resultLowIncomeTrans = '1';
						var resultBanks = '';
						var resultBankFilter = '';
						var resultFoodAgri = '';
						var resultFoodCommodities = '';
						var resultFoodBeverages = '';
						var resultFoodDc = '';
						var resultFoodDcDma = '';
						var resultFoodRefri = '';
						var resultFoodRefriActivities = '';
						var resultFoodHome = '';
						var resultFoodHomeSuper = '';
						var resultFoodHomeAlbertsons = '';
						var resultFoodAway = '';
						var resultFoodRetailSuper = '';
						var resultHealthBoundaries = '';
						var resultHealthCondition = '';
						var resultHealthConditionTrans = '1';
						var resultCondition = '';
						var resultSubCondition = '';
						var resultCondTrans  = '1';
						var resultSelectedIcon  = '';
						var resultSelectedRadius  = '';
						var resultRadiusOpacity  = '';
						
						try
						{
							for (i = 0; i < $("#primaryData").val().length; i++) {
								resultPrim += $("#primaryData").val()[i] + ",";
							}
							resultPrim = resultPrim.substring(0, resultPrim.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#closingsData").val().length; i++) {
								resultClosings += $("#closingsData").val()[i] + ",";
							}
							resultClosings = resultClosings.substring(0, resultClosings.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#ownData").val().length; i++) {
								resultOwn += $("#ownData").val()[i] + ",";
							}
							resultOwn = resultOwn.substring(0, resultOwn.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#manmadeData").val().length; i++) {
								resultManmade += $("#manmadeData").val()[i] + ",";
							}
							resultManmade = resultManmade.substring(0, resultManmade.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#tptData").val().length; i++) {
								resultTpt += $("#tptData").val()[i] + ",";
							}
							resultTpt = resultTpt.substring(0, resultTpt.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#airportFilter").val().length; i++) {
								resultAirports += $("#airportFilter").val()[i] + ",";
							}
							resultAirports = resultAirports.substring(0, resultAirports.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#schoolData").val().length; i++) {
								resultSchools += $("#schoolData").val()[i] + ",";
							}
							resultSchools = resultSchools.substring(0, resultSchools.length - 1);
						}
						catch(e){}
						
						resultLowIncome = $("#urbanRuralIncomeSelect").val();
						
						resultLowIncomeTrans = $("#iptOpacityUrban").slider("value");
						
						try
						{
							for (i = 0; i < $("#bankData").val().length; i++) {
								resultBanks += $("#bankData").val()[i] + ",";
							}
							resultBanks = resultBanks.substring(0, resultBanks.length - 1);
						}
						catch(e){}

						resultBankFilter = $("#bankFilter").val();

						try
						{
							for (i = 0; i < $("#foodProd").val().length; i++) {
								resultFoodAgri += $("#foodProd").val()[i] + ",";
							}
							resultFoodAgri = resultFoodAgri.substring(0, resultFoodAgri.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#commoditiesSelect").val().length; i++) {
								resultFoodCommodities += $("#commoditiesSelect").val()[i] + ",";
							}
							resultFoodCommodities = resultFoodCommodities.substring(0, resultFoodCommodities.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#beveragesSelect").val().length; i++) {
								resultFoodBeverages += $("#beveragesSelect").val()[i] + ",";
							}
							resultFoodBeverages = resultFoodBeverages.substring(0, resultFoodBeverages.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#dcData").val().length; i++) {
								resultFoodDc += $("#dcData").val()[i] + ",";
							}
							resultFoodDc = resultFoodDc.substring(0, resultFoodDc.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#dmaCompanies").val().length; i++) {
								resultFoodDcDma += $("#dmaCompanies").val()[i] + ",";
							}
							resultFoodDcDma = resultFoodDcDma.substring(0, resultFoodDcDma.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#selRefrigerated").val().length; i++) {
								resultFoodRefri += $("#selRefrigerated").val()[i] + ",";
							}
							resultFoodRefri = resultFoodRefri.substring(0, resultFoodRefri.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#activityFilter").val().length; i++) {
								resultFoodRefriActivities += $("#activityFilter").val()[i] + ",";
							}
							resultFoodRefriActivities = resultFoodRefriActivities.substring(0, resultFoodRefriActivities.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#selFoodHome").val().length; i++) {
								resultFoodHome += $("#selFoodHome").val()[i] + ",";
							}
							resultFoodHome = resultFoodHome.substring(0, resultFoodHome.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#retailData").val().length; i++) {
								resultFoodHomeSuper += $("#retailData").val()[i] + ",";
							}
							resultFoodHomeSuper = resultFoodHomeSuper.substring(0, resultFoodHomeSuper.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#albertsonsBrands").val().length; i++) {
								resultFoodHomeAlbertsons += $("#albertsonsBrands").val()[i] + ",";
							}
							resultFoodHomeAlbertsons = resultFoodHomeAlbertsons.substring(0, resultFoodHomeAlbertsons.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#selFoodaway").val().length; i++) {
								resultFoodAway += $("#selFoodaway").val()[i] + ",";
							}
							resultFoodAway = resultFoodAway.substring(0, resultFoodAway.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#selFoodSuperMarket").val().length; i++) {
								resultFoodRetailSuper += $("#selFoodSuperMarket").val()[i] + ",";
							}
							resultFoodRetailSuper = resultFoodRetailSuper.substring(0, resultFoodRetailSuper.length - 1);
						}
						catch(e){}
						
						try
						{
							for (i = 0; i < $("#selHealthBoundary").val().length; i++) {
								resultHealthBoundaries += $("#selHealthBoundary").val()[i] + ",";
							}
							resultHealthBoundaries = resultHealthBoundaries.substring(0, resultHealthBoundaries.length - 1);
						}
						catch(e){}

						if($('#chkIcon').is(":checked")){
							resultSelectedIcon = '1';
						}
						else if($('#chkLogo').is(":checked")){
							resultSelectedIcon = '2';
						}
						else if($('#chkCluster').is(":checked")){
							resultSelectedIcon = '3';
						}
						else if($('#chkVoronoi').is(":checked")){
							resultSelectedIcon = '4';
						}
						else if($('#chkHybrid').is(":checked")){
							resultSelectedIcon = '5';
						}

						if($('#chkRadiusOne').is(":checked")){
							resultSelectedRadius = '1';
						}
						else if($('#chkRadiusTwo').is(":checked")){
							resultSelectedRadius = '2';
						}
						else if($('#chkRadiusThree').is(":checked")){
							resultSelectedRadius = '3';
						}
						resultRadiusOpacity = $("#iptRadiusOpacity").slider("value");
						
						var dataString = 'title=' + $("#txtProjectTitle").val() + '&zoom=' + parts[0] + '&lati=' + parts[1] + '&longi=' + parts[2] + '&rotation=' + parts[3] + '&base=' + parts[4] + '&selectedIcon=' + resultSelectedIcon + '&resultPrim=' + resultPrim + '&resultClosings=' + resultClosings + '&resultOwn=' + resultOwn + '&resultManmade=' + resultManmade + '&resultTpt=' + resultTpt + '&resultAirports=' + resultAirports + '&resultSchools=' + resultSchools + '&resultBanks=' + resultBanks + '&resultFoodAgri=' + resultFoodAgri + '&resultFoodCommodities=' + resultFoodCommodities + '&resultFoodBeverages=' + resultFoodBeverages + '&resultFoodDc=' + resultFoodDc + '&resultFoodDcDma=' + resultFoodDcDma + '&resultFoodRefri=' + resultFoodRefri + '&resultFoodRefriActivities=' + resultFoodRefriActivities + '&resultFoodHome=' + resultFoodHome + '&resultFoodHomeSuper=' + resultFoodHomeSuper + '&resultFoodHomeAlbertsons=' + resultFoodHomeAlbertsons + '&resultFoodAway=' + resultFoodAway + '&resultFoodRetailSuper=' + resultFoodRetailSuper + '&resultHealthBoundaries=' + resultHealthBoundaries + '&resultHealthCondition=' + resultHealthCondition + '&resultHealthConditionTrans=' + resultHealthConditionTrans + '&resultCondition=' + resultCondition +  '&resultSubCondition=' + resultSubCondition + '&resultCondTrans=' + resultCondTrans + '&resultLowIncome=' + resultLowIncome +  '&resultLowIncomeTrans=' + resultLowIncomeTrans + '&resultBankFilter=' + resultBankFilter + '&resultSelectedRadius=' + resultSelectedRadius + '&resultRadiusOpacity=' + resultRadiusOpacity;
						
						$.ajax({
							type: "GET",
							url: "updateProjectStatus.php",
							data: dataString,
							cache: false,
							success: function(data)
							{
								if(data=="Done")
								{
									toastr.success("Current project saved successfully.");
									
									$.ajax({
										type: "GET",
										url: "getSavedTime.php",
										data: dataString,
										cache: false,
										success: function(value)
										{
											var data = value.split("-----");

											$.ajax({
												type: "GET",
												url: "getSavedProjectsReverse.php",
												cache: false,
												success: function(data)
												{
													
													var select = $("#projects");
													var list = [];
													var projects = JSON.parse(data);
												
													list.push('<option value="none"> Nothing</option>');	
													for(i=0; i < projects.length; i++)
													{
														list.push('<option data-subtext="' + projects[i].latest + '" value="' + projects[i].id + '" selected>' + projects[i].title + ' -- </option>');
													}
													select.html(list.join(''));
													select.selectpicker('refresh');
											
													$("#txtProjectTitle").val("");
												}
											});
											saveDialog.dialog("close");
										}
									});
								}
								else if(data=="Sorry.")
								{
									toastr.error("Changes not saved. Please try again");
								}
							}
						});


						if ($('#cbVoronoi').is(":checked") || $('#cbDCVoronoi').is(":checked") || $('#cbRefVoronoi').is(":checked") || $('#cbFoodAwayVoronoi').is(":checked") || $('#cbFoodHomeVoronoi').is(":checked") || $('#cbFoodSuperMarketVoronoi').is(":checked") || $('#cbFoodVoronoi').is(":checked") || $('#cbBeveragesVoronoi').is(":checked") || $('#cbPrimaryVoronoi').is(":checked") || $('#cbOwnVoronoi').is(":checked") || $('#cbTptVoronoi').is(":checked") || $('#cbSchoolsVoronoi').is(":checked") || $('#cbBanksVoronoi').is(":checked") || $('#cbHealthFacilitiesVoronoi').is(":checked")) {
							var cb = '';
							var level = '';

							if ($('#cbDCVoronoi').is(":checked")) {
								cb = 'DC';
							}
							else if ($('#cbRefVoronoi').is(":checked")) {
								cb = 'Ref';
							}
							else if ($('#cbFoodAwayVoronoi').is(":checked")) {
								cb = 'FoodAway';
							}
							else if ($('#cbFoodHomeVoronoi').is(":checked")) {
								cb = 'FoodHome';
							}
							else if ($('#cbFoodSuperMarketVoronoi').is(":checked")) {
								cb = 'FoodSuperMarket';
							}
							else if ($('#cbFoodVoronoi').is(":checked")) {
								cb = 'Food';
							}
							else if ($('#cbBeveragesVoronoi').is(":checked")) {
								cb = 'Beverages';
							}
							else if ($('#cbHealthFacilitiesVoronoi').is(":checked")) {
								cb = 'HealthFacilities';
							}
							else if ($('#cbPrimaryVoronoi').is(":checked")) {
								cb = 'Primary';
							}
							else if ($('#cbOwnVoronoi').is(":checked")) {
								cb = 'Own';
							}
							else if ($('#cbTptVoronoi').is(":checked")) {
								cb = 'TPT';
							}
							else if ($('#cbSchoolsVoronoi').is(":checked")) {
								cb = 'Schools';
							}
							else if ($('#cbBanksVoronoi').is(":checked")) {
								cb = 'Banks';
							}
							else if ($('#cbVoronoi').is(":checked")) {
								cb = 'Hospitals';
							}
			
							if ($("#voroAreaType").val() == "CAS" || $("#voroDCAreaType").val() == "CAS" || $("#voroRefAreaType").val() == "CAS" || $("#voroFoodAwayAreaType").val() == "CAS" || $("#voroFoodHomeAreaType").val() == "CAS" || $("#voroFoodSuperMarketAreaType").val() == "CAS" || $("#voroFoodAreaType").val() == "CAS" || $("#voroBeveragesAreaType").val() == "CAS" || $("#voroPrimaryAreaType").val() == "CAS" || $("#voroOwnAreaType").val() == "CAS" || $("#voroTptAreaType").val() == "CAS" || $("#voroSchoolsAreaType").val() == "CAS" || $("#voroBanksAreaType").val() == "CAS") {
								level = 'CAS';
							} if ($("#voroAreaType").val() == "state" || $("#voroDCAreaType").val() == "state" || $("#voroRefAreaType").val() == "state" || $("#voroFoodAwayAreaType").val() == "state" || $("#voroFoodHomeAreaType").val() == "state" || $("#voroFoodSuperMarketAreaType").val() == "state" || $("#voroFoodAreaType").val() == "state" || $("#voroBeveragesAreaType").val() == "state" || $("#voroPrimaryAreaType").val() == "state" || $("#voroOwnAreaType").val() == "state" || $("#voroTptAreaType").val() == "state" || $("#voroSchoolsAreaType").val() == "state" || $("#voroBanksAreaType").val() == "state") {
								level = 'state';
								selectedExtentForVoronoi = selectedExtentForVoronoi.getExtent();
							} if ($("#voroAreaType").val() == "full" || $("#voroDCAreaType").val() == "full" || $("#voroRefAreaType").val() == "full" || $("#voroFoodAwayAreaType").val() == "full" || $("#voroFoodHomeAreaType").val() == "full" || $("#voroFoodSuperMarketAreaType").val() == "full" || $("#voroFoodAreaType").val() == "full" || $("#voroBeveragesAreaType").val() == "full" || $("#voroPrimaryAreaType").val() == "full" || $("#voroOwnAreaType").val() == "full" || $("#voroTptAreaType").val() == "full" || $("#voroSchoolsAreaType").val() == "full" || $("#voroBanksAreaType").val() == "full") {
								level = 'full';
							}

							var dataStringTwo = 'extent=' + selectedExtentForVoronoi + '&cb=' + cb + '&level=' + level;
							$.ajax({
								type: "GET",
								url: "insertVoronoiData.php",
								data: dataStringTwo,
								cache: false,
								success: function(data)
								{
									// console.log(data);
								}
							});
						}
					}
				},
            },
			close: function() {}
        });
        saveDialog.dialog("open");
	});
	
	$('#resetProject').click(function()
	{
		toastr.error("<br /><button type='button' id='confirmationRevertYes' class='btn clear'>Yes</button>",'This will clear all current selections on the map. Are you sure?',
		{
			closeButton: true,
			allowHtml: true,
			onShown: function (toast) {
				$("#confirmationRevertYes").click(function(){
					// $("#projects").selectpicker('deselectAll');
				$.ajax({
					type: "GET",
					url: "getSavedProjects.php",
					cache: false,
					success: function(data)
					{
						toastr.success("Project has been reset successfully");
						var select = $("#projects");
						var list = [];
						var projects = JSON.parse(data);
					
						list.push('<option value="none" selected> Nothing</option>');	
						for(i=0; i < projects.length; i++)
						{
							list.push('<option data-subtext="' + projects[i].latest + '" value="' + projects[i].id + '">' + projects[i].title + ' -- </option>');
						}
						select.html(list.join(''));
						select.selectpicker('refresh');
					}
				});

					$('.selectpicker').selectpicker('deselectAll');
					// changeBaseMap();
					// $.ajax({
						// type: "GET",
						// url: "delSavedTime.php",
						// cache: false,
						// success: function(data)
						// {
							// $("#saveTime").text(data);
							// $('.selectpicker').selectpicker('deselectAll');
							// changeBaseMap();
						// }
					// });
				});
			}
		});
	});
	
	$('#delProject').click(function()
	{
		toastr.error("<br /><button type='button' id='confirmationRevertYes' class='btn clear'>Yes</button>",'This will clear all current selections on the map and project from backend. Are you sure?',
		{
			closeButton: true,
			allowHtml: true,
			onShown: function (toast) {
				$("#confirmationRevertYes").click(function(){
					$('.selectpicker').selectpicker('deselectAll');
					$.ajax({
						type: "GET",
						url: "delSavedTime.php",
						data: "id=" + $("#projects").val(),
						cache: false,
						success: function(data)
						{
							toastr.success("Project deleted successfully");

							// $.ajax({
								// type: "GET",
								// url: "getSavedProjects.php",
								// cache: false,
								// success: function(data)
								// {
									// var select = $("#projects");
									// var list = [];
									// var projects = JSON.parse(data);
								
									// list.push('<option value="none" selected> Nothing</option>');	
									// for(i=0; i < projects.length; i++)
									// {
										// list.push('<option data-subtext="' + projects[i].latest + '" value="' + projects[i].id + '">' + projects[i].title + ' -- </option>');
									// }
									// select.html(list.join(''));
									// select.selectpicker('refresh');
								// }
							// });
							window.location.href = "main.php";
						}
					});
				});
			}
		});
	});
});