
// initialisation pour l'ouverture de la carte, ici Londres
let map = L.map('map').setView([45.75, 4.85], 13);



// copyright
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// 

// bindPopup: lie un pop-up à un objet déclaré dans une variable
// openPopup: affiche le pop-up à l'ouverture


let popup = L.popup();
// affiche dans un pop-up les "Nothing Here" s'il n'y a pas de message
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Nothing Here")
        .openOn(map);
}
map.on('click', onMapClick);

/* 
Si besoin d'autres exemples

openOn: comme addOn(dans leaflet.js), sauf qu'il gère automatiquement 
les ouvertures et fermetures de pop-up quand tu en cliques sur un autre

// popup d'exemple en mode texte
popup
.setLatLng([51.513, -0.09])
.setContent("I am a standalone popup.")
.openOn(map);
*/
