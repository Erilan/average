<template>
  <h2>Home</h2>

  <button
    v-on:click="onTagButtonClick"
    v-if="geolocation"
  >Tag</button>
  <button
    v-on:click="onListenButtonClick"
    v-if="geolocation"
  >Listen</button>

  <p v-if="geolocation == null">Loading...</p>
  <p v-if="geolocation == false">Average a besoin de connaître votre geolocaiton pour fonctionner.</p>

</template>

<script>

  import MapStore from './../store/MapStore'

  export default {
    data() {
      return {
        mapStore: MapStore,
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
        this.mapStore.setCurrentPosition(position)
        console.log(position)
      },
      handleGeolocationDenied() {
        this.geolocation = false
      }
    },
    ready() {
      if (!this.geolocation)
      navigator.geolocation.getCurrentPosition(this.initMapCenterPosition, this.handleGeolocationDenied)
    }
  }
</script>
