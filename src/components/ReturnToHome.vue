<template>
  <button v-on:click="onReturnToHomeButtonClick">Return to home</button>
</template>

<script>



  export default {
    components: {
    },
    methods: {
      onReturnToHomeButtonClick: function() {
        this.$router.go({name: 'home'});
      }
    }
  }
</script>
