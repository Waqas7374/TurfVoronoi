$(document).ready(function() {
    $('#showInput').tooltip();
    $('#showConditions').tooltip();
    $('#showDeterminants').tooltip();
    $('#showFood').tooltip();
    $('#showHousing').tooltip();
    $('#showHealth').tooltip();
    $('#showOutput').tooltip();
    $('#showCrosswalk').tooltip();
    var blur = document.getElementById('blur');
    var radius = document.getElementById('radius');

    try{
		blur.addEventListener('input', function() {
			heatMap.setBlur(parseInt(blur.value, 10));
		});

		radius.addEventListener('input', function() {
			heatMap.setRadius(parseInt(radius.value, 10));
		});
	}catch(e){}
    $("input#maskingFilter").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilter.fillColor_ = color.tiny.toRgbString();
                maskFilter.set('active', false);
                maskFilter.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#maskingFilterPG").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilterPG.fillColor_ = color.tiny.toRgbString();
                maskFilterPG.set('active', false);
                maskFilterPG.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#maskingFilterEC").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilterEC.fillColor_ = color.tiny.toRgbString();
                maskFilterEC.set('active', false);
                maskFilterEC.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#maskingFilterAD").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilterAD.fillColor_ = color.tiny.toRgbString();
                maskFilterAD.set('active', false);
                maskFilterAD.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#maskingFilterSO").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilterSO.fillColor_ = color.tiny.toRgbString();
                maskFilterSO.set('active', false);
                maskFilterSO.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#maskingFilterEV").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            try {
                maskFilterEV.fillColor_ = color.tiny.toRgbString();
                maskFilterEV.set('active', false);
                maskFilterEV.set('active', true);
            } catch (ex) {}
        }
    });
    $("input#borderAG, input#borderASB, input#borderBEA, input#borderCBSA, input#borderCity, input#borderCMB, input#borderCounties, input#borderERS, input#borderERSRep, input#borderHRR, input#borderHSA, input#borderMPO, input#borderMSA, input#borderNeig, input#borderOZ, input#borderPEA, input#borderPCSA, input#borderPD, input#borderReg, input#borderState, input#borderTP10, input#borderTP10Metro, input#borderTP10Micro, input#borderZip, input#borderZCounties, input#borderZCities").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
		swatches: false,
		sliders: false,
		format: 'hex',
        previewformat: 'hex',
        onchange: function(container, color) {
            updateStroke();
        }
    });
    $("input#voronoiPolygon, input#voronoiPolygonTwo, input#voronoiPin, input#voronoiPinTwo, input#voronoiPinCircle").ColorPickerSliders({
        placement: 'left',
        hsvpanel: true,
        previewformat: 'hex',
        onchange: function(container, color) {
            updateVoronoiStyle();
        }
    });

    $('#strokePDistrict, #strokeCounty, #strokeState, #strokeRegion, #stroketp10micro, #stroketp10metro, #stroketp10, #strokepea10, #strokeOpporZones, #strokePcsa, #strokeHsa, #strokeHrr, #strokeMsaGrainger, #strokeers10rep, #strokeers10, #strokecbsa10, #strokeagdistrict, #strokebea10, #strokeVoronoi, #strokePin, #strokeDataFiber, #strokeFreight, #strokeTransit, #strokeHighway, #strokeMsa, #strokeMPO, #strokeZip, #strokeNeighbor, #strokeCity, #strokeZoningCounty, #strokeZoningCity, #strokeConsumermarketboundaries').bind('change keyup mouseup', function() {
        updateStroke();
    });

    $('#labelStates, #labelCounties, #labelCities, #labelDistricts, #labelCommuterRegions, #labelRegions, #labelMegaregion, #labelHRR, #labelHSA, #labelPCSA, #labelCCD, #labelSCSD, #labelSTR, #labelZip, #labelCR, #labelNeighbour, #labelRefrigerated, #labelRFF, #labelFRT, #labelTribal, #labelMsas').bind('change keyup mouseup', function() {
		wfsStates.setStyle(getBoundaryAndLabelStyle);
		wfsDistricts.setStyle(getBoundaryAndLabelStyle);
		wfsCounties.setStyle(getBoundaryAndLabelStyle);
		wfsCities.setStyle(getBoundaryAndLabelStyle);

		wfsRegion.setStyle(getBoundaryAndLabelStyle);
		wfsMsas.setStyle(getBoundaryAndLabelStyle);
		wfsMegaregion.setStyle(getBoundaryAndLabelStyle);
		wfsCommuterRegions.setStyle(getBoundaryAndLabelStyle);
		
		txtSearchLayerRegion.setStyle(getBoundaryStyle);
		
		wfsHrr.setStyle(getBoundaryAndLabelStyle);
		wfsHsa.setStyle(getBoundaryAndLabelStyle);
		wfsPcsa.setStyle(getBoundaryAndLabelStyle);
		wfsCCD.setStyle(getBoundaryAndLabelStyle);
		wfsSCSD.setStyle(getBoundaryAndLabelStyle);
		wfsZips.setStyle(getBoundaryAndLabelStyle);
		wfsSTRCoverage.setStyle(getBoundaryAndLabelStyle);

		wfsNeighbors.setStyle(getBoundaryAndLabelStyle);
		wfsCulturalRegions.setStyle(getBoundaryAndLabelStyle);
		wfsRFF.setStyle(getBoundaryAndLabelStyle);
		wfsSTD5.setStyle(getBoundaryAndLabelStyle);
		wfsSTD10.setStyle(getBoundaryAndLabelStyle);
		wfsTriballand.setStyle(getBoundaryAndLabelStyle);
    });

    $('#intervalRobinsonFresh, #intervalSysco, #intervalMclane, #intervalDMA, #intervalAmazon, #intervalAlbertsons, #intervalKroger, #intervalBrownfields, #intervalGrainger, #intervalOilrefineries, #intervalBiodiesel, #intervalEthanol, #intervalTAPetro, #intervalPoultry, #intervalPACA, #intervalFairgrounds, #intervalFortune, #intervalUhaul, #intervalTartan, #intervalZA, #intervalCA, #intervalAgencies, #intervalEdwardJones, #intervalCreditUnions, #intervalParkway, #intervalKeef, #intervalDicks, #intervalThornton, #intervalPotbelly, #intervalFiveGuys, #intervalRaisingCanes, #intervalStarbucks, #intervalCulver, #intervalGymboree, #intervalToysrus, #intervalInterchanges, #intervalUsf, #intervalPFGPSF, #intervalVistar, #intervalKeHE, #intervalDmaDcs, #intervalSygma, #intervalTyson, #intervalHydroponics, #intervalPublix, #intervalGiantEagle, #intervalLandBanks, #intervalAsc, #intervalPlasticSurgerySolo, #intervalPlasticSurgeryGroup, #intervalDermaSolo, #intervalDermaGroup, #intervalProviders, #intervalDental, #intervalMental, #intervalPrimary, #intervalTraderJoes, #intervalWholeFoods, #intervalHotSprings, #intervalPort, #intervalTransit, #intervalPorts, #intervalCrossing, #intervalFreight, #intervalAirport, #intervalAldi, #intervalRefri, #intervalUnitsB, #intervalUnitsA, #intervalShelter, #intervalFarmers, #intervalShopping, #intervalStores').bind('change keyup mouseup', function() {
        updateRadius();
    });

    $('#clusterIntGarden, #clusterIntPort, #clusterIntTransit, #clusterIntInterchanges, #clusterIntLogo, #clusterIntStores, #clusterIntFarmers, #clusterIntAirport, #clusterIntKeHE, #clusterIntRobinsonFresh, #clusterIntSysco, #clusterIntMclane, #clusterIntAmazon, #clusterIntUPS, #clusterIntFedex, #clusterIntDHL, #clusterIntPorts, #clusterIntTraffic, #clusterIntIana, #clusterIntLandBanks, #clusterIntHotSprings, #clusterIntUnitsB, #clusterIntUnitsA, #clusterIntKroger, #clusterIntAlbertsons, #clusterIntBank, #clusterIntPss, #clusterIntPrimary, #clusterIntFreight, #clusterIntManmade, #clusterIntNatural, #clusterIntUsf, #clusterIntVistar, #clusterIntSygma, #clusterIntDmaDcs, #clusterIntPFGPSF, #clusterIntFairgrounds, #clusterIntFortune, #clusterIntUhaul, #clusterIntTartan, #clusterIntParkway, #clusterIntKeef, #clusterIntDicks, #clusterIntThornton, #clusterIntAldi, #clusterIntPotbelly, #clusterIntRaisingCanes, #clusterIntFiveGuys, #clusterIntStarbucks, #clusterIntCulver, #clusterIntPublix, #clusterIntBrownfields, #clusterIntGrainger, #clusterIntBiodieselplants, #clusterIntOilrefineries, #clusterIntEthanol, #clusterIntTAPetro, #clusterIntPoultry, #clusterIntPACA, #clusterIntGiantEagle, #clusterIntShopping, #clusterIntTyson, #clusterIntWholeFoods, #clusterIntRefri, #clusterIntDMA, #clusterIntDistributor, #clusterIntGymboree, #clusterIntToys, #clusterIntHydroponics, #clusterIntRanches, #clusterIntTraderJoes, #clusterIntSears').bind('change keyup mouseup', function() {
        updateCluster();
    });

    $('#scaleAgencies, #scaleCA, #scaleZA, #scaleAirport, #scaleAlbertsons, #scaleAldi, #scaleAmazon, #scaleAsc, #scaleBiodiesel, #scaleBank, #scaleBrownfields, #scaleCommunityGardens, #scaleCbrands, #scaleCreditUnions, #scaleCulver, #scaleDental, #scaleDermaSolo, #scaleDermaGroup, #scaleDHL, #scaleDicks, #scaleDistributor, #scaleDMA, #scaleDmaDcs, #scaleEdwardJones, #scaleEnterpriseBuildings, #scaleEthanol, #scaleFairgrounds, #scaleFarmers, #scaleFedex, #scaleFiveGuys, #scaleFortune, #scaleFreight, #scaleGiantEagle, #scaleGrainger, #scaleStores, #scaleGymboree, #scaleShelter, #scaleHospitals, #scaleHotSprings, #scaleHydroponics, #scaleCrossing, #scaleIana, #scaleKeef, #scaleKeHE, #scaleKroger, #scaleLandBanks, #scalePorts, #scaleManmade, #scaleMental, #scaleMclane, #scaleNatural, #scaleNetworkBuildings, #scaleNGPOperators, #scaleOilrefineries, #scalePACA, #scaleParkway, #scalePFGPSF, #scalePlasticSurgerySolo, #scalePlasticSurgeryGroup, #scalePort, #scalePotbelly, #scalePoultry, #scaleProviders, #scalePrimary, #scalePublix, #scaleRaisingCanes, #scaleRanches, #scaleRetailers, #scaleRefri, #scaleRobinsonFresh, #scaleStarbucks, #scalePrimary, #scalePrivate, #scaleShopping, #scaleClosings, #scaleSygma, #scaleSysco, #scaleTAPetro, #scaleTartan, #scaleThornton, #scaleToysrus, #scaleTraderJoes, #scaleTransit, #scaleTransitStations, #scaleTyson, #scaleUhaul, #scaleUnitsA, #scaleUnitsB, #scaleUPS, #scaleUsf, #scaleVistar, #scaleWholeFoods').bind('change keyup mouseup', function() {
        updateStyle();
    });

    $("#chkPanDC").prop("checked", true);
    $("#chkPan").prop("checked", true);
    // $( "#chkLogo" ).prop( "checked", true );

	$("#divOCPG").hide();
	$("#divOCEC").hide();
	$("#divOCAD").hide();
	$("#divOCSO").hide();
	$("#divOCEV").hide();
	
	$("#droughtTimeSeries").hide();
	$("#divDroughtOutlookDate").hide();
	$("#droughtOutlook").hide();
	$("#divDroughtDate").hide();

	$("#divCrosswalk").hide();
	$("#crRatioOpts").hide();
	$("#btnGetRatios").hide();
	$("#btnGoRatio").hide();

	$("#dvSelWithin").hide();
	$("#dvSelSQL").hide();
	$("#tapestrytypeDiv").hide();
	$("#naicsMainDiv").hide();
    $("#divTransNoise").hide();
    $("#divTransFood").hide();
    $("#divEconomicThree").hide();
    $("#crop_productionType").hide();
    $("#divEmploymentSelectStates").hide();
    $("#divSelFramesEconomicTwo").hide();
    $("#divSelFramesEnviroTwo").hide();
    $("#aquifersType").hide();
    $("#measureFilters").hide();
    $("#divVorPrimary").hide();
    $("#divVorPrimary").hide();
    $("#divVorHealth").hide();
    $("#divYears").hide();
    $("#divCropArea").hide();
    $("#heatOpts").hide();
    $("#closingsDataDiv").hide();
    $("#gymboreeBrandsDiv").hide();
    $("#gymboreeBrandsTypeDiv").hide();
    $("#divSelectionOpts").hide();
    $("#naturalDiv").hide();
    $("#divMask").hide();
    $("#manmadeDiv").hide();
    $("#potbellytwoDiv").hide();
    $("#logosRefri").hide();
    $("#logosShipping").hide();
    $("#radiusRefri").hide();
    $("#divLabelsPG").hide();
    $("#divLabelsEC").hide();
    $("#divLabelsAD").hide();
    $("#divLabelsSO").hide();
    $("#divTextureSO").hide();
    $("#divLabelsEV").hide();
    $("#divTextureEV").hide();
    $("#logosHospitals").hide();
    $("#logosPrimary").hide();
    $("#radiusPrimary").hide();
    $("#logosEnergy").hide();
    $("#radiusEnergy").hide();
    $("#radiusHealth").hide();
    $("#optDMA").hide();
    $("#logosOwn").hide();
    $("#radiusOwn").hide();
    $("#radiusOwn").hide();
    $("#logosTpt").hide();
    $("#radiusTpt").hide();
    $("#logosSchools").hide();
    $("#schoolsTrans").hide();
    $("#logosFood").hide();
    $("#radiusFood").hide();
    $("#logosOL").hide();
    $("#radiusOL").hide();
    $("#logosFoodHome").hide();
    $("#radiusFoodHome").hide();
    $("#logosFoodAway").hide();
    $("#radiusFoodAway").hide();
    $("#logosFoodSuperMarket").hide();
    $("#radiusFoodSuperMarket").hide();
    $("#logosBanks").hide();
    $("#radiusBanks").hide();
    $("#logosFin").hide();
    $("#radiusFin").hide();

    $("#divVorDC").hide();
    $("#divVorRef").hide();
    $("#divVorFoodAway").hide();
    $("#divVorFoodHome").hide();
    $("#divVorFoodSuperMarket").hide();
    $("#divVorFood").hide();
    $("#divVorPrimary").hide();
    $("#divVorHealth").hide();
    $("#divVorEnergy").hide();
    $("#divVorHealthFacilities").hide();
    $("#divVorHealth").hide();
    $("#divVorBeverages").hide();
    $("#divVorOwn").hide();
    $("#divVorTpt").hide();
    $("#divVorSchools").hide();
    $("#divVorBanks").hide();
    $("#divVorFin").hide();

    $("#optFiveGuys").hide();
    $("#logosDC").hide();
    $("#radiusDC").hide();
    $("#supermarketsDiv").hide();
    $("#marketOverviewTableSmall").hide();
    $("#marketOverviewTableBig").hide();
    $("#boundaryRegions").hide();
    $("#divMSASFilter").hide();
    $("#divDivisionBoundary").hide();
    $("#divStateBoundary").hide();
    $("#divCountiesBoundary").hide();
    $("#btnBoundaryReset").hide();
    $("#pdfOpts").hide();
    $("#cropTable").hide();
    $("#bankTable").hide();
    $("#optBanks").hide();
    $("#optAlbert").hide();
    $("#optKroger").hide();
    $("#boundaryOpts").hide();
    $("#printDiv").hide();
    $("#voronoiTable").hide();
    $("#voronoiControls").hide();
    $("#voronoiControlsHealthFacilities").hide();
    $("#voronoiControlsDC").hide();
    $("#voronoiControlsRef").hide();
    $("#voronoiControlsFoodAway").hide();
    $("#voronoiControlsFoodHome").hide();
    $("#voronoiControlsFoodSuperMarket").hide();
    $("#voronoiControlsFood").hide();
    $("#voronoiControlsBeverages").hide();
    $("#voronoiControlsHospital").hide();
    $("#voronoiControlsPrimary").hide();
    $("#voronoiControlsEnergy").hide();
    $("#voronoiControlsOwn").hide();
    $("#voronoiControlsTpt").hide();
    $("#voronoiControlsSchools").hide();
    $("#voronoiControlsBanks").hide();
    $("#voronoiControlsFin").hide();
    $("#divCohortsOptsVoronoi").hide();
    $("#voroAreaDiv").hide();
    $("#voroHealthFacilitiesAreaDiv").hide();
    $("#voroDCAreaDiv").hide();
    $("#voroRefAreaDiv").hide();
    $("#voroFoodAwayAreaDiv").hide();
    $("#voroFoodHomeAreaDiv").hide();
    $("#voroFoodSuperMarketAreaDiv").hide();
    $("#voroFoodAreaDiv").hide();
    $("#voroBeveragesAreaDiv").hide();
    $("#voroPrimaryAreaDiv").hide();
    $("#voroHospitalAreaDiv").hide();
    $("#voroEnergyAreaDiv").hide();
    $("#voroOwnAreaDiv").hide();
    $("#voroTptAreaDiv").hide();
    $("#voroSchoolsAreaDiv").hide();
    $("#voroBanksAreaDiv").hide();
    $("#voroFinAreaDiv").hide();
    $("#isoTrans").hide();
    $("#timeInterval").hide();
    $("#distInterval").hide();
    $("#divWithinCity").hide();
    $("#divWithoutCity").hide();
    $("#divRegion").hide();
    $("#optFreight").hide();
    $("#optAirports").hide();
    $("#optDataFiber").hide();
    $("#optDataFiberBuildings").hide();
    $("#radiusValues").hide();
    $("#casValues").hide();
    $("#blackTD").addClass("selectedTDStyle");
    $("#blackTDSocial").addClass("selectedTDStyle");
    $("#blackTDEcono").addClass("selectedTDStyle");
    $("#blackTDEnviro").addClass("selectedTDStyle");
    $("#magicsuggest").width($(window).width() - 450);
    $("#mainDivOutput").hide();
    $("#mainDivInput").hide();
    $("#mainDivCrosswalk").hide();
    $("#divType").hide();
    $("#lblType").hide();
    $("#divCohortsOpts").hide();
    $("#divDivision").hide();
    $("#divStates").hide();
    $("#divCounties").hide();
    $("#divZipcode").hide();
    $("#divZipcodeModal").hide();
    $("#divPTRROpts").hide();
    $("#divDivergentOptions").hide();
    $("#swipeYears").hide();
    $("#divTransRefri").hide();
    $("#divTransSocial").hide();
    $("#surfaceWaterDiv").hide();
    $("#divSelFramesSW").hide();
    $("#divTransPermits").hide();
    $("#divTransEconomic").hide();
    $("#graingerGroupsType").hide();
    $("#primaryeconomictypeDiv").hide();
    $("#divTransEnviro").hide();
    $("#divTransSocialTwo").hide();
    $("#divTransEconomicTwo").hide();
    $("#divTransEnviroTwo").hide();
    $("#divTransMuap").hide();
    $("#divCornOptions").hide();
    $("#divEggplantOptions").hide();/**/
    $("#logosEggPlants").hide();/**/
    $("#modal").hide();
    $("#divNeighbour").hide();
    $("#divCity").hide();
    $("#intervalValues").hide();
    $("#driveProfile").hide();
    $("#activitesRef").hide();
    $("#divShippingOpts").hide();
    $("#topVolume").hide();
    $("#intraBar").hide();
    $("#InteractiveChord").hide();

    $('#showInput').click(function() {
        $('#mainDivInput').animate({
            width: 'toggle'
        });
        if (showedInput) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');

            showedInput = false;
        } else {
            $('#showInput').css('margin-right', '350px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').show();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput = true;
            showedConditions, showedDeterminants, showedOutput, showedFood, showedHousing, showedHealth, showedCrosswalk = false;
        }
    });

    $('#showConditions').click(function() {
        $('#mainDivConditions').animate({
            width: 'toggle'
        });
        if (showedConditions) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');

            showedConditions = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '350px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').show();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput, showedDeterminants, showedOutput, showedFood, showedHousing, showedHealth, showedCrosswalk = false;
            showedConditions = true;
        }
    });

    $('#showOutput').click(function() {
        $('#mainDivOutput').animate({
            width: 'toggle'
        });
        if (showedOutput) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');

            showedOutput = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '475px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').show();
            $('#mainDivFood').hide();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput, showedDeterminants, showedConditions, showedFood, showedHousing, showedHealth, showedCrosswalk = false;
            showedOutput = true;
        }
    });

    $('#showFood').click(function() {
        $('#mainDivFood').animate({
            width: 'toggle'
        });
        if (showedFood) {
            $('#showInput').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');
            showedFood = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '350px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').show();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput, showedConditions, showedDeterminants, showedOutput, showedHousing, showedCrosswalk = false;
            showedFood = true;
        }
    });

    $('#showHousing').click(function() {
        $('#mainDivHousing').animate({
            width: 'toggle'
        });
        if (showedHousing) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');
            showedHousing = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '350px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHousing').show();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput, showedConditions, showedDeterminants, showedOutput, showedFood, showedHealth, showedCrosswalk = false;
            showedHousing = true;
        }
    });

    $('#showHealth').click(function() {
        $('#mainDivHealth').animate({
            width: 'toggle'
        });
        if (showedHealth) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');
            showedHealth = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '350px');
            $('#showCrosswalk').css('margin-right', '-150px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHealth').show();
            $('#mainDivDeterminants').hide();
            $('#mainDivCrosswalk').hide();
            showedInput, showedConditions, showedDeterminants, showedOutput, showedFood, showedHousing, showedCrosswalk = false;
            showedHealth = true;
        }
    });

    $('#showCrosswalk').click(function() {
        $('#mainDivCrosswalk').animate({
            width: 'toggle'
        });
        if (showedCrosswalk) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');
            showedCrosswalk = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '350px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHealth').hide();
            $('#mainDivCrosswalk').show();
            $('#mainDivDeterminants').hide();
            showedInput, showedConditions, showedDeterminants, showedOutput, showedFood, showedHousing, showedHealth = false;
            showedCrosswalk = true;
        }
    });

    $('#showDeterminants').click(function() {
        $('#mainDivDeterminants').animate({
            width: 'toggle'
        });
        if (showedDeterminants) {
            $('#showInput').css('margin-right', '0px');
            $('#showDeterminants').css('margin-right', '0px');
            $('#showConditions').css('margin-right', '0px');
            $('#showOutput').css('margin-right', '0px');
            $('#showFood').css('margin-right', '0px');
            $('#showHousing').css('margin-right', '0px');
            $('#showHealth').css('margin-right', '0px');
            $('#showCrosswalk').css('margin-right', '0px');
            showedDeterminants = false;
        } else {
            $('#showInput').css('margin-right', '-150px');
            $('#showConditions').css('margin-right', '-150px');
            $('#showHealth').css('margin-right', '-150px');
            $('#showCrosswalk').css('margin-right', '-150px');
            $('#showOutput').css('margin-right', '-150px');
            $('#showFood').css('margin-right', '-150px');
            $('#showHousing').css('margin-right', '-150px');
            $('#showDeterminants').css('margin-right', '350px');

            $('#mainDivInput').hide();
            $('#mainDivConditions').hide();
            $('#mainDivOutput').hide();
            $('#mainDivFood').hide();
            $('#mainDivHealth').hide();
            $('#mainDivDeterminants').show();
            $('#mainDivCrosswalk').hide();
            showedInput, showedConditions, showedOutput, showedFood, showedHousing, showedHealth, showedCrosswalk = false;
            showedDeterminants = true;
        }
    });

    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

    $("input[name='isoOptions']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        if (th.attr('id') == "time") {
            $("#timeInterval").show();
            $("#distInterval").hide();
            $("#driveProfile").show();

            $("#firstInterval").attr('max', 10);
            $("#secondInterval").attr('max', 20);
            $("#thirdInterval").attr('max', 30);
            $("#fourthInterval").attr('max', 40);
            $("#fifthInterval").attr('max', 50);
            $("#sixthInterval").attr('max', 60);
        }
        if (th.attr('id') == "distance") {
            $("#timeInterval").hide();
            $("#distInterval").show();
            $("#driveProfile").hide();

            $("#firstInterval").attr('max', 10);
            $("#secondInterval").attr('max', 20);
            $("#thirdInterval").attr('max', 30);
            $("#fourthInterval").attr('max', 40);
            $("#fifthInterval").attr('max', 50);
            $("#sixthInterval").attr('max', 60);
        }
        $("#intervalValues").show();
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
    });

    $("input[name='neighborhoodType']").change(function(e) {
        $("#divWithinCity").hide();
        $("#divWithoutCity").hide();
        var result = '';
        for (i = 0; i < $("#city").val().length; i++) {
            result += "b.gid='" + $("#city").val()[i] + "' or ";
        }
        result = result.substring(0, result.length - 3);

        var th = $(this),
            name = th.attr('name');
        if (th.attr('id') == "city") {
            $('#withinCity').each(function(index, value) {
                var select = $(this);
                var list = [];
                $.getJSON("readGeojson.php?cond=getNeighbourWith&value=" + result, function(data) {
                    if (data.length == 0) {
                        toastr.error("No neighborhoods found for this city");
                        return;
                    } else {
                        list.push('<option value="none">Select the Neighborhood</option>');
                        $.each(data, function(key, val) {
                            list.push('<option value="' + val.gid + '">' + val.name + '</option>');
                        });
                        select.html(list.join(''));
                        select.selectpicker('refresh');
                        $("#divWithinCity").show();
                        $("#divWithoutCity").hide();
                    }
                });
            });
        }
        if (th.attr('id') == "notcity") {
            $('#withoutCity').each(function(index, value) {
                var select = $(this);
                var list = [];
                $.getJSON("readGeojson.php?cond=getNeighbourWithout&value=" + result, function(data) {
                    if (data.length == 0) {
                        return;
                    } else {
                        list.push('<option value="none">Select the Neighborhood</option>');
                        $.each(data, function(key, val) {
                            list.push('<option value="' + val.gid + '">' + val.name + '</option>');
                        });
                        select.html(list.join(''));
                        select.selectpicker('refresh');
                        $("#divWithinCity").hide();
                        $("#divWithoutCity").show();
                    }
                });
            });
        }
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
    });

    $("input[name='optDrawing']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        casVal = th.attr('id');
    });

    $("input[name='cohortsThemeRefri']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsRefri').selectpicker('val', 'standard');
        applyCohortTheme(selectedTheme);
    });

    $("input[name='cohortsThemeFood']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsFood').selectpicker('val', 'standard');
        applyCohortThemeFood(selectedTheme);
    });

    $("input[name='cohortsThemeSocial']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsSocial').selectpicker('val', 'standard');
        applyCohortTheme(selectedTheme);
    });

    $("input[name='cohortsThemeEcono']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsEcono').selectpicker('val', 'standard');
        applyCohortTheme(selectedTheme);
    });

    $("input[name='cohortsThemeEconomicTwo']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsEconoTwo').selectpicker('val', 'standard');
        applyCohortThemeEcono(selectedTheme);
    });

    $("input[name='cohortsThemeEnviro']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsEnviro').selectpicker('val', 'standard');
        applyCohortTheme(selectedTheme);
    });

    $("input[name='cohortsThemeEnviroTwo']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsEnviroTwo').selectpicker('val', 'standard');
        applyCohortThemeEnviro(selectedTheme);
    });

    $("input[name='cohortsThemePermits']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsPermits').selectpicker('val', 'standard');
        applyCohortThemePermits(selectedTheme);
    });

    $("input[name='cohortsThemeMuap']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        selectedTheme = th.attr('id');
        if (th.is(':checked')) {
            $(':checkbox[name="' + name + '"]').not(th).prop('checked', false);
        }
        $('#cohortOptsMuap').selectpicker('val', 'standard');
        applyCohortTheme(selectedTheme);
    });

    $("#iptCropYears").slider({
        animate: true,
        min: 2012,
        max: 2017,
        value: 2017,
        step: 1,
        create: function() {
            $("#crophandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            wmsNeOneTwo.setVisible(false);
            wmsNeOneThree.setVisible(false);
            wmsNeOneFour.setVisible(false);
            wmsNeOneFive.setVisible(false);
            wmsNeOneSix.setVisible(false);
            wmsNeOneSeven.setVisible(false);

            $("#crophandle").text(ui.value);
            var newVal = ui.value;

            switch (newVal) {
                case 2012:
                    wmsNeOneTwo.setVisible(true);
                    addLegendContent('<div id="neOneTwoLegend"><table><tr><td><a id="neOneTwoImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneTwo" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2012</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
                case 2013:
                    wmsNeOneThree.setVisible(true);
                    addLegendContent('<div id="neOneThreeLegend"><table><tr><td><a id="neOneThreeImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneThree" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2013</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
                case 2014:
                    wmsNeOneFour.setVisible(true);
                    addLegendContent('<div id="neOneFourLegend"><table><tr><td><a id="neOneFourImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneFour" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2014</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
                case 2015:
                    wmsNeOneFive.setVisible(true);
                    addLegendContent('<div id="neOneFiveLegend"><table><tr><td><a id="neOneFiveImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneFive" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2015</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
                case 2016:
                    wmsNeOneSix.setVisible(true);
                    addLegendContent('<div id="neOneSixLegend"><table><tr><td><a id="neOneSixImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneSix" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2016</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
                case 2017:
                    wmsNeOneSeven.setVisible(true);
                    addLegendContent('<div id="neOneSevenLegend"><table><tr><td><a id="neOneSevenImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="neOneSeven" onchange="handleLegend($(this));" checked/></td><td>Nebraska Crop Layer-2017</td></tr></table></div>', true, "legendDisplayBoundaries");
                    break;
            }
        }
    });

    $("#iptRadiusOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        max: 1,
        value: 0.1,
        step: 0.1,
        create: function() {
            $("#radiushandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#radiushandle").text(ui.value);
            var newVal = ui.value;

            updateRadiusStyle(newVal);
        }
    });

    $("#iptIsoOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        max: 1,
        value: 1,
        step: 0.1,
        create: function() {
            $("#isohandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#isohandle").text(ui.value);
            var newVal = ui.value;
            isoChroneLayer.setOpacity(newVal);
        }
    });

    $("#iptVorPrimaryOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorPrimaryhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorPrimaryhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorEnergyOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorEnergyhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorEnergyhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorOwnOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorOwnhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorOwnhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorTptOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorTpthandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorTpthandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorSchoolsOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorSchoolshandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorSchoolshandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorBanksOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorBankshandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorBankshandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorFinOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorFinhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorFinhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorFoodOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorFoodhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorFoodhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorBeveragesOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorBeverageshandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorBeverageshandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorDCOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorDChandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorDChandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorRefOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorRefhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorRefhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorFoodHomeOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorFoodHomehandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorFoodHomehandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorFoodAwayOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorFoodAwayhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorFoodAwayhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorFoodSuperMarketOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorFoodSuperMarkethandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorFoodSuperMarkethandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorHospitalOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorHospitalhandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorHospitalhandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    $("#iptVorHealthFacilitiesOpacity").slider({
        animate: true,
        range: "min",
        min: 0,
        value: 0.5,
        max: 1,
        step: 0.1,
        create: function() {
            $("#vorHealthFacilitieshandle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#vorHealthFacilitieshandle").text(ui.value);
            var newVal = ui.value;
            voronoiPolygons.setOpacity(newVal);
        }
    });

    limitInputs();

    $("input[name='iconsControls']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        if (th.attr('id') == "chkIcon") {
            handleIcons('icon');
        }
        if (th.attr('id') == "chkLogo") {
            handleIcons('logo');
        }
        if (th.attr('id') == "chkVoronoi") {
            handleIcons('voronoi');
        }
        if (th.attr('id') == "chkCluster") {
            handleIcons('cluster');
        }
    });
	
    $("input[name='radiusControls']").change(function(e) {
        var th = $(this),
            name = th.attr('name');
        if (th.attr('id') == "chkRadiusOne") {
			$("#iptRadiusOpacity").slider('value','0.1');
			$( "#radiushandle" ).text( $("#iptRadiusOpacity").slider( "value" ) );
        }
        if (th.attr('id') == "chkRadiusTwo") {
			$("#iptRadiusOpacity").slider('value','0.4');
			$( "#radiushandle" ).text( $("#iptRadiusOpacity").slider( "value" ) );
        }
        if (th.attr('id') == "chkRadiusThree") {
			$("#iptRadiusOpacity").slider('value','1');
			$( "#radiushandle" ).text( $("#iptRadiusOpacity").slider( "value" ) );
        }
		updateRadiusStyle($("#iptRadiusOpacity").slider("value"));
    });

    $('#chkAdd, #chkAddDC, #chkAddRef, #chkAddFoodAway, #chkAddFoodHome, #chkAddFoodSuperMarket, #chkAddFood, #chkAddBeverages, #chkAddPrimary, #chkAddEnergy, #chkAddOwn, #chkAddTpt, #chkAddSchools, #chkAddBanks, #chkAddFin').change(function() {
        if ($(this).is(":checked")) {
            olPan(true);
            whileDraw = true;
			pan = false;
            add = true;
            del = false;
            modify = false;
        }
    });

    $('#chkDel, #chkDelDC, #chkDelRef, #chkDelFoodAway, #chkDelFoodHome, #chkDelFoodSuperMarket, #chkDelFood, #chkDelBeverages, #chkDelPrimary, #chkDelEnergy, #chkDelOwn, #chkDelTpt, #chkDelSchools, #chkDelBanks, #chkDelFin').change(function() {
        if ($(this).is(":checked")) {
            olPan(true);
			pan = false;
            whileDraw = true;
            del = true;
            add = false;
            modify = false;
        }
    });

    $('#chkPan,#chkPanDC, #chkPanRef, #chkPanFoodAway, #chkPanFoodHome, #chkPanFoodSuperMarket, #chkPanFood, #chkPanBeverages, #chkPanPrimary, #chkPanEnergy, #chkPanOwn, #chkPanTpt, #chkPanSchools, #chkPanBanks, #chkPanFin').change(function() {
        if ($(this).is(":checked")) {
            olPan(true);
			pan = true;
            whileDraw = false;
            modify = false;
            del = false;
            add = false;
        }
    });

    $('#chkInteractive, #chkInteractiveDC, #chkInteractiveRef, #chkInteractiveFoodAway, #chkInteractiveFoodHome, #chkInteractiveFoodSuperMarket, #chkInteractiveFood, #chkInteractiveBeverages, #chkInteractivePrimary, #chkInteractiveEnergy, #chkInteractiveOwn, #chkInteractiveTpt, #chkInteractiveSchools, #chkInteractiveBanks, #chkInteractiveFin').change(function() {
        if ($(this).is(":checked")) {
            olPan(false);
            whileDraw = true;
            modify = true;
            del = false;
            add = false;
        }
    });
	
	try {
		document.getElementById('export-png').addEventListener('click', function() {
			toastr.info("Please wait, PNG of the current map view is being generated and downloaded");
			var exportPNGElement = document.getElementById('export-png');
			var canvas = $('canvas').get(1);
			function setDPI(canvas, dpi) {
				var scaleFactor = dpi / 96;
				canvas.width = Math.ceil(canvas.width * scaleFactor);
				canvas.height = Math.ceil(canvas.height * scaleFactor);
				var ctx=canvas.getContext("2d");
				ctx.scale(scaleFactor, scaleFactor);
			}
  
			map.once('precompose', function(event) {
				setDPI(canvas,document.getElementById('pngDPI').value);
			});
	
			map.once('postcompose', function(event) {
				canvas.toBlob(function(blob) {
					saveAs(blob, 'Ari-Map.png');
				}, 'image/jpeg', 0.99);
			});
	
			map.renderSync();
		});
	}
	catch(e)
	{}

	try {
		document.getElementById('export-jpeg').addEventListener('click', function() {
			map.once('postcompose', function(event) {
				var canvas = event.context.canvas;
				if (navigator.msSaveBlob) {
					navigator.msSaveBlob(canvas.msToBlob(), 'map.jpg');
				} else {
					canvas.toBlob(function(blob) {
						saveAs(blob, 'map.jpg');
					});
				}
			});
			map.renderSync();
		});
	}
	catch(e)
	{}

	$("#export-pdf-main").on('click', function(evt) {
		$("#pdfOpts").show();
	});

	$("#export-lpc").on('click', function(evt) {
      var dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148],
		letter: [215.9, 279.4],
		legal: [216, 356],
		tabloid: [279.4, 431.8]
      };

      var loading = 0;
      var loaded = 0;
		toastr.info("Please wait, PDF of the current map view is being generated and downloaded");

        // exportButton.disabled = true;
        document.body.style.cursor = 'progress';

        var format = document.getElementById('format').value;
        var resolution = document.getElementById('resolution').value;
        var dim = dims[format];
        var width = Math.round(dim[0] * resolution / 25.4);
        var height = Math.round(dim[1] * resolution / 25.4);
        var size = /** @type {ol.Size} */ (map.getSize());
        var extent = map.getView().calculateExtent(size);

		var raster;
		if (window.location.hash !== '') {
			var hash = window.location.hash.replace('#map=', '');
			var parts = hash.split('/');
			if (parts.length === 5) {
					base = parts[4];
			}
			if (base == "aerial") {
				raster = bingAerial;
			} else if (base == "terrain") {
				raster = terrainStamen;
			} else if (base == "roads") {
				raster = bingRoads;
			} else if (base == "osm") {
				raster = osmLight;
			}
		}
        var source = raster.getSource();

        var tileLoadStart = function() {
          ++loading;
        };

        var tileLoadEnd = function() {
          ++loaded;
          if (loading === loaded) {
            var canvas = this;
            window.setTimeout(function() {
              loading = 0;
              loaded = 0;
              var data = canvas.toDataURL('image/png');
              var pdf = new jsPDF('landscape', undefined, format);
              pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
			  // console.log('ab kar');
              pdf.save('map.pdf');
              source.un('tileloadstart', tileLoadStart);
              source.un('tileloadend', tileLoadEnd, canvas);
              source.un('tileloaderror', tileLoadEnd, canvas);
              map.setSize(size);
              map.getView().fit(extent);
              map.renderSync();
              // exportButton.disabled = false;
              document.body.style.cursor = 'auto';
            }, 100);
          }
        };

        map.once('postcompose', function(event) {
          source.on('tileloadstart', tileLoadStart);
          source.on('tileloadend', tileLoadEnd, event.context.canvas);
          source.on('tileloaderror', tileLoadEnd, event.context.canvas);
        });

        map.setSize([width, height]);
        map.getView().fit(extent);
        map.renderSync();
	});

    toggleSearchDivs('srchZip');

	$("#selRatio").change(function() {
		removeLayersRatios();
		if($("#selRatio").val() == "none"){
			$("#searchBarRatios").val('');
			$("#crRatioOpts").hide();
			$("#btnGetRatios").hide();
			$("#btnGoRatio").hide();
			return;
		}

		$("#crRatioOpts").show();
		hideLabels = true;
		var value1 = $("#selRatio").val().split('-')[0];
		if(value1 == 'cbsa10') {
			ratioCBSA10 = getBoundaryCR(value1 + "_ratio");
			map.addLayer(ratioCBSA10);
		}
		else {
			ratioStates = getBoundaryCR("states_ratio");
			map.addLayer(ratioStates);
		}
	});

	$("#selCode").change(function() {
		Ghosted = "Off";
		hideAndClearAll();
		removeLayers();
		var code=$("#selCode").val();
		var instructionsArray = {Zip: '36322;36005', Tracts: '01097003301;01073003300', Counties: 'Cook,IL; DuPage,IL; Will,IL'};
		if(code !== "SubWatershed")
			wmsSubWatershed.setVisible(false);
		if(code=='Zip' || code=='Tracts' || code=='Counties' || code=='LauCnty' || code=='Cities' || code=='Districts' || code=='MSAs' || code=='NeighbourCities' || code=='State' || code=='Food_Report' || code=='Schools_CCD' || code=='ConsumerMarket' || code=='HRR' || code=='HSA' || code=='SubBasin' || code=='SubWatershed' || code == 'OpportunityZones'  || code=='STR_Geocoded_All_New') {
			toastr.info("Use ';' delimiter for searching Multiple "+code+" like "+ instructionsArray[code] +"");
			toggleSearchDivs('srch'+code+'');
			toggleBaseLayers(baseStates);
            addLegendContent('<div id="stateLegend"><table><tr><td><a id="statesImg" onclick="removeLayer($(this));"><img height="15px" width="15px" src="images/remove.png"></a></td><td><input type="checkbox" id="states" onchange="handleLegend($(this));" checked/></td><td><img height="5px" width="19px" src="images/Legend/states.png" /></td><td>States</td></tr></table></div>', true, "legendDisplayBoundaries");
		}
		else if(code=='Region' || code=='BEA10' || code=='CBSA10' || code=='ERS10' || code=='ERS10Rep' || code=='MSAs_Grainger' || code=='PEA10' || code=='TP10' || code=='TP10METRO' || code=='TP10MICRO' || code=='TribalLand' || code=='WaterShedRegions') {
			toggleSearchDivs('srch'+code+'');
			toggleBaseLayers(eval('base'+code));
		}
	});

	$(".selGo").change(function(){
		try{ map.removeLayer(crswlkOverlay); } catch(e){}
		var eleID = $(this).attr('id');
		var boundary = eleID.split('Go').pop();
		Crosswalk(boundary, reportID[boundary]);
	});

	$("#selRelation").change(function(){
		$('#myModal').removeClass('show');
		$("#selTr-St").val('default').selectpicker("refresh");
		$(".timespan").hide();
		if($("#selRelation").val()=="st-tract")
			$(".timespan").show();
	});

	$("#selTr-St").change(function(){
		if($("#selTr-St").val()=='none'){
			$('#myModal').removeClass('show');
			return;
		}
		$.ajax({
			dataType: "json",
			url: 'server_scripts/readGeojson.php?value=none&cond='+$("#selTr-St").val(),
			beforeSend: function(e) {
				$(".table-loader").show();
			},
			success: function(data) {
				$(".table-loader").hide();
				var table=''
				if(data.length!=0){
					if($("#selTr-St").val()=='chng1year'){
						table='<div style=" color: rgba(58, 131, 124, 0.81); margin-bottom: 10px;">Toggle column: <a class="toggle-vis" data-column="0">State</a> - <a class="toggle-vis" data-column="1">State ID</a> - <a class="toggle-vis" data-column="2">County</a> - <a class="toggle-vis" data-column="3">County ID</a> - <a class="toggle-vis" data-column="4"># of Tracts 2017</a> - <a class="toggle-vis" data-column="5"># of Tracts 2018</a></div>';
						table+='<table border="1" id="myTable" style="width: 100%;" class="table table-bordered tablesorter"><thead><tr><th scope="col">State</th><th scope="col">State ID</th><th scope="col">County</th><th scope="col">County ID</th><th scope="col"># of Tracts 2017</th><th scope="col"># of Tracts 2018</th></tr></thead>';
					}
					else if($("#selTr-St").val()=='chng7year'){
						 table='<div style="margin-bottom: 8px;color: rgba(58, 131, 124, 0.81); margin-bottom: 10px;">Toggle column: <a class="toggle-vis" data-column="0">State</a> - <a class="toggle-vis" data-column="1">State ID</a> - <a class="toggle-vis" data-column="2">County</a> - <a class="toggle-vis" data-column="3">County ID</a> - <a class="toggle-vis" data-column="4"># of Tracts 2010</a> - <a class="toggle-vis" data-column="5"># of Tracts 2017</a></div>';
						 table+='<table border="1" id="myTable" style="width: 100%;" class="table table-bordered tablesorter"><thead><tr><th scope="col">State</th><th scope="col">State ID</th><th scope="col">County</th><th scope="col">County ID</th><th scope="col"># of Tracts 2010</th><th scope="col"># of Tracts 2017</th></tr></thead>';
					}
					else if($("#selTr-St").val()=='chng8year'){
						 table='<div style="margin-bottom: 8px;color: rgba(58, 131, 124, 0.81); margin-bottom: 10px;"><b>Toggle column: </b><a class="toggle-vis" data-column="0">State</a> - <a class="toggle-vis" data-column="1">State ID</a> - <a class="toggle-vis" data-column="2">County</a> - <a class="toggle-vis" data-column="3">County ID</a> - <a class="toggle-vis" data-column="4"># of Tracts 2010</a> - <a class="toggle-vis" data-column="5"># of Tracts 2018</a></div>';
						 table+='<table border="1" id="myTable" style="width: 100%;" class="table table-bordered tablesorter"><thead><tr><th scope="col">State</th><th scope="col">State ID</th><th scope="col">County</th><th scope="col">County ID</th><th scope="col"># of Tracts 2010</th><th scope="col"># of Tracts 2018</th></tr></thead>';
					}
					table+='<tbody><tr>';
					for(var i=0;i<data.length;i++){

						table+='<td>'+data[i].stusps+'</td>';
						table+='<td>'+data[i].statefp+'</td>';
						table+='<td>'+data[i].name+'</td>';
						table+='<td>'+data[i].countyfp+'</td>';
						if($("#selTr-St").val()=='chng1year'){
							table+='<td>'+data[i].num_of_tracts17+'</td>';
							table+='<td>'+data[i].num_of_tracts18+'</td>';
						}
						else if($("#selTr-St").val()=='chng7year'){
							table+='<td>'+data[i].num_of_tracts10+'</td>';
							table+='<td>'+data[i].num_of_tracts17+'</td>';
						}
						else if($("#selTr-St").val()=='chng8year'){
							table+='<td>'+data[i].num_of_tracts10+'</td>';
							table+='<td>'+data[i].num_of_tracts18+'</td>';
						}
						table+='</tr>';
					}
					table+='</tbody></table>';
				}
				else{
					table='<span style="font-size: 18px; font-weight: bold; color: #000;">No Data Found!!</span>'
				}
				$("#myModalLabel").html('Summary for Census Tracts Changes Over Years');
				$("#table").html('');
				$("#table").html(table);
				$("#table").show();
				$("#optionsCounty").hide();
				$('#myModal').removeClass('fade');
				$('#myModal').addClass('show');
				paginateTable(10);
			}
		});
	});

	$("#searchBarZip").on('keypress',function(e) {
		$("#searchBarZip").css('border', '1px solid rgba(38,166,154,0.8)');
		toastr.clear();
	});
	$("#searchBarTracts").on('keypress',function(e) {
		$("#searchBarTracts").css('border', '1px solid rgba(38,166,154,0.8)');
		toastr.clear();
	});

	$("#searchBarCounties").on('keypress',function(e) {
		$("#searchBarCounties").css('border', '1px solid rgba(38,166,154,0.8)');
		toastr.clear();
	});

	$(".close, .cls").on("click",function(){
		$('#myModal').removeClass('show');
		$('#myModal').addClass('fade');
	});

	$(".showReport, #btnGoRatio").on("click",function(){
		$('#myModal').removeClass('fade');
		$('#myModal').addClass('show');
	});

	$(".close2").on("click",function(){
		$('.modal').removeClass('show');
		$('.modal').addClass('fade');
	});

	$('#radioBtn a').on('click', function(){
		var sel = $(this).data('title');
		var tog = $(this).data('toggle');

		$('#'+tog).prop('value', sel);

		$('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
		$('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
		if(sel=="Change"){
			$("#divCrosswalk").hide();
			$("#divRatio").hide();
			$("#divChanges").show();
		}
		else if(sel=="Crosswalk"){
		removeLayersRatios();
			$("#divChanges").hide();
			$("#divRatio").hide();
			$("#divCrosswalk").show();
		}
		else if(sel=="Ratio"){
		baseStates.setVisible(false);
		removeLayers();
			$("#divChanges").hide();
			$("#divCrosswalk").hide();
			$("#divRatio").show();
		}
	});

	$('#resizeDiv')
		.draggable({ handle:'.modal-header'})
		.resizable({
			minHeight: 300,
			minWidth: 300,
			resize: function( event, ui ) {
				var h = $('#resizeDiv').height();
				h = h-80;
				$('.modal-body').css("height", h);
			}
	});

	$('body').on('click', 'a.toggle-vis', function(e) {
		e.preventDefault();
		var column = t.column( $(this).attr('data-column') );
		column.visible( ! column.visible() );
	});
});

function finishPrint()
{
	$("#printDiv").hide();
}

function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    return result;
}

var formatArea = function(polygon) {
    var area = ol.Sphere.getArea(polygon);
    var output = (Math.round(area * 100 * 10.764) / 100);
    return output;
};

var formatLength = function(line) {
    var length = ol.Sphere.getLength(line);
    var output;
    if (length > 100) {
        output = ((Math.round(length / 1000 * 100) / 100) * 0.621371).toFixed(2) +
            ' ' + 'miles';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};

var formatAreaAcres = function(polygon) {
    var area = ol.Sphere.getArea(polygon);
    var output = Math.round(((area * 100 * 10.764) / 100) * 0.000022956841138659);
    return output;
};

function getWFSCluster(layerTitle, layerName, distance) {
    condition = layerTitle;

    var source = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        loader: function(extent, resolution, projection) {
            var extent = map.getView().calculateExtent(map.getSize());
            extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
            var url = '../geoserver/wfs?' +
                'service=WFS&request=GetFeature&' +
                'version=1.0.0&typename=Farmer:' + layerName + '&' +
                'outputFormat=application/json&';

            if (layerName == "enterprisebuildings")
                url += 'PropertyName=gid,name,geom&';
            if (layerName == "networkbuildings")
                url += 'PropertyName=gid,name,geom&';
            if (layerName == "farmers")
                url += 'PropertyName=gid,name,street,county,city,state,zip,latitude,longitude,geom&';
            if (layerName == "stores")
                url += 'PropertyName=id,name,address,city,state,zip,latitude,longitude,geom&';
            if (layerName == "logos")
                url += 'PropertyName=id,name,address,city,logo,state,zipcode,latitude,longitude,geom&';
            if (layerName == "hsb")
                url += 'PropertyName=id,name,latitude,longitude,type,geom&';
            if (layerName == "transitstations")
                url += 'PropertyName=gid,name,sys_agency,city,state,zip,latitude,longitude,geom&';
            if (layerName == "port_facility")
                url += 'PropertyName=gid,name,type,location,city,statepcode,zip,countyname,latitude,longitude,geom&';
            if (layerName == "gardens")
                url += 'PropertyName=gid,name,descriptio,latitude,longitude,geom&';
            if (layerName == "homemade_shelters")
                url += 'PropertyName=gid,name,street,city,state,zip,phone,website,latitude,longitude,geom&';
            if (layerName == "unitsa")
                url += 'PropertyName=gid,storeno,name,address,city,state,zip,dmamember,dmadc,mainlinedc,deliverydays,geom&';
            if (layerName == "unitsb")
                url += 'PropertyName=gid,storeno,name,address,city,state,zip,mainlinedc,deliverydays,geom&';
            if (layerName == "potbellytwo")
                url += 'PropertyName=id,name,differencetwo,geom&';
            if (layerName == "hot_springs")
                url += 'PropertyName=gid,name,state,tempf,tempc,geom&';
            if (layerName == "landbanks")
                url += 'PropertyName=gid,name,website,year,geom&';
            if (layerName == "iana")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (layerName == "traffic")
                url += 'PropertyName=gid,name,to,from,latest,angle,geom&';
            if (layerName == "ports")
                url += 'PropertyName=gid,name,river,state,geom&';
            if (layerName == "dhl")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (layerName == "fedex")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (layerName == "ups")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (layerName == "mclane")
                url += 'PropertyName=gid,name,address,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "amazon")
                url += 'PropertyName=gid,name,address,latitude,longitude,descriptio,geom&';
            if (layerName == "sysco")
                url += 'PropertyName=gid,name,address,phone,fax,latitude,longitude,geom&';
            if (layerName == "robinsonfresh")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (layerName == "kehe")
                url += 'PropertyName=gid,name,address,area,website,geom&';
            if (layerName == "pfgpfs")
                url += 'PropertyName=gid,name,address,state,zip,phone,type,geom&';
            if (layerName == "sygma")
                url += 'PropertyName=gid,name,address,state,zip,phone,geom&';
            if (layerName == "dmadcs")
                url += 'PropertyName=gid,name,address,geom&';
            if (layerName == "vistar")
                url += 'PropertyName=gid,name,address,state,zip,phone,geom&';
            if (layerName == "flagpoints")
                url += 'PropertyName=gid,name,latitude,longitude,geom&';
            if (layerName == "albertsons")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,hours,latitude,longitude,geom&';
            if (layerName == "kroger")
                url += 'PropertyName=gid,name,storeno,fullname,street,city,state,zip,geom&';
            if (layerName == "aldi_2016")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (layerName == "aldi_2018")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (layerName == "culver")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "potbelly")
                url += 'PropertyName=gid,name,address,city,state,postal_code,phone,hours,pickup_menu,delivery_menu,open_hours,delivery_hours,has_breakfast,has_kids,geom&';
            if (layerName == "starbucks")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "raisingcanes")
                url += 'PropertyName=gid,name,alternatetitle,status,operatinghours,summerhours,phone,opening_date,url,distance,address,hours,geom&';
            if (layerName == "fiveguys")
                url += 'PropertyName=gid,name,address,city,state,zip,beer,breakfast,cokefrees,milkshakes,poutine,delivery,geom&';
            if (layerName == "thornton")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "dicks")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,hours,latitude,longitude,geom&';
            if (layerName == "keef")
                url += 'PropertyName=gid,name,address,phone,website,latitude,longitude,geom&';
            if (layerName == "ethanol_plants")
                url += 'PropertyName=gid,name,company,state,geom&';
            if (layerName == "grainger")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (layerName == "publix")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,fax,latitude,longitude,geom&';
            if (layerName == "gianteagle")
                url += 'PropertyName=gid,name,brand,address,city,state,zip,geom&';
            if (layerName == "traderjoes")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "wholefoods")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (layerName == "shoppingcenter")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (layerName == "foodplants")
                url += 'PropertyName=gid,id,name,type,latitude,longitude,geom&';
            if (layerName == "ngpoperators")
                url += 'PropertyName=gid,name,geom&';
            if (layerName == "hydroponic_growers")
                url += 'PropertyName=gid,id,locations_id,name,loc_type,address,city,state,zip,phone,fax,geom&';
            if (layerName == "distributor")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (layerName == "names_natural")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph&';
            if (layerName == "names_manmade")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph&';
            if (layerName == "interchanges")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph&';
            if (layerName == "closings")
                url += 'PropertyName=gid,name,address,city,state,date,store,footnote,latitude,longitude,geom&';
            if (layerName == "ranchesandfarms")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph&';
            if (layerName == "dma")
                url += 'PropertyName=gid,name,distributo,address,city,state,postalcode,latitude,longitude,geom&';
            if (layerName == "brownfields")
                url += 'PropertyName=gid,name,state,county,latitude,longitude,geom&';
            if (layerName == "schools_ccd_primary")
                url += 'PropertyName=gid,name,latitude,longitude,geom,scsd,ccd&';
            if (layerName == "schools_pss_private")
                url += 'PropertyName=gid,name,latitude,longitude,geom,scsd,ccd&';
            if (layerName == "refrigeratedlocations")
                url += 'PropertyName=gid,name,street,city,state,zip,phone,activities,latitude,longitude,geom&';
            if (layerName == "toysrus")
                url += 'PropertyName=gid,storenum,chain,name,street,city,state,zip,leasetype,entity,grossarea,sellarea,latitude,longitude,geom&';
            if (layerName == "gymboree")
                url += 'PropertyName=gid,id,name,address,postal_code,city,state,country,phone,store_hours,store_hours_1,store_hours_2,store_hours_3,type,geom,brand&';
            if (layerName == "corn")
                url += 'PropertyName=gid,name,verypoor,poor,fair,good,excellent,allp_2018,allp_2017,ah_2017,ah_2018,geom&';
            if (layerName == "cbrands")
                url += 'PropertyName=gid,name,facility,country,area,geom&';
            if (layerName == "tstops")
                url += 'PropertyName=gid,name,geom&';
            if (layerName == "banks_2012")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (layerName == "banks_2016")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (layerName == "banks_2017")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (layerName == "creditunions")
                url += 'PropertyName=gid,cu_num,join_num,site_id,name,sitename,sitetype,mainoffice,address,city,state,zip,geom&';
            if (layerName == "edwardjones")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (layerName == "agencies")
                url += 'PropertyName=gid,name,street,city,state,zip,geom&';
            if (layerName == "agent_za")
                url += 'PropertyName=gid,name,city,state,zip,geom&';
            if (layerName == "agent_ca")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (layerName == "parkway")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,depdom,asset,dep_change_1,dep_change_1per,dep_change_5,dep_change_5per,ass_change_1,ass_change_1per,ass_change_5,ass_change_5per,geom,sum2017,sum2018&';
            if (layerName == "tartan")
                url += 'PropertyName=gid,name,address,city,state,zip,url,geom&';
            if (layerName == "uhaul")
                url += 'PropertyName=gid,name,street,city,state,zip,geom&';
            if (layerName == "fortune")
                url += 'PropertyName=gid,rank,name,address,city,state,zip,countyfips,county,website,employees,revenues,profit,geom&';
            if (layerName == "fairgrounds")
                url += 'PropertyName=gid,name,address,city,state,zip_code,county,geom&';
            if (layerName == "paca")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (layerName == "poultryfacilities")
                url += 'PropertyName=gid,id,name,telephone,address,city,state,zip,county,descriptio,geom&';
            if (layerName == "tapetro")
                url += 'PropertyName=gid,site_id,brand,locationid,state,city,name,directions,address,pobox,zip,phone,latitude,longitude,geom&';
            if (layerName == "biodiesel_plants")
                url += 'PropertyName=gid,name,address,city,state,zip,status,website,latitude,longitude,geom&';
            if (layerName == "oil_refineries")
                url += 'PropertyName=gid,name,address,city,state,zip,type,website,latitude,longitude,geom&';
            if (layerName == "dentalfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (layerName == "mentalfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (layerName == "primaryfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (layerName == "asc")
                url += 'PropertyName=gid,facilityid,name,type,subtype,street,city,state,zip,telephone,geom&';
            if (layerName == "dermasolo")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (layerName == "dermagroup")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (layerName == "plasticsurgerysolo")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (layerName == "plasticsurgerygroup")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (layerName == "providers")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,geom&';

            url += 'srsname=EPSG:3857&bbox=' + extent.join(',');
            var tilesLoaded = 0;
            var tilesPending = 0;

            $.ajax({
                url: url,
                dataType: 'json',
                beforeSend: function(e) {
                    // if(ajaxReq != 'ToCancelPrevReq' && ajaxReq.readyState < 4) {
                    // ajaxReq.abort();
                    // }
                    try {
                        source.clear();
                    } catch (ex) {}
                    $('#js-progress-bar').css({
                        'opacity': '1',
                        'height': '5px',
                        'width': '5%'
                    });
                    ++tilesPending;
                },
                success: function(data) {
                    ++tilesLoaded;
                    var percentage = Math.round(tilesLoaded / tilesPending * 100);
                    $('#js-progress-bar').css({
                        'width': percentage + '%'
                    });
                    var radVal;

                    if (percentage >= 100) {
                        var features = geoJSONFormat.readFeatures(data);
                        source.addFeatures(features);
                        var sourceToAdd;
                        switch (layerName) {
                            case "albertsons":
                                radVal = $("#intervalAlbertsons").val();
                                sourceToAdd = radiusAlbertsonsSource;
                                radiusAlbertsonsSource.clear();
                                break;
                            case "kroger":
                                radVal = $("#intervalKroger").val();
                                sourceToAdd = radiusKrogerSource;
                                radiusKrogerSource.clear();
                                break;
                            case "closings":
                                radVal = $("#intervalInterchanges").val();
                                sourceToAdd = radiusClosingsSource;
                                radiusClosingsSource.clear();
                                break;
                            case "toysrus":
                                radVal = $("#intervalInterchanges").val();
                                sourceToAdd = radiusToysrusSource;
                                radiusToysrusSource.clear();
                                break;
                            case "gymboree":
                                radVal = $("#intervalInterchanges").val();
                                sourceToAdd = radiusGymboreeSource;
                                radiusGymboreeSource.clear();
                                break;
                            case "culver":
                                radVal = $("#intervalCulver").val();
                                sourceToAdd = radiusCulverSource;
                                radiusCulverSource.clear();
                                break;
                            case "potbelly":
                                radVal = $("#intervalPotbelly").val();
                                sourceToAdd = radiusPotbellySource;
                                radiusPotbellySource.clear();
                                break;
                            case "starbucks":
                                radVal = $("#intervalStarbucks").val();
                                sourceToAdd = radiusStarBucksSource;
                                radiusStarBucksSource.clear();
                                break;
                            case "raisingcanes":
                                radVal = $("#intervalRaisingCanes").val();
                                sourceToAdd = radiusRaisingCanesSource;
                                radiusRaisingCanesSource.clear();
                                break;
                            case "fiveguys":
                                radVal = $("#intervalFiveGuys").val();
                                sourceToAdd = radiusFiveGuysSource;
                                radiusFiveGuysSource.clear();
                                break;
                            case "aldi_2016":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiSixteenSource;
                                radiusAldiSixteenSource.clear();
                                break;
                            case "aldi_2016_closed":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiSixteenClosedSource;
                                radiusAldiSixteenClosedSource.clear();
                                break;
                            case "aldi_2018":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiEighteenSource;
                                radiusAldiEighteenSource.clear();
                                break;
                            case "aldi_2018_new":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiEighteenNewSource;
                                radiusAldiEighteenNewSource.clear();
                                break;
                            case "thornton":
                                radVal = $("#intervalThornton").val();
                                sourceToAdd = radiusThorntonSource;
                                radiusThorntonSource.clear();
                                break;
                            case "dicks":
                                radVal = $("#intervalDicks").val();
                                sourceToAdd = radiusDicksSource;
                                radiusDicksSource.clear();
                                break;
                            case "keef":
                                radVal = $("#intervalKeef").val();
                                sourceToAdd = radiusKeefSource;
                                radiusKeefSource.clear();
                                break;
                            case "parkway":
                                radVal = $("#intervalParkway").val();
                                sourceToAdd = radiusParkwaySource;
                                radiusParkwaySource.clear();
                                break;
                            case "creditunions":
                                radVal = $("#intervalCreditUnions").val();
                                sourceToAdd = radiusCreditUnionsSource;
                                radiusCreditUnionsSource.clear();
                                break;
                            case "edwardjones":
                                radVal = $("#intervalEdwardJones").val();
                                sourceToAdd = radiusEdwardJonesSource;
                                radiusEdwardJonesSource.clear();
                                break;
                            case "agencies":
                                radVal = $("#intervalAgencies").val();
                                sourceToAdd = radiusAgenciesSource;
                                radiusAgenciesSource.clear();
                                break;
                            case "agent_ca":
                                radVal = $("#intervalCA").val();
                                sourceToAdd = radiusCASource;
                                radiusCASource.clear();
                                break;
                            case "agent_za":
                                radVal = $("#intervalZA").val();
                                sourceToAdd = radiusZASource;
                                radiusZASource.clear();
                                break;
                            case "tartan":
                                radVal = $("#intervalTartan").val();
                                sourceToAdd = radiusTartanSource;
                                radiusTartanSource.clear();
                                break;
                            case "uhaul":
                                radVal = $("#intervalUhaul").val();
                                sourceToAdd = radiusUhaulSource;
                                radiusUhaulSource.clear();
                                break;
                            case "poultryfacilities":
                                radVal = $("#intervalPoultry").val();
                                sourceToAdd = radiusPoultrySource;
                                radiusPoultrySource.clear();
                                break;
                            case "fortune":
                                radVal = $("#intervalFortune").val();
                                sourceToAdd = radiusFortuneSource;
                                radiusFortuneSource.clear();
                                break;
                            case "fairgrounds":
                                radVal = $("#intervalFairgrounds").val();
                                sourceToAdd = radiusFairgroundSource;
                                radiusFairgroundSource.clear();
                                break;
                            case "paca":
                                radVal = $("#intervalPACA").val();
                                sourceToAdd = radiusPACASource;
                                radiusPACASource.clear();
                                break;
                            case "tapetro":
                                radVal = $("#intervalTAPetro").val();
                                sourceToAdd = radiusTAPetroSource;
                                radiusTAPetroSource.clear();
                                break;
                            case "ethanol_plants":
                                radVal = $("#intervalEthanol").val();
                                sourceToAdd = radiusEthanolSource;
                                radiusEthanolSource.clear();
                                break;
                            case "oil_refineries":
                                radVal = $("#intervalOilrefineries").val();
                                sourceToAdd = radiusOilrefineriesSource;
                                radiusOilrefineriesSource.clear();
                                break;
                            case "biodiesel_plants":
                                radVal = $("#intervalBiodiesel").val();
                                sourceToAdd = radiusBiodieselSource;
                                radiusBiodieselSource.clear();
                                break;
                            case "grainger":
                                radVal = $("#intervalGrainger").val();
                                sourceToAdd = radiusGraingerSource;
                                radiusGraingerSource.clear();
                                break;
                            case "foodplants":
                                radVal = $("#intervalTyson").val();
                                sourceToAdd = radiusFoodplantsSource;
                                radiusFoodplantsSource.clear();
                                break;
                            case "hydroponic_growers":
                                radVal = $("#intervalHydroponics").val();
                                sourceToAdd = radiusHydroponicsSource;
                                radiusHydroponicsSource.clear();
                                break;
                            case "publix":
                                radVal = $("#intervalPublix").val();
                                sourceToAdd = radiusPublixSource;
                                radiusPublixSource.clear();
                                break;
                            case "gianteagle":
                                radVal = $("#intervalGiantEagle").val();
                                sourceToAdd = radiusGiantEagleSource;
                                radiusGiantEagleSource.clear();
                                break;
                            case "traderjoes":
                                radVal = $("#intervalTraderJoes").val();
                                sourceToAdd = radiusTraderJoesSource;
                                radiusTraderJoesSource.clear();
                                break;
                            case "wholefoods":
                                radVal = $("#intervalWholeFoods").val();
                                sourceToAdd = radiusWholeFoodsSource;
                                radiusWholeFoodsSource.clear();
                                break;
                            case "shoppingcenter":
                                radVal = $("#intervalShopping").val();
                                sourceToAdd = radiusShoppingSource;
                                radiusShoppingSource.clear();
                                break;
                            case "stores":
                                radVal = $("#intervalStores").val();
                                sourceToAdd = radiusStoresSource;
                                radiusStoresSource.clear();
                                break;
                            case "homemade_shelters":
                                radVal = $("#intervalShelter").val();
                                sourceToAdd = radiusShelterSource;
                                radiusShelterSource.clear();
                                break;
                            case "unitsa":
                                radVal = $("#intervalUnitsA").val();
                                sourceToAdd = radiusUnitsASource;
                                radiusUnitsASource.clear();
                                break;
                            case "unitsb":
                                radVal = $("#intervalUnitsB").val();
                                sourceToAdd = radiusUnitsBSource;
                                radiusUnitsBSource.clear();
                                break;
                            case "dma":
                                radVal = $("#intervalDMA").val();
                                sourceToAdd = radiusDMASource;
                                radiusDMASource.clear();
                                break;
                            case "amazon":
                                radVal = $("#intervalAmazon").val();
                                sourceToAdd = radiusAmazonSource;
                                radiusAmazonSource.clear();
                                break;
                            case "sysco":
                                radVal = $("#intervalSysco").val();
                                sourceToAdd = radiusSyscoSource;
                                radiusSyscoSource.clear();
                                break;
                            case "robinsonfresh":
                                radVal = $("#intervalRobinsonFresh").val();
                                sourceToAdd = radiusRobinsonFreshSource;
                                radiusRobinsonFreshSource.clear();
                                break;
                            case "kehe":
                                radVal = $("#intervalKeHE").val();
                                sourceToAdd = radiusKeHESource;
                                radiusKeHESource.clear();
                                break;
                            case "pfgpfs":
                                radVal = $("#intervalPFGPSF").val();
                                sourceToAdd = radiusPFGPSFSource;
                                radiusPFGPSFSource.clear();
                                break;
                            case "sygma":
                                radVal = $("#intervalSygma").val();
                                sourceToAdd = radiusSygmaSource;
                                radiusSygmaSource.clear();
                                break;
                            case "dmadcs":
                                radVal = $("#intervalDmaDcs").val();
                                sourceToAdd = radiusDmaDcsSource;
                                radiusDmaDcsSource.clear();
                                break;
                            case "vistar":
                                radVal = $("#intervalVistar").val();
                                sourceToAdd = radiusVistarSource;
                                radiusVistarSource.clear();
                                break;
                            case "usfoods":
                                radVal = $("#intervalUsf").val();
                                sourceToAdd = radiusUsfSource;
                                radiusUsfSource.clear();
                                break;
                            case "mclane":
                                radVal = $("#intervalMclane").val();
                                sourceToAdd = radiusMclaneSource;
                                radiusMclaneSource.clear();
                                break;
                            case "brownfields":
                                radVal = $("#intervalBrownfields").val();
                                sourceToAdd = radiusBrownFields;
                                radiusBrownFields.clear();
                                break;
                            case "farmers":
                                radVal = $("#intervalFarmers").val();
                                sourceToAdd = radiusFarmerSource;
                                radiusFarmerSource.clear();
                                break;
                            case "refrigeratedlocations":
                                radVal = $("#intervalRefri").val();
                                sourceToAdd = radiusRefriSource;
                                radiusRefriSource.clear();
                                break;
                            case "airports":
                                radVal = $("#intervalAirport").val();
                                sourceToAdd = radiusAirportSource;
                                radiusAirportSource.clear();
                                break;
                            case "flagpoints":
                                radVal = $("#intervalFreight").val();
                                sourceToAdd = radiusFreightIntSource;
                                radiusFreightIntSource.clear();
                                break;
                            case "interchanges":
                                radVal = $("#intervalCrossing").val();
                                sourceToAdd = radiusInterchangesSource;
                                radiusInterchangesSource.clear();
                                break;
                            case "iana":
                                radVal = $("#intervalIana").val();
                                sourceToAdd = radiusIanaSource;
                                radiusIanaSource.clear();
                                break;
                            case "ports":
                                radVal = $("#intervalPorts").val();
                                sourceToAdd = radiusPortsSource;
                                radiusPortsSource.clear();
                                break;
                            case "transitstations":
                                radVal = $("#intervalTransit").val();
                                sourceToAdd = radiusTransitstopSource;
                                radiusTransitstopSource.clear();
                                break;
                            case "port_facility":
                                radVal = $("#intervalPort").val();
                                sourceToAdd = radiusPortfacilitySource;
                                radiusPortfacilitySource.clear();
                                break;
                            case "hot_springs":
                                radVal = $("#intervalHotSprings").val();
                                sourceToAdd = radiusHotSpringsSource;
                                radiusHotSpringsSource.clear();
                                break;
                            case "landbanks":
                                radVal = $("#intervalLandBanks").val();
                                sourceToAdd = radiusLandBanksSource;
                                radiusLandBanksSource.clear();
                                break;
                            case "asc":
                                radVal = $("#intervalAsc").val();
                                sourceToAdd = radiusAscHealthSource;
                                radiusAscHealthSource.clear();
                                break;
                            case "dermasolo":
                                radVal = $("#intervalDermaSolo").val();
                                sourceToAdd = radiusDermaSoloHealthSource;
                                radiusDermaSoloHealthSource.clear();
                                break;
                            case "dermagroup":
                                radVal = $("#intervalDermaGroup").val();
                                sourceToAdd = radiusDermaGroupHealthSource;
                                radiusDermaGroupHealthSource.clear();
                                break;
                            case "plasticsurgerygroup":
                                radVal = $("#intervalPlasticSurgeryGroup").val();
                                sourceToAdd = radiusPSGroupHealthSource;
                                radiusPSGroupHealthSource.clear();
                                break;
                            case "plasticsurgerysolo":
                                radVal = $("#intervalPlasticSurgerySolo").val();
                                sourceToAdd = radiusPSSoloHealthSource;
                                radiusPSSoloHealthSource.clear();
                                break;
                            case "providers":
                                radVal = $("#intervalProviders").val();
                                sourceToAdd = radiusProvidersHealthSource;
                                radiusProvidersHealthSource.clear();
                                break;
                            case "dentalfacilities":
                                radVal = $("#intervalDental").val();
                                sourceToAdd = radiusDentalHealthSource;
                                radiusDentalHealthSource.clear();
                                break;
                            case "mentalfacilities":
                                radVal = $("#intervalMental").val();
                                sourceToAdd = radiusMentalHealthSource;
                                radiusMentalHealthSource.clear();
                                break;
                            case "primaryfacilities":
                                radVal = $("#intervalPrimary").val();
                                sourceToAdd = radiusPrimaryHealthSource;
                                radiusPrimaryHealthSource.clear();
                                break;
                            default:
                                break;
                        }
                        if (layerName == "albertsons" || layerName == "kroger" || layerName == "closings" || layerName == "toysrus" || layerName == "gymboree" || layerName == "thornton" || layerName == "aldi_2016" || layerName == "aldi_2016_closed" || layerName == "aldi_2018" || layerName == "aldi_2018_new" || layerName == "culver" || layerName == "potbelly" || layerName == "fiveguys" || layerName == "raisingcanes" || layerName == "starbucks" || layerName == "dicks" || layerName == "keef" || layerName == "parkway" || layerName == "edwardjones" || layerName == "agencies" || layerName == "agent_ca" || layerName == "agent_za" || layerName == "creditunions" || layerName == "tartan" || layerName == "uhaul" || layerName == "fortune" || layerName == "paca" || layerName == "fairgrounds" || layerName == "poultryfacilities" || layerName == "biodiesel_plants" || layerName == "oil_refineries" || layerName == "tapetro" || layerName == "ethanol_plants" || layerName == "foodplants" || layerName == "hydroponic_growers" || layerName == "publix" || layerName == "gianteagle" || layerName == "wholefoods" || layerName == "traderjoes" || layerName == "shoppingcenter" || layerName == "stores" || layerName == "amazon" || layerName == "dma" || layerName == "sysco" || layerName == "robinsonfresh" || layerName == "kehe" || layerName == "pfgpfs" || layerName == "dmadcs" || layerName == "sygma" || layerName == "vistar" || layerName == "usfoods" || layerName == "mclane" || layerName == "brownfields" || layerName == "farmers" || layerName == "homemade_shelters" || layerName == "unitsa" || layerName == "unitsb" || layerName == "refrigeratedlocations" || layerName == "airports" || layerName == "flagpoints" || layerName == "interchanges" || layerName == "iana" || layerName == "ports" || layerName == "transitstations" || layerName == "port_facility" || layerName == "grainger" || layerName == "hot_springs" || layerName == "landbanks" || layerName == "asc" || layerName == "dermasolo" || layerName == "dermagroup" || layerName == "plasticsurgerygroup" || layerName == "plasticsurgerysolo" || layerName == "providers" || layerName == "dentalfacilities" || layerName == "mentalfacilities" || layerName == "primaryfacilities")
                            for (i = 0; i <= source.getFeatures().length - 1; i++) {
                                drawCircleInMeter(map, source.getFeatures()[i].getGeometry().getCoordinates(), radVal * 1609.34, 7, sourceToAdd, i);
                            }
                        switch (layerName) {
                            case "albertsons":
                                radiusAlbertsonsLayer.setSource(radiusAlbertsonsSource);
                            case "kroger":
                                radiusKrogerLayer.setSource(radiusKrogerSource);
                                break;
                            case "closings":
                                radiusClosingsLayer.setSource(radiusClosingsSource);
                                break;
                            case "toysrus":
                                radiusToysrusLayer.setSource(radiusToysrusSource);
                                break;
                            case "gymboree":
                                radiusGymboreeLayer.setSource(radiusGymboreeSource);
                                break;
                            case "culver":
                                radiusCulverLayer.setSource(radiusCulverSource);
                                break;
                            case "potbelly":
                                radiusPotbellyLayer.setSource(radiusPotbellySource);
                                break;
                            case "starbucks":
                                radiusStarBucksLayer.setSource(radiusStarBucksSource);
                                break;
                            case "raisingcanes":
                                radiusRaisingCanesLayer.setSource(radiusRaisingCanesSource);
                                break;
                            case "fiveguys":
                                radiusFiveGuysLayer.setSource(radiusFiveGuysSource);
                                break;
                            case "aldi_2016":
                                radiusAldiSixteenLayer.setSource(radiusAldiSixteenSource);
                                break;
                            case "aldi_2016_closed":
                                radiusAldiSixteenClosedLayer.setSource(radiusAldiSixteenClosedSource);
                                break;
                            case "aldi_2018":
                                radiusAldiEighteenLayer.setSource(radiusAldiEighteenSource);
                                break;
                            case "aldi_2018_new":
                                radiusAldiEighteenNewLayer.setSource(radiusAldiEighteenNewSource);
                                break;
                            case "thornton":
                                radiusThorntonLayer.setSource(radiusThorntonSource);
                                break;
                            case "dicks":
                                radiusDicksLayer.setSource(radiusDicksSource);
                                break;
                            case "keef":
                                radiusKeefLayer.setSource(radiusKeefSource);
                                break;
                            case "parkway":
                                radiusParkwayLayer.setSource(radiusParkwaySource);
                                break;
                            case "creditunions":
                                radiusCreditUnionsLayer.setSource(radiusCreditUnionsSource);
                                break;
                            case "edwardjones":
                                radiusEdwardJonesLayer.setSource(radiusEdwardJonesSource);
                                break;
                            case "agencies":
                                radiusAgenciesLayer.setSource(radiusAgenciesSource);
                                break;
                            case "agent_za":
                                radiusZALayer.setSource(radiusZASource);
                                break;
                            case "agent_ca":
                                radiusCALayer.setSource(radiusCASource);
                                break;
                            case "tartan":
                                radiusTartanLayer.setSource(radiusTartanSource);
                                break;
                            case "uhaul":
                                radiusUhaulLayer.setSource(radiusUhaulSource);
                                break;
                            case "poultryfacilities":
                                radiusPoultryLayer.setSource(radiusPoultrySource);
                                break;
                            case "fortune":
                                radiusFortuneLayer.setSource(radiusFortuneSource);
                                break;
                            case "fairgrounds":
                                radiusFairgroundLayer.setSource(radiusFairgroundSource);
                                break;
                            case "paca":
                                radiusPACALayer.setSource(radiusPACASource);
                                break;
                            case "tapetro":
                                radiusTAPetroLayer.setSource(radiusTAPetroSource);
                                break;
                            case "ethanol_plants":
                                radiusEthanolLayer.setSource(radiusEthanolSource);
                                break;
                            case "biodiesel_plants":
                                radiusBiodieselLayer.setSource(radiusBiodieselSource);
                                break;
                            case "oil_refineries":
                                radiusOilrefineriesLayer.setSource(radiusOilrefineriesSource);
                                break;
                            case "grainger":
                                radiusGraingerLayer.setSource(radiusGraingerSource);
                                break;
                            case "brownfields":
                                radiusBrownFieldsLayer.setSource(radiusBrownFields);
                                break;
                            case "foodplants":
                                radiusFoodplantsLayer.setSource(radiusFoodplantsSource);
                                break;
                            case "hydroponic_growers":
                                radiusHydroponicsLayer.setSource(radiusHydroponicsSource);
                                break;
                            case "publix":
                                radiusPublixLayer.setSource(radiusPublixSource);
                                break;
                            case "gianteagle":
                                radiusGiantEagleLayer.setSource(radiusGiantEagleSource);
                                break;
                            case "traderjoes":
                                radiusTraderJoesLayer.setSource(radiusTraderJoesSource);
                                break;
                            case "wholefoods":
                                radiusWholeFoodsLayer.setSource(radiusWholeFoodsSource);
                                break;
                            case "shoppingcenter":
                                radiusShoppingLayer.setSource(radiusShoppingSource);
                                break;
                            case "stores":
                                radiusStoresLayer.setSource(radiusStoresSource);
                                break;
                            case "homemade_shelters":
                                radiusShelterLayer.setSource(radiusShelterSource);
                                break;
                            case "unitsa":
                                radiusUnitsALayer.setSource(radiusUnitsASource);
                                break;
                            case "unitsb":
                                radiusUnitsBLayer.setSource(radiusUnitsBSource);
                                break;
                            case "mclane":
                                radiusMclaneLayer.setSource(radiusMclaneSource);
                                break;
                            case "dma":
                                radiusDMALayer.setSource(radiusDMASource);
                                break;
                            case "usfoods":
                                radiusUsfLayer.setSource(radiusUsfSource);
                                break;
                            case "amazon":
                                radiusAmazonLayer.setSource(radiusAmazonSource);
                                break;
                            case "sysco":
                                radiusSyscoLayer.setSource(radiusSyscoSource);
                                break;
                            case "robinsonfresh":
                                radiusRobinsonFreshLayer.setSource(radiusRobinsonFreshSource);
                                break;
                            case "kehe":
                                radiusKeHELayer.setSource(radiusKeHESource);
                                break;
                            case "pfgpfs":
                                radiusPFGPSFLayer.setSource(radiusPFGPSFSource);
                                break;
                            case "sygma":
                                radiusSygmaLayer.setSource(radiusSygmaSource);
                                break;
                            case "dmadcs":
                                radiusDmaDcsLayer.setSource(radiusDmaDcsSource);
                                break;
                            case "vistar":
                                radiusVistarLayer.setSource(radiusVistarSource);
                                break;
                            case "farmers":
                                radiusFarmerLayer.setSource(radiusFarmerSource);
                                break;
                            case "refrigeratedlocations":
                                radiusRefriLayer.setSource(radiusRefriSource);
                                break;
                            case "airports":
                                radiusAirportLayer.setSource(radiusAirportSource);
                                break;
                            case "flagpoints":
                                radiusFreightIntLayer.setSource(radiusFreightIntSource);
                                break;
                            case "interchanges":
                                radiusInterchangesLayer.setSource(radiusInterchangesSource);
                                break;
                            case "iana":
                                radiusIanaLayer.setSource(radiusIanaSource);
                                break;
                            case "ports":
                                radiusPortsLayer.setSource(radiusPortsSource);
                                break;
                            case "transitstations":
                                radiusTransitstopLayer.setSource(radiusTransitstopSource);
                                break;
                            case "port_facility":
                                radiusPortfacilityLayer.setSource(radiusPortfacilitySource);
                                break;
                            case "hot_springs":
                                radiusHotSpringsLayer.setSource(radiusHotSpringsSource);
                                break;
                            case "landbanks":
                                radiusLandBanksLayer.setSource(radiusLandBanksSource);
                                break;
                            case "asc":
                                radiusAscHealthLayer.setSource(radiusAscHealthSource);
                                break;
                            case "dermasolo":
                                radiusDermaSoloHealthLayer.setSource(radiusDermaSoloHealthSource);
                                break;
                            case "dermagroup":
                                radiusDermaGroupHealthLayer.setSource(radiusDermaGroupHealthSource);
                                break;
                            case "plasticsurgerysolo":
                                radiusPSSoloHealthLayer.setSource(radiusPSSoloHealthSource);
                                break;
                            case "plasticsurgerygroup":
                                radiusPSGroupHealthLayer.setSource(radiusPSGroupHealthSource);
                                break;
                            case "providers":
                                radiusProvidersHealthLayer.setSource(radiusProvidersHealthSource);
                                break;
                            case "dentalfacilities":
                                radiusDentalHealthLayer.setSource(radiusDentalHealthSource);
                                break;
                            case "mentalfacilities":
                                radiusMentalHealthLayer.setSource(radiusMentalHealthSource);
                                break;
                            case "primaryfacilities":
                                radiusPrimaryHealth.setSource(radiusPrimaryHealthSource);
                                break;
                            default:
                                break;
                        }
                        setTimeout(function() {
                            $('#js-progress-bar').css({
                                'width': '0',
                                'opacity': '0'
                            });
						
							if ($('#cbVoronoi').is(":checked") || $('#cbDCVoronoi').is(":checked") || $('#cbRefVoronoi').is(":checked") || $('#cbFoodAwayVoronoi').is(":checked") || $('#cbFoodHomeVoronoi').is(":checked") || $('#cbFoodSuperMarketVoronoi').is(":checked") || $('#cbFoodVoronoi').is(":checked") || $('#cbBeveragesVoronoi').is(":checked") || $('#cbPrimaryVoronoi').is(":checked") || $('#cbOwnVoronoi').is(":checked") || $('#cbTptVoronoi').is(":checked") || $('#cbSchoolsVoronoi').is(":checked") || $('#cbBanksVoronoi').is(":checked") || $('#cbFinVoronoi').is(":checked") || $('#cbHealthFacilitiesVoronoi').is(":checked")) {
								{
									if(user)
									{
										var savedExtent = JSON.parse("[" + extentForVoronoi + "]");
										
										var options = {
											bbox: savedExtent
										};
										var turfFeatures = [];
										var features = getFeaturesInSelection(savedExtent);
										for (j = 0; j < features.length; j++){
											for (i = 0; i < features[j].length; i++){
												turfFeatures.push(turf.point(features[j][i].getGeometry().getCoordinates(),features[j][i].S));
											}
											voronoiPointsSource.addFeatures(features[j]);
										}
										var fc = turf.featureCollection(turfFeatures);
										var voronoi = turf.voronoi(fc, options);

										voronoiPolygonsSource = new ol.source.Vector({
											features: (new ol.format.GeoJSON()).readFeatures(voronoi)
										});
										
										showRespectiveOpts();
									}
								}
							}
								tilesLoaded = 0;
                            tilesPending = 0;
                        }, 600);
                    }
                }
            });
        },
        strategy: ol.loadingstrategy.bbox
    });

    var clusterSource = new ol.source.Cluster({
        distance: distance,
        source: source
    });

    var layer;

    if (layerName == "corn") {
        layer = new ol.layer.Vector({
            displayInLayerSwitcher: false,
            title: layerTitle,
            name: layerTitle,
            source: source,
            visible: false,
            style: getFeatureStyle
        });
    }else if (layerName == "potbellytwo") {
        layer = new ol.layer.Vector({
            displayInLayerSwitcher: false,
            title: layerTitle,
            name: layerTitle,
            source: source,
            visible: false,
            style: getFeatureStylePB
        });
    } else {
        layer = new ol.layer.AnimatedCluster({
            displayInLayerSwitcher: false,
            title: layerTitle,
            name: layerTitle,
            source: clusterSource,
            animationDuration: 700,
            visible: false,
            style: getStyleMulti
        });
    }
    return layer;
}

function onMouseClick(evt) {
    if (whileDraw || $('#isochrone').is(":checked"))
        return;

    $("#mainDivInput").hide();
    $("#mainDivConditions").hide();
    $("#mainDivOutput").hide();
    $("#mainDivFood").hide();
    $("#mainDivHousing").hide();
    $("#mainDivHealth").hide();
    $("#mainDivDeterminants").hide();
    $("#mainDivCrosswalk").hide();

    pointClicked = evt.coordinate;
    removePopup();

    $('#showInput').css('margin-right', '0px');
    $('#showConditions').css('margin-right', '0px');
    $('#showDeterminants').css('margin-right', '0px');
    $('#showOutput').css('margin-right', '0px');
    $('#showFood').css('margin-right', '0px');
    $('#showHousing').css('margin-right', '0px');
    $('#showHealth').css('margin-right', '0px');
    $('#showCrosswalk').css('margin-right', '0px');

    var alreadyShown = false;
    showedInput = false, showedConditions = false, showDeterminants = false, showedOutput = false, showedFood = false, showedHousing = false, showedHealth = false, showedCrosswalk = false;
    var coordinates;
    var coords;
    var data = '';
    var url = '';
    var val, height, width, pic, heightPic, widthPic, bankWithImage = false;

    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });
    var layer = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return layer;
    });
    if (feature && layer) {
		try{coordinates = feature.getGeometry().getCoordinates();}catch(e){}
        try{coords = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');}catch(e){}

        if (layer.get('name') == "Hydroponics" || layer.get('name') == "RanchesAndFarms" || layer.get('name') == "Interchanges" || layer.get('name') == "Natural" || layer.get('name') == "Manmade" || layer.get('name') == "Albertsons" || layer.get('name') == "Kroger" || layer.get('name') == "Thornton" || layer.get('name') == "AldiSixteen" || layer.get('name') == "AldiSixteenClosed" || layer.get('name') == "AldiEighteen" || layer.get('name') == "AldiEighteenNew" || layer.get('name') == "Starbucks" || layer.get('name') == "Raising Canes" || layer.get('name') == "Five Guys" || layer.get('name') == "Culver\'s Restaurants" || layer.get('name') == "Potbelly" || layer.get('name') == "Dicks" || layer.get('name') == "Keef" || layer.get('name') == "Ethanol" || layer.get('name') == "Grainger" || layer.get('name') == "Publix" || layer.get('name') == "Giant Eagle" || layer.get('name') == "Whole Foods" || layer.get('name') == "Trader Joe's" || layer.get('name') == "ShoppingCenter" || layer.get('name') == "FoodPlants" || layer.get('name') == "Distributor" || layer.get('name') == "Flag" || layer.get('name') == "Fedex" || layer.get('name') == "Mclane" || layer.get('name') == "DHL" || layer.get('name') == "Amazon" || layer.get('name') == "Sysco" || layer.get('name') == "RobinsonFresh" || layer.get('name') == "DMA DCs" || layer.get('name') == "Sygma" || layer.get('name') == "Vistar" || layer.get('name') == "PFG / PFS" || layer.get('name') == "KeHE Distributors" || layer.get('name') == "USFoods" || layer.get('name') == "Enterprise Buildings" || layer.get('name') == "Network Buildings" || layer.get('name') == "Farmers" || layer.get('name') == "Airports" || layer.get('name') == "Stores" || layer.get('name') == "Logos" || layer.get('name') == "HSB" || layer.get('name') == "TransStop" || layer.get('name') == "PortFacility" || layer.get('name') == "Shelter" || layer.get('name') == "Units A" || layer.get('name') == "Units B" || layer.get('name') == "Gardens" || layer.get('name') == "Hot Springs" || layer.get('name') == "Land Banks" || layer.get('name') == "Ports" || layer.get('name') == "IANA" || layer.get('name') == "DMA" || layer.get('name') == "Primary" || layer.get('name') == "Private" || layer.get('name') == "Chicago" || layer.get('name') == "R&F Locations" || layer.get('name') == "Closings" || layer.get('name') == "Toys" || layer.get('name') == "Gymboree" || layer.get('name') == "Corn" || layer.get('name') == "CBrands" || layer.get('name') == "Banks 2012" || layer.get('name') == "Banks 2016" || layer.get('name') == "Banks 2017" || layer.get('name') == "Credit Unions" || layer.get('name') == "Edward Jones" || layer.get('name') == "Agencies" || layer.get('name') == "Agent Locations - Address Based" || layer.get('name') == "Agent Locations - Zip Based" || layer.get('name') == "Parkway" || layer.get('name') == "Tartan" || layer.get('name') == "Uhaul" || layer.get('name') == "Poultry" || layer.get('name') == "PACA Operators" || layer.get('name') == "Fairgrounds" || layer.get('name') == "Fortune" || layer.get('name') == "Brownfields" || layer.get('name') == "TA Petro"  || layer.get('name') == "Biodiesel Plants"  || layer.get('name') == "Oil Refineries" || layer.get('name') == "Mental Health" || layer.get('name') == "Dental Health" || layer.get('name') == "Primary Care" || layer.get('name') == "Ambulatory Surgical Centers" || layer.get('name') == "Derma Solo" || layer.get('name') == "Derma Group" || layer.get('name') == "Plastic Surgery Solo" || layer.get('name') == "Plastic Surgery Group" || layer.get('name') == "Providers" || layer.get('name').indexOf(" Radius") !== -1) {
            alreadyShown = true;
            try {
                mainFeature = 0;
                if (feature.S.features.length > 1) {
                    maxImportance = 0;
                    for (var c = 0; c < feature.S.features.length; c++) {
                        if (feature.S.features[mainFeature].c.indexOf("airport") !== -1)
                            i = feature.S.features[c].get('importance');
                        if (feature.S.features[mainFeature].c.indexOf("traffic") !== -1)
                            i = feature.S.features[c].get('latest');
                        if (feature.S.features[mainFeature].c.indexOf("interchange") !== -1 || feature.S.features[mainFeature].c.indexOf("names") !== -1 || feature.S.features[mainFeature].c.indexOf("albertsons") !== -1 || feature.S.features[mainFeature].c.indexOf("kroger") !== -1 || feature.S.features[mainFeature].c.indexOf("thornton") !== -1 || feature.S.features[mainFeature].c.indexOf("aldi") !== -1 || feature.S.features[mainFeature].c.indexOf("starbucks") !== -1 || feature.S.features[mainFeature].c.indexOf("fiveguys") !== -1 || feature.S.features[mainFeature].c.indexOf("raisingcanes") !== -1 || feature.S.features[mainFeature].c.indexOf("culver") !== -1 || feature.S.features[mainFeature].c.indexOf("potbelly") !== -1 || feature.S.features[mainFeature].c.indexOf("dicks") !== -1 || feature.S.features[mainFeature].c.indexOf("keef") !== -1 || feature.S.features[mainFeature].c.indexOf("ethanol_plants") !== -1 || feature.S.features[mainFeature].c.indexOf("wholefoods") !== -1 || feature.S.features[mainFeature].c.indexOf("traderjoes") !== -1 || feature.S.features[mainFeature].c.indexOf("publix") !== -1 || feature.S.features[mainFeature].c.indexOf("gianteagle") !== -1 || feature.S.features[mainFeature].c.indexOf("shoppingcenter") !== -1 || feature.S.features[mainFeature].c.indexOf("foodplant") !== -1 || feature.S.features[mainFeature].c.indexOf("distributor") !== -1 || feature.S.features[mainFeature].c.indexOf("flagpoints") !== -1 || feature.S.features[mainFeature].c.indexOf("sysco") !== -1 || feature.S.features[mainFeature].c.indexOf("robinsonfresh") !== -1 || feature.S.features[mainFeature].c.indexOf("kehe") !== -1 || feature.S.features[mainFeature].c.indexOf("pfgpfs") !== -1 || feature.S.features[mainFeature].c.indexOf("sygma") !== -1 || feature.S.features[mainFeature].c.indexOf("dmadcs") !== -1 || feature.S.features[mainFeature].c.indexOf("vistar") !== -1 || feature.S.features[mainFeature].c.indexOf("mclane") !== -1 || feature.S.features[mainFeature].c.indexOf("usfoods") !== -1 || feature.S.features[mainFeature].c.indexOf("amazon") !== -1 || feature.S.features[mainFeature].c.indexOf("farmer") !== -1 || feature.S.features[mainFeature].c.indexOf("transitstations") !== -1 || feature.S.features[mainFeature].c.indexOf("port_facility") !== -1 || feature.S.features[mainFeature].c.indexOf("garden") !== -1 || feature.S.features[mainFeature].c.indexOf("shelter") !== -1 || feature.S.features[mainFeature].c.indexOf("unitsa") !== -1 || feature.S.features[mainFeature].c.indexOf("unitsb") !== -1 || feature.S.features[mainFeature].c.indexOf("hot_springs") !== -1 || feature.S.features[mainFeature].c.indexOf("landbanks") !== -1 || feature.S.features[mainFeature].c.indexOf("iana") !== -1 || feature.S.features[mainFeature].c.indexOf("dhl") !== -1 || feature.S.features[mainFeature].c.indexOf("fedex") !== -1 || feature.S.features[mainFeature].c.indexOf("ups") !== -1 || feature.S.features[mainFeature].c.indexOf("ranchesandfarms") !== -1 || feature.S.features[mainFeature].c.indexOf("hydroponic") !== -1 || feature.S.features[mainFeature].c.indexOf("dma") !== -1 || feature.S.features[mainFeature].c.indexOf("chicago") !== -1 || feature.S.features[mainFeature].c.indexOf("primary") !== -1 || feature.S.features[mainFeature].c.indexOf("private") !== -1 || feature.S.features[mainFeature].c.indexOf("refrigerated") !== -1 || feature.S.features[mainFeature].c.indexOf("closings") !== -1 || feature.S.features[mainFeature].c.indexOf("toysrus") !== -1 || feature.S.features[mainFeature].c.indexOf("toysrus") !== -1 || feature.S.features[mainFeature].c.indexOf("gymboree") !== -1 || feature.S.features[mainFeature].c.indexOf("ports") !== -1 || feature.S.features[mainFeature].c.indexOf("banks_2012") !== -1 || feature.S.features[mainFeature].c.indexOf("banks_2016") !== -1 || feature.S.features[mainFeature].c.indexOf("banks_2017") !== -1 || feature.S.features[mainFeature].c.indexOf("creditunions") !== -1 || feature.S.features[mainFeature].c.indexOf("edwardjones") !== -1 || feature.S.features[mainFeature].c.indexOf("agencies") !== -1 || feature.S.features[mainFeature].c.indexOf("agent_za") !== -1 || feature.S.features[mainFeature].c.indexOf("agent_ca") !== -1 || feature.S.features[mainFeature].c.indexOf("parkway") !== -1 || feature.S.features[mainFeature].c.indexOf("tartan") !== -1 || feature.S.features[mainFeature].c.indexOf("uhaul") !== -1 || feature.S.features[mainFeature].c.indexOf("poultry") !== -1 || feature.S.features[mainFeature].c.indexOf("paca") !== -1 || feature.S.features[mainFeature].c.indexOf("fortune") !== -1 || feature.S.features[mainFeature].c.indexOf("fairgrounds") !== -1 || feature.S.features[mainFeature].c.indexOf("brownfields") !== -1 || feature.S.features[mainFeature].c.indexOf("tapetro") !== -1 || feature.S.features[mainFeature].c.indexOf("biodiesel_plants") !== -1 || feature.S.features[mainFeature].c.indexOf("oil_refineries") !== -1 || feature.S.features[mainFeature].c.indexOf("buildings") !== -1 || feature.S.features[mainFeature].c.indexOf("dental") !== -1 || feature.S.features[mainFeature].c.indexOf("mental") !== -1 || feature.S.features[mainFeature].c.indexOf("primaryfacilities") !== -1 || feature.S.features[mainFeature].c.indexOf("asc") !== -1 || feature.S.features[mainFeature].c.indexOf("dermasolo") !== -1 || feature.S.features[mainFeature].c.indexOf("dermagroup") !== -1 || feature.S.features[mainFeature].c.indexOf("plasticsurgerygroup") !== -1 || feature.S.features[mainFeature].c.indexOf("plasticsurgerysolo") !== -1 || feature.S.features[mainFeature].c.indexOf("providers") !== -1)
                            i = feature.S.features[c].get('gid');
                        if (feature.S.features[mainFeature].c.indexOf("stores") !== -1 || feature.S.features[mainFeature].c.indexOf("logos") !== -1 || feature.S.features[mainFeature].c.indexOf("hsb") !== -1)
                            i = feature.S.features[c].get('id');

                        if (i > maxImportance) {
                            maxImportance = i;
                            mainFeature = c;
                        }
                    }
                }
            } catch (ex) {}
            if (layer.get('name') == "Enterprise Buildings") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Enterprise Buildings</h3>", "<div style='float:right;'><img height='35px' width='25px' src='images/Icons/enterprisebuildings.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Network Buildings") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Network Buildings</h3>", "<div style='float:right;'><img height='35px' width='25px' src='images/Icons/networkbuildings.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Airports") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Airport</h3>", "<div style='float:right;'><img height='35px' width='25px' src='images/Icons/Airports/medium.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Farmers") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><br><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('street') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Farmers Market</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/tractor.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Stores") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Grocery Stores</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/store.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Logos") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zipcode');

                content.innerHTML = getPopupContent("<h3>Retailer</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/logosIL/marker.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "TransStop") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('sys_agency') + "<br><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Transit Station</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/transit.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "PortFacility") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('location') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('statepcode') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Port Facility</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/port.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Gardens") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('descriptio');

                content.innerHTML = getPopupContent("<h3>Garden</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/garden.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Shelter") {
                data = feature.S.features[mainFeature].get('street') + "<br><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />Website: " + feature.S.features[mainFeature].get('website');

                content.innerHTML = getPopupContent("<h3>Homemade Shelter</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/shelter.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Units A") {
                data = "Store #:" + feature.S.features[mainFeature].get('storeno') + "<br>Name: " + feature.S.features[mainFeature].get('name') + "<br><br>" + feature.S.features[mainFeature].get('address') + "<br><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br>Delivery Days: " + feature.S.features[mainFeature].get('deliverydays');

                content.innerHTML = getPopupContent("<h3>Units A</h3>", "<div style='float:right;'><img height='50px' width='40px' src='images/Icons/unitsa.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Units B") {
                data = "Store #:" + feature.S.features[mainFeature].get('storeno') + "<br>Name: " + feature.S.features[mainFeature].get('name') + "<br><br>" + feature.S.features[mainFeature].get('address') + "<br><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br>Delivery Days: " + feature.S.features[mainFeature].get('deliverydays');

                content.innerHTML = getPopupContent("<h3>Units B</h3>", "<div style='float:right;'><img height='50px' width='40px' src='images/Icons/unitsb.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Land Banks") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/web.png' />Website: " + feature.S.features[mainFeature].get('website');

                content.innerHTML = getPopupContent("<h3>Land Banks</h3>", "<div style='float:right;'><img height='40px' width='40px' src='images/Icons/landbanks.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Hot Springs") {
				data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp; State: " + feature.S.features[mainFeature].get('state') + "<br>Temprature (°F): " + feature.S.features[mainFeature].get('tempf') + "   , Temprature (°C): " + feature.S.features[mainFeature].get('tempc');

				content.innerHTML = getPopupContent("<h3>Hot Springs</h3>", "<div style='float:right;'><img height='32px' width='25px' src='images/Icons/hotsprings.png' /></div>", data, "points",coords);
            }
            if (layer.get('name') == "IANA") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>IANA</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/iana.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Traffic") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;<br>FROM:  " + feature.S.features[mainFeature].get('from') + "<br>To:  " + feature.S.features[mainFeature].get('to');

                content.innerHTML = getPopupContent("<h3>Traffic Counts</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/traffic.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Ports") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('river') + ", " + feature.S.features[mainFeature].get('state');

                content.innerHTML = getPopupContent("<h3>Major US Ports</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/ship.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "DHL") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>DHL</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/dhl.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Fedex") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>Fedex</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/fedex.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "UPS") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>UPS</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/ups.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Amazon") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>Amazon</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/amazon.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Mclane") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent("<h3>McLane</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/mclane.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "RobinsonFresh") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>RobinsonFresh</h3>", "<div style='float:right;'><img height='40px' width='100px' src='images/Icons/distributions/robinsonfresh.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "KeHE Distributors") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>Area (ft" + '\u00B2' +"): " + feature.S.features[mainFeature].get('area') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />Website: <a target='_blank' href='" + feature.S.features[mainFeature].get('website') + "'>Link</a>";

                content.innerHTML = getPopupContent("<h3>KeHE Distributors</h3>", "<div style='float:right;'><img height='100px' width='300px' src='images/Icons/distributions/keheFull.jpg'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "DMA DCs") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>DMA DCs</h3>", "<div style='float:right;'><img height='60px' width='40px' src='images/Icons/distributions/dmadcs.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Sygma") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent("<h3>Sygma</h3>", "<div style='float:right;'><img height='75px' width='150px' src='images/Icons/distributions/sygma.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Vistar") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent("<h3>Vistar</h3>", "<div style='float:right;'><img height='75px' width='150px' src='images/Icons/distributions/vistar.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "PFG / PFS") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');
                var imageName;
                if (feature.S.features[mainFeature].get('type') == "performancefoodservice") {
                    imageName = "pfs";
                } else if (feature.S.features[mainFeature].get('type') == "pfgcdc") {
                    imageName = "pfgpfs";
                }

                content.innerHTML = getPopupContent("<h3>PFG / PFS</h3>", "<div style='float:right;'><img height='25px' width='150px' src='images/Icons/distributions/" + imageName +".png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Sysco") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>Sysco</h3>", "<div style='float:right;'><img height='25px' width='60px' src='images/Icons/distributions/sysco.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "USFoods") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address');

                content.innerHTML = getPopupContent("<h3>US Foods</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/distributions/usf.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Flag") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Freight Intersections</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/freight.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "CBrands") {
                var imageName;
                if (feature.S.features[mainFeature].get('facility') == "Brewery" || feature.S.features[mainFeature].get('facility') == "Distillery" || feature.S.features[mainFeature].get('facility') == "Winery") {
                    imageName = "pin-winery.png";
                } else if (feature.S.features[mainFeature].get('facility') == "Corporate Office") {
                    imageName = "pin-corporate.png";
                } else if (feature.S.features[mainFeature].get('facility') == "Facility" || feature.S.features[mainFeature].get('facility') == "Headquarters") {
                    imageName = "pin-headquarters.png";
                }

                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Constellation Brands</h3>", "<div style='float:right;'><img height='40px' width='25px' src='images/Icons/cbrands/" + imageName + "'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Albertsons") {
                var val, height, width;
                if (feature.S.features[mainFeature].get('name') == "AcmeMarket") {
                    height = "25px";
                    width = "75px";
                    val = "1.png";
                } else if (feature.S.features[mainFeature].get('name') == "Albertsons") {
                    height = "40px";
                    width = "50px";
                    val = "2.png";
                } else if (feature.S.features[mainFeature].get('name') == "JewelOsco") {
                    height = "25px";
                    width = "50px";
                    val = "4.png";
                } else if (feature.S.features[mainFeature].get('name') == "Lucky") {
                    height = "25px";
                    width = "50px";
                    val = "5.png";
                } else if (feature.S.features[mainFeature].get('name') == "PakNSave") {
                    height = "25px";
                    width = "75px";
                    val = "6.png";
                } else if (feature.S.features[mainFeature].get('name') == "Pavilions") {
                    height = "25px";
                    width = "100px";
                    val = "7.png";
                } else if (feature.S.features[mainFeature].get('name') == "Randalls") {
                    height = "25px";
                    width = "75px";
                    val = "8.png";
                } else if (feature.S.features[mainFeature].get('name') == "Safeway") {
                    height = "25px";
                    width = "100px";
                    val = "9.png";
                } else if (feature.S.features[mainFeature].get('name') == "Shaws") {
                    height = "25px";
                    width = "75px";
                    val = "10.png";
                } else if (feature.S.features[mainFeature].get('name') == "StarMarket") {
                    height = "30px";
                    width = "100px";
                    val = "11.png";
                } else if (feature.S.features[mainFeature].get('name') == "TomThumb") {
                    height = "25px";
                    width = "100px";
                    val = "12.png";
                } else if (feature.S.features[mainFeature].get('name') == "Vons") {
                    height = "25px";
                    width = "75px";
                    val = "13.png";
                }

                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Albertsons</h3>", "<div style='float:right;'><img height='" + height + "' width='" + width + "' src='images/Icons/retail/Albertsons/" + val + "'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Kroger") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('street') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip')

                content.innerHTML = getPopupContent("<h3>Kroger</h3>", "<div style='float:right;'><img height='40px' width='100px' src='images/Icons/retail/Kroger/" + feature.S.features[mainFeature].get('name') + ".png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Starbucks") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent("<h3>Starbucks Coffee</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/retail/starbucks.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Five Guys") {
				var beer='No', breakfast='No',cokefrees='No', milkshakes='No', poutines='No', delivery='No';
				
				if(feature.S.features[mainFeature].get('beer'))
					beer = 'Yes';
				if(feature.S.features[mainFeature].get('breakfast'))
					breakfast = 'Yes';
				if(feature.S.features[mainFeature].get('cokefrees'))
					cokefrees = 'Yes';
				if(feature.S.features[mainFeature].get('milkshakes'))
					milkshakes = 'Yes';
				if(feature.S.features[mainFeature].get('poutines'))
					poutines = 'Yes';
				if(feature.S.features[mainFeature].get('delivery'))
					delivery = 'Yes';

                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br>Serves Beer: " + beer + "<br><br>Serves Breakfast: " + breakfast + "<br><br>Serves Coca-Cola Freestyle: " + cokefrees + "<br><br>Serves MilkShakes: " + milkshakes + "<br><br>Has Delivery: " + delivery;

                content.innerHTML = getPopupContent("<h3>Five Guys</h3>", "<div style='float:right;'><img height='25px' width='150px' src='images/Icons/retail/fiveguys.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Raising Canes") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br><br>Status: " + feature.S.features[mainFeature].get('status') + "<br><br>Operating Hours: <br>" + feature.S.features[mainFeature].get('operatinghours') + "<br><br>Opening Date: " + feature.S.features[mainFeature].get('opening_date') + "<br><br>Distance: " + feature.S.features[mainFeature].get('distance') + " miles<br><br>Hours: <br>" + feature.S.features[mainFeature].get('hours');

                content.innerHTML = getPopupContent("<h3>Raising Canes</h3>", "<div style='float:right;'><img height='25px' width='150px' src='images/Icons/retail/raisingcanes.png'/></div>", data, "tartan", feature.S.features[mainFeature].get('url'));
            }
            if (layer.get('name') == "Culver\'s Restaurants") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Culver\'s Restaurants</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/retail/culver.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Potbelly") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + "<br><br>Postal Code:" + feature.S.features[mainFeature].get('postal_code') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone') + "<br><br>Working Hours: " + feature.S.features[mainFeature].get('hours') + "<br><br>Pickup Menu: " + feature.S.features[mainFeature].get('pickup_menu') + "<br><br>Delivery Menu: " + feature.S.features[mainFeature].get('delivery_menu') + "<br><br>Has Breakfast: " + feature.S.features[mainFeature].get('has_breakfast') + "<br><br>Has Kids Space: " + feature.S.features[mainFeature].get('has_kids');

                content.innerHTML = getPopupContent("<h3>Potbelly Sandwich Shop</h3>", "<div style='float:right;'><img height='40px' width='75px' src='images/Icons/retail/potbelly.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "AldiSixteen") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Aldi Stores (2016)</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/retail/aldi.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "AldiSixteenClosed") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Aldi Stores (Now Closed)</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/retail/aldiclosed.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "AldiEighteen") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Aldi Stores (2018)</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/retail/aldi.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "AldiEighteenNew") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Aldi Stores (Newly Opened)</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/retail/aldinew.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Thornton") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Thornton Inc.</h3>", "<div style='float:right;'><img height='25px' width='100px' src='images/Icons/thornton.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Dicks") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Dicks Sporting Goods</h3>", "<div style='float:right;'><img height='25px' width='75px' src='images/Icons/retail/dicks.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Keef") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />Website: " + feature.S.features[mainFeature].get('website');

                content.innerHTML = getPopupContent("<h3>Keef Brands</h3>", "<div style='float:right;'><img height='50px' width='50px' src='images/Icons/keef.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Ethanol") {
                if (feature.S.features[mainFeature].get('company') == "CARGILL INC") {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + ", " + feature.S.features[mainFeature].get('state') + "</h4><br>" + feature.S.features[mainFeature].get('company') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' /> <a href='http://150.cargill.com/150/en/FORT-DODGE-ETHANOL-PLANT.jsp' target='_blank'>Link 1 </a> <a href='http://www.feedandgrain.com/news/fire-at-cargill-ethanol-plant-in-iowa' target='_blank'>Link 2 </a>";

                    content.innerHTML = getPopupContent("<div style='float:left;'><img height='45px' width='32px' src='images/Icons/ethanol.png'/></div><h3>Ethanol Plants</h3>", "<div style='float:right;'><img height='45px' width='75px' src='images/Icons/cargill.gif'/></div>", data, "points", coords);
                } else if (feature.S.features[mainFeature].get('company') == "VALERO RENEWABLE FUELS LLC") {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + ", " + feature.S.features[mainFeature].get('state') + "</h4><br>" + feature.S.features[mainFeature].get('company') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />  <a href=' https://www.valero.com/en-us/Pages/FortDodge.aspx' target='_blank'>Link 1 </a>";

                    content.innerHTML = getPopupContent("<div style='float:left;'><img height='45px' width='32px' src='images/Icons/ethanol.png'/></div><h3>Ethanol Plants</h3>", "<div style='float:right;'><img height='50px' width='60px' src='images/Icons/valero.png'/></div>", data, "points", coords);
                } else {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><br>" + feature.S.features[mainFeature].get('company') + ", " + feature.S.features[mainFeature].get('state');

                    content.innerHTML = getPopupContent("<h3>Ethanol Plants</h3>", "<div style='float:right;'><img height='45px' width='32px' src='images/Icons/ethanol.png'/></div>", data, "points", coords);
                }
            }
            if (layer.get('name') == "Grainger") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Grainger</h3>", "<div style='float:right;'><img height='25px' width='125px' src='images/Icons/grainger.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Publix") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Publix</h3>", "<div style='float:right;'><img height='20px' width='75px' src='images/Icons/retail/publix.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Giant Eagle") {
                var val;
                if (feature.S.features[mainFeature].get('brand') == "GetGo") {
                    val = "getgo.png";
                } else if (feature.S.features[mainFeature].get('brand') == "Giant Eagle") {
                    val = "gianteagle.png";
                } else if (feature.S.features[mainFeature].get('brand') == "Market District") {
                    val = "marketdistrict.png";
                } else if (feature.S.features[mainFeature].get('brand') == "Market District Express") {
                    val = "marketdistrictexpress.png";
                } else{
                    val = "cafeandmarket.png";
                }
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Giant Eagle</h3>", "<div style='float:right;'><img height='35px' width='75px' src='images/Icons/retail/GiantEagle/"+ val +"'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Trader Joe's") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Trader Joe</h3>", "<div style='float:right;'><img height='25px' width='50px' src='images/Icons/retail/traderjoes.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Whole Foods") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Whole Foods</h3>", "<div style='float:right;'><img height='25px' width='50px' src='images/Icons/retail/wholefoods.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "ShoppingCenter") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Shopping Center</h3>", "<div style='float:right;'><img height='40px' width='30px' src='images/Icons/retail/shoppingcenter.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "FoodPlants") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Tyson Food Plants</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/retail/tyson.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Natural") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('county_nam') + ", " + feature.S.features[mainFeature].get('state_alph');

                content.innerHTML = getPopupContent("<h3>Natural</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/natural.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Manmade") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('county_nam') + ", " + feature.S.features[mainFeature].get('state_alph');

                content.innerHTML = getPopupContent("<h3>Manmade</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/manmade.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Interchanges") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('county_nam') + ", " + feature.S.features[mainFeature].get('state_alph');

                content.innerHTML = getPopupContent("<h3>Interchanges</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/crossing.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "RanchesAndFarms") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('county_nam') + ", " + feature.S.features[mainFeature].get('state_alph');

                content.innerHTML = getPopupContent("<h3>Ranches & Farms</h3>", "<div style='float:right;'><img height='25px' width='35px' src='images/Icons/ranches.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Hydroponics") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state');

                if (feature.S.features[mainFeature].get('loc_type') == "Branch")
                    content.innerHTML = getPopupContent("<h3>Hydroponics-Branch</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/pin-red.png' /></div>", data, "points", coords);
                if (feature.S.features[mainFeature].get('loc_type') == "Headquarters")
                    content.innerHTML = getPopupContent("<h3>Hydroponics-Headquarter</h3>", "<div style='float:right;'><img height='40px' width='40px' src='images/Icons/pin-blue.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "DMA") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('postalcode');

                content.innerHTML = getPopupContent("<h3>DMA</h3>", "", data);
            }
            if (layer.get('name') == "Primary") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('ccd') + "<br>" + feature.S.features[mainFeature].get('scsd');

                content.innerHTML = getPopupContent("<h3>Primary School</h3>", "<div style='float:right;'><img height='25px' width='35px' src='images/Icons/schools/primary.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Private") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>" + feature.S.features[mainFeature].get('ccd') + "<br>" + feature.S.features[mainFeature].get('scsd');

                content.innerHTML = getPopupContent("<h3>Private School</h3>", "<div style='float:right;'><img height='25px' width='35px' src='images/Icons/schools/private.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Chicago") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4>Contact:" + feature.S.features[mainFeature].get('contact') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent("<h3>Chicago Foods</h3>", "", data);
            }
            if (layer.get('name') == "R&F Locations") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('street') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone') + "<br><br>Activites: " + feature.S.features[mainFeature].get('activities');

                content.innerHTML = getPopupContent("<h3>R&F Locations</h3>", "<div style='float:right;'><img height='25px' width='25px' src='images/Icons/refrigerated.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Closings") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state');

                if (feature.S.features[mainFeature].get('name') == "Kmart")
                    content.innerHTML = getPopupContent("<h3>Sears Holdings</h3>", "<div style='float:right;'><img height='32px' width='32px' src='images/Icons/retail/kmart.png' /></div>", data, "points", coords);
                if (feature.S.features[mainFeature].get('name') == "Sears")
                    content.innerHTML = getPopupContent("<h3>Sears Holdings</h3>", "<div style='float:right;'><img height='40px' width='40px' src='images/Icons/retail/searsfull.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Toys") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('street') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br>Lease Type: " + feature.S.features[mainFeature].get('leasetype') + "<br><br>Entity: " + feature.S.features[mainFeature].get('entity') + "<br><br>Gross Area: " + feature.S.features[mainFeature].get('grossarea') + "<br><br>Sell Area: " + feature.S.features[mainFeature].get('sellarea');

                content.innerHTML = getPopupContent('<h3>Toys"R"Us</h3>', "<div style='float:right;'><img height='30px' width='100px' src='images/Icons/retail/toysrus.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Gymboree") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') +  + ", " + feature.S.features[mainFeature].get('country') + "<br><br>Postal Code:" + feature.S.features[mainFeature].get('postal_code') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone') + "<br><br>Store Hours: " + feature.S.features[mainFeature].get('store_hours') + "<br><br>Store Hours: " + feature.S.features[mainFeature].get('store_hours_1') + "<br><br>Store Hours: " + feature.S.features[mainFeature].get('store_hours_2') + "<br><br>Store Hours: " + feature.S.features[mainFeature].get('store_hours_3');

                content.innerHTML = getPopupContent("<h3>Gymboree</h3>", "<div style='float:right;'><img height='25px' width='100px' src='images/Icons/retail/" + feature.S.features[mainFeature].get('brand') +".png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Mental Health") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('hpsaddr') + "<br>" + feature.S.features[mainFeature].get('hpscity') + ", " + feature.S.features[mainFeature].get('hpsstabbr') + " " + feature.S.features[mainFeature].get('hpszipcd');

                content.innerHTML = getPopupContent('<h3>Mental Health</h3>', "<div style='float:right;'><img height='30px' width='35x' src='images/Icons/health/mentalhealth.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Dental Health") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('hpsaddr') + "<br>" + feature.S.features[mainFeature].get('hpscity') + ", " + feature.S.features[mainFeature].get('hpsstabbr') + " " + feature.S.features[mainFeature].get('hpszipcd');

                content.innerHTML = getPopupContent('<h3>Dental Health</h3>', "<div style='float:right;'><img height='30px' width='35px' src='images/Icons/health/dentalfacility.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Primary Care") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('hpsaddr') + "<br>" + feature.S.features[mainFeature].get('hpscity') + ", " + feature.S.features[mainFeature].get('hpsstabbr') + " " + feature.S.features[mainFeature].get('hpszipcd');

                content.innerHTML = getPopupContent('<h3>Primary Care</h3>', "<div style='float:right;'><img height='30px' width='35px' src='images/Icons/health/primarycare.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Ambulatory Surgical Centers") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('street') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('telephone') + "<br><br>Facility ID: " + feature.S.features[mainFeature].get('facilityid');

                content.innerHTML = getPopupContent('<h3>Ambulatory Surgical Centers</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/asc.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Derma Solo") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent('<h3>Derma Solo</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/dermasolo.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Derma Group") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent('<h3>Derma Group</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/dermagroup.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Plastic Surgery Solo") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent('<h3>Plastic Surgery Solo</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/plasticsurgerysolo.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Plastic Surgery Group") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent('<h3>Plastic Surgery Group</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/plasticsurgerygroup.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Providers") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                content.innerHTML = getPopupContent('<h3>Providers</h3>', "<div style='float:right;'><img height='30px' width='20' src='images/Icons/health/providers.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Corn") {
                data = '<h4 style="color:#0072BC">' + feature.get("name") + '</h4><table id="tableInsideTable"><tr><td><div style="height: 20px; width: 20px; margin-left: 3px; margin-right: 10px; float: left; border:1px solid black; background-color:#006837;"></div></td><td>Excellent</td><td>' + feature.get("excellent") + ' %</td></tr><tr><td><div style="height: 20px; width: 20px; margin-left: 3px; margin-right: 10px; float: left; border:1px solid black; background-color:#a6d96a;"></div></td><td>Good</td><td>' + feature.get("good") + ' %</td></tr><tr><td><div style="height: 20px; width: 20px; margin-left: 3px; margin-right: 10px; float: left; border:1px solid black; background-color:#fee08b;"></div></td><td>Fair</td><td>' + feature.get("fair") + ' %</td></tr><tr><td><div style="height: 20px; width: 20px; margin-left: 3px; margin-right: 10px; float: left; border:1px solid black; background-color:#f46d43;"></div></td><td>Poor</td><td>' + feature.get("poor") + ' %</td></tr><tr><td><div style="height: 20px; width: 20px; margin-left: 3px; margin-right: 10px; float: left; border:1px solid black; background-color:#a50026;"></div></td><td>Very Poor</td><td>' + feature.get("verypoor") + ' %</td></tr></table>';

                content.innerHTML = getPopupContent("<h3>Corn Condition</h3>", "", data, "points", coords);
            }
            if (layer.get('name') == "Banks 2012") {
                if (feature.S.features[mainFeature].get('namefull') == "Bank of America") {
                    bankWithImage = true;
                    height = "40px";
                    width = "100px";
                    val = "1.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "1.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "JPMorgan Chase Bank") {
                    bankWithImage = true;
                    height = "25px";
                    width = "125px";
                    val = "2.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "2.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "Wells Fargo Bank") {
                    bankWithImage = true;
                    height = "80px";
                    width = "100px";
                    val = "3.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "3.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "PNC Bank") {
                    bankWithImage = true;
                    height = "50px";
                    width = "100px";
                    val = "4.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "4.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "TCF National Bank") {
                    bankWithImage = true;
                    height = "75px";
                    width = "100px";
                    val = "5.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "5.png";
                } else {
                    bankWithImage = false;
                    height = "25px";
                    width = "25px";
                    val = "banks2017.png";
                }
                if (bankWithImage) {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<img height='" + heightPic + "' width='" + widthPic + "' src='images/Icons/Banks/Pictures/" + pic + "'/>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                } else {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<h3>Banks 2012</h3>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                }
            }
            if (layer.get('name') == "Banks 2016") {
                if (feature.S.features[mainFeature].get('namefull') == "Bank of America") {
                    bankWithImage = true;
                    height = "40px";
                    width = "100px";
                    val = "1.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "1.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "JPMorgan Chase Bank") {
                    bankWithImage = true;
                    height = "25px";
                    width = "125px";
                    val = "2.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "2.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "Wells Fargo Bank") {
                    bankWithImage = true;
                    height = "80px";
                    width = "100px";
                    val = "3.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "3.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "PNC Bank") {
                    bankWithImage = true;
                    height = "50px";
                    width = "100px";
                    val = "4.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "4.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "TCF National Bank") {
                    bankWithImage = true;
                    height = "75px";
                    width = "100px";
                    val = "5.png";

                    heightPic = "75px";
                    widthPic = "235px";
                    pic = "5.png";
                } else {
                    bankWithImage = false;
                    height = "25px";
                    width = "25px";
                    val = "banks2017.png";
                }
                if (bankWithImage) {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<img height='" + heightPic + "' width='" + widthPic + "' src='images/Icons/Banks/Pictures/" + pic + "'/>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                } else {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<h3>Banks 2016</h3>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                }
            }
            if (layer.get('name') == "Banks 2017") {
                if (feature.S.features[mainFeature].get('namefull') == "Bank of America") {
                    bankWithImage = true;
                    height = "40px";
                    width = "100px";
                    val = "1.png";

                    heightPic = "150px";
                    widthPic = "300px";
                    pic = "1.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "JPMorgan Chase Bank") {
                    bankWithImage = true;
                    height = "25px";
                    width = "125px";
                    val = "2.png";

                    heightPic = "150px";
                    widthPic = "300px";
                    pic = "2.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "Wells Fargo Bank") {
                    bankWithImage = true;
                    height = "80px";
                    width = "100px";
                    val = "3.png";

                    heightPic = "150px";
                    widthPic = "300px";
                    pic = "3.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "PNC Bank") {
                    bankWithImage = true;
                    height = "50px";
                    width = "100px";
                    val = "4.png";

                    heightPic = "150px";
                    widthPic = "300px";
                    pic = "4.png";
                } else if (feature.S.features[mainFeature].get('namefull') == "TCF National Bank") {
                    bankWithImage = true;
                    height = "75px";
                    width = "100px";
                    val = "5.png";

                    heightPic = "150px";
                    widthPic = "300px";
                    pic = "5.png";
                } else {
                    bankWithImage = false;
                    height = "25px";
                    width = "25px";
                    val = "banks2017.png";
                }
                if (bankWithImage) {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<img height='" + heightPic + "' width='" + widthPic + "' src='images/Icons/Banks/Pictures/" + pic + "'/>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                } else {
                    data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                    content.innerHTML = getPopupContent("<h3>Banks 2017</h3>", "<div style='float:left;'><img height='" + height + "' width='" + width + "' src='images/Icons/Banks/" + val + "'/></div>", data, "points", coords);
                }
            }
            if (layer.get('name') == "Credit Unions") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

				content.innerHTML = getPopupContent("<h3>Credit Unions</h3>", "<div style='float:left;'><img height='50px' width='35px' src='images/Icons/creditunions.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Edward Jones") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

				content.innerHTML = getPopupContent("<h3>Edward Jones</h3>", "<div style='float:left;'><img height='50px' width='35px' src='images/Icons/edwardjones.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Agencies") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('street') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

				content.innerHTML = getPopupContent("<h3>Agencies</h3>", "<div style='float:left;'><img height='50px' width='35px' src='images/Icons/agencies.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Agent Locations - Zip Based") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

				content.innerHTML = getPopupContent("<h3>Agent Locations - Zip Based</h3>", "<div style='float:left;'><img height='50px' width='35px' src='images/Icons/agent_za.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Agent Locations - Address Based") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

				content.innerHTML = getPopupContent("<h3>Agent Locations - Address Based</h3>", "<div style='float:left;'><img height='50px' width='35px' src='images/Icons/agent_ca.png'/></div>", data, "points", coords);
            }
            if (layer.get('name').indexOf(" Radius") !== -1) {
				var circle = feature.getGeometry();
				var lowpoly = ol.geom.Polygon.fromCircle(circle);
				fetchAndDispRadius(circle, lowpoly, $("#selRadius").val(), layer);
            }
            if (layer.get('name') == "Parkway") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('namefull') + "</h4><h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br> Branch Deposits (June 2017): " + feature.S.features[mainFeature].get('sum2017').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Branch Deposits (June 2018): " + feature.S.features[mainFeature].get('sum2018').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>Total Parkway Bank Deposits: " + feature.S.features[mainFeature].get('depdom').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + feature.S.features[mainFeature].get('dep_change_1').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + feature.S.features[mainFeature].get('dep_change_1per').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + feature.S.features[mainFeature].get('dep_change_5').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + feature.S.features[mainFeature].get('dep_change_5per').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>Assets: " + feature.S.features[mainFeature].get('asset').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + feature.S.features[mainFeature].get('ass_change_1').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + feature.S.features[mainFeature].get('ass_change_1per').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + feature.S.features[mainFeature].get('ass_change_5').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + feature.S.features[mainFeature].get('ass_change_5per').toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>* in thousands";

                content.innerHTML = getPopupContent("<h3>Parkway Bank</h3>", "<div style='float:left;'><img height='50px' width='50px' src='images/Icons/Banks/parkway.png'/></div>", data, "points", coords);
            }
            if (layer.get('name') == "Tartan") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<img height='100px' width='275px' src='images/Icons/TartanPictures/" + feature.S.features[mainFeature].get('gid') + ".png'/>", "<div style='float:right;'><img height='30px' width='100px' src='images/Icons/tartan.png' /></div>", data, "tartan", feature.S.features[mainFeature].get('url'));
            }
            if (layer.get('name') == "Uhaul") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('street') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Uhaul</h3>", "<div style='float:right;'><img height='35px' width='125px' src='images/Icons/uhaul.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Poultry") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Poultry Facilities</h3>", "<div style='float:right;'><img height='40px' width='35px' src='images/Icons/poultry.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Fortune") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Fortune</h3>", "<div style='float:right;'><img height='40px' width='35px' src='images/Icons/fortune.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Fairgrounds") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>Fairgrounds</h3>", "<div style='float:right;'><img height='40px' width='35px' src='images/Icons/fairgrounds.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "PACA Operators") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip');

                content.innerHTML = getPopupContent("<h3>PACA Operators</h3>", "<div style='float:right;'><img height='40px' width='35px' src='images/Icons/paca.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Brownfields") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" +feature.S.features[mainFeature].get('county') + ", " + feature.S.features[mainFeature].get('state');

                content.innerHTML = getPopupContent("<h3>Brownfields</h3>", "<div style='float:right;'><img height='35px' width='40px' src='images/Icons/brownfields.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "TA Petro") {
                data = "<h4 style='color:#0072BC'>" + feature.S.features[mainFeature].get('name') + "</h4><img height='16px' width='16px' src='images/Icons/location.png' />&nbsp;" + feature.S.features[mainFeature].get('address') + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/phone.png' />Phone #: " + feature.S.features[mainFeature].get('phone');

                // content.innerHTML = getPopupContent("<img height='100px' width='275px' src='images/Icons/TA Petro Two.png'/>", "<div style='float:right;'><img height='30px' width='100px' src='images/Icons/tapetro.png' /></div>", data, "tartan", coords);
                content.innerHTML = getPopupContent("<h3>TA Petro</h3>", "<div style='float:right;'><img height='30px' width='60px' src='images/Icons/tapetro.png' /></div><br><div style='float:right;'><img height='75px' width='275px' src='images/Icons/TA Petro Two.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Biodiesel Plants") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />Website: " + feature.S.features[mainFeature].get('website');

                content.innerHTML = getPopupContent("<h3>Biodiesel Plants</h3>", "<div style='float:right;'><img height='40px' width='25px' src='images/Icons/biodieselplants.png' /></div>", data, "points", coords);
            }
            if (layer.get('name') == "Oil Refineries") {
                data = "<img height='16px' width='16px' src='images/Icons/location.png' />" + feature.S.features[mainFeature].get('address') + "<br>" + feature.S.features[mainFeature].get('city') + ", " + feature.S.features[mainFeature].get('state') + " " + feature.S.features[mainFeature].get('zip') + "<br><br><img height='16px' width='16px' src='images/Icons/web.png' />Website: " + feature.S.features[mainFeature].get('website');

                content.innerHTML = getPopupContent("<h3>Oil Refineries</h3>", "<div style='float:right;'><img height='45px' width='45px' src='images/Icons/oilrefineries.png' /></div>", data, "points", coords);
            }

            overlay.setPosition(coordinates);
        }
        if (layer.get('name') == "states" || layer.get('name') == "districts" || layer.get('name') == "zip" || layer.get('name') == "cities" || layer.get('name') == "counties" || layer.get('name') == "msas" || layer.get('name') == "neighbourcities") {
            // console.log(feature);
            // gidSelected = feature.c.replace(layer.get('name') + ".", "");
            gidSelected = feature.get('gid');
            layerName = layer.get('name');
            if (layer.get('name') == "states") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>State</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "districts") {
                data = "<h4 style='color:#0072BC'>" + feature.get('state') + " District # " + feature.get('count') + "</h4>";

                content.innerHTML = getPopupContent("<h3>District</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "counties") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>County</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "zip") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Zip Code</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "msas") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>MSA</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "cities") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>City</h3>", "", data, "bound", "");
            }
            if (layer.get('name') == "neighbourcities") {
                data = "<h4 style='color:#0072BC'>" + feature.get('name') + "</h4>";

                content.innerHTML = getPopupContent("<h3>Neighborhood</h3>", "", data, "bound", "");
            }
            overlay.setPosition(pointClicked);
        }
        if (layer.get('name') == "Drawing") {
            if (siteClick) {
                var centerOfPolygon = getCenterOfExtent(feature.getGeometry().getExtent());
                coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                var descrp = "<h4>Area: " + formatArea(feature.getGeometry()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ft<sup>2</sup></h4>";
                descrp += "<h4>Area: " + formatAreaAcres(feature.getGeometry()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " acres</h4>";
                reqwest({
                    url: "getSiteData.php?center=" + ol.proj.transform(centerOfPolygon, 'EPSG:3857', 'EPSG:4326'),
                    type: 'jsonp',
                }).then(function(data) {
                    try {
                        descrp += "<h4>Zip code : " + data.features[1].name + "</h4>";
                    } catch (ex) {}
                    try {
                        descrp += "<h4>District : " + data.features[3].name + "</h4>";
                    } catch (ex) {}
                    try {
                        descrp += "<h4>County : " + data.features[2].name + "</h4>";
                    } catch (ex) {}
                    try {
                        descrp += "<h4>State : " + data.features[0].name + "</h4>";
                    } catch (ex) {}
                    content.innerHTML = descrp +
                        "About: <a target='_blank' href='#'>Link</a><br>" +
                        "<a target='_blank' href='#'>Suggest an Edit</a></div>";
                    overlay.setPosition(evt.coordinate);
                });
            }
        }
        if (layer.get('name') == "VoronoiStates") {
            state = feature.get('stusps');
            url = '../geoserver/ows?service=WFS&' +
                'version=1.0.0&request=GetFeature&cql_filter="stusps"=%27' + state + '%27&typename=Farmer:states&' +
                'outputFormat=application/json&EPSG:3857';

            var statesSource = new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: url
            });
            statesWFSVoronoi.setSource(statesSource);
// console.log(feature.getGeometry().getExtent());
            countiesExtent = feature.getGeometry().getExtent();
            map.getView().fit(countiesExtent);
            if ($('#cbPrimaryVoronoi').is(":checked") || $('#cbEnergyVoronoi').is(":checked") || $('#cbOwnVoronoi').is(":checked") || $('#cbTptVoronoi').is(":checked") || $('#cbSchoolsVoronoi').is(":checked") || $('#cbBanksVoronoi').is(":checked") || $('#cbFinVoronoi').is(":checked") || $('#cbFoodVoronoi').is(":checked") || $('#cbBeveragesVoronoi').is(":checked") || $('#cbDCVoronoi').is(":checked") || $('#cbRefVoronoi').is(":checked") || $('#cbFoodHomeVoronoi').is(":checked") || $('#cbFoodAwayVoronoi').is(":checked") || $('#cbFoodSuperMarketVoronoi').is(":checked") || $('#cbHealthFacilitiesVoronoi').is(":checked")) {
                var options = {
                    bbox: feature.getGeometry().getExtent()
                };
                var turfFeatures = [];
                var features = getFeaturesInSelection(feature.getGeometry().getExtent());
                for (j = 0; j < features.length; j++) {
                    for (i = 0; i < features[j].length; i++) {
                        turfFeatures.push(turf.point(features[j][i].getGeometry().getCoordinates(), features[j][i].S));
                    }
                    voronoiPointsSource.addFeatures(features[j]);
                }

                var fc = turf.featureCollection(turfFeatures);
                var voronoi = turf.voronoi(fc, options);

                voronoiPolygonsSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(voronoi)
                });
                extentVoronoi = feature.getGeometry().getExtent();
                selectedExtentForVoronoi = feature.getGeometry();
            }

            map.removeLayer(statesWFSVoronoi);

            showRespectiveOpts();
        }
        if (layer.get('name') == "EggPlants") { /**/
			trafficSelect = $("#selTrafficEgg").val();
			var state = feature.S.name;
			origFlag = 0;
			try {
                svg.selectAll("*").remove();
            } catch (ex) {}
			startShippingAnimation("eggplants",trafficSelect, state);
		}
        if (layer.get('name') == "Shipping") {
            $("#topVolume").hide();
            $("#intraBar").hide();
            $("#InteractiveChord").hide();
            mode = $("#selMode").val();
            trafficSelect = $("#selTraffic").val();
            origFlag = 0;
            destFlag = 0;
            var string = feature.S.name;
            state = string.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            origFlag = 0;
            try {
                svg.selectAll("*").remove();
            } catch (ex) {}
            startShippingAnimation("frozen",trafficSelect, state);
            if ($("#selMode").val() != "all") {
                $("#InteractiveChord").show();
                interstateChord($("#selTraffic").val());
            }
            intrastateChord(state);
            BarChartRef(state);
            $("#topVolume").show();
            $("#intraBar").show();
        }
        if (layer.get('name') == "VoronoiRegions") {
            state = feature.get('stusps');
            url = '../geoserver/ows?service=WFS&' +
                'version=1.0.0&request=GetFeature&cql_filter="stusps"=%27' + state + '%27&typename=Farmer:region&' +
                'outputFormat=application/json&EPSG:3857';

            var regionsSource = new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: url
            });
            regionsWFSVoronoi.setSource(regionsSource);

            countiesExtent = feature.getGeometry().getExtent();
            map.getView().fit(countiesExtent);

            map.removeLayer(regionsWFSVoronoi);
        }
		if(layer.get('name').indexOf("CR-Crosswalks-") !== -1){
			baseStates.setVisible(false);
			var layerName = layer.get('name').replace("CR-Crosswalks-","");
			if (layerName == 'states') {
				Ghosted = "Off";
				removeLayers();
				statename=feature.S.name;
				statefp=feature.S.statefp;
				stabbr=feature.S.stusps;
				var code = $("#selCode").val();
				$('#selGo'+code).prop('selectedIndex',0);
				$("#selGo"+code).trigger("change");
				$("#selGo"+code).selectpicker('refresh');
				if ($("#selCode").val()=='Zip'){
					baseZip = getBoundaryCR('zip', statefp, true);
					map.addLayer(baseZip);
				}
				else if ($("#selCode").val()=='Tracts') {
					baseTracts = getBoundaryCR('tracts', statefp, true);
					map.addLayer(baseTracts);
				}
				else if ($("#selCode").val()=='Counties') {
					baseCounties = getBoundaryCR('counties', statefp, true);
					map.addLayer(baseCounties);
				}
				else if ($("#selCode").val()=='LauCnty') {
					baseLauCnty = getBoundaryCR('laucnty', statefp, true);
					map.addLayer(baseLauCnty);
				}
				else if ($("#selCode").val()=='Food_Report') {
					baseFood_Report = getBoundaryCR('food_report', statefp, true);
					map.addLayer(baseFood_Report);
				}
				else if ($("#selCode").val()=='Districts') {
					baseDistricts = getBoundaryCR('districts', statefp, true);
					map.addLayer(baseDistricts);
				}
				else if ($("#selCode").val()=='Cities') {
					baseCities = getBoundaryCR('cities', statefp, true);
					map.addLayer(baseCities);
				}
				else if ($("#selCode").val()=='MSAs') {
					baseMSAs = getBoundaryCR('msas', statefp, true);
					map.addLayer(baseMSAs);
				}
				else if ($("#selCode").val()=='NeighbourCities') {
					baseNeighbourCities = getBoundaryCR('NeighbourCities', statefp, true);
					map.addLayer(baseNeighbourCities);
				}
				else if ($("#selCode").val()=='Schools_CCD') {
					baseSchools_CCD = getBoundaryCR('schools_ccd', statefp, true);
					map.addLayer(baseSchools_CCD);
				}
				else if ($("#selCode").val()=='ConsumerMarket') {
					baseConsumerMarket = getBoundaryCR('consumermarket', statefp, true);
					map.addLayer(baseConsumerMarket);
				}
				else if ($("#selCode").val()=='HSA') {
					baseHSA = getBoundaryCR('hsa', statefp, true);
					map.addLayer(baseHSA);
				}
				else if ($("#selCode").val()=='HRR') {
					baseHRR = getBoundaryCR('hrr', statefp, true);
					map.addLayer(baseHRR);
				}
				else if ($("#selCode").val()=='SubBasin') {
					baseSubBasin = getBoundaryCR('subbasin', statefp, true);
					map.addLayer(baseSubBasin);
				}
				else if ($("#selCode").val()=='OpportunityZones') {
					baseOpportunityZones = getBoundaryCR('opportunityzones', statename.toLowerCase(), true);
					map.addLayer(baseOpportunityZones);
				}
				else if ($("#selCode").val()=='SubWatershed') {
					wmsSubWatershed.getSource().updateParams({
						'LAYERS': 'Farmer:subwatershed',
						'cql_filter': "statefp ilike '%"+ statefp +"%'",
						'STYLES': 'subwatershed'
					});
					wmsSubWatershed.setVisible(true);
					baseSubWatershed = getBoundaryCR('subwatershed', statefp, true);
					map.addLayer(baseSubWatershed);
				}
				else if ($("#selCode").val()=='STR_Geocoded_All_New') {
					baseSTR_Geocoded_All_New = getBoundaryCR('str_geocoded_all_new', stabbr, true);
					map.addLayer(baseSTR_Geocoded_All_New);
				}
				else if ($("#selCode").val()=='State') {
					$("#searchBarState").val(feature.S.name);
					var extent = feature.getGeometry().getExtent();
					map.getView().fit(extent, {duration: 1000});
					$('#selGoState').prop('selectedIndex',0);
					$("#selGoState").trigger("change");
					$("#selGoState").selectpicker('refresh');
					$("#btnSearchState").trigger("click");
				}
				var extent = feature.getGeometry().getExtent();
				map.getView().fit(extent, {duration: 1000});
				$("#instructions").hide();
			}
			else if (layerName == 'states_ratio') {
				removeLayersRatios('overlays');
				statename=feature.S.name;
				statefp=feature.S.statefp;
				stabbr=feature.S.stusps;
				var code = $("#selRatio").val();
				code = code.split('-');
				if(code[0] !== 'cbsa10') {
					var obj = new Object();
					var val = code[0].capitalize();
					if(val === 'Zip') {
					  ratioZip = getBoundaryCR(code[0]+'_ratio', statefp, true);
					  map.addLayer(ratioZip);
					}
					else if(val === 'CBSA10') {
					  ratioCBSA10 = getBoundaryCR(code[0]+'_ratio', statefp, true);
					  map.addLayer(ratioCBSA10);
					}
					else if(val === 'Tracts') {
					  ratioTracts = getBoundaryCR(code[0]+'_ratio', statefp, true);
					  map.addLayer(ratioTracts);
					}
					else if(val === 'Counties') {
					  ratioCounties = getBoundaryCR(code[0]+'_ratio', statefp, true);
					  map.addLayer(ratioCounties);
					}
					var extent = feature.getGeometry().getExtent();
						map.getView().fit(extent, {duration: 1000});
				}
			}
			else if (layerName == 'counties_ratio') {
				var code = feature.S.geoid;
					$("#searchBarRatios").val(code);
					searchInputBoundary('Counties_ratio','geoid');
			}
			else if (layerName == 'zip_ratio') {
				var code = feature.S.name;
					$("#searchBarRatios").val(code);
					searchInputBoundary('Zip','name');
			}
			else if (layerName == 'tracts_ratio') {
				// removeLayersRatios('overlays');
				var geoid = feature.S.geoid;
					$("#searchBarRatios").val(geoid);
					searchInputBoundary('Tracts','geoid');
			}
			else if (layerName == 'counties') {
				var stusps = feature.S.state;
				var name = feature.S.name;
				var txt = name +","+ stusps;
				Ghosted = 'On';
				$("#searchBarCounties").val(txt);
				btnSearch('Counties','name');
			}
			else if (layerName == 'region') {
				removeLayers();
				region = feature.S.name;
				$("#searchBarRegion").val(region);
				var extent = feature.getGeometry().getExtent();
				map.getView().fit(extent, {duration: 1000});
				$('#selGoRegions').prop('selectedIndex',0);
				$("#selGoRegions").trigger("change");
				$("#selGoRegions").selectpicker('refresh');
				$("#btnSearchRegion").trigger("click");
			}
			else if (layerName == 'tracts') {
				var geoid=feature.S.geoid;
				$("#searchBarTracts").val(geoid);
				btnSearch('Tracts','geoid');
			}
			else if (layerName == 'zip') {
				var zcta5ce=feature.S.name;
				$("#searchBarZip").val(zcta5ce);
				btnSearch('Zip','name');
			}
			else if (layerName == 'districts') {
				var geoid=feature.S.geoid;
				$("#searchBarDistricts").val(geoid);
				btnSearch('Districts','geoid');
			}
			else if (layerName == 'cities') {
				var geoid=feature.S.geoid;
				$("#searchBarCities").val(geoid);
				btnSearch('Cities','geoid');
			}
			else if (layerName == 'msas') {
				var geoid=feature.S.geoid;
				$("#searchBarMSAs").val(geoid);
				btnSearch('MSAs','geoid');
			}
			else if (layerName == 'NeighbourCities') {
				var stusps = feature.S.state;
				var name = feature.S.name;
				var txt = name +","+ stusps;
				$("#searchBarNeighbourCities").val(txt);
				btnSearch('NeighbourCities','name');
			}
			else if (layerName == 'laucnty') {
				var laus_code = feature.S.laus_code;
				$("#searchBarLauCnty").val(laus_code);
				btnSearch('LauCnty','laus_code');
			}
			else if (layerName == 'food_report') {
				var code = feature.S.code;
				$("#searchBarFood_Report").val(code);
				btnSearch('Food_Report','code');
			}
			else if (layerName == 'bea10') {
				var code = feature.S.lm_code;
				$("#searchBarBEA10").val(code);
				btnSearch('BEA10','lm_code');
			}
			else if (layerName == 'cbsa10') {
				var code = feature.S.lm_code;
				$("#searchBarCBSA10").val(code);
				btnSearch('CBSA10','lm_code');
			}
			else if (layerName == 'cbsa10_ratio') {
				var code = feature.S.lm_code;
				$("#searchBarRatios").val(code);
				searchInputBoundary('CBSA10','lm_code');
			}
			else if (layerName == 'ers10') {
				var code = feature.S.lm_code;
				$("#searchBarERS10").val(code);
				btnSearch('ERS10','lm_code');
			}
			else if (layerName == 'ers10rep') {
				var code = feature.S.lm_code;
				$("#searchBarERS10Rep").val(code);
				btnSearch('ERS10Rep','lm_code');
			}
			else if (layerName == 'msas_grainger') {
				var code = feature.c;
				code = code.replace('msas_grainger.','');
				$("#searchBarMSAs_Grainger").val(code);
				btnSearch('MSAs_Grainger','gid');
			}
			else if (layerName == 'opportunityzones') {
				var code = feature.S.geoid10;//waqas
				$("#searchBarOpportunityZones").val(code);
				btnSearch('OpportunityZones','geoid10');
			}
			else if (layerName == 'pea10') {
				var code = feature.S.lm_code;
				$("#searchBarPEA10").val(code);
				btnSearch('PEA10','lm_code');
			}
			else if (layerName == 'tp10') {
				var code = feature.S.lm_code;
				$("#searchBarTP10").val(code);
				btnSearch('TP10','lm_code');
			}
			else if (layerName == 'tp10metro') {
				var code = feature.S.lm_code;
				$("#searchBarTP10METRO").val(code);
				btnSearch('TP10METRO','lm_code');
			}
			else if (layerName == 'tp10micro') {
				var code = feature.S.lm_code;
				$("#searchBarTP10MICRO").val(code);
				btnSearch('TP10MICRO','lm_code');
			}
			else if (layerName == 'triballand') {
				var code = feature.c;
				code = code.replace('triballand.','');
				$("#searchBarTribalLand").val(code);
				btnSearch('TribalLand','gid');
			}
			else if (layerName == 'schools_ccd') {
				var code = feature.S.nces_distr;
				$("#searchBarSchools_CCD").val(code);
				btnSearch('Schools_CCD','nces_distr');
			}
			else if (layerName == 'consumermarket') {
				var code = feature.S.geoid;
				$("#searchBarConsumerMarket").val(code);
				btnSearch('ConsumerMarket','geoid');
			}
			else if (layerName == 'hsa') {
				var code = feature.S.hsa93;
				$("#searchBarHSA").val(code);
				btnSearch('HSA','hsa93');
			}
			else if (layerName == 'hrr') {
				var code = feature.S.hrrnum;
				$("#searchBarHRR").val(code);
				btnSearch('HRR','hrrnum');
			}
			else if (layerName == 'watershedregions') {
				var code = feature.S.huc;
				$("#searchBarWaterShedRegions").val(code);
				btnSearch('WaterShedRegions','huc');
			}
			else if (layerName == 'subbasin') {
				var code = feature.S.huc;
				$("#searchBarSubBasin").val(code);
				btnSearch('SubBasin','huc');
			}
			else if (layerName == 'subwatershed') {
				wmsSubWatershed.getSource().updateParams({
					'STYLES': 'CrosswalkGhosted'
				});
				var code = feature.S.huc;
				$("#searchBarSubWatershed").val(code);
				btnSearch('SubWatershed','huc');
			}
			else if (layerName == 'str_geocoded_all_new') {
				var code = feature.c;
				code = code.replace('str_geocoded_all_new.','');
				$("#searchBarSTR_Geocoded_All_New").val(code);
				btnSearch('STR_Geocoded_All_New','gid');
			}
		}
    } else
        overlay.setPosition(undefined);

    if (!alreadyShown) {
        layers.forEach(function(layer, i, layers) {
            if (layer.get('name') == "Food Access" || layer.get('name') == "Food Access Income" || layer.get('name') == "Food Access La" || layer.get('name') == "Food Access LaTractsH" || layer.get('name') == "Food Access LaTracts" || layer.get('name') == "Food Access Lila" || layer.get('name') == "Urban/Rural" || layer.get('name') == "Primary Economic Type" || layer.get('name') == "EQI" || layer.get('name') == "Major Soil Resource" || layer.get('name') == "WDPA" || layer.get('name') == "Tribal Land" || layer.get('name') == "Income" || layer.get('name') == "Density" || layer.get('name') == "Population" || layer.get('name') == "Households" || layer.get('name') == "Vacancy" || layer.get('name') == "Port Boundary" || layer.get('name') == "Ethanol Production" || layer.get('name') == "Data Centers" || layer.get('name') == "Cattle" || layer.get('name') == "Cattle Top" || layer.get('name') == "NAICSAP" || layer.get('name') == "NAICSGrainger" || layer.get('name') == "NAICSEST" || layer.get('name') == "FFR" || layer.get('name') == "FFRCHANGE" || layer.get('name') == "FFRPOPU" || layer.get('name') == "FFRPOPUCHANGE" || layer.get('name') == "FSR" || layer.get('name') == "FSRCHANGE" || layer.get('name') == "FSRPOPU" || layer.get('name') == "FSRPOPUCHANGE" || layer.get('name') == "FARMERMARKET" || layer.get('name') == "FARMERMARKETCHANGE" || layer.get('name') == "DSF" || layer.get('name') == "DSFCHANGE" || layer.get('name') == "AldiDivisions" || layer.get('name') == "Bank Zip 2012" || layer.get('name') == "Bank Zip 2016" || layer.get('name') == "Bank Zip 2017" || layer.get('name') == "Bank County Dep 2012" || layer.get('name') == "Bank County Dep 2016" || layer.get('name') == "Bank County Dep 2017" || layer.get('name') == "Bank County Ass 2012" || layer.get('name') == "Bank County Ass 2016" || layer.get('name') == "Bank County Ass 2017" || layer.get('name') == "Medically Underserved Areas") {
                // console.log(layer.get('name'));
                if (layer.getVisible() && layer.get('name') == 'Primary Economic Type') {
                    url = primaryeconomictype.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,state,economic,farming_20,mining_201,manufactur,government,recreation,nonspecial,low_educat,low_employ,pop_loss_2,retirement,persistent,persisten2'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;

                            data = "<h4 style='color:#0072BC'>" + props.name + ", " + props.state + "</h4>All: " + props.economic + "<br>Farming 2015: " + props.farming_20 + "<br>Mining 2015: " + props.mining_201 + "<br>Manufacturing 2015: " + props.manufactur + "<br>Government 2015: " + props.government + "<br>Recreation 2015: " + props.recreation + "<br>Nonspecialized 2015: " + props.nonspecial + "<br>Low Education 2015: " + props.low_educat + "<br>Low Employment County 2008-2012: " + props.low_employ + "<br>Population Loss 2015: " + props.pop_loss_2 + "<br>Retirement Destination 2015: " + props.retirement + "<br>Persistent Poverty 2013: " + props.persistent + "<br>Persistent Related Child Poverty 2013: " + props.persisten2;
                            content.innerHTML = getPopupContent("<h3>Urban/Rural Counties</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Urban/Rural') {
                    url = wmsUrbanRural.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,county_nam,descriptio,latitude,longitude,population'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;

                            data = "<h4 style='color:#0072BC'>" + props.county_nam + "</h4>Population: " + props.population + "<br>" + props.descriptio;
                            content.innerHTML = getPopupContent("<h3>Urban/Rural Counties</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Income') {
                    url = incomeWMSMW.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name_1,medianinc,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name_1 + "</h4>Median Income:" + props.medianinc;
                            content.innerHTML = getPopupContent("<h3>Median Income</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Density') {
                    url = densityWMSMW.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name_1,density,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name_1 + "</h4>Density:" + props.density;
                            content.innerHTML = getPopupContent("<h3>Density</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Population') {
                    url = popuWMSMW.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name_1,population,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name_1 + "</h4>Population:" + props.population;
                            content.innerHTML = getPopupContent("<h3>Population</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Households') {
                    url = hhWMSMW.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name_1,households,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name_1 + "</h4>Households:" + props.households;
                            content.innerHTML = getPopupContent("<h3>Households (#)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Vacancy') {
                    url = vacancyWMS.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,vac_per_b,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Average:" + props.vac_per_b;
                            content.innerHTML = getPopupContent("<h3>Vacancies</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'WDPA') {
                    url = wdpa.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,states,counties,sldl,sldu,rep_area_a,gov_type,own_type,mang_auth,mang_plan,latitude,longitude,geom'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Area(Acres): :" + props.rep_area_a + "<br>Govt. Type: " + props.gov_type + "<br>Own. Type: " + props.own_type + "<br>Mang. Authority: " + props.mang_auth + "<br>Mang. Plan: " + props.mang_plan + "<br>County: " + props.counties + "<br>SLDL: " + props.sldl + "<br>SLDU: " + props.sldu + "<br>State: " + props.states;
                            content.innerHTML = getPopupContent("<h3>WDPA</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Tribal Land') {
                    url = padus.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,geom'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>";
                            content.innerHTML = getPopupContent("<h3>Tribal Land</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                }else if (layer.getVisible() && layer.get('name') == 'EQI') {
                    url = eqi.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,state,eqi,latitude,longitude,geom'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>EQI:" + props.eqi;
                            content.innerHTML = getPopupContent("<h3>EQI</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Major Soil Resource') {
                    url = majorsoilresource.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,mlra_name,mlrarsym,lrr_name,latitude,longitude,geom'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.lrr_name + "</h4>" + props.mlra_name;
                            content.innerHTML = getPopupContent("<h3>Major Soil Resource</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Port Boundary') {
                    url = portBoundaryWMS.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>";
                            content.innerHTML = getPopupContent("<h3>Port Boundary</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Cattle') {
                    url = cattle.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,value'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Total Production: " + props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Cattle / Beef (90%) </h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Cattle Top') {
                    url = cattletop.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,value'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Total Production: " + props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Cattle / Beef (Top 7)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Ethanol Production') {
                    url = ethanol_production.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,value'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Total Production (in thousands of barrels): " + props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Ethanol Production </h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Data Centers') {
                    url = dataCenters.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,value'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Count: " + props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Data Centers </h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'NAICSAP') {
                    url = naicsap.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,ap,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Annual Payroll: " + props.ap;
                            content.innerHTML = getPopupContent("<h3>Annual Payroll</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'NAICSGrainger') {
                    url = naicsgrainger.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,naics_code,naics_desc,num_establishments,employment,annual_payroll,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>NAICS Grainger Code: " + props.naics_code + "<br>NAICS Grainger Description: " + props.naics_desc + "<br>No. of Establishments: " + props.num_establishments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br>Employment: " + props.employment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br>Annual Payroll: " + props.annual_payroll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>NAICS Grainger</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'NAICSEST') {
                    url = naicsest.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,est,latitude,longitude'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>No. of Establishments: " + props.est;
                            content.innerHTML = getPopupContent("<h3>No. of Establishments</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FFR') {
                    url = ffr.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,ffr14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Fast-food Restaurants, 2014: " + props.ffr14;
                            content.innerHTML = getPopupContent("<h3>Fast-food restaurants, 2014</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FFRCHANGE') {
                    url = ffrchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_ffr_09_14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Fast-food Restaurants (% change): " + props.pch_ffr_09_14;
                            content.innerHTML = getPopupContent("<h3>Fast-food restaurants (% change)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FFRPOPU') {
                    url = ffrpopu.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,ffrpth14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Fast-food Restaurants/1,000 pop: " + props.ffrpth14;
                            content.innerHTML = getPopupContent("<h3>Fast-food Restaurants/1,000 pop</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FFRPOPUCHANGE') {
                    url = ffrpopuchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_ffrpth_09_14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Fast-food Restaurants/1,000 pop (% change), 2009-14: " + props.pch_ffrpth_09_14;
                            content.innerHTML = getPopupContent("<h3>Fast-food Restaurants/1,000 pop (% change), 2009-14</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FSR') {
                    url = fsr.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,fsr14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Full-service restaurants: " + props.fsr14;
                            content.innerHTML = getPopupContent("<h3>Full-service restaurants</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FSRCHANGE') {
                    url = fsrchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_fsr_09_14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Full-service restaurants (% change): " + props.pch_fsr_09_14;
                            content.innerHTML = getPopupContent("<h3>Full-service restaurants (% change)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FSRPOPU') {
                    url = fsrpopu.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,fsrpth14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Full-service restaurants/1,000 pop: " + props.fsrpth14;
                            content.innerHTML = getPopupContent("<h3>Full-service restaurants/1,000 pop</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FSRPOPUCHANGE') {
                    url = fsrpopuchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_fsrpth_09_14'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Full-service restaurants/1,000 pop (% change): " + props.pch_fsrpth_09_14;
                            content.innerHTML = getPopupContent("<h3>Full-service restaurants/1,000 pop (% change)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FARMERMARKET') {
                    url = farmermarket.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,fmrkt16'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Farmers' markets: " + props.fmrkt16;
                            content.innerHTML = getPopupContent("<h3>Farmers' markets</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'FARMERMARKETCHANGE') {
                    url = farmermarketchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_fmrkt_09_16'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Farmers' markets (% change): " + props.pch_fmrkt_09_16fmrkt16;
                            content.innerHTML = getPopupContent("<h3>Farmers' markets (% change)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'DSF') {
                    url = dsf.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,dirsales_farms12'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Direct Sales Farms: " + props.dirsales_farms12;
                            content.innerHTML = getPopupContent("<h3>Direct Sales Farms</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'DSFCHANGE') {
                    url = dsfchange.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,pch_dirsales_farms_07_12'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>Direct Sales Farms (% change): " + props.pch_dirsales_farms_07_12;
                            content.innerHTML = getPopupContent("<h3>Direct Sales Farms (% change)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                }else if (layer.getVisible() && layer.get('name') == 'Food Access') {
                    var columnName;
                    // switch ($("#urbanRuralIncomeSelect").val()) {
                    // case 'lowincomet':
                    // columnName = 'lowincomet';
                    // break;
                    // case 'la1and10':
                    // columnName = 'la1and10';
                    // break;
                    // case 'latracts_h':
                    // columnName = 'latracts_h';
                    // break;
                    // case 'latracts20':
                    // columnName = 'latracts20';
                    // break;
                    // case 'lilatracts':
                    // columnName = 'lilatracts';
                    // break;
                    // }
                    switch ($("#socialSelect").val()) {
                        case 'pop2010':
                            columnName = 'pop2010';
                            break;
                        case 'ohu2010':
                            columnName = 'ohu2010';
                            break;
                        case 'povertyrat':
                            columnName = 'povertyrat';
                            break;
                        case 'tractkids':
                            columnName = 'tractkids';
                            break;
                        case 'tractsenio':
                            columnName = 'tractsenio';
                            break;
                        case 'tractwhite':
                            columnName = 'tractwhite';
                            break;
                        case 'tractblack':
                            columnName = 'tractblack';
                            break;
                        case 'tractasian':
                            columnName = 'tractasian';
                            break;
                        case 'tracthispa':
                            columnName = 'tracthispa';
                            break;
                    }
                    switch ($("#residentsSelect").val()) {
                        case 'medianfami':
                            columnName = 'medianfami';
                            break;
                        case 'tractlowi':
                            columnName = 'tractlowi';
                            break;
                        case 'tractsnap':
                            columnName = 'tractsnap';
                            break;
                    }
                    switch ($("#urbanruralFoodAccessSelect").val()) {
                        case 'lapop1':
                            columnName = 'lapop1';
                            break;
                        case 'lapop1shar':
                            columnName = 'lapop1shar';
                            break;
                        case 'lalowi1':
                            columnName = 'lalowi1';
                            break;
                        case 'lalowi1sha':
                            columnName = 'lalowi1sha';
                            break;
                        case 'lapop10':
                            columnName = 'lapop10';
                            break;
                        case 'lapop10sha':
                            columnName = 'lapop10sha';
                            break;
                        case 'lalowi10':
                            columnName = 'lalowi10';
                            break;
                        case 'lalowi10sh':
                            columnName = 'lalowi10sh';
                            break;
                        default:
                            break;
                    }
                    url = foodaccess.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,latitude,longitude,' + columnName
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var columnValue;
                            var heading;
                            var feature = data.features[0];
                            var props = feature.properties;

                            switch ($("#socialSelect").val()) {
                                case 'pop2010':
                                    columnValue = props.pop2010;
                                    heading = 'Populations (#s)';
                                    break;
                                case 'ohu2010':
                                    columnValue = props.ohu2010;
                                    heading = 'Households';
                                    break;
                                case 'povertyrat':
                                    columnValue = props.povertyrat;
                                    heading = 'Poverty Rate';
                                    break;
                                case 'tractkids':
                                    columnValue = props.tractkids;
                                    heading = 'Children (#s)';
                                    break;
                                case 'tractsenio':
                                    columnValue = props.tractsenio;
                                    heading = '65+ (#s)';
                                    break;
                                case 'tractwhite':
                                    columnValue = props.tractwhite;
                                    heading = 'Race: White (#s)';
                                    break;
                                case 'tractblack':
                                    columnValue = props.tractblack;
                                    heading = 'Race: Black (#s)';
                                    break;
                                case 'tractasian':
                                    columnValue = props.tractasian;
                                    heading = 'Race: Asian (#s)';
                                    break;
                                case 'tracthispa':
                                    columnValue = props.tracthispa;
                                    heading = 'Race: Latino (#s)';
                                    break;
                            }
                            switch ($("#residentsSelect").val()) {
                                case 'medianfami':
                                    columnValue = props.medianfami;
                                    heading = 'Income';
                                    break;
                                case 'tractlowi':
                                    columnValue = props.tractlowi;
                                    heading = 'Low Income (#s) ';
                                    break;
                                case 'tractsnap':
                                    columnValue = props.tractsnap;
                                    heading = 'Households w/SNAP';
                                    break;
                            }
                            switch ($("#urbanruralFoodAccessSelect").val()) {
                                case 'lapop1':
                                    columnValue = props.lapop1;
                                    heading = 'lapop1';
                                    break;
                                case 'lapop1shar':
                                    columnValue = props.lapop1shar;
                                    heading = 'lapop1shar';
                                    break;
                                case 'lalowi1':
                                    columnValue = props.lalowi1;
                                    heading = 'lalowi1';
                                    break;
                                case 'lalowi1sha':
                                    columnValue = props.lalowi1sha;
                                    heading = 'lalowi1sha';
                                    break;
                                case 'lapop10':
                                    columnValue = props.lapop10;
                                    heading = 'lapop10 ';
                                    break;
                                case 'lapop10sha':
                                    columnValue = props.lapop10sha;
                                    heading = 'lapop10share ';
                                    break;
                                case 'lalowi10':
                                    columnValue = props.lalowi10;
                                    heading = 'lalowi10 ';
                                    break;
                                case 'lalowi10sh':
                                    columnValue = props.lalowi10sh;
                                    heading = 'lalowi10share';
                                    break;
                                default:
                                    break;
                            }
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4>" + heading + ": " + columnValue;
                            content.innerHTML = getPopupContent("<h3>" + heading + "</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Food Access Income') {
                    url = lowincomet.getSource().getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(), {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'gid,name,lowincomet'
                        }
                    );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4> Value: " + props.lowincomet;
                            content.innerHTML = getPopupContent("<h3>Low Income Tract</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Food Access La') {
                    url = la1and10.getSource().getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(), {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'gid,name,la1and10'
                        }
                    );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4> Value: " + props.la1and10;
                            content.innerHTML = getPopupContent("<h3>Low Food Access (1&10)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Food Access LaTractsH') {
                    url = latracts_h.getSource().getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(), {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'gid,name,latracts_h'
                        }
                    );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4> Value: " + props.latracts_h;
                            content.innerHTML = getPopupContent("<h3>Low Food Access (1/2 mile)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Food Access LaTracts') {
                    url = latracts20.getSource().getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(), {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'gid,name,latracts20'
                        }
                    );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4> Value: " + props.latracts20;
                            content.innerHTML = getPopupContent("<h3>Low Food Access (20 miles)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Food Access Lila') {
                    url = lilatracts.getSource().getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(), {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'gid,name,lilatracts'
                        }
                    );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4> Value: " + props.lilatracts;
                            content.innerHTML = getPopupContent("<h3>LILA Tracts 1 And 10</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'AldiDivisions') {
                    url = aldiDivisions.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,division,state'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.division + "</h4>" + props.state;
                            content.innerHTML = getPopupContent("<h3>Aldi Division</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank Zip 2012') {
                    url = bankzip2012.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2012'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2012.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Banks By Zip (2012)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank Zip 2016') {
                    url = bankzip2016.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2016'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2016.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Banks By Zip (2016)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank Zip 2017') {
                    url = bankzip2017.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2017,deposits_change_1,dep_change_1per,deposits_change_5,dep_change_5per,asset_sum_2017,assets_change_1,ass_change_1per,assets_change_5,ass_change_5per'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;

                            if (props.asset_sum_2017)
                                data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2017.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + props.deposits_change_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + props.dep_change_1per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + props.deposits_change_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + props.dep_change_5per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>Assets: " + props.asset_sum_2017.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + props.assets_change_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + props.ass_change_1per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + props.assets_change_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + props.ass_change_5per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            else
                                data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2017.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + props.deposits_change_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + props.dep_change_1per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + props.deposits_change_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + props.dep_change_5per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            content.innerHTML = getPopupContent("<h3>Banks By Zip (2017)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Dep 2012') {
                    url = bankcountydep2012.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2012'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2012.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Deposits By County (2012)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Dep 2016') {
                    url = bankcountydep2016.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2016'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2016.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Deposits By County (2016)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Dep 2017') {
                    url = bankcountydep2017.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,deposits_sum_2017,deposits_change_1,dep_change_1per,deposits_change_5,dep_change_5per'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Deposits: " + props.deposits_sum_2017.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + props.deposits_change_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + props.dep_change_1per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + props.deposits_change_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + props.dep_change_5per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Deposits By County (2017)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Ass 2012') {
                    url = bankcountyasset2012.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,asset_sum_2012'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Assets: " + props.asset_sum_2012.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Assets By County (2012)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Ass 2016') {
                    url = bankcountyasset2016.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,asset_sum_2016'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Assets: " + props.asset_sum_2016.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Assets By County (2016)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Bank County Ass 2017') {
                    url = bankcountyasset2017.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,name,asset_sum_2017,assets_change_1,ass_change_1per,assets_change_5,ass_change_5per'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.name + "</h4><br>Assets: " + props.asset_sum_2017.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Change (2016-2017): " + props.assets_change_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> Annual Percentage change (2016-2017): " + props.ass_change_1per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br>  5 Years Change (2012-2017): " + props.assets_change_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br><br> 5 Years Percentage Change (2012-2017): " + props.ass_change_5per.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            content.innerHTML = getPopupContent("<h3>Bank Assets By County (2017)</h3>", "", data, "bound", "");

                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                } else if (layer.getVisible() && layer.get('name') == 'Medically Underserved Areas') {
                    url = muap.getSource()
                        .getGetFeatureInfoUrl(
                            evt.coordinate,
                            map.getView().getResolution(),
                            map.getView().getProjection(), {
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'gid,muadgntypd,muarscivpp,muascore,ppage65pct,pvt100pnum,prvd1000pp'
                            }
                        );
                    reqwest({
                        url: url,
                        type: 'json',
                    }).then(function(data) {
                        try {
                            var feature = data.features[0];
                            var props = feature.properties;
                            layerName = layer.get('name');
                            gidSelected = props.gid;
                            data = "<h4 style='color:#0072BC'>" + props.muadgntypd + "</h4><br>Total Population in Underserved Area: " + props.muarscivpp + "<br><br> % Population Age 65+: " + props.muascore + "<br><br> % Population Below Poverty Level: " + props.ppage65pct + "<br><br>Number of Primary Care Physicians / 1K: " + props.pvt100pnum + "<br><br>Index of Medical Underservice (IMU Score): " + props.prvd1000pp;
                            content.innerHTML = getPopupContent("<h3>" + props.muadgntypd + "</h3>", "", data, "bound", "");
                            overlay.setPosition(pointClicked);
                        } catch (ex) {}
                    });
                }
            }
        });
    }
}

function updateResourceOnGS(lyr, table, passedExtent) {
    try {
        lyr.getSource().clear();
    } catch (ex) {}
    var source;
    source = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        loader: function(extent, resolution, projection) {
            var url = '../geoserver/wfs?' +
                'service=WFS&request=GetFeature&' +
                'version=1.0.0&typename=Farmer:' + table + '&' +
                'outputFormat=application/json&';

            if (table == "enterprisebuildings")
                url += 'PropertyName=gid,name,geom&';
            if (table == "networkbuildings")
                url += 'PropertyName=gid,name,geom&';
            if (table == "airports")
                url += 'PropertyName=gid,name,type,importance,latitude,longitude,geom&';
            if (table == "farmers")
                url += 'PropertyName=gid,name,street,county,city,state,zip,latitude,longitude,geom&';
            if (table == "stores")
                url += 'PropertyName=id,name,address,city,state,zip,latitude,longitude,geom&';
            if (table == "brownfields")
                url += 'PropertyName=gid,name,state,county,latitude,longitude,geom&';
            if (table == "logos")
                url += 'PropertyName=id,name,address,city,logo,state,zipcode,latitude,longitude,geom&';
            if (table == "hsb")
                url += 'PropertyName=id,name,latitude,longitude,type,geom&';
            if (table == "transitstations")
                url += 'PropertyName=gid,name,sys_agency,city,state,zip,latitude,longitude,geom&';
            if (table == "port_facility")
                url += 'PropertyName=gid,name,type,location,city,statepcode,zip,countyname,latitude,longitude,geom&';
            if (table == "gardens")
                url += 'PropertyName=gid,name,descriptio,latitude,longitude,geom&';
            if (table == "homemade_shelters")
                url += 'PropertyName=gid,name,street,city,state,zip,phone,website,latitude,longitude,geom&';
            if (table == "unitsa")
                url += 'PropertyName=gid,storeno,name,address,city,state,zip,dmamember,dmadc,mainlinedc,deliverydays,geom&';
            if (table == "unitsb")
                url += 'PropertyName=gid,storeno,name,address,city,state,zip,mainlinedc,deliverydays,geom&';
            if (table == "potbellytwo")
                url += 'PropertyName=id,name,differencetwo,geom&';
            if (table == "hot_springs")
                url += 'PropertyName=gid,name,state,tempf,tempc,geom&';
            if (table == "landbanks")
                url += 'PropertyName=gid,name,website,year,geom&';
            if (table == "iana")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (table == "traffic")
                url += 'PropertyName=gid,name,to,from,latest,angle,geom&';
            if (table == "ports")
                url += 'PropertyName=gid,name,river,state,geom&';
            if (table == "dhl")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (table == "fedex")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (table == "ups")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (table == "mclane")
                url += 'PropertyName=gid,name,address,state,zip,phone,latitude,longitude,geom&';
            if (table == "amazon")
                url += 'PropertyName=gid,name,address,latitude,longitude,descriptio,geom&';
            if (table == "sysco")
                url += 'PropertyName=gid,name,address,phone,fax,latitude,longitude,geom&';
            if (table == "robinsonfresh")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "kehe")
                url += 'PropertyName=gid,name,address,area,website,geom&';
            if (table == "pfgpfs")
                url += 'PropertyName=gid,name,address,state,zip,phone,type,geom&';
            if (table == "sygma")
                url += 'PropertyName=gid,name,address,state,zip,phone,geom&';
            if (table == "dmadcs")
                url += 'PropertyName=gid,name,address,geom&';
            if (table == "vistar")
                url += 'PropertyName=gid,name,address,state,zip,phone,geom&';
            if (table == "flagpoints")
                url += 'PropertyName=gid,name,latitude,longitude,geom&';
            if (table == "albertsons")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,hours,latitude,longitude,geom&';
            if (table == "kroger")
                url += 'PropertyName=gid,name,storeno,fullname,street,city,state,zip,geom&';
            if (table == "aldi_2016")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (table == "aldi_2018")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (table == "starbucks")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (table == "raisingcanes")
                url += 'PropertyName=gid,name,alternatetitle,status,operatinghours,summerhours,phone,opening_date,url,distance,address,hours,geom&';
            if (table == "fiveguys")
                url += 'PropertyName=gid,name,address,city,state,zip,beer,breakfast,cokefrees,milkshakes,poutine,delivery,geom&';
            if (table == "culver")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (table == "potbelly")
                url += 'PropertyName=gid,name,address,city,state,postal_code,phone,hours,pickup_menu,delivery_menu,open_hours,delivery_hours,has_breakfast,has_kids,geom&';
            if (table == "dicks")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,hours,latitude,longitude,geom&';
            if (table == "keef")
                url += 'PropertyName=gid,name,address,phone,website,latitude,longitude,geom&';
            if (table == "parkway")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,depdom,asset,dep_change_1,dep_change_1per,dep_change_5,dep_change_5per,ass_change_1,ass_change_1per,ass_change_5,ass_change_5per,geom,sum2017,sum2018&';
            if (table == "tartan")
				url += 'PropertyName=gid,name,address,city,state,zip,url,geom&';
            if (table == "uhaul")
				url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "fortune")
                url += 'PropertyName=gid,rank,name,address,city,state,zip,countyfips,county,website,employees,revenues,profit,geom&';
            if (table == "fairgrounds")
                url += 'PropertyName=gid,name,address,city,state,zip_code,county,geom&';
            if (table == "paca")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "poultryfacilities")
                url += 'PropertyName=gid,id,name,telephone,address,city,state,zip,county,descriptio,geom&';
            if (table == "tapetro")
                url += 'PropertyName=gid,site_id,brand,locationid,state,city,name,directions,address,pobox,zip,phone,latitude,longitude,bays,geom&';
            if (table == "ethanol_plants")
                url += 'PropertyName=gid,name,company,state,geom&';
            if (table == "grainger")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "wholefoods")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (table == "traderjoes")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,latitude,longitude,geom&';
            if (table == "publix")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,fax,latitude,longitude,geom&';
            if (table == "gianteagle")
                url += 'PropertyName=gid,name,brand,address,city,state,zip,geom&';
            if (table == "shoppingcenter")
                url += 'PropertyName=gid,name,address,city,state,zip,latitude,longitude,geom&';
            if (table == "foodplants")
                url += 'PropertyName=gid,id,name,type,latitude,longitude,geom&';
            if (table == "ngpoperators")
                url += 'PropertyName=gid,name,geom&';
            if (table == "hydroponic_growers")
                url += 'PropertyName=gid,id,locations_id,name,loc_type,address,city,state,zip,phone,fax,geom&';
            if (table == "distributor")
                url += 'PropertyName=gid,name,address,latitude,longitude,geom&';
            if (table == "names_natural")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_destinations")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_faith")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_govt_places")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_infrastructure")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_public_spaces")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "manmade_retail_prices")
                url += 'PropertyName=id,name,class,latitude,longitude,geom,county_nam,state_alph,subclass&';
            if (table == "interchanges")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alpha&';
            if (table == "ranchesandfarms")
                url += 'PropertyName=gid,name,class,latitude,longitude,geom,county_nam,state_alph&';
            if (table == "dma")
                url += 'PropertyName=gid,name,distributo,address,city,state,postalcode,latitude,longitude,geom&';
            if (table == "closings")
                url += 'PropertyName=gid,name,address,city,state,date,store,footnote,latitude,longitude,geom&';
            if (table == "schools_ccd_primary")
                url += 'PropertyName=gid,name,latitude,longitude,geom,scsd,ccd&';
            if (table == "schools_pss_private")
                url += 'PropertyName=gid,name,latitude,longitude,geom,scsd,ccd&';
            if (table == "refrigeratedlocations")
                url += 'PropertyName=gid,name,street,city,state,zip,phone,activities,latitude,longitude,geom,&';
            if (table == "toysrus")
                url += 'PropertyName=gid,storenum,chain,name,street,city,state,zip,leasetype,entity,grossarea,sellarea,latitude,longitude,geom,&';
            if (table == "gymboree")
                url += 'PropertyName=gid,id,name,address,postal_code,city,state,country,phone,store_hours,store_hours_1,store_hours_2,store_hours_3,type,geom,brand&';
            if (table == "banks_2012")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (table == "banks_2016")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (table == "banks_2017")
                url += 'PropertyName=gid,name,depsumbr,address,city,state,zip,namefull,geom&';
            if (table == "creditunions")
                url += 'PropertyName=gid,cu_num,join_num,site_id,name,sitename,sitetype,mainoffice,address,city,state,zip,geom&';
            if (table == "edwardjones")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "agencies")
                url += 'PropertyName=gid,name,street,city,state,zip,geom&';
            if (table == "agent_za")
                url += 'PropertyName=gid,name,city,state,zip,geom&';
            if (table == "agent_ca")
                url += 'PropertyName=gid,name,address,city,state,zip,geom&';
            if (table == "cbrands")
                url += 'PropertyName=gid,name,facility,country,area,geom&';
            if (table == "tstops")
                url += 'PropertyName=gid,name,geom&';
            if (table == "dentalfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (table == "mentalfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (table == "primaryfacilities")
                url += 'PropertyName=gid,name,hpsaddr,hpscity,hpsstabbr,hpszipcd,geom&';
            if (table == "asc")
                url += 'PropertyName=gid,facilityid,name,type,subtype,street,city,state,zip,telephone,geom&';
            if (table == "dermasolo")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (table == "dermagroup")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (table == "plasticsurgerygroup")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (table == "plasticsurgerysolo")
                url += 'PropertyName=gid,code,address,city,state,zip,geom,name&';
            if (table == "providers")
                url += 'PropertyName=gid,name,address,city,state,zip,phone,geom&';

            url += 'srsname=EPSG:3857&bbox=' + passedExtent.join(',');
            var tilesLoaded = 0;
            var tilesPending = 0;
            $.ajax({
                url: url,
                dataType: 'json',
                beforeSend: function(e) {
                    $('#js-progress-bar').css({
                        'opacity': '1',
                        'height': '5px',
                        'width': '5%'
                    });
                    ++tilesPending;
                },
                success: function(data) {
                    ++tilesLoaded;
                    var percentage = Math.round(tilesLoaded / tilesPending * 100);
                    $('#js-progress-bar').css({
                        'width': percentage + '%'
                    });
                    var radVal;

                    if (percentage >= 100) {
                        var features = geoJSONFormat.readFeatures(data);
                        source.addFeatures(features);
                        var sourceToAdd;
                        switch (table) {
                            case "albertsons":
                                radVal = $("#intervalAlbertsons").val();
                                sourceToAdd = radiusAlbertsonsSource;
                                radiusAlbertsonsSource.clear();
                                break;
                            case "kroger":
                                radVal = $("#intervalKroger").val();
                                sourceToAdd = radiusKrogerSource;
                                radiusKrogerSource.clear();
                                break;
                            case "closings":
                                radVal = $("#intervalInterchanges").val();
                                sourceToAdd = radiusClosingsSource;
                                radiusClosingsSource.clear();
                                break;
                            case "toysrus":
                                radVal = $("#intervalToysrus").val();
                                sourceToAdd = radiusToysrusSource;
                                radiusToysrusSource.clear();
                                break;
                            case "gymboree":
                                radVal = $("#intervalGymboree").val();
                                sourceToAdd = radiusGymboreeSource;
                                radiusGymboreeSource.clear();
                                break;
                            case "starbucks":
                                radVal = $("#intervalStarbucks").val();
                                sourceToAdd = radiusStarBucksLayer;
                                radiusStarBucksLayer.clear();
                                break;
                            case "raisingcanes":
                                radVal = $("#intervalRaisingCanes").val();
                                sourceToAdd = radiusRaisingCanesSource;
                                radiusRaisingCanesSource.clear();
                                break;
                            case "fiveguys":
                                radVal = $("#intervalFiveGuys").val();
                                sourceToAdd = radiusFiveGuysSource;
                                radiusFiveGuysSource.clear();
                                break;
                            case "culver":
                                radVal = $("#intervalCulver").val();
                                sourceToAdd = radiusCulverSource;
                                radiusCulverSource.clear();
                                break;
                            case "potbelly":
                                radVal = $("#intervalPotbelly").val();
                                sourceToAdd = radiusPotbellySource;
                                radiusPotbellySource.clear();
                                break;
                            case "aldi_2016":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiSixteenSource;
                                radiusAldiSixteenSource.clear();
                                break;
                            case "aldi_2016_closed":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiSixteenClosedSource;
                                radiusAldiSixteenClosedSource.clear();
                                break;
                            case "aldi_2018":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiEighteenSource;
                                radiusAldiEighteenSource.clear();
                                break;
                            case "aldi_2018_new":
                                radVal = $("#intervalAldi").val();
                                sourceToAdd = radiusAldiEighteenNewSource;
                                radiusAldiEighteenNewSource.clear();
                                break;
                            case "dicks":
                                radVal = $("#intervalDicks").val();
                                sourceToAdd = radiusDicksSource;
                                radiusDicksSource.clear();
                                break;
                            case "keef":
                                radVal = $("#intervalKeef").val();
                                sourceToAdd = radiusKeefSource;
                                radiusKeefSource.clear();
                                break;
                            case "parkway":
                                radVal = $("#intervalParkway").val();
                                sourceToAdd = radiusParkwaySource;
                                radiusParkwaySource.clear();
                                break;
                            case "creditunions":
                                radVal = $("#intervalCreditUnions").val();
                                sourceToAdd = radiusCreditUnionsSource;
                                radiusCreditUnionsSource.clear();
                                break;
                            case "edwardjones":
                                radVal = $("#intervalEdwardJones").val();
                                sourceToAdd = radiusEdwardJonesSource;
                                radiusEdwardJonesSource.clear();
                                break;
                            case "agencies":
                                radVal = $("#intervalAgencies").val();
                                sourceToAdd = radiusAgenciesSource;
                                radiusAgenciesSource.clear();
                                break;
                            case "agent_ca":
                                radVal = $("#intervalAgencies").val();
                                sourceToAdd = radiusCASource;
                                radiusCASource.clear();
                                break;
                            case "agent_za":
                                radVal = $("#intervalAgencies").val();
                                sourceToAdd = radiusZASource;
                                radiusZASource.clear();
                                break;
                            case "tapetro":
                                radVal = $("#intervalTAPetro").val();
                                sourceToAdd = radiusTAPetroSource;
                                radiusTAPetroSource.clear();
                                break;
                            case "tartan":
                                radVal = $("#intervalTartan").val();
                                sourceToAdd = radiusTartanSource;
                                radiusTartanSource.clear();
                                break;
                            case "uhaul":
                                radVal = $("#intervalUhaul").val();
                                sourceToAdd = radiusUhaulSource;
                                radiusUhaulSource.clear();
                                break;
                            case "poultryfacilities":
                                radVal = $("#intervalPoultry").val();
                                sourceToAdd = radiusPoultrySource;
                                radiusPoultrySource.clear();
                                break;
                            case "fortune":
                                radVal = $("#intervalFortune").val();
                                sourceToAdd = radiusFortuneSource;
                                radiusFortuneSource.clear();
                                break;
                            case "fairgrounds":
                                radVal = $("#intervalFairgrounds").val();
                                sourceToAdd = radiusFairgroundSource;
                                radiusFairgroundSource.clear();
                                break;
                            case "paca":
                                radVal = $("#intervalPACA").val();
                                sourceToAdd = radiusPACASource;
                                radiusPACASource.clear();
                                break;
                            case "ethanol":
                                radVal = $("#intervalEthanol").val();
                                sourceToAdd = radiusEthanolSource;
                                radiusEthanolSource.clear();
                                break;
                            case "foodplants":
                                radVal = $("#intervalTyson").val();
                                sourceToAdd = radiusFoodplantsSource;
                                radiusFoodplantsSource.clear();
                                break;
                            case "hydroponic_growers":
                                radVal = $("#intervalHydroponics").val();
                                sourceToAdd = radiusHydroponicsSource;
                                radiusHydroponicsSource.clear();
                                break;
                            case "traderjoes":
                                radVal = $("#intervalTraderJoes").val();
                                sourceToAdd = radiusTraderJoesSource;
                                radiusTraderJoesSource.clear();
                                break;
                            case "wholefoods":
                                radVal = $("#intervalWholeFoods").val();
                                sourceToAdd = radiusWholeFoodsSource;
                                radiusWholeFoodsSource.clear();
                                break;
                            case "publix":
                                radVal = $("#intervalPublix").val();
                                sourceToAdd = radiusPublixSource;
                                radiusPublixSource.clear();
                                break;
                            case "gianteagle":
                                radVal = $("#intervalGiantEagle").val();
                                sourceToAdd = radiusGiantEagleSource;
                                radiusGiantEagleSource.clear();
                                break;
                            case "shoppingcenter":
                                radVal = $("#intervalShopping").val();
                                sourceToAdd = radiusShoppingSource;
                                radiusShoppingSource.clear();
                                break;
                            case "stores":
                                radVal = $("#intervalStores").val();
                                sourceToAdd = radiusStoresSource;
                                radiusStoresSource.clear();
                                break;
                            case "dma":
                                radVal = $("#intervalDMA").val();
                                sourceToAdd = radiusDMASource;
                                radiusDMASource.clear();
                                break;
                            case "amazon":
                                radVal = $("#intervalAmazon").val();
                                sourceToAdd = radiusAmazonSource;
                                radiusAmazonSource.clear();
                                break;
                            case "sysco":
                                radVal = $("#intervalSysco").val();
                                sourceToAdd = radiusSyscoSource;
                                radiusSyscoSource.clear();
                                break;
                            case "robinsonfresh":
                                radVal = $("#intervalRobinsonFresh").val();
                                sourceToAdd = radiusRobinsonFreshSource;
                                radiusRobinsonFreshSource.clear();
                                break;
                            case "kehe":
                                radVal = $("#intervalKeHE").val();
                                sourceToAdd = radiusKeHESource;
                                radiusKeHESource.clear();
                                break;
                            case "pfgpfs":
                                radVal = $("#intervalPFGPSF").val();
                                sourceToAdd = radiusPFGPSFSource;
                                radiusPFGPSFSource.clear();
                                break;
                            case "sygma":
                                radVal = $("#intervalSygma").val();
                                sourceToAdd = radiusSygmaSource;
                                radiusSygmaSource.clear();
                                break;
                            case "dmadcs":
                                radVal = $("#intervalDmaDcs").val();
                                sourceToAdd = radiusDmaDcsSource;
                                radiusDmaDcsSource.clear();
                                break;
                            case "vistar":
                                radVal = $("#intervalVistar").val();
                                sourceToAdd = radiusVistarSource;
                                radiusVistarSource.clear();
                                break;
                            case "usfoods":
                                radVal = $("#intervalUsf").val();
                                sourceToAdd = radiusUsfSource;
                                radiusUsfSource.clear();
                                break;
                            case "mclane":
                                radVal = $("#intervalMclane").val();
                                sourceToAdd = radiusMclaneSource;
                                radiusMclaneSource.clear();
                                break;
                            case "brownfields":
                                radVal = $("#intervalBrownfields").val();
                                sourceToAdd = radiusBrownFields;
                                radiusBrownFields.clear();
                                break;
                            case "farmers":
                                radVal = $("#intervalFarmers").val();
                                sourceToAdd = radiusFarmerSource;
                                radiusFarmerSource.clear();
                                break;
                            case "refrigeratedlocations":
                                radVal = $("#intervalRefri").val();
                                sourceToAdd = radiusRefriSource;
                                radiusRefriSource.clear();
                                break;
                            case "airports":
                                radVal = $("#intervalAirport").val();
                                sourceToAdd = radiusAirportSource;
                                radiusAirportSource.clear();
                                break;
                            case "flagpoints":
                                radVal = $("#intervalFreight").val();
                                sourceToAdd = radiusFreightIntSource;
                                radiusFreightIntSource.clear();
                                break;
                            case "interchanges":
                                radVal = $("#intervalCrossing").val();
                                sourceToAdd = radiusInterchangesSource;
                                radiusInterchangesSource.clear();
                                break;
                            case "iana":
                                radVal = $("#intervalIana").val();
                                sourceToAdd = radiusIanaSource;
                                radiusIanaSource.clear();
                                break;
                            case "ports":
                                radVal = $("#intervalPorts").val();
                                sourceToAdd = radiusPortsSource;
                                radiusPortsSource.clear();
                                break;
                            case "transitstations":
                                radVal = $("#intervalTransit").val();
                                sourceToAdd = radiusTransitstopSource;
                                radiusTransitstopSource.clear();
                                break;
                            case "port_facility":
                                radVal = $("#intervalPort").val();
                                sourceToAdd = radiusPortfacilitySource;
                                radiusPortfacilitySource.clear();
                                break;
                            default:
                                break;
                        }
                        if (table == "albertsons" || table == "kroger" || table == "closings" || table == "toysrus" || table == "gymboree" || table == "aldi_2016" || table == "aldi_2016_closed" || table == "aldi_2018"  || table == "aldi_2018_new" || table == "starbucks" || table == "fiveguys" || table == "raisingcanes" || table == "culver" || table == "potbelly" || table == "dicks" || table == "keef" || table == "parkway" || table == "creditunions" || table == "edwardjones" || table == "agencies" || table == "agent_ca" || table == "agent_za" || table == "tartan" || table == "uhaul" || table == "poultryfacilities" || table == "fortune" || table == "fairgrounds" || table == "paca" || table == "tapetro" || table == "ethanol" || table == "foodplants" || table == "hydroponic_growers" || table == "wholefoods" || table == "traderjoes" || table == "publix" || table == "gianteagle" || table == "shoppingcenter" || table == "stores" || table == "dma" || table == "brownfields" || table == "farmers" || table == "usfoods" || table == "sysco" || table == "robinsonfresh" || table == "kehe" || table == "dmadcs" || table == "sygma" || table == "vistar" || table == "pfgpfs" || table == "mclane" || table == "amazon" || table == "refrigeratedlocations" || table == "airports" || table == "flagpoints" || table == "interchanges" || table == "iana" || table == "ports" || table == "transitstations" || table == "port_facility" || table == "dermasolo" || table == "dermagroup" || table == "plasticsurgerysolo" || table == "plasticsurgerygroup")
                            for (i = 0; i <= source.getFeatures().length - 1; i++) {
                                drawCircleInMeter(map, source.getFeatures()[i].getGeometry().getCoordinates(), radVal * 1609.34, 7, sourceToAdd, i);
                            }
                        switch (table) {
                            case "albertsons":
                                radiusAlbertsonsLayer.setSource(radiusAlbertsonsSource);
                                break;
                            case "kroger":
                                radiusKrogerLayer.setSource(radiusKrogerSource);
                                break;
                            case "closings":
                                radiusClosingsLayer.setSource(radiusClosingsSource);
                                break;
                            case "toysrus":
                                radiusToysrusLayer.setSource(radiusToysrusSource);
                                break;
                            case "gymboree":
                                radiusGymboreeLayer.setSource(radiusGymboreeSource);
                                break;
                            case "culver":
                                radiusCulverLayer.setSource(radiusCulverSource);
                                break;
                            case "potbelly":
                                radiusPotbellyLayer.setSource(radiusPotbellySource);
                                break;
                            case "starbucks":
                                radiusStarBucksLayer.setSource(radiusStarBucksSource);
                                break;
                            case "raisingcanes":
                                radiusRaisingCanesLayer.setSource(radiusRaisingCanesSource);
                                break;
                            case "fiveguys":
                                radiusFiveGuysLayer.setSource(radiusFiveGuysSource);
                                break;
                            case "aldi_2016":
                                radiusAldiSixteenLayer.setSource(radiusAldiSixteenSource);
                                break;
                            case "aldi_2016_closed":
                                radiusAldiSixteenClosedLayer.setSource(radiusAldiSixteenClosedSource);
                                break;
                            case "aldi_2018":
                                radiusAldiEighteenLayer.setSource(radiusAldiEighteenSource);
                                break;
                            case "aldi_2018_new":
                                radiusAldiEighteenNewLayer.setSource(radiusAldiEighteenNewSource);
                                break;
                            case "dicks":
                                radiusDicksLayer.setSource(radiusDicksSource);
                                break;
                            case "keef":
                                radiusKeefLayer.setSource(radiusKeefSource);
                                break;
                            case "parkway":
                                radiusParkwayLayer.setSource(radiusParkwaySource);
                                break;
                            case "creditunions":
                                radiusCreditUnionsLayer.setSource(radiusCreditUnionsSource);
                                break;
                            case "edwardjones":
                                radiusEdwardJonesLayer.setSource(radiusEdwardJonesSource);
                                break;
                            case "agencies":
                                radiusAgenciesLayer.setSource(radiusAgenciesSource);
                                break;
                            case "agent_za":
                                radiusZALayer.setSource(radiusZASource);
                                break;
                            case "agent_ca":
                                radiusCALayer.setSource(radiusCASource);
                                break;
                            case "tartan":
                                radiusTartanLayer.setSource(radiusTartanSource);
                                break;
                            case "uhaul":
                                radiusUhaulLayer.setSource(radiusUhaulSource);
                                break;
                            case "poultryfacilities":
                                radiusPoultryLayer.setSource(radiusPoultrySource);
                                break;
                            case "fortune":
                                radiusFortuneLayer.setSource(radiusFortuneSource);
                                break;
                            case "fairgrounds":
                                radiusFairgroundLayer.setSource(radiusFairgroundSource);
                                break;
                            case "paca":
                                radiusPACALayer.setSource(radiusPACASource);
                                break;
                            case "tapetro":
                                radiusTAPetroLayer.setSource(radiusTAPetroSource);
                                break;
                            case "ethanol":
                                radiusEthanolLayer.setSource(radiusEthanolSource);
                                break;
                            case "brownfields":
                                radiusBrownFieldsLayer.setSource(radiusBrownFields);
                                break;
                            case "foodplants":
                                radiusFoodplantsLayer.setSource(radiusFoodplantsSource);
                                break;
                            case "hydroponic_growers":
                                radiusHydroponicsLayer.setSource(radiusHydroponicsSource);
                                break;
                            case "wholefoods":
                                radiusWholeFoodsLayer.setSource(radiusWholeFoodsSource);
                                break;
                            case "traderjoes":
                                radiusTraderJoesLayer.setSource(radiusTraderJoesSource);
                                break;
                            case "publix":
                                radiusPublixLayer.setSource(radiusPublixSource);
                                break;
                            case "gianteagle":
                                radiusGiantEagleLayer.setSource(radiusGiantEagleSource);
                                break;
                            case "shoppingcenter":
                                radiusShoppingLayer.setSource(radiusShoppingSource);
                                break;
                            case "stores":
                                radiusStoresLayer.setSource(radiusStoresSource);
                                break;
                            case "mclane":
                                radiusMclaneLayer.setSource(radiusMclaneSource);
                                break;
                            case "dma":
                                radiusDMALayer.setSource(radiusDMASource);
                                break;
                            case "usfoods":
                                radiusUsfLayer.setSource(radiusUsfSource);
                                break;
                            case "amazon":
                                radiusAmazonLayer.setSource(radiusAmazonSource);
                                break;
                            case "sysco":
                                radiusSyscoLayer.setSource(radiusSyscoSource);
                                break;
                            case "robinsonfresh":
                                radiusRobinsonFreshLayer.setSource(radiusRobinsonFreshSource);
                                break;
                            case "kehe":
                                radiusKeHELayer.setSource(radiusKeHESource);
                                break;
                            case "pfgpfs":
                                radiusPFGPSFLayer.setSource(radiusPFGPSFSource);
                                break;
                            case "sygma":
                                radiusSygmaLayer.setSource(radiusSygmaSource);
                                break;
                            case "dmadcs":
                                radiusDmaDcsLayer.setSource(radiusDmaDcsSource);
                                break;
                            case "vistar":
                                radiusVistarLayer.setSource(radiusVistarSource);
                                break;
                            case "farmers":
                                radiusFarmerLayer.setSource(radiusFarmerSource);
                                break;
                            case "refrigeratedlocations":
                                radiusRefriLayer.setSource(radiusRefriSource);
                                break;
                            case "airports":
                                radiusAirportLayer.setSource(radiusAirportSource);
                                break;
                            case "flagpoints":
                                radiusFreightIntLayer.setSource(radiusFreightIntSource);
                                break;
                            case "interchanges":
                                radiusInterchangesLayer.setSource(radiusInterchangesSource);
                                break;
                            case "iana":
                                radiusIanaLayer.setSource(radiusIanaSource);
                                break;
                            case "ports":
                                radiusPortsLayer.setSource(radiusPortsSource);
                                break;
                            case "transitstations":
                                radiusTransitstopLayer.setSource(radiusTransitstopSource);
                                break;
                            case "port_facility":
                                radiusPortfacilityLayer.setSource(radiusPortfacilitySource);
                                break;
                            default:
                                break;
                        }

                        if (table == "airports")
                            document.getElementById('airportsFCount').innerHTML = source.getFeatures().length;
                        if (table == "farmers")
                            document.getElementById('farmerFCount').innerHTML = source.getFeatures().length;
                        if (table == "stores")
                            document.getElementById('gsFCount').innerHTML = source.getFeatures().length;
                        if (table == "logos")
                            document.getElementById('slFCount').innerHTML = source.getFeatures().length;
                        if (table == "brownfields")
                            document.getElementById('bfFCount').innerHTML = source.getFeatures().length;
                        if (table == "transitstations")
                            document.getElementById('transitFCount').innerHTML = source.getFeatures().length;
                        if (table == "port_facility")
                            document.getElementById('portFCount').innerHTML = source.getFeatures().length;
                        if (table == "gardens")
                            document.getElementById('gardenFCount').innerHTML = source.getFeatures().length;
                        if (table == "iana")
                            document.getElementById('ianaFCount').innerHTML = source.getFeatures().length;
                        if (table == "dhl")
                            document.getElementById('dhlFCount').innerHTML = source.getFeatures().length;
                        if (table == "fedex")
                            document.getElementById('fedexFCount').innerHTML = source.getFeatures().length;
                        if (table == "ups")
                            document.getElementById('upsFCount').innerHTML = source.getFeatures().length;
                        if (table == "mclane")
                            document.getElementById('mclaneFCount').innerHTML = source.getFeatures().length;
                        if (table == "amazon")
                            document.getElementById('amazonFCount').innerHTML = source.getFeatures().length;
                        if (table == "sysco")
                            document.getElementById('syscoFCount').innerHTML = source.getFeatures().length;
                        if (table == "flagpoints")
                            document.getElementById('freightFCount').innerHTML = source.getFeatures().length;
                        if (table == "albertsons")
                            document.getElementById('albertsonsFCount').innerHTML = source.getFeatures().length;
                        if (table == "culver")
                            document.getElementById('culverFCount').innerHTML = source.getFeatures().length;
                        if (table == "dicks")
                            document.getElementById('dicksFCount').innerHTML = source.getFeatures().length;
                        if (table == "publix")
                            document.getElementById('publixFCount').innerHTML = source.getFeatures().length;
                        if (table == "gianteagle")
                            document.getElementById('gianteagleFCount').innerHTML = source.getFeatures().length;
                        if (table == "kroger")
                            document.getElementById('krogerFCount').innerHTML = source.getFeatures().length;
                        if (table == "shoppingcenter")
                            document.getElementById('shoppingFCount').innerHTML = source.getFeatures().length;
                        if (table == "foodplants")
                            document.getElementById('tysonFCount').innerHTML = source.getFeatures().length;
                        if (table == "ranchesandfarms")
                            document.getElementById('ranchesFCount').innerHTML = source.getFeatures().length;
                        if (table == "names_natural")
                            document.getElementById('naturalFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_destinations")
                            document.getElementById('mmdFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_faith")
                            document.getElementById('mmfFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_govt_places")
                            document.getElementById('mmgFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_infrastructure")
                            document.getElementById('mmiFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_public_spaces")
                            document.getElementById('mmpFCount').innerHTML = source.getFeatures().length;
                        if (table == "manmade_retail_prices")
                            document.getElementById('mmrFCount').innerHTML = source.getFeatures().length;
                        if (table == "interchanges")
                            document.getElementById('crossingFCount').innerHTML = source.getFeatures().length;
                        if (table == "dma")
                            document.getElementById('dmaFCount').innerHTML = source.getFeatures().length;
                        if (table == "banks_2012")
                            document.getElementById('banks12Count').innerHTML = source.getFeatures().length;
                        if (table == "banks_2016")
                            document.getElementById('banks16Count').innerHTML = source.getFeatures().length;
                        if (table == "banks_2017")
                            document.getElementById('banks17Count').innerHTML = source.getFeatures().length;
                        if (table == "traderjoes")
                            document.getElementById('traderjoesFCount').innerHTML = source.getFeatures().length;
                        if (table == "wholefoods")
                            document.getElementById('wholefoodsFCount').innerHTML = source.getFeatures().length;

                        setTimeout(function() {
                            $('#js-progress-bar').css({
                                'width': '0',
                                'opacity': '0'
                            });
                            tilesLoaded = 0;
                            tilesPending = 0;
                        }, 600);
                    }
                }
            });
        },
        strategy: ol.loadingstrategy.all
    });
    var clusterSource = new ol.source.Cluster({
        distance: 20,
        source: source
    });

    lyr.setSource(clusterSource);
}

function updateVoronoiStyle(val){
	try{
		var pointFeatures = voronoiPoints.getSource().getFeatures();
		var polygonFeatures = voronoiPolygons.getSource().getFeatures();
		var firstLayer = pointFeatures[0].S.features[0].c.substr(0, pointFeatures[0].S.features[0].c.indexOf('.'));
		for(i=0; i < pointFeatures.length; i++)
		{
			try
			{
				if(!val){
					if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) == firstLayer)
					{
						var voronoiPin = new Image();
						voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
						'<path fill="' + $("#voronoiPin").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
						'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
						pointFeatures[i].setStyle(new ol.style.Style({
							image: new ol.style.Icon({
								img: voronoiPin,
								imgSize:[$("#strokePin").val() , $("#strokePin").val()]
							})
						}));
					}
					else{
						var voronoiPin = new Image();
						voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
						'<path fill="' + $("#voronoiPinTwo").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
						'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
						pointFeatures[i].setStyle(new ol.style.Style({
							image: new ol.style.Icon({
								img: voronoiPin,
								imgSize:[$("#strokePin").val() , $("#strokePin").val()]
							})
						}));			
					}
				}
				else{
					if(voronoiLayersCount == 1){
						if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) == firstLayer)
						{
							var voronoiPin = new Image();
							voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
							'<path fill="' + $("#voronoiPinTwo").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
							'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
							pointFeatures[i].setStyle(new ol.style.Style({
								image: new ol.style.Icon({
									img: voronoiPin,
									imgSize:[$("#strokePin").val() , $("#strokePin").val()]
								})
							}));
						}
						else{
							var voronoiPin = new Image();
							voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
							'<path fill="' + $("#voronoiPin").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
							'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
							pointFeatures[i].setStyle(new ol.style.Style({
								image: new ol.style.Icon({
									img: voronoiPin,
									imgSize:[$("#strokePin").val() , $("#strokePin").val()]
								})
							}));			
						}
					}
					else
					{
						if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) == firstLayer)
						{
							var voronoiPin = new Image();
							voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
							'<path fill="' + $("#voronoiPin").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
							'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
							pointFeatures[i].setStyle(new ol.style.Style({
								image: new ol.style.Icon({
									img: voronoiPin,
									imgSize:[$("#strokePin").val() , $("#strokePin").val()]
								})
							}));
						}
						else{
							var voronoiPin = new Image();
							voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
							'<path fill="' + $("#voronoiPinTwo").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
							'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
							pointFeatures[i].setStyle(new ol.style.Style({
								image: new ol.style.Icon({
									img: voronoiPin,
									imgSize:[$("#strokePin").val() , $("#strokePin").val()]
								})
							}));			
						}
					}
				}
				for(j=0; j < polygonFeatures.length; j++)
				{
					var coords = pointFeatures[i].getGeometry().getCoordinates();
					var polygonGeometry = polygonFeatures[j].getGeometry();
					if(polygonGeometry.intersectsCoordinate(coords))
					{
						if(!val){
							if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) != firstLayer)
							{
								polygonFeatures[j].setStyle(new ol.style.Style({
									fill: new ol.style.Fill({
										color: $("#voronoiPolygonTwo").val()
									}),
									stroke: new ol.style.Stroke({
										color: '#FFFFFF',
										width: $("#strokeVoronoi").val()
									})
								}));
							}
							else
							{
								polygonFeatures[j].setStyle(new ol.style.Style({
									fill: new ol.style.Fill({
										color: $("#voronoiPolygon").val()
									}),
									stroke: new ol.style.Stroke({
										color: '#FFFFFF',
										width: $("#strokeVoronoi").val()
									})
								}));
							}
						}
						else{
							if(voronoiLayersCount == 1){
								if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) == firstLayer)
								{
									polygonFeatures[j].setStyle(new ol.style.Style({
										fill: new ol.style.Fill({
											color: $("#voronoiPolygon").val()
										}),
										stroke: new ol.style.Stroke({
											color: '#FFFFFF',
											width: $("#strokeVoronoi").val()
										})
									}));
								}
								else
								{
									polygonFeatures[j].setStyle(new ol.style.Style({
										fill: new ol.style.Fill({
											color: $("#voronoiPolygonTwo").val()
										}),
										stroke: new ol.style.Stroke({
											color: '#FFFFFF',
											width: $("#strokeVoronoi").val()
										})
									}));
								}
							}
							else
							{
								if(pointFeatures[i].S.features[0].c.substr(0, pointFeatures[i].S.features[0].c.indexOf('.')) == firstLayer)
								{
									polygonFeatures[j].setStyle(new ol.style.Style({
										fill: new ol.style.Fill({
											color: $("#voronoiPolygonTwo").val()
										}),
										stroke: new ol.style.Stroke({
											color: '#FFFFFF',
											width: $("#strokeVoronoi").val()
										})
									}));
								}
								else
								{
									polygonFeatures[j].setStyle(new ol.style.Style({
										fill: new ol.style.Fill({
											color: $("#voronoiPolygon").val()
										}),
										stroke: new ol.style.Stroke({
											color: '#FFFFFF',
											width: $("#strokeVoronoi").val()
										})
									}));
								}
							}
						}
					}
				}
			}catch(e){
				var voronoiPin = new Image();
				voronoiPin.src = 'data:image/svg+xml,' + escape('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="' + $("#strokePin").val() + '" height="' + $("#strokePin").val() + '" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
				'<path fill="' + $("#voronoiPin").val() + '" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
				'<circle fill="' + $("#voronoiPinCircle").val() + '" cx="15" cy="10.677" r="3.291"/></svg>');
				pointFeatures[i].setStyle(new ol.style.Style({
					image: new ol.style.Icon({
						img: voronoiPin,
						imgSize:[$("#strokePin").val() , $("#strokePin").val()]
					})
				}));
			}
		}
	}catch(e){}
}

function updateStroke() {
	// try{updateVoronoiStyle();}catch(e){}
	
    wmsRegion.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:region</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderReg").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeRegion").val() + '</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#FAAF18</CssParameter><CssParameter name="stroke-width">' + $("#strokeHighway").val() + '</CssParameter></Stroke><PerpendicularOffset>4</PerpendicularOffset></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsStates.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:states</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderState").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeState").val() + '</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsDistricts.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:districts</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderPD").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokePDistrict").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 15</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderPD").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokePDistrict").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsCounties.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:counties</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderCounties").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsCities.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:cities</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderCity").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderCounties").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsZips.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:zip</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderZip").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeZip").val() + '</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsMPO.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ntm_mpo</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderMPO").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeMPO").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsMsas.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:msas</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderMSA").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeMsa").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    wmsNeighbors.getSource().updateParams({
		'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:counties</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderNeig").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeNeighbor").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
    txtSearchLayerRegion.setStyle(getBoundaryAndLabelStyle);

    highwayWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0"  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"  xmlns="http://www.opengis.net/sld"  xmlns:ogc="http://www.opengis.net/ogc"  xmlns:xlink="http://www.w3.org/1999/xlink"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:highways</Name><UserStyle><Title>Default Line</Title><FeatureTypeStyle><Rule><Title>Blue Line</Title><LineSymbolizer><Stroke><CssParameter name="stroke">#AA3333</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeHighway").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle>  </NamedLayer></StyledLayerDescriptor>'
    });
    transNetWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:transitnetwork</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#FF4CA6</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeTransit").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
	
    metrobackboneWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:metrobackbone</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#FF0000</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeDataFiber").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
    metrolateralWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:metrolateral</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#FFFF00</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeDataFiber").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
    longhaulnetworkWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:longhaulnetwork</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#008080</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeDataFiber").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
    canadalonghaulnetworkWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:canadalonghaulnetwork</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#FFA500</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeDataFiber").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
    ownedlonghaulnetworkWMS.getSource().updateParams({
        'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ownedlonghaulnetwork</Name><UserStyle><FeatureTypeStyle><Rule><LineSymbolizer><Stroke><CssParameter name="stroke"><ogc:Literal>#0000FF</ogc:Literal></CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeDataFiber").val() + '</ogc:Literal></CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    });
	
	wmsAG.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ag_districts_merged</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderAG").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeagdistrict").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	
	wmsASB.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ntm_asb</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderASB").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeasb").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	
	wmsBEA10.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:bea10</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderBEA").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokebea10").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsCBSA10.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:cbsa10</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderCBSA").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#strokecbsa10").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});	
	wmsERS10.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ers10</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderERS").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#strokeers10").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});	
	wmsERS10Rep.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:ers10rep</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderERSRep").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#strokeers10rep").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});	
	wmsPEA10.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:pea10</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderPEA").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#strokepea10").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});	
	wmsTP10.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tp10</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderTP10").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#stroketp10").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});	
	wmsTP10Metro.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tp10metro</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderTP10Metro").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#stroketp10metro").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsTP10Micro.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tp10micro</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderTP10Micro").val() +'</CssParameter><CssParameter  name="stroke-width"><ogc:Literal>' + $("#stroketp10micro").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	opportunityzones.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:opportunityzones</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Fill><CssParameter name="fill">#00FF00</CssParameter><CssParameter name="fill-opacity">0.3</CssParameter></Fill><Stroke><CssParameter name="stroke">'+ $("#borderOZ").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeOpporZones").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsCMB.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0"  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"  xmlns="http://www.opengis.net/sld"  xmlns:ogc="http://www.opengis.net/ogc"  xmlns:xlink="http://www.w3.org/1999/xlink"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:consumermarketboundaries</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderCMB").val() +'</CssParameter><CssParameter name="stroke-width">' + $("#strokeConsumermarketboundaries").val() + '</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsHrr.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:hrr</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderHRR").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeHrr").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsHsa.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:hsa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderHSA").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokeHsa").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});
	wmsPcsa.getSource().updateParams({
		'SLD_Body' : '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:pcsa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">'+ $("#borderPCSA").val() +'</CssParameter><CssParameter name="stroke-width"><ogc:Literal>' + $("#strokePcsa").val() + '</ogc:Literal></CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
	});

    var lenTpt = 0;
    try {
        lenTpt = $("#tptData").val().length;
    } catch (ex) {}
    if (lenTpt > 0) {
        for (i = 0; i < lenTpt; i++) {
            switch ($("#tptData").val()[i]) {
				case 'freight':
					filterCompanies();
					break;
			}
		}
	}
		
    var len = 0;
    try {
        len = $("#zoningCitiesData").val().length;
    } catch (ex) {}
    if (len > 0) {
        for (i = 0; i < len; i++) {
            switch ($("#zoningCitiesData").val()[i]) {
				case 'Albuquerque_NM':
					Albuquerque_NM.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:albuquerque_nm</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Alexandria_VA':
					Alexandria_VA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:alexandria_va</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Amarillo_TX':
					Amarillo_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:amarillo_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Anaheim_CA':
					Anaheim_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:anaheim_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Arlington_TX':
					Arlington_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:arlington_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Atlanta_GA':
					Atlanta_GA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:atlanta_ga</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Aurora_CO':
					Aurora_CO.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:aurora_co</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Austin_TX':
					Austin_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:austin_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Bakersfield_CA':
					Bakersfield_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:bakersfield_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Baltimore_MD':
					Baltimore_MD.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:baltimore_md</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'BatonRouge_LA':
					BatonRouge_LA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:batonRouge_la</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Boston_MA':
					Boston_MA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:boston_ma</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Brownsville_TX':
					Brownsville_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:brownsville_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Cambridge_MA':
					Cambridge_MA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:cambridge_ma</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Charlotte_NC':
					Charlotte_NC.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:charlotte_nc</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Chattanooga_TN':
					Chattanooga_TN.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:chattanooga_tn</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Chesapeake_VA':
					Chesapeake_VA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:chesapeake_va</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Chicago_IL':
					Chicago_IL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:chicago_il</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Cincinnati_OH':
					Cincinnati_OH.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:cincinnati_oh</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Cleveland_OH':
					Cleveland_OH.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:cleveland_oh</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Columbus_OH':
					Columbus_OH.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:columbus_oh</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Dallas_TX':
					Dallas_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:dallas_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Dayton_OH':
					Dayton_OH.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:dayton_oh</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Denver_CO':
					Denver_CO.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:denver_co</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'DesMoines_IA':
					DesMoines_IA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:desMoines_ia</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Detroit_MI':
					Detroit_MI.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:detroit_mi</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Durham_NC':
					Durham_NC.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:durham_nc</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'ElPaso_TX':
					ElPaso_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:elPaso_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Fargo_ND':
					Fargo_ND.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:fargo_nd</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Flint_MI':
					Flint_MI.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:flint_mi</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'FortWayne_IN':
					FortWayne_IN.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:fortWayne_in</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Fremont_CA':
					Fremont_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:fremont_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Glendale_AZ':
					Glendale_AZ.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:glendale_az</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Glendale_CA':
					Glendale_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:glendale_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Hartford_CT':
					Hartford_CT.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:hartford_ct</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Henderson_NV':
					Henderson_NV.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:henderson_nv</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Hialeah_FL':
					Hialeah_FL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:hialeah_fl</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'HuntingtonBeach_CA':
					HuntingtonBeach_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:huntingtonBeach_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Huntsville_AL':
					Huntsville_AL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:huntsville_al</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Indianapolis_IN':
					Indianapolis_IN.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:indianapolis_in</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Irvine_CA':
					Irvine_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:irvine_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'KansasCity_MO':
					KansasCity_MO.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:kansasCity_mo</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Kent_WA':
					Kent_WA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:kent_wa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Laredo_TX':
					Laredo_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:laredo_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'LasCruces_NM':
					LasCruces_NM.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:lasCruces_nm</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'LasVegas_NV':
					LasVegas_NV.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:lasVegas_nv</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Lexington_KY':
					Lexington_KY.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:lexington_ky</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Lincoln_NE':
					Lincoln_NE.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:lincoln_ne</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'LongBeach_CA':
					LongBeach_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:longBeach_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'LosAngeles_CA':
					LosAngeles_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:losAngeles_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Lowell_MA':
					Lowell_MA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:lowell_ma</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Madison_WI':
					Madison_WI.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:madison_wi</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Memphis_TN':
					Memphis_TN.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:memphis_tn</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Milwaukee_WI':
					Milwaukee_WI.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:milwaukee_wi</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Minneapolis_MN':
					Minneapolis_MN.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:minneapolis_mn</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'NewOrleans_LA':
					NewOrleans_LA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:newOrleans_la</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'NewYorkCity_NY':
					NewYorkCity_NY.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:newYorkCity_ny</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Newark_NJ':
					Newark_NJ.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:newark_nj</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'NewportBeach_CA':
					NewportBeach_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:newportBeach_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Norfolk_VA':
					Norfolk_VA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:norfolk_va</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'NorthLasVegas_NV':
					NorthLasVegas_NV.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:northLasVegas_nv</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Oakland_CA':
					Oakland_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:oakland_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Omaha_NE':
					Omaha_NE.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:omaha_ne</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Orlando_FL':
					Orlando_FL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:orlando_fl</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Philadelphia_PA':
					Philadelphia_PA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:philadelphia_pa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Phoenix_AZ':
					Phoenix_AZ.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:phoenix_az</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Pittsburgh_PA':
					Pittsburgh_PA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:pittsburgh_pa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Plano_TX':
					Plano_TX.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:plano_tx</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Portland_ME':
					Portland_ME.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:portland_ME</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Portland_OR':
					Portland_OR.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:portland_OR</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Providence_RI':
					Providence_RI.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:providence_ri</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Raleigh_NC':
					Raleigh_NC.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:raleigh_nc</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Richmond_VA':
					Richmond_VA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:richmond_va</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Rochester_NY':
					Rochester_NY.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:rochester_ny</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Sacramento_CA':
					Sacramento_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:sacramento_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SaltLakeCity_UT':
					SaltLakeCity_UT.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:saltLakeCity_ut</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SanDiego_CA':
					SanDiego_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:sanDiego_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SanFrancisco_CA':
					SanFrancisco_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:sanFrancisco_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SanJose_CA':
					SanJose_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:sanJose_ca/Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SantaRosa_CA':
					SantaRosa_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:santaRosa_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Seattle_WA':
					Seattle_WA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:seattle_wa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SimiValley_CA':
					SimiValley_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:simiValley_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Somerville_MA':
					Somerville_MA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:somerville_ma</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'SouthBurlington_VT':
					SouthBurlington_VT.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:southBurlington_vt</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'StLouis_MO':
					StLouis_MO.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:stLouis_mo</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Stockton_CA':
					Stockton_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:stockton_ca/Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Tacoma_WA':
					Tacoma_WA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tacoma_wa</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Tallahassee_FL':
					Tallahassee_FL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tallahassee_fl/Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Tampa_FL':
					Tampa_FL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tampa_fl</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Toledo_OH':
					Toledo_OH.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:toledo_oh</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Tucson_AZ':
					Tucson_AZ.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tucson_az</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Tulsa_OK':
					Tulsa_OK.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:tulsa_ok</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'VirginiaBeach_VA':
					VirginiaBeach_VA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:virginiaBeach_va</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Washington_DC':
					Washington_DC.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:washington_dc</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Wichita_KS':
					Wichita_KS.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:wichita_ks</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'WinstonSalem_NC':
					WinstonSalem_NC.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:winstonSalem_nc</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
				case 'Worcester_MA':
					Worcester_MA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:worcester_ma</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">1 10</CssParameter></Stroke></PolygonSymbolizer><LineSymbolizer><Stroke><CssParameter name="stroke">#F36E21</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCity").val() + '</CssParameter><CssParameter name="stroke-dasharray">3 3</CssParameter><CssParameter name="stroke-dashoffset">8</CssParameter></Stroke></LineSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
					break;
			}
		}
	}
					
    var len = 0;
    try {
        len = $("#zoningCountiesData").val().length;
    } catch (ex) {}
    if (len > 0) {
        for (i = 0; i < len; i++) {
            switch ($("#zoningCountiesData").val()[i]) {
                case 'SantaBarbara_County_CA':
					SantaBarbara_County_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:santabarbara_county_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'Riverside_County_CA':
					Riverside_County_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:riverside_county_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'MiamiDade_County_FL':
					MiamiDade_County_FL.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:miamidade_county_fl</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'Howard_County_MD':
					Howard_County_MD.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:howard_county_md</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'Fresno_County_CA':
					Fresno_County_CA.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:fresno_county_ca</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'Clark_County_NV':
					Clark_County_NV.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:clark_county_nv</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                case 'Baltimore_County_MD':
					Baltimore_County_MD.getSource().updateParams({
						'SLD_Body': '<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><Name>Farmer:baltimore_county_md</Name><UserStyle><FeatureTypeStyle><Rule><PolygonSymbolizer><Stroke><CssParameter name="stroke">#A46D05</CssParameter><CssParameter name="stroke-width">' + $("#strokeZoningCounty").val() + '</CssParameter><CssParameter name="stroke-dasharray">5 2</CssParameter></Stroke></PolygonSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
					});
                    break;
                default:
                    break;
            }
        }
    }
	
    map.render();
}

function updateRadius() {
    updateRadiusLayers("stores");
    updateRadiusLayers("albertsons");
    updateRadiusLayers("kroger");
    updateRadiusLayers("starbucks");
    updateRadiusLayers("fiveguys");
    updateRadiusLayers("raisingcanes");
    updateRadiusLayers("culver");
    updateRadiusLayers("potbelly");
    updateRadiusLayers("aldi_2016");
    updateRadiusLayers("aldi_2016_closed");
    updateRadiusLayers("aldi_2018");
    updateRadiusLayers("aldi_2018_new");
    updateRadiusLayers("thornton");
    updateRadiusLayers("dicks");
    updateRadiusLayers("keef");
    updateRadiusLayers("parkway");
    updateRadiusLayers("creditunions");
    updateRadiusLayers("edwardjones");
    updateRadiusLayers("agencies");
    updateRadiusLayers("agent_ca");
    updateRadiusLayers("agent_za");
    updateRadiusLayers("tartan");
    updateRadiusLayers("uhaul");
    updateRadiusLayers("paca");
    updateRadiusLayers("fortune");
    updateRadiusLayers("fairgrounds");
    updateRadiusLayers("poultryfacilities");
    updateRadiusLayers("tapetro");
    updateRadiusLayers("ethanol_plants");
    updateRadiusLayers("grainger");
    updateRadiusLayers("publix");
    updateRadiusLayers("gianteagle");
    updateRadiusLayers("traderjoes");
    updateRadiusLayers("wholefoods");
    updateRadiusLayers("shoppingcenter");
    updateRadiusLayers("foodplants");
    // updateRadiusLayers("ngpoperators");
    updateRadiusLayers("hydroponic_growers");
    updateRadiusLayers("closings");
    updateRadiusLayers("toysrus");
    updateRadiusLayers("gymboree");
    updateRadiusLayers("amazon");
    updateRadiusLayers("dma");
    updateRadiusLayers("sysco");
    updateRadiusLayers("robinsonfresh");
    updateRadiusLayers("kehe");
    updateRadiusLayers("pfgpfs");
    updateRadiusLayers("sygma");
    updateRadiusLayers("dmadcs");
    updateRadiusLayers("vistar");
    updateRadiusLayers("usf");
    updateRadiusLayers("mclane");
    updateRadiusLayers("brownfields");
    updateRadiusLayers("farmers");
    updateRadiusLayers("homemade_shelters");
    updateRadiusLayers("unitsa");
    updateRadiusLayers("unitsb");
    updateRadiusLayers("refrigeratedlocations");
    updateRadiusLayers("airports");
    updateRadiusLayers("flagpoints");
    updateRadiusLayers("interchanges");
    updateRadiusLayers("iana");
    updateRadiusLayers("ports");
    updateRadiusLayers("transitstations");
    updateRadiusLayers("port_facility");
	updateRadiusLayers("hot_springs");
	updateRadiusLayers("landbanks");
	updateRadiusLayers("asc");
	updateRadiusLayers("dermasolo");
	updateRadiusLayers("dermagroup");
	updateRadiusLayers("plasticsurgerysolo");
	updateRadiusLayers("plasticsurgerygroup");
	updateRadiusLayers("providers");
	updateRadiusLayers("dentalfacilities");
	updateRadiusLayers("mentalfacilities");
	updateRadiusLayers("primaryfacilities");
	updateRadiusLayers("traderjoes");
	updateRadiusLayers("wholefoods");
	updateRadiusLayers("oil_refineries");
	updateRadiusLayers("biodiesel_plants");
}

function updateCluster(){
	airport.getSource().setDistance($("#clusterIntAirport").val());
	farmer.getSource().setDistance($("#clusterIntFarmers").val());
	stores.getSource().setDistance($("#clusterIntStores").val());
	logo.getSource().setDistance($("#clusterIntLogo").val());
	interchange.getSource().setDistance($("#clusterIntInterchanges").val());
	transStop.getSource().setDistance($("#clusterIntTransit").val());
	portFacility.getSource().setDistance($("#clusterIntPort").val());
	garden.getSource().setDistance($("#clusterIntGarden").val());
	shelter.getSource().setDistance($("#clusterIntShelter").val());
	unitsa.getSource().setDistance($("#clusterIntUnitsA").val());
	unitsb.getSource().setDistance($("#clusterIntUnitsB").val());
	hot_springs.getSource().setDistance($("#clusterIntHotSprings").val());
	landbanks.getSource().setDistance($("#clusterIntLandBanks").val());
	iana.getSource().setDistance($("#clusterIntIana").val());
	traffic.getSource().setDistance($("#clusterIntTraffic").val());
	ports.getSource().setDistance($("#clusterIntPorts").val());
	dhl.getSource().setDistance($("#clusterIntDHL").val());
	fedex.getSource().setDistance($("#clusterIntFedex").val());
	ups.getSource().setDistance($("#clusterIntUPS").val());
	amazon.getSource().setDistance($("#clusterIntAmazon").val());
	mclane.getSource().setDistance($("#clusterIntMclane").val());
	sysco.getSource().setDistance($("#clusterIntSysco").val());
	robinsonfresh.getSource().setDistance($("#clusterIntRobinsonFresh").val());
	kehe.getSource().setDistance($("#clusterIntKeHE").val());
	dmadcs.getSource().setDistance($("#clusterIntDmaDcs").val());
	sygma.getSource().setDistance($("#clusterIntSygma").val());
	vistar.getSource().setDistance($("#clusterIntVistar").val());
	pfgpfs.getSource().setDistance($("#clusterIntPFGPSF").val());
	usf.getSource().setDistance($("#clusterIntUsf").val());
	natural.getSource().setDistance($("#clusterIntNatural").val());
	manmade.getSource().setDistance($("#clusterIntManmade").val());
	manmade_destinations.getSource().setDistance($("#clusterIntManmade").val());
	manmade_faith.getSource().setDistance($("#clusterIntManmade").val());
	manmade_govt_places.getSource().setDistance($("#clusterIntManmade").val());
	manmade_infrastructure.getSource().setDistance($("#clusterIntManmade").val());
	manmade_public_spaces.getSource().setDistance($("#clusterIntManmade").val());
	manmade_retail_prices.getSource().setDistance($("#clusterIntManmade").val());
	freightIntersects.getSource().setDistance($("#clusterIntFreight").val());
	primary.getSource().setDistance($("#clusterIntPrimary").val());
	pssprivate.getSource().setDistance($("#clusterIntPss").val());
	banks_2012.getSource().setDistance($("#clusterIntBank").val());
	banks_2016.getSource().setDistance($("#clusterIntBank").val());
	banks_2017.getSource().setDistance($("#clusterIntBank").val());
	creditunions.getSource().setDistance($("#clusterIntCreditUnions").val());
	edwardjones.getSource().setDistance($("#clusterIntEdwardJones").val());
	agencies.getSource().setDistance($("#clusterIntAgencies").val());
	agent_za.getSource().setDistance($("#clusterIntZA").val());
	agent_ca.getSource().setDistance($("#clusterIntCA").val());
	albertsons.getSource().setDistance($("#clusterIntAlbertsons").val());
	kroger.getSource().setDistance($("#clusterIntKroger").val());
	starbucks.getSource().setDistance($("#clusterIntStarbucks").val());
	raisingcanes.getSource().setDistance($("#clusterIntRaisingCanes").val());
	fiveguys.getSource().setDistance($("#clusterIntFiveGuys").val());
	potbelly.getSource().setDistance($("#clusterIntPotbelly").val());
	culver.getSource().setDistance($("#clusterIntCulver").val());
	aldiSixteen.getSource().setDistance($("#clusterIntAldi").val());
	aldiSixteenClosed.getSource().setDistance($("#clusterIntAldi").val());
	aldiEighteen.getSource().setDistance($("#clusterIntAldi").val());
	aldiEighteenNew.getSource().setDistance($("#clusterIntAldi").val());
	thornton.getSource().setDistance($("#clusterIntThornton").val());
	dicks.getSource().setDistance($("#clusterIntDicks").val());
	keef.getSource().setDistance($("#clusterIntKeef").val());
	parkway.getSource().setDistance($("#clusterIntParkway").val());
	tartan.getSource().setDistance($("#clusterIntTartan").val());
	uhaul.getSource().setDistance($("#clusterIntUhaul").val());
	poultryfacilities.getSource().setDistance($("#clusterIntPoultry").val());
	paca.getSource().setDistance($("#clusterIntPACA").val());
	fortune.getSource().setDistance($("#clusterIntFortune").val());
	fairgrounds.getSource().setDistance($("#clusterIntFairgrounds").val());
	tapetro.getSource().setDistance($("#clusterIntTAPetro").val());
	ethanol.getSource().setDistance($("#clusterIntEthanol").val());
	brownfields.getSource().setDistance($("#clusterIntBrownfields").val());
	publix.getSource().setDistance($("#clusterIntPublix").val());
	gianteagle.getSource().setDistance($("#clusterIntGiantEagle").val());
	shoppingcenter.getSource().setDistance($("#clusterIntShopping").val());
	foodplants.getSource().setDistance($("#clusterIntTyson").val());
	ngpoperators.getSource().setDistance($("#clusterIntTyson").val());
	hydroponics.getSource().setDistance($("#clusterIntHydroponics").val());
	closings.getSource().setDistance($("#clusterIntSears").val());
	toysrus.getSource().setDistance($("#clusterIntToys").val());
	gymboree.getSource().setDistance($("#clusterIntGymboree").val());
	distributor.getSource().setDistance($("#clusterIntDistributor").val());
	ranchesandfarms.getSource().setDistance($("#clusterIntRanches").val());
	dma.getSource().setDistance($("#clusterIntDMA").val());
	refrigeratedlocations.getSource().setDistance($("#clusterIntRefri").val());
	traderjoes.getSource().setDistance($("#clusterIntTraderJoes").val());
	wholefoods.getSource().setDistance($("#clusterIntWholeFoods").val());
    // toastr.clear();
    // toastr.success("Cluster distances updated for layers successfully.");
}

function updateStyle(){
	enterprisebuildings.setStyle(getStyleMulti);
	networkbuildings.setStyle(getStyleMulti);
	farmer.setStyle(getStyleMulti);
	stores.setStyle(getStyleMulti);
	logo.setStyle(getStyleMulti);
	interchange.setStyle(getStyleMulti);
	transStop.setStyle(getStyleMulti);
	portFacility.setStyle(getStyleMulti);
	garden.setStyle(getStyleMulti);
	shelter.setStyle(getStyleMulti);
	unitsa.setStyle(getStyleMulti);
	unitsb.setStyle(getStyleMulti);
	potbellytwo.setStyle(getStyleMulti);
	hot_springs.setStyle(getStyleMulti);
	landbanks.setStyle(getStyleMulti);
	iana.setStyle(getStyleMulti);
	ports.setStyle(getStyleMulti);
	dhl.setStyle(getStyleMulti);
	fedex.setStyle(getStyleMulti);
	ups.setStyle(getStyleMulti);
	amazon.setStyle(getStyleMulti);
	mclane.setStyle(getStyleMulti);
	sysco.setStyle(getStyleMulti);
	robinsonfresh.setStyle(getStyleMulti);
	kehe.setStyle(getStyleMulti);
	vistar.setStyle(getStyleMulti);
	sygma.setStyle(getStyleMulti);
	dmadcs.setStyle(getStyleMulti);
	pfgpfs.setStyle(getStyleMulti);
	usf.setStyle(getStyleMulti);
	natural.setStyle(getStyleMulti);
	manmade.setStyle(getStyleMulti);
	manmade_destinations.setStyle(getStyleMulti);
	manmade_faith.setStyle(getStyleMulti);
	manmade_govt_places.setStyle(getStyleMulti);
	manmade_infrastructure.setStyle(getStyleMulti);
	manmade_public_spaces.setStyle(getStyleMulti);
	manmade_retail_prices.setStyle(getStyleMulti);
	freightIntersects.setStyle(getStyleMulti);
	primary.setStyle(getStyleMulti);
	pssprivate.setStyle(getStyleMulti);
	banks_2012.setStyle(getStyleMulti);
	banks_2016.setStyle(getStyleMulti);
	banks_2017.setStyle(getStyleMulti);
	edwardjones.setStyle(getStyleMulti);
	creditunions.setStyle(getStyleMulti);
	agencies.setStyle(getStyleMulti);
	agent_ca.setStyle(getStyleMulti);
	agent_za.setStyle(getStyleMulti);
	albertsons.setStyle(getStyleMulti);
	kroger.setStyle(getStyleMulti);
	culver.setStyle(getStyleMulti);
	potbelly.setStyle(getStyleMulti);
	starbucks.setStyle(getStyleMulti);
	fiveguys.setStyle(getStyleMulti);
	raisingcanes.setStyle(getStyleMulti);
	aldiSixteen.setStyle(getStyleMulti);
	aldiSixteenClosed.setStyle(getStyleMulti);
	aldiEighteen.setStyle(getStyleMulti);
	aldiEighteenNew.setStyle(getStyleMulti);
	thornton.setStyle(getStyleMulti);
	parkway.setStyle(getStyleMulti);
	tartan.setStyle(getStyleMulti);
	uhaul.setStyle(getStyleMulti);
	fortune.setStyle(getStyleMulti);
	fairgrounds.setStyle(getStyleMulti);
	paca.setStyle(getStyleMulti);
	poultryfacilities.setStyle(getStyleMulti);
	dicks.setStyle(getStyleMulti);
	keef.setStyle(getStyleMulti);
	ethanol.setStyle(getStyleMulti);
	tapetro.setStyle(getStyleMulti);
	biodieselplants.setStyle(getStyleMulti);
	oilrefineries.setStyle(getStyleMulti);
	grainger.setStyle(getStyleMulti);
	brownfields.setStyle(getStyleMulti);
	publix.setStyle(getStyleMulti);
	gianteagle.setStyle(getStyleMulti);
	traderjoes.setStyle(getStyleMulti);
	wholefoods.setStyle(getStyleMulti);
	shoppingcenter.setStyle(getStyleMulti);
	foodplants.setStyle(getStyleMulti);
	hydroponics.setStyle(getStyleMulti);
	ngpoperators.setStyle(getStyleMulti);
	closings.setStyle(getStyleMulti);
	toysrus.setStyle(getStyleMulti);
	gymboree.setStyle(getStyleMulti);
	distributor.setStyle(getStyleMulti);
	ranchesandfarms.setStyle(getStyleMulti);
	dma.setStyle(getStyleMulti);
	primaryHealth.setStyle(getStyleMulti);
	dentalHealth.setStyle(getStyleMulti);
	mentalHealth.setStyle(getStyleMulti);
	ascHealth.setStyle(getStyleMulti);
	dermasoloHealth.setStyle(getStyleMulti);
	dermagroupHealth.setStyle(getStyleMulti);
	plasticsurgerysoloHealth.setStyle(getStyleMulti);
	plasticsurgerygroupHealth.setStyle(getStyleMulti);
	providersHealth.setStyle(getStyleMulti);
	cbrands.setStyle(getStyleMulti);
	tstops.setStyle(getStyleMulti);
	refrigeratedlocations.setStyle(getStyleMulti);
}

function updateRadiusLayers(layerName) {
    var radVal;
    var sourceToAdd;
    var source;
    var features, geom;
    switch (layerName) {
        case "albertsons":
            radVal = $("#intervalAlbertsons").val();
            features = radiusAlbertsonsSource.getFeatures();
            break;
        case "kroger":
            radVal = $("#intervalKroger").val();
            features = radiusKrogerSource.getFeatures();
            break;
        case "closings":
            radVal = $("#intervalInterchanges").val();
            features = radiusClosingsSource.getFeatures();
            break;
        case "toysrus":
            radVal = $("#intervalToysrus").val();
            features = radiusToysrusSource.getFeatures();
            break;
        case "gymboree":
            radVal = $("#intervalGymboree").val();
            features = radiusGymboreeSource.getFeatures();
            break;
        case "starbucks":
            radVal = $("#intervalStarbucks").val();
            features = radiusStarBucksSource.getFeatures();
            break;
        case "fiveguys":
            radVal = $("#intervalFiveGuys").val();
            features = radiusFiveGuysSource.getFeatures();
            break;
        case "raisingcanes":
            radVal = $("#intervalRaisingCanes").val();
            features = radiusRaisingCanesSource.getFeatures();
            break;
        case "culver":
            radVal = $("#intervalCulver").val();
            features = radiusCulverSource.getFeatures();
            break;
        case "potbelly":
            radVal = $("#intervalPotbelly").val();
            features = radiusPotbellySource.getFeatures();
            break;
        case "aldi_2016":
            radVal = $("#intervalAldi").val();
            features = radiusAldiSixteenSource.getFeatures();
            break;
        case "aldi_2016_closed":
            radVal = $("#intervalAldi").val();
            features = radiusAldiSixteenClosedSource.getFeatures();
            break;
        case "aldi_2018":
            radVal = $("#intervalAldi").val();
            features = radiusAldiEighteenSource.getFeatures();
            break;
        case "aldi_2018_new":
            radVal = $("#intervalAldi").val();
            features = radiusAldiEighteenNewSource.getFeatures();
            break;
        case "thornton":
            radVal = $("#intervalThornton").val();
            features = radiusThorntonSource.getFeatures();
            break;
        case "dicks":
            radVal = $("#intervalDicks").val();
            features = radiusDicksSource.getFeatures();
            break;
        case "keef":
            radVal = $("#intervalKeef").val();
            features = radiusKeefSource.getFeatures();
            break;
        case "parkway":
            radVal = $("#intervalParkway").val();
            features = radiusParkwaySource.getFeatures();
            break;
        case "creditunions":
            radVal = $("#intervalCreditUnions").val();
            features = radiusCreditUnionsSource.getFeatures();
            break;
        case "edwardjones":
            radVal = $("#intervalEdwardJones").val();
            features = radiusEdwardJonesSource.getFeatures();
            break;
        case "agencies":
            radVal = $("#intervalAgencies").val();
            features = radiusAgenciesSource.getFeatures();
            break;
        case "agent_ca":
            radVal = $("#intervalCA").val();
            features = radiusCASource.getFeatures();
            break;
        case "agent_za":
            radVal = $("#intervalZA").val();
            features = radiusZASource.getFeatures();
            break;
        case "tartan":
            radVal = $("#intervalTartan").val();
            features = radiusTartanSource.getFeatures();
            break;
        case "uhaul":
            radVal = $("#intervalUhaul").val();
            features = radiusUhaulSource.getFeatures();
            break;
        case "poultryfacilities":
            radVal = $("#intervalPoultry").val();
            features = radiusPoultrySource.getFeatures();
            break;
        case "fairgrounds":
            radVal = $("#intervalFairgrounds").val();
            features = radiusFairgroundSource.getFeatures();
            break;
        case "fortune":
            radVal = $("#intervalFortune").val();
            features = radiusFortuneSource.getFeatures();
            break;
        case "paca":
            radVal = $("#intervalPACA").val();
            features = radiusPACASource.getFeatures();
            break;
        case "tapetro":
            radVal = $("#intervalTAPetro").val();
            features = radiusTAPetroSource.getFeatures();
            break;
        case "oil_refineries":
            radVal = $("#intervalOilrefineries").val();
            features = radiusOilrefineriesSource.getFeatures();
            break;
        case "ethanol_plants":
            radVal = $("#intervalEthanol").val();
            features = radiusEthanolSource.getFeatures();
            break;
        case "grainger":
            radVal = $("#intervalGrainger").val();
            features = radiusGraingerSource.getFeatures();
            break;
        case "foodplants":
            radVal = $("#intervalTyson").val();
            features = radiusFoodplantsSource.getFeatures();
            break;
        case "hydroponic_growers":
            radVal = $("#intervalHydroponics").val();
            features = radiusHydroponicsSource.getFeatures();
            break;
        case "biodiesel_plants":
            radVal = $("#intervalBiodiesel").val();
            features = radiusBiodieselSource.getFeatures();
            break;
        case "publix":
            radVal = $("#intervalPublix").val();
            features = radiusPublixSource.getFeatures();
            break;
        case "gianteagle":
            radVal = $("#intervalGiantEagle").val();
            features = radiusGiantEagleSource.getFeatures();
            break;
        case "shoppingcenter":
            radVal = $("#intervalShopping").val();
            features = radiusShoppingSource.getFeatures();
            break;
        case "stores":
            radVal = $("#intervalStores").val();
            features = radiusStoresSource.getFeatures();
            break;
        case "amazon":
            radVal = $("#intervalAmazon").val();
            features = radiusAmazonSource.getFeatures();
            break;
        case "dma":
            radVal = $("#intervalDMA").val();
            features = radiusDMASource.getFeatures();
            break;
        case "usf":
            radVal = $("#intervalUsf").val();
            features = radiusUsfSource.getFeatures();
            break;
        case "sysco":
            radVal = $("#intervalSysco").val();
            features = radiusSyscoSource.getFeatures();
            break;
        case "robinsonfresh":
            radVal = $("#intervalRobinsonFresh").val();
            features = radiusRobinsonFreshSource.getFeatures();
            break;
        case "kehe":
            radVal = $("#intervalKeHE").val();
            features = radiusKeHESource.getFeatures();
            break;
        case "dmadcs":
            radVal = $("#intervalDmaDcs").val();
            features = radiusDmaDcsSource.getFeatures();
            break;
        case "sygma":
            radVal = $("#intervalSygma").val();
            features = radiusSygmaSource.getFeatures();
            break;
        case "vistar":
            radVal = $("#intervalVistar").val();
            features = radiusVistarSource.getFeatures();
            break;
        case "pfgpfs":
            radVal = $("#intervalPFGPSF").val();
            features = radiusPFGPSFSource.getFeatures();
            break;
        case "mclane":
            radVal = $("#intervalMclane").val();
            features = radiusMclaneSource.getFeatures();
            break;
        case "brownfields":
            radVal = $("#intervalBrownfields").val();
            features = radiusBrownFields.getFeatures();
            break;
        case "farmers":
            radVal = $("#intervalFarmers").val();
            features = radiusFarmerSource.getFeatures();
            break;
        case "homemade_shelters":
            radVal = $("#intervalShelter").val();
            features = radiusShelterSource.getFeatures();
            break;
        case "unitsa":
            radVal = $("#intervalUnitsA").val();
            features = radiusUnitsASource.getFeatures();
            break;
        case "unitsb":
            radVal = $("#intervalUnitsB").val();
            features = radiusUnitsBSource.getFeatures();
            break;
        case "refrigeratedlocations":
            radVal = $("#intervalRefri").val();
            features = radiusRefriSource.getFeatures();
            break;
        case "airports":
            radVal = $("#intervalAirport").val();
            features = radiusAirportSource.getFeatures();
            break;
        case "flagpoints":
            radVal = $("#intervalFreight").val();
            features = radiusFreightIntSource.getFeatures();
            break;
        case "interchanges":
            radVal = $("#intervalInterchanges").val();
            features = radiusInterchangesSource.getFeatures();
            break;
        case "iana":
            radVal = $("#intervalIana").val();
            features = radiusIanaSource.getFeatures();
            break;
        case "ports":
            radVal = $("#intervalPorts").val();
            features = radiusPortsSource.getFeatures();
            break;
        case "transitstations":
            radVal = $("#intervalTransit").val();
            features = radiusTransitstopSource.getFeatures();
            break;
        case "port_facility":
            radVal = $("#intervalPort").val();
            features = radiusPortfacilitySource.getFeatures();
            break;
		case "hot_springs":
			radVal = $("#intervalHotSprings").val();
            features = radiusHotSpringsSource.getFeatures();
		break;
		case "landbanks":
			radVal = $("#intervalLandBanks").val();
            features = radiusLandBanksSource.getFeatures();
		break;
		case "asc":
			radVal = $("#intervalAsc").val();
            features = radiusAscHealthSource.getFeatures();
		break;
		case "dermasolo":
			radVal = $("#intervalDermaSolo").val();
            features = radiusDermaSoloHealthSource.getFeatures();
		break;
		case "dermagroup":
			radVal = $("#intervalDermaGroup").val();
            features = radiusDermaGroupHealthSource.getFeatures();
		break;
		case "plasticsurgerygroup":
			radVal = $("#intervalPlasticSurgeryGroup").val();
            features = radiusPSGroupHealthSource.getFeatures();
		break;
		case "plasticsurgerysolo":
			radVal = $("#intervalPlasticSurgerySolo").val();
            features = radiusPSSoloHealthSource.getFeatures();
		break;
		case "providers":
			radVal = $("#intervalProviders").val();
            features = radiusProvidersHealthSource.getFeatures();
		break;
		case "dentalfacilities":
			radVal = $("#intervalDental").val();
            features = radiusDentalHealthSource.getFeatures();
		break;
		case "mentalfacilities":
			radVal = $("#intervalMental").val();
            features = radiusMentalHealthSource.getFeatures();
		break;
		case "primaryfacilities":
			radVal = $("#intervalPrimary").val();
            features = radiusPrimaryHealthSource.getFeatures();
		break;
		case "traderjoes":
			radVal = $("#intervalTraderJoes").val();
            features = radiusTraderJoesSource.getFeatures();
		break;
		case "wholefoods":
			radVal = $("#intervalWholeFoods").val();
            features = radiusWholeFoodsSource.getFeatures();
		break;
        default:
            break;
    }

    for (var i = 0; i < features.length; i++) {
        geom = features[i].getGeometry();
        geom.setRadius((radVal * 1609.34) * 1.35);
    }
}

Object.defineProperty(Array.prototype, 'immutableMove', {
	enumerable: false,
	value: function (old_index, new_index) {
        var copy = Object.assign([], this)
        if (new_index >= copy.length) {
            var k = new_index - copy.length;
			while ((k--) + 1) { copy.push(undefined); }
        }
        copy.splice(new_index, 0, copy.splice(old_index, 1)[0]);
		return copy
	}
});