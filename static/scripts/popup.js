/******************************************************************
 * 
 * Ce fichier contient toutes les fonctions
 * nécessaires à l'affichage des popup sur la carte
 * 
 * ****************************************************************
 */

/* On récupère le fichier json contenant les types de lieux sous forme de tableau */
const rep = await fetch("static/json/data_idf.json");
const lieux = await rep.json();

let marker = L.marker([45.767424, 4.89]).addTo(map);
// bindPopup: lie un pop-up à un objet déclaré dans une variable
// openPopup: affiche le pop-up à l'ouverture
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");