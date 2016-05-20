<template>

  <return-to-home></return-to-home>

  <h2>Listen</h2>

  <div id="player"></div>

  <button v-if="!deezerStore.roaming && deezerStore.ready" v-on:click="onActivateRoamingButtonClick">Roaming</button>
  <button v-if="deezerStore.roaming" v-on:click="onDeactivateRoamingButtonClick">No roaming</button>

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
      this.deezerStore.initDeezerPlayer()

      this.mapStore.disableTagClickListener()
      this.mapStore.loadSongMarkers()
      this.mapStore.enableListenDragListener()

      window.average.triggerPlaySong = (songId) => {
        this.deezerStore.deactivateRoaming()
        this.deezerStore.playSong(songId)
      }

      DZ.ready(() => {
        this.deezerStore.ready = true
      });

    },
    methods: {
      onActivateRoamingButtonClick: function() {
        this.deezerStore.activateRoaming()
      },
      onDeactivateRoamingButtonClick: function() {
        this.deezerStore.deactivateRoaming()
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