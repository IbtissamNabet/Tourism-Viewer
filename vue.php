<!DOCTYPE html>
<html>

<!-- Donne la taille de la carte-->
<div id="map" style="width: 600px; height: 400px;">  </div>

<!-- Les variables se trouvent dans le fichier leaflet.js -->
<script type="text/javascript" src="leaflet.js"></script>
<script>                                   
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        /// bindPopup: lie un pop-up à un objet déclaré dans une variable
        /// openPopup: affiche le pop-up à l'ouverture de la page

        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        circle.bindPopup("I am a circle.");
        polygon.bindPopup("I am a polygon.");

        // openOn: comme addOn(dans leaflet.js), sauf qu'il gère automatiquement 
        // les ouvertures et fermetures de pop-up quand tu en cliques sur un autre
        var popup = L.popup()
        .setLatLng([51.513, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(map);


        map.on('click', onMapClick);

</script>

</html>