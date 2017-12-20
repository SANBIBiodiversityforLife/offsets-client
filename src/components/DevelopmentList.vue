<template>
  <div>    
    <div id="map">
      <v-map ref="map" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      </v-map>    
    </div>

    <table class="table">
      <thead>
        <th scope="col">SANBI code</th><th scope="col">Use</th><th scope="col">Location description</th><th scope="col">&nbsp;</th></tr>
      </thead>
      <tbody v-for="dev in developments">
        <tr>
          <td>{{ dev.properties.code }}</td>
          <td>{{ dev.properties.get_use_display }}</td>
          <td>{{ dev.properties.location_description }}</td>
          <td>
            <button type="button" class="btn btn-dark pan-button" :data-leaflet-id="dev.id" v-on:click="panMap(dev.id)">Pan to location</button>
            <a href="" class="btn btn-info" role="button">View offsets</a>
            <a href="" class="btn btn-primary" role="button">View details</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

// Default vue 
export default {
  name: 'DevelopmentList',
  data () {
    return {
      developments: [],
      geojsonLayer: null,
      map: null,
      
      // All leaflet variables below
      show: false,
      zoom:6,
      center:[-29.517238, 25.450379],
      options: {
        style: function () {
          return {
            weight: 2,
            color: '#ECEFF1',
            opacity: 1,
            fillColor: '#e4ce7f',
            fillOpacity: 1
          }
        }
      },
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }

  },
  methods: {
    // Function to pan the map when a button is clicked
    panMap: function(layerId) {
      var layer = this.geojsonLayer.getLayer(layerId);
      this.map.fitBounds(layer.getBounds(), {padding: [80, 80]});
      layer.openPopup();
    }
  },
  created() {
    // There is some strange javascript scoping thing I don't understand
    // which means that this.developments is not accessible with then http.get.then function. 
    // this is my workaround. TODO find out a nicer way of doing this.
    var developments = this.developments;
    var geojsonLayer = this.geojsonLayer;
    var map = this.map;

    // Retrieve the development list geojson
    this.$http.get('http://127.0.0.1:8000/developments-geo')
    .then(response => {
      // Retrieve the map object and populate it with the geojson results
      map = this.$refs.map.mapObject;
      geojsonLayer = L.geoJson(response.data.results, {
        onEachFeature: function (feature, layer) {
          // Add a pop up for each feature 
          var popup = '<h2><a href="' + feature.id + '">' + feature.properties.code + '</a></h2>' + 'Development: ' + feature.properties.use +
                      '<p>' + feature.properties.location_description + '</p>'
          layer.bindPopup(popup);

          // Assign an artificial ID to the leaflet layer so we can reference it easily in the panMap function
          layer._leaflet_id = feature.id;

          // Add the feature details to the developments list
          developments.push(feature);
        }
      });

      // Add to the map and zoom in
      map.addLayer(geojsonLayer);
      map.fitBounds(geojsonLayer.getBounds(), {padding: [80, 80]});

      // Crazy workaround at the end again
      this.geojsonLayer = geojsonLayer;
      this.map = map;
    })
    .catch (e => {console.log(e)})
    
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* This does not work yet, so we are using a CDN in the index.html file
.leaflet-fake-icon-image-2x {
  background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}
@import "../../node_modules/leaflet/dist/leaflet.css";
*/

#map {
  height: 300px;
  margin-bottom: 20px;
}
</style>
