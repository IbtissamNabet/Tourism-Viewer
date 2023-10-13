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
let distinctlieux = [];

/* Pour tous les éléments de lieux, s'il ne corespond
à aucun des éléments de distinct alors on le rajoute à distinct  */
for (let i = 0; i < lieux.length; i++){

    let types = lieux[i].ParentLabel;

    if(distinctlieux.includes(types) === false)
        distinctlieux.push(types);
}


/* Pour chacun des types généraux de lieux on crée un bouton */
for (let j = 0 ; j < distinctlieux.length; j++){
    let bouton = distinctlieux[j];

    const recup = document.querySelector(".selection-type-lieux")

    const test1 = document.createElement("button");
    test1.innerText = bouton;

    recup.appendChild(test1);
}