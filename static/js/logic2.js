// Add console.log to check to see if our code is working.
console.log("working");
// We create the tile layer that will be the background of our map.
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
// Initialize all of the LayerGroups we'll be using
var layers = {
  fifteen: new L.LayerGroup(),
  sixteen: new L.LayerGroup(),
  seventeen: new L.LayerGroup(),
  eighteen: new L.LayerGroup(),
};
// Create the map object with center, zoom level and default layer.
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
  onClick: function (e, legendItem) {
    var index = legendItem.datasetIndex;
    var ci = this.chart;
    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
    ci.data.datasets.forEach(function (e, i) {
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
  }
});
// Create a base layer that holds all three maps.
lightmap.addTo(map);
// 1. Add a 3rd layer group for the major earthquake data.
let allYears = new L.LayerGroup();
// 2. Add a reference to the major earthquake group to the overlays object.
var overlays = {
    "2015": layers.fifteen,
    "2016": layers.sixteen,
    "2017": layers.seventeen,
    "2018": layers.eighteen,
  };
// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(null, overlays).addTo(map);

const url2015 = "githubrawcontentlink.com/linkto2015json.json";
const url2016 = "githubrawcontentlink.com/linkto2016json.json";
const url2017 = "githubrawcontentlink.com/linkto2017json.json";
const url2018 = "githubrawcontentlink.com/linkto2018json.json";

// Retrieve the earthquake GeoJSON data.
d3.json(url2015).then(function (data) {
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(data) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(data.n_killed),
      color: "#000000",
      radius: 1,
      stroke: true,
      weight: 0.5
    };
  }
  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(n_killed) {
    if (n_killed == 0) {
      return "red";
    }
    if (n_killed >= 1) {
      return "yellow";
    }
    if (n_killed >= 2) {
      return "blue";
    }
    if (n_killed >= 3) {
      return "green";
    }
    if (n_killed >= 4) {
      return "white";
    }
  };
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (data, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (data, layer) {
      layer.bindPopup("Number Killed: " + data.n_killed + "<br>Location: " + data.state + "Number Injured" + data.n_injured);
    }
  }).addTo(overlays);
  // Then we add the earthquake layer to our map.
  overlays.addTo(map);
  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });
  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    const deaths = [0, 1, 2, 3, 4];
    const colors = [
      "red",
      "yellow",
      "blue",
      "green",
      "white"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < deaths.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        deaths[i]+ (deaths[i + 1] ? "&ndash;" + deaths[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // Finally, we our legend to the map.
  legend.addTo(map);
  /* // Here we make an AJAX call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(platedata) {
      // Adding our geoJSON data, along with style information, to the tectonicplates
      // layer.
      L.geoJson(platedata,
        //  {
        // color: "#FF6500",
        // weight: 2
      // }
      )
      .addTo(tectonicplates);
      // Then add the tectonicplates layer to the map.
      tectonicplates.addTo(map);
    }); */
});