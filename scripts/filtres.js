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




/* création d'un tableau où seront contenus les soustypes affichés pour ne pas que l'on puisse
créer de doublons en cliquant trop de fois d'affilé le premier bouton déroulant */
let distinctlieuxspe = [];





/* Pour chacun des boutons de types de lieux, si cliqué, on affiche ses sous-types sous forme également de boutons */
for (let i = 0 ; i < distinctlieuxgen.length; i++){

    // réécriture de l'élément sous forme d'id
    let idtype = distinctlieuxgen[i].replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");

    // on récupère le bouton que l'on veut vérifier
    let btnLieux = document.getElementById(idtype);
    
    // est ce que le bouton a été cliqué ?
    btnLieux.addEventListener("click", () => {

        // on récupère l'emplacement dédié au sous types de ces lieux
        let recupsoustypes = document.querySelector("." + idtype);

        for (let j = 0; j < lieux.length; j++){

            let idsurtype = lieux[j].ParentLabel.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");
            let idsoustype = lieux[j].Label.replace(/\s/g,'-').replace(/`|"|‘|'|,/g,"-");
            let soustype = lieux[j].Label;
            
            /* on compare si un élément du json est bien une sous catégorie du bouton type sur lequel on a cliqué */
            if(idsurtype === idtype){
                /* on vérifie si le soustype de lieu que l'on s'apprète à afficher n'est pas déjà créer */
                if(! distinctlieuxspe.includes(soustype)){

                    // création d'une classe pour englober la checkbox et son label et surtout pouvoir les "removve" par la suite
                    let divsoustypes = document.createElement("div");
                    divsoustypes.id = "c" + idsoustype;
                    
                    // définition de l'input et du type checkbox
                    let butsoustypes = document.createElement("input");
                    butsoustypes.type = 'checkbox';
                    butsoustypes.id = idsoustype;

                    // définition du label associé à la checkbox
                    let namebutsoustypes = document.createElement("label");
                    namebutsoustypes.innerText = soustype;
                    
                    recupsoustypes.appendChild(divsoustypes);
                    divsoustypes.appendChild(butsoustypes);
                    divsoustypes.appendChild(namebutsoustypes);
                    distinctlieuxspe.push(soustype);
                }
                /* si le bouton est déjà déroulé alors on le click signifie "remballer la liste" */
                else{
                    document.getElementById("c" + idsoustype).remove();
                    // on supprime l'élement de la liste des éléments affichés
                    distinctlieuxspe = distinctlieuxspe.filter((lieuxspe)=> lieuxspe !== soustype);
                }
            }
        }
    })
}