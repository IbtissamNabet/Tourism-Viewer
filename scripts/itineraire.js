let boutonItineraire = document.getElementById("itineraire");

boutonItineraire.addEventListener('click', () => {
  console.log("btn itin");
  /* Contient latitude et longitude des points aux extrémités de l'itinéraire */
  let coordonnees = [];

  /* On cherche à faire cliquer l'utilisateur uniquement deux fois pour Départ et Arrivée */
  for(let i = 0; i < 2; i++){

    /* On récuperera dans le tableau les positions de clics */
    function onMapClick(e) {
      coordonnees.push(e.latlng.lat);
      coordonnees.push(e.latlng.lng);
    }

    map.on('click', onMapClick);
  }

  console.log(coordonnees);
  // problème pour récupérer les coordonnées du tableau


  /* On affiche l'itinéraire en fonction des coordonnées de l'arrivée et du départ */
  L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);
})











/*
https://nouvelle-techno.fr/articles/openstreetmap-creer-des-itineraires
https://www.liedman.net/leaflet-routing-machine/#getting-started
https://www.developpez.net/forums/d1596395/javascript/bibliotheques-frameworks/recuperer-coordonnees-d-marqueur-apres-qu-soit-place/
https://www.aliasdmc.fr/coursjavas/cours_javascript76.html
*/