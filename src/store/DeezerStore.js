import kuzzle from './../service/kuzzle'
import mapStore from './MapStore'

export default {
  searchInput: '',
  searchResult: [],
  formattedSearchResult: [],
  selectedSongId: false,
  selectedSongDuration: false,
  selectedSongArtist: false,
  songAdded: false,
  currentSongs: [],
  roaming: false,
  ready: false,
  playedSong: [],
  isPlaying: false,
  currentSong: false, 

  triggerSearch() {
    if (this.searchInput.length > 2) {
      DZ.api('search', 'GET', {q: this.searchInput}, (response) => {
        response.data.forEach((result) => {
          this.formattedSearchResult[result.id] = result
        })

        this.searchResult = response.data

        mapStore.showSearchResults = true
        mapStore.showSearchInput = false

      })
    }
  },

  setSelectedSong(songId, duration, songName, artist) {
    this.selectedSongId = songId
    this.selectedSongDuration = duration
    this.selectedSongArtist = artist
    this.selectedSongName = songName
    mapStore.showSearchSelectedSong = true
    mapStore.showSearchResults = false
  },

  initDeezerPlayer() {
    console.log('init player')
    DZ.init({
      appId  : '179142',
      channelUrl : 'http://localhost:8080/#!/channel.html',
      player : {
        onload : this.onDeezerPlayerLoaded
      }
    });
  },

  onDeezerPlayerLoaded() {
    console.log('playeeeer')
    // $("#controlers input").attr('disabled', false);
    // event_listener_append('player_loaded');
    // DZ.Event.subscribe('current_track', function(arg){
    //   event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
    // });
    // DZ.Event.subscribe('player_position', function(arg){
    //   event_listener_append('position', arg[0], arg[1]);
    //   $("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
    // });
    //
    // DZ.Event.subscribe('track_end', function() {
    //   event_listener_append('track_end');
    // });
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
          console.error(error)
        } else {
          mapStore.removeCurrentTagMarker()
          this.searchInput = ''
          this.searchResult = []
          this.formattedSearchResult = []
          this.selectedSongId = false
          this.selectedSongDuration = false
          this.selectedSongArtist = false
          mapStore.showSearch = false
          mapStore.showSearchSelectedSong = false
        }
      });
  },

  playSong(songId) {
    this.isPlaying = true
    DZ.player.playTracks([songId])
  },

  activateRoaming() {
    this.roaming = true
    this.isPlaying = true

    var songId = this.getSongIdToPlay()
    if (songId) {
      this.playedSong.push(songId);
      DZ.player.playTracks([songId])
    }

    DZ.Event.subscribe('track_end', (args, evt_name) => {
      songId = this.getSongIdToPlay()
      if (songId) {
        this.playedSong.push(songId);
        DZ.player.playTracks([songId])
      }
    });
  },

  getSongIdToPlay() {
    var songs = mapStore.songsAround.filter((song) => {
      return !this.playedSong.some((playedSongId) => {return song.song.id == playedSongId})
    })

    if (songs.length) {
      this.currentSong = songs[0]
      return songs[0].song.id
    }

    return false
  },

  deactivateRoaming() {
    this.roaming = false

    DZ.player.pause()
  }



}