var map;
var facetChoice;
var facetChosen = 0;

//Runs when the page is loaded, in order to create a google map with the center in New York City.
function initMap() {
  var newYorkCityLatLong = new google.maps.LatLng(40.7128, -74.0059);
  map = new google.maps.Map(document.getElementById('map'), {
    center: newYorkCityLatLong,
    zoom: 9
  });
  loadMarkers();
}

//Queries the NY Times Geographic API and takes the results and creates markers out of them.
function loadMarkers() {
  var url = "https://api.nytimes.com/svc/semantic/v2/geocodes/query.json";
  if(facetChosen) {
    url += '?' + $.param({
      'facet': facetChoice,
      'country_code': "US",
      'api-key': "af9bf1c31430421ab0ab8f940e8b987f"
    });
    facetChosen = 0;
  } else {
    url += '?' + $.param({
      'country_code': "US",
      'api-key': "af9bf1c31430421ab0ab8f940e8b987f"
  });
}
  var things;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => JSON.parse(contents))
    .then(function(data){
      console.log(url);
      for (var i = 0; i < data.results.length; i++) {
        var latLon = new google.maps.LatLng(data.results[i].latitude,data.results[i].longitude);
        var marker = new google.maps.Marker({
          position: latLon,
        });  
        marker.addListener('click', addInfoWindow(data, marker, i));
        marker.setMap(map);
      } 
    });
  }

//Creates an info window to be opened when a marker is clicked.
function addInfoWindow(data, marker, index) {
  return function() {
    var infowindow = new google.maps.InfoWindow({
      content: '<h1>' + data.results[index].name + '</h1>' +
               '<p>' + data.results[index].name + ' has a lat/lon of (' + data.results[index].latitude + ', ' + data.results[index].longitude + '). ' +
                'It also has an elevation of ' + data.results[index].elevation + ' feet.</p>'
    });
    infowindow.open(map, marker);
  }
}

//Takes radio button input and reloads markers based on the change in facets.
function changeFacet(val) {
  if (val > 0) {
    facetChoice = val;
    facetChosen = 1;
  }
  loadMarkers();
}