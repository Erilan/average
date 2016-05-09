<template>

  <return-to-home></return-to-home>

  <h2>Tag</h2>

  <div class="map-container" v-if="showMap">
    <map v-bind:center.sync="mapStore.state.map.center"
         v-bind:zoom.sync="mapStore.state.map.zoom"
         v-on:g-click="test"
    >
      <marker
        v-for="marker in mapStore.state.markers"
        :position.sync="marker.position"
        :clickable.sync="true"
        :draggable.sync="true"
      ></marker>
      <marker
        v-if="mapStore.state.currentMarker"
        :position.sync="mapStore.state.currentMarker"
        :clickable.sync="true"
        :draggable.sync="true"
      ></marker>
    </map>
  </div>

  <div
    v-if="mapStore.state.currentMarker"
  >
    --{{ mapStore.state.currentMarker }}--
  </div>

</template>

<script>

  import returnToHome from './ReturnToHome'
  import {load, Map, Marker} from 'vue-google-maps'

  import MapStore from './../store/MapStore'

  export default {
    data() {
      return {
        mapStore: MapStore,
        showMap: false
      }
    },
    components: {
      returnToHome,
      Map,
      Marker
    },
    ready: function() {
      load(GOOGLE_API_KEY)
      navigator.geolocation.getCurrentPosition(this.initMapCenterPosition)
    },
    methods: {
      initMapCenterPosition(position) {
        this.showMap = true
        this.mapStore.setCurrentPosition(position)
      },
      test(a) {
        this.mapStore.setCurrentMarker(a)
      }
    }
  }
</script>

<style>
  .map-container {
    width: 400px;
    height: 400px;
  }
</style>