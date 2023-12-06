
// initialisation pour l'ouverture de la carte, ici Londres
let map = L.map('map').setView([45.75, 4.85], 13);



// copyright
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let logoIcon = new L.Icon({
    iconUrl: 'static/images/logo.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [38, 40],
    iconAnchor: [17, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

