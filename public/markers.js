var map;
// var url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?sw=40.501111,-73.687194&country_code=US&api-key=af9bf1c31430421ab0ab8f940e8b987f"
var url = "https://api.nytimes.com/svc/semantic/v2/geocodes/query.json?country_code=US&api-key=af9bf1c31430421ab0ab8f940e8b987f";
function initMap() {
    var newYorkCityLatLong = new google.maps.LatLng(40.7128, -74.0059);
    map = new google.maps.Map(document.getElementById('map'), {
        center: newYorkCityLatLong,
        zoom: 11
    });
    // var url = "https://api.nytimes.com/svc/semantic/v2/geocodes/query.json";
    // url += '?' + $.param({
    //     'country_code': "US",
    //     'api-key': "af9bf1c31430421ab0ab8f940e8b987f"
    // });
    // $.ajax({
    //   url: url,
    //   method: 'GET',
    // }).done(function(result) {
    //   console.log(result);
    // }).fail(function(err) {
    //   throw err;
    // });
    var things;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => JSON.parse(contents))
    .then(function(data){
      var i;
      console.log(data.results);
      for (i = 0; i < data.results.length; i++) {
        var test = new google.maps.LatLng(data.results[i].latitude,data.results[i].longitude);
        var marker = new google.maps.Marker({
          position: test,
        });
        var infowindow = new google.maps.InfoWindow({
          content: data.results[i].name
        });
        marker.addListener('click', function(marker) {
          return function() {
            infowindow.open(map, marker);
          }
        }(marker));
        marker.setMap(map);
      } 
    });
    
}