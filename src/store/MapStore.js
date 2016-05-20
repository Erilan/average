import kuzzle from './../service/kuzzle'


//import deezerStore from './DeezerStore'

export default {
  currentTagMarker: false,
  center: {
    lat: 43.604727499999996,
    lng: 3.9011747
  },
  zoom: 13,
  map: null,
  songMarkers: [],
  songsAround: [],
  songInfoWindow: new google.maps.InfoWindow(),

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: this.zoom
    })
  },

  enableTagClickListener() {
    google.maps.event.addListener(this.map, 'click', (position) => {
      this.setCurrentTagMarker(position)
    })
  },

  enableListenDragListener() {
    google.maps.event.addListener(this.map, 'dragend', () => {
      this.center.lat = this.map.getCenter().lat()
      this.center.lng = this.map.getCenter().lng()
      this.loadSongMarkers()
    })
  },

  disableTagClickListener() {
    google.maps.event.clearListeners(this.map, 'click');

  },

  setCurrentPosition(position) {
    this.map = {
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }
  },

  setCurrentTagMarker(position) {
    if (this.currentTagMarker) {
      this.currentTagMarker.setMap(null)
    }

    this.currentTagMarker = new google.maps.Marker({
      position: new google.maps.LatLng(position.latLng.lat(), position.latLng.lng()),
      map: this.map,
    });
  },
  
  removeCurrentTagMarker() {
    if (this.currentTagMarker) {
      this.currentTagMarker.setMap(null)
      this.currentTagMarker = false
    }
  },

  loadSongMarkers(from) {

    if (typeof from == 'undefined') {
      from = 0
    }

    var dataMapping = kuzzle.dataCollectionFactory('song').dataMappingFactory();
    dataMapping
      .set('position', {type: 'geo_point', lat_lon: true})
      .apply(function(error, result){
    });


    var filter = {
      filter: {
        geo_distance: {
          distance: '50km',
          position: {
            lat: this.center.lat,
            lon: this.center.lng
          }
        },
      },
      size: 100,
      from: from
    };

    kuzzle
      .dataCollectionFactory('song')
      .advancedSearch(filter, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.destroySongMarkers()
          this.songsAround = result.documents.map(document => {
            this.addSongMarker(document.content)
            return {...document.content}
          });

          console.log()
        }
      });
  },

  loadMoreSongsAround(from) {
    this.loadSongMarkers(from)
  },

  destroySongMarkers() {
    this.songMarkers.forEach(marker => {
      marker.setMap(null)
    })

    this.songMarkers= []
  },

  addSongMarker(song) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(song.position.lat, song.position.lon),
      map: this.map,
      optimized: false
    })

    marker.addListener('mousedown', () => {

      console.log(song.song)

      var content = '<h3>' + song.song.title + '</h3> \
      <p>' + song.song.artist.name + '</p> \
      <button ontouchstart="window.average.triggerPlaySong(' + song.song.id + ');" onclick="window.average.triggerPlaySong(' + song.song.id + ');">Play song</button>'

      // this.songInfoWindow.setContent(song.song.artist.name + ' - ' + song.song.title)
      this.songInfoWindow.setContent(content)
      this.songInfoWindow.open(this.map, marker)
    })

    this.songMarkers.push(marker);
  }

}