/**
 * Initialisation des attributs communs aux deux types de choix d'itinéraire
 */

let boutonItineraire = document.getElementById("itineraire");

let routingControl;

let boutonOnItineraire = document.getElementById('onItineraire');
let boutonOffItineraire = document.getElementById('offItineraire');
/* On "vide" les boutons radio à l'ouverture de la page */
boutonOnItineraire.checked = false;
boutonOffItineraire.check = true;



/* Quand on coche on, l'itinéraire s'affiche */
boutonOnItineraire.addEventListener('change', () => {
  boutonOffItineraire.checked = false;
  routingControl.addTo(map);
})

/* Quand on coche off, l'itinéraire n'est plus visible mais n'est pas réinitialiser au cas où on veuille le re-afficher */
boutonOffItineraire.addEventListener('change', () => {
  boutonOnItineraire.checked = false;
  /* SI un itinéraire est déjà existant, on l'enlève de la carte */
  if (routingControl != null) map.removeControl(routingControl);
})



/**
 * Partie avec le choix de l'itinéraire directement sur la carte
 */
boutonItineraire.addEventListener('click', () => {

  /* Enlève l'itinéraire si lorsqu'on rechoisi un itinéraire l'ancien est encore affiché
  (si le bouton off n'est pas coché lors du nouveau choix) */
  if (routingControl != null) map.removeControl(routingControl);

  /* On initialise le nombre de clics sur la carte pour ne laisser 
  à l'utilisateur le choix que de choisir un départ et une arrivée */
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
      /* On initialise les boutons radio lors du d'itinéraire */
      boutonOnItineraire.checked = true;
      boutonOffItineraire.checked = false;
    }
  });


})




/**
 * Partie du choix de l'itinéraire avec l'autocomplétion
 */
let selected_coord=[[],[]];
/// static/scripts/autocompletion.js

document.addEventListener('DOMContentLoaded', function () {
  // déclenché lorsque le DOM de la page est complètement chargé. (quand html est pret)
  //on recupere le depart et l'arrivée 
  const depart = document.getElementById('depart');
  const arrivee = document.getElementById('arrivee');

  //  les éléments de liste déroulante pour les villes de départ et d'arrivée celle qu'on a crée avec le select 
  const villeDepartSelect = document.getElementById('villeDepart');
  const villeArriveeSelect = document.getElementById('villeArrivee');

  // Configurer l'autocomplétion pour les champs de départ et d'arrivée
  //pour l'adresse de depart on lui configure son autocompletion 
  Autocompleter(depart, villeDepartSelect, 0);
  Autocompleter(arrivee, villeArriveeSelect, 1);

  let soumis = document.getElementById("autocomp");
  soumis.addEventListener('click', () => {
      if (routingControl != null) map.removeControl(routingControl);
      console.log(selected_coord);
      tracer(selected_coord);
      /* Mise à jour des boutons radio */
      boutonOnItineraire.checked = true;
      boutonOffItineraire.checked = false;
  })

});



function Autocompleter(input, select, indiceDansSelectCoord) {
  // créer la zone d'autocomplétion avec la methode autocompleter de Jquery UI 
  $(input).autocomplete({
    //source pour dire que la fonction qui le suit va etre appelee quand 
    //l'utilisateur commence a ecrire dans la barre de recherche
    source: function (request, response) {
      // Effectuer une requête AJAX pour obtenir des suggestions d'adresses  de l'api gouv.fr/search
      $.ajax({
        url: 'https://api-adresse.data.gouv.fr/search/',
        dataType: 'json',//type de données attendus de la requette 
        //l'api renvoie les données sous format json comme vu sur le site ...
        data: {
          q: request.term, //request.term pour ce que l'user a saisie 
          limit:10, 
        },
        //si la requette ajax est réussie la fonction ci-dessous est appelée elle prend en param le resultat recu par l'api
        success: function (data) {
          // Transforme les résultats en un tableau de libellés d'adresse
          //features : le tableau renvoyé par l'api qui comporte plusieurs propriétés 
          //avec map  on crée un nouveau tableau pour appliquer la fonction qui extrait le label des propriétés 
          const suggestions = data.features.map((feature) => ({
            label : feature.properties.label,
            coordinates: feature.geometry.coordinates,
          }));
                      
          //reponse est appelée pour qu'lle soit utilisée par jquery pour l'autocomp
          response(suggestions);
        },
      });
    },
    minLength: 3, // Nombre minimum de caractères pour déclencher l'autocomplétion
    select: function (event, sugg) {
      // select pour Mettre à jour la liste déroulante avec la ville sélectionnée lorsque l'utilisateur valide une adresse 
      select.value = sugg.item.label;
      //les coordonées selectionées 
      const coor= sugg.item.coordinates;
      console.log("les coordonnées de : ", sugg.item.label,"sont: ", coor);
      selected_coord[indiceDansSelectCoord]=coor;
      console.log(selected_coord);
    },
  });
}

function tracer(tab_coord){
  var dep=L.latLng(tab_coord[0][1],tab_coord[0][0]);
  console.log(dep);
  var arr=L.latLng(tab_coord[1][1],tab_coord[1][0]);
  console.log(arr);
  routingControl = L.Routing.control({
    waypoints: [
      dep,
      arr
    ]
  }).addTo(map);
}