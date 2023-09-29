// initialisation pour l'ouverture de la carte, ici Londres
let map = L.map('map').setView([51.505, -0.09], 13);

// copyright
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 
let marker = L.marker([51.5, -0.09]).addTo(map);

// faire apparaître un cercle en fonction de ses coordonées
let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

let popup = L.popup();

// affiche dans un pop-up les coordonnées s'il n'y a pas de message
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

// bindPopup: lie un pop-up à un objet déclaré dans une variable
// openPopup: affiche le pop-up en solo (ferme les autres)
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// openOn: comme addOn(dans leaflet.js), sauf qu'il gère automatiquement 
// les ouvertures et fermetures de pop-up quand tu en cliques sur un autre

// popup d'exemple en mode texte
popup
.setLatLng([51.513, -0.09])
.setContent("I am a standalone popup.")
.openOn(map);

map.on('click', onMapClick);