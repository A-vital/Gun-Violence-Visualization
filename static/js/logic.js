var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// year = d3.select("#year").text();
// year.on("submit",runEnter);
// function runEnter() {

// }
// console.log(year);
// ${year}

var url = `http://127.0.0.1:5000/year=2015`;

d3.json(url, function(data) {
  console.log(data);
});


// Initialize all of the LayerGroups we'll be using
var layers = {
  fifteen: new L.LayerGroup(),
  sixteen: new L.LayerGroup(),
  seventeen: new L.LayerGroup(),
  eighteen: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("mapid", {
  center: [39.8283, -98.5795],
  zoom: 5,
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

var customColor = "yellow"
if (!data.n_killed >= 1)
    customColor: "red";
else if (!data.n_killed >= 3) 
    customColor: "orange"

var markers = {
  fifteen: L.markerClusterGroup.icon({
    markerColor: customColor,
    radius: 10
  }),
  sixteen: L.markerClusterGroup.icon({
    markerColor: customColor,
    radius: 10
  }),
  seventeen: L.markerClusterGroup.icon({
    markerColor: customColor,
    radius: 10
  }),
  eighteen: L.markerClusterGroup.icon({
    markerColor: customColor,
    radius: 10
  }),
};

for (var i = 0; i < data.length; i++)   {
  var customOptions = {
      'maxWidth': '500',
      'className' : 'custom'
  };
  //Custom icon
  var blueMarker = L.AwesomeMarkers.icon({
      markerColor: 'blue'
  });
  //Create markerLocation variable    
  var markerLocation = new L.LatLng(data[i].lat, data[i].lon);
  //Create marker variable
  var marker = new L.Marker(markerLocation, {icon: blueMarker});
  marker.bindPopup("<p><h2>Rating:</h2> " + data[i].rating_value,
                   customOptions);
}

var Info = user.data.year;
// Create an object to keep of the number of markers in each layer
var yearCount = {
  fifteen: 0,
  sixteen: 0,
  seventeen: 0,
  eighteen: 0,
};
// Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and year count for layer group
var yearStatusCode;
// Loop through the stations (they're the same size and have partially matching data)
for (var i = 0; i < Info.length; i++) {
  // Create a new station object with properties of both station objects
  var station = Object.assign({}, Info[i]);
  // If a station is listed but not installed, it's coming soon
  if (!station.n_killed >= 0) {
    yearStatusCode = "fifteen";
  }
  // If a station has no bikes available, it's empty
  else if (!station.n_killed ) {
    yearStatusCode = "sixteen";
  }
  // If a station is installed but isn't renting, it's out of order
  else if (station.is_installed && !station.is_renting) {
    yearStatusCode = "seventeen";
  }
  // If a statio4 has less than 5 bikes, it's status is low
  else (station.num_bikes_available < 5) {
    yearStatusCode = "eighteen";
  }
  // Update the year count
  yearCount[yearStatusCode]++;

function optionChanged(newSelection){
  sampleSelect(newSelection);
}

init();

console.log()