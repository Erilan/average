<template>

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
      handleGeolocationDenied(error) {
          jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAwe3h6lpqDEsCqUx1UkwCKW6CO-gt_xRg", (success) => {
            this.geolocation = false
            var geoposition = {
              coords: {
                latitude: success.location.lat,
                longitude: success.location.lng
              }
            }
            this.initMapCenterPosition(geoposition)
          })
          .fail(function(err) {
            console.error("API Geolocation error!");
            console.error(err);
          });
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
