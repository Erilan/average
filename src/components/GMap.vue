<template>
  <div id="map"></div>
</template>

<script>

  import MapStore from './../store/MapStore'

  export default {
    components: {
    },
    data() {
      return {
        mapStore: MapStore,
      }
    },
    methods: {
//      initMap() {
//        var map = new google.maps.Map(document.getElementById('map'), {
//          center: this.mapStore.map.center,
//          zoom: 8
//        })
//
//        google.maps.event.addListener(map, 'click', (position) => {
//          this.mapStore.setCurrentTagMarker(position)
//        })
//      }
    },
    ready() {
//      this.initMap();
      this.mapStore.initMap()
    }
  }
</script>

<style type="text/css">
  #map {
    width: 100%;
    height: 100%;
  }
</style>