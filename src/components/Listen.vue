<template>

  <return-to-home></return-to-home>

  <h2>Listen</h2>

  <div class="map-container">
    <g-map></g-map>
  </div>


</template>

<script>

  import returnToHome from './ReturnToHome'
  import gMap from './GMap'

  import MapStore from './../store/MapStore'
  import DeezerStore from './../store/DeezerStore'

  export default {
    data() {
      return {
        mapStore: MapStore,
        deezerStore: DeezerStore
      }
    },
    components: {
      returnToHome,
      gMap,
    },
    ready: function() {
//      load(GOOGLE_API_KEY)
      this.mapStore.loadSongMarkers()
    },
    methods: {
//      onGMapClick(position) {
//        this.mapStore.setCurrentMarker(position)
//      },
    }
  }
</script>

<style>
  .map-container {
    width: 400px;
    height: 400px;
  }
</style>