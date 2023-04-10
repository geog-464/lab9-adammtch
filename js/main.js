// declare the map variable here to give it a global scope
let myMap;

// we might as well declare our baselayer(s) here too
const CartoDB_Positron = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
	{
		attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	}
);

const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
let baseLayers = {
	"CartoDB": CartoDB_Positron,
	"Esri_WorldStreetMap" : Esri_WorldStreetMap
};
function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
}
console.log()
function styleAll(feature, latlng) {
	
	var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };

    if (/^[A-Za-z]/.test(feature.properties.ZipCode)) {
        styles.fillColor = 'Navy';
    } else {
        styles.fillColor = '#fff';
    }

    if (feature.geometry.type == "Point") {
        styles.fillOpacity = 0.5;
        styles.stroke = true;
        styles.radius = 9;
    }

    return styles;

    var styles = {dashArray:null, 
        dashOffset:null, 
        lineJoin:null, 
        lineCap:null, 
        stroke:false, 
        color:'#fff', 
        opacity:1, 
        weight:1, 
        fillColor:null, 
        fillOpacity:0 };

    if (feature.properties.ZipCode.toString().startsWith())

    if (feature.geometry.type == "Point") {
        styles.fillColor = '#000'
        ,styles.fillOpacity = 0.5
        ,styles.stroke=true
        ,styles.radius=6
    }

    return styles;
}
function initialize() {
	loadMap();
}
function addPopups(feature, layer){
		layer.bindPopup(feature.properties.StationNam);
}
function fetchData() {
	// load the data
	fetch('https://raw.githubusercontent.com/geog-464/geog-464.github.io/main/Amtrak_Stations.geojson')
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			// create a Leaflet GeoJSON layer using the fetched json and add it to the map object
			L.geoJson(json, {style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
		});
}

function loadMap() {
	// now reassign the map variable by actually making it a useful object, this will load your leaflet map
	myMap = L.map('mapdiv', {
		center: [45.50, -73.58],
		zoom: 3,
		maxZoom: 18,
		minZoom: 3,
		layers: Esri_WorldStreetMap
	});

	// declare basemap selector widget
	let lcontrol = L.control.layers(baseLayers);
	// add the widget to the map
	lcontrol.addTo(myMap);
	fetchData()
	};



window.onload = initialize;