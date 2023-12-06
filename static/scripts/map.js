
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

let logoIcon = new L.Icon({
    iconUrl: 'static/images/logo.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [38, 40],
    iconAnchor: [17, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

let options = {
    enableHighAccuracy: true,
    //la duree pour na
    timeout: 5000,
    //la durée maximale pour mettre en cache la position
    maximumAge: 0,
  };
/*position est appelée lorsque la position est récupérée avec succès. Les coordonnées obtenues sont utilisées 
pour mettre à jour la position du marqueur et déplacer la carte pour montrer la nouvelle position.*/
function position(pos) {
    var crd = pos.coords;
    console.log(" position actuelle  de l'utilisateur est :");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);
    // Mets à jour la position du marqueur avec les coordonnées de la géolocalisation
    let marker = L.marker([crd.latitude,crd.longitude ], {icon: logoIcon}).addTo(map);
    marker.bindPopup("<b> Vous êtes là </b>").openPopup();
    // Déplace la carte pour montrer la nouvelle position
    map.setView([crd.latitude, crd.longitude], 13);
    
}

function error(err) {
console.warn(`ERREUR (${err.code}): ${err.message}`);
}
//pour recuperer la position actuelle 
navigator.geolocation.getCurrentPosition(position, error, options);
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