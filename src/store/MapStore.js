import kuzzle from './../service/kuzzle'


//import deezerStore from './DeezerStore'

export default {
  currentTagMarker: false,
  center: {
    lat: 43.604727499999996,
    lng: 3.9011747
  },
  zoom: 11,
  map: null,
  songMarkers: [
    {
      position: {
        lat: 46.9,
        lng: 4
      }
    }
  ],

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: this.zoom
    })

    google.maps.event.addListener(this.map, 'click', (position) => {
      this.setCurrentTagMarker(position)
    })
  },

  addMarker(position) {

  },

  setCurrentPosition(position) {
    this.map.center.lat = position.coords.latitude
    this.map.center.lng = position.coords.longitude
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

  loadSongMarkers() {
    //var filter = {
    //  filter: {
    //    geo_distance: {
    //      distance: '10km',
    //      position: {
    //        lat: '43.604727499999996', lon: '3.9011747'
    //      }
    //    }
    //  }
    //};
    //"SearchPhaseExecutionException[Failed to execute phase [query], all shards failed; shardFailures {[1Jo_lWskSzSa0pEkH6uk-A][average][0]: SearchParseException[[average][0]: from[-1],size[-1]: Parse Failure [Failed to parse source [{"geo_distance":{"distance":"10km","position":{"lat":"43.604727499999996","lon":"3.9011747"}}}]]]; nested: SearchParseException[[average][0]: from[-1],size[-1]: Parse Failure [No parser for element [geo_distance]]]; }{[1Jo_lWskSzSa0pEkH6uk-A][average][1]: SearchParseException[[average][1]: from[-1],size[-1]: Parse Failure [Failed to parse source [{"geo_distance":{"distance":"10km","position":{"lat":"43.604727499999996","lon":"3.9011747"}}}]]]; nested: SearchParseException[[average][1]: from[-1],size[-1]: Parse Failure [No parser for element [geo_distance]]]; }{[1Jo_lWskSzSa0pEkH6uk-A][average][2]: SearchParseException[[average][2]: from[-1],size[-1]: Parse Failure [Failed to parse source [{"geo_distance":{"distance":"10km","position":{"lat":"43.604727499999996","lon":"3.9011747"}}}]]]; nested: SearchParseException[[average][2]: from[-1],size[-1]: Parse Failure [No parser for element [geo_distance]]]; }{[1Jo_lWskSzSa0pEkH6uk-A][average][3]: SearchParseException[[average][3]: from[-1],size[-1]: Parse Failure [Failed to parse source [{"geo_distance":{"distance":"10km","position":{"lat":"43.604727499999996","lon":"3.9011747"}}}]]]; nested: SearchParseException[[average][3]: from[-1],size[-1]: Parse Failure [No parser for element [geo_distance]]]; }{[1Jo_lWskSzSa0pEkH6uk-A][average][4]: SearchParseException[[average][4]: from[-1],size[-1]: Parse Failure [Failed to parse source [{"geo_distance":{"distance":"10km","position":{"lat":"43.604727499999996","lon":"3.9011747"}}}]]]; nested: SearchParseException[[average][4]: from[-1],size[-1]: Parse Failure [No parser for element [geo_distance]]]; }]"

    //var filter = {
    //  geo_distance: {
    //    distance: '10km',
    //    position: {
    //      lat: '43.604727499999996', lon: '3.9011747'
    //    }
    //  }
    //};

    var filter = {}

    kuzzle
      .dataCollectionFactory('song')
      .advancedSearch(filter, (error, result) => {
        if (error) {
          console.log(error)
        } else {
          result.documents.forEach(document => {
            console.log(document.content);
            this.songMarkers.push(document.content)
          });
        }
      });
  }

}