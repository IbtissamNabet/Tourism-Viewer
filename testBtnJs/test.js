const jslieux = await fetch('types.json');
const lieux = await jslieux.json();

let distinctlieux = [];

/* Pour tous les éléments de lieux, s'il ne corespond
à aucun des éléments de distinct alors on le rajoute à distinct  */
for (let i = 0; i < lieux.length; i++){

    let types = lieux[i].ParentLabel;

    if(distinctlieux.includes(types) === false)
        distinctlieux.push(types);
}

console.log(distinctlieux)

for (let j = 0 ; j < distinctlieux.length; j++){
    let bouton = distinctlieux[j];

    const recup = document.querySelector(".Boutons")

    const test1 = document.createElement("button");
    test1.innerText = bouton;

    recup.appendChild(test1);
}