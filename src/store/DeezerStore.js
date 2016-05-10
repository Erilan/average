import deezer from './../service/deezer'
import kuzzle from './../service/kuzzl'

export default {
  searchInput: '',
  searchResult: [],
  formattedSearchResult: [],
  selectedSongId: '',

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

  tagSong(position) {
    console.log(this.formattedSearchResult[this.selectedSongId])
    
    var selectedSong = this.formattedSearchResult[this.selectedSongId]

    kuzzle
      .dataCollectionFactory('song')
      .createDocument(
        {
          song: selectedSong,
          position: position
        }
      );

  }
}