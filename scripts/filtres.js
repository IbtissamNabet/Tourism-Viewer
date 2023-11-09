/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * nécessaires à la gestion des filtres à appliquer sur la carte
 * (hors affichage sur carte, filtres liés au popup cf. popup.js)
 * 
 * ****************************************************************
 */

/* On récupère le fichier json contenant les types de lieux sous forme de tableau */
const rep = await fetch('json/types.json');
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
            console.log(nomCheckBox + " est coché"); // pour info dans la console
            console.log(sousTypesSelectionnes); // pour info dans la console
        }
        else{
            /* Lorsque que l'on décoche une case on l'enlève du tableau qui répertorie les cases cochées */
            sousTypesSelectionnes = sousTypesSelectionnes.filter((lieuxspe)=> lieuxspe !== nomCheckBox);
            console.log(nomCheckBox + " est décoché"); // pour info dans la console
            console.log(sousTypesSelectionnes); // pour info dans la console
        }
    })
}




/* On récupère le bouton de réinitialisation */
let reset = document.getElementById("reset");

reset.addEventListener('click', () => {
    for (let r = 0; r < sousTypesLieux.length; r++){
        let idCheckBox = sousTypesLieux[r].replaceAll(/\s|`|"|‘|'|,|\(.*?\)/g,'-');

        let checks = document.querySelector("input[type = checkbox][id = " + idCheckBox + "]");
        /* On décoche toutes les checkbox */
        checks.checked = false;
    }
})