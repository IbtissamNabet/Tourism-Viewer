/*$(document).ready(function(){
      //appel a lAPI
      const apiUrl="https://geo.api.gouv.fr/communes?=codePostal'";
      const format='&format=json';
      let depart=$('#depart');
       let ville = $('#villeDepart');
       let erreur=$('#messageDerreur');
       $(depart).on('blur',function(){
            let code = $(this).val();//on  stock le code postale saisie 
            console.log(code);
            let url=apiUrl+code+format;
            //toute les infos par rapport au code postale
            console.log(url);
            fetch(url,{method: 'get'}).then(response => response.json()).then(results => {

                  console.log(results);
                  if(results.length){
                        //si ya des resultats renvoyés pa rl'API on boucle dessus 
                        $.each(results,function(key,value){
                              //console.log(value);
                              //le nom  des commune 
                              console.warn(value.nom);
                              $(ville).append('<option value="'+value.nom+'">'+value.nom+'</option>');
                        });
                  }
                  else {
                        if($(depart).val()){
                              console.log("erreur code postale");
                              $(MessageDerreur).text('Aucune commune avec ce code postale ').show();
                        }
                        else {
                           //message vide 
                           $(MessageDerreur).text('').hide();
                    
                  }
            }
            }).catch(err => {
                  console.log(err);
            })

       });
});
*/
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
      Autocompleter(depart, villeDepartSelect);
      Autocompleter(arrivee, villeArriveeSelect);
    });
    
    function Autocompleter(input, select) {
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
            //si la requette ajax est reussi la fonction ci dessous est appelée elle pred en param le resultat recu par l'api
            success: function (data) {
              // Transforme les résultats en un tableau de libellés d'adresse
              //features : le tableau renvoyé par l'api qui comporte plusieur propieté 
              //avec map  on crée un nouveau tableau pour appliquer la fonction qui extrait le label des propriété 
              const suggestions = data.features.map((feature) => feature.properties.label);
              //reponse est appelée pour qu'lle soit utilisée par jquery pour l'autocomp
              response(suggestions);
            },
          });
        },
        minLength: 3, // Nombre minimum de caractères pour déclencher l'autocomplétion
        select: function (event, ui) {
          // select pour Mettre à jour la liste déroulante avec la ville sélectionnée lorsque l'utilisateur valide une adresse 
          select.value = ui.item.value;
        },
      });
    }