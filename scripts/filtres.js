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
    let idBouton = nomBouton.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-").replace(/\(.*?\)/g,'');

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
        let idSurType = lieux[k].ParentLabel.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-").replace(/\(.*?\)/g,'');
        /* Chaque checkbox a un identifiant ... */
        let idSousType = lieux[k].Label.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-").replace(/\(.*?\)/g,'');
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
    let idBoutonLieu = typesLieux[j].replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-").replace(/\(.*?\)/g,'');
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





for (let c = 0; c < sousTypesLieux.length ; c++){
    /* Pour chaque catégories du tableau on prend son équivalent en tant qu'identifiant */
    let idCheckBox = sousTypesLieux[c].replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-").replace(/\(.*?\)/g,'');

    let check = document.querySelector("input[type = checkbox][id = " + idCheckBox + "]");
    check.addEventListener('change', () => {
        if(check.checked) console.log("est coché");
        else console.log("est décoché");
    })
}