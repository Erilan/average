import kuzzle from './../service/kuzzle'
import deezerStore from './DeezerStore'

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
  showSearch: false,
  showSearchInput: false,
  showSearchResults: false,
  showSearchSelectedSong: false,
  centerPosition: false,

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: this.zoom,
      streetViewControl: false,
      zoomControl: false
    })

    // this.map.setOptions({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]});
    // this.map.setOptions({styles: });
    this.map.setOptions({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#111111"},{"lightness":17}]}]});
    // this.map.setOptions({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]});

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

  centerMap() {
    this.map.setCenter(new google.maps.LatLng(this.centerPosition.coords.latitude, this.centerPosition.coords.longitude))
  },

  setCenterPosition(position) {
      this.centerPosition = position
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
      icon: {
        url: '/static/img/tag_point.png',
        size: new google.maps.Size(50,50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
      }
    });

    this.currentTagMarker.addListener('mousedown', () => {
      this.showSearch = true
      this.showSearchInput = true
    })
  },

  closeSearch() {
    this.showSearch = false
    this.showSearchInput = false
    this.showSearchResults = false
    this.showSearchSelectedSong = false
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
          console.error(error)
        } else {
          this.destroySongMarkers()
          this.songsAround = result.documents.map(document => {
            this.addSongMarker(document.content)
            return {...document.content}
          });
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
      optimized: false,
      icon: {
        url: '/static/img/poi.png',
        size: new google.maps.Size(50,50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
      }
    })

    marker.addListener('mousedown', () => {
      deezerStore.currentSong = song.song
      deezerStore.playSong(song.song.id)
    })

    this.songMarkers.push(marker);
  }

}