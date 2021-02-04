var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var API_KEY = "pk.eyJ1IjoibmF0bGFzcyIsImEiOiJja2p6dmV3ZW8wYm1iMnZwcGdhdDRmeWg1In0.xQh7kIoJo-iM3AR23qH-Ng";

// Initialize all of the LayerGroups we'll be using
var layers = {
  fifteen: new L.LayerGroup(),
  sixteen: new L.LayerGroup(),
  seventeen: new L.LayerGroup(),
  eighteen: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("mapid", {
  center: [39.8283, 98.5795],
  zoom: 12,
  layers: [
    layers.fifteen,
    layers.sixteen,
    layers.seventeen,
    layers.eighteen,
  ],
  onClick: function(e, legendItem) {
    var index = legendItem.datasetIndex;
    var ci = this.chart;
    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
    ci.data.datasets.forEach(function(e, i) {
      var meta = ci.getDatasetMeta(i);
      if (i !== index) {
        if (!alreadyHidden) {
          meta.hidden = meta.hidden === null ? !meta.hidden : null;
        } else if (meta.hidden === null) {
          meta.hidden = true;
        }
      } else if (i === index) {
        meta.hidden = null;
      }
    });
    ci.update();
}});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "2015": layers.fifteen,
  "2016": layers.sixteen,
  "2017": layers.seventeen,
  "2018": layers.eighteen,
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(map);

var icons = {
  fifteen: L.CircleMarker.icon({
    markerColor: "red",
    radius: 10
  }),
  sixteen: L.CircleMarker.icon({
    markerColor: "green",
    radius: 10
  }),
  seventeen: L.CircleMarker.icon({
    markerColor: "blue",
    radius: 10
  }),
  eighteen: L.CircleMarker.icon({
    markerColor: "yellow",
    radius: 10
  }),
};

var url = "/year=<year>";

d3.json(url).then(function(user) {
  console.log(user);
});

function optionChanged(newSelection){
  sampleSelect(newSelection);
}

init();

console.log()