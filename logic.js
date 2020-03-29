

// A. Earthquake Data (7+ Magnitude Only)
//-------------------------------------------------- 

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-03-10%2000%3A00%3A00&endtime=2020-03-17%2023%3A59%3A59&minmagnitude=7&orderby=time";


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});


// B. Layer for Earthquake Data (7+ Magnitude Only)
//-------------------------------------------------- 

// Define a markerSize function that will give each city a different radius based on its population


function createFeatures(earthquakeData) {

  

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake


  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      // console.log(feature.geometry.coordinates[0],feature.geometry.coordinates[1] );
     L.circle(feature, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: feature.properties.mag
      })
    //   .bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }

    }

  

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


//   // Sending our earthquakes layer to the createMap function
//   L.layerGroup(earthquakes);
// }

// Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)
//   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }



// C. Layer for Plates Data (7+ Magnitude Only)
//-------------------------------------------------- 

var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Perform a GET request to the query URL
var plates1 = d3.json(queryUrl2, function(data2) {
  console.log("plates initiated");
  // Creating a GeoJSON layer with the retrieved data

  // // L.geoJSON() returns a layer.  This reference will only exist within this promise.
  // var plates = L.geoJson(data2)
  // controlLayers.addOverlay(plates, "Plates")
  // // .addTo(map)
  // ;
  console.log(data2);
});

// // function createFeatures(platesData) {

// //   // Define a function we want to run once for each feature in the features array
// //   // Give each feature a popup describing the place and time of the earthquake
// //   // function onEachFeature(feature, layer) {
// //   //   layer.bindPopup("<h3>" + feature.properties.place +
// //   //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
// //   // }
  
// //   // Create a GeoJSON layer containing the features array on the earthquakeData object
// //   // Run the onEachFeature function once for each piece of data in the array
// //   var plates = L.geoJSON(platesData, {
// //     // onEachFeature: onEachFeature
// //   });

// //   // Sending our earthquakes layer to the createMap function
// //   createMap(plates);
// // }

// var plates = L.layerGroup(plates1);


// D. Base Map & Layer Control 
//-------------------------------------------------- 

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}



// E. Base Map & Layer Control [2nd Version]
//-------------------------------------------------- 
// Create base layers
// var cityLayer = L.layerGroup(cityMarkers);
// var stateLayer = L.layerGroup(stateMarkers);

// Streetmap Layer
// var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// });

// // Darkmap Layer
// var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: API_KEY
// });

// // Create two separate layer groups: one for cities and one for states
// // var earthquakes7 = L.layerGroup(earthquakes);
// // var cities = L.layerGroup(cityMarkers);

// // Create a baseMaps object
// var baseMaps = {
//   "Street Map": streetmap,
//   "Dark Map": darkmap
// };

// // Create an overlay object
// var overlayMaps = {
//   // "State Population": states,
//   // "City Population": cities
//     Earthquakes: earthquakes,
// //     // Plates: plates
// };

// // Define a map object
// var myMap = L.map("map", {
//   center: [  28.77, 63.95],
//   zoom: 3,
//   layers: [streetmap, earthquakes]
// });

// // Pass our map layers into our layer control
// // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
