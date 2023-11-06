/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * nécessaires à l'affichage des popup sur la carte
 * 
 * ****************************************************************
 */

/* On récupère le fichier json contenant les types de lieux sous forme de tableau */
const rep = await fetch('json/data_idf.json');
const lieux = await rep.json();

let marker = L.marker([45.767424, 4.89]).addTo(map);
// bindPopup: lie un pop-up à un objet déclaré dans une variable
// openPopup: affiche le pop-up à l'ouverture
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

/*

var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});

<input type="checkbox" name="checkbox" />


function gBox(nbCheck){
    if(document.getElementById(nbCheck).checked == true){
        document.getElementById('formulaire1').submit();
    }
    else{
        alert('Checkbox non coché !');
    }
}
	
<form method="post" id="formulaire1" action="">
<input type="checkbox" id="check1" />Checkbox 1
<input type="submit" onClick="gBox('check1'); return false;" />
</form> 

*/