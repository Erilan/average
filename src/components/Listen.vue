<template>
  <div class="Menu">
    <div class="Menu-logo">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="153" height="44" viewBox="0 0 153 44">
        <image width="153" height="44" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAAAsCAMAAABBhepOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAD///////////////////////////////////////////////////////////8AAAC3K8SQAAAAD3RSTlMAd7tmzBGIqu6Z3UQiVTPlX936AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAUxJREFUWMPN2c2ygyAMBWDDj6K0nvd/2wtiZ7o8uU7PkI1dRPmgE0voYggxIVnOa2ofFzZiWL8uRPodG/10w4hUrsvOytqMvi5E+h1seui3HLHu7Z5idQPqb2TVrjjALfGQlTzm1E2BXjSn7A7AHLLr0RXwDfQv2Yv9TuSyNsprTpmNUSaUrWy2XEYXmFxWyNKUyzLwnlPWBjnnlEW2NOUyQ5pUFsDtNPSygy1NuQxg939iWfXtsYSyN12aapnhmFS28bliWaJLUy3jS1Mso7faclkbIs8pa10amyqW7a4XjFIWyC5YL2O7YLksO0pTK6O7YLmM7oLlMroLlsv4Yya1jN9qq2We0pTKXKUplfFdsFrGd8FqGd8FP5XFcfJMvwscW+2Hslz6aX2gK679ntcrfi7r3WMPciXOzz8VXB08ki3nVhDIk7rPPByyPwM7H2ST63TFAAAAAElFTkSuQmCC"/>
      </svg>
    </div>
    <div class="Menu-gradient"></div>
  </div>

  <div class="Player active" v-if="deezerStore.isPlaying">
    <p class="Player-informations">
      {{ deezerStore.currentSong.artist.name }} - {{ deezerStore.currentSong.title_short }}
    </p>
    <div class="Player-controls">
      <button class="Player-pause" v-if="deezerStore.currentSongIsPlaying" v-on:click="onPauseButtonClick()"></button>
      <button class="Player-play" v-if="deezerStore.currentSongIsPaused" v-on:click="onPlayButtonClick()"></button>
      <div class="Player-bar">
        <img class="Player-position" src="/static/img/progress.png" />
      </div>
      <span class="Player-time">{{ Math.floor(deezerStore.currentSong.duration / 60) }}:{{ Math.floor(deezerStore.currentSong.duration % 60) }}</span>
    </div>
  </div>

  <div class="Bottom">
    <button
      class="Bottom-context Bottom-context--tag active"
      v-on:click="onTagButtonClick"
    ></button>
    <button
      class="Bottom-context Bottom-context--play"
    ></button>
  </div>

  <div class="Map">
    <div class="Map-actions">
      <button class="Map-action Map-action--center" v-on:click="mapStore.centerMap(false)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 50 50">
          <image width="50" height="50" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABsFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAABbV5hmAAAAjnRSTlMAFUNukLDI3O7zJGum4SiE2xJsJ5n3JqT9pRSV+wFj72Qgv1zxB5sYyhksOD438i3wGuMcBpy+ZRPtlJr2cnPXM4kjz4Ayp7wf4qpbEX/lmEjN1IU2HkX8wfStXrqx6EwID/qyy+CIOQJY3xYFYT8bjiWSfaLEkQxEL1MXdr2TinjZNNgpll3JIsCL5HDdQ8k5IwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAPUSURBVGjevZp5WxJRFMYvgiyCiqCmAuGe+25gGi6pLbaYlmalWUCbtpfZXlZu6fnMzbDINjDnzMyd9+9z+T0M3HfOxhhShiKjqdhssdoAbFaLudhkLDJgz6JUYneUgoRKHfYSbQhl5U4oIGd5mVpChcsMsjK7KlQg3JVV8ghRVZVuhYjqUzU4hKia2moFiDqPF48Q5fXUERG+034aQpS/3kdhNDTSEaIaG/CMpmZlDIDmJiSipVUpQlRrC4Zxpk0NA6CtXZ7RUaqOIZhNhxyj06qWAWDtLMzosqlnCDbdVYjRrQkDoKc7P6O3TxsGQF9vPkb/gFYMgIFBacYQwtXxMg9JQlTdwVwNSzGatGUASDhMg2K/yqfmHLf0ndWaIXhytvPXa88ACGQygiM8INZgBuQcDwaAJ51RTXyfY+VNzy5q+TAAHCmGm5D70FSTSi9HeTEARpOMujF+kLFkMnaeHwMglICM84SMxxkTPBkAEzHIJF/IZAziVP9BheQUGVN8GQBTAsSu+PSF6ZlBRJhdgMwqAngvGi8Jh2cQobNC3GU6oefK3NX4P/MaInpAqM+phOs35lOJ+03MCQMrIhEWFm+lv1Nvow4tMSMasHwnNJX10nahDhqZCUdYuXtPou68jzprYquIqLXRB+tSqdrDRyhImEXkQqKPnzxl0nqGewoR9lwuZIPlFfKKRZlsvV6ft3Gyiaw0/KxHPmgkMrv44uWrnE7AEo4BNoYMFFS1sPraPv9m8wTyFnuSAEnIe5IWoutkzOPKUrK2xZhj4nHRGzVzDG+OMfnl/8I5ekcxR1FR+cuYo/cUcxQVQdlKpj5QzFFUGGuQaVqjmKOoLYLVn+gjwRxFGdk2HfKJYI6iluivX4DPBHMU9YUxeq/jK8EcIZZIKEiJKgnmCPGUiJ7cfRNOfceHuxSlqVGKOcbTVGahQpaH8OYIYIndqh/kr1LGpvHBkwqLoJ/BX/jgHR3Kud8Jzw7xhCQLU11KbF2aBayMX9vjTyqDcvCCpDVw+LWiMuZpHj6QvxkZZ1CDYUOu/JntQRbgAclqdDKfwlFZIeW0bHVpPnNoo+9K1TTD2jIkBwKsZU9LRiTPKHBQhyGNPuMmxjo1GpzZCg4B9RgBCt9FwYg8W36ZYabwu6gfy/bKMRhrVztg7pdnMLau6lYOr2MYTNXQfxeJELR/oIxxsI9nCM4fULKIESAtYjBdVkpEuWspyzEOpTs4hDUfNVtLhhAiGx8Pqd702jksvHp1uKOWEFeJ3SH5qvmn2RJZQhvbR1vhvWPrCsCK9XgvvHW0vYE9+x9ZJC7UPF5FcgAAAABJRU5ErkJggg=="/>
        </svg>
      </button>

      <button class="Map-action Map-action--roaming" data-state="inactive" v-on:click="onActivateRoamingButtonClick">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 50 50">
          <image width="50" height="50" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACOlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADXjgjoAAAAvHRSTlMAFUNukLDI3O7zJGum4SiE2xJsJ5n3JqT9pRSV+wFj72Qgv1zxB5sYyhksOD438i3wGuMcBpy+ZRPtlJr2cnPXyUozPTyJKpb4sm9AEH3Q5BHRI0H8MgyI+in0p+vqqA2ejWCCg+Ie+cBH/ki0kg7lUJNVCrWFRQtaTRu97AVnaKm8sek6OctZH98/rS5G4BZmHV9YdAMEeHltF16GVyuuCedOkba3RFLCn4t+gPVCNHfodXZwIopL2F0I3ZvjAJAAAAABYktHRACIBR1IAAAACXBIWXMAAAsS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"/>
        </svg>
      </button>
    </div>
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

      if (!this.mapStore.centerPosition) {
        this.$router.go({name: 'home'});
      }

//      this.deezerStore.initDeezerPlayer()

      this.mapStore.disableTagClickListener()
      this.mapStore.loadSongMarkers()
      this.mapStore.enableListenDragListener()

      this.mapStore.showSearch = false
      this.mapStore.showSearchInput = false
      this.mapStore.showSearchResults = false
      this.mapStore.showSearchSelectedSong = false

      window.average.triggerPlaySong = (songId) => {
        this.deezerStore.deactivateRoaming()
        this.deezerStore.playSong(songId)
      }

      DZ.ready(() => {
        this.deezerStore.ready = true
      });

    },
    methods: {
      onTagButtonClick: function() {
        this.$router.go({name: 'tag'});
      },
      onListenButtonClick: function() {
        this.$router.go({name: 'listen'});
      },
      onActivateRoamingButtonClick: function() {
        this.deezerStore.activateRoaming()
      },
      onPauseButtonClick: function() {
        this.deezerStore.pauseSong()
      },
      onPlayButtonClick: function() {
        this.deezerStore.unpauseSong()
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