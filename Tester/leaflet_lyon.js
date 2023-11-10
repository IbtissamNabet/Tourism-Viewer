var map = L.map('map').setView([45.75, 4.85], 13);

//var marker = L.marker([45.75, 4.85]).addTo(map);
//var centerpoint = [45.767422, 4.893609];

/*var circle = L.circle(centerpoint, { //conserver l'ordre longitude/latitude de Google Maps (I swear I'm done with this)
    color: 'white',
    fillColor: '#f03',
    fillOpacity: 0,
    radius: 2500
}).addTo(map);
*/

var poly = L.polygon([[
    [45.775965 + 0.01, 4.889241 + 0.01],
    [45.775965 + 0.01, 4.889241 -0.01],
    [45.775965 - 0.01, 4.889241 -0.01],
    [45.775965 - 0.01, 4.889241 + 0.01],
    [45.775965 + 0.01, 4.889241 + 0.01]]]
).addTo(map);


/**var polygon = turf.polygon([[
    [45.775965 + 0.02, 4.889241 + 0.02],
    [45.775965 + 0.02, 4.889241 -0.02],
    [45.775965 - 0.02, 4.889241 -0.02],
    [45.775965 - 0.02, 4.889241 + 0.02],
    [45.775965 + 0.02, 4.889241 + 0.02]]]
);*/

var polygon = turf.polygon([[
    [45.775965 + 0.01, 4.889241 + 0.01],
    [45.775965 + 0.01, 4.889241 -0.01],
    [45.775965 - 0.01, 4.889241 -0.01],
    [45.775965 - 0.01, 4.889241 + 0.01],
    [45.775965 + 0.01, 4.889241 + 0.01]]]
);

/*
var popup = L.popup();
///affiche dans un pop-up les coordonnées s'il n'y a pas de message
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
*/
// For the itinéraire de La Doua au parc des cerisiers (?)
/**L.Routing.control({
    waypoints: [
      L.latLng(45.78, 4.87),
      L.latLng(45.77, 4.81)
    ],
    routeWhileDragging: true,
  }).addTo(map);
*/
let selectedTile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

 // Creation de l'objet geojson
let geojsonFeature = {
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "COMMERCE",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.893609 , 45.767422] //quand tu cherches la latitude et la longitude, c'est l'inverse qu'il faut mettre dans les crochets
      },
  }, {
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "PUBLIC",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.889241, 45.775965]
      },
  }, {
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "AUTRE",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.88257, 45.78954]
      },
  }, {
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "AUTRE",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.883753, 45.770472]
      },
  }, {
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "PUBLIC",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.881958, 45.770737]
      },
  }, {
      "type": "Feature",
      "properties": {
          "shape": "Marker",
          "name": "Unnamed Layer",
          "category": "default",
          "type": "COMMERCE",
          "in_polygon" : true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [4.883721, 45.769294]
      },
  }
]
};

// Initialisation de la carte

// Ajout un fichier geoJSON à la carte
let layers = L.geoJSON(geojsonFeature).addTo(map);

//var layerForDelete = L.geoJSON();
//layerForDelete.addData(geojsonFeature);

//baseMap = selectedTile pour la carte de base



/*
 * Classe gérant l'interface utilisateur de filtrage
 */
let MyControlClass =  L.Control.extend({

  options: {
    position: 'topleft'
  },

onAdd: function(map) {

  this.map = map;

  let div = L.DomUtil.create('div', 'leaflet-bar my-control');

  let title = L.DomUtil.create('h3', '', div);
  title.innerHTML = "Filter : ";

// Checkbox des types
  let divType = L.DomUtil.create('div', '', div);
  divType.innerHTML = "Type : ";

  let divTypeOther = L.DomUtil.create('div', '', divType);
  let inputOther = L.DomUtil.create('input', '', divTypeOther);
  inputOther.type = "checkbox";
  inputOther.checked = true;
  let labelOther = L.DomUtil.create('label', '', divTypeOther);
  labelOther.innerHTML = " AUTRE";

  let divTypePublic = L.DomUtil.create('div', '', divType);
  let inputPublic = L.DomUtil.create('input', '', divTypePublic);
  inputPublic.type = "checkbox";
  inputPublic.checked = true;
  let labelPublic = L.DomUtil.create('label', '', divTypePublic);
  labelPublic.innerHTML = " PUBLIC";

  let divTypeBusiness = L.DomUtil.create('div', '', divType);
  let inputBusiness = L.DomUtil.create('input', '', divTypeBusiness);
  inputBusiness.type = "checkbox";
  inputBusiness.checked = true;
  let labelBusiness = L.DomUtil.create('label', '', divTypeBusiness);
  labelBusiness.innerHTML = " COMMERCE";

  let divTypeItin = L.DomUtil.create('div', '', divType);
  let inputItin = L.DomUtil.create('input', '', divTypeItin);
  inputItin.type = "checkbox";
  inputItin.checked = true;
  let labelItin = L.DomUtil.create('label', '', divTypeItin);
  labelItin.innerHTML = " ITINERAIRE";


  // Bouton de lancement de l'action de filtrage
  var buttonFilter = L.DomUtil.create('button', 'button-class', div);
  buttonFilter.innerHTML = "Filter";

  L.DomEvent.on(buttonFilter, 'click', function() { this.filter(inputOther.checked, inputPublic.checked, inputBusiness.checked, inputItin.checked)},this);

  return div;
},

filter(inputOtherChecked, inputPublicChecked, inputBusinessChecked, inputItinChecked){

  map.removeLayer(layers);

  layers = L.geoJSON(geojsonFeature,
  {
      filter: function (feature) {
          
          if(feature.properties.type == "AUTRE" && !inputOtherChecked) {
           return false;
          }
          else if(feature.properties.type == "PUBLIC" && !inputPublicChecked) {
           return false;
          }
          else if(feature.properties.type == "COMMERCE" && !inputBusinessChecked) {
           return false;
          }

          if(feature.properties.in_polygon && !inputItinChecked)
            {
                 
                if(feature.properties.in_polygon && !inputItinChecked)
                {
                    layers.eachLayer(function(layer)
                    {
                        if (!turf.booleanPointInPolygon(feature.geometry.coordinates,polygon))
                        {
                            feature.properties.in_polygon = false;
                            layer.deleteFeature(layer.feature.geometry.type);
                        }

                        return turf.booleanPointInPolygon(feature.geometry.coordinates,polygon);
                    });
                    
                }

                return feature.properties.in_polygon;
                
            }
          
            
          return true;

      }
  }).addTo(map);
},

onRemove: function(map)
{
}
});


// Ajout de l'interface utilisateur à la carte
let myControl = new MyControlClass().addTo(map);

