/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * liées aux interactions du frontend avec le backend
 * (appelé dans filtres.js)
 *
 * ****************************************************************
 */


/* fonction de test pour l'interaction
* envoie une liste au serveur
* le serveur renvoie le nombre d'élément de la liste
*/
export function test_nombre_selections(sousTypesSelectionnes){
    fetch('/api/checked/', {
        method: 'POST',
        // Envoi de la liste sous format json
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sousTypesSelectionnes})
        })
    // Reception de la réponse     
    .then(Response=>Response.json())
    // Affichage de la réponse sur la page html
    .then(data=>{
        //Appeler ici la fonction qui traite la réponse du serveur 
        /* test : Ici on appelle une fonction qu'on a définit displayMessageOrData  
        car on veut juste afficher la réponse sur la page html pour le test
        Définir une autre fonction et remplacer si on veut effctuer d'autre traitement*/
        //displayMessageOrData(data);
    });
}

/* Fonction utiliser pour l'interaction avec le serveur sur la route /api/data/
* envoie une liste de types au serveur
* le serveur renvoie les données correspondant
*/
export function data_selections(sousTypesSelectionnes,fonction){
    fetch('/api/data/', {
        method: 'POST',
        // Envoi de la liste sous format json
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sousTypesSelectionnes})
        })
    // Reception de la réponse     
    .then(Response=>Response.json())
    // Affichage de la réponse sur la page html
    .then(data=>{
        //displayMessageOrData(data);
        fonction();
    });
}

/* Fonction qui prend en parametre un objet et l'affiche au niveau de la balise correspondante dans le fichier html
* ici on s'attend à ce que l'objet soit la réponse envoyé par le backend suite à une requete: 
* elle peut donc avoir une propriété 
* et cette propriété est définit au niveau des returns des fonctions liées aux routes dans app.py
* soit message, soit data
*/
function displayMessageOrData(reponse) {
    const messageContainer = document.getElementById('message-container');
    //si data est un message ()
    if (reponse.message) {
        messageContainer.innerHTML = `<p>${reponse.message}</p>`;
    } else if (reponse.data) {
        if (Array.isArray(reponse.data)) {
            // Si data est un tableau, on suppose que c'est une liste de dictionnaires
            messageContainer.innerHTML = `
                <p>Liste de Dictionnaires :</p>
                <ul>
                    ${reponse.data.map(item => `<li>${JSON.stringify(item, null, 2)}</li>`).join('')}
                </ul>
            `;
        } else {
            // si dans un autre format
            messageContainer.innerHTML = `<p>Format de données inconnu</p>`;
        }
    }
}


//envoie des coordonnées en serveur pour afficher les poi
export function getPoiAutour(latitude,longitude,radiusKm_){
    console.log("Rayon dans getPoiAutour :", radiusKm_);
    return new Promise((resolve, reject) => {
        //on recupere de recup les POI
        const result = '/api/poiAutour/';
        const data = {
            latitude:latitude,
            longitude:longitude,
            radiusKm: radiusKm_
        };
        fetch (result ,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data =>{
            if (data.error) {
                console.error("Erreur lors de la récupération des points d'intérêt :", data.error);
                reject(data.error);
            }
            else {
                console.log("Points d'interet autour de la position actuelle :", data.data);
                resolve(data.data);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des points d\'intérêt :', error);
            console.error("Server error message:", error.error);
            reject(error);  
        });
    });
}


const To_export = {
    test_nombre_selections,
    data_selections,
    getPoiAutour
}

export default To_export;