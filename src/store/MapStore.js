
export default {

  toto: 'tetete',

  state: {
    map: {
      center: {
        lat: null,
        lng: null
      },
      zoom: 11
    },
    currentMarker: false,
    markers: [
      {
        position: {
          lat: 46.9,
          lng: 4,
        }
      }
    ]
  },

  setCurrentPosition(position) {
    this.state.map.center.lat = position.coords.latitude
    this.state.map.center.lng = position.coords.longitude
  },

  setCurrentMarker(position) {
    console.log(position)
    this.state.currentMarker = {
      lat: position.latLng.lat(),
      lng: position.latLng.lng(),
    }

    console.log(this.state)
  }
}