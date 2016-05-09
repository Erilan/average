<template>
  <h2>Home</h2>

  <button v-on:click="onTagButtonClick">Tag</button>
  <button v-on:click="onListenButtonClick">Listen</button>


</template>

<script>

  export default {
    components: {
    },
    methods: {
      onTagButtonClick: function() {
        this.$router.go({name: 'tag'});
      },
      onListenButtonClick: function() {
        this.$router.go({name: 'listen'});
      }
    }
  }
</script>
