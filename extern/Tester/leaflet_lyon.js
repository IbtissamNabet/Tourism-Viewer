var map = L.map('map').setView([45.75, 4.85], 13);
//var marker = L.marker([45.75, 4.85]).addTo(map);

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

//Pour les clusters
var markers = L.markerClusterGroup();

// Ajout un fichier geoJSON à la carte
//let layers = L.geoJSON(geojsonFeature).addTo(map);
let layers = L.geoJSON(geojsonFeature);

//cluster markers
markers.addLayer(layers);
map.addLayer(markers);

//var locations = L.geoJSON(geojsonFeature);
//let mapId = {};
/*let geo = L.geoJSON(geojsonFeature,{
    onEachFeature: function(feature,layer)
    {
        mapId[feature.geometry.coordinates] = L.stamp(layer);
        console.log(L.stamp(layer));
    }
}).addTo(map);*/

/*console.log(mapId);
for (var key in mapId){
    console.log(key);
}*/

/*
 * Classe gérant l'interface utilisateur de filtrage
 */
let MyControlClass =  L.Control.extend({

  options: {
    position: 'topleft'
  },
  

onAdd: function(map,markers) {

  this.map = map;

  this.markers = markers;

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

  markers.removeLayer(layers);
  map.removeLayer(markers);
 

  layers = L.geoJSON(geojsonFeature,
  {
    
    /*onEachFeature: function(feature,layer)
    {
        mapId[feature.geometry.coordinates] = L.stamp(layer);
        console.log(L.stamp(layer));
    },*/

      filter: function (feature) {
                
          
          if(feature.properties.type == "AUTRE" && !inputOtherChecked ) {
            /*for (var key in mapId)
            {
                if (mapId[key] == feature.geometry.coordinates)
                map.removeLayer(geo.getLayer(mapID[key]));
            }*/
           return false;
          }
          else if(feature.properties.type == "PUBLIC" && !inputPublicChecked ) {
           return false;
          }
          else if(feature.properties.type == "COMMERCE" && !inputBusinessChecked ) {
           return false;
          }

          if(feature.properties.in_polygon && !inputItinChecked)
           {
            //convertir les coordonnées sous le même format que le polygone
            var coord = [feature.geometry.coordinates[1],feature.geometry.coordinates[0]];
            
            console.log(feature.properties.type);
            console.log(coord);
            console.log(polygon.properties);
            console.log(turf.booleanPointInPolygon(coord,polygon));
            if (turf.booleanPointInPolygon(coord,polygon) == false)
            {
                feature.properties.in_polygon = false;
                console.log(feature.properties.in_polygon);
            }

            else feature.properties.in_polygon = true;
        }
          
            
          return true;

      }
  })
  markers.addLayer(layers);
  map.addLayer(markers);
},

onRemove: function(map,markers)
{
}
});


// Ajout de l'interface utilisateur à la carte
let myControl = new MyControlClass().addTo(map);

