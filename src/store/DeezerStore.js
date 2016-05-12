import deezer from './../service/deezer'
import kuzzle from './../service/kuzzle'
import mapStore from './MapStore'

export default {
  searchInput: '',
  searchResult: [],
  formattedSearchResult: [],
  selectedSongId: false,
  songAdded: false,
  currentSongs: [],

  triggerSearch() {
    if (this.searchInput.length > 2) {
      deezer.api('search', 'GET', {q: this.searchInput}, (response) => {

        response.data.forEach((result) => {
          this.formattedSearchResult[result.id] = result
        })

        this.searchResult = response.data

      })
    }
  },

  initDeezerPlayer() {
    DZ.init({
      appId  : '179142',
      channelUrl : 'http://localhost:8080/#!/channel.html',
      player: {
        container: 'player',
        width : 800,
        height : 300,
        onload : function(){}
      }
    });
  },

  tagSong() {
    var selectedSong = this.formattedSearchResult[this.selectedSongId]

    var document = {
      song: selectedSong,
      position: {
        lat: mapStore.currentTagMarker.position.lat(),
        lon: mapStore.currentTagMarker.position.lng()
      }
    };

    kuzzle
      .dataCollectionFactory('song')
      .createDocument(document, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          mapStore.removeCurrentTagMarker()
          this.searchInput = ''
          this.searchResult = []
          this.formattedSearchResult = []
          this.selectedSongId = false
        }
      });
  },

  playSong(songId) {
    DZ.player.playTracks([songId])
  }



}