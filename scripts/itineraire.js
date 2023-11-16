let boutonItineraire = document.getElementById("itineraire");

let routingControl;

boutonItineraire.addEventListener('click', () => {

  /* SI un itinéraire est déjà existant, on l'enlève pour en mettre un nouveau */
  if (routingControl != null) map.removeControl(routingControl);

  /* On initialise le nombre de clics sur la carte pour ne laisser 
  à l'utilisateur le choix que de choisir un déaprt et une arrivée */
  let nbclick = 0;

  /* Contient latitude et longitude des points aux extrémités de l'itinéraire 
  pour le côté backend qui renverra seulement les points autour de l'itinéraire */
  let coordonneesItineraire = [];

  let el1, el2;

  map.on('click', function(e){
    nbclick ++;
    /* Lors du premier click sur la map on récupère les coordonnées du premier repère */
    if(nbclick == 1){
      el1 = e.latlng;
    }
    /* Lors du premier click sur la map on récupère les coordonnées du premier repère 
    ET on affiche l'itinéraire */
    if(nbclick == 2){
      el2 = e.latlng;
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(el1),
          L.latLng(el2)
        ]
      }).addTo(map);
    /* Rajout pour la réception des popup dans la zone */
    coordonneesItineraire = [el1.lat, el1.lng, el2.lat, el2.lng];
    }
  });
})





/*
https://guides.etalab.gouv.fr/apis-geo/1-api-adresse.html
*/