/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * nécessaires à la gestion des filtres à appliquer sur la carte
 * 
 * ****************************************************************
 */

/* On récupère le fichier json contenant les types de lieux sous forme de tableau */

const rep = await fetch('json/types.json');
const lieux = await rep.json();

/* Tableau qui contiendra les types généraux des lieux */
let distinctlieuxgen = [];

/* Pour tous les éléments de lieux, s'il ne corespond
à aucun des éléments de distinct alors on le rajoute à distinct  */
for (let i = 0; i < lieux.length; i++){

    let types = lieux[i].ParentLabel;

    if(! distinctlieuxgen.includes(types))
    distinctlieuxgen.push(types);
}


/* Pour chacun des types généraux de lieux on crée un bouton */
for (let j = 0 ; j < distinctlieuxgen.length; j++){
    let bouton = distinctlieuxgen[j];

    const recup = document.querySelector(".selection-type-lieux")

    const buttypes = document.createElement("button");
    buttypes.innerText = bouton;
    /* Création d'identifiants en enlevant les espaces des labels */
    buttypes.id = bouton.replace(/\s/g,'');

    recup.appendChild(buttypes);

    /* création de classes en dessous de chaque boutons de types
    de lieux pour insérer plus tard les sous types de lieux*/
    const butclasses = document.createElement("div");
    butclasses.classList.add(buttypes.id);

    recup.appendChild(butclasses);
}

/* Tableau qui contiendra les types spécifiques des lieux */
let distinctlieuxspe = [];

/* Pour tous les éléments Label de lieux, s'il ne correspond
à aucun des éléments de distinct alors on le rajoute à distinct  */
for (let i = 0; i < lieux.length; i++){

    let types = lieux[i].Label;

    if(! distinctlieuxspe.includes(types))
        distinctlieuxspe.push(types);
}

// console.log(distinctlieuxspe);

// then affichage des boutons en déroulant