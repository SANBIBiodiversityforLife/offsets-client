// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vue2Leaflet from 'vue2-leaflet';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

// Axios is used to do http gets instead of the default library as it also allows one to do an options query
Vue.prototype.$http = axios;

// Components registered for Leaflet. For some reason we can't do them in DevelopmentList.vue
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-geojson', Vue2Leaflet.GeoJSON);

// This does not work yet
// L.Icon.Default.imagePath = "/images/";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
