<template>

  <div class="Menu">
    <div class="Menu-logo">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="153" height="44" viewBox="0 0 153 44">
        <image width="153" height="44" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAAAsCAMAAABBhepOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAAD///////////////////////////////////////////////////////////8AAAC3K8SQAAAAD3RSTlMAd7tmzBGIqu6Z3UQiVTPlX936AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAUxJREFUWMPN2c2ygyAMBWDDj6K0nvd/2wtiZ7o8uU7PkI1dRPmgE0voYggxIVnOa2ofFzZiWL8uRPodG/10w4hUrsvOytqMvi5E+h1seui3HLHu7Z5idQPqb2TVrjjALfGQlTzm1E2BXjSn7A7AHLLr0RXwDfQv2Yv9TuSyNsprTpmNUSaUrWy2XEYXmFxWyNKUyzLwnlPWBjnnlEW2NOUyQ5pUFsDtNPSygy1NuQxg939iWfXtsYSyN12aapnhmFS28bliWaJLUy3jS1Mso7faclkbIs8pa10amyqW7a4XjFIWyC5YL2O7YLksO0pTK6O7YLmM7oLlMroLlsv4Yya1jN9qq2We0pTKXKUplfFdsFrGd8FqGd8FP5XFcfJMvwscW+2Hslz6aX2gK679ntcrfi7r3WMPciXOzz8VXB08ki3nVhDIk7rPPByyPwM7H2ST63TFAAAAAElFTkSuQmCC"/>
      </svg>
    </div>
    <div class="Menu-gradient"></div>
  </div>

  <div class="Bottom">
    <button
      class="Bottom-context Bottom-context--tag"
    ></button>
    <button
      class="Bottom-context Bottom-context--play active"
      v-on:click="onListenButtonClick"
    ></button>
  </div>

  <div class="Search visible" v-if="mapStore.showSearch == true">
    <div class="Search-first visible" v-if="mapStore.showSearchInput == true">
      <input type="text" value="" class="Search-input" placeholder="Titre, album, artiste..." v-model="deezerStore.searchInput"/>
      <button v-bind:class="['Search-submit', (deezerStore.searchInput.length >= 3) ? 'active' : '']" v-on:click="onMakeSearchButtonClick"></button>
    </div>

    <div class="Search-results visible" v-if="mapStore.showSearchResults">
      <ul class="Search-list">
        <li class="Search-item" v-for="song in deezerStore.searchResult" v-on:click="onSongResultClick(song.id, song.duration, song.title_short, song.artist)">
          <p class="Search-artist">{{ song.artist.name }}</p>
          <p class="Search-track">{{ song.title_short }}</p>
        </li>
      </ul>
    </div>

    <div class="Search-choice visible" v-if="mapStore.showSearchSelectedSong">
      <div class="Search-cover" v-bind:style="{ 'background-image': 'url(' + deezerStore.selectedSongArtist.picture + ')' }"></div>
      <p class="Search-artistChoice">{{ deezerStore.selectedSongArtist.name }}</p>
      <p class="Search-trackChoice">{{ deezerStore.selectedSongName }}</p>
      <p class="Search-time">{{ Math.floor(deezerStore.selectedSongDuration / 60) }}:{{ Math.floor(deezerStore.selectedSongDuration % 60) }}</p>
      <button class="Search-choose" v-on:click="onTagButtonClick"></button>
    </div>

    <div class="Search-overlay visible" v-if="mapStore.showSearch">
      <button class="Search-close" v-on:click="mapStore.closeSearch()"><img src="/static/img/close.png" /></button>
    </div>
  </div>

  <div class="Map">
    <div class="Map-actions">
      <button class="Map-action Map-action--center" v-on:click="mapStore.centerMap(false)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 50 50">
          <image width="50" height="50" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABsFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAABbV5hmAAAAjnRSTlMAFUNukLDI3O7zJGum4SiE2xJsJ5n3JqT9pRSV+wFj72Qgv1zxB5sYyhksOD438i3wGuMcBpy+ZRPtlJr2cnPXM4kjz4Ayp7wf4qpbEX/lmEjN1IU2HkX8wfStXrqx6EwID/qyy+CIOQJY3xYFYT8bjiWSfaLEkQxEL1MXdr2TinjZNNgpll3JIsCL5HDdQ8k5IwAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAPUSURBVGjevZp5WxJRFMYvgiyCiqCmAuGe+25gGi6pLbaYlmalWUCbtpfZXlZu6fnMzbDINjDnzMyd9+9z+T0M3HfOxhhShiKjqdhssdoAbFaLudhkLDJgz6JUYneUgoRKHfYSbQhl5U4oIGd5mVpChcsMsjK7KlQg3JVV8ghRVZVuhYjqUzU4hKia2moFiDqPF48Q5fXUERG+034aQpS/3kdhNDTSEaIaG/CMpmZlDIDmJiSipVUpQlRrC4Zxpk0NA6CtXZ7RUaqOIZhNhxyj06qWAWDtLMzosqlnCDbdVYjRrQkDoKc7P6O3TxsGQF9vPkb/gFYMgIFBacYQwtXxMg9JQlTdwVwNSzGatGUASDhMg2K/yqfmHLf0ndWaIXhytvPXa88ACGQygiM8INZgBuQcDwaAJ51RTXyfY+VNzy5q+TAAHCmGm5D70FSTSi9HeTEARpOMujF+kLFkMnaeHwMglICM84SMxxkTPBkAEzHIJF/IZAziVP9BheQUGVN8GQBTAsSu+PSF6ZlBRJhdgMwqAngvGi8Jh2cQobNC3GU6oefK3NX4P/MaInpAqM+phOs35lOJ+03MCQMrIhEWFm+lv1Nvow4tMSMasHwnNJX10nahDhqZCUdYuXtPou68jzprYquIqLXRB+tSqdrDRyhImEXkQqKPnzxl0nqGewoR9lwuZIPlFfKKRZlsvV6ft3Gyiaw0/KxHPmgkMrv44uWrnE7AEo4BNoYMFFS1sPraPv9m8wTyFnuSAEnIe5IWoutkzOPKUrK2xZhj4nHRGzVzDG+OMfnl/8I5ekcxR1FR+cuYo/cUcxQVQdlKpj5QzFFUGGuQaVqjmKOoLYLVn+gjwRxFGdk2HfKJYI6iluivX4DPBHMU9YUxeq/jK8EcIZZIKEiJKgnmCPGUiJ7cfRNOfceHuxSlqVGKOcbTVGahQpaH8OYIYIndqh/kr1LGpvHBkwqLoJ/BX/jgHR3Kud8Jzw7xhCQLU11KbF2aBayMX9vjTyqDcvCCpDVw+LWiMuZpHj6QvxkZZ1CDYUOu/JntQRbgAclqdDKfwlFZIeW0bHVpPnNoo+9K1TTD2jIkBwKsZU9LRiTPKHBQhyGNPuMmxjo1GpzZCg4B9RgBCt9FwYg8W36ZYabwu6gfy/bKMRhrVztg7pdnMLau6lYOr2MYTNXQfxeJELR/oIxxsI9nCM4fULKIESAtYjBdVkpEuWspyzEOpTs4hDUfNVtLhhAiGx8Pqd702jksvHp1uKOWEFeJ3SH5qvmn2RJZQhvbR1vhvWPrCsCK9XgvvHW0vYE9+x9ZJC7UPF5FcgAAAABJRU5ErkJggg=="/>
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
      this.mapStore.enableTagClickListener()
    },
    methods: {
      onListenButtonClick: function() {
        this.$router.go({name: 'listen'});
      },
      onMakeSearchButtonClick(button) {
        if (button.target.className.indexOf('active') != -1) {
          this.deezerStore.triggerSearch()

        }
      },
      onSongResultClick(songId, duration, songName, artist) {
        this.deezerStore.setSelectedSong(songId, duration, songName, artist)
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