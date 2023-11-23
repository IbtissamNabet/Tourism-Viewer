/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * nécessaires à la gestion des filtres à appliquer sur la carte
 * (hors affichage sur carte, filtres liés au popup cf. popup.js)
 * 
 * ****************************************************************
 */

/* On récupère le fichier json contenant les types de lieux sous forme de tableau */
import connexion_functions from './connexion.js'
const rep = await fetch('/static/json/types.json');
const lieux = await rep.json();





/* Tableau qui contiendra les types généraux des lieux */
let typesLieux = [];

/* Tableau qui contiendra toutes confondues les sous catégories de lieux */
let sousTypesLieux = [];

/* Boucle qui rempli le tableau des types (généraux) de lieux */
for (let i = 0; i < lieux.length; i++){

    let types = lieux[i].ParentLabel;

    /* Pour tous les éléments de lieux, s'il n'est pas
    déjà pris en compte alors on le rajoute à distinct */
    if(! typesLieux.includes(types)) typesLieux.push(types);
}





/* Pour chacun des types généraux de lieux on crée un bouton */
for (let bt = 0 ; bt < typesLieux.length ; bt++){
    let nomBouton = typesLieux[bt];

    /* Création de l'identifiant de chaque bouton en fonction du nom qu'ils afficheront 
    on y enlève les espaces et les caractères spéciaux par expression régulière */
    let idBouton = nomBouton.replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');

    /* On sélectionne l'emplacement des filtres sur la page web */
    let emplacementBoutons = document.querySelector(".selection-type-lieux");

    /* On crée et remplit chaque bouton avec son affichage et son idéntifiant */
    let bouton = document.createElement("button");
    bouton.innerText = nomBouton;
    bouton.id = idBouton;

    emplacementBoutons.appendChild(bouton);

    

    /* On crée une classe en dessous de chaque bouton pour pouvoir ranger
    les sous catégories de lieux en dessous de chaque type */
    const blocSousType = document.createElement("div");
    /* Besoin de reconnaître les sous classes entre elles pour les déplier ou non
    (ps : on rajoute un 'c' devant id car un identifiant est unique) */
    blocSousType.id = 'c' + idBouton;

    // utilité d'un point de vue css uniquement
    blocSousType.classList.add('createclass');

    emplacementBoutons.appendChild(blocSousType);



    /* Boucle pour créer les sous catégories en dessous des boutons de types 
    (ps : sous forme de checkbox) */
    for (let k = 0; k < lieux.length; k++){
        /* On aura besoin de lier chaque sous catégories au type auquel elle est rattaché dans le json */
        let idSurType = lieux[k].ParentLabel.replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');
        /* Chaque checkbox a un identifiant ... */
        let idSousType = lieux[k].Label.replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');
        /* ... et un nom */
        let nomSousType = lieux[k].Label;

        /* Si la sous catégorie n'est pas déjà notée comme affichée et que l'id du Parent correspond */
        if(idSurType === idBouton && (! sousTypesLieux.includes(nomSousType))){

            let divSousTypes = document.createElement("div");
            // uniquement pour le css, boîtes pour mieux distinguer
            divSousTypes.classList.add("divcheckbox");

            /* Création de la checkbox pour la sous catégorie de lieu */
            let checkBox = document.createElement("input");
            checkBox.type = 'checkbox';
            checkBox.id = idSousType;
            checkBox.checked = false;

            /* Création du label associé à la checkbox */
            let nameCheckBox = document.createElement("label");
            nameCheckBox.innerText = nomSousType;

            blocSousType.appendChild(divSousTypes);
            divSousTypes.appendChild(checkBox);
            divSousTypes.appendChild(nameCheckBox);

            /* "Note** cette catégorie à été gérée" */
            sousTypesLieux.push(nomSousType);

        }
    }
}





/* Boucle pour la gestion du clic de chaque bouton */
for (let j = 0; j < typesLieux.length; j++){
    /* On recupère l'id correspondant à chaque bouton pour pouvoir récupérer l'action "click" propre à chacun */
    let idBoutonLieu = typesLieux[j].replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');
    /* On récupère le bouton en question */
    let BoutonLieu = document.getElementById(idBoutonLieu);
    /* On récupère la classe rattachée au bouton, qui elle, va se dérouler ou se re enrouler à chaque click */
    let rangementSousTypes = document.getElementById("c" + idBoutonLieu);

    BoutonLieu.addEventListener("click", () => {
        /* Si les sous catégories sont affichées, on les cache, sinon on les affiche */
        if(getComputedStyle(rangementSousTypes).display != "none"){
            rangementSousTypes.style.display = "none";
          } else {
            rangementSousTypes.style.display = "flex";
          }
    })
}





/* Tableau qui stocke les markers affichés sur la carte */
let markers = [];
/* Tableau qui stocke les types qui viennent d'être coché et pour lesquels il faut afficher des marqueurs */
let newTypes = [];
/* Tableau qui stocke les types décochés dont il faut enlever les marqueurs encore présents */
let oldTypes = [];




async function updateMarkers() {
    /* On récupère les données qui correspondent à tous les lieux qui ont leur type coché */
    const repInfos = await fetch('/static/json/data_got.json');
    const infos = await repInfos.json();



    /* Pour tout les lieux on affiche un popup */
    for(let t = 0; t < infos.length; t++){

        /* On récupère le nom du type de lieu dès ici pour identifier s'il vient d'être coché, 
        décoché, ou aucun des deux (dans quel cas on n'y touche pas) */
        let nomType = infos[t].nom_type;



        if(newTypes.includes(nomType)){
            /* Affichage du pointeur sur la carte */
            let marker = new L.marker([infos[t].latitude,infos[t].longitude], {title : nomType}).addTo(map);
            map.addLayer(marker);
            console.log("lattitude est : " ,infos[t].latitude ,"longitude est :" , infos[t].longitude );

            let nomLieu = infos[t].nom_poi;



            /* On récupère chaque élément de l'adresse complète */
            let adressePostale = infos[t].adresse_postale;
            let codePostal = infos[t].code_postal;
            let commune = infos[t].commune;

            /* On ne construit l'adresse qu'en fonction des éléments présent dans la base de données */
            let adresse = "";
            if(!adressePostale){adresse += codePostal + " " + commune;}
            else{adresse = adressePostale + "<br>" + codePostal + " " + commune;}



            /* On récupère chaque moyen de contact */
            let numTel = infos[t].tel;
            let email = infos[t].adresse_mail;
            let siteWeb = infos[t].site_web;

            /* Idem que pour l'adresse */
            let contact = "";
            if(numTel) contact += numTel + "<br>";
            if(email) contact += email + "<br>";
            if(siteWeb) contact += "<a>" + siteWeb + "</a>";



            let description = infos[t].description;



            /* Tests finaux > des fois rien du tout n'est renseigné (surtout dans contacts et description) */
            let infosPopup = "<h2>" + nomLieu + "</h2>";
            if(contact) infosPopup += "<h3>contacts</h3>" + contact;
            if(adresse) infosPopup += "<h3>adresse</h3>" + adresse;
            if(description) infosPopup += "<h3>description</h3>" + description;
            if(nomType) infosPopup += "<h3>nom du type </h3>" + nomType;

            /* Affichage popup avec infos */
            marker.bindPopup(infosPopup).openPopup();
            


            /* On ajoute le marqueur parmis ceux affichés */
            markers.push(marker);

console.log(newTypes);
            /* On supprime le type de la liste des markers à créer */
            newTypes = newTypes.filter((lefts)=> lefts !== nomType);
            console.log(newTypes);
        }
    }
}

function removeMarkers(oldTypes){
    /* Si le type est signalé comme ayant été affiché et maintenant décoché ... */
    for(let i = 0; i < oldTypes.length; i++){
        for(let m = 0; m < markers.length; m++){
            /* ... on cherche tous les markers auquels il avait donné lieu */
            if(markers[m].options.title === oldTypes[i]) map.removeLayer(markers[m]);

            /* Le marqueur ne fait plus parti des marqueurs affichés */
            markers = markers.filter((lefts)=> lefts !== markers[m]);
        }
console.log(oldTypes);
        /* On supprime le type de la liste des markers à enlever */
        oldTypes = oldTypes.filter((lefts)=> lefts !== oldTypes[i]);
console.log(oldTypes);
    }
}





/* Tableau qui contiendra tous les types qui sont actuellement cochés (checkbox.checked = true)
(c'est le tableau récupéré par python pour renvoyer les infos des lieux à afficher) */
let sousTypesSelectionnes = [];

for (let c = 0; c < sousTypesLieux.length ; c++){
    let nomCheckBox = sousTypesLieux[c];
    /* Pour chaque catégories du tableau on prend son équivalent en tant qu'identifiant */
    let idCheckBox = sousTypesLieux[c].replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');

    let check = document.querySelector("input[type = checkbox][id = " + idCheckBox + "]");
    check.addEventListener('change', () => {

        if(check.checked){
            /* Cases cochée > on l'ajoute dans le tableau dédié */
            sousTypesSelectionnes.push(nomCheckBox);
            /* Pour ne pas créer de doublons dans l'update on rempli le tableau qui ne contiendra que les markers de types cochés et encore non affichés */
            newTypes.push(nomCheckBox);
            
            connexion_functions.data_selections(sousTypesSelectionnes,updateMarkers);
        }
        else{
            /* On rajoute le type comme " à être supprimé de l'affichage de la carte " */
            oldTypes.push(nomCheckBox);
            /* On met à jour les markers avant de supprimer le type de la liste des types sélectionnés
            puisque l'update se fait en parcourant le json des types sélectionnés */
            removeMarkers(oldTypes);
            /* Lorsque que l'on décoche une case on l'enlève du tableau qui répertorie les cases cochées */
            sousTypesSelectionnes = sousTypesSelectionnes.filter((lieuxspe)=> lieuxspe !== nomCheckBox);
            
        }
    })
}





/* On récupère le bouton de réinitialisation */
    let reset = document.getElementById("reset");


/* On vide le tableau des marqueurs */
reset.addEventListener('click', () => {

    for (let r = 0; r < sousTypesLieux.length; r++){
        let idCheckBox = sousTypesLieux[r].replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');
        let checks = document.querySelector("input[type = checkbox][id = " + idCheckBox + "]");
        /* On décoche toutes les checkbox */
        checks.checked = false;
    }

    /* On met tous les types jusqu'à présent sélectionnés dans la "corbeille" ... */
    oldTypes = sousTypesSelectionnes;
    /* Et on update l'affichage des marqueurs */
    removeMarkers(oldTypes);
    /* Et on vide (évidemment) le tableau qui contient les types cochés lorsque l'on à décoché toutes les cases 
    > à la fin car sinon pas possible de savoir quels marqueurs supprimer */
    sousTypesSelectionnes = [];

})
