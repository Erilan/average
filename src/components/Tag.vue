<template>

  <return-to-home></return-to-home>

  <h2>Tag</h2>

  <div class="map-container">
    <g-map></g-map>
  </div>

  <p v-if="!mapStore.currentTagMarker">
    - Sélectionnez un lieu
  </p>

  <p v-if="deezerStore.searchResult.length == 0">
    - Cherchez une chanson ou un artiste
  </p>
  <input type="text" v-on:input="onSearchInputChange" v-model="deezerStore.searchInput">

  <br>

  <p v-if="!deezerStore.selectedSongId">
    - Choisissez un titre
  </p>
  <select v-if="deezerStore.searchResult.length" size="5" v-model="deezerStore.selectedSongId">
    <option v-for="song in deezerStore.searchResult" value="{{ song.id }}">
      {{ song.artist.name }} - {{ song.title_short }}
    </option>
  </select>

  <br>
  <button
    v-if="deezerStore.selectedSongId != '' && mapStore.currentMarker != false"
    v-on:click="onTagButtonClick"
  >TAG !</button>

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
      this.mapStore.enableTagClickListener()
    },
    methods: {
      onSearchInputChange() {
        this.deezerStore.triggerSearch()
      },
      onTagButtonClick() {
        this.deezerStore.tagSong()
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