<template>
  <button v-on:click="onReturnToHomeButtonClick">Return to home</button>
</template>

<script>

  import DeezerStore from './../store/DeezerStore'

  export default {
    data() {
      return {
        deezerStore: DeezerStore
      }
    },
    methods: {
      onReturnToHomeButtonClick: function() {
        this.deezerStore.ready = false
        this.deezerStore.roaming = false
        this.$router.go({name: 'home'});
      }
    }
  }
</script>
