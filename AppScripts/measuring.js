var measureDraw;
var measureSource = new ol.source.Vector();
var measureLayer = new ol.layer.Vector({
    displayInLayerSwitcher: false,
    name: "Measure",
    source: measureSource,
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

var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continuePolygonMsg = 'Click to continue drawing the polygon';
var continueLineMsg = 'Click to continue drawing the line';

var pointerMoveHandler = function(evt) {
    try {
        if (evt.dragging) {
            return;
        }
        var helpMsg = 'Click to start drawing';
        if (sketch) {
            var geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = continueLineMsg;
            }
        }
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
        helpTooltipElement.classList.remove('hidden');
    } catch (ex) {}
};

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

function addMeasure(val) {
    if (val == "on") {
        addMeasureInteraction('LineString');
    } else {
        clearMeasures();
    }
}

function updateMeasureType() {
    try {
        map.removeInteraction(measureDraw);
    } catch (ex) {}
    switch ($("#measureType").val()) {
        case 'clear':
            $("#measureFilters").hide();
            clearMeasures();
            break;
        case 'length':
            $("#measureFilters").show();
            addMeasureInteraction('LineString');
            break;
        case 'area':
            $("#measureFilters").show();
            addMeasureInteraction('Polygon');
            break;
        default:
            break;
    }
}

function addMeasureInteraction(type) {
    measureDraw = new ol.interaction.Draw({
        source: measureSource,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });

    if ($('#contMeasure').is(":checked"))
        map.addInteraction(measureDraw);
    else
        map.removeInteraction(measureDraw);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    measureDraw.on('drawstart',
        function(evt) {
            sketch = evt.feature;
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    measureDraw.on('drawend',
        function() {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            sketch = null;
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);
}

function clearMeasures() {
    $(".tooltip").remove();
    map.removeOverlay(measureTooltip);
    map.removeOverlay(helpTooltip);
    measureSource.clear();
    map.removeInteraction(measureDraw);
}

function continueMeasure(val) {
    if (val == "on") {
        map.addInteraction(measureDraw);
    } else {
        map.removeOverlay(helpTooltip);
        map.removeInteraction(measureDraw);
    }
}

function removeVertex() {
    try {
        measureDraw.removeLastPoint();
    } catch (ex) {}
}