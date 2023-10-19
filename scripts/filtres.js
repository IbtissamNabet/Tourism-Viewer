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

/* Pour tous les éléments de lieux, s'il ne correspond à aucun des éléments de distinct alors on le rajoute à distinct  */
for (let g = 0; g < lieux.length; g++){

    let types = lieux[g].ParentLabel;

    if(! distinctlieuxgen.includes(types))
    distinctlieuxgen.push(types);
}





/* Pour chacun des types généraux de lieux on crée un bouton */
for (let bt = 0 ; bt < distinctlieuxgen.length; bt++){
    let bouton = distinctlieuxgen[bt];

    /* remplacement (en enlevant les espaces des labels et les caractères spéciaux) par expression régulière pour identifier les futurs emplacements dans le html */
    let id = bouton.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");

    /* on sélectionne l'emplacement des filtres sur la page web */
    let recup = document.querySelector(".selection-type-lieux");

    let buttypes = document.createElement("button");
    buttypes.innerText = bouton;
    /* création d'identifiants */
    buttypes.id = id;

    recup.appendChild(buttypes);

    /* création de classes en dessous de chaque bouton de types de lieux pour insérer plus tard les sous types de lieux*/
    const butclasses = document.createElement("div");
    butclasses.classList.add(id);

    recup.appendChild(butclasses);
}





/* Pour chacun des boutons de types de lieux, si cliqué, on affiche ses sous-types sous forme également de boutons */
for (let i = 0 ; i < distinctlieuxgen.length; i++){

    // réécriture de l'élément sous forme d'id
    let idtype = distinctlieuxgen[i].replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");

    // on récupère le bouton que l'on veut vérifier
    let btnLieux = document.getElementById(idtype);
    
    // est ce que le bouton a été cliqué ?
    btnLieux.addEventListener("dblclick", () => {

        // on récupère l'emplacement dédié au sous types de ces lieux
        let recupsoustypes = document.querySelector("." + idtype);

        for (let j = 0; j < lieux.length; j++){

            let idsurtype = lieux[j].ParentLabel.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");
            let soustype = lieux[j].Label;
            
            if(idsurtype === idtype){
                let butsoustypes = document.createElement("button");
                butsoustypes.innerText = soustype;

                recupsoustypes.appendChild(butsoustypes);
            }
        }
    })
}