var map = L.map('map').setView([45.75, 4.85], 13);

var marker = L.marker([45.75, 4.85]).addTo(map);

var circle = L.circle([45.75, 4.83], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [45.75, 4.84],
    [45.77, 4.82],
    [45.70, 4.80]
]).addTo(map);

var popup = L.popup();
///affiche dans un pop-up les coordonnées s'il n'y a pas de message
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

L.Routing.control({
    waypoints: [
      L.latLng(45.78, 4.87),
      L.latLng(45.77, 4.81)
    ]
  }).addTo(map);