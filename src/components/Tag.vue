<template>

  <return-to-home></return-to-home>

  <h2>Tag</h2>

  <div class="map-container" v-if="showMap">
    <map v-bind:center.sync="mapStore.state.map.center"
         v-bind:zoom.sync="mapStore.state.map.zoom"
         v-on:g-click="onGMapClick"
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


  <input type="text" v-on:input="onSearchInputChange" v-model="deezerStore.searchInput">

  <br>

  <select v-if="deezerStore.searchResult.length" size="5" v-model="deezerStore.selectedSongId">
  <!--<select size="5" v-model="deezerStore.selectedSong">-->
    <option v-for="song in deezerStore.searchResult" value="{{ song.id }}">
    <!--<option v-for="result in deezerStore.searchResult">-->
      <!--{{ $key }}-->
      {{ song.artist.name }} - {{ song.title_short }}
    </option>
  </select>

  <button
    v-if="deezerStore.selectedSongId != '' && mapStore.state.currentMarker != false"
    v-on:click="onTagButtonClick"
  >TAG !</button>

</template>

<script>

  import returnToHome from './ReturnToHome'
  import {load, Map, Marker} from 'vue-google-maps'

  import MapStore from './../store/MapStore'
  import DeezerStore from './../store/DeezerStore'

  export default {
    data() {
      return {
        mapStore: MapStore,
        showMap: false,
        deezerStore: DeezerStore
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
      onGMapClick(position) {
        this.mapStore.setCurrentMarker(position)
      },
      onSearchInputChange() {
        this.deezerStore.triggerSearch()
      },
      onTagButtonClick() {
        this.deezerStore.tagSong(mapStore.currentMarker.position)
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