var formatArea = function(polygon) {
	var area = ol.Sphere.getArea(polygon);
	var output = (Math.round(area * 100 * 10.764) / 100);
	return output;
};

var formatAreaAcres = function(polygon) {
	var area = ol.Sphere.getArea(polygon);
	var output = Math.round(((area * 100 * 10.764) / 100) * 0.000022956841138659);
	return output;
};

var utils = {
	refreshGeoJson: function(source, url) {
		var now = Date.now();
		if (typeof url == 'undefined') {
			url = source.getUrl();
		}
		this.getJson(url).when({
			ready: function(response) {
				var JSONResponse;
				try {
					JSONResponse = JSON.parse(response);
				} catch (err) {
					alert(err + ' - ' + url);
					return;
				}
				var format = new ol.format.GeoJSON();
				var features = format.readFeatures(JSONResponse);
				source.addFeatures(features);
				source.changed();
			}
		});
	},
	getJson: function(url) {
		var xhr = new XMLHttpRequest(),
			when = {},
			onload = function() {
				if (xhr.status === 200) {
					when.ready.call(undefined, xhr.response);
				}
				if (xhr.status === 404) {}
			},
			onerror = function() {};
		xhr.open('GET', url, true);
		xhr.setRequestHeader('cache-control', 'no-store');
		xhr.onload = onload;
		xhr.onerror = onerror;
		xhr.send(null);
		return {
			when: function(obj) {
				when.ready = obj.ready;
			}
		};
	}
};

var flagOneSource = new ol.source.Vector({
	url: "getFlagPoints.php?col=one",
	format: new ol.format.GeoJSON(),
	strategy: ol.loadingstrategy.all
});

var flagThreeSource = new ol.source.Vector({
	url: "getFlagPoints.php?col=three",
	format: new ol.format.GeoJSON(),
	strategy: ol.loadingstrategy.all
});

var flagFiveSource = new ol.source.Vector({
	url: "getFlagPoints.php?col=five",
	format: new ol.format.GeoJSON(),
	strategy: ol.loadingstrategy.all
});

var flagOneLayer = new ol.layer.Vector({
	source: flagOneSource,
	title: 'Flag Points',
	visible: false,
	displayInLayerSwitcher: false,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 0, 0, 0)'
		}),
		stroke: new ol.style.Stroke({
			color: '#FF0000',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: 'rgba(0,0,0,0)'
			})
		})
	})
});

var flagThreeLayer = new ol.layer.Vector({
	source: flagThreeSource,
	title: 'Flag Points',
	visible: false,
	displayInLayerSwitcher: false,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(0, 0, 255, 0)'
		}),
		stroke: new ol.style.Stroke({
			color: '#0000FF',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: 'rgba(0,0,0,0)'
			})
		})
	})
});

var flagFiveLayer = new ol.layer.Vector({
	source: flagFiveSource,
	title: 'Flag Points',
	visible: false,
	displayInLayerSwitcher: false,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(0, 255, 0, 0)'
		}),
		stroke: new ol.style.Stroke({
			color: '#00FF00',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: 'rgba(0,0,0,0)'
			})
		})
	})
});

var hoverInteraction = new ol.interaction.Select({
	condition: ol.events.condition.pointerMove,
	multi: true,
	filter: function(feature, layer) {
		if (layer == null)
			return;
		else {
			if (layer.get('name') == "GardenLayer" || layer.get('name') == "StoreLayer" || layer.get('name') == "Radius" || layer.get('name') == "Heatmap" || layer.get('name') == "Search" || layer.get('name') == "IsoChrone" || layer.get('name') == "Drawing" || layer.get('name') == "region" ||  layer.get('name') == "states" || layer.get('name') == "districts" || layer.get('name') == "cities" || layer.get('name') == "counties" || layer.get('name') == "neighbourcities" || layer.get('name') == "msas" || layer.get('name') == "zip" || layer.get('name') == "VoronoiHospitals" || layer.get('name') == "countiesVoronoi")
				return false;
			else
				return true;
		}
	},
	style: getStyleMultiHigh
});

var farmerCount,storesCount,logoCount,gardenCount,naturalCount,manmadeCount,airportCount,freightCount,interchangeCount,ianaCount,transCount,portCount,amazonCount,syscoCount,usfCount,fedexCount,dhlCount,upsCount,albertsonsCount,culverCount,dicksCount,publixCount,shoppingCount,foodCount;

var currentRequest = null;
var radFirstInt, radSecondInt, radThirdInt;
var selectedRadiusLoct;
var ar=false,dat=false,condi=false,bound=false;
var updatePermalink;
var vorImageWidth='8', vorImageHeight='8';
var currentRequest = null;
var legendDrawn = false;
var tilesLoaded = 0;
var tilesPending = 0;
var showedInput = false;
var showedConditions = false;
var showedOutput = false;
var showedFood = false;
var sldVacancy, sldPopulation, sldWDPA, sldHouseholds, sldIncome, sldDensity, sldPTRR, sldUrbanRural, sldNaicsAp, sldNaicsEst, sldData;
var sldffr, sldffrchange, sldffrpopu, sldffrpopuchange, sldfsr, sldfsrchange, sldfsrpopu, sldfsrpopuchange, sldfarmermarket, sldfarmermarketchange, slddsf, slddsfchange;
var reportDialog;
var dialog, pointLoct;
var dialogTwo, pointLoctTwo, casVal;
var frameBorder = '#000000';
var ptrrSecondVal = 'oct2010';
var swipeAlter = true;
var val, scale, condition, clusterStyle;
var firstColor = '#f7fcf0',
	secondColor = '#e0f3db',
	thirdColor = '#ccebc5',
	fourthColor = '#a8ddb5',
	fifthColor = '#7bccc4',
	sixthColor = '#4eb3d3',
	seventhColor = '#2b8cbe',
	eightColor = '#0868ac',
	ninthColor = '#084081';
var rampFirstTheme = ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'];
var rampSecondTheme = ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'];
var rampThirdTheme = ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'];
var divergentTheme = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#006837'];
var selectedTheme = '';
var detailSelected = '';
var layerName = "",
	gidSelected = "",
	pointClicked = "";

var selectionType, factorTime, factorDistance, factorType, speedLimit;
var isoFormat = new ol.format.GeoJSON({
	defaultDataProjection: 'EPSG:4326',
	featureProjection: 'EPSG:3857'
});
var isoChroneSource = new ol.source.Vector({});
var isoChroneLayer = new ol.layer.Vector({
	name: 'IsoChrone',
	source: isoChroneSource,
	projection: 'EPSG:3857',
	visible: false
});
var hideLabels = false;
var textCache = {};
var emptyFn = function() {};
var labelEngine = new labelgun['default'](emptyFn, emptyFn);
var isoDialog, isoDrawnCoord;
var pixelRatio;

var countiesExtent = ol.proj.transformExtent([-125.052, 24.3988, -66.6608, 49.5087], 'EPSG:3857', 'EPSG:4326');
var fetchExtent;
var wmsFetchExtent;
var countiesWFSVoronoi;
var statesWFSVoronoi;
var voronoiHospitals;
var svg,
	width,
	height,
	circle,
	tmpCellid,
	interaction,
	id, extentVoronoi;
var boxFlag = 0;
var propFlag = false;
var circles = [];
var type_color = [];
var pointDel = [];
var proj = [];
var proj1 = [];
var uniques = [];
var colorList = [];
var state = null;
var cohortTheme = 0;
var countiesWFS;
var sldCohort;
var uniqueRUCA = [];
var div;
var hosp_type = ["PSYCH", "CHILDRENS", "LTACH", "RELIGIOUS/NONMED", "REHAB"];
var hosp_colors = d3.scaleOrdinal().range(["#075ea3", "#008dc1", "#036337", "#008b48", "#a63a23"]);
var projection;

Array.prototype.unique = function() {
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		if (!arr.includes(this[i])) {
			arr.push(this[i]);
		}
	}
	return arr;
}

function styleFunction(feature, resolution) {
	var styleCache;
	var RUCA = feature.get('rucc_2013');
	if (cohortTheme == 1) {
		switch (RUCA) {
			case 1:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#f7f7ce'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 2:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#fcde8c'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 3:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#fabb42'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 4:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#f4912f'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 5:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#f46e24'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 6:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#ec5322'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 7:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#a63a23'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 8:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#a43823'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 9:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#a43023'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			default:
				break;
		}
	} else if (cohortTheme == 2) {
		switch (RUCA) {
			case 1:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#eaf2e2'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 2:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#bbdebd'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 3:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#8cceaa'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 4:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#40c0b8'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 5:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#00b1d3'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 6:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#008dc1'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 7:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#075ea3'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 8:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#043d6c'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 9:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#032d4e'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			default:
				break;
		}
	} else if (cohortTheme == 3) {
		switch (RUCA) {
			case 1:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#f7f6c4'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 2:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#c9e299'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 3:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#94ce81'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 4:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#44b86d'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 5:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#00a654'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;

			case 6:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#008b48'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 7:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#036337'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 8:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#024024'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			case 9:
				styleCache = new ol.style.Style({
					fill: new ol.style.Fill({
						color: '#012314'
					}),
					stroke: new ol.style.Stroke({
						color: '#fafafa',
						width: 1
					})
				});
				return styleCache;
				break;
			default:
				break;
		}
	}
}
var color;
var filterVal = null;
var rendercount = 0;
var pan = true;
var add = false;
var del = false;
var currentZoomLevel;
var style = new ol.style.Style({
	fill: new ol.style.Fill({
		color: 'rgba(255, 255, 255, 0.3)'
	}),
	stroke: new ol.style.Stroke({
		color: 'rgba(255, 120, 0, 0.6)',
		width: 1
	})
});
var styles = [style];

proj4.defs('EPSG:102004', '+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=23 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs');
var proj102004 = ol.proj.get('EPSG:102004');
var filters = "";
$(function() {
	filters = $('#magicsuggest').magicSuggest({
		expandOnFocus: true,
		allowFreeEntries: false,
		hideTrigger: true,
		selectFirst: true,
		useZebraStyle: true,
		maxSelection: 50,
		noSuggestionText: "No match found",
		placeholder: "Type or select filters",
		data: ['BakedGoods', 'Beans', 'Cheese', 'Coffee', 'Crafts', 'Credit', 'Eggs', 'Flowers', 'Fruits', 'Grains', 'Herbs', 'Honey', 'Jams', 'Juices', 'Maple', 'Meat', 'Mushrooms', 'Nursery', 'Nuts', 'Organic', 'Petfood', 'Plants', 'Poultry', 'Prepar', 'Seafood', 'Soap', 'Tofu', 'Trees', 'Vegetables', 'WIC', 'WICCash', 'WildHarvested', 'Wine']
	});

	$(filters).on('selectionchange', function(e, m) {
		if (filters.getSelection() == "") {
			$('#map').focus();
			farmer.setVisible(false);
			$('#primaryData').selectpicker('deselectAll');
		} else
			apply();
	});
});

var dropDownSelected = false;
var options = [];
var map, searchSource, analysisSource, storeSource, densitySource, vacancySource, gardenSource, radiusSource, swipe;
var radiusFeature, markerFeature, draw,
	siteClick = false;
var maskFeature, maskFilter;
var overlay, container, content, closer, cropFilter;
var geocoder;

var view = new ol.View({
	center: ol.proj.fromLonLat([-89.3985, 39.7901]),
	zoom: 4
});

var bingAerial = new ol.layer.Tile({
	name: "BingAerial",
	visible: true,
	baseLayer: true,
	preload: Infinity,
	source: new ol.source.BingMaps({
		key: 'Ai9y3x8v0FM1vGDUXevZDinOzkJVacIW8kJOtSwUDNn8WGpE0ZjxZPJttvIYZg5L',
		imagerySet: "AerialWithLabels"
	})
});

var osmLight = new ol.layer.Tile({
	name: "lightGray",
	visible: false,
	baseLayer: true,
	source: new ol.source.OSM({
		"url": "http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
	})
})

var bingRoads = new ol.layer.Tile({
	name: "BingRoads",
	visible: false,
	baseLayer: true,
	preload: Infinity,
	source: new ol.source.BingMaps({
		key: 'Ai9y3x8v0FM1vGDUXevZDinOzkJVacIW8kJOtSwUDNn8WGpE0ZjxZPJttvIYZg5L',
		imagerySet: "Road"
	})
});

var osm = new ol.layer.Tile({
	name: "OSM",
	baseLayer: true,
	source: new ol.source.OSM(),
	visible: false
});

var terrainStamen = new ol.layer.Tile({
	name: "TerrainStamen",
	baseLayer: true,
	visible: false,
	source: new ol.source.Stamen({
		layer: 'terrain'
	})
});

var popuWMS = getWMS("Population", "Population", "population", false);
var hhWMS = getWMS("Households", "Households", "households", false);
var incomeWMS = getWMS("Income", "Income", "income", false);

var popuWMSMW = getWMS("Population", "Population", "midwestpop", false);
var hhWMSMW = getWMS("Households", "Households", "midwesthh", false);
var incomeWMSMW = getWMS("Income", "Income", "midwestinc", false);
var densityWMSMW = getWMS("Density", "Density", "density", false);
var ptrrWMSOS = getWMS("PriceToRentRatio", "PriceToRentRatio", "ptrr", false);
var ptrrWMSSE = getWMS("PriceToRentRatio", "PriceToRentRatio", "ptrrtwo", false);
var naicsap = getWMS("NAICSAP", "NAICSAP", "naicsap", false);
var naicsest = getWMS("NAICSEST", "NAICSEST", "naicsest", false);

var ffr = getWMS("FFR", "FFR", "ffr", false);
var ffrchange = getWMS("FFRCHANGE", "FFRCHANGE", "ffrchange", false);
var ffrpopu = getWMS("FFRPOPU", "FFRPOPU", "ffrpopu", false);
var ffrpopuchange = getWMS("FFRPOPUCHANGE", "FFRPOPUCHANGE", "ffrpopuchange", false);
var fsr = getWMS("FSR", "FSR", "fsr", false);
var fsrchange = getWMS("FSRCHANGE", "FSRCHANGE", "fsrchange", false);
var fsrpopu = getWMS("FSRPOPU", "FSRPOPU", "fsrpopu", false);
var fsrpopuchange = getWMS("FSRPOPUCHANGE", "fsrpopuchange", "fsrpopuchange", false);
var farmermarket = getWMS("FARMERMARKET", "FARMERMARKET", "farmermarket", false);
var farmermarketchange = getWMS("FARMERMARKETCHANGE", "FARMERMARKETCHANGE", "farmermarketchange", false);
var dsf = getWMS("DSF", "DSF", "dsf", false);
var dsfchange = getWMS("DSFCHANGE", "DSFCHANGE", "dsfchange", false);

var farmer;
var logo;
var stores;
var vacancyWMS = getWMS("Vacancy", "Vacancy", "vacancies", false);
var wdpa = getWMS("WDPA", "WDPA", "wdpa", false);
var foodaccess = getWMS("Food Access", "Food Access", "food", false);
var garden;
var railwayWMS = getWMS("Railway Network", "Railway Network", "railway", false);
// var hsb;
var freightWMS = getWMS("Freight Network", "Freight", "freightnetwork", false);
var dhl;
var fedex;
var ups;
var airport;
var iana;
var amazon;
var sysco;
var usf;
var natural;
var manmade;
var interchange;

var filteredAlbertsons;
var albertsons;
var culver;
var dicks;
var publix;
var shoppingcenter;
var foodplants;
var ranchesandfarms;
var closings;
var distributor;
var dma;

var freightIntersects;
var highwayWMS = getWMS("Highway Network", "Highway Network", "highways", false);
var transStop;
var transNetWMS = getWMS("Transit Network", "Transit Network", "transitnetwork", false);
var portFacility;
var portBoundaryWMS = getWMS("Port Boundary", "Port Boundary", "portspoly", false);
var waterwayWMSNew = getWMS("Waterway", "Waterway", "waterwaypolynew", false);
var waterwayWMSOld = getWMS("Waterway", "Waterway", "waterpolyold", false);

var wmsBoundary = new ol.layer.Image({
	displayInLayerSwitcher: false,
	source: new ol.source.ImageWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': 'us'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: "EPSG:3857"
	}),
	visible: false,
	name: 'Boundary'
});

var wfsRegion;
var wfsStates;
var wfsMsas;
var wfsZips;
var wfsDistricts;
var wfsCounties;
var wfsCities;
var wfsNeighbors;

var wmsRegion = getWMS("Region", "Region", "region", false);
var wmsStates = getWMS("States", "States", "states", false);
var wmsMsas = getWMS("MSAs", "MSAs", "msas", false);
var wmsZips = getWMS("Zips", "Zips", "zip", false);
var wmsDistricts = getWMS("Districts", "Districts", "districts", false);
var wmsCounties = getWMS("Counties", "Counties", "counties", false);
var wmsUrbanRural = getWMS("Urban/Rural", "Urban/Rural", "UrbanRural_2013", false);
var wmsCities = getWMS("Cities", "Cities", "cities", false);
var wmsNeighbors = getWMS("Neighbours", "Neighbours", "neighbourcities", false);

var wmsCaliZE = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': 'California2008'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: 'California 2008'
});

var wmsCaliOS = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': 'California2016'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: 'California 2016'
});

var wmsZeroEightOne = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2008_1'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: 'EPSG:5070'
	}),
	visible: true
});

var wmsZeroEightTwo = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2008_2'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: true
});

var wmsZeroEight = new ol.layer.Group({
	layers: [wmsZeroEightOne, wmsZeroEightTwo],
	displayInLayerSwitcher: false,
	visible: false,
	name: '2008',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2008',
		legendTitle: "2008"
	}
});

var wmsZeroNine = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2009'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2009',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2009',
		legendTitle: "2009"
	}
});

var wmsOneZero = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2010'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2010',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2010',
		legendTitle: "2010"
	}
});

var wmsOneOne = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2011'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2011',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2011',
		legendTitle: "2011"
	}
});

var wmsOneTwo = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2012'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2012',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2012',
		legendTitle: "2012"
	}
});

var wmsOneThree = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2013'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2013',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2013',
		legendTitle: "2013"
	}
});

var wmsOneFourth = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2014'

		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2014',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2014',
		legendTitle: "2014"
	}
});

var wmsOneFive = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2015'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2015',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2015',
		legendTitle: "2015"
	}
});

var wmsOneSix = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2016'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2016',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2016',
		legendTitle: "2016"
	}
});

var wmsOneSixCultivated = new ol.layer.Tile({
	displayInLayerSwitcher: false,
	source: new ol.source.TileWMS({
		url: '../geoserver/Farmer/wms',
		params: {
			'LAYERS': '2016_Cultivated'
		},
		ratio: 1,
		serverType: 'geoserver',
		projection: proj102004
	}),
	visible: false,
	name: '2016_Cultivated',
	lyrControlOpt: {
		legendGroup: 'Data Layers',
		legendnodeid: '2016_Cultivated',
		legendTitle: "2016_Cultivated"
	}
});

var layers = [ffr,ffrchange,ffrpopu,ffrpopuchange,fsr,fsrchange,fsrpopu,fsrpopuchange,farmermarket,farmermarketchange,dsf,dsfchange,naicsest, naicsap, wdpa, wmsUrbanRural, vacancyWMS, popuWMSMW, incomeWMSMW, densityWMSMW, hhWMSMW, portBoundaryWMS, waterwayWMSNew, waterwayWMSOld];

var mappingSource = new ol.source.Vector();
var mappingLayer = new ol.layer.Vector({
	name: 'Drawing',
	visible: false,
	displayInLayerSwitcher: true,
	source: mappingSource,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#ffcc33'
			})
		})
	})
});

var ovLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
});

var farmerSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: function(extent) {
		return '../geoserver/wfs?service=WFS&' +
			'version=1.1.0&request=GetFeature&typename=Farmer:farmers&' +
			'outputFormat=application/json&srsname=EPSG:4326&' +
			'bbox=' + extent.join(',') + ',EPSG:4326';
	},
	strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ())
});

var farmerClusterSource = new ol.source.Cluster({
	distance: 40,
	source: farmerSource
});

var farmerWFS = new ol.layer.Vector({
	title: 'Farmers',
	source: farmerClusterSource,
	visible: false,
	style: new ol.style.Style({
		image: new ol.style.Icon({
			src: 'images/tractor.png',
			scale: 0.6
		})
	})
});

var selectSource;

var searchSource, radiusSource, storeSource, densitySource, vacancySource, gardenSource, analysisSource;
var analysisLayer = new ol.layer.Vector({
	name: 'Analysis',
	visible: false
});

var radiusLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false
});
					
var radiusDMASource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusAlbertsonsSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusClosingsSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusCulverSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusDicksSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusFoodplantsSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusPublixSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusShoppingSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});
					
var radiusStoresSource = new ol.source.Vector({
	projection: 'EPSG:4326'
});

var radiusAlbertsonsLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#3B9BC6",
			width: 3
		})
	})
});

var radiusDMALayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#000000",
			width: 3
		})
	})
});

var radiusClosingsLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#FFFF00",
			width: 3
		})
	})
});

var radiusCulverLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#005193",
			width: 3
		})
	})
});

var radiusDicksLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#0F6554",
			width: 3
		})
	})
});

var radiusFoodplantsLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#002053",
			width: 3
		})
	})
});

var radiusPublixLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#3B902B",
			width: 3
		})
	})
});

var radiusShoppingLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#ED1C24",
			width: 3
		})
	})
});

var radiusStoresLayer = new ol.layer.Vector({
	name: 'Radius',
	visible: false,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#808080",
			width: 3
		})
	})
});

var storeLayer = new ol.layer.Vector({
	name: 'StoreLayer',
	visible: false,
	style: getRadiusStyle,
	displayInLayerSwitcher: false
});

var densityLayer = new ol.layer.Vector({
	name: 'Density',
	visible: false,
	displayInLayerSwitcher: false
});

var vacancyLayer = new ol.layer.Vector({
	name: 'Vacancy',
	visible: false,
	displayInLayerSwitcher: false
});

var gardenLayer = new ol.layer.Vector({
	name: 'GardenLayer',
	visible: false,
	style: getRadiusStyle,
	displayInLayerSwitcher: false
});

var searchLayer = new ol.layer.Vector({
	name: 'Search',
	style: getRadiusStyle,
	visible: false
});

function getRadiusStyle(feature, resolution) {
	var style = "";
	var img = "";
	var scale = 0.6

	if (feature.c.indexOf("farmers") !== -1)
		img = "tractor";
	if (feature.c.indexOf("garden") !== -1) {
		img = "garden";
		scale = 0.3;
	}
	if (feature.c.indexOf("store") !== -1)
		img = "store";

	if (feature.get('radius') == "1M") {
		style = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'images/Icons/' + img + '.png',
				scale: scale
			})
		});
	}
	if (feature.get('radius') == "3M") {
		style = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'images/Icons/' + img + '.png',
				scale: scale
			})
		});
	}
	if (feature.get('radius') == "6M") {
		style = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'images/Icons/' + img + '.png',
				scale: scale
			})
		});
	}
	return style;
}

var heatMapSource;
var heatMap = new ol.layer.Heatmap({
	name: "Heatmap",
	visible: false,
	gradient: ['#00f', '#662506', '#ffffe5', '#fec', '#993404'],
	source: heatMapSource
});

var markerSource = new ol.source.Vector({});
var markerLayer = new ol.layer.Vector({
	name: "Marker",
	visible: false,
	source: markerSource
});
var positions = [];
var voronoi = null;
var polygons = null;

var features;
var voronoiGridLayer = new ol.layer.Vector({
	name: "Voronoi Grid",
	source: features,
	visible: false
});
var featuresPoly;
var voronoiPointLayer = new ol.layer.Vector({
	name: "Voronoi Point",
	visible: false,
	source: featuresPoly
});

var txtSearchLayerSource = new ol.source.Vector();
var txtSearchLayer = new ol.layer.Vector({
	name: 'Search',
	visible: false,
	displayInLayerSwitcher: true,
	source: txtSearchLayerSource,
	style: getBoundaryStyle
});

var zoom = 4;
var center = ol.proj.fromLonLat([-89.3985, 39.7901]);
var rotation = 0;