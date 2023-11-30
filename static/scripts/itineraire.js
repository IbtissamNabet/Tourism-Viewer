let boutonItineraire = document.getElementById("itineraire");

let routingControl;

let boutonOnItineraire = document.getElementById('onItineraire');
let boutonOffItineraire = document.getElementById('offItineraire');
/* On "vide" les boutons radio à l'ouverture de la page */
boutonOnItineraire.checked = false;
boutonOffItineraire.check = true;

boutonItineraire.addEventListener('click', () => {

  /* Enlève l'itinéraire si lorsqu'on rechoisi un itinéraire l'ancien est encore affiché
  (si le bouton off n'est pas coché lors du nouveau choix) */
  if (routingControl != null) map.removeControl(routingControl);

  /* On initialise le nombre de clics sur la carte pour ne laisser 
  à l'utilisateur le choix que de choisir un déaprt et une arrivée */
  let nbclick = 0;

  let el1, el2;

  map.on('click', function(e){
    nbclick ++;
    /* Lors du premier click sur la map on récupère les coordonnées du premier repère */
    if(nbclick == 1){
      el1 = e.latlng;
      console.log(el1);
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
      /* On initialise les boutons radio lors du premier choix d'itinéraire */
      boutonOnItineraire.checked = true;
      boutonOffItineraire.checked = false;
    }
  });


})

/* Quand on coche on, l'itinéraire s'affiche */
boutonOnItineraire.addEventListener('change', () => {
  boutonOffItineraire.checked = false;
  routingControl.addTo(map);
})

/* Quand on coche off, l'itinéraire n'es plus visible mais n'est pas réinitialiser au cas où on veuille le re-afficher */
boutonOffItineraire.addEventListener('change', () => {
  boutonOnItineraire.checked = false;
  /* SI un itinéraire est déjà existant, on l'enlève de la carte */
  if (routingControl != null) map.removeControl(routingControl);
})





/*
https://guides.etalab.gouv.fr/apis-geo/1-api-adresse.html
*/
