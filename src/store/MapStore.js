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

  loadSongMarkers() {

    var dataMapping = kuzzle.dataCollectionFactory('song').dataMappingFactory();
    dataMapping
      .set('position', {type: 'geo_point', lat_lon: true})
      .apply(function(error, result){
    });


    var filter = {
     filter: {
       geo_distance: {
         distance: '3km',
         position: {
           lat: this.center.lat,
           lon: this.center.lng
         }
       }
     }
    };

    kuzzle
      .dataCollectionFactory('song')
      .advancedSearch(filter, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          this.destroySongMarkers()
          result.documents.forEach(document => {
            this.addSongMarker(document.content)
          });
        }
      });
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
      map: this.map
    })

    marker.addListener('click', () => {

      console.log(song.song)

      var content = '<h3>' + song.song.title + '</h3> \
      <p>' + song.song.artist.name + '</p> \
      <button onclick="window.average.triggerPlaySong(' + song.song.id + ');">Play song</button>'

      // this.songInfoWindow.setContent(song.song.artist.name + ' - ' + song.song.title)
      this.songInfoWindow.setContent(content)
      this.songInfoWindow.open(this.map, marker)
    })

    this.songMarkers.push(marker);
  }

}