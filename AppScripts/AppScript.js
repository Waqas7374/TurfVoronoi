function initCR(){
	if ($('#switchLabelsCR').is(":checked"))
		hideLabels = false;
	else
		hideLabels = true;

	$('select').selectpicker();
	toastr.info("Use Text Boxes or click on the map");
	toastr.info("Use ';' delimiter for searching Multiple ZIPS like '36322;36005'");

	// toggleBaseLayers(baseStates);
	baseStates.setVisible(true);
}

function getBoundaryCR(lyrName, statefp, visi) {
    var color, dashStyle, strokeWidth = 2,
        fontSize = "10px";

    var source = new ol.source.Vector({
        loader: function(extent, resolution, projection) {
            var extent = map.getView().calculateExtent(map.getSize());
            extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:3857", "EPSG:4326"));
            wmsFetchExtent = extent;
			var url;
			if (lyrName.indexOf("_ratio") !== -1)
				lyrName = lyrName.replace('_ratio', '');

			if (lyrName == "zip") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=statefp10=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "str_geocoded_all_new") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=state ILIKE ' + '\'%25' + statefp + '%25\'' +'&outputFormat=application/json&PropertyName=id_1,section_field_new,township_new,township_dir,range_new,range_dir,county,state,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "msas") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=statefp ILIKE ' + '\'%25' + statefp + '%25\'' + '&outputFormat=application/json&PropertyName=name,statefp,colorid,geoid,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "food_report") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=statefp ILIKE ' + '\'%25' + statefp + '%25\'' + '&outputFormat=application/json&PropertyName=name,statefp,code,colorid,geom&srsname=EPSG:3857';
			}
			else if(lyrName == "watershedregions") {
				url = '../geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=Farmer:' + lyrName +'&outputFormat=application/json&PropertyName=huc,colorid,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "subwatershed") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=statefp ILIKE ' + '\'%25' + statefp + '%25\'' + '&outputFormat=application/json&PropertyName=huc,statefp,colorid,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "subbasin") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:' + lyrName + '&CQL_FILTER=states ILIKE ' + '\'%25' + stabbr + '%25\'' + '&outputFormat=application/json&PropertyName=huc,colorid,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "NeighbourCities") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:neighbourcities&CQL_FILTER=statefp ILIKE ' + '\'%25' + statefp + '%25\'' + '&outputFormat=application/json&PropertyName=name,colorid,state,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "consumermarket") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:consumermarket&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,geoid,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "schools_ccd") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,statefp,nces_distr,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "hrr") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,statefp,hrrnum,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "hsa") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,statefp,hsa93,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "tracts") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,geoid,statefp,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "cities" || lyrName == "districts") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,geoid,colorid,statefp,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "counties") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,colorid,state,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "laucnty") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=name,laus_code,colorid,statefp,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "laucnty") {
				url = '../geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=Farmer:'+ lyrName +'&CQL_FILTER=statefp=' + '\'' + statefp + '\'' +	'&outputFormat=application/json&PropertyName=county_name,colorid,statefp,geom&srsname=EPSG:3857&' + ',EPSG:3857';
			}
			else if (lyrName == "states") {
				url = '../geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=Farmer:' + lyrName +'&outputFormat=application/json&PropertyName=name,statefp,stusps,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "region" || lyrName == "msas_grainger" || lyrName == "triballand") {
				url = '../geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=Farmer:' + lyrName +'&outputFormat=application/json&PropertyName=name,colorid,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "bea10" || lyrName == "cbsa10" || lyrName == "ers10" || lyrName == "ers10rep"|| lyrName == "pea10" || 		lyrName == "tp10" || lyrName == "tp10metro" || lyrName == "tp10micro") {
				url = '../geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=Farmer:' + lyrName +'&outputFormat=application/json&PropertyName=lm_code,colorid,geom&srsname=EPSG:3857';
			}
			else if (lyrName == "opportunityzones") {
				url = '../geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=Farmer:' + lyrName +'&CQL_FILTER=strToLowerCase(statename)=' + '\'' + statefp + '\'' + '&outputFormat=application/json&PropertyName=geoid10,countyname,colorid,geom&srsname=EPSG:3857';
			}

			$('.table-loader').show();
            $.ajax({
                url: url,
                dataType: 'json',
                beforeSend: function(e) {
                    $('#js-progress-bar').css({
                        'opacity': '1',
                        'height': '5px'
                    });
                    ++tilesPending;
                },
                success: function(data) {
                    ++tilesLoaded;
                    var percentage = Math.round(tilesLoaded / tilesPending * 100);
                    $('#js-progress-bar').css({
                        'width': percentage + '%'
                    });
                    if (percentage >= 100) {
                        setTimeout(function() {
                            $('#js-progress-bar').css({
                                'width': '0',
                                'opacity': '0'
                            });
                            tilesLoaded = 0;
                            tilesPending = 0;
                        }, 600);
                    }
                    var features = geoJSONFormat.readFeatures(data);
                    source.addFeatures(features);
					$('.table-loader').hide();
                }
            });
        },
        strategy: ol.loadingstrategy.bbox
    });

    switch (lyrName) {
        case "zip":
            color = "#00AEEF";
            dashStyle = [0, 0];
            break;
    }

    function setStyle(context) {
        context.font = fontSize + " 'Lato'";
        context.fillStyle = color;
        context.strokeStyle = color;
        context.textBaseline = 'hanging';
        context.textAlign = 'start';
    }

    var textMeasureContext = document.createElement('CANVAS').getContext('2d');
    setStyle(textMeasureContext);

    var height = textMeasureContext.measureText('WI').width;

    function createLabel(canvas, text, coord) {
        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;
        var bounds = {
            bottomLeft: [Math.round(coord[0] - halfWidth), Math.round(coord[1] - halfHeight)],
            topRight: [Math.round(coord[0] + halfWidth), Math.round(coord[1] + halfHeight)]
        };
        labelEngine.ingestLabel(bounds, coord.toString(), 1, canvas, text, false);
    }

    function sortByWidth(a, b) {
        return ol.extent.getWidth(b.getExtent()) - ol.extent.getWidth(a.getExtent());
    }

    var labelStyle = new ol.style.Style({
        renderer: function(coords, ftr) {
    			if (lyrName == "tracts")
              var text = ftr.feature.get('tractce');
          else if (feature.c.indexOf("subwatershed") !== -1 || feature.c.indexOf("watershedregions") !== -1  || feature.c.indexOf("subbasin") !== -1)
              text = "HUC-" + feature.get('huc');
    			else if (lyrName == "counties" || lyrName == "states" || lyrName == "zip")
              var text = ftr.feature.get('name');
          createLabel(textCache[text], text, coords);
        }
    });

    var boundaryStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: color,
            width: strokeWidth,
            lineDash: dashStyle
        })
    });
    var styleWithLabel = [boundaryStyle, labelStyle];
    var styleWithoutLabel = [boundaryStyle];
    var vectorLayer = new ol.layer.Vector({
		displayInLayerSwitcher: false,
        name: "CR-Crosswalks-" + lyrName,
        declutter: true,
        visible: visi,
        source: source,
        style: getBoundaryAndLabelStyleCR
    });

    vectorLayer.on('precompose', function(e) {
        pixelRatio = e.frameState.pixelRatio;
        labelEngine.destroy();
    });
    vectorLayer.on('postcompose', function(e) {
        var labels = labelEngine.getShown();
        for (var i = 0, ii = labels.length; i < ii; ++i) {
            var label = labels[i];
            e.context.drawImage(label.labelObject, label.minX, label.minY);
        }
    });
    return vectorLayer;
}

function getBoundaryCrosswalks(source, lyrName) {
    var color, dashStyle, strokeWidth = 2,
        fontSize = "10px";
	var fillColor = "rgba(82, 82, 82, 0.67)";
    function setStyle(context) {
        context.font = fontSize + " 'Lato'";
        context.fillStyle = fillColor;
        context.strokeStyle = color;
        context.textBaseline = 'hanging';
        context.textAlign = 'start';
    }

    var textMeasureContext = document.createElement('CANVAS').getContext('2d');
    setStyle(textMeasureContext);

    var height = textMeasureContext.measureText('WI').width;

    function createLabel(canvas, text, coord) {
        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;
        var bounds = {
            bottomLeft: [Math.round(coord[0] - halfWidth), Math.round(coord[1] - halfHeight)],
            topRight: [Math.round(coord[0] + halfWidth), Math.round(coord[1] + halfHeight)]
        };
        labelEngine.ingestLabel(bounds, coord.toString(), 1, canvas, text, false);
    }

    function sortByWidth(a, b) {
        return ol.extent.getWidth(b.getExtent()) - ol.extent.getWidth(a.getExtent());
    }

    var labelStyle = new ol.style.Style({
        renderer: function(coords, ftr) {
			var text = ftr.feature.get('name');
            createLabel(textCache[text], text, coords);
        }
    });

    var boundaryStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: color,
            width: strokeWidth,
            lineDash: dashStyle
        })
    });
    var styleWithLabel = [boundaryStyle, labelStyle];
    var styleWithoutLabel = [boundaryStyle];
    var vectorLayer = new ol.layer.Vector({
		displayInLayerSwitcher: false,
        name: lyrName,
        declutter: true,
        visible: true,
        source: source,
        style: getStyleCR,
		opacity: 0.7
    });

    vectorLayer.on('precompose', function(e) {
        pixelRatio = e.frameState.pixelRatio;
        labelEngine.destroy();
    });
    vectorLayer.on('postcompose', function(e) {
        var labels = labelEngine.getShown();
        for (var i = 0, ii = labels.length; i < ii; ++i) {
            var label = labels[i];
            e.context.drawImage(label.labelObject, label.minX, label.minY);
        }
    });

    return vectorLayer;
}

function getBoundaryAndLabelStyleCR(feature, resolution) {
    var color, dashStyle, strokeWidth = 1,
        fontSize = "17px";
    function setStyle(context) {
        context.font = fontSize + " 'Lato'";
        context.fillStyle = color;
        context.strokeStyle = color;
        context.textBaseline = 'hanging';
        context.textAlign = 'start';
    }
    var textMeasureContext = document.createElement('CANVAS').getContext('2d');
    setStyle(textMeasureContext);

    var height = textMeasureContext.measureText('WI').width;

    function createLabel(canvas, text, coord) {
        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;
        var bounds = {
            bottomLeft: [Math.round(coord[0] - halfWidth), Math.round(coord[1] - halfHeight)],
            topRight: [Math.round(coord[0] + halfWidth), Math.round(coord[1] + halfHeight)]
        };
        labelEngine.ingestLabel(bounds, coord.toString(), 1, canvas, text, false);
    }

    function sortByWidth(a, b) {
        return ol.extent.getWidth(b.getExtent()) - ol.extent.getWidth(a.getExtent());
    }

    var labelStyle = new ol.style.Style({
        renderer: function(coords, state) {
            var text = "";
            if (feature.c.indexOf("laucnty") !== -1)
      				text = feature.get('laus_code');
            else if (feature.c.indexOf("subwatershed") !== -1 || feature.c.indexOf("watershedregion") !== -1  || feature.c.indexOf("watershedsubregion") !== -1|| feature.c.indexOf("subbasin") !== -1)
      				text = "HUC-"+ feature.get('huc');
            else if(feature.c.indexOf("cbsa") !== -1 || feature.c.indexOf("ers") !== -1 || feature.c.indexOf("bea") !== -1 || feature.c.indexOf("tp10") !== -1 || feature.c.indexOf("pea10") !== -1)
              text = feature.get('lm_code');
            else if(feature.c.indexOf("opportunityzones") !== -1)
              text = feature.get('geoid10');
            else if(feature.c.indexOf("laucnty") !== -1)
              text = feature.get('laus_code');
            else if(feature.c.indexOf("schools_ccd") !== -1)
              text = feature.get('nces_distr');
            else
      				text = feature.get('name');
            createLabel(textCache[text], text, coords);
        }
    });
	// // // Ghosted Check
	if( Ghosted == 'Off' ) {
		if (feature.c.indexOf("zip") !== -1 || feature.c.indexOf("counties") !== -1 || feature.c.indexOf("tracts") !== -1 || feature.c.indexOf("districts") !== -1 || feature.c.indexOf("cities") !== -1 || feature.c.indexOf("msas") !== -1 || feature.c.indexOf("neighborhood") !== -1 || feature.c.indexOf("district") !== -1 || feature.c.indexOf("laucnty") !== -1 || feature.c.indexOf("food_report") !== -1 || feature.c.indexOf("region") !== -1 || feature.c.indexOf("bea") !== -1 || feature.c.indexOf("cbsa") !== -1 || feature.c.indexOf("cbsa") !== -1 || feature.c.indexOf("ers10") !== -1 || feature.c.indexOf("opportunityzones") !== -1 || feature.c.indexOf("pea10") !== -1 || feature.c.indexOf("tp10") !== -1 || feature.c.indexOf("tribal") !== -1 || feature.c.indexOf("schools_ccd") !== -1 || feature.c.indexOf("consumermarket") !== -1 || feature.c.indexOf("hsa") !== -1 || feature.c.indexOf("hrr") !== -1 || feature.c.indexOf("subbasin") !== -1) {
			var colorid = parseFloat(feature.get('colorid'));
			var fillColor='';
			fillColor='#715b5b';
			if (colorid == 0)
				fillColor='rgba(185, 103, 95, 0.5)';
			else if (colorid == 1)
				fillColor='rgba(209, 144, 46, 0.5)';
			else if (colorid == 2)
				fillColor='rgba(172, 156, 109, 0.5)';
			else if (colorid == 3)
				fillColor='rgba(87, 119, 0, 0.5)';
			else if (colorid == 4)
				fillColor='rgba(103, 125, 144, 0.5)';
			else if (colorid == 5)
				fillColor='rgba(223, 168, 140, 0.5)';
			var boundaryStyle = new ol.style.Style({
				fill: new ol.style.Fill({
						color: fillColor
				}),
				stroke: new ol.style.Stroke({
					color: '#000',
					width: strokeWidth,
					lineDash: dashStyle
				})
			});
		}
		else{
      var strokecolor = color;
      if(feature.c.indexOf("subwatershed") !== -1) {
          strokecolor = 'rgba(255, 255, 255, 0)';
      }
			var boundaryStyle = new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: strokecolor,
					width: strokeWidth,
					lineDash: dashStyle
				})
			});
		}
	}
	else {
		var strokecolor = color;
		if(feature.c.indexOf("subwatershed") !== -1) {
			strokecolor = 'rgba(255, 255, 255, 0)';
		}
		var boundaryStyle = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: strokecolor,
				width: strokeWidth,
				lineDash: dashStyle
			})
		});
	}


    var styleWithLabel = [labelStyle, boundaryStyle];
    var styleWithoutLabel = [boundaryStyle];

    if (hideLabels)
        return styleWithoutLabel;

    var text = "";
    if (feature.c.indexOf("laucnty") !== -1)
        text = feature.get('laus_code');
    else if (feature.c.indexOf("subbasin") !== -1 || feature.c.indexOf("subwatershed") !== -1 || feature.c.indexOf("watershedregion") !== -1 || feature.c.indexOf("watershedsubregion") !== -1)
        text = "HUC-" + feature.get('huc');
    else if(feature.c.indexOf("cbsa") !== -1 || feature.c.indexOf("ers") !== -1 || feature.c.indexOf("bea") !== -1 || feature.c.indexOf("tp10") !== -1 || feature.c.indexOf("pea10") !== -1)
        text = feature.get('lm_code');
    else if(feature.c.indexOf("opportunityzones") !== -1)
        text = feature.get('geoid10');
    else if(feature.c.indexOf("schools_ccd") !== -1)
        text = feature.get('nces_distr');
    else if(feature.c.indexOf("laucnty") !== -1)
        text = feature.get('laus_code');
    else
        text = feature.get('name');
    var width = textMeasureContext.measureText(text).width;
    var geometry = feature.getGeometry();
    if (geometry.getType() == 'MultiPolygon') {
        geometry = geometry.getPolygons().sort(sortByWidth)[0];
    }
    var extentWidth = ol.extent.getWidth(geometry.getExtent());
    if (extentWidth / resolution > width) {
        var canvas = textCache[text] = document.createElement('CANVAS');
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        var context = canvas.getContext('2d');
        context.scale(pixelRatio, pixelRatio);
        setStyle(context);
        context.strokeText(text, 0, 0);
        context.fillText(text, 0, 0);
        labelStyle.setGeometry(geometry.getInteriorPoint());
        return styleWithLabel;
    } else {
        return styleWithoutLabel;
    }
}
function getStyleCR(feature, resolution) {
	try {
		var color, dashStyle, strokeWidth = 4,
			fontSize = "20px";
		if(feature.S.gid.indexOf("srch") !== -1) {
			var colorid = parseFloat(feature.get('colorid'));
				dashStyle = [0, 0];
				color = "#000";
				var fillColor='';
				fillColor = "#715b5b";
				if (colorid == 0)
					fillColor='rgba(185, 103, 95, 0.8)';
				else if (colorid == 1)
					fillColor='rgba(209, 144, 46, 0.8)';
				else if (colorid == 2)
					fillColor='rgba(172, 156, 109, 0.8)';
				else if (colorid == 3)
					fillColor='rgba(87, 119, 0, 0.8)';
				else if (colorid == 4)
					fillColor='rgba(103, 125, 144, 0.8)';
				else if (colorid == 5)
					fillColor='rgba(223, 168, 140, 0.8)';
				fontSize = "17px";
		}
		else {
			dashStyle =  [15, 7];
			color = "#9f0404";
			fillColor = "rgba(82, 82, 82, 0.35)";
			strokeWidth = 3
		}
	}
	catch(e) {}
    function setStyle(context) {
        context.font = fontSize + " 'Lato'";
        context.fillStyle = color;
        context.strokeStyle = color;
        context.textBaseline = 'hanging';
        context.textAlign = 'start';
    }
    var textMeasureContext = document.createElement('CANVAS').getContext('2d');
    setStyle(textMeasureContext);

    var height = textMeasureContext.measureText('WI').width;

    function createLabel(canvas, text, coord) {
        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;
        var bounds = {
            bottomLeft: [Math.round(coord[0] - halfWidth), Math.round(coord[1] - halfHeight)],
            topRight: [Math.round(coord[0] + halfWidth), Math.round(coord[1] + halfHeight)]
        };
        labelEngine.ingestLabel(bounds, coord.toString(), 1, canvas, text, false);
    }

    function sortByWidth(a, b) {
        return ol.extent.getWidth(b.getExtent()) - ol.extent.getWidth(a.getExtent());
    }
	var text = feature.S.b2_name;
    var labelStyle = new ol.style.Style({
        renderer: function(coords, state) {
            createLabel(textCacheOverlay[text], text, coords);
        }
    });
	var boundaryStyle = new ol.style.Style({
			fill: new ol.style.Fill({
					color: fillColor
			}),
			stroke: new ol.style.Stroke({
				color: color,
				width: strokeWidth,
				lineDash: dashStyle
			})
	});

    var styleWithLabel = [labelStyle, boundaryStyle];
    var styleWithoutLabel = [boundaryStyle];

	if((feature.S.gid.indexOf("srch") !== -1)) {
		if(hideLabels)
			return styleWithoutLabel;
		var width = textMeasureContext.measureText(text).width;
		var geometry = feature.getGeometry();
		if (geometry.getType() == 'MultiPolygon') {
			geometry = geometry.getPolygons().sort(sortByWidth)[0];
		}
		var extentWidth = ol.extent.getWidth(geometry.getExtent());
		if (extentWidth / resolution > width) {
			if (!(text in textCacheOverlay)) {
				var canvas = textCacheOverlay[text] = document.createElement('CANVAS');
				canvas.width = width * pixelRatio;
				canvas.height = height * pixelRatio;
				var context = canvas.getContext('2d');
				context.scale(pixelRatio, pixelRatio);
				setStyle(context);
				context.strokeText(text, 0, 0);
				context.fillText(text, 0, 0);
			}
			labelStyle.setGeometry(geometry.getInteriorPoint());
			return styleWithLabel;
		} else {
			return styleWithoutLabel;
		}
	}
	else {
		if(hideOverlayLabels)
			return styleWithoutLabel;
		var width = textMeasureContext.measureText(text).width;
		var geometry = feature.getGeometry();
		if (geometry.getType() == 'MultiPolygon') {
			geometry = geometry.getPolygons().sort(sortByWidth)[0];
		}
		var extentWidth = ol.extent.getWidth(geometry.getExtent());
		if (extentWidth / resolution > width) {
			if (!(text in textCacheOverlay)) {
				var canvas = textCacheOverlay[text] = document.createElement('CANVAS');
				canvas.width = width * pixelRatio;
				canvas.height = height * pixelRatio;
				var context = canvas.getContext('2d');
				context.scale(pixelRatio, pixelRatio);
				setStyle(context);
				context.strokeText(text, 0, 0);
				context.fillText(text, 0, 0);
			}
			labelStyle.setGeometry(geometry.getInteriorPoint());
			return styleWithLabel;
		} else {
			return styleWithoutLabel;
		}
	}
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode == 59)
        return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}