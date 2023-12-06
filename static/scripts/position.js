import connexion_functions from './connexion.js';

let boutonOnArround = document.getElementById('onArround');
let boutonOffArround = document.getElementById('offArround');
/* On "vide" les boutons radio à l'ouverture de la page */
boutonOnArround.checked = false;
boutonOffArround.check = true;

/* A utiliser pour la fonction qui affiche si on veut uniquement utiliser les filtres autour de nous  */
boutonOnArround.addEventListener('change', () => {
    boutonOffArround.checked = false;
})

boutonOffArround.addEventListener('change', () => {
    boutonOnArround.checked = false;
})

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
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


async function position(pos) {
    var crd = pos.coords;
    console.log(" position actuelle  de l'utilisateur est :");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);

    // Mets à jour la position du marqueur avec les coordonnées de la géolocalisation
    let marker = L.marker([crd.latitude, crd.longitude], { icon: pinkIcon }).addTo(map);
    marker.bindPopup("<b> Vous etes la </b>").openPopup();
    // Déplace la carte pour montrer la nouvelle position
    map.setView([crd.latitude, crd.longitude], 13);
    //appel a la onction pour recuperer les poi autour de la pos actuelle
    try {
        const radius_km = 8;  // Définissez le rayon ici
        const pois = await connexion_functions.getPoiAutour(crd.latitude, crd.longitude, radius_km);
        console.log("Données des POI récupérées :", pois);
        pois.forEach(poi => {
            const marker = L.marker([poi.latitude, poi.longitude]).addTo(map);
            marker.bindPopup(`<b>${poi.nom_poi}</b><br>${poi.description}</b><br>${poi.adress_postale}<br>${poi.code_postal}</br><br>${poi.tel}</br>`);
        });
        //afficher les poi recu sur a carte
    } catch (error) {
        console.error("Erreur lors de la récupération des POI :", error);
    }
}

// Fonction d'erreur
function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}
