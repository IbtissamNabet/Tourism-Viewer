
let myPositionCoord = {};

let boutonOnArround = document.getElementById('onArround');

let boutonOffArround = document.getElementById('offArround');

/* On "vide" les boutons radio à l'ouverture de la page */

boutonOnArround.checked = false;

boutonOffArround.check = true;



/* A utiliser pour la fonction qui affiche si on veut uniquement utiliser les filtres autour de nous  */

boutonOnArround.addEventListener('change', () => {

    boutonOffArround.checked = false;

    navigator.geolocation.getCurrentPosition(position, error, options);

})


boutonOffArround.addEventListener('change', () => {

    boutonOnArround.checked = false;

})


var options = {

    enableHighAccuracy: true,

    timeout: 10000,

    maximumAge: 0,

};


/*Pour la couleur du popup correspondant à ma position*/

let pinkIcon = new L.Icon({

    iconUrl: 'static/images/logo.png',

    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

    iconSize: [55, 55],

    iconAnchor: [26, 45],

    popupAnchor: [1, -34],

    shadowSize: [41, 41]

});


let boutonPosition = document.getElementById("myPosition");

boutonPosition.addEventListener('click', () => {

    // Pour récupérer la position actuelle

    navigator.geolocation.getCurrentPosition(position, error, options);

});


// Fonction de position qui affiche un marker sur la positoon actuelle de l'utilisateur

async function position(pos) {

    var crd = pos.coords;

    console.log(" position actuelle  de l'utilisateur est :");

    console.log(`Latitude : ${crd.latitude}`);

    console.log(`Longitude : ${crd.longitude}`);

    console.log(`La précision est de ${crd.accuracy} mètres.`);

    // Met à jour myPositionCoord

    myPositionCoord={

        'latitude':crd.latitude,

        'longitude':crd.longitude

    };

    // Mets à jour la position du marqueur avec les coordonnées de la géolocalisation

    let marker = L.marker([crd.latitude, crd.longitude], { icon: pinkIcon }).addTo(map);

    marker.bindPopup("<b> Vous etes la </b>").openPopup();

    // Déplace la carte pour montrer la nouvelle position

    map.setView([crd.latitude, crd.longitude], 13);

}



// Fonction d'erreur

function error(err) {

    console.warn(`ERREUR (${err.code}): ${err.message}`);

}



export { myPositionCoord };