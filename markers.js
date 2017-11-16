var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7128, lng: -74.0059},
        zoom: 11
    });
    var test = new google.maps.LatLng(40.6413,-73.7781);
    var marker = new google.maps.Marker({
        position: test,
        title:"Airport"
    });

    marker.setMap(map);
}