<template>
  <!--<h2>Home</h2>-->

  <!--<button-->
    <!--v-on:click="onTagButtonClick"-->
    <!--v-if="geolocation"-->
  <!--&gt;Tag</button>-->
  <!--<button-->
    <!--v-on:click="onListenButtonClick"-->
    <!--v-if="geolocation"-->
  <!--&gt;Listen</button>-->

  <div class="Splash">
    <div class="Splash-logo">
      <img src="/static/img/logo_splash.png" />
    </div>

    <p class="Loading-Infos" v-if="geolocation == null">
      Récupération de la position...
    </p>
    <p class="Loading-Infos" v-if="geolocation == false">
      MUZI a besoin de connaître votre emplacement pour fonctionner.
    </p>

    <div class="Splash-informations">
      <span class="Splash-bottom Splash-bottom--version">Version 0.1</span>
      <span class="Splash-bottom Splash-bottom--credits">Powered by Kuzzle</span>
    </div>
  </div>

</template>

<script>

  import MapStore from './../store/MapStore'
  import DeezerStore from './../store/DeezerStore'

  export default {
    data() {
      return {
        mapStore: MapStore,
        deezerStore: DeezerStore,
        geolocation: null
      }
    },
    components: {
    },
    methods: {
      onTagButtonClick: function() {
        this.$router.go({name: 'tag'});
      },
      onListenButtonClick: function() {
        this.$router.go({name: 'listen'});
      },
      initMapCenterPosition(position) {
        this.geolocation = true
        this.mapStore.setCenterPosition(position)
        this.$router.go({name: 'tag'});
      },
      handleGeolocationDenied() {
        this.geolocation = false
      }
    },
    ready() {
      this.deezerStore.initDeezerPlayer()
      if (!this.geolocation) {
        navigator.geolocation.getCurrentPosition(this.initMapCenterPosition, this.handleGeolocationDenied)
      }
    }
  }
</script>
